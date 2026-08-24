/**
 * Journal de la maison : articles éditoriaux.
 * Contenus factuels, fondés sur les savoir-faire confirmés de la maison
 * (site officiel, FAQ de l'atelier) — aucun fait n'est inventé.
 * Pour ajouter un article, compléter le tableau ci-dessous.
 */

export interface Article {
  slug: string;
  titre: string;
  chapo: string;
  date: string; // ISO 8601 (AAAA-MM-JJ)
  image: string;
  imageAlt: string;
  /** Corps de l'article : sections titrées, paragraphes en texte simple. */
  sections: { titre?: string; paragraphes: string[] }[];
}

export const articles: Article[] = [
  {
    slug: "la-patine-art-de-la-couleur",
    titre: "La patine, l'art de redonner vie au cuir",
    chapo:
      "D'un léger réglage de teinte à la transformation profonde, la patine est un processus long et minutieux. Plongée dans l'un des savoir-faire signatures de la maison.",
    date: "2026-08-24",
    image: "/images/details/patine-01.jpg",
    imageAlt: "Application d'une patine sur un soulier à l'atelier",
    sections: [
      {
        paragraphes: [
          "Sur un beau cuir, la couleur n'est pas un vernis posé en surface : c'est une matière vivante, qui se construit par couches successives. La patine consiste à teinter, nourrir et nuancer le cuir pour lui redonner profondeur — ou pour l'emmener vers une couleur entièrement nouvelle.",
          "Chez Pierre & Pavin, ce processus se déroule en plusieurs étapes, de la préparation du cuir jusqu'aux finitions. Selon le projet, il peut s'agir d'un ajustement élégant de la teinte d'origine comme d'une transformation profonde.",
        ],
      },
      {
        titre: "Pas seulement les souliers",
        paragraphes: [
          "La patine et la recolorisation s'appliquent aussi à la maroquinerie et aux pièces d'exception : sacs, sacoches, et même certains canapés en cuir. Chaque pièce est d'abord examinée à l'atelier — ou photographiée par vos soins — avant que la maison ne propose une approche.",
          "Pour les projets qui ne peuvent pas se déplacer, la maison propose aussi la recolorisation à domicile, sur rendez-vous.",
        ],
      },
      {
        titre: "Un geste qui s'entretient",
        paragraphes: [
          "Une patine réussie se prolonge par un entretien régulier : crème nourrissante adaptée, embauchoirs en cèdre pour les souliers, et gestes simples au quotidien. La maison détaille ses conseils dans son guide d'entretien, et reste disponible pour toute question sur une pièce patinée.",
        ],
      },
    ],
  },
  {
    slug: "baskets-de-bottier",
    titre: "Baskets de bottier : quand le sportswear rencontre la bottellerie",
    chapo:
      "Assemblées à la main dans l'atelier parisien, les baskets de la maison appliquent les exigences du soulier habillé à un modèle contemporain.",
    date: "2026-08-24",
    image: "/images/souliers/baskets-01.jpg",
    imageAlt: "Baskets de bottier assemblées à la main",
    sections: [
      {
        paragraphes: [
          "Une basket signée par un bottier n'est pas une basket comme les autres. Derrière le modèle, il y a les gestes de la bottellerie : la coupe d'un veau pleine fleur, l'assemblage à la main, la finition d'une semelle pensée pour durer.",
          "Les baskets de la maison sont assemblées à la main dans l'atelier parisien, en veau pleine fleur, avec une semelle intérieure amovible en cuir et une semelle en cuir de buffle à tannage végétal.",
        ],
      },
      {
        titre: "Personnalisables, comme tout le reste",
        paragraphes: [
          "Comme les modèles de prêt-à-porter de la maison, les baskets se personnalisent : coloris, finitions, détails. Un même modèle peut ainsi devenir une pièce singulière, discutée en atelier autour d'un café.",
        ],
      },
    ],
  },
];

export function articleParSlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
