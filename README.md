# Personal Site

A minimal, content-first, **bilingual (English + Spanish)** personal website/blog,
built with [Astro](https://astro.build) v4 + MDX and deployable to Vercel as a
static site.

Placeholder identity: site name **"Personal Site"**, author **"A. Writer"**,
domain `personal-site.example`. Replace these in `src/config/site.ts`.

## Features

- Astro static output with the `@astrojs/vercel` adapter.
- Built-in i18n routing: URL-prefixed locales `/en/…` and `/es/…`; root `/`
  redirects to the default locale.
- Typed UI-string dictionary (`src/i18n/ui.ts`) — unknown keys are a type error.
- Language switcher that toggles the current page to the other locale, preserving
  the path.
- Every page emits `hreflang` alternates for `en`, `es`, and `x-default`, plus a
  canonical URL and localized OpenGraph tags.
- Folder-per-article content model.
- Per-locale RSS feeds (`/en/rss.xml`, `/es/rss.xml`) and an i18n sitemap.
- Typography-driven design, restrained palette, dark/light via
  `prefers-color-scheme`, and no downloaded web fonts.
- Reading pages work with JavaScript disabled (progressive enhancement only).

## Commands

```sh
npm install       # install dependencies
npm run dev       # start the dev server
npm run build     # build the static site
npm run preview   # preview the production build
npm run check     # type-check (astro check)
npm test          # run build assertions + i18n tests against the build output
```

> Run `npm run build` before `npm test` — the tests assert against the build
> output (the `@astrojs/vercel` static adapter emits to `.vercel/output/static`).

## Adding an article

Create **one folder** under `src/content/articles/<slug>/` with a per-locale
file for each language and colocate any assets:

```
src/content/articles/my-post/
├── en/README.mdx
├── es/README.mdx
└── assets/            # optional colocated images
```

Each `README.mdx` needs frontmatter:

```mdx
---
title: "My post"
dek: "A short subtitle / deck."
date: 2026-02-01
# optional layout controls:
wide: false
layoutVariant: default   # or "feature"
---

Body prose in **MDX**. You may import shared components, e.g.:

import Callout from '../../../../components/Callout.astro';

<Callout title="Note">Hello!</Callout>
```

No route edits are required — listing pages, article pages, RSS, and the sitemap
all iterate the content collection automatically.

## Deploy to Vercel

The project uses `@astrojs/vercel` (static). Import the repository into Vercel;
the default build command `astro build` and output are detected automatically.
