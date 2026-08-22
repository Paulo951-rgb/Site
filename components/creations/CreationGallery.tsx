import ImagePanel from "@/components/ui/ImagePanel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function CreationGallery({
  images,
  nom,
}: {
  images: string[];
  nom: string;
}) {
  if (images.length <= 1) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.slice(1).map((src, i) => (
        <RevealOnScroll key={src} delai={i * 0.06}>
          <ImagePanel
            src={src}
            alt={`${nom} — vue ${i + 2}`}
            ratio="aspect-[4/5]"
            sizes="(max-width: 640px) 100vw, 40vw"
          />
        </RevealOnScroll>
      ))}
    </div>
  );
}
