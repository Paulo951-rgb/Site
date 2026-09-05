import type { Metadata } from "next";
import { construireMetadata } from "@/lib/seo";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionTitle from "@/components/ui/SectionTitle";
import ImagePanel from "@/components/ui/ImagePanel";
import ContactCTA from "@/components/sections/ContactCTA";
import { ButtonLien } from "@/components/ui/Button";

export const metadata: Metadata = construireMetadata({
  titre: "Savoir-faire",
  description:
    "Souliers faits et montés à la main, patine en plusieurs étapes, maroquinerie avec de grands ateliers : le savoir-faire de Pierre & Pavin.",
  chemin: "/savoir-faire",
});

const savoirs = [
  {
    titre: "La botterie sur mesure",
    texte:
      "Chaque soulier sur mesure est entièrement fait et monté à la main en atelier. De la prise de mesures aux derniers essayages, la paire est construite sur le pied de son propriétaire — homme ou femme, du 38 au 48.",
    image: "/images/details/main-cousu.jpg",
  },
  {
    titre: "La patine et la recolorisation",
    texte:
      "La patine est un processus long et minutieux, mené en plusieurs étapes pour garantir la pénétration des pigments et la tenue de la couleur dans le temps. Elle redonne profondeur aux souliers comme à la maroquinerie.",
    image: "/images/details/patine-02.jpg",
  },
  {
    titre: "La maroquinerie et la bagagerie",
    texte:
      "Sacs à main, sacoches, petite maroquinerie et bagagerie sont réalisés en collaboration avec de grands ateliers de maroquinerie, dans les cuirs des grandes tanneries partenaires de la maison.",
    image: "/images/maroquinerie/sacoche-01.jpg",
  },
  {
    titre: "La restauration de pièces d'exception",
    texte:
      "L'atelier restaure et recolorise les sacs de luxe, y compris en crocodile, alligator et peaux exotiques rares. Un travail de conservation autant que de réparation, mené avec la plus grande prudence.",
    image: "/images/details/restauration-01.jpg",
  },
  {
    titre: "Les développements pour professionnels",
    texte:
      "Architectes, designers et stylistes confient à l'atelier des développements sur cuir : la maison met son savoir-faire au service de leurs projets.",
    image: "/images/details/detail-02.jpg",
  },
  {
    titre: "Les services à domicile",
    texte:
      "Sur rendez-vous, l'atelier se déplace : essayage, présentation de la collection de prêt-à-porter, recolorisation de maroquinerie à domicile et livraison sécurisée des commandes finalisées en atelier.",
    image: "/images/atelier/atelier-03.jpg",
  },
];

export default function SavoirFairePage() {
  return (
    <>
      <section className="conteneur pb-20 pt-24 sm:pt-32 md:pt-52">
        <RevealOnScroll>
          <p className="surtitre">Savoir-faire</p>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl font-light sm:text-5xl md:text-7xl">
            Des gestes appris, transmis, répétés
          </h1>
          <p className="colonne-lecture mt-8 text-lg text-noir/80">
            Tout ce qui sort de l'atelier passe par la main : la botterie, la
            patine, la maroquinerie, la restauration. Voici les gestes de la
            maison.
          </p>
        </RevealOnScroll>
      </section>

      <section className="pb-20 md:pb-40">
        <div className="conteneur space-y-20 md:space-y-32">
          {savoirs.map((savoir, i) => (
            <div
              key={savoir.titre}
                   className={`grid items-center gap-8 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <RevealOnScroll>
                <ImagePanel
                  src={savoir.image}
                  alt={savoir.titre}
                  ratio="aspect-[4/3]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </RevealOnScroll>
              <RevealOnScroll delai={0.1}>
                <p className="surtitre">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-4 font-serif text-2xl md:text-4xl">
                  {savoir.titre}
                </h2>
                <p className="colonne-lecture mt-6 text-base text-noir/80">
                  {savoir.texte}
                </p>
              </RevealOnScroll>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-gris-chaud py-20 text-center md:py-32">
        <RevealOnScroll>
          <div className="conteneur">
            <SectionTitle
              surtitre="Créations"
              titre="Voir ce que ces gestes produisent"
              className="mx-auto max-w-2xl"
            />
            <div className="mt-10">
              <ButtonLien href="/creations" variante="plein">
                Découvrir les créations
              </ButtonLien>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <ContactCTA />
    </>
  );
}
