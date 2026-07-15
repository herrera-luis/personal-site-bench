## Context

`herrera-luis/personal-site-bench` is a greenfield repo (only `README.md` and a
`.gitignore` already listing `node_modules`, `.astro`, `dist`, `.vercel`, `.env*`). The goal
is a personal website/blog that is bilingual (English + Spanish), fast, and cheap to host.
Constraints:

- **Static-only** deployment on Vercel (no server runtime; pure prerendered output).
- Bilingual from day one, with clean, shareable, locale-prefixed URLs.
- A content model that scales to many articles and keeps each article's assets co-located.
- Standard SEO/discoverability (canonical URLs, `hreflang`, Open Graph, RSS, sitemap).

This design covers architecture and key decisions only; no site code is produced by this
change.

## Goals / Non-Goals

**Goals:**

- Astro + MDX static site, deployed to Vercel as static output.
- URL-prefixed locales `/en/` and `/es/` with a root (`/`) redirect to the default locale
  (`en`).
- Reusable site shell (base layout, header nav, footer, language switcher) shared by all pages.
- Home, about, article, and per-locale article-listing pages.
- Folder-per-article content model via Astro content collections, keyed by locale + slug.
- Per-locale RSS feed, a sitemap covering all localized URLs, and per-page SEO metadata
  including `hreflang` alternates and canonical links.

**Non-Goals:**

- No SSR, API routes, database, comments, search, analytics, or CMS integration.
- No third/additional locales beyond `en`/`es` (routing is designed to be extensible, but
  only two locales are in scope).
- No visual/brand design system beyond a minimal, semantic baseline.
- No writing of site code in this change — planning only.

## Decisions

### Framework: Astro + MDX (static)

Astro ships zero JS by default and prerenders to static HTML, matching the static-Vercel
constraint. **MDX** (`@astrojs/mdx`) lets articles mix Markdown with occasional components.
*Alternatives:* Next.js (heavier, SSR-oriented) and plain Markdown (no component embedding) —
rejected for a static, content-first personal site.

### i18n: URL-prefixed locales with default-locale prefix retained

Use Astro's i18n routing with `locales: ["en", "es"]`, `defaultLocale: "en"`, and
`prefixDefaultLocale: true` so both locales are explicitly prefixed (`/en/…`, `/es/…`). This
keeps URLs symmetric and `hreflang` handling uniform. The site root `/` issues a **redirect**
to `/en/` (the default locale). *Alternative:* unprefixed default locale — rejected because
asymmetric URLs complicate `hreflang`/canonical and the language switcher.

### Root redirect strategy

`/` redirects to `/en/`. For a static Vercel deploy this is expressed via Astro's redirect
config (emitting a static redirect) rather than runtime middleware, keeping the deploy fully
static. A future enhancement could add `Accept-Language`-based negotiation, but static
default-locale redirect is the baseline.

### Translation strategy

UI strings (nav labels, switcher, page chrome) live in per-locale dictionaries (e.g.
`src/i18n/en.json`, `src/i18n/es.json`) accessed through a small typed `t(locale, key)`
helper. Article/page *content* is authored per locale in the content collection (not machine
translated). This separates chrome translations from long-form content.


### Content model: folder-per-article + content collections

Each article is a folder under the content root containing an `index.mdx` (or `index.md`) plus
co-located images/assets. Localization is expressed by locale in the path, e.g.
`src/content/articles/en/<slug>/index.mdx` and `src/content/articles/es/<slug>/index.mdx`.
An Astro **content collection** with a Zod-typed frontmatter schema (title, description,
`pubDate`, `updatedDate?`, `tags?`, `draft?`, and a stable cross-locale `translationKey` used
to link an article's language versions) validates every entry at build time. *Alternative:*
flat files with locale suffixes — rejected because co-located assets and per-article folders
scale better.

### Routing map

- `/` → redirect to `/en/`.
- `/[locale]/` → home.
- `/[locale]/about/` → about.
- `/[locale]/articles/` → article listing for that locale.
- `/[locale]/articles/[slug]/` → article page, generated via `getStaticPaths` from the
  content collection filtered by locale.

### SEO & syndication

A shared `<SEO>`/head partial emits `<title>`, meta description, canonical URL, Open Graph/
Twitter tags, and `<link rel="alternate" hreflang="…">` entries for each locale (plus
`x-default` → default locale). Syndication:

- **RSS** per locale via `@astrojs/rss` at `/[locale]/rss.xml`, listing that locale's
  non-draft articles.
- **Sitemap** via `@astrojs/sitemap`, configured with i18n so every localized URL and its
  alternates are included.

Absolute URLs derive from a single configured `site` value in `astro.config`.

### Deployment

Astro static build (`output: "static"`) deployed to Vercel; the existing `.gitignore` already
ignores `.vercel`, `dist`, and `.astro`. No adapter runtime is required for pure static output.

## Risks / Trade-offs

- **Static root redirect vs. language negotiation** → Users always land on `en` first;
  mitigated by a prominent language switcher and later optional `Accept-Language` negotiation.
- **Content duplication across locales** → Each locale is authored independently; mitigated by
  a shared `translationKey` so the switcher can deep-link to the corresponding translation and
  fall back to the locale home when a translation is missing.
- **Frontmatter drift** → Inconsistent article metadata; mitigated by a Zod content-collection
  schema that fails the build on invalid/missing fields.
- **hreflang/canonical mistakes** → SEO penalties; mitigated by centralizing all head/SEO
  generation in one shared component driven by locale + `translationKey`.
- **Locale extensibility** → Hardcoding two locales; mitigated by driving locales from a single
  config array so adding a locale is largely additive.

## Migration Plan

Greenfield — no data migration. Rollout is the initial implementation following `tasks.md`;
rollback is simply not merging/deploying. Deployment is a standard Vercel static build.

## Open Questions

- Default locale confirmation: assume **`en`** unless the owner prefers `es`.
- Behavior when an article exists in only one locale: switcher falls back to the target-locale
  home (assumed) vs. hiding the switch for that page.
- Date/number formatting locale conventions (assume `Intl` with the page locale).
