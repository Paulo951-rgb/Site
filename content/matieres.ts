/**
 * Matières et tanneries confirmées (section 1.3 du cahier des charges).
 * Ne jamais ajouter une matière, une tannerie ou une peau non confirmée
 * par le client. Chaque entrée est modifiable ici sans toucher au code.
 */

export interface Tannerie {
  nom: string;
  note: string;
}

export interface Matiere {
  nom: string;
  slug: string;
  description: string;
  image: string;
}

export const tanneries: Tannerie[] = [
  {
    nom: "Hermès Cuirs Précieux (HCP)",
    note: "Peausseries fines et peaux d'exception.",
  },
  {
    nom: "Tannerie Rémy Carriat",
    note: "Tannerie française reconnue pour ses cuirs de qualité.",
  },
  {
    nom: "Tanneries du Puy",
    note: "Une référence du cuir de veau haut de gamme.",
  },
  {
    nom: "Tanneries Haas",
    note: "Savoir-faire alsacien, cuirs pour la chaussure et la maroquinerie.",
  },
  {
    nom: "Tanneries d'Annonay",
    note: "Cuir de veau de tradition, apprécié des grands bottiers.",
  },
];

export const matieres: Matiere[] = [
  {
    nom: "Cuir pleine fleur",
    slug: "cuir-pleine-fleur",
    description:
      "La fleur intacte du cuir, la plus noble : elle garde le grain naturel de la peau, sa profondeur et sa capacité à se patiner avec le temps.",
    image: "/images/matieres/pleine-fleur.jpg",
  },
  {
    nom: "Peausseries fines",
    slug: "peausseries-fines",
    description:
      "Des peaux d'agneau et de veau d'une grande souplesse, choisies pour les souliers, les bottines et la maroquinerie les plus délicats.",
    image: "/images/matieres/peausseries-fines.jpg",
  },
  {
    nom: "Peaux exotiques rares",
    slug: "peaux-exotiques",
    description:
      "Crocodile, alligator et peaux de reptiles d'exception, travaillés pour des pièces uniques et des restaurations de très haute exigence.",
    image: "/images/matieres/peaux-exotiques.jpg",
  },
  {
    nom: "Cuir français",
    slug: "cuir-francais",
    description:
      "Des cuirs issus de tanneries françaises renommées, certifiés et tracés, au cœur de toutes les fabrications de l'atelier.",
    image: "/images/matieres/cuir-francais.jpg",
  },
];
