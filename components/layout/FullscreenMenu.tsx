"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navigationPrincipale } from "@/content/navigation";
import { siteConfig } from "@/content/siteConfig";

export default function FullscreenMenu({ ouvert }: { ouvert: boolean }) {
  const reduit = useReducedMotion();

  return (
    <AnimatePresence>
      {ouvert && (
        <motion.div
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
            aria-label="Navigation plein écran"
            className="conteneur flex flex-1 flex-col justify-center gap-2 pt-20"
          >
            {navigationPrincipale.map((lien, i) => (
              <motion.div
                key={lien.href}
                initial={reduit ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: reduit ? 0 : 0.08 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={lien.href}
                  className="block border-b border-ivoire/10 py-3 font-serif text-4xl transition-colors duration-300 hover:text-taupe md:text-5xl"
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
