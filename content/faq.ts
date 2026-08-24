/**
 * Questions fréquentes de la maison.
 *
 * Règle éditoriale : aucune information commerciale non confirmée.
 * Les réponses marquées [À confirmer] doivent être validées par le client
 * avant mise en production. On ne parle jamais de tarifs ici : chaque projet
 * fait l'objet d'un devis après un premier échange à l'atelier.
 */
export interface QuestionFaq {
  question: string;
  reponse: string;
}

export const questionsFrequentes: QuestionFaq[] = [
  {
    question: "Faut-il prendre rendez-vous pour visiter l'atelier ?",
    reponse:
      "Le showroom du 107 rue Blomet est ouvert du mardi au samedi. Vous pouvez passer librement pour découvrir la collection ; pour un essayage ou un projet sur mesure, il est toutefois conseillé de prendre rendez-vous afin que l'artisan soit disponible.",
  },
  {
    question: "Combien de temps prend une paire sur mesure ?",
    reponse:
      "Une paire sur mesure demande plusieurs semaines : prise de mesures, réalisation de la forme, essayage, montage et finitions. [À confirmer : délai indicatif moyen communiqué par la maison.]",
  },
  {
    question: "Comment se déroule un premier rendez-vous sur mesure ?",
    reponse:
      "Le premier échange sert à comprendre votre usage, vos goûts et votre morphologie de pied. L'artisan prend les mesures, vous présente les cuirs et les modèles, puis un devis est établi avant tout engagement.",
  },
  {
    question: "Quelles pointures sont réalisables ?",
    reponse:
      "Le sur-mesure s'adapte à toutes les pointures, y compris les demi-pointures et les morphologies particulières. La collection de prêt-à-porter homme couvre du 39 au 47.",
  },
  {
    question: "Réalisez-vous des souliers pour les femmes ?",
    reponse:
      "Oui. Le sur-mesure s'adresse aux femmes comme aux hommes ; la collection de prêt-à-porter est, elle, dédiée à l'homme.",
  },
  {
    question: "Quelles matières utilisez-vous ?",
    reponse:
      "La maison travaille des cuirs pleine fleur, des peausseries fines (veau velours, nubuck) et des peaux exotiques — crocodile et alligator notamment — dans le respect de la réglementation en vigueur.",
  },
  {
    question: "D'où viennent les cuirs ?",
    reponse:
      "La maison privilégie les cuirs français, choisis auprès de tanneries partenaires pour leur grain et leur tenue. [À confirmer : tanneries citables nommément.]",
  },
  {
    question: "Restaurez-vous les sacs et la maroquinerie ?",
    reponse:
      "Oui. L'atelier restaure et recolorise les sacs et pièces de maroquinerie haut de gamme — crocodile, alligator et peaux exotiques rares — pour leur redonner une seconde vie.",
  },
  {
    question: "Qu'est-ce que la patine ?",
    reponse:
      "La patine est un travail manuel de la couleur, pratiqué par la maison depuis trente ans : superposées à la main, les teintes créent des nuances profondes et changeantes, uniques à chaque pièce.",
  },
  {
    question: "Intervenez-vous à domicile ?",
    reponse:
      "Sur rendez-vous, l'atelier se déplace : essayage à domicile, présentation de la collection de prêt-à-porter, recolorisation de votre maroquinerie. [À confirmer : zone géographique couverte.]",
  },
  {
    question: "Quel budget prévoir ?",
    reponse:
      "Chaque pièce est unique : le budget dépend de la matière, de la construction et des finitions choisies. La maison établit un devis précis après le premier échange, sans engagement.",
  },
  {
    question: "Entretenez-vous les souliers après réalisation ?",
    reponse:
      "Oui : ressemelage, réparations et entretien sont assurés par l'atelier, prolongation naturelle du savoir-faire de cordonnerie de la maison. Voir aussi notre guide d'entretien.",
  },
];
