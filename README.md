# Personal Site

Minimal bilingual Astro + MDX personal website scaffold for English and Spanish content.

## Local Development

Install dependencies and start the Astro dev server:

```sh
npm install
npm run dev
```

Useful commands:

```sh
npm run check
npm run build
npm run preview
npm test
```

`npm test` reads generated files from `dist`, so run `npm run build` first.

## Deploy Target

The site is configured as a static Astro site with the Vercel adapter and sitemap generation. The configured canonical site URL is `https://personal-site.example`.

## Content Structure

Articles live in folder-per-article directories under `src/content/articles/`:

```text
src/content/articles/<slug>/en/README.mdx
src/content/articles/<slug>/es/README.mdx
```

Adding an article requires creating one `src/content/articles/<slug>/<locale>/README.mdx` file per available locale. Colocated assets can live in the same article folder.

Required frontmatter:

```yaml
title: "Article title"
dek: "Short deck line"
date: 2026-01-10
description: "SEO description"
```

Optional frontmatter controls:

```yaml
draft: false
layoutVariant: "default"
showToc: false
eyebrow: "Note"
components:
  - Callout
```

## Internationalization

All routes are locale-prefixed:

- `/en/` and `/es/`
- `/en/about/` and `/es/about/`
- `/en/articles/` and `/es/articles/`
- `/en/articles/<slug>/` and `/es/articles/<slug>/`
- `/en/rss.xml` and `/es/rss.xml`

The root page statically redirects to `/en/`. UI strings are defined in `src/i18n/dictionary.ts`, and route helpers live in `src/i18n/routes.ts`. Pages emit canonical URLs plus `hreflang` alternates for English, Spanish, and `x-default` when counterpart routes exist.

## Placeholder Identity Policy

This scaffold intentionally uses generic placeholder identity details only:

- Site name: `Personal Site`
- Author: `A. Writer`
- Domain: `personal-site.example`

Do not add a real person's name, company, course, contact form, or subscribe form unless the project requirements change.
