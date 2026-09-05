import type { Metadata } from "next";
import { construireMetadata } from "@/lib/seo";
import { matieres, tanneries } from "@/content/matieres";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ImagePanel from "@/components/ui/ImagePanel";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = construireMetadata({
  titre: "Matières",
  description:
    "Cuir pleine fleur, peausseries fines, crocodile, alligator et peaux exotiques rares : les matières certifiées de l'atelier Pierre & Pavin.",
  chemin: "/matieres",
});

export default function MatieresPage() {
  return (
    <>
      <section className="conteneur pb-16 pt-24 sm:pt-32 md:pt-52">
        <RevealOnScroll>
          <p className="surtitre">Matières</p>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl font-light sm:text-5xl md:text-7xl">
            La matière d'abord
          </h1>
          <p className="colonne-lecture mt-8 text-lg text-noir/80">
            L'atelier ne travaille qu'avec de grandes tanneries reconnues et
            certifie ses cuirs. C'est la première exigence de la maison, avant
            tout geste de fabrication.
          </p>
        </RevealOnScroll>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="conteneur grid gap-14 md:grid-cols-2">
          {matieres.map((matiere, i) => (
            <RevealOnScroll key={matiere.slug} delai={i * 0.06}>
              <div>
                <ImagePanel
                  src={matiere.image}
                  alt={matiere.nom}
                  ratio="aspect-[3/2]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <h2 className="mt-6 font-serif text-2xl md:text-3xl">
                  {matiere.nom}
                </h2>
                <p className="colonne-lecture mt-4 text-sm leading-relaxed text-noir/75">
                  {matiere.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="bg-noir py-20 text-ivoire md:py-36">
        <div className="conteneur">
          <RevealOnScroll>
            <p className="surtitre">Tanneries partenaires</p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl md:text-5xl">
              Des maisons de cuir parmi les plus exigeantes
            </h2>
          </RevealOnScroll>
          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {tanneries.map((tannerie, i) => (
              <RevealOnScroll key={tannerie.nom} delai={i * 0.06}>
                <div className="border-t border-metal/40 pt-6">
                  <h3 className="font-serif text-xl">{tannerie.nom}</h3>
                  <p className="mt-2 text-sm text-gris-chaud">{tannerie.note}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA
        titre="Choisir une matière pour votre projet"
        texte="Venez toucher les cuirs en atelier : c'est souvent là que naissent les plus belles pièces."
      />
    </>
  );
}
