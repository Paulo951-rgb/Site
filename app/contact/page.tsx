import type { Metadata } from "next";
import { construireMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/siteConfig";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ContactForm from "@/components/contact/ContactForm";
import MapEmbed from "@/components/contact/MapEmbed";

export const metadata: Metadata = construireMetadata({
  titre: "Contact",
  description:
    "Contacter l'atelier Pierre & Pavin : création sur mesure, restauration, rendez-vous en atelier ou à domicile. 107 rue Blomet, Paris 15ᵉ.",
  chemin: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="conteneur pb-16 pt-40 md:pt-52">
        <RevealOnScroll>
          <p className="surtitre">Contact</p>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-light md:text-7xl">
            Parler de votre projet
          </h1>
          <p className="colonne-lecture mt-8 text-lg text-noir/80">
            Création sur mesure, personnalisation, restauration d'une pièce
            d'exception ou rendez-vous à domicile : écrivez-nous, l'atelier
            répond personnellement à chaque message.
          </p>
        </RevealOnScroll>
      </section>

      <section className="conteneur grid gap-16 pb-28 lg:grid-cols-5">
        <RevealOnScroll className="lg:col-span-3">
          <ContactForm />
        </RevealOnScroll>

        <RevealOnScroll delai={0.15} className="lg:col-span-2">
          <aside className="space-y-10 border-t border-gris-chaud pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <div>
              <p className="surtitre">L'atelier</p>
              <address className="mt-4 text-sm not-italic leading-relaxed">
                {siteConfig.adresse.rue}
                <br />
                {siteConfig.adresse.codePostal} {siteConfig.adresse.ville}
                <br />
                {siteConfig.horaires.jours}
              </address>
              <p className="mt-2 text-xs text-taupe">
                {siteConfig.horaires.heures}
              </p>
            </div>

            <div>
              <p className="surtitre">Écrire ou appeler</p>
              <p className="mt-4 text-sm">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="lien-souligne"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              {/* ⚠️ Numéro à confirmer par le client avant mise en ligne
                  (voir content/siteConfig.ts). */}
              <p className="mt-2 text-sm">
                <a
                  href={`tel:${siteConfig.contact.telephone.replace(/\s/g, "")}`}
                  className="lien-souligne"
                >
                  {siteConfig.contact.telephoneAffichage}
                </a>
              </p>
            </div>

            <div>
              <p className="surtitre">Plan d'accès</p>
              <div className="mt-4">
                <MapEmbed />
              </div>
            </div>
          </aside>
        </RevealOnScroll>
      </section>
    </>
  );
}
