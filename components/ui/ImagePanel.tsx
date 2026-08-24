import Image from "next/image";

/**
 * Panneau image éditorial : ratio maîtrisé, zoom léger au hover sur les
 * éléments interactifs. next/image gère WebP/AVIF et le lazy loading.
 */
export default function ImagePanel({
  src,
  alt,
  ratio = "aspect-[4/5]",
  priorite = false,
  zoomHover = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
}: {
  src: string;
  alt: string;
  ratio?: string;
  priorite?: boolean;
  zoomHover?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-gris-chaud ${ratio} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priorite}
        sizes={sizes}
        className={`object-cover transition-transform duration-500 ease-doux ${
          zoomHover ? "group-hover:scale-[1.03]" : ""
        }`}
      />
    </div>
  );
}
