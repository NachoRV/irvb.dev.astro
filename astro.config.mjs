import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://irvb.dev/",
  integrations: [sitemap()],
  image: {
    // Los heros de los posts son URLs remotas (Unsplash, etc.); esto permite
    // que astro:assets las descargue y optimice en build.
    remotePatterns: [{ protocol: "https" }],
  },
  // output: "server",
  // adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
});