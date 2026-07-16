# Personal Site

A minimal, content-first, **bilingual (English + Spanish)** personal website/blog.
Static build, deployable to Vercel. Built with **Astro v4 + MDX**.

Placeholder identity only: site name **"Personal Site"**, author **"A. Writer"**,
domain `personal-site.example`.

## Stack

- [Astro](https://astro.build) v4 (static output) + [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- Astro built-in **i18n routing** (`/en/…`, `/es/…`, root `/` → `/en`)
- [`@astrojs/vercel`](https://docs.astro.build/en/guides/integrations-guide/vercel/) static adapter
- [`@astrojs/rss`](https://docs.astro.build/en/guides/rss/) — per-locale feeds
- [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — i18n sitemap

## Commands

| Command           | Action                                             |
| ----------------- | -------------------------------------------------- |
| `npm install`     | Install dependencies                               |
| `npm run dev`     | Start the dev server at `localhost:4321`           |
| `npm run build`   | Type-check (`astro check`) then build to `.vercel/output/static` |
| `npm run preview` | Preview the production build locally               |
| `npm test`        | Build, then run the Vitest checks (i18n/SEO/feeds) |

## Internationalization

- Both locales are URL-prefixed: `/en/...` and `/es/...`. The root `/` redirects to `/en`.
- All UI strings live in a typed dictionary at `src/i18n/ui.ts`.
- A language switcher toggles the current page between locales, preserving the path.
- Every page emits `hreflang` alternates for `en`, `es`, and `x-default`.

## Content model — folder per article

Each article lives under `src/content/articles/<slug>/` with per-locale files:

```
src/content/articles/<slug>/
  en/README.mdx
  es/README.mdx
  cover.png        # colocated assets
```

**Adding an article requires only creating one folder** with its per-locale files.
Frontmatter supports optional layout controls (`variant`, `showToc`, `hero`) so an
article can import shared components and present a custom structure. See the sample
`hello-world` article.

## Quality

- Builds cleanly as a static site.
- Reading pages work with **JavaScript disabled** (progressive enhancement only).
- `npm test` validates: the build succeeds, both locales render, the language
  switcher links each page to its counterpart, `hreflang` alternates are present,
  per-locale RSS + sitemap are emitted, and the empty-list case is handled.
