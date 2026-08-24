"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navigationComplete } from "@/content/navigation";
import { siteConfig } from "@/content/siteConfig";
import { t } from "@/content/i18n";

const SELECTEUR_FOCUSABLES =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function FullscreenMenu({
  ouvert,
  onNavigate,
  onFermer,
}: {
  ouvert: boolean;
  onNavigate: () => void;
  onFermer: () => void;
}) {
  const reduit = useReducedMotion();
  const dialogueRef = useRef<HTMLDivElement>(null);

  // Accessibilité : focus dans le dialogue à l'ouverture, piège à focus
  // (Tab / Maj+Tab cyclent), Échap ferme, le parent rend le focus au bouton.
  useEffect(() => {
    if (!ouvert) return;
    const dialogue = dialogueRef.current;
    if (!dialogue) return;

    const focusables = () =>
      Array.from(dialogue.querySelectorAll<HTMLElement>(SELECTEUR_FOCUSABLES));

    focusables()[0]?.focus();

    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onFermer();
        return;
      }
      if (e.key !== "Tab") return;
      const elements = focusables();
      if (elements.length === 0) return;
      const premier = elements[0];
      const dernier = elements[elements.length - 1];
      if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault();
        dernier.focus();
      } else if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault();
        premier.focus();
      }
    };

    document.addEventListener("keydown", surTouche);
    return () => document.removeEventListener("keydown", surTouche);
  }, [ouvert, onFermer]);

  return (
    <AnimatePresence>
      {ouvert && (
        <motion.div
          ref={dialogueRef}
          id="menu-plein-ecran"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-30 flex flex-col bg-noir text-ivoire"
          initial={reduit ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduit ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav
            aria-label={t().navigationPrincipale}
            className="conteneur flex flex-1 flex-col justify-center gap-2 pt-20"
          >
            {navigationComplete.map((lien, i) => (
              <motion.div
                key={lien.href}
                initial={reduit ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: reduit ? 0 : 0.08 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={lien.href}
                  onClick={onNavigate}
                  className="block border-b border-ivoire/10 py-2 font-serif text-3xl transition-colors duration-300 hover:text-taupe md:py-3 md:text-5xl"
                >
                  {lien.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="conteneur pb-12"
            initial={reduit ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduit ? 0 : 0.45, duration: 0.5 }}
          >
            <Link
              href="/contact"
              onClick={onNavigate}
              className="inline-block border border-ivoire/40 px-8 py-4 text-sm uppercase tracking-surtitre transition-colors duration-300 hover:border-ivoire hover:bg-ivoire hover:text-noir"
            >
              Prendre rendez-vous
            </Link>
            <p className="mt-6 text-sm text-taupe">
              {siteConfig.adresse.rue}, {siteConfig.adresse.codePostal}{" "}
              {siteConfig.adresse.ville} — {siteConfig.horaires.jours}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
