# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

This is `irvb.dev` — a personal blog built with Astro. It's a bilingual (Spanish/English) blog about web development, programming, and technology, featuring code snippets and tutorials. Content is written primarily in Spanish.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml` and CI config), even though some npm-based instructions may appear in `README.md` (leftover from the Astro starter template).

```bash
pnpm install       # install dependencies
pnpm dev           # start local dev server at localhost:4321
pnpm build         # runs `astro check` then `astro build` (type-checks first)
pnpm preview       # preview the production build locally
pnpm lint          # ESLint (flat config in eslint.config.js)
pnpm format        # Prettier (with prettier-plugin-astro)
pnpm test          # currently just `astro check` (no test framework yet)
pnpm astro ...     # run arbitrary Astro CLI commands (e.g. `pnpm astro add`)
```

CI (`.github/workflows/ci.yml`) runs `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm build`, `pnpm test` on every push/PR, on Node 24 with the pnpm version taken from the `packageManager` field. The site deploys on **Vercel** (build runtime pinned via `engines.node >= 22.12`; security headers live in `vercel.json`).

## Architecture

**Stack:** Astro 7 (static output, no SSR adapter currently enabled, **no UI framework — zero hydrated JS**) + Tailwind CSS v4 (via `@tailwindcss/vite`, imported in `src/styles/global.css` rather than a `tailwind.config`) + TypeScript (strict Astro preset).

- `astro.config.mjs`: Cloudflare adapter and `output: "server"` are present but commented out — the site currently builds fully static.
- Content is authored as Markdown in `src/content/posts/*.md`, loaded via the **Content Layer API** in `src/content.config.ts` (the collection config file lives at the `src/` root, not `src/content/config.ts` — that's the pre-v6 legacy location). The `posts` collection uses the `glob()` loader with a **custom `generateId`** that preserves each file's pre-migration slug (path minus extension, no slugification) — e.g. `css_position.md` keeps the URL `/posts/css_position`, since the loader's default `generateId` would otherwise kebab-case it to `css-position` and break the existing URL. Keep this in mind if adding new post filenames or touching the loader config. Schema fields: `title`, `pubDate`, `description`, `author`, `image: { url, alt }`, `tags: string[]`, optional `draft`.
- Use `entry.id` (not `entry.slug`) and `render(entry)` imported from `astro:content` (not `entry.render()`) — these are Content Layer API idioms, not the pre-v6 legacy content collections API.
- **Post retrieval pattern:** every page that lists or renders posts uses `getPublishedPosts()` from `src/utils/posts.ts` (filters out `draft: true` and sorts by `pubDate` descending). Always use this helper — never call `getCollection("posts")` directly from a page, or drafts may leak (that bug existed in `posts/[...slug].astro` and was fixed).
- **Routing:**
  - `src/pages/posts/[...slug].astro` — individual post pages, driven by `getStaticPaths()` over the `posts` collection; renders content directly inline (via `render(entry)`) and computes a reading time (word count / 200 wpm, code blocks excluded). The hero image uses `<Image>` from `astro:assets` with `inferSize` — hero URLs in frontmatter are remote, allowed by `image.remotePatterns` in `astro.config.mjs`, and get downloaded + optimized at build time. Body images live in `src/assets/img/` and are referenced from markdown with relative paths (`../../assets/img/...`) so Astro optimizes them; don't add post images to `public/` or reference them with absolute `/img/...` paths.
  - `src/pages/tags/[tag].astro` and `src/pages/tags/index.astro` — tag-filtered listings, tags are derived by flattening all posts' `tags` arrays into a `Set`.
  - `src/pages/blog.astro`, `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/politica-de-privacidad.astro` — static pages.
- **No islands:** every component is `.astro` (server-rendered). `src/components/Header.astro` owns the mobile nav toggle and the dark/light theme toggle via a small vanilla `<script>`; the theme persists to `localStorage` as a `.dark` class on `<html>`, applied before first paint by an inline script in `Layout.astro`'s `<head>` (don't move it or a theme flash returns). `Cookies.astro` gates Google Analytics behind consent — gtag.js is injected only after the visitor accepts, and the GA ID is defined only there.
- **Theming:** CSS custom properties (`--bg`, `--fg`, `--border`, etc.) defined for light/dark in `src/styles/global.css` under `:root` and `:root.dark`. Prefer reusing these variables over hardcoded colors when styling components.
- **Whitespace in templates:** Astro 7 defaults `compressHTML` to `'jsx'` — whitespace-only text touching a line break next to a tag is stripped entirely (unlike the old HTML-aware compression, which collapsed it to a single space). When inline text sits next to a link/element across a line break (e.g. "en\n<a>Twitter</a>"), the space can silently disappear from rendered output with no build error. Use an explicit `{" "}` to force a space in those spots (see `posts/[...slug].astro`'s footer for an example).
- Every component under `src/components/` is in use (dead placeholders like Search, TableOfContents, BlogPost, Card, Social and NewsletterCTA were deleted — check git history if one needs resurrecting).
- `Layout.astro` is the single shared HTML shell (nav items, `<head>`, Google Analytics tag, `Cookies` banner, `Footer`) that every page wraps itself in.
