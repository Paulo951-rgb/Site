import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function IntroSection({
  surtitre,
  titre,
  texte,
}: {
  surtitre: string;
  titre: string;
  texte: string[];
}) {
  return (
    <section className="py-28 md:py-40">
      <div className="conteneur grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <RevealOnScroll>
            <p className="surtitre">{surtitre}</p>
          </RevealOnScroll>
        </div>
        <div className="md:col-span-8 md:col-start-5">
          <RevealOnScroll delai={0.1}>
            <h2 className="font-serif text-3xl leading-snug md:text-4xl">
              {titre}
            </h2>
          </RevealOnScroll>
          {texte.map((paragraphe, i) => (
            <RevealOnScroll key={i} delai={0.18 + i * 0.08}>
              <p className="colonne-lecture mt-8 text-base text-noir/80">
                {paragraphe}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
