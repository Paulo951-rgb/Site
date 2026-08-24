import { z } from "zod";

export const contactSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, "Merci d'indiquer votre nom.")
    .max(100, "Nom trop long."),
  email: z
    .string()
    .trim()
    .email("Merci d'indiquer une adresse email valide.")
    .max(200),
  telephone: z
    .string()
    .trim()
    .max(30, "Numéro trop long.")
    .optional()
    .or(z.literal("")),
  sujet: z
    .enum(
      [
        "sur-mesure",
        "pret-a-porter",
        "restauration",
        "rendez-vous",
        "professionnel",
        "autre",
      ],
      { errorMap: () => ({ message: "Merci de choisir un sujet." }) }
    ),
  message: z
    .string()
    .trim()
    .min(20, "Votre message est un peu court (20 caractères minimum).")
    .max(3000, "Message trop long."),
  // Honeypot anti-spam : champ invisible qui doit rester vide.
  entreprise: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

// Pièces jointes du formulaire (photos d'une pièce à restaurer, etc.)
export const FICHIERS_MAX = 3;
export const FICHIER_TAILLE_MAX = 4 * 1024 * 1024; // 4 Mo par fichier
export const TYPES_FICHIERS_ACCEPTES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];
export const ACCEPT_FICHIERS = TYPES_FICHIERS_ACCEPTES.join(",");

export interface PieceJointeValidee {
  nom: string;
  type: string;
  contenuBase64: string;
}

/** Validation serveur des fichiers : nature, taille, nombre. */
export function validerFichiers(
  fichiers: File[]
): { ok: true; pieces: PieceJointeValidee[] } | { ok: false; erreur: string } {
  const utiles = fichiers.filter((f) => f.size > 0);
  if (utiles.length > FICHIERS_MAX) {
    return { ok: false, erreur: `Trois photos maximum (${utiles.length} reçues).` };
  }
  for (const f of utiles) {
    if (!TYPES_FICHIERS_ACCEPTES.includes(f.type)) {
      return {
        ok: false,
        erreur: `Le format de « ${f.name} » n'est pas accepté (JPEG, PNG ou WebP uniquement).`,
      };
    }
    if (f.size > FICHIER_TAILLE_MAX) {
      return {
        ok: false,
        erreur: `« ${f.name} » dépasse 4 Mo.`,
      };
    }
  }
  return {
    ok: true,
    pieces: utiles.map((f) => ({ nom: f.name, type: f.type, contenuBase64: "" })),
  };
}

export const sujetsLabels: Record<ContactInput["sujet"], string> = {
  "sur-mesure": "Création sur mesure",
  "pret-a-porter": "Prêt-à-porter & personnalisation",
  restauration: "Restauration & patine",
  "rendez-vous": "Prendre rendez-vous",
  professionnel: "Projet professionnel",
  autre: "Autre demande",
};
