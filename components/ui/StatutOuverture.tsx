"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "@/content/siteConfig";

const NOMS_JOURS = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
];

const enMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const formaterHeure = (hhmm: string) => hhmm.replace(":", "h");

/** Heure courante à Paris, quelle que soit la zone du visiteur. */
function maintenantParis(): { jour: number; minutes: number } {
  const parties = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) =>
    parties.find((p) => p.type === type)?.value ?? "";
  const jour = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."].indexOf(
    get("weekday"),
  );
  return {
    jour: jour === -1 ? new Date().getDay() : jour,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

function statut(): { ouvert: boolean; texte: string } {
  const { jour, minutes } = maintenantParis();
  const plages = siteConfig.horaires.plages;

  for (const [ouvre, ferme] of plages[jour] ?? []) {
    if (minutes >= enMinutes(ouvre) && minutes < enMinutes(ferme)) {
      return { ouvert: true, texte: `Ouvert actuellement — ferme à ${formaterHeure(ferme)}` };
    }
    if (minutes < enMinutes(ouvre)) {
      return { ouvert: false, texte: `Fermé — ouvre aujourd'hui à ${formaterHeure(ouvre)}` };
    }
  }

  for (let i = 1; i <= 7; i++) {
    const j = (jour + i) % 7;
    const prochain = plages[j]?.[0];
    if (prochain) {
      const nomJour = i === 1 ? "demain" : NOMS_JOURS[j];
      return {
        ouvert: false,
        texte: `Fermé — ouvre ${nomJour} à ${formaterHeure(prochain[0])}`,
      };
    }
  }

  return { ouvert: false, texte: siteConfig.horaires.jours };
}

// Mémoïsation à la minute : getSnapshot doit renvoyer une référence stable
// entre deux appels, sinon useSyncExternalStore re-rend en boucle.
let cacheCle = -1;
let cacheValeur: { ouvert: boolean; texte: string } | null = null;

function lireStatut() {
  const cle = Math.floor(Date.now() / 60_000);
  if (cle !== cacheCle) {
    cacheCle = cle;
    cacheValeur = statut();
  }
  return cacheValeur;
}

function abonner(auChangement: () => void) {
  const minuteur = setInterval(auChangement, 30_000);
  return () => clearInterval(minuteur);
}

/**
 * Badge « Ouvert / Fermé » calculé sur le fuseau Europe/Paris.
 * Côté serveur, le repli affiche les horaires complets (pas de décalage
 * d'hydratation) ; la pastille prend sa couleur réelle côté client.
 */
export default function StatutOuverture({ inverse = false }: { inverse?: boolean }) {
  const etat = useSyncExternalStore(abonner, lireStatut, () => null);

  return (
    <p
      className={`flex items-center gap-2 text-sm ${
        inverse ? "text-ivoire/80" : "text-noir/80"
      }`}
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className={`inline-block h-2 w-2 rounded-full ${
          etat?.ouvert ? "bg-vert" : "bg-cuir"
        }`}
      />
      {etat ? etat.texte : `${siteConfig.horaires.jours}, ${siteConfig.horaires.heures}`}
    </p>
  );
}
