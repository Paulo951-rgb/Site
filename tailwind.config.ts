import type { Config } from "tailwindcss";

/**
 * Tokens de design — Pierre & Pavin.
 * Palette personnalisée : aucune couleur Tailwind par défaut n'est utilisée.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    colors: {
      ivoire: "#F6F3EE",
      noir: "#14100D",
      cuir: "#5B3A29",
      taupe: "#A79A8C",
      "gris-chaud": "#DED7CC",
      metal: "#8C7A5B",
      transparent: "transparent",
      current: "currentColor",
    },
    fontFamily: {
      serif: ["var(--font-titres)", "Georgia", "serif"],
      sans: ["var(--font-texte)", "system-ui", "sans-serif"],
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1.5" }],
      sm: ["0.875rem", { lineHeight: "1.6" }],
      base: ["1.0625rem", { lineHeight: "1.7" }],
      lg: ["1.25rem", { lineHeight: "1.6" }],
      xl: ["1.5rem", { lineHeight: "1.5" }],
      "2xl": ["1.875rem", { lineHeight: "1.35" }],
      "3xl": ["2.375rem", { lineHeight: "1.25" }],
      "4xl": ["3rem", { lineHeight: "1.15" }],
      "5xl": ["3.75rem", { lineHeight: "1.1" }],
      "6xl": ["4.5rem", { lineHeight: "1.05" }],
      "7xl": ["clamp(3rem,8vw,6.5rem)", { lineHeight: "1.02" }],
    },
    letterSpacing: {
      surtitre: "0.22em",
      large: "0.08em",
    },
    extend: {
      maxWidth: {
        lecture: "68ch",
        page: "1440px",
      },
      transitionTimingFunction: {
        doux: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [],
};

export default config;
