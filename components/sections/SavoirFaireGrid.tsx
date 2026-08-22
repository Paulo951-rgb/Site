import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ImagePanel from "@/components/ui/ImagePanel";

export interface SavoirFaireItem {
  titre: string;
  texte: string;
  image: string;
  href?: string;
}

export default function SavoirFaireGrid({
  items,
  titreSection = "Le savoir-faire",
  surtitre = "Gestes",
  inverse = false,
}: {
  items: SavoirFaireItem[];
  titreSection?: string;
  surtitre?: string;
  inverse?: boolean;
}) {
  return (
    <section className={`py-28 md:py-40 ${inverse ? "bg-noir text-ivoire" : ""}`}>
      <div className="conteneur">
        <RevealOnScroll>
          <SectionTitle surtitre={surtitre} titre={titreSection} inverse={inverse} />
        </RevealOnScroll>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const contenu = (
              <>
                <ImagePanel
                  src={item.image}
                  alt={item.titre}
                  ratio="aspect-[4/5]"
                  zoomHover={Boolean(item.href)}
                />
                <h3
                  className={`mt-6 font-serif text-2xl ${
                    inverse ? "text-ivoire" : "text-noir"
                  }`}
                >
                  {item.titre}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    inverse ? "text-gris-chaud" : "text-noir/75"
                  }`}
                >
                  {item.texte}
                </p>
              </>
            );

            return (
              <RevealOnScroll key={item.titre} delai={i * 0.08}>
                {item.href ? (
                  <Link href={item.href} className="group block">
                    {contenu}
                  </Link>
                ) : (
                  <div>{contenu}</div>
                )}
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
