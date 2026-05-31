# Personal Site

A minimal, content-first, bilingual (English + Spanish) personal website and blog.
Built with [Astro](https://astro.build) + MDX as a static site, deployable to Vercel.

The identity used throughout is a generic placeholder — site name **Personal Site**,
author **A. Writer**, domain `personal-site.example`.

## Features

- **Static output** via `@astrojs/vercel` — works fully with JavaScript disabled.
- **Bilingual** (`en` + `es`) with Astro's built-in i18n routing. Both locales are
  URL-prefixed (`/en/...`, `/es/...`); `/` redirects to the default locale.
- **Typed UI dictionary** — every interface string is translated and type-checked.
- **Language switcher** that links each page to its counterpart in the other locale.
- **Folder-per-article** content model with colocated, per-locale content.
- **SEO**: localized title/description/OpenGraph, `hreflang` alternates
  (`en`, `es`, `x-default`), a per-locale RSS feed, and a sitemap.
- Typography-driven design with a restrained palette, dark/light following
  `prefers-color-scheme`, and **no web-font downloads** (system font stack).

## Commands

| Command           | Action                                             |
| ----------------- | -------------------------------------------------- |
| `npm install`     | Install dependencies                               |
| `npm run dev`     | Start the local dev server at `localhost:4321`     |
| `npm run build`   | Type-check (`astro check`) and build to `./dist/`  |
| `npm run preview` | Preview the production build locally               |
| `npm test`        | Run the post-build checks against `./dist/`        |

> `npm test` validates the built output, so run `npm run build` first.

## Adding an article

Articles live under `src/content/articles/<slug>/` with one folder per article and
one file per locale. **Adding an article requires only creating one folder** with its
per-locale files:

```
src/content/articles/<slug>/
├── en/README.mdx     # English version
├── es/README.mdx     # Spanish version
└── cover.svg         # optional colocated assets
```

Each `README.mdx` needs frontmatter:

```mdx
---
title: My article title
dek: A short subtitle / deck shown under the title.
pubDate: 2026-05-31
# optional layout controls:
wide: false       # widen the reading column
hideDek: false    # hide the deck on the article page
draft: false      # exclude from listings and feeds
---

Body prose. You can import shared components to vary the structure:

import Callout from '../../../../components/Callout.astro';

<Callout type="note" title="Heads up">MDX components work here.</Callout>
```

No code changes are needed — the content loader discovers the folder automatically,
and the slug/locale are derived from the path.

## Project structure

```
src/
├── components/        # Header, footer, language switcher, SEO head, MDX components
├── content/articles/  # Folder-per-article content (per locale)
├── i18n/              # Typed UI dictionary + locale helpers
├── layouts/           # Base + article layouts
├── lib/               # Content helpers (getArticles, id parsing)
├── pages/             # Routes (root redirect + /[locale]/... + RSS)
└── styles/            # Global CSS (system fonts, light/dark)
tests/                 # Built-output checks (node --test)
```
