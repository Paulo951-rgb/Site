import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ImagePanel from "@/components/ui/ImagePanel";
import { siteConfig } from "@/content/siteConfig";

/**
 * Aperçu éditorial du compte Instagram de la maison.
 * Si siteConfig.reseaux.instagram est vide, la section s'affiche sans lien.
 */
export default function InstagramFeed() {
  const url = siteConfig.reseaux.instagram;
  const images = [
    "/images/details/detail-01.jpg",
    "/images/details/detail-02.jpg",
    "/images/details/detail-03.jpg",
    "/images/details/detail-04.jpg",
  ];

  return (
    <section className="py-28 md:py-36">
      <div className="conteneur">
        <RevealOnScroll>
          <SectionTitle surtitre="Carnet d'atelier" titre="La vie de l'atelier, en images">
            {url ? (
              <p>
                Suivre la maison sur{" "}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lien-souligne text-cuir"
                >
                  Instagram
                </a>
                .
              </p>
            ) : (
              <p>
                Gestes, matières et pièces en cours — le carnet quotidien de
                l'atelier.
              </p>
            )}
          </SectionTitle>
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {images.map((src, i) => (
            <RevealOnScroll key={src} delai={i * 0.06}>
              <ImagePanel
                src={src}
                alt="Détail de l'atelier Pierre & Pavin"
                ratio="aspect-square"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
