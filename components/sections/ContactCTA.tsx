import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { ButtonLien } from "@/components/ui/Button";
import { siteConfig } from "@/content/siteConfig";

export default function ContactCTA({
  titre = "Parler de votre projet",
  texte = "Un soulier sur mesure, une pièce à restaurer, un développement sur cuir : chaque projet commence par un échange, en atelier ou à domicile.",
}: {
  titre?: string;
  texte?: string;
}) {
  return (
    <section className="border-t border-gris-chaud bg-gris-chaud/40 py-20 md:py-36">
      <div className="conteneur max-w-3xl text-center md:mx-auto">
        <RevealOnScroll>
          <p className="surtitre">Rendez-vous</p>
          <h2 className="mt-4 font-serif text-3xl md:text-5xl">{titre}</h2>
          <p className="colonne-lecture mx-auto mt-6 text-base text-noir/75">
            {texte}
          </p>
          <p className="mt-4 text-sm text-taupe-fonce">
            {siteConfig.adresse.rue}, {siteConfig.adresse.codePostal}{" "}
            {siteConfig.adresse.ville} — {siteConfig.horaires.jours.toLowerCase()}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLien href="/contact" variante="plein">
              Prendre rendez-vous
            </ButtonLien>
            <ButtonLien href={`mailto:${siteConfig.contact.email}`}>
              Nous contacter
            </ButtonLien>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
