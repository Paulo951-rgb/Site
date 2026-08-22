import type { Metadata } from "next";
import { construireMetadata } from "@/lib/seo";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ImagePanel from "@/components/ui/ImagePanel";
import ContactCTA from "@/components/sections/ContactCTA";
import { ButtonLien } from "@/components/ui/Button";

export const metadata: Metadata = construireMetadata({
  titre: "Sur mesure",
  description:
    "Souliers sur mesure homme et femme, entièrement faits et montés à la main en atelier. Prise de mesures en atelier ou à domicile, du 38 au 48.",
  chemin: "/sur-mesure",
});

const etapes = [
  {
    titre: "L'échange",
    texte:
      "Tout commence par une conversation, en atelier ou à votre domicile. Vos envies, votre usage, votre pied : c'est la matière première du projet.",
  },
  {
    titre: "La prise de mesures",
    texte:
      "Les mesures du pied sont relevées avec précision. Le sur-mesure est proposé du 38 au 48, pour l'homme comme pour la femme.",
  },
  {
    titre: "Le choix des cuirs",
    texte:
      "Cuir pleine fleur, peausseries fines, peaux exotiques : les cuirs proviennent des grandes tanneries partenaires de la maison et sont certifiés.",
  },
  {
    titre: "La fabrication à la main",
    texte:
      "La paire est entièrement faite et montée à la main en atelier. Les essayages rythment la fabrication jusqu'à la pièce finale.",
  },
];

export default function SurMesurePage() {
  return (
    <>
      <section className="conteneur pb-20 pt-40 md:pt-52">
        <RevealOnScroll>
          <p className="surtitre">Sur mesure</p>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-light md:text-7xl">
            Un soulier construit sur votre pied
          </h1>
          <p className="colonne-lecture mt-8 text-lg text-noir/80">
            Pièce unique par définition, le soulier sur mesure est entièrement
            fait et monté à la main en atelier. Baskets et bottines peuvent,
            elles aussi, être réalisées à vos mesures et à vos couleurs.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delai={0.15}>
          <div className="mt-10">
            <ButtonLien href="/contact" variante="plein">
              Parler de votre projet
            </ButtonLien>
          </div>
        </RevealOnScroll>
      </section>

      <section className="bg-noir py-28 text-ivoire md:py-40">
        <div className="conteneur">
          <RevealOnScroll>
            <p className="surtitre">Le déroulé</p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl md:text-5xl">
              Quatre temps, un seul objectif : la juste mesure
            </h2>
          </RevealOnScroll>
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            {etapes.map((etape, i) => (
              <RevealOnScroll key={etape.titre} delai={i * 0.08}>
                <div className="border-t border-ivoire/15 pt-8">
                  <p className="font-serif text-4xl text-metal">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl">{etape.titre}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-gris-chaud">
                    {etape.texte}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-40">
        <div className="conteneur grid items-center gap-14 lg:grid-cols-2">
          <RevealOnScroll>
            <ImagePanel
              src="/images/souliers/sur-mesure-02.jpg"
              alt="Soulier sur mesure en cours de fabrication"
              ratio="aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </RevealOnScroll>
          <div>
            <RevealOnScroll delai={0.1}>
              <p className="surtitre">À domicile</p>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl">
                L'atelier peut aussi venir à vous
              </h2>
              <p className="colonne-lecture mt-6 text-base text-noir/80">
                Sur rendez-vous, la maison propose l'essayage à domicile, la
                présentation de la collection de prêt-à-porter et la
                recolorisation de votre maroquinerie. Les commandes finalisées
                en atelier sont livrées de manière sécurisée.
              </p>
              <div className="mt-10">
                <ButtonLien href="/contact">Prendre rendez-vous</ButtonLien>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <ContactCTA
        titre="Commencer un projet sur mesure"
        texte="Un premier échange, sans engagement, pour parler de votre pied, de vos cuirs et de vos envies."
      />
    </>
  );
}
