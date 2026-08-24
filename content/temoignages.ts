/**
 * Témoignages clients.
 *
 * ⚠️ Ne jamais inventer de citation. Chaque témoignage publié ici doit être
 * une parole réelle, recueillie et validée par le client (droit à l'image et
 * à la parole). Tant que la maison n'a pas fourni de témoignages confirmés,
 * la liste reste vide et la section ne s'affiche pas sur le site.
 */
export interface Temoignage {
  citation: string;
  /** Prénom ou initiales + contexte, tels que validés par le client. */
  signature: string;
  /** Ex. "Paire sur mesure", "Restauration d'un sac" — optionnel. */
  contexte?: string;
}

// TODO: intégrer ici les témoignages réels fournis par le client.
export const temoignages: Temoignage[] = [];
