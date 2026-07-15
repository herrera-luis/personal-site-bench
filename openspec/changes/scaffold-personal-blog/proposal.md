## Why

The `herrera-luis/personal-site-bench` repository is an empty greenfield project with no
implementation. There is a need for a fast, maintainable, and fully bilingual
(English + Spanish) personal website and blog that can grow with the owner's writing over
time. Building on Astro + MDX and deploying as a static site to Vercel gives us
near-zero-runtime hosting, excellent Core Web Vitals, first-class content authoring in
Markdown/MDX, and a simple, cache-friendly deployment target — all without introducing a
server or database.

Doing this now, before any code exists, lets us lock in the information architecture
(locale-prefixed URLs, folder-per-article content, per-locale syndication) so every later
article and page inherits a consistent, SEO-correct structure instead of retrofitting it.

## What Changes

- Scaffold a new Astro project configured for **static output** and deployment to **Vercel**
  (`@astrojs/vercel` static adapter), with the **MDX** integration enabled.
- Establish a **site shell**: shared base layout, a global header with primary navigation,
  a footer, a **language switcher**, and baseline global styling/design tokens.
- Implement **English + Spanish i18n** using Astro's i18n routing with **URL-prefixed
  locales** (`/en/...`, `/es/...`), a **root (`/`) redirect** to the default locale, and
  **`hreflang` alternate** links plus `x-default` on every page.
- Build the core **pages** in both locales: **home**, **about**, an **article index
  (blog listing)**, and the **individual article** page.
- Define a **folder-per-article content model** using an Astro content collection where each
  article lives in its own folder (co-locating its MDX body and image/asset files) with a
  typed, validated frontmatter schema and per-locale variants.
- Provide **per-locale syndication and SEO**: a separate **RSS feed per locale**, a
  **sitemap**, and per-page **SEO metadata** (canonical URLs, Open Graph / Twitter cards,
  title/description, `hreflang`).
- This change is **planning only** — no site code is written. It authors the OpenSpec
  proposal, design, capability specs, and task list that a subsequent implementation change
  will execute.

## Capabilities

### New Capabilities

- `site-shell`: The Astro + MDX + Vercel static project foundation, shared base layout,
  global header/navigation, footer, language switcher, and baseline styling.
- `i18n-routing`: English/Spanish locale strategy — URL-prefixed locales, root redirect,
  locale-aware link/URL helpers, translated UI strings, and `hreflang` alternates.
- `content-pages`: The home, about, article-index, and individual-article page types rendered
  per locale.
- `content-model`: The folder-per-article content collection, frontmatter schema, and rules
  for locating and pairing localized article variants.
- `seo-syndication`: Per-locale RSS feeds, sitemap generation, and per-page SEO metadata.

### Modified Capabilities

<!-- None. This is a greenfield repository with no existing specs in openspec/specs/. -->

## Impact

- **Repository**: `herrera-luis/personal-site-bench` (currently empty except for `README.md`
  and a `.gitignore` that already ignores `node_modules`, `.astro`, `dist`, `.vercel`, and
  `.env*`).
- **New dependencies (planned, added by the implementation change — not this one)**: `astro`,
  `@astrojs/mdx`, `@astrojs/vercel`, `@astrojs/rss`, `@astrojs/sitemap`.
- **Deployment**: Vercel, static output (no server runtime, no database).
- **Code**: No source files are created or modified by this change. All artefacts live under
  `openspec/changes/scaffold-personal-blog/`.
