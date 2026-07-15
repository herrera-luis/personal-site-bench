# Personal site

Bilingual (English + Spanish) personal website and blog, built with **Astro + MDX**
and deployed to **Vercel** as a static site.

## Stack

- [Astro](https://astro.build/) (static output)
- MDX content via `@astrojs/mdx`
- Per-locale RSS via `@astrojs/rss`
- Multilingual sitemap via `@astrojs/sitemap`

## i18n

- URL-prefixed locales: `/en/…` and `/es/…` (default locale `en` is also prefixed).
- Root `/` redirects to `/en/`.
- `hreflang` alternates (incl. `x-default`) and canonical URLs on every page.
- UI strings live in `src/i18n/en.json` / `src/i18n/es.json`.

## Content model

Folder-per-article, scoped by locale:

```
src/content/articles/<locale>/<slug>/index.mdx
```

Frontmatter is validated by a Zod schema in `src/content.config.ts`
(`title`, `description`, `pubDate`, optional `updatedDate`, `tags`, `draft`, and a
cross-locale `translationKey`). Drafts are excluded from production builds.

## Commands

| Command           | Action                               |
| ----------------- | ------------------------------------ |
| `npm install`     | Install dependencies                 |
| `npm run dev`     | Start the dev server                 |
| `npm run build`   | Build the static site to `dist/`     |
| `npm run preview` | Preview the production build locally |
