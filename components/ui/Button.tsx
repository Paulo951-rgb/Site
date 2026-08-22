import Link from "next/link";
import type { ReactNode } from "react";

type Variante = "trait" | "plein" | "inverse";

const styles: Record<Variante, string> = {
  trait:
    "border border-noir/40 text-noir hover:border-noir hover:bg-noir hover:text-ivoire",
  plein: "border border-noir bg-noir text-ivoire hover:bg-cuir hover:border-cuir",
  inverse:
    "border border-ivoire/40 text-ivoire hover:border-ivoire hover:bg-ivoire hover:text-noir",
};

const base =
  "inline-block px-8 py-4 text-xs uppercase tracking-surtitre transition-colors duration-400 ease-doux";

export function ButtonLien({
  href,
  variante = "trait",
  children,
  className = "",
}: {
  href: string;
  variante?: Variante;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${styles[variante]} ${className}`}>
      {children}
    </Link>
  );
}

export function ButtonSubmit({
  variante = "plein",
  children,
  disabled,
  className = "",
}: {
  variante?: Variante;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${base} ${styles[variante]} ${className} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
}
