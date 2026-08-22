import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ImagePanel from "@/components/ui/ImagePanel";
import { ButtonLien } from "@/components/ui/Button";
import { siteConfig } from "@/content/siteConfig";

export default function AtelierPreview() {
  return (
    <section className="py-28 md:py-40">
      <div className="conteneur grid items-center gap-14 lg:grid-cols-2">
        <RevealOnScroll>
          <div className="grid grid-cols-12 gap-4">
            <ImagePanel
              src="/images/atelier/atelier-01.jpg"
              alt="L'atelier Pierre & Pavin, rue Blomet"
              ratio="aspect-[3/4]"
              className="col-span-8"
            />
            <ImagePanel
              src="/images/atelier/atelier-02.jpg"
              alt="Outils et gestes de l'atelier"
              ratio="aspect-[3/4]"
              className="col-span-4 col-start-9 mt-16"
            />
          </div>
        </RevealOnScroll>

        <div>
          <RevealOnScroll delai={0.1}>
            <SectionTitle
              surtitre="L'atelier"
              titre="Un atelier-boutique au cœur du 15ᵉ arrondissement"
            >
              <p>
                Au 107 rue Blomet, l'atelier fabrique, restaure et reçoit. Un
                showroom présente les modèles de prêt-à-porter — souliers et
                maroquinerie — à découvrir {siteConfig.horaires.jours.toLowerCase()}.
              </p>
              <p>
                L'atelier se déplace aussi : essayage, présentation de la
                collection et recolorisation de maroquinerie à domicile, sur
                rendez-vous.
              </p>
            </SectionTitle>
          </RevealOnScroll>
          <RevealOnScroll delai={0.2}>
            <div className="mt-10">
              <ButtonLien href="/atelier">Découvrir l'atelier</ButtonLien>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
