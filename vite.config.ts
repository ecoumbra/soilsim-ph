import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "github_pages",
    server: false,
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
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
  vite: {
    base: "/soilsim-ph/",
    nitro: {
      server: false,
    },
  },
});