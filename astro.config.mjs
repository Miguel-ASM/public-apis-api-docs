import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { i18n } from "astro-i18n-aut/integration";
import astroI18next from "astro-i18next";

import astroI18nextConfig from "./astro-i18next.config.mjs";

const defaultLocale = astroI18nextConfig.defaultLocale;
const locales = Object.fromEntries(
  astroI18nextConfig.locales.map((x) => [x, x]),
);

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  integrations: [
    i18n({
      locales,
      defaultLocale,
    }),
    astroI18next(),
    tailwind(),
    react(),
  ],
  output: "static",
});
