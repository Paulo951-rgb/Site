import Link from "next/link";
import { ButtonLien } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="conteneur flex min-h-[80vh] flex-col items-start justify-center pt-20">
      <p className="surtitre">Erreur 404</p>
      <h1 className="mt-6 font-serif text-4xl font-light sm:text-5xl md:text-6xl">
        Cette page n'existe pas
      </h1>
      <p className="colonne-lecture mt-6 text-base text-noir/75">
        Le lien que vous avez suivi est peut-être ancien ou erroné. L'atelier,
        lui, est toujours au{" "}
        <Link href="/atelier" className="lien-souligne text-cuir">
          107 rue Blomet
        </Link>
        .
      </p>
      <div className="mt-10">
        <ButtonLien href="/" variante="plein">
          Retour à l'accueil
        </ButtonLien>
      </div>
    </div>
  );
}
