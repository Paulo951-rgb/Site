import Link from "next/link";
import type { Creation } from "@/content/creations";
import { categoriesLabels, statutsLabels } from "@/content/creations";
import ImagePanel from "@/components/ui/ImagePanel";

export default function CreationCard({ creation }: { creation: Creation }) {
  return (
    <Link
      href={`/creations/${creation.slug}`}
      className="group block"
      aria-label={`Découvrir ${creation.nom}`}
    >
      <ImagePanel
        src={creation.images[0]}
        alt={creation.nom}
        ratio="aspect-[4/5]"
        zoomHover
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl text-noir transition-colors duration-300 group-hover:text-cuir">
          {creation.nom}
        </h3>
        <p className="shrink-0 text-xs uppercase tracking-surtitre text-taupe">
          {statutsLabels[creation.statut]}
        </p>
      </div>
      <p className="mt-1 text-xs uppercase tracking-surtitre text-taupe">
        {categoriesLabels[creation.categorie]}
      </p>
    </Link>
  );
}
