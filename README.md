# Personal site

A bilingual English + Spanish personal website and blog scaffolded with Astro and MDX.

## Tech stack

- Astro static output
- MDX article content
- URL-prefixed locales: `/en/` and `/es/`
- Per-locale RSS feeds
- Static sitemap with localized alternates
- Vercel static deployment

## Commands

```bash
npm install
npm run dev
npm run check
npm run build
```

`npm run build` runs `astro check`, builds the static site, and verifies expected localized routes, RSS feeds, sitemap output, and draft filtering.

## Content model

Articles live in folder-per-article directories under `src/content/articles/`:

```text
src/content/articles/<article-slug>/en.mdx
src/content/articles/<article-slug>/es.mdx
```

Each localized MDX file has its own frontmatter and must use a `locale` value that matches the filename. Missing translations are allowed; the language switcher falls back to the selected locale's article index instead of linking to a missing page.
