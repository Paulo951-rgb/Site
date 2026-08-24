import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Analytics from "@/components/ui/Analytics";
import { construireMetadata, jsonLdLocalBusiness } from "@/lib/seo";

// Typographies self-hostées via next/font : pas de FOUT ni de CLS.
const titres = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-titres",
  display: "swap",
});

const texte = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-texte",
  display: "swap",
});

export const metadata: Metadata = construireMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${titres.variable} ${texte.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-noir focus:px-4 focus:py-2 focus:text-ivoire"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdLocalBusiness()),
          }}
        />
      </body>
    </html>
  );
}
