import type { Creation } from "@/content/creations";
import { categoriesLabels, statutsLabels } from "@/content/creations";
import ImagePanel from "@/components/ui/ImagePanel";
import AvantApres from "@/components/ui/AvantApres";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { ButtonLien } from "@/components/ui/Button";
import CreationGallery from "./CreationGallery";

export default function CreationDetail({ creation }: { creation: Creation }) {
  return (
    <article>
      <div className="conteneur grid gap-14 pt-36 md:pt-44 lg:grid-cols-2">
        <RevealOnScroll>
          <ImagePanel
            src={creation.images[0]}
            alt={creation.nom}
            ratio="aspect-[4/5]"
            priorite
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </RevealOnScroll>

        <div className="lg:pt-8">
          <RevealOnScroll delai={0.1}>
            <p className="surtitre">
              {categoriesLabels[creation.categorie]} ·{" "}
              {statutsLabels[creation.statut]}
            </p>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl">
              {creation.nom}
            </h1>
            <p className="colonne-lecture mt-8 text-base text-noir/80">
              {creation.description}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delai={0.2}>
            <dl className="mt-10 border-t border-gris-chaud">
              <div className="grid grid-cols-3 gap-4 border-b border-gris-chaud py-5">
                <dt className="text-xs uppercase tracking-surtitre text-taupe-fonce">
                  Matière
                </dt>
                <dd className="col-span-2 text-sm">{creation.matiere}</dd>
              </div>
              {creation.details && creation.details.length > 0 && (
                <div className="grid grid-cols-3 gap-4 border-b border-gris-chaud py-5">
                  <dt className="text-xs uppercase tracking-surtitre text-taupe-fonce">
                    Détails
                  </dt>
                  <dd className="col-span-2">
                    <ul className="space-y-2 text-sm">
                      {creation.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </RevealOnScroll>

          <RevealOnScroll delai={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLien href="/contact" variante="plein">
                Parler de cette création
              </ButtonLien>
              <ButtonLien href="/contact">Prendre rendez-vous</ButtonLien>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {creation.comparaison && (
        <div className="conteneur mt-20">
          <RevealOnScroll>
            <p className="surtitre">Avant / après</p>
            <div className="mt-6 max-w-3xl">
              <AvantApres
                avant={creation.comparaison.avant}
                apres={creation.comparaison.apres}
                alt={creation.nom}
                legendeAvant={creation.comparaison.legendeAvant}
                legendeApres={creation.comparaison.legendeApres}
              />
            </div>
          </RevealOnScroll>
        </div>
      )}

      <div className="conteneur mt-20 pb-28">
        <CreationGallery images={creation.images} nom={creation.nom} />
      </div>
    </article>
  );
}
