import { siteConfig } from "@/content/siteConfig";
import MapLeaflet from "./MapLeaflet";

/**
 * Carte de localisation, respectueuse des licences :
 * - "osm" (défaut) : Leaflet + tuiles raster OpenStreetMap, aucune clé requise ;
 * - "google" : embed Google Maps si le client fournit une clé API.
 * Le fournisseur se choisit via NEXT_PUBLIC_MAP_PROVIDER.
 */
export default function MapEmbed() {
  const fournisseur = process.env.NEXT_PUBLIC_MAP_PROVIDER ?? "osm";
  const { latitude, longitude } = siteConfig.adresse;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border border-gris-chaud">
      {fournisseur === "google" ? (
        <iframe
          title={`Plan d'accès — ${siteConfig.nomComplet}, ${siteConfig.adresse.rue}, ${siteConfig.adresse.codePostal} ${siteConfig.adresse.ville}`}
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${latitude},${longitude}&zoom=16`}
          className="absolute inset-0 h-full w-full border-0 grayscale-[35%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <MapLeaflet />
      )}
    </div>
  );
}
