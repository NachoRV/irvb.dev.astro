# Plan de mejoras — irvb.dev

## Fase 1 — Revisión técnica (2026-07-15) ✅ COMPLETADA

Revisión completa del repo. Orden de ejecución por prioridad.

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

## 7. Imágenes y detalles finales ✅
- [x] Imágenes del body migradas de `public/img/` a `src/assets/img/` con rutas relativas en los markdown (Astro las optimiza: WebP + `width/height` + `loading="lazy"`). Los `<img>` HTML de css_position.md convertidos a sintaxis markdown. Borrado `pago-seguro-amazon-1.webp` (huérfano).
- [x] Hero de post con `<Image>` de `astro:assets` + `inferSize`: las URLs remotas del frontmatter se descargan y optimizan en build (`image.remotePatterns` https en config), con `srcset` 640/960/1280, `width/height` y `fetchpriority="high"`. Requirió `sharp` (autorizado vía `pnpm.onlyBuiltDependencies`).
- [x] Borrados componentes muertos: `BlogPost`, `Search`, `TableOfContents`, `Card`, `Social`, `NewsletterCTA` y `svg/menu.astro`.
- [x] Footer de post: eliminado el enlace placeholder a `https://twitter.com` (apuntaba a la home genérica); queda el contacto por email. **Pendiente del autor:** re-añadir enlace social con el perfil real si se quiere.
- [x] Tiempo de lectura: excluidos los bloques de código del conteo (mínimo 1 min).
- [x] Actualizadas las secciones afectadas de `CLAUDE.md`.

---

## Fase 2 — De blog técnico a blog personal multi-tema (2026-07-17)

**Objetivo:** convertir irvb.dev en un volcado personal de cualquier tema (IA, programación, fotografía, running, nutrición, perros, opinión…) sin perder su función de captación de negocio. **Principio rector:** una sola colección de contenido; lo que cambia es la presentación según quién llega. El visitante de negocio entra por una URL profesional y se auto-selecciona; lo personal humaniza pero nunca está en el camino obligatorio hacia la venta.

### 2.1 Modelo de contenido
- [ ] Añadir `category` al schema de `src/content.config.ts` como **enum cerrado** (empezar con 4-5 reales: p. ej. `tech`, `ia`, `opinion` + las que ya tengan contenido; regla: no crear categoría nueva hasta tener ~3 posts del tema). Una categoría por post; los tags siguen siendo libres y transversales.
- [ ] Hacer `image` **opcional** con imagen por defecto por categoría (assets locales en `src/assets/`) — el hero obligatorio es fricción que mata posts cortos de opinión.
- [ ] `author` con valor por defecto en el schema.
- [ ] Asignar `category` a los 7 posts existentes (todos `tech`) **sin mover ficheros ni tocar slugs** (ojo: el `generateId` custom incluye subcarpetas en la URL — los posts existentes deben quedarse donde están).

### 2.2 Navegación y rutas
- [ ] Ruta `/categoria/[cat]` (mismo patrón que `/tags/[tag]`) + página índice de categorías.
- [ ] Badge de categoría con color propio en `PostCard` y en la cabecera del post (usar variables del tema, no colores hardcodeados).
- [ ] Filtro por categoría en `/blog` reutilizando el patrón de `TagsNav`.
- [ ] **Hub profesional `/dev`**: agrupa `tech` + `ia` con intro orientada a negocio. Esta es la URL que se enlaza desde las webs del negocio, LinkedIn y firma de email — no la home.
- [ ] Rehacer `/about` en dos capas: primero perfil profesional con CTA claro al negocio, después la persona completa (aficiones, por qué escribe de todo).
- [ ] La home sigue siendo el volcado completo (lo último de todo, con badges).

### 2.3 Captación de negocio
- [ ] CTA del footer de post **condicionado a la categoría**: `tech`/`ia` → CTA de negocio ("Ayudo a empresas a construir X — hablemos" + enlace a la web comercial); resto → CTA blando (newsletter/redes). Necesito del autor: URL de la web del negocio y texto del CTA.
- [ ] Resucitar `NewsletterCTA` (está en git history) cuando se elija proveedor de newsletter — es el mejor activo de captación a largo plazo. Decisión pendiente del autor: proveedor (Buttondown, Mailchimp, Substack…).
- [ ] **RSS por categoría** (`/rss/[category].xml`) manteniendo el feed general — permite embeber "últimos artículos técnicos" en las webs del negocio sin mezclar lo personal.
- [ ] Añadir enlaces a redes sociales reales en el footer del sitio (pendiente del autor: perfiles).

### 2.4 SEO y detalles
- [ ] Description propia por página de categoría; OG image por defecto según categoría.
- [ ] El sitemap cubre las rutas nuevas automáticamente (verificar tras implementar).
- [ ] Revisar que la CSP de `vercel.json` cubra cualquier origen nuevo (proveedor de newsletter, embeds).
- [ ] Actualizar `CLAUDE.md` con el modelo de categorías cuando esté implementado.

**Orden sugerido:** 2.1 (schema) → 2.2 (rutas y navegación) → 2.3 (captación) → 2.4 (remate). 2.1 y 2.2 no necesitan decisiones externas; 2.3 requiere input del autor (web de negocio, proveedor de newsletter, redes).
