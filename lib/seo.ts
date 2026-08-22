import type { Metadata } from "next";
import { siteConfig } from "@/content/siteConfig";

const url = siteConfig.seo.url;

export function construireMetadata({
  titre,
  description,
  chemin = "",
  image,
}: {
  titre?: string;
  description?: string;
  chemin?: string;
  image?: string;
} = {}): Metadata {
  const titreComplet = titre
    ? `${titre} | ${siteConfig.nomComplet}`
    : siteConfig.seo.titre;
  const desc = description ?? siteConfig.seo.description;
  const ogImage = image ?? siteConfig.seo.ogImage;

  return {
    metadataBase: new URL(url),
    title: titreComplet,
    description: desc,
    alternates: { canonical: `${url}${chemin}` },
    openGraph: {
      title: titreComplet,
      description: desc,
      url: `${url}${chemin}`,
      siteName: siteConfig.nomComplet,
      locale: "fr_FR",
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: titreComplet,
      description: desc,
    },
  };
}

/** JSON-LD LocalBusiness pour le référencement local. */
export function jsonLdLocalBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.nomComplet,
    description: siteConfig.description,
    url,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.adresse.rue,
      postalCode: siteConfig.adresse.codePostal,
      addressLocality: siteConfig.adresse.ville,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.adresse.latitude,
      longitude: siteConfig.adresse.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
  };
}
