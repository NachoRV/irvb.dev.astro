import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://perroseducados.com/",
  integrations: [react()],
  // output: "server",
  // adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
    // Configuración mejorada para desarrollo
    optimizeDeps: {
      include: ["astro-navbar"],
    },
  },
});