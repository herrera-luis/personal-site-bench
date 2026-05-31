# Personal Site

A minimal, content-first, **bilingual (English + Spanish)** personal website/blog,
built with **Astro + MDX** as a static site and deployable to **Vercel**.

> Placeholder identity only — site name **"Personal Site"**, author **"A. Writer"**,
> domain **`personal-site.example`**. No real person is referenced.

## Stack

- [Astro](https://astro.build/) v5 (`output: 'static'`)
- [`@astrojs/mdx`](https://docs.astro.build/en/guides/integrations-guide/mdx/) — article bodies in MDX
- Astro built-in **i18n routing** — both locales URL-prefixed (`/en`, `/es`); `/` redirects to `/en/`
- [`@astrojs/vercel`](https://docs.astro.build/en/guides/integrations-guide/vercel/) — static adapter
- [`@astrojs/rss`](https://docs.astro.build/en/guides/rss/) — per-locale RSS feed
- [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — sitemap with locale alternates
- [Vitest](https://vitest.dev/) + [linkedom](https://github.com/WebReflection/linkedom) — tests against the static build

## Commands

```sh
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:4321)
npm run build    # build the static site to ./dist
npm run preview  # preview the production build
npm run check    # astro check (type-check .astro/.ts)
npm test         # build then run the Vitest suite
```

## Internationalization

- Locales: **en** (default) and **es**, both URL-prefixed.
- The root path `/` redirects to the default locale (`/en/`).
- All UI strings live in a **typed dictionary** at `src/i18n/ui.ts` (a missing
  translation is a compile-time error).
- The language switcher toggles the current page between locales **preserving the
  path** (e.g. `/en/about/` ↔ `/es/about/`).
- Every page emits `hreflang` alternates for `en`, `es`, and `x-default`.

## Content model — folder-per-article

Each article lives under `src/content/articles/<slug>/` with per-locale content
and colocated assets:

```
src/content/articles/
  hello-world/
    en/README.mdx     # English
    es/README.mdx     # Spanish
    cover.svg         # colocated asset
```

### Adding an article

**Create one folder** — no code changes required:

1. `mkdir -p src/content/articles/my-post/en src/content/articles/my-post/es`
2. Add `en/README.mdx` and `es/README.mdx`, each with frontmatter:

   ```mdx
   ---
   title: "My Post"
   dek: "A short subtitle / dek."
   date: 2026-06-01
   # optional:
   # description: "Custom SEO description."
   # draft: false
   # wide: false        # vary the layout width
   # hideDek: false     # hide the H3 dek
   ---

   Body prose in MDX. You can import shared components, e.g.:

   import Callout from '../../../../components/Callout.astro';

   <Callout title="Note">Articles can vary their structure.</Callout>
   ```

3. Done — the article appears in the home list, the articles index, the per-locale
   RSS feed, and the sitemap automatically.

## Pages

- **Home** (`/<locale>/`) — identity strip + reverse-chronological article list
  (with an empty-state when there are no articles).
- **Articles** (`/<locale>/articles/`) — full listing.
- **Article** (`/<locale>/articles/<slug>/`) — H1 title, H3 dek, meta line, prose;
  supports custom structure via imported components and optional frontmatter.
- **About** (`/<locale>/about/`) — short bio + optional external profile link.

## Quality

- Builds cleanly as a static site.
- Reading pages work with **JavaScript disabled** (progressive enhancement only).
- Dark/light follows `prefers-color-scheme`; **no web-font downloads** (system
  fonts only).
- The test suite asserts: the build succeeds, both-locale routes render, the
  language switcher links each page to its counterpart, and `hreflang` alternates
  are present (plus RSS/sitemap and no-JS checks).

## Deployment

Static output is produced via the `@astrojs/vercel` adapter into `./dist`
(`.vercel/output/static`). Deploy the repository to Vercel as a static site.
