export interface LienNavigation {
  label: string;
  href: string;
}

export const navigationPrincipale: LienNavigation[] = [
  { label: "Maison", href: "/maison" },
  { label: "Savoir-faire", href: "/savoir-faire" },
  { label: "Créations", href: "/creations" },
  { label: "Sur mesure", href: "/sur-mesure" },
  { label: "Matières", href: "/matieres" },
  { label: "L'atelier", href: "/atelier" },
  { label: "Contact", href: "/contact" },
];

/** Liste complète : menu plein écran et pied de page. */
export const navigationComplete: LienNavigation[] = [
  ...navigationPrincipale.slice(0, 6),
  { label: "Entretien", href: "/entretien" },
  { label: "Questions fréquentes", href: "/faq" },
  navigationPrincipale[6],
];

export const navigationSecondaire: LienNavigation[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
];
