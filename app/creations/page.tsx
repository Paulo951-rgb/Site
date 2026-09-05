import type { Metadata } from "next";
import { construireMetadata } from "@/lib/seo";
import {
  creations,
  categoriesLabels,
  type CreationCategorie,
} from "@/content/creations";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CreationCard from "@/components/creations/CreationCard";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = construireMetadata({
  titre: "Créations",
  description:
    "Souliers sur mesure, prêt-à-porter personnalisable, maroquinerie, bagagerie et restauration : les créations de l'atelier Pierre & Pavin.",
  chemin: "/creations",
});

const ordreCategories: CreationCategorie[] = [
  "soulier-sur-mesure",
  "pret-a-porter",
  "maroquinerie",
  "bagagerie",
  "restauration",
];

export default function CreationsPage() {
  return (
    <>
      <section className="conteneur pb-16 pt-24 sm:pt-32 md:pt-52">
        <RevealOnScroll>
          <p className="surtitre">Créations</p>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl font-light sm:text-5xl md:text-7xl">
            Pièces uniques & créations d'atelier
          </h1>
          <p className="colonne-lecture mt-8 text-lg text-noir/80">
            Chaque pièce présentée ici est fabriquée à la commande, aux mesures
            et aux couleurs de son destinataire. Rien n'est produit en série :
            chaque création commence par un échange en atelier.
          </p>
        </RevealOnScroll>
      </section>

      {ordreCategories.map((categorie) => {
        const liste = creations.filter((c) => c.categorie === categorie);
        if (liste.length === 0) return null;

        return (
          <section
            key={categorie}
            className="border-t border-gris-chaud py-20 md:py-28"
          >
            <div className="conteneur">
              <RevealOnScroll>
                <h2 className="font-serif text-2xl md:text-3xl">
                  {categoriesLabels[categorie]}
                </h2>
              </RevealOnScroll>
              <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {liste.map((creation, i) => (
                  <RevealOnScroll key={creation.id} delai={i * 0.06}>
                    <CreationCard creation={creation} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <ContactCTA
        titre="Une pièce vous parle ?"
        texte="Chaque création peut être adaptée à vos mesures et à vos couleurs. Venez en parler à l'atelier, ou écrivez-nous."
      />
    </>
  );
}
