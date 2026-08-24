/**
 * Guide d'entretien des souliers et de la maroquinerie.
 * Conseils généraux de cordonnerie-maroquinerie — contenu éditorial
 * de la maison, relu avant publication.
 */
export interface ConseilEntretien {
  titre: string;
  texte: string[];
}

export const conseilsEntretien: ConseilEntretien[] = [
  {
    titre: "Le geste quotidien",
    texte: [
      "Après chaque port, dépoussiérez le cuir avec une brosse souple ou un chiffon doux. Laissez ensuite la paire reposer au moins vingt-quatre heures : le cuir, qui emmagasine l'humidité du pied, a besoin de sécher pour conserver sa forme.",
      "Glissez des embauchoirs — idéalement en cèdre, qui absorbe l'humidité et parfume — dès que la paire est retirée. C'est le geste le plus simple pour prolonger la vie d'un soulier.",
    ],
  },
  {
    titre: "Nourrir le cuir",
    texte: [
      "Un cuir pleine fleur se nourrit régulièrement : une crème de qualité, appliquée en fine couche au chiffon, puis lustrée après quelques minutes de pose. Mieux vaut de petites quantités fréquentes qu'une application généreuse occasionnelle.",
      "Alternez les paires : porter deux jours de suite le même soulier use prématurément le cuir et la première de montage.",
    ],
  },
  {
    titre: "Les peausseries fines",
    texte: [
      "Veau velours et nubuck se brossent dans le sens du poil, à sec. Un imperméabilisant adapté, appliqué avant les premières sorties et renouvelé régulièrement, les protège des averses et des taches.",
      "Évitez l'eau savonneuse, qui tasse le poil et marque définitivement ces matières.",
    ],
  },
  {
    titre: "Les peaux exotiques",
    texte: [
      "Crocodile et alligator demandent une attention particulière : crème spécifique peaux de reptile, application dans le sens des écailles, conservation à l'abri de la chaleur et de la lumière directe.",
      "Une peau exotique desséchée se craquelle de manière irréversible : en cas de doute, confiez la pièce à l'atelier plutôt que de tenter un produit inadapté.",
    ],
  },
  {
    titre: "La patine",
    texte: [
      "Une patine est une teinture réalisée à la main : elle ne s'entretient pas comme un cuir teinté en surface. Bannissez les produits décapants et les cirages couvrants qui masqueraient les nuances.",
      "Pour raviver une patine ternie par le temps, l'atelier réalise des recolorisations : c'est l'un des gestes signatures de la maison.",
    ],
  },
  {
    titre: "La maroquinerie",
    texte: [
      "Rangez sacs et pochettes dans leur housse, garnis de papier de soie pour conserver leur forme, loin de l'humidité comme des sources de chaleur.",
      "Ne surchargez pas une pièce de maroquinerie : les anses et les coutures en souffrent durablement. Les bords teintés se retouchent à l'atelier lorsqu'ils s'usent.",
    ],
  },
  {
    titre: "Confier à l'atelier",
    texte: [
      "Ressemelage, réparation de coutures, recolorisation d'un sac ou d'une paire : l'atelier reprend ses créations comme les pièces d'autres maisons. Héritier d'un savoir-faire de cordonnerie, il remet en état ce que le temps a marqué.",
      "Pour toute question sur une pièce précise, contactez la maison ou passez au showroom : un diagnostic est toujours préférable à un geste irréversible.",
    ],
  },
];
