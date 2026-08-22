/**
 * Configuration centrale du site.
 * Point d'entrée unique pour toutes les données modifiables sans toucher
 * au code de présentation (coordonnées, horaires, réseaux, SEO, mentions légales).
 */
export const siteConfig = {
  nom: "Pierre & Pavin",
  nomComplet: "Pierre & Pavin — Façonniers",
  baseline: "Façonniers",
  description:
    "Atelier de bottier et maroquinier artisanal à Paris. Souliers sur mesure, maroquinerie et restauration de pièces d'exception.",

  adresse: {
    rue: "107 rue Blomet",
    codePostal: "75015",
    ville: "Paris",
    pays: "France",
    // TODO: vérifier la géolocalisation exacte avant mise en ligne
    latitude: 48.8409,
    longitude: 2.3007,
  },

  contact: {
    // Confirmé sur la page contact du site officiel — à faire reconfirmer par le client.
    email: "pierre.pavin75@gmail.com",
    // ⚠️ TODO: confirmer avec le client avant mise en ligne — numéro cohérent sur deux
    // annuaires professionnels indépendants, mais absent du site officiel actuel.
    telephone: "+33 6 79 59 84 14",
    telephoneAffichage: "06 79 59 84 14",
  },

  horaires: {
    jours: "Du mardi au samedi",
    // TODO: confirmer avec le client avant mise en ligne (heures exactes non confirmées).
    heures: "Horaires à confirmer — merci de nous contacter",
  },

  reseaux: {
    // ⚠️ TODO: confirmer avec le client avant mise en ligne.
    // Deux comptes candidats identifiés : @pierreetpavin (bio mentionnant l'adresse
    // exacte du 107 rue Blomet) et @pierre_pavin. Laisser vide tant que non tranché.
    instagram: "",
    // À confirmer par le client.
    facebook: "https://www.facebook.com/Pierre.et.Pavin",
  },

  seo: {
    titre: "Pierre & Pavin — Façonniers | Bottier et maroquinier sur mesure à Paris",
    description:
      "Atelier parisien de bottier-façonnier et maroquinier. Souliers sur mesure, maroquinerie haut de gamme, restauration de pièces d'exception, cuirs et peaux exotiques rares.",
    ogImage: "/images/hero/og-image.jpg",
    // TODO: confirmer l'URL de production
    url: "https://www.pierre-pavin-paris.fr",
  },

  legal: {
    raisonSociale: "PIERRE & PAVIN FAÇONNIERS",
    formeJuridique: "SASU",
    // TODO: à reconfirmer par le client, peut avoir évolué.
    capital: "500 €",
    siren: "878 766 351",
    siret: "878 766 351 00018",
    // TODO: à reconfirmer par le client.
    dirigeant: "Anne Pierre",
    // TODO: à compléter avant publication (hébergeur, directeur de publication).
    hebergeur: "[Nom, adresse et contact de l'hébergeur — à compléter]",
    directeurPublication: "[À compléter]",
  },
} as const;

export type SiteConfig = typeof siteConfig;
