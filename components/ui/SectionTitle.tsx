import type { ReactNode } from "react";

export default function SectionTitle({
  surtitre,
  titre,
  children,
  inverse = false,
  className = "",
}: {
  surtitre?: string;
  titre: string;
  children?: ReactNode;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {surtitre && (
        <p className={`surtitre ${inverse ? "text-taupe" : ""}`}>{surtitre}</p>
      )}
      <h2
        className={`mt-4 font-serif text-3xl md:text-4xl lg:text-5xl ${
          inverse ? "text-ivoire" : "text-noir"
        }`}
      >
        {titre}
      </h2>
      {children && (
        <div
          className={`colonne-lecture mt-6 text-base ${
            inverse ? "text-gris-chaud" : "text-noir/80"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
