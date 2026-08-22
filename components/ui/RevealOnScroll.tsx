"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal au scroll : fondu + translation verticale courte (16–24px max).
 * Désactivé si prefers-reduced-motion.
 */
export default function RevealOnScroll({
  children,
  delai = 0,
  decalage = 20,
  className = "",
}: {
  children: ReactNode;
  delai?: number;
  decalage?: number;
  className?: string;
}) {
  const reduit = useReducedMotion();

  if (reduit) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: Math.min(decalage, 24) }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: delai, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
