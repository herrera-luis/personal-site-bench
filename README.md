# Personal site

Bilingual (English + Spanish) personal website and blog, built with
**[Astro](https://astro.build) + MDX** and shipped as a fully **static** site
for Vercel.

## Features

- **URL-prefixed locales** — every page lives under `/en/…` or `/es/…`; the
  root `/` redirects to the default locale (`/en/`).
- **Per-page `hreflang`** alternates (incl. `x-default`) and a multilingual
  `sitemap.xml`.
- **Site shell** — shared layout, localized navigation with active-item state,
  footer, and a **language switcher** that keeps you on the equivalent page
  (falling back to the locale home when a translation is missing).
- **Folder-per-article content model** — each article is a folder under
  `src/content/blog/<folder>/` with one MDX entry per locale (`en.mdx`,
  `es.mdx`) plus co-located assets. Translations are linked by a shared
  `translationKey`.
- **Per-locale RSS feeds** at `/en/rss.xml` and `/es/rss.xml`.
- **SEO** — locale-aware titles/descriptions, canonical URLs, Open Graph
  (incl. `og:locale`) and Twitter cards.

## Project structure

```
src/
  components/     BaseHead, Header, Footer, LanguageSwitcher
  content/        blog/<article>/<locale>.mdx  + config.ts (Zod schema)
  i18n/           en.json, es.json, utils.ts (t, locale + URL helpers)
  layouts/        BaseLayout.astro
  lib/            blog.ts (queries, slug + translation linkage)
  pages/          index.astro (redirect), [locale]/… , [locale]/rss.xml.ts
public/           favicon.svg
astro.config.mjs  static output + i18n + mdx + sitemap
vercel.json       root 308 redirect fallback
```

## Commands

| Command           | Action                                   |
| ----------------- | ---------------------------------------- |
| `npm install`     | Install dependencies                     |
| `npm run dev`     | Start the dev server at `localhost:4321` |
| `npm run build`   | Build the static site to `dist/`         |
| `npm run preview` | Preview the production build locally     |

## Deployment

Static output deployed to Vercel (zero-config Astro detection). `vercel.json`
provides a permanent `/ → /en/` redirect as a hosting-level fallback.

## Adding an article

1. Create a folder under `src/content/blog/`, e.g. `my-post/`.
2. Add `en.mdx` and/or `es.mdx` with frontmatter: `title`, `description`,
   `pubDate`, `locale`, `translationKey` (required) plus optional `slug`,
   `tags`, `draft`, `cover`.
3. Use the same `translationKey` across locales to link translations.
