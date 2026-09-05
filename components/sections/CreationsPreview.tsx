import { creations } from "@/content/creations";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CreationCard from "@/components/creations/CreationCard";
import { ButtonLien } from "@/components/ui/Button";

export default function CreationsPreview() {
  const miseEnAvant = creations.filter((c) => c.featured).slice(0, 3);

  return (
    <section className="py-20 md:py-40">
      <div className="conteneur">
        <RevealOnScroll>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              surtitre="Créations"
              titre="Des pièces qui naissent d'une rencontre"
            />
            <ButtonLien href="/creations">Découvrir les créations</ButtonLien>
          </div>
        </RevealOnScroll>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {miseEnAvant.map((creation, i) => (
            <RevealOnScroll key={creation.id} delai={i * 0.08}>
              <CreationCard creation={creation} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
