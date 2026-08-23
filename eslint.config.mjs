import next from "eslint-config-next";

const config = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**"],
  },
  {
    // Contenu français : les apostrophes typographiques ne sont pas échappées.
    rules: { "react/no-unescaped-entities": "off" },
  },
];

export default config;
