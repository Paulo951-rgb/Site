import Hero from "@/components/sections/Hero";
import IntroSection from "@/components/sections/IntroSection";
import SavoirFaireGrid from "@/components/sections/SavoirFaireGrid";
import CreationsPreview from "@/components/sections/CreationsPreview";
import MatieresPreview from "@/components/sections/MatieresPreview";
import AtelierPreview from "@/components/sections/AtelierPreview";
import Temoignages from "@/components/sections/Temoignages";
import InstagramFeed from "@/components/sections/InstagramFeed";
import ContactCTA from "@/components/sections/ContactCTA";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { ButtonLien } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>
      <Hero
        image="/images/hero/hero-01.jpg"
        titre="Bottier & maroquinier, façonniers de pièces uniques"
        sousTitre="Un atelier parisien où chaque soulier, chaque sac, chaque restauration naît d'une rencontre et de gestes faits main."
      />

      <IntroSection
        surtitre="La maison"
        titre="Deux histoires familiales, une même passion du cuir"
        texte={[
          "Pierre & Pavin est née de la rencontre de deux traditions artisanales : celle d'un relieur d'art et celle d'un cordonnier-bottier. Aujourd'hui, une deuxième génération poursuit cette double passion, entre botterie et maroquinerie.",
          "Particuliers et professionnels — architectes, designers, stylistes — confient à l'atelier leurs projets sur cuir, qu'il s'agisse d'une paire de souliers sur mesure ou d'un développement spécifique.",
        ]}
      />

      <SavoirFaireGrid
        items={[
          {
            titre: "Souliers sur mesure",
            texte:
              "Entièrement faits et montés à la main en atelier, aux mesures exactes du pied. Homme et femme, du 38 au 48.",
            image: "/images/souliers/sur-mesure-01.jpg",
            href: "/sur-mesure",
          },
          {
            titre: "Patine & restauration",
            texte:
              "Un processus long et minutieux, en plusieurs étapes, pour redonner profondeur et couleur aux souliers et sacs d'exception.",
            image: "/images/details/patine-01.jpg",
            href: "/savoir-faire",
          },
          {
            titre: "Maroquinerie",
            texte:
              "Sacs, sacoches et petite maroquinerie, réalisés en collaboration avec de grands ateliers. Certains modèles portent le prénom de leur premier client.",
            image: "/images/maroquinerie/sac-01.jpg",
            href: "/creations",
          },
        ]}
      />

      <CreationsPreview />

      <MatieresPreview />

      <AtelierPreview />

      <Temoignages />

      <section className="border-t border-gris-chaud py-28 md:py-36">
        <div className="conteneur grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <RevealOnScroll>
              <p className="surtitre">Sur mesure</p>
              <h2 className="mt-4 font-serif text-3xl md:text-5xl">
                Une pièce unique commence par une conversation
              </h2>
            </RevealOnScroll>
          </div>
          <div className="md:col-span-5">
            <RevealOnScroll delai={0.1}>
              <p className="text-base text-noir/80">
                Prise de mesures, choix des cuirs, essayages : la création sur
                mesure se vit en atelier, ou à votre domicile sur rendez-vous.
              </p>
              <div className="mt-8">
                <ButtonLien href="/sur-mesure" variante="plein">
                  Création sur mesure
                </ButtonLien>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <InstagramFeed />

      <ContactCTA />
    </>
  );
}
