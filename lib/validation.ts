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

export const sujetsLabels: Record<ContactInput["sujet"], string> = {
  "sur-mesure": "Création sur mesure",
  "pret-a-porter": "Prêt-à-porter & personnalisation",
  restauration: "Restauration & patine",
  "rendez-vous": "Prendre rendez-vous",
  professionnel: "Projet professionnel",
  autre: "Autre demande",
};
