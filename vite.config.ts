import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "github_pages",
  },
  tanstackStart: {
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: true,
      autoSubfolderIndex: true,
      crawlLinks: true,
      failOnError: false,
    },
  },
  vite: {
    base: "/soilsim-ph/",
    plugins: [
      {
        name: "disable-nitro-ssr-build",
        config(userConfig, { command }) {
          if (command === "build") {
            return {
              build: {
                ssr: false,
              },
            };
          }
        },
      },
    ],
  },
});