"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationPrincipale } from "@/content/navigation";
import { siteConfig } from "@/content/siteConfig";
import FullscreenMenu from "./FullscreenMenu";

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [defile, setDefile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const auDefilement = () => setDefile(window.scrollY > 24);
    auDefilement();
    window.addEventListener("scroll", auDefilement, { passive: true });
    return () => window.removeEventListener("scroll", auDefilement);
  }, []);

  useEffect(() => {
    setMenuOuvert(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOuvert ? "hidden" : "";
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
        <div className="conteneur flex h-20 items-center justify-between">
          <Link
            href="/"
            className="font-serif text-lg tracking-large"
            aria-label={`${siteConfig.nomComplet} — accueil`}
          >
            {siteConfig.nom}
            <span className="ml-2 hidden text-xs uppercase tracking-surtitre text-taupe sm:inline">
              {siteConfig.baseline}
            </span>
          </Link>

          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-8 lg:flex"
          >
            {navigationPrincipale.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
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

      <FullscreenMenu ouvert={menuOuvert} />
    </>
  );
}
