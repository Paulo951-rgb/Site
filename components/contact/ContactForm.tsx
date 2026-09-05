"use client";

import { useRef, useState, type FormEvent } from "react";
import { ButtonSubmit } from "@/components/ui/Button";
import {
  ACCEPT_FICHIERS,
  FICHIERS_MAX,
  FICHIER_TAILLE_MAX,
  sujetsLabels,
  type ContactInput,
} from "@/lib/validation";
import { siteConfig } from "@/content/siteConfig";

type Etat =
  | { statut: "repos" }
  | { statut: "envoi" }
  | { statut: "succes" }
  | { statut: "erreur"; message: string };

const champLabel =
  "block text-xs uppercase tracking-surtitre text-taupe-fonce";
const champSaisie =
  "mt-2 w-full border-b border-noir/25 bg-transparent py-3 text-base outline-none transition-colors duration-300 focus:border-cuir placeholder:text-taupe-fonce/70";

export default function ContactForm() {
  const [etat, setEtat] = useState<Etat>({ statut: "repos" });
  const [erreurs, setErreurs] = useState<Record<string, string>>({});
  const [nomsFichiers, setNomsFichiers] = useState<string[]>([]);
  const fichiersRef = useRef<HTMLInputElement>(null);

  async function soumettre(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const donnees = new FormData(form);

    // Contrôles côté navigateur avant l'envoi (le serveur re-valide tout)
    const fichiers = (fichiersRef.current?.files
      ? Array.from(fichiersRef.current.files)
      : []
    ).filter((f) => f.size > 0);
    if (fichiers.length > FICHIERS_MAX) {
      setEtat({
        statut: "erreur",
        message: `Trois photos maximum, merci d'en retirer ${fichiers.length - FICHIERS_MAX}.`,
      });
      return;
    }
    const tropLourd = fichiers.find((f) => f.size > FICHIER_TAILLE_MAX);
    if (tropLourd) {
      setEtat({
        statut: "erreur",
        message: `« ${tropLourd.name} » dépasse 4 Mo.`,
      });
      return;
    }

    setEtat({ statut: "envoi" });
    setErreurs({});

    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        body: donnees,
      });
      const corps = await reponse.json();

      if (!reponse.ok) {
        if (corps?.erreurs) setErreurs(corps.erreurs);
        setEtat({
          statut: "erreur",
          message:
            corps?.message ??
            "Une erreur est survenue. Merci de réessayer ou de nous écrire directement.",
        });
        return;
      }

      setEtat({ statut: "succes" });
      form.reset();
      setNomsFichiers([]);
    } catch {
      setEtat({
        statut: "erreur",
        message:
          "Le message n'a pas pu être envoyé. Merci de réessayer dans un instant.",
      });
    }
  }

  if (etat.statut === "succes") {
    return (
      <div className="border border-gris-chaud bg-ivoire p-10" role="status">
        <p className="font-serif text-2xl">Votre message est bien parti.</p>
        <p className="mt-4 text-sm text-noir/75">
          Si votre adresse est valide, un accusé de réception vient d'y être
          envoyé. L'atelier vous répondra ensuite personnellement, dans les
          meilleurs délais. Vous pouvez aussi passer nous voir{" "}
          {siteConfig.horaires.jours.toLowerCase()} ou nous écrire directement.
        </p>
        <button
          type="button"
          onClick={() => setEtat({ statut: "repos" })}
          className="lien-souligne mt-6 text-sm text-cuir"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={soumettre} noValidate className="space-y-6 sm:space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
        <div>
          <label htmlFor="nom" className={champLabel}>
            Nom
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            autoComplete="name"
            required
            className={champSaisie}
            aria-invalid={Boolean(erreurs.nom)}
            aria-describedby={erreurs.nom ? "erreur-nom" : undefined}
          />
          {erreurs.nom && (
            <p id="erreur-nom" className="mt-2 text-xs text-cuir">
              {erreurs.nom}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={champLabel}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={champSaisie}
            aria-invalid={Boolean(erreurs.email)}
            aria-describedby={erreurs.email ? "erreur-email" : undefined}
          />
          {erreurs.email && (
            <p id="erreur-email" className="mt-2 text-xs text-cuir">
              {erreurs.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
        <div>
          <label htmlFor="telephone" className={champLabel}>
            Téléphone <span className="normal-case tracking-normal">(facultatif)</span>
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            autoComplete="tel"
            className={champSaisie}
          />
        </div>
        <div>
          <label htmlFor="sujet" className={champLabel}>
            Sujet
          </label>
          <select
            id="sujet"
            name="sujet"
            required
            className={champSaisie}
            defaultValue=""
            aria-invalid={Boolean(erreurs.sujet)}
            aria-describedby={erreurs.sujet ? "erreur-sujet" : undefined}
          >
            <option value="" disabled>
              Choisir un sujet
            </option>
            {(Object.entries(sujetsLabels) as [ContactInput["sujet"], string][]).map(
              ([valeur, label]) => (
                <option key={valeur} value={valeur}>
                  {label}
                </option>
              )
            )}
          </select>
          {erreurs.sujet && (
            <p id="erreur-sujet" className="mt-2 text-xs text-cuir">
              {erreurs.sujet}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={champLabel}>
          Votre projet
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Un soulier sur mesure, une pièce à restaurer, un rendez-vous en atelier ou à domicile…"
          className={`${champSaisie} resize-y`}
          aria-invalid={Boolean(erreurs.message)}
          aria-describedby={erreurs.message ? "erreur-message" : undefined}
        />
        {erreurs.message && (
          <p id="erreur-message" className="mt-2 text-xs text-cuir">
            {erreurs.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="fichiers" className={champLabel}>
          Photos de la pièce{" "}
          <span className="normal-case tracking-normal">
            (facultatif — {FICHIERS_MAX} max, JPEG/PNG/WebP, 4 Mo chacune)
          </span>
        </label>
        <input
          ref={fichiersRef}
          id="fichiers"
          name="fichiers"
          type="file"
          accept={ACCEPT_FICHIERS}
          multiple
          onChange={(e) =>
            setNomsFichiers(
              e.target.files ? Array.from(e.target.files).map((f) => f.name) : []
            )
          }
          className={`${champSaisie} file:mr-4 file:border file:border-noir/30 file:bg-transparent file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-surtitre file:transition-colors file:duration-300 hover:file:border-cuir hover:file:text-cuir`}
          aria-describedby="aide-fichiers"
        />
        <p id="aide-fichiers" className="mt-2 text-xs text-taupe-fonce">
          Pour une restauration ou une patine, quelques photos de la pièce
          aident l'atelier à préparer sa réponse.
        </p>
        {nomsFichiers.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm text-noir/80">
            {nomsFichiers.map((nom) => (
              <li key={nom}>{nom}</li>
            ))}
          </ul>
        )}
        {erreurs.fichiers && (
          <p role="alert" className="mt-2 text-xs text-cuir">
            {erreurs.fichiers}
          </p>
        )}
      </div>

      {/* Honeypot : invisible pour les humains, doit rester vide. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="entreprise">Entreprise</label>
        <input
          id="entreprise"
          name="entreprise"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {etat.statut === "erreur" && (
        <p role="alert" className="text-sm text-cuir">
          {etat.message}
        </p>
      )}

      <ButtonSubmit disabled={etat.statut === "envoi"}>
        {etat.statut === "envoi" ? "Envoi en cours…" : "Envoyer votre message"}
      </ButtonSubmit>
    </form>
  );
}
