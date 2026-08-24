import { Resend } from "resend";
import type { ContactInput } from "./validation";
import { sujetsLabels } from "./validation";
import { siteConfig } from "@/content/siteConfig";

const PROVIDER = process.env.EMAIL_PROVIDER ?? "resend";
const EMAIL_TO = process.env.EMAIL_TO ?? siteConfig.contact.email;
const EMAIL_FROM =
  process.env.EMAIL_FROM ?? "Site Pierre & Pavin <onboarding@resend.dev>";

function corpsTexte(donnees: ContactInput): string {
  return [
    `Nouveau message depuis le site ${siteConfig.nomComplet}`,
    "",
    `Nom : ${donnees.nom}`,
    `Email : ${donnees.email}`,
    `Téléphone : ${donnees.telephone || "—"}`,
    `Sujet : ${sujetsLabels[donnees.sujet]}`,
    "",
    "Message :",
    donnees.message,
  ].join("\n");
}

async function envoyerViaResend(
  donnees: ContactInput
): Promise<{ ok: boolean; erreur?: string }> {
  const cle = process.env.RESEND_API_KEY;
  if (!cle) {
    console.error("[email] RESEND_API_KEY manquante.");
    return { ok: false, erreur: "configuration" };
  }
  const resend = new Resend(cle);
  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    replyTo: donnees.email,
    subject: `[Site] ${sujetsLabels[donnees.sujet]} — ${donnees.nom}`,
    text: corpsTexte(donnees),
  });
  if (error) {
    console.error("[email] Erreur Resend :", error);
    return { ok: false, erreur: "envoi" };
  }
  return { ok: true };
}

async function envoyerViaSmtp(
  donnees: ContactInput
): Promise<{ ok: boolean; erreur?: string }> {
  // Bascule SMTP (ex. Brevo) sans dépendance lourde : on utilise l'API HTTP
  // de Brevo si configurée, sinon on journalise pour ne jamais perdre le message.
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.error("[email] Configuration SMTP manquante (SMTP_HOST).");
    return { ok: false, erreur: "configuration" };
  }
  // TODO: brancher un transport SMTP (nodemailer) ou l'API Brevo selon le choix
  // du client. En attendant, le message est journalisé côté serveur.
  console.log("[email] (SMTP non branché) Message reçu :\n" + corpsTexte(donnees));
  return { ok: false, erreur: "configuration" };
}

export async function envoyerEmailContact(
  donnees: ContactInput
): Promise<{ ok: boolean; erreur?: string }> {
  if (PROVIDER === "smtp") return envoyerViaSmtp(donnees);
  return envoyerViaResend(donnees);
}
