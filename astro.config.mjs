import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://perroseducados.com/",
  integrations: [react()],
  // output: "server",
  // adapter: cloudflare(),
  vite: {
    plugins: [],
    // Configuración mejorada para desarrollo
    optimizeDeps: {
      include: ["astro-navbar"],
    },
  },
});