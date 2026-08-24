import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { envoyerEmailContact } from "@/lib/email";

export const runtime = "nodejs";

/**
 * Rate limiting basique en mémoire (par IP) : 5 messages / 10 minutes.
 * Suffisant pour un site vitrine ; pour du multi-instance serverless,
 * brancher un store partagé (Upstash, etc.).
 */
const FENETRE_MS = 10 * 60 * 1000;
const MAX_REQUETES = 5;
const requetes = new Map<string, number[]>();

function limiteDepassee(ip: string): boolean {
  const maintenant = Date.now();
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

export async function POST(request: Request) {
  let corps: unknown;
  try {
    corps = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Requête invalide." },
      { status: 400 }
    );
  }

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

  const envoi = await envoyerEmailContact(resultat.data);
  if (!envoi.ok) {
    return NextResponse.json(
      {
        message:
          "Le message n'a pas pu être envoyé pour le moment. Merci de nous écrire directement à l'adresse indiquée sur cette page.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
