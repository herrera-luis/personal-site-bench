## Why

The `herrera-luis/personal-site-bench` repository is an empty greenfield project with
no implementation yet. We need a plan for a fast, maintainable, bilingual
(English + Spanish) personal website/blog that ships as a static site on Vercel. Doing
the planning up front — site structure, i18n routing, content model, and SEO/syndication —
avoids costly rework once articles start being written and lets contributors implement
against an agreed contract.

## What Changes

- Introduce an **Astro + MDX** static site, deployed to **Vercel** as static output (no SSR).
- Define a **site shell**: shared base layout, header with primary navigation, footer, and a
  **language switcher** that preserves the current page across locales.
- Establish **bilingual i18n** with **URL-prefixed locales** (`/en/…`, `/es/…`), a **root
  redirect** from `/` to the default locale, and correct **`hreflang`** alternate links on
  every page.
- Define the core **pages**: localized **home**, **about**, and **article** (blog post)
  pages, plus a per-locale article index/listing.
- Adopt a **folder-per-article content model** (one directory per article holding its MDX
  body and co-located assets) managed through Astro content collections.
- Provide **per-locale syndication and SEO**: an **RSS** feed per locale, a **sitemap**
  covering all localized URLs, and per-page **SEO metadata** (title/description, canonical,
  Open Graph, `hreflang`).

## Capabilities

### New Capabilities

- `site-shell`: Shared page shell — base layout, header/primary navigation, footer, and a
  locale-preserving language switcher used by every page.
- `i18n-routing`: Bilingual routing and localization — URL-prefixed `en`/`es` locales, root
  redirect to the default locale, translation lookup, and `hreflang` alternates.
- `content-pages`: Localized page types (home, about, article, article listing) and the
  folder-per-article content model backing them.
- `seo-syndication`: Per-locale RSS feeds, a multilingual sitemap, and per-page SEO metadata
  (canonical, Open Graph, alternates).

### Modified Capabilities

<!-- None. This is a greenfield repository with no existing specs. -->

## Impact

- **Repository**: `herrera-luis/personal-site-bench` (currently only `README.md` and a
  `.gitignore` that already anticipates Astro/Vercel: `node_modules`, `.astro`, `dist`,
  `.vercel`, `.env*`).
- **New dependencies (planned)**: `astro`, `@astrojs/mdx`, `@astrojs/rss`, `@astrojs/sitemap`,
  and the Astro Vercel static adapter/config.
- **New systems**: static build pipeline and Vercel static deployment.
- **Out of scope of this change**: no site code is written; this change only produces the
  OpenSpec plan (proposal, design, specs, tasks).
