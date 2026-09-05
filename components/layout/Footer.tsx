import Link from "next/link";
import {
  navigationComplete,
  navigationSecondaire,
} from "@/content/navigation";
import { siteConfig } from "@/content/siteConfig";

export default function Footer() {
  return (
    <footer className="border-t border-gris-chaud bg-ivoire">
      <div className="conteneur grid gap-8 py-16 md:gap-12 md:py-20 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl">{siteConfig.nom}</p>
          <p className="mt-1 text-xs uppercase tracking-surtitre text-taupe-fonce">
            {siteConfig.baseline}
          </p>
          <p className="colonne-lecture mt-6 text-sm text-taupe-fonce">
            {siteConfig.description}
          </p>
        </div>

        <nav aria-label="Navigation de pied de page">
          <p className="surtitre">La maison</p>
          <ul className="mt-5 space-y-3">
            {navigationComplete.map((lien) => (
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
          <div className="mt-2 flex flex-col gap-2 text-sm">
            {siteConfig.reseaux.instagram && (
              <a
                href={siteConfig.reseaux.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="lien-souligne self-start"
              >
                Instagram
              </a>
            )}
            {siteConfig.reseaux.facebook && (
              <a
                href={siteConfig.reseaux.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="lien-souligne self-start"
              >
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>

        <div className="border-t border-gris-chaud">
        <div className="conteneur flex flex-col items-start justify-between gap-2 py-5 text-xs text-taupe-fonce md:flex-row md:items-center md:gap-4 md:py-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.nomComplet}
          </p>
          <nav aria-label="Liens légaux" className="flex gap-4 md:gap-6">
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
