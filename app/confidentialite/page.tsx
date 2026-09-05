import type { Metadata } from "next";
import { construireMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/siteConfig";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = construireMetadata({
  titre: "Confidentialité",
  chemin: "/confidentialite",
});

function Bloc({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-gris-chaud py-10">
      <h2 className="font-serif text-2xl">{titre}</h2>
      <div className="colonne-lecture mt-4 space-y-3 text-sm text-noir/80">
        {children}
      </div>
    </section>
  );
}

export default function ConfidentialitePage() {
  return (
    <div className="conteneur max-w-3xl pb-28 pt-24 sm:pt-32 md:pt-52">
      <RevealOnScroll>
        <p className="surtitre">Confidentialité</p>
        <h1 className="mt-6 font-serif text-4xl md:text-5xl">
          Politique de confidentialité
        </h1>
        <p className="mt-6 text-sm text-taupe-fonce">
          {/* TODO: compléter et valider les coordonnées RGPD avec le client
              avant publication. */}
          Cette page décrit la manière dont la maison traite vos données, dans
          le respect du RGPD.
        </p>
      </RevealOnScroll>

      <div className="mt-12">
        <Bloc titre="Données collectées">
          <p>
            Le formulaire de contact collecte uniquement les informations
            nécessaires pour répondre à votre demande : nom, adresse email,
            téléphone (facultatif), sujet et contenu de votre message.
          </p>
          <p>
            Ces données ne sont utilisées que pour l'échange avec l'atelier.
            Elles ne sont ni vendues, ni transmises à des tiers à des fins
            commerciales.
          </p>
        </Bloc>

        <Bloc titre="Mesure d'audience">
          <p>
            Le site utilise une solution de mesure d'audience respectueuse de
            la vie privée, sans cookie non essentiel. Aucun bandeau de
            consentement n'est donc nécessaire pour cette mesure.
          </p>
        </Bloc>

        <Bloc titre="Vos droits">
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de
            rectification et de suppression des données vous concernant. Pour
            exercer ces droits, écrivez à{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="lien-souligne text-cuir"
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
          <p>
            Vous pouvez également introduire une réclamation auprès de la CNIL
            (cnil.fr).
          </p>
        </Bloc>
      </div>
    </div>
  );
}
