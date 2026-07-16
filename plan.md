# Plan de mejoras — irvb.dev

Revisión completa del repo (2026-07-15). Orden de ejecución por prioridad.

## 1. Fix drafts + helper compartido de posts ✅
- [x] Crear `src/utils/posts.ts` con `getPublishedPosts()`: `getCollection("posts", ({ data }) => !data.draft)` + sort por `pubDate` descendente.
- [x] Usarlo en `src/pages/index.astro`, `src/pages/blog.astro`, `src/pages/tags/index.astro`, `src/pages/tags/[tag].astro`.
- [x] **Bug:** `src/pages/posts/[...slug].astro` no filtra drafts en `getStaticPaths()` — los drafts generan página pública. Usar el helper también ahí.

## 2. Arreglar CI ✅
- [x] Añadir ESLint (`eslint`, `eslint-plugin-astro`, `typescript-eslint`) con config plana mínima (`eslint.config.js`).
- [x] Añadir Prettier + `prettier-plugin-astro` (scripts `format` y `format:check`).
- [x] Definir scripts `lint` y `test` en `package.json` (`test` = `astro check` de momento).
- [x] Declarar `"packageManager": "pnpm@10.28.2"` y quitar `version: 8` hardcodeada de `pnpm/action-setup` (subido a @v4).
- [x] Añadir cache de pnpm en el workflow (`actions/setup-node@v4` con `cache: pnpm`, Node 24) e `--frozen-lockfile`.
- [x] Corregir los 8 errores que sacó el primer lint: imports/vars muertos en `Cookies.astro`, `Footer.astro` y `PostCard.astro` (prop `img` sin usar, quitada también de los 3 llamadores), `dataLayer` sin declarar en `google.js`, referencia a `db-types.d.ts` inexistente en `env.d.ts`, y borrado `ThemeIcon.astro` (componente muerto, el Header React tiene el suyo).

## 3. Cookies + consentimiento RGPD ✅
- [x] Reescrito `src/components/Cookies.astro` desde cero: fuera el JS muerto de `astro:page-load`; ahora un script inline autoejecutado gestiona todo.
- [x] El banner se muestra solo si no hay cookie `cookie-consent` y se oculta al aceptar/rechazar (decisión guardada 180 días, `SameSite=Lax`). Botones Aceptar y Rechazar, estilos con las variables del tema.
- [x] Google Analytics solo se carga tras aceptar: el `<script>` de gtag.js se inyecta dinámicamente, con `anonymize_ip: true`. Eliminada la carga incondicional de `Layout.astro` y borrado `src/scripts/google.js`.
- [x] Enlace del banner corregido: `/cookies` (404) → `/politica-de-privacidad`.
- [x] ID de GA definido en un único sitio (frontmatter de `Cookies.astro`, pasado al script vía `data-ga-id`).

## 4. Eliminar React + fix FOUC de tema ✅
- [x] Reescrito `Header` como `src/components/Header.astro` con `<script>` vanilla (toggle menú móvil + toggle tema); borrado `src/components/Header/` (Header.tsx + Header.css, CSS portado a estilos scoped). Los dos iconos de tema se renderizan y se alternan por CSS según `html.dark`.
- [x] Script inline `is:inline` en el `<head>` de `Layout.astro` que aplica `.dark` desde `localStorage` (o `prefers-color-scheme`) antes del primer paint — elimina el flash de tema.
- [x] Quitadas dependencias `react`, `react-dom`, `@astrojs/react`, `@types/react`, `@types/react-dom`; limpiados `astro.config.mjs` (integración react) y `tsconfig.json` (opciones jsx). Resultado: `dist/_astro` sin ningún bundle JS.
- [x] `aria-expanded` + `aria-controls` en el botón del menú móvil.

## 5. SEO: sitemap + RSS + meta por página
- [ ] `pnpm astro add sitemap` (`@astrojs/sitemap`).
- [ ] `@astrojs/rss` con endpoint `src/pages/rss.xml.ts`.
- [ ] `public/robots.txt` apuntando al sitemap.
- [ ] `Layout.astro`: aceptar prop `description` (con fallback), canonical URL, Open Graph (`og:title`, `og:description`, `og:image`, `og:type`) y Twitter cards. Pasar la description del frontmatter desde las páginas de post.
- [ ] Arreglar favicon: `type="image/svg+xml"` apunta a `/favicon.ico`; usar `favicon.svg`.

## 6. Seguridad / housekeeping
- [ ] Headers de seguridad (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, CSP básica) — el hosting es **Vercel**, así que van en `vercel.json` (no `public/_headers`).
- [x] `engines.node >= 22.12.0` en `package.json` — Vercel compilaba con Node 20 y Astro 7 requiere ≥22.12 (fallo de despliegue del 2026-07-16).
- [ ] `.github/dependabot.yml` para npm y github-actions.
- [ ] Revisar licencia de las fuentes Mallory (comerciales, Frere-Jones) en `public/font/` — no se usan en `global.css`; eliminarlas junto con el `demo.html` del vendedor.
- [ ] Añadir `.claude/settings.local.json` a `.gitignore`.
- [ ] Mover `typescript`, `@astrojs/check`, `@types/*` a `devDependencies`; quitar `@astrojs/cloudflare` (sin usar); renombrar `name: "greyhound"` → `irvb.dev`.
- [ ] Husky: añadir hook `pre-commit` (lint) o eliminar el paquete.

## 7. Imágenes y detalles finales
- [ ] Migrar imágenes de posts a `src/assets/` + `astro:assets` (`<Image>`): optimización, `width/height` (evita CLS), `loading="lazy"`.
- [ ] Borrar componentes muertos: `src/components/BlogPost.astro`, `Search.astro`, `TableOfContents.astro` (o implementarlos).
- [ ] Verificar enlaces placeholder del footer de post (`https://twitter.com`, `contact@irvb.dev`).
- [ ] Tiempo de lectura: excluir bloques de código del conteo de palabras.
