# Personal Site

A minimal, content-first **bilingual** (English + Spanish) personal website and
blog built with [Astro](https://astro.build) + MDX. It is fast, accessible, and
fully functional **without client-side JavaScript** — reading, navigation, the
language switcher, and the root redirect all work with JS disabled.

Placeholder identity: **Personal Site** by **A. Writer**
(`https://personal-site.example`).

## Tech stack

- **Astro v4** with `output: 'static'` and the `@astrojs/vercel/static` adapter.
- **`@astrojs/mdx`** for article authoring (components inside content).
- **`@astrojs/rss`** for per-locale feeds, **`@astrojs/sitemap`** for the sitemap.
- System font stack (zero web-font downloads), dark/light via
  `prefers-color-scheme`.
- Node 20 LTS, npm. All dependencies are pinned to exact versions for
  reproducible installs.

## Commands

| Command          | Action                                              |
| ---------------- | --------------------------------------------------- |
| `npm install`    | Install dependencies                                |
| `npm run dev`    | Start the dev server at `localhost:4321`            |
| `npm run build`  | Build the production site (Vercel static output)    |
| `npm run preview`| Preview the build locally                           |
| `npm run check`  | Type-check + content-collection schema validation   |
| `npm test`       | Post-build assertions over the generated output     |

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run check`,
`npm run build`, then `npm test`.

## Internationalization

Built on Astro's native i18n routing:

```js
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'es'],
  routing: { prefixDefaultLocale: true }, // both locales URL-prefixed
}
```

- Every page is URL-prefixed: `/en/...` and `/es/...`.
- `/` redirects to `/en/` via a static, JS-free meta-refresh page
  (`src/pages/index.astro`).
- UI strings live in a typed dictionary (`src/i18n/ui.ts`); helpers in
  `src/i18n/config.ts` compute the path-preserving counterpart URL used by the
  language switcher and the `hreflang` alternates (`en`, `es`, `x-default`).

## How to add an article

Adding an article is **creating one folder** — no routing changes required:

```
src/content/articles/<slug>/
├── en/README.mdx
└── es/README.mdx
```

Each `README.mdx` needs frontmatter:

```yaml
---
title: 'Your title'
dek: 'A one-line subtitle.'
pubDate: 2026-01-15
locale: 'en' # or 'es'
# optional:
description: 'SEO description'
draft: false
ogImage: '/path/to/image.png'
layoutVariant: 'default' # 'default' | 'wide' | 'feature'
showToc: false
---
```

You can import shared components inside MDX, e.g.:

```mdx
import Callout from '@/components/Callout.astro';

<Callout title="Note">Body text.</Callout>
```

Colocate images and other assets inside the article folder. The dynamic
`[lang]/articles/[slug]` route generates both-locale pages automatically.

See `src/content/articles/hello-world/` for a worked example exercising
`layoutVariant`, `showToc`, the meta line, and an imported `<Callout>`.

## Project structure

```
src/
├── components/   BaseHead, SiteHeader, SiteFooter, LanguageSwitcher, Callout
├── content/      articles collection (folder-per-article, per-locale MDX)
├── i18n/         locale config + typed UI dictionary
├── layouts/      BaseLayout, ArticleLayout
├── lib/          article helpers (getArticles, getArticleEntry)
├── pages/        index redirect + [lang] routes (home, about, articles, rss)
└── styles/       global.css (palette, typography, dark/light tokens)
tests/            build-output.test.mjs (post-build assertions)
```

## Deploy

Targets Vercel (static). The `@astrojs/vercel/static` adapter emits to
`.vercel/output/static`; `vercel.json` declares the framework. `site` is set in
`astro.config.mjs` so RSS and sitemap URLs are absolute.
