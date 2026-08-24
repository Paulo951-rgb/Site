"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { blurData } from "@/content/blurData";

/**
 * Comparateur avant / après : le curseur (glisser ou clavier) révèle
 * la photo « avant » par-dessus la photo « après ».
 * Accessible : le contrôle est un input range natif, pilotable au clavier.
 *
 * Les images affichées doivent être des paires réelles fournies par la
 * maison (même pièce, même cadrage) — jamais de simulation.
 */
export default function AvantApres({
  avant,
  apres,
  alt,
  legendeAvant = "Avant",
  legendeApres = "Après",
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  avant: string;
  apres: string;
  alt: string;
  legendeAvant?: string;
  legendeApres?: string;
  sizes?: string;
}) {
  const [position, setPosition] = useState(50);
  const conteneurRef = useRef<HTMLDivElement>(null);

  const positionnerDepuisPointeur = useCallback((clientX: number) => {
    const rect = conteneurRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <figure>
      <div
        ref={conteneurRef}
        className="group relative aspect-[4/3] w-full touch-none select-none overflow-hidden bg-gris-chaud"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          positionnerDepuisPointeur(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) positionnerDepuisPointeur(e.clientX);
        }}
      >
        <Image
          src={apres}
          alt=""
          fill
          sizes={sizes}
          placeholder={blurData[apres] ? "blur" : "empty"}
          blurDataURL={blurData[apres]}
          className="object-cover"
          draggable={false}
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden="true"
        >
          <Image
            src={avant}
            alt=""
            fill
            sizes={sizes}
            placeholder={blurData[avant] ? "blur" : "empty"}
            blurDataURL={blurData[avant]}
            className="object-cover"
            draggable={false}
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-px bg-ivoire"
          style={{ left: `${position}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivoire/60 bg-noir/50 text-ivoire backdrop-blur-sm">
            ⇔
          </span>
        </div>

        <span className="absolute left-4 top-4 bg-noir/60 px-3 py-1 text-xs uppercase tracking-surtitre text-ivoire">
          {legendeAvant}
        </span>
        <span className="absolute right-4 top-4 bg-noir/60 px-3 py-1 text-xs uppercase tracking-surtitre text-ivoire">
          {legendeApres}
        </span>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`${alt} — révéler ${legendeAvant.toLowerCase()} ou ${legendeApres.toLowerCase()}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-xs uppercase tracking-surtitre text-taupe-fonce">
        {alt} — {legendeAvant} / {legendeApres}
      </figcaption>
    </figure>
  );
}
