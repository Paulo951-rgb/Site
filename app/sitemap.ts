import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/siteConfig";
import { creations } from "@/content/creations";
import { navigationPrincipale } from "@/content/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.seo.url;

  const pages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...navigationPrincipale.map((lien) => ({
      url: `${base}${lien.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/entretien`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${base}/faq`, changeFrequency: "monthly" as const, priority: 0.5 },
    ...creations.map((c) => ({
      url: `${base}/creations/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${base}/mentions-legales`, priority: 0.2 },
    { url: `${base}/confidentialite`, priority: 0.2 },
  ];

  return pages;
}
