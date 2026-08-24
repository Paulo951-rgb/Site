import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ContactCTA from "@/components/sections/ContactCTA";
import { construireMetadata } from "@/lib/seo";
import { questionsFrequentes } from "@/content/faq";

export const metadata: Metadata = construireMetadata({
  titre: "Questions fréquentes",
  description:
    "Sur mesure, délais, matières, patine, restauration, rendez-vous : les réponses de la maison Pierre & Pavin aux questions les plus fréquentes.",
  chemin: "/faq",
});

export default function PageFaq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questionsFrequentes.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.reponse },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="conteneur pb-16 pt-40 md:pt-52">
        <RevealOnScroll>
          <p className="surtitre">Questions fréquentes</p>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-light md:text-7xl">
            Tout ce que l'on nous demande, sans détour
          </h1>
          <p className="colonne-lecture mt-8 text-lg text-noir/80">
            Rendez-vous, sur mesure, matières, patine, restauration : les
            réponses de la maison. Et si votre question n'y figure pas,
            l'atelier y répond de vive voix.
          </p>
        </RevealOnScroll>
      </section>

      <section className="conteneur pb-28">
        <div className="colonne-lecture">
          {questionsFrequentes.map((q, i) => (
            <RevealOnScroll key={q.question} delai={Math.min(i * 0.03, 0.2)}>
              <div className="border-b border-gris-chaud">
                <details className="group py-6">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 font-serif text-xl transition-colors duration-300 hover:text-cuir [&::-webkit-details-marker]:hidden">
                    {q.question}
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-2xl leading-none text-cuir transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-base leading-relaxed text-noir/80">
                    {q.reponse}
                  </p>
                </details>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <ContactCTA
        titre="Une question plus personnelle ?"
        texte="Par téléphone, par le formulaire ou au comptoir de la rue Blomet : la maison répond à toutes les questions sur un projet."
      />
    </>
  );
}
