import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactCTA from "@/components/sections/ContactCTA";
import { construireMetadata } from "@/lib/seo";
import { conseilsEntretien } from "@/content/entretien";

export const metadata: Metadata = construireMetadata({
  titre: "Entretien & seconde vie",
  description:
    "Embauchoirs, crèmes, patine, peaux exotiques : les conseils de la maison Pierre & Pavin pour faire durer souliers et maroquinerie, et le rôle de l'atelier dans la réparation.",
  chemin: "/entretien",
});

export default function PageEntretien() {
  return (
    <>
      <section className="conteneur pb-16 pt-40 md:pt-52">
        <RevealOnScroll>
          <p className="surtitre">Entretien &amp; seconde vie</p>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-light md:text-7xl">
            Faire durer ce qui a été fait pour durer
          </h1>
          <p className="colonne-lecture mt-8 text-lg text-noir/80">
            Un beau cuir se bonifie avec les années, à condition de quelques
            gestes simples. La maison partage ici ses conseils — et reprend en
            atelier ce que le temps a marqué.
          </p>
        </RevealOnScroll>
      </section>

      <section className="conteneur pb-28">
        <ol className="colonne-lecture space-y-20">
          {conseilsEntretien.map((conseil, i) => (
            <li key={conseil.titre}>
              <RevealOnScroll>
                <SectionTitle
                  surtitre={String(i + 1).padStart(2, "0")}
                  titre={conseil.titre}
                >
                  <div className="space-y-4">
                    {conseil.texte.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </SectionTitle>
              </RevealOnScroll>
            </li>
          ))}
        </ol>
      </section>

      <ContactCTA
        titre="Une pièce à faire revivre ?"
        texte="Ressemelage, réparation, recolorisation : apportez-la à l'atelier ou décrivez-la par le formulaire, la maison vous répond."
      />
    </>
  );
}
