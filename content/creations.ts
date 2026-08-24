/**
 * Données typées des créations.
 * Aucun prix, aucune notion de stock ou de disponibilité chiffrée.
 *
 * Les entrées ci-dessous correspondent UNIQUEMENT aux prestations confirmées
 * (section 1.4 du cahier des charges). Le client pourra remplacer les textes,
 * ajouter des pièces réelles et brancher un CMS headless sans refonte :
 * il suffira de remplacer l'export `creations` par une source de données.
 */

export type CreationCategorie =
  | "soulier-sur-mesure"
  | "pret-a-porter"
  | "maroquinerie"
  | "bagagerie"
  | "restauration";

export type CreationStatut =
  | "piece-unique"
  | "creation"
  | "realisation"
  | "archive"
  | "sur-demande";

export interface ComparaisonAvantApres {
  avant: string;
  apres: string;
  legendeAvant?: string;
  legendeApres?: string;
}

export interface Creation {
  id: string;
  nom: string;
  slug: string;
  categorie: CreationCategorie;
  statut: CreationStatut;
  description: string;
  matiere: string;
  details?: string[];
  images: string[];
  featured?: boolean;
  /**
   * Paire de photos réelles avant/après fournie par la maison
   * (restauration, patine). Ne jamais simuler : le comparateur ne
   * s'affiche que si ce champ est renseigné avec des images authentiques.
   */
  comparaison?: ComparaisonAvantApres;
}

export const categoriesLabels: Record<CreationCategorie, string> = {
  "soulier-sur-mesure": "Souliers sur mesure",
  "pret-a-porter": "Prêt-à-porter",
  maroquinerie: "Maroquinerie",
  bagagerie: "Bagagerie",
  restauration: "Restauration & patine",
};

export const statutsLabels: Record<CreationStatut, string> = {
  "piece-unique": "Pièce unique",
  creation: "Création",
  realisation: "Réalisation",
  archive: "Archive",
  "sur-demande": "Sur demande",
};

export const creations: Creation[] = [
  {
    id: "0001",
    nom: "Soulier sur mesure",
    slug: "soulier-sur-mesure",
    categorie: "soulier-sur-mesure",
    statut: "piece-unique",
    description:
      "Un soulier entièrement fait et monté à la main en atelier, homme ou femme, construit sur les mesures exactes du pied. Chaque paire est une pièce unique, du 38 au 48.",
    matiere: "Cuir pleine fleur, cuir français de grandes tanneries",
    details: [
      "Fabrication et montage entièrement à la main",
      "Mesures prises en atelier ou lors d'un rendez-vous à domicile",
      "Du 38 au 48",
    ],
    images: [
      "/images/souliers/sur-mesure-01.jpg",
      "/images/souliers/sur-mesure-02.jpg",
      "/images/details/main-cousu.jpg",
    ],
    featured: true,
  },
  {
    id: "0002",
    nom: "Prêt-à-porter personnalisable",
    slug: "pret-a-porter-personnalisable",
    categorie: "pret-a-porter",
    statut: "creation",
    description:
      "Une collection de souliers de prêt-à-porter présentée au showroom, personnalisable à la couleur, avec mise à la mesure possible selon la configuration du pied.",
    matiere: "Cuir pleine fleur, peausseries fines",
    details: [
      "Personnalisation de la couleur",
      "Mise à la mesure selon la configuration du pied",
      "Modèles à découvrir au showroom",
    ],
    images: [
      "/images/souliers/pret-a-porter-01.jpg",
      "/images/souliers/pret-a-porter-02.jpg",
    ],
    featured: true,
  },
  {
    id: "0003",
    nom: "Baskets de bottier",
    slug: "baskets-de-bottier",
    categorie: "pret-a-porter",
    statut: "creation",
    description:
      "Deux gammes de baskets fabriquées avec le même savoir-faire qu'un soulier. Elles peuvent être réalisées sur mesure, aux mesures et aux couleurs du client.",
    matiere: "Cuir pleine fleur, peausseries fines",
    details: [
      "Deux gammes existantes",
      "Réalisables sur mesure",
      "Même exigence de fabrication qu'un soulier",
    ],
    images: ["/images/souliers/baskets-01.jpg"],
    featured: true,
  },
  {
    id: "0004",
    nom: "Bottines Chelsea",
    slug: "bottines-chelsea",
    categorie: "pret-a-porter",
    statut: "creation",
    description:
      "Des bottines Chelsea Boots fabriquées en cuir de tannerie française, personnalisables en couleur.",
    matiere: "Cuir de tannerie française",
    details: ["Cuir français", "Personnalisation de la couleur"],
    images: ["/images/souliers/chelsea-01.jpg"],
  },
  {
    id: "0005",
    nom: "Patine & recolorisation de souliers",
    slug: "patine-recolorisation",
    categorie: "restauration",
    statut: "sur-demande",
    description:
      "Un processus long et minutieux, en plusieurs étapes, pour garantir la pénétration des pigments et la tenue de la couleur dans le temps. Souliers et maroquinerie retrouvent profondeur et nuances.",
    matiere: "Soins et pigments adaptés à chaque cuir",
    details: [
      "Processus en plusieurs étapes",
      "Pénétration durable des pigments",
      "Souliers et maroquinerie",
    ],
    images: [
      "/images/details/patine-01.jpg",
      "/images/details/patine-02.jpg",
    ],
    featured: true,
  },
  {
    id: "0006",
    nom: "Maroquinerie",
    slug: "maroquinerie",
    categorie: "maroquinerie",
    statut: "creation",
    description:
      "Sacs à main et sacoches réalisés en collaboration avec de grands ateliers de maroquinerie. Certains modèles portent le prénom du client à l'origine de la demande — une personnalisation qui commence par une rencontre.",
    matiere: "Cuir pleine fleur, peausseries fines",
    details: [
      "En collaboration avec de grands ateliers de maroquinerie",
      "Certains modèles portent le prénom de leur premier client",
    ],
    images: [
      "/images/maroquinerie/sac-01.jpg",
      "/images/maroquinerie/sacoche-01.jpg",
    ],
    featured: true,
  },
  {
    id: "0007",
    nom: "Petite maroquinerie — seconde vie",
    slug: "petite-maroquinerie",
    categorie: "maroquinerie",
    statut: "creation",
    description:
      "Porte-cartes et portefeuilles conçus à partir de chutes haut de gamme provenant de grandes maisons de luxe. Une démarche zéro déchet qui offre une seconde vie à de belles matières.",
    matiere: "Chutes de cuirs haut de gamme",
    details: [
      "Conçues à partir de chutes de grandes maisons",
      "Démarche zéro déchet",
      "Porte-cartes et portefeuilles",
    ],
    images: ["/images/maroquinerie/petite-maroquinerie-01.jpg"],
  },
  {
    id: "0008",
    nom: "Bagagerie",
    slug: "bagagerie",
    categorie: "bagagerie",
    statut: "sur-demande",
    description:
      "Des pièces de bagagerie réalisées avec la même exigence que la maroquinerie de la maison, en collaboration avec de grands ateliers.",
    matiere: "Cuir pleine fleur",
    details: ["Réalisées en collaboration avec de grands ateliers"],
    images: ["/images/maroquinerie/bagagerie-01.jpg"],
  },
  {
    id: "0009",
    nom: "Restauration de sacs d'exception",
    slug: "restauration-sacs",
    categorie: "restauration",
    statut: "sur-demande",
    description:
      "Restauration et recolorisation de sacs de luxe, y compris en crocodile, alligator et peaux exotiques rares. Un travail de conservation autant que de réparation.",
    matiere: "Crocodile, alligator, peaux exotiques rares",
    details: [
      "Restauration et recolorisation",
      "Crocodile, alligator et peaux exotiques rares",
    ],
    images: [
      "/images/maroquinerie/restauration-01.jpg",
      "/images/details/restauration-01.jpg",
    ],
    featured: true,
  },
];

export function getCreationParSlug(slug: string): Creation | undefined {
  return creations.find((c) => c.slug === slug);
}

export function getCreationsParCategorie(
  categorie: CreationCategorie
): Creation[] {
  return creations.filter((c) => c.categorie === categorie);
}
