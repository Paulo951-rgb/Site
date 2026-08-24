import Link from "next/link";
import {
  navigationPrincipale,
  navigationSecondaire,
} from "@/content/navigation";
import { siteConfig } from "@/content/siteConfig";

export default function Footer() {
  return (
    <footer className="border-t border-gris-chaud bg-ivoire">
      <div className="conteneur grid gap-12 py-20 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl">{siteConfig.nom}</p>
          <p className="mt-1 text-xs uppercase tracking-surtitre text-taupe">
            {siteConfig.baseline}
          </p>
          <p className="colonne-lecture mt-6 text-sm text-taupe">
            {siteConfig.description}
          </p>
        </div>

        <nav aria-label="Navigation de pied de page">
          <p className="surtitre">La maison</p>
          <ul className="mt-5 space-y-3">
            {navigationPrincipale.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className="lien-souligne text-sm text-noir"
                >
                  {lien.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="surtitre">L'atelier</p>
          <address className="mt-5 text-sm not-italic leading-relaxed text-noir">
            {siteConfig.adresse.rue}
            <br />
            {siteConfig.adresse.codePostal} {siteConfig.adresse.ville}
            <br />
            {siteConfig.horaires.jours}
          </address>
          <p className="mt-5 text-sm">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="lien-souligne"
            >
              {siteConfig.contact.email}
            </a>
          </p>
          {siteConfig.reseaux.instagram && (
            <p className="mt-2 text-sm">
              <a
                href={siteConfig.reseaux.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="lien-souligne"
              >
                Instagram
              </a>
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-gris-chaud">
        <div className="conteneur flex flex-col items-start justify-between gap-4 py-6 text-xs text-taupe md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.nomComplet}
          </p>
          <nav aria-label="Liens légaux" className="flex gap-6">
            {navigationSecondaire.map((lien) => (
              <Link key={lien.href} href={lien.href} className="lien-souligne">
                {lien.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
