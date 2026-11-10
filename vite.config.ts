import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "github_pages",
    // Забороняємо Nitro шукати index.html як серверний вхід
    entry: undefined,
    serveStatic: true,
  },
  tanstackStart: {
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: true,
      autoSubfolderIndex: true,
      crawlLinks: true,
      failOnError: false, // Не падаємо, якщо якийсь маршрут не знайшовся
    },
  },
  vite: {
    base: "/soilsim-ph/",
    build: {
      // Вимикаємо SSR обробку для під-середовищ Vite 8
      ssr: false,
    },
  },
});