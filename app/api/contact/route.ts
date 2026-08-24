import { NextResponse } from "next/server";
import {
  contactSchema,
  validerFichiers,
  type PieceJointeValidee,
} from "@/lib/validation";
import { envoyerConfirmation, envoyerEmailContact } from "@/lib/email";

export const runtime = "nodejs";

/** Extrait champs texte + fichiers selon le type de contenu de la requête. */
async function lireRequete(
  request: Request
): Promise<{ corps: unknown; fichiers: File[] } | null> {
  const typeContenu = request.headers.get("content-type") ?? "";
  try {
    if (typeContenu.includes("multipart/form-data")) {
      const form = await request.formData();
      const corps: Record<string, unknown> = {};
      for (const [cle, valeur] of form.entries()) {
        if (typeof valeur === "string") corps[cle] = valeur;
      }
      return {
        corps,
        fichiers: form
          .getAll("fichiers")
          .filter((f): f is File => f instanceof File),
      };
    }
    return { corps: await request.json(), fichiers: [] };
  } catch {
    return null;
  }
}

/**
 * Rate limiting basique en mémoire (par IP) : 5 messages / 10 minutes.
 * Suffisant pour un site vitrine ; pour du multi-instance serverless,
 * brancher un store partagé (Upstash, etc.).
 */
const FENETRE_MS = 10 * 60 * 1000;
const MAX_REQUETES = 5;
const requetes = new Map<string, number[]>();
let dernierePurge = 0;

/** Évite la croissance non bornée de la Map sur un serveur longue durée. */
function purgerRequetes(maintenant: number) {
  if (maintenant - dernierePurge < FENETRE_MS) return;
  dernierePurge = maintenant;
  for (const [ip, horodatages] of requetes) {
    const recents = horodatages.filter((t) => maintenant - t < FENETRE_MS);
    if (recents.length === 0) requetes.delete(ip);
    else requetes.set(ip, recents);
  }
}

function limiteDepassee(ip: string): boolean {
  const maintenant = Date.now();
  purgerRequetes(maintenant);
  const horodatages = (requetes.get(ip) ?? []).filter(
    (t) => maintenant - t < FENETRE_MS
  );
  if (horodatages.length >= MAX_REQUETES) {
    requetes.set(ip, horodatages);
    return true;
  }
  horodatages.push(maintenant);
  requetes.set(ip, horodatages);
  return false;
}

// 3 photos × 4 Mo + champs et marge multipart : au-delà, on rejette avant
// de parser le corps en mémoire (request.formData() n'a pas de limite native).
const TAILLE_CORPS_MAX = 14 * 1024 * 1024;

/** Vérifie la signature binaire réelle du fichier contre son type déclaré. */
function signatureImageValide(tampon: Buffer, type: string): boolean {
  if (tampon.length < 12) return false;
  if (type === "image/jpeg") {
    return tampon[0] === 0xff && tampon[1] === 0xd8 && tampon[2] === 0xff;
  }
  if (type === "image/png") {
    return (
      tampon[0] === 0x89 &&
      tampon[1] === 0x50 &&
      tampon[2] === 0x4e &&
      tampon[3] === 0x47
    );
  }
  if (type === "image/webp") {
    return (
      tampon.toString("ascii", 0, 4) === "RIFF" &&
      tampon.toString("ascii", 8, 12) === "WEBP"
    );
  }
  return false;
}

export async function POST(request: Request) {
  const tailleAnnoncee = Number(request.headers.get("content-length") ?? 0);
  if (tailleAnnoncee > TAILLE_CORPS_MAX) {
    return NextResponse.json(
      { message: "Le message est trop volumineux (photos trop lourdes)." },
      { status: 413 }
    );
  }

  const lecture = await lireRequete(request);
  if (!lecture) {
    return NextResponse.json(
      { message: "Requête invalide." },
      { status: 400 }
    );
  }
  const { corps, fichiers } = lecture;

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "inconnue";
  if (limiteDepassee(ip)) {
    return NextResponse.json(
      {
        message:
          "Trop de messages envoyés récemment. Merci de réessayer plus tard ou de nous écrire directement.",
      },
      { status: 429 }
    );
  }

  // Honeypot : un bot qui remplit ce champ est écarté silencieusement,
  // avec une fausse réponse de succès pour ne pas l'aider à s'adapter.
  if (
    typeof corps === "object" &&
    corps !== null &&
    "entreprise" in corps &&
    typeof (corps as Record<string, unknown>).entreprise === "string" &&
    ((corps as Record<string, unknown>).entreprise as string).length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  const resultat = contactSchema.safeParse(corps);
  if (!resultat.success) {
    const erreurs: Record<string, string> = {};
    for (const issue of resultat.error.issues) {
      const champ = String(issue.path[0] ?? "form");
      if (!erreurs[champ]) erreurs[champ] = issue.message;
    }
    return NextResponse.json(
      { message: "Certains champs sont à corriger.", erreurs },
      { status: 422 }
    );
  }

  const fichiersValides = validerFichiers(fichiers);
  if (!fichiersValides.ok) {
    return NextResponse.json(
      { message: fichiersValides.erreur, erreurs: { fichiers: fichiersValides.erreur } },
      { status: 422 }
    );
  }

  // Encodage base64 uniquement après validation complète (mémoire bornée
  // par la limite de taille et de nombre). Le type MIME déclaré par le
  // client n'étant pas fiable, on vérifie les magic bytes du contenu.
  const piecesJointes: PieceJointeValidee[] = [];
  for (const f of fichiers.filter((f) => f.size > 0)) {
    const tampon = Buffer.from(await f.arrayBuffer());
    if (!signatureImageValide(tampon, f.type)) {
      return NextResponse.json(
        {
          message: `Le contenu de « ${f.name} » ne correspond pas à une image.`,
          erreurs: { fichiers: `Le contenu de « ${f.name} » ne correspond pas à une image.` },
        },
        { status: 422 }
      );
    }
    piecesJointes.push({
      nom: f.name,
      type: f.type,
      contenuBase64: tampon.toString("base64"),
    });
  }

  const envoi = await envoyerEmailContact(resultat.data, piecesJointes);
  if (!envoi.ok) {
    return NextResponse.json(
      {
        message:
          "Le message n'a pas pu être envoyé pour le moment. Merci de nous écrire directement à l'adresse indiquée sur cette page.",
      },
      { status: 502 }
    );
  }

  // Accusé de réception : en cas d'échec, la demande reste valide.
  await envoyerConfirmation(resultat.data);

  return NextResponse.json({ ok: true });
}
