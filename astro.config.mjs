import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://irvb.dev/",
  integrations: [sitemap()],
  // output: "server",
  // adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
});