"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ButtonLien } from "@/components/ui/Button";
import { siteConfig } from "@/content/siteConfig";

export default function Hero({
  image,
  titre,
  sousTitre,
}: {
  image: string;
  titre: string;
  sousTitre?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduit = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax très subtil, désactivé si prefers-reduced-motion.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduit ? "0%" : "12%"]);

  return (
    <section ref={ref} className="relative flex min-h-[92vh] items-end overflow-hidden bg-noir">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Voile uniforme pour la lisibilité — pas de dégradé. */}
        <div className="absolute inset-0 bg-noir/55" />
      </motion.div>

      <div className="conteneur relative z-10 pb-24 pt-40 text-ivoire md:pb-32">
        <motion.p
          className="surtitre text-gris-chaud"
          initial={reduit ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {siteConfig.adresse.rue}, Paris XVᵉ
        </motion.p>
        <motion.h1
          className="mt-6 max-w-4xl font-serif text-5xl font-light md:text-6xl lg:text-7xl"
          initial={reduit ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {titre}
        </motion.h1>
        {sousTitre && (
          <motion.p
            className="colonne-lecture mt-8 text-lg text-gris-chaud"
            initial={reduit ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            {sousTitre}
          </motion.p>
        )}
        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={reduit ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          <ButtonLien href="/creations" variante="inverse">
            Découvrir les créations
          </ButtonLien>
          <ButtonLien href="/contact" variante="inverse">
            Prendre rendez-vous
          </ButtonLien>
        </motion.div>
      </div>
    </section>
  );
}
