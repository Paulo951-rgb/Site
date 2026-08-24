import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionTitle from "@/components/ui/SectionTitle";
import { temoignages } from "@/content/temoignages";

/**
 * Paroles de clients. La section ne s'affiche que si la maison a fourni
 * des témoignages réels et validés (voir content/temoignages.ts) :
 * aucune citation n'est jamais inventée.
 */
export default function Temoignages() {
  if (temoignages.length === 0) return null;

  return (
    <section
      aria-labelledby="titre-temoignages"
      className="border-t border-gris-chaud py-28 md:py-36"
    >
      <div className="conteneur">
        <RevealOnScroll>
          <SectionTitle
            surtitre="Paroles de clients"
            titre="Ceux qui passent la porte"
          />
        </RevealOnScroll>

        <ul className="mt-16 grid gap-14 md:grid-cols-2 lg:grid-cols-3">
          {temoignages.map((t, i) => (
            <li key={t.signature}>
              <RevealOnScroll delai={i * 0.08}>
                <figure className="flex h-full flex-col">
                  <blockquote className="font-serif text-xl font-light leading-relaxed">
                    «&nbsp;{t.citation}&nbsp;»
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-taupe-fonce">
                    {t.signature}
                    {t.contexte && (
                      <span className="block text-xs uppercase tracking-surtitre">
                        {t.contexte}
                      </span>
                    )}
                  </figcaption>
                </figure>
              </RevealOnScroll>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
