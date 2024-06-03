import { defineConfig } from 'astro/config';
import db from "@astrojs/db";

// import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://perroseducados.com/',
  integrations: [db()],
//  output: "server",
//  adapter: cloudflare()
});