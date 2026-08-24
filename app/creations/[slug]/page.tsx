import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { construireMetadata } from "@/lib/seo";
import { creations, getCreationParSlug } from "@/content/creations";
import CreationDetail from "@/components/creations/CreationDetail";
import CreationCard from "@/components/creations/CreationCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ContactCTA from "@/components/sections/ContactCTA";

export function generateStaticParams() {
  return creations.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const creation = getCreationParSlug(slug);
  if (!creation) return construireMetadata({ titre: "Création" });

  return construireMetadata({
    titre: creation.nom,
    description: creation.description,
    chemin: `/creations/${creation.slug}`,
  });
}

export default async function CreationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const creation = getCreationParSlug(slug);
  if (!creation) notFound();

  const autres = creations
    .filter((c) => c.slug !== creation.slug && c.categorie === creation.categorie)
    .concat(creations.filter((c) => c.slug !== creation.slug))
    .filter((c, i, arr) => arr.findIndex((x) => x.id === c.id) === i)
    .slice(0, 3);

  return (
    <>
      <div className="conteneur pt-28">
        <Link
          href="/creations"
          className="lien-souligne text-xs uppercase tracking-surtitre text-taupe"
        >
          ← Toutes les créations
        </Link>
      </div>

      <CreationDetail creation={creation} />

      {autres.length > 0 && (
        <section className="border-t border-gris-chaud py-20 md:py-28">
          <div className="conteneur">
            <RevealOnScroll>
              <h2 className="font-serif text-2xl md:text-3xl">
                À découvrir également
              </h2>
            </RevealOnScroll>
            <div className="mt-12 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {autres.map((c, i) => (
                <RevealOnScroll key={c.id} delai={i * 0.06}>
                  <CreationCard creation={c} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTA
        titre="Parler de cette création"
        texte="Cette pièce peut être réalisée à vos mesures ou servir de point de départ à un projet personnalisé."
      />
    </>
  );
}
