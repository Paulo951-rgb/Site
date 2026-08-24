import { Resend } from "resend";
import type { ContactInput, PieceJointeValidee } from "./validation";
import { sujetsLabels } from "./validation";
import { siteConfig } from "@/content/siteConfig";

const PROVIDER = process.env.EMAIL_PROVIDER ?? "resend";
const EMAIL_TO = process.env.EMAIL_TO ?? siteConfig.contact.email;
const EMAIL_FROM =
  process.env.EMAIL_FROM ?? "Site Pierre & Pavin <onboarding@resend.dev>";

function corpsTexte(
  donnees: ContactInput,
  piecesJointes: PieceJointeValidee[] = []
): string {
  return [
    `Nouveau message depuis le site ${siteConfig.nomComplet}`,
    "",
    `Nom : ${donnees.nom}`,
    `Email : ${donnees.email}`,
    `Téléphone : ${donnees.telephone || "—"}`,
    `Sujet : ${sujetsLabels[donnees.sujet]}`,
    ...(piecesJointes.length > 0
      ? [`Photos jointes : ${piecesJointes.map((p) => p.nom).join(", ")}`]
      : []),
    "",
    "Message :",
    donnees.message,
  ].join("\n");
}

function corpsConfirmation(donnees: ContactInput): string {
  return [
    `Bonjour ${donnees.nom},`,
    "",
    `Nous avons bien reçu votre message (${sujetsLabels[donnees.sujet].toLowerCase()})`,
    "et vous remercions de votre intérêt pour la maison.",
    "",
    "L'atelier vous répondra personnellement, dans les meilleurs délais.",
    "",
    `${siteConfig.nomComplet}`,
    `${siteConfig.adresse.rue}, ${siteConfig.adresse.codePostal} ${siteConfig.adresse.ville}`,
    `${siteConfig.horaires.jours}, ${siteConfig.horaires.heures}`,
    siteConfig.contact.email,
  ].join("\n");
}

async function envoyerViaResend(
  donnees: ContactInput,
  piecesJointes: PieceJointeValidee[] = []
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
    text: corpsTexte(donnees, piecesJointes),
    attachments: piecesJointes.map((p) => ({
      filename: p.nom,
      content: p.contenuBase64,
    })),
  });
  if (error) {
    console.error("[email] Erreur Resend :", error);
    return { ok: false, erreur: "envoi" };
  }
  return { ok: true };
}

async function envoyerViaSmtp(
  donnees: ContactInput,
  piecesJointes: PieceJointeValidee[] = []
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
  console.log(
    "[email] (SMTP non branché) Message reçu :\n" + corpsTexte(donnees, piecesJointes)
  );
  return { ok: false, erreur: "configuration" };
}

export async function envoyerEmailContact(
  donnees: ContactInput,
  piecesJointes: PieceJointeValidee[] = []
): Promise<{ ok: boolean; erreur?: string }> {
  if (PROVIDER === "smtp") return envoyerViaSmtp(donnees, piecesJointes);
  return envoyerViaResend(donnees, piecesJointes);
}

/**
 * Accusé de réception envoyé à l'expéditeur, une fois le message de contact
 * transmis à l'atelier. Un échec ici ne doit jamais faire échouer la demande :
 * l'erreur est simplement journalisée.
 */
export async function envoyerConfirmation(donnees: ContactInput): Promise<void> {
  const cle = process.env.RESEND_API_KEY;
  if (PROVIDER !== "resend" || !cle) return;
  try {
    const resend = new Resend(cle);
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: donnees.email,
      replyTo: EMAIL_TO,
      subject: `Votre message à la maison ${siteConfig.nomComplet}`,
      text: corpsConfirmation(donnees),
    });
    if (error) console.error("[email] Erreur confirmation :", error);
  } catch (e) {
    console.error("[email] Erreur confirmation :", e);
  }
}
