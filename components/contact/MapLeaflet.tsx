"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { siteConfig } from "@/content/siteConfig";

/**
 * Carte Leaflet + tuiles raster OpenStreetMap (fonctionne sans WebGL).
 * Marqueur dessiné en divIcon pour rester dans la palette de la maison.
 */
export default function MapLeaflet() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let carte: import("leaflet").Map | undefined;
    // Sans ce drapeau, un démontage/remontage rapide (StrictMode, navigation)
    // laisserait l'import asynchrone initialiser deux cartes sur le même
    // conteneur — Leaflet lève alors « Map container is already initialized ».
    let annule = false;

    void (async () => {
      const L = await import("leaflet");
      if (annule || !ref.current) return;

      const centre: [number, number] = [
        siteConfig.adresse.latitude,
        siteConfig.adresse.longitude,
      ];

      carte = L.map(ref.current, {
        center: centre,
        zoom: 16,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(carte);

      const marqueur = L.divIcon({
        className: "",
        html: '<span style="display:block;width:14px;height:14px;border-radius:9999px;background:#8C7A5B;box-shadow:0 0 0 6px rgba(140,122,91,0.25)"></span>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      L.marker(centre, { icon: marqueur })
        .addTo(carte)
        .bindPopup(
          `${siteConfig.nomComplet}<br>${siteConfig.adresse.rue}, ${siteConfig.adresse.codePostal} ${siteConfig.adresse.ville}`
        );
    })();

    return () => {
      annule = true;
      carte?.remove();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 h-full w-full grayscale-[35%]"
      role="application"
      aria-label={`Plan d'accès — ${siteConfig.adresse.rue}, ${siteConfig.adresse.codePostal} ${siteConfig.adresse.ville}`}
    />
  );
}
