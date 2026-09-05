import Link from "next/link";
import { matieres, tanneries } from "@/content/matieres";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ImagePanel from "@/components/ui/ImagePanel";
import { ButtonLien } from "@/components/ui/Button";

export default function MatieresPreview() {
  return (
    <section className="bg-noir py-20 text-ivoire md:py-40">
      <div className="conteneur">
        <RevealOnScroll>
          <SectionTitle
            inverse
            surtitre="Matières"
            titre="Des cuirs choisis, certifiés, tracés"
          >
            <p>
              L'atelier ne travaille qu'avec de grandes tanneries reconnues :
              Hermès Cuirs Précieux, Rémy Carriat, Tanneries du Puy, Tanneries
              Haas et Tanneries d'Annonay.
            </p>
          </SectionTitle>
        </RevealOnScroll>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {matieres.map((matiere, i) => (
            <RevealOnScroll key={matiere.slug} delai={i * 0.06}>
              <Link href="/matieres" className="group block">
                <ImagePanel
                  src={matiere.image}
                  alt={matiere.nom}
                  ratio="aspect-square"
                  zoomHover
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <p className="mt-4 font-serif text-xl">{matiere.nom}</p>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delai={0.2}>
          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ivoire/10 pt-8">
            <p className="surtitre">Tanneries partenaires</p>
            {tanneries.map((t) => (
              <span key={t.nom} className="text-sm text-gris-chaud">
                {t.nom}
              </span>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delai={0.25}>
          <div className="mt-12">
            <ButtonLien href="/matieres" variante="inverse">
              Découvrir les matières
            </ButtonLien>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
