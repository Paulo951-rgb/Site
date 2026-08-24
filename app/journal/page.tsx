import type { Metadata } from "next";
import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ImagePanel from "@/components/ui/ImagePanel";
import ContactCTA from "@/components/sections/ContactCTA";
import { construireMetadata } from "@/lib/seo";
import { articles } from "@/content/journal";

export const metadata: Metadata = construireMetadata({
  titre: "Journal",
  description:
    "Le journal de la maison Pierre & Pavin : savoir-faire, patine, coulisses de l'atelier et histoires de pièces.",
  chemin: "/journal",
});

const formaterDate = (iso: string) =>
  // timeZone fixe : "AAAA-MM-JJ" est parsé en UTC ; sans fuseau explicite,
  // la date affichée peut reculer d'un jour selon le fuseau du visiteur.
  new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(new Date(iso));

export default function PageJournal() {
  return (
    <>
      <section className="conteneur pb-16 pt-40 md:pt-52">
        <RevealOnScroll>
          <p className="surtitre">Journal</p>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-light md:text-7xl">
            Notes de l'atelier
          </h1>
          <p className="colonne-lecture mt-8 text-lg text-noir/80">
            Savoir-faire, patine, coulisses et histoires de pièces : la maison
            écrit ici ce qui se vit et se transmet rue Blomet.
          </p>
        </RevealOnScroll>
      </section>

      <section className="conteneur pb-28">
        <ul className="grid gap-16 md:grid-cols-2">
          {articles.map((article, i) => (
            <li key={article.slug}>
              <RevealOnScroll delai={i * 0.08}>
                <Link
                  href={`/journal/${article.slug}`}
                  className="group block"
                >
                  <ImagePanel
                    src={article.image}
                    alt={article.imageAlt}
                    ratio="aspect-[16/9]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <p className="mt-6 text-xs uppercase tracking-surtitre text-taupe-fonce">
                    <time dateTime={article.date}>
                      {formaterDate(article.date)}
                    </time>
                  </p>
                  <h2 className="mt-3 font-serif text-2xl transition-colors duration-300 group-hover:text-cuir md:text-3xl">
                    {article.titre}
                  </h2>
                  <p className="colonne-lecture mt-4 text-base text-noir/80">
                    {article.chapo}
                  </p>
                  <span className="lien-souligne mt-6 inline-block text-sm text-cuir">
                    Lire l'article
                  </span>
                </Link>
              </RevealOnScroll>
            </li>
          ))}
        </ul>
      </section>

      <ContactCTA />
    </>
  );
}
