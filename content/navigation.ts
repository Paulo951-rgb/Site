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

export const navigationSecondaire: LienNavigation[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
];
