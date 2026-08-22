import type { Metadata } from "next";
import { construireMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/siteConfig";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ImagePanel from "@/components/ui/ImagePanel";
import SectionTitle from "@/components/ui/SectionTitle";
import MapEmbed from "@/components/contact/MapEmbed";
import ContactCTA from "@/components/sections/ContactCTA";
import { ButtonLien } from "@/components/ui/Button";

export const metadata: Metadata = construireMetadata({
  titre: "L'atelier",
  description:
    "Atelier-boutique et showroom Pierre & Pavin, 107 rue Blomet, Paris 15ᵉ. Ouvert du mardi au samedi. Services à domicile sur rendez-vous.",
  chemin: "/atelier",
});

export default function AtelierPage() {
  return (
    <>
      <section className="conteneur pb-20 pt-40 md:pt-52">
        <RevealOnScroll>
          <p className="surtitre">L'atelier</p>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-light md:text-7xl">
            107 rue Blomet, Paris XVᵉ
          </h1>
          <p className="colonne-lecture mt-8 text-lg text-noir/80">
            Un atelier-boutique où l'on fabrique, où l'on restaure et où l'on
            reçoit. Le showroom présente les modèles de prêt-à-porter —
            souliers et maroquinerie — {siteConfig.horaires.jours.toLowerCase()}.
          </p>
        </RevealOnScroll>
      </section>

      <section className="conteneur pb-28">
        <RevealOnScroll>
          <ImagePanel
            src="/images/atelier/atelier-01.jpg"
            alt="L'atelier Pierre & Pavin, rue Blomet à Paris"
            ratio="aspect-[21/9]"
            priorite
            sizes="100vw"
          />
        </RevealOnScroll>
      </section>

      <section className="border-t border-gris-chaud py-28 md:py-36">
        <div className="conteneur grid gap-14 lg:grid-cols-2">
          <div>
            <RevealOnScroll>
              <SectionTitle
                surtitre="Venir à l'atelier"
                titre="Adresse & horaires"
              >
                <address className="not-italic">
                  {siteConfig.adresse.rue}
                  <br />
                  {siteConfig.adresse.codePostal} {siteConfig.adresse.ville}
                </address>
                <p>{siteConfig.horaires.jours}</p>
                <p className="text-taupe">{siteConfig.horaires.heures}</p>
              </SectionTitle>
            </RevealOnScroll>
            <RevealOnScroll delai={0.15}>
              <div className="mt-8 space-y-2 text-sm">
                <p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="lien-souligne"
                  >
                    {siteConfig.contact.email}
                  </a>
                </p>
                {/* ⚠️ Numéro à confirmer par le client avant mise en ligne
                    (voir content/siteConfig.ts). */}
                <p>
                  <a
                    href={`tel:${siteConfig.contact.telephone.replace(/\s/g, "")}`}
                    className="lien-souligne"
                  >
                    {siteConfig.contact.telephoneAffichage}
                  </a>
                </p>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delai={0.1}>
            <MapEmbed />
          </RevealOnScroll>
        </div>
      </section>

      <section className="bg-noir py-28 text-ivoire md:py-36">
        <div className="conteneur grid items-center gap-14 lg:grid-cols-2">
          <RevealOnScroll>
            <SectionTitle
              inverse
              surtitre="À domicile"
              titre="Les services de la maison, chez vous"
            >
              <p>
                Sur rendez-vous, l'atelier se déplace : essayage à domicile,
                présentation de la collection de prêt-à-porter, recolorisation
                de votre maroquinerie.
              </p>
              <p>
                Les commandes finalisées en atelier sont livrées de manière
                sécurisée.
              </p>
            </SectionTitle>
          </RevealOnScroll>
          <RevealOnScroll delai={0.15}>
            <div>
              <ImagePanel
                src="/images/atelier/atelier-04.jpg"
                alt="Service à domicile Pierre & Pavin"
                ratio="aspect-[4/3]"
              />
              <div className="mt-8">
                <ButtonLien href="/contact" variante="inverse">
                  Prendre rendez-vous
                </ButtonLien>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <ContactCTA
        titre="Passer la porte de l'atelier"
        texte="Le showroom est ouvert du mardi au samedi. Pour un essayage ou un projet sur mesure, mieux vaut prendre rendez-vous."
      />
    </>
  );
}
