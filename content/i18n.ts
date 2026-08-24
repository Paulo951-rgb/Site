/**
 * Préparation à l'internationalisation (fr → en).
 *
 * Stratégie retenue : migration douce sans réécriture immédiate.
 *  1. Tous les contenus éditoriaux vivent déjà dans /content (jamais codés
 *     en dur dans les composants) : c'est le point d'entrée unique des textes.
 *  2. Lorsque la version anglaise sera décidée, chaque module /content
 *     exporte une structure typée `Contenus` ; on ajoutera alors
 *     `content/en/*.ts` respectant les mêmes types, puis une locale dans
 *     la configuration Next.js (`i18n` App Router : app/[locale]/…).
 *  3. Les métadonnées SEO passent par lib/seo.ts (construireMetadata) qui
 *     accepte déjà la description et le titre par page : ajouter `locale`
 *     et `hreflang` suffira.
 *
 * En attendant, ce module centralise la locale courante et les libellés
 * d'interface susceptibles de rester hors de /content.
 */

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const localeParDefaut: Locale = "fr";

export const labelsInterface: Record<
  Locale,
  {
    fermerMenu: string;
    ouvrirMenu: string;
    navigationPrincipale: string;
    retourAccueil: string;
    passerAuContenu: string;
  }
> = {
  fr: {
    fermerMenu: "Fermer le menu",
    ouvrirMenu: "Ouvrir le menu",
    navigationPrincipale: "Navigation principale",
    retourAccueil: "Retour à l'accueil",
    passerAuContenu: "Aller au contenu principal",
  },
  en: {
    fermerMenu: "Close menu",
    ouvrirMenu: "Open menu",
    navigationPrincipale: "Main navigation",
    retourAccueil: "Back to homepage",
    passerAuContenu: "Skip to main content",
  },
};

export function t(locale: Locale = localeParDefaut) {
  return labelsInterface[locale] ?? labelsInterface[localeParDefaut];
}
