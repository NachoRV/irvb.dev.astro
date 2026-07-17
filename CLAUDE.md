# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

This is `irvb.dev` — a personal blog built with Astro, deployed on **Vercel**. It's a bilingual (Spanish/English) blog about web development, programming, and technology; content is written primarily in Spanish, and user-facing copy should be in Spanish.

## Workflow (mandatory)

**Never work directly on `main`.** Every change follows this cycle:

1. Create a branch named by type: `feature/<name>` (new functionality), `fix/<name>` (bug fixes), `core/<name>` (tooling, refactors, docs, infra).
2. Implement and commit on that branch.
3. Launch the site locally (`pnpm dev`) and show the result to the author for review.
4. Only after the author's explicit OK: merge the branch into `main` and push to origin.

No commits to `main` and no pushes without the author's review — this applies to every change, including small ones.

## Commands

Package manager is **pnpm** (`packageManager` field pins the version). Ignore the npm-based instructions in `README.md` — they're leftovers from the Astro starter template.

```bash
pnpm install       # install dependencies
pnpm dev           # start local dev server at localhost:4321
pnpm build         # runs `astro check` then `astro build` (type-checks first)
pnpm preview       # preview the production build locally
pnpm lint          # ESLint (flat config in eslint.config.js)
pnpm format        # Prettier (with prettier-plugin-astro); format:check for CI-style check
pnpm test          # currently just `astro check` — there is no test framework yet
pnpm astro ...     # arbitrary Astro CLI commands (e.g. `pnpm astro add`)
```

CI (`.github/workflows/ci.yml`) runs `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm build`, `pnpm test` on every push/PR, on Node 24 with the pnpm version taken from `packageManager`. Vercel's build runtime is pinned via `engines.node >= 22.12` (Astro 7 requires it — don't remove this or deploys break).

**pnpm 10 gotcha:** dependency build scripts are blocked by default. `sharp` (needed by `astro:assets`) is allowlisted in `package.json` → `pnpm.onlyBuiltDependencies`; any new native dependency must be added there or its postinstall silently won't run.

## Architecture

**Stack:** Astro 7 (static output, no SSR adapter, **no UI framework — the built site ships zero hydrated JS**) + Tailwind CSS v4 (via `@tailwindcss/vite`, imported in `src/styles/global.css` — there is no `tailwind.config`) + TypeScript (strict Astro preset).

- `astro.config.mjs`: sets `site`, the sitemap integration, and `image.remotePatterns` (https) so remote post images can be optimized. Commented-out Cloudflare adapter lines remain, but the `@astrojs/cloudflare` dependency was uninstalled — reinstall it if SSR is ever enabled.

### Content

- Posts are Markdown in `src/content/posts/*.md`, loaded via the **Content Layer API** in `src/content.config.ts` (collection config lives at the `src/` root — not `src/content/config.ts`, the pre-v6 legacy location). The `posts` collection uses the `glob()` loader with a **custom `generateId`** that preserves each file's pre-migration slug (path minus extension, no slugification) — e.g. `css_position.md` keeps the URL `/posts/css_position`; the default `generateId` would kebab-case it and break existing URLs. Keep this in mind when adding posts or touching the loader.
- Schema fields: `title`, `pubDate`, `description`, `author`, `image: { url, alt }` (remote URL for the hero), `tags: string[]`, optional `draft`.
- Use `entry.id` (not `entry.slug`) and `render(entry)` imported from `astro:content` (not `entry.render()`) — Content Layer API idioms.
- **Always fetch posts through `getPublishedPosts()`** from `src/utils/posts.ts` (filters `draft: true`, sorts by `pubDate` descending). Never call `getCollection("posts")` directly from a page — that's how drafts once leaked as public pages.

### Images

- **Hero:** frontmatter `image.url` is a remote URL, rendered in `posts/[...slug].astro` through `<Image>` from `astro:assets` with `inferSize` — downloaded and optimized at build time (this means a dead remote URL fails the build).
- **Body images:** live in `src/assets/img/` and are referenced from markdown with **relative paths** (`../../assets/img/...`) so Astro optimizes them. Don't put post images in `public/` or use absolute `/img/...` paths (they'd skip optimization), and use markdown image syntax — raw HTML `<img>` in markdown is not processed.

### Routing

- `src/pages/posts/[...slug].astro` — post pages via `getStaticPaths()`; renders content inline and computes reading time (word count / 200 wpm, fenced code blocks excluded). The post template lives in this page file.
- `src/pages/rss.xml.ts` — RSS feed endpoint fed by `getPublishedPosts()`.
- `src/pages/tags/[tag].astro` and `src/pages/tags/index.astro` — tag listings; tags are derived by flattening all posts' `tags` arrays into a `Set`.
- `src/pages/blog.astro`, `index.astro`, `about.astro`, `politica-de-privacidad.astro` — static pages.

### Layout, theme, and client JS

- `Layout.astro` is the single shared HTML shell. It takes `title`, and optional `description`, `image`, `type` props that drive per-page SEO meta (canonical, Open Graph, Twitter cards) — post pages pass their frontmatter data with `type="article"`.
- An inline script in `Layout.astro`'s `<head>` applies the `.dark` class from `localStorage` (falling back to `prefers-color-scheme`) **before first paint** — don't move it into a component or a theme flash returns.
- `src/components/Header.astro` owns the mobile-nav and theme toggles via a small vanilla `<script>`; theme persists to `localStorage` on toggle only.
- `Cookies.astro` gates Google Analytics behind consent (GDPR): gtag.js is injected only after the visitor accepts, and the GA measurement ID is defined **only there**. Don't add analytics tags to `Layout.astro`.
- Every component under `src/components/` is in use; dead placeholders were deleted (git history has them if needed).

### Theming and templates

- CSS custom properties (`--bg`, `--fg`, `--border`, etc.) defined for light/dark in `src/styles/global.css` under `:root` and `:root.dark`. Prefer these variables over hardcoded colors.
- **Whitespace:** Astro 7 defaults `compressHTML` to `'jsx'` — whitespace-only text touching a line break next to a tag is stripped entirely. When inline text sits next to a link/element across a line break, use an explicit `{" "}` to force the space (see `posts/[...slug].astro`'s footer) — the space silently disappears otherwise, with no build error.

### Deployment

- Vercel serves security headers from `vercel.json`, including a CSP. **Any new external script, style, image, or fetch origin must be added to that CSP or it will be blocked in production** (currently allowed: own inline scripts, googletagmanager/analytics origins, `https:` images).
- `plan.md` documents the improvement plan completed in July 2026 — historical record, not open work.
