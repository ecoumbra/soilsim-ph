import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Presets Nitro для статичного розгортання на GitHub Pages
  nitro: {
    preset: "github_pages",
  },

  // Налаштування пререндерингу TanStack Start
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: true,
      autoSubfolderIndex: true,
      crawlLinks: true,
      failOnError: true,
    },
  },

  // Базовий URL для GitHub Pages
  vite: {
    base: "/soilsim-ph/",
  },
});