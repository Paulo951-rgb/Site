import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ImagePanel from "@/components/ui/ImagePanel";
import ContactCTA from "@/components/sections/ContactCTA";
import { construireMetadata } from "@/lib/seo";
import { articles, articleParSlug } from "@/content/journal";
import { siteConfig } from "@/content/siteConfig";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleParSlug(slug);
  if (!article) return construireMetadata({ titre: "Journal" });
  return construireMetadata({
    titre: article.titre,
    description: article.chapo,
    chemin: `/journal/${article.slug}`,
    image: article.image,
  });
}

const formaterDate = (iso: string) =>
  // timeZone fixe : "AAAA-MM-JJ" est parsé en UTC ; sans fuseau explicite,
  // la date affichée peut reculer d'un jour selon le fuseau du visiteur.
  new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(new Date(iso));

export default async function PageArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleParSlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.titre,
    description: article.chapo,
    datePublished: article.date,
    image: `${siteConfig.seo.url}${article.image}`,
    author: { "@type": "Organization", name: siteConfig.nomComplet },
    publisher: { "@type": "Organization", name: siteConfig.nomComplet },
    mainEntityOfPage: `${siteConfig.seo.url}/journal/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header className="conteneur pb-16 pt-40 md:pt-52">
          <RevealOnScroll>
            <p className="surtitre">
              Journal ·{" "}
              <time dateTime={article.date}>{formaterDate(article.date)}</time>
            </p>
            <h1 className="mt-6 max-w-4xl font-serif text-4xl font-light md:text-6xl">
              {article.titre}
            </h1>
            <p className="colonne-lecture mt-8 text-lg text-noir/80">
              {article.chapo}
            </p>
          </RevealOnScroll>
        </header>

        <div className="conteneur">
          <RevealOnScroll>
            <ImagePanel
              src={article.image}
              alt={article.imageAlt}
              ratio="aspect-[21/9]"
              priorite
              sizes="100vw"
            />
          </RevealOnScroll>
        </div>

        <div className="conteneur py-20">
          <div className="colonne-lecture mx-auto space-y-12">
            {article.sections.map((section, i) => (
              <section key={section.titre ?? `s${i}`}>
                {section.titre && (
                  <h2 className="font-serif text-2xl md:text-3xl">
                    {section.titre}
                  </h2>
                )}
                <div
                  className={`space-y-4 text-base leading-relaxed text-noir/80 ${
                    section.titre ? "mt-5" : ""
                  }`}
                >
                  {section.paragraphes.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <p>
              <Link
                href="/journal"
                className="lien-souligne text-sm uppercase tracking-surtitre text-taupe-fonce transition-colors duration-300 hover:text-cuir"
              >
                ← Tous les articles
              </Link>
            </p>
          </div>
        </div>
      </article>

      <ContactCTA />
    </>
  );
}
