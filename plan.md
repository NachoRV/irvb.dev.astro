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

## 5. SEO: sitemap + RSS + meta por página ✅
- [x] `@astrojs/sitemap` añadido a `astro.config.mjs` — genera `sitemap-index.xml` en el build.
- [x] `@astrojs/rss` con endpoint `src/pages/rss.xml.ts` (usa `getPublishedPosts()`, `<language>es</language>`), más `<link rel="alternate">` en el head.
- [x] `public/robots.txt` apuntando al sitemap.
- [x] `Layout.astro`: props `description` (con fallback), `image` y `type`; canonical URL, Open Graph completo (`og:site_name`, `og:locale es_ES`) y Twitter cards. Los posts pasan description/imagen del frontmatter y `type="article"`; blog y tags pasan descriptions propias.
- [x] Favicon corregido: `favicon.svg` como icono SVG + `favicon.ico` de fallback.

## 6. Seguridad / housekeeping ✅
- [x] Headers de seguridad en `vercel.json` (hosting Vercel): `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY` y CSP básica (permite inline scripts propios y googletagmanager/analytics; imágenes `https:` porque los posts usan Unsplash).
- [x] `engines.node >= 22.12.0` en `package.json` — Vercel compilaba con Node 20 y Astro 7 requiere ≥22.12 (fallo de despliegue del 2026-07-16).
- [x] `.github/dependabot.yml` para npm (minor/patch agrupados) y github-actions, semanal.
- [x] Eliminadas las fuentes de `public/font/` (6,9 MB): Mallory es comercial (Frere-Jones), incluía el `demo.html` del vendedor y `global.css` solo usa fuentes de sistema — no se usaban.
- [x] `.claude/settings.local.json` añadido a `.gitignore` (no estaba trackeado).
- [x] `typescript` y `@astrojs/check` movidos a `devDependencies` (typescript fijado en la serie 5.x — `pnpm add` trajo TS 7 y se revirtió); quitado `@astrojs/cloudflare` (sin usar); `name` renombrado a `irvb.dev` + `"private": true`.
- [x] Husky: no estaba ni trackeado ni en `package.json` (solo scaffolding local en `.husky/_`) — borrado el directorio local. Si algún día se quiere pre-commit, instalar husky de cero.
- [x] Actualizado `CLAUDE.md` (comandos, stack sin React, helper de posts, tema/cookies, Vercel).

## 7. Imágenes y detalles finales
- [ ] Migrar imágenes de posts a `src/assets/` + `astro:assets` (`<Image>`): optimización, `width/height` (evita CLS), `loading="lazy"`.
- [ ] Borrar componentes muertos: `src/components/BlogPost.astro`, `Search.astro`, `TableOfContents.astro` (o implementarlos).
- [ ] Verificar enlaces placeholder del footer de post (`https://twitter.com`, `contact@irvb.dev`).
- [ ] Tiempo de lectura: excluir bloques de código del conteo de palabras.
