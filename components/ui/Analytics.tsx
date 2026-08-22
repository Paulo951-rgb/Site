import Script from "next/script";

/**
 * Analytics respectueux de la vie privée (Plausible), sans cookie non
 * essentiel, chargé en différé. Aucun rendu si le domaine n'est pas configuré.
 */
export default function Analytics() {
  const domaine = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domaine) return null;

  return (
    <Script
      defer
      data-domain={domaine}
      src="https://plausible.io/js/script.js"
      strategy="lazyOnload"
    />
  );
}
