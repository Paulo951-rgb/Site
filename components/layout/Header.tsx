"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationPrincipale } from "@/content/navigation";
import { siteConfig } from "@/content/siteConfig";
import { t } from "@/content/i18n";
import FullscreenMenu from "./FullscreenMenu";

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [defile, setDefile] = useState(false);
  const pathname = usePathname();
  const boutonMenuRef = useRef<HTMLButtonElement>(null);
  // Le focus n'est rendu au bouton que si le menu était réellement ouvert
  // (évite de voler le focus au premier rendu).
  const menuEtaitOuvert = useRef(false);

  useEffect(() => {
    const auDefilement = () => setDefile(window.scrollY > 24);
    auDefilement();
    window.addEventListener("scroll", auDefilement, { passive: true });
    return () => window.removeEventListener("scroll", auDefilement);
  }, []);

  // Si la fenêtre passe en largeur desktop pendant que le menu est ouvert,
  // le bouton bascule disparaît (lg:hidden) : il faut fermer le menu,
  // sinon l'écran reste couvert et le scroll verrouillé sans issue visible.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const auChangement = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOuvert(false);
    };
    media.addEventListener("change", auChangement);
    return () => media.removeEventListener("change", auChangement);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOuvert ? "hidden" : "";
    if (menuOuvert) {
      menuEtaitOuvert.current = true;
    } else if (menuEtaitOuvert.current) {
      menuEtaitOuvert.current = false;
      boutonMenuRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOuvert]);

  // Texte ivoire quand le header surplombe un fond sombre : hero de la page
  // d'accueil au repos, ou menu plein écran (fond noir) ouvert.
  const surFondSombre = menuOuvert || (pathname === "/" && !defile);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-400 ease-doux ${
          defile && !menuOuvert
            ? "bg-ivoire/95 backdrop-blur-sm border-b border-gris-chaud"
            : "bg-transparent"
        } ${surFondSombre ? "text-ivoire" : "text-noir"}`}
      >
        <div className="conteneur flex h-16 items-center justify-between sm:h-18 lg:h-20">
          <Link
            href="/"
            className="font-serif text-base tracking-large sm:text-lg"
            aria-label={`${siteConfig.nomComplet} — accueil`}
          >
            {siteConfig.nom}
            <span
              className={`ml-1 hidden text-[10px] uppercase tracking-surtitre sm:text-xs sm:ml-2 sm:inline ${
                surFondSombre ? "text-taupe" : "text-taupe-fonce"
              }`}
            >
              {siteConfig.baseline}
            </span>
          </Link>

          <nav
            aria-label={t().navigationPrincipale}
            className="hidden items-center gap-8 lg:flex"
          >
            {navigationPrincipale.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
                aria-current={pathname === lien.href ? "page" : undefined}
                className={`lien-souligne text-sm tracking-large transition-colors duration-300 ${
                  pathname === lien.href ? "text-cuir" : "hover:text-cuir"
                }`}
              >
                {lien.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            ref={boutonMenuRef}
            onClick={() => setMenuOuvert((v) => !v)}
            aria-expanded={menuOuvert}
            aria-controls="menu-plein-ecran"
            className="flex items-center gap-3 text-sm uppercase tracking-surtitre lg:hidden"
          >
            {menuOuvert ? "Fermer" : "Menu"}
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
                  menuOuvert ? "translate-y-[5.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${
                  menuOuvert ? "-translate-y-[5.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <FullscreenMenu
        ouvert={menuOuvert}
        onNavigate={() => setMenuOuvert(false)}
        onFermer={() => setMenuOuvert(false)}
      />
    </>
  );
}
