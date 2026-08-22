import type { Metadata } from "next";
import { construireMetadata } from "@/lib/seo";
import IntroSection from "@/components/sections/IntroSection";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ImagePanel from "@/components/ui/ImagePanel";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = construireMetadata({
  titre: "La Maison",
  description:
    "Pierre & Pavin — Façonniers : une maison née de la rencontre d'un relieur d'art et d'un cordonnier-bottier, poursuivie par une deuxième génération.",
  chemin: "/maison",
});

export default function MaisonPage() {
  return (
    <>
      <section className="conteneur pb-10 pt-40 md:pt-52">
        <RevealOnScroll>
          <p className="surtitre">La maison</p>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-light md:text-7xl">
            Une maison de cuir, entre reliure et botterie
          </h1>
        </RevealOnScroll>
      </section>

      <IntroSection
        surtitre="Origines"
        titre="La rencontre de deux histoires familiales"
        texte={[
          "Pierre & Pavin porte en elle deux gestes qui se sont appris en famille : celui du relieur d'art, qui habille le papier et l'objet de cuir avec précision, et celui du cordonnier-bottier, qui construit le soulier de la forme à la finition.",
          "Aujourd'hui, c'est une deuxième génération qui poursuit cette double passion de l'artisanat du cuir, dans le même atelier-boutique du 15ᵉ arrondissement de Paris. La maison est restée volontairement à taille humaine : chaque pièce qui sort de l'atelier est connue de ceux qui l'ont faite.",
          "Cette double culture — botterie et maroquinerie — donne à la maison sa singularité : le soulier et le sac y sont pensés avec la même exigence, les mêmes cuirs et la même attention aux gestes.",
        ]}
      />

      <section className="bg-noir py-28 text-ivoire md:py-40">
        <div className="conteneur grid gap-14 lg:grid-cols-2 lg:items-center">
          <RevealOnScroll>
            <ImagePanel
              src="/images/portraits/atelier-portrait.jpg"
              alt="Le travail du cuir à l'atelier Pierre & Pavin"
              ratio="aspect-[4/5]"
            />
          </RevealOnScroll>
          <div>
            <RevealOnScroll delai={0.1}>
              <SectionTitle
                inverse
                surtitre="Aujourd'hui"
                titre="Pour les particuliers comme pour les professionnels"
              >
                <p>
                  L'atelier reçoit celles et ceux qui veulent un soulier à
                  leurs mesures, une pièce de maroquinerie, ou rendre vie à un
                  sac d'exception.
                </p>
                <p>
                  Architectes, designers et stylistes commandent aussi à la
                  maison des développements sur cuir : la même rigueur de
                  fabrication, appliquée à leurs projets.
                </p>
                <p>
                  Certaines pièces de maroquinerie portent encore le prénom du
                  client à l'origine de la demande — une manière, pour la
                  maison, de se souvenir que chaque création commence par une
                  rencontre.
                </p>
              </SectionTitle>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <IntroSection
        surtitre="Engagement"
        titre="Une seconde vie pour les belles matières"
        texte={[
          "Sur la petite maroquinerie, la maison a fait un choix simple : concevoir ses porte-cartes et portefeuilles à partir de chutes haut de gamme provenant de grandes maisons de luxe. Rien ne se perd de ces cuirs d'exception — tout se transforme.",
          "Les cuirs utilisés par l'atelier proviennent de grandes tanneries reconnues et sont certifiés. Cette exigence sur la matière est le premier geste du savoir-faire.",
        ]}
      />

      <ContactCTA titre="Venir à la rencontre de la maison" />
    </>
  );
}
