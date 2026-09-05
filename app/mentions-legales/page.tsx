import type { Metadata } from "next";
import { construireMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/siteConfig";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = construireMetadata({
  titre: "Mentions légales",
  chemin: "/mentions-legales",
});

const { legal, adresse, contact, nomComplet } = siteConfig;

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

export default function MentionsLegalesPage() {
  return (
    <div className="conteneur max-w-3xl pb-28 pt-24 sm:pt-32 md:pt-52">
      <RevealOnScroll>
        <p className="surtitre">Mentions légales</p>
        <h1 className="mt-6 font-serif text-4xl md:text-5xl">
          Informations légales
        </h1>
        <p className="mt-6 text-sm text-taupe-fonce">
          {/* TODO: faire valider cette page par le client avant publication —
              les informations légales peuvent avoir évolué. */}
          Les informations ci-dessous sont en cours de validation définitive
          par la maison.
        </p>
      </RevealOnScroll>

      <div className="mt-12">
        <Bloc titre="Éditeur du site">
          <p>
            {legal.raisonSociale} — {legal.formeJuridique} au capital de{" "}
            {legal.capital}
          </p>
          <p>
            Siège social : {adresse.rue}, {adresse.codePostal} {adresse.ville},{" "}
            {adresse.pays}
          </p>
          <p>
            SIREN : {legal.siren} — SIRET : {legal.siret}
          </p>
          <p>Présidente : {legal.dirigeant}</p>
          <p>
            Contact :{" "}
            <a href={`mailto:${contact.email}`} className="lien-souligne">
              {contact.email}
            </a>
          </p>
        </Bloc>

        <Bloc titre="Directeur de la publication">
          <p>{legal.directeurPublication}</p>
        </Bloc>

        <Bloc titre="Hébergement">
          <p>{legal.hebergeur}</p>
        </Bloc>

        <Bloc titre="Propriété intellectuelle">
          <p>
            L'ensemble des contenus du site {nomComplet} (textes, images,
            photographies, identité visuelle) est protégé par le droit de la
            propriété intellectuelle. Toute reproduction ou réutilisation, en
            tout ou partie, sans autorisation écrite préalable est interdite.
          </p>
        </Bloc>

        <Bloc titre="Données personnelles">
          <p>
            Les informations transmises via le formulaire de contact sont
            utilisées uniquement pour répondre à votre demande. Pour en savoir
            plus, consultez la page{" "}
            <a href="/confidentialite" className="lien-souligne text-cuir">
              Confidentialité
            </a>
            .
          </p>
        </Bloc>
      </div>
    </div>
  );
}
