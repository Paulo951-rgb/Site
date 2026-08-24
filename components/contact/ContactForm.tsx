"use client";

import { useState, type FormEvent } from "react";
import { ButtonSubmit } from "@/components/ui/Button";
import { sujetsLabels, type ContactInput } from "@/lib/validation";
import { siteConfig } from "@/content/siteConfig";

type Etat =
  | { statut: "repos" }
  | { statut: "envoi" }
  | { statut: "succes" }
  | { statut: "erreur"; message: string };

const champLabel =
  "block text-xs uppercase tracking-surtitre text-taupe";
const champSaisie =
  "mt-2 w-full border-b border-noir/25 bg-transparent py-3 text-base outline-none transition-colors duration-300 focus:border-cuir placeholder:text-taupe/60";

export default function ContactForm() {
  const [etat, setEtat] = useState<Etat>({ statut: "repos" });
  const [erreurs, setErreurs] = useState<Record<string, string>>({});

  async function soumettre(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const donnees = Object.fromEntries(new FormData(form).entries());

    setEtat({ statut: "envoi" });
    setErreurs({});

    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donnees),
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
          L'atelier vous répondra personnellement, dans les meilleurs délais.
          Vous pouvez aussi passer nous voir{" "}
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
    <form onSubmit={soumettre} noValidate className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
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

      <div className="grid gap-8 sm:grid-cols-2">
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
          <select id="sujet" name="sujet" required className={champSaisie} defaultValue="">
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
            <p className="mt-2 text-xs text-cuir">{erreurs.sujet}</p>
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
