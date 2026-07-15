## Context

`herrera-luis/personal-site-bench` is a greenfield repo (only `README.md` and a `.gitignore`
that already ignores `node_modules`, `.astro`, `dist`, `.vercel`, `.env*`). The goal is a
bilingual (English + Spanish) personal website/blog that is:

- **Static** — pre-rendered HTML/CSS/JS, no server runtime or database.
- **Deployed to Vercel** — via the official static adapter.
- **Authored in MDX** — so articles can mix Markdown with occasional components.
- **Bilingual first** — every route exists per locale, discoverable by search engines.

Constraints:

- Static-only output; no SSR, no runtime API, no auth.
- Two locales at launch: `en` (default) and `es`. The design must not hard-code "only two
  locales" in a way that blocks adding a third later, but two is the launch scope.
- The existing `.gitignore` already anticipates Astro + Vercel, so tooling assumptions are safe.

This document describes HOW the planned site is structured. It does not write site code;
implementation happens in a later change.

## Goals / Non-Goals

**Goals:**

- Astro + MDX project emitting a fully static build deployable to Vercel.
- Clean, predictable URL scheme with URL-prefixed locales and a root redirect.
- Correct international SEO: `hreflang` alternates (incl. `x-default`), canonical URLs,
  per-locale RSS, and a sitemap.
- A reusable site shell (layout, header + nav, footer, language switcher).
- A folder-per-article content model that co-locates each article's MDX and assets and
  validates frontmatter.
- Home, About, article-index, and article pages in both locales.

**Non-Goals:**

- Writing the actual site code (this is a plan-only change).
- Comments, search, analytics dashboards, newsletter signup, or a CMS.
- Authentication, user accounts, or any server-side/API functionality.
- Automatic machine translation of content; each article is translated by the author.
- More than two locales at launch (design stays locale-list-driven so more can be added later).

## Decisions

### D1. Framework: Astro + MDX, static output

Astro's islands architecture ships zero JS by default and is purpose-built for content sites,
giving excellent performance and simple MDX authoring. **Chosen over** Next.js (heavier, more
runtime-oriented) and a pure static-site generator like Hugo (weaker component story / MDX).
Output mode is `static` (`output: 'static'`).

### D2. Hosting: Vercel static adapter

Use `@astrojs/vercel` in static mode. **Chosen over** Netlify/Cloudflare Pages purely because
the deployment target is specified as Vercel; the static adapter avoids serverless functions
entirely. `.gitignore` already ignores `.vercel`.

### D3. i18n strategy: URL-prefixed locales with `en` default, root redirect

Use Astro's built-in i18n routing configured with `defaultLocale: 'en'`, `locales: ['en','es']`,
and `prefixDefaultLocale: true` so **both** locales are prefixed (`/en/...`, `/es/...`) for
symmetry and unambiguous canonical URLs. The bare root `/` issues a redirect to `/en/`.

- **Why prefix the default too?** Symmetric URLs make `hreflang`, canonical tags, and the
  language switcher trivially consistent (every page has an explicit locale segment). **Chosen
  over** an unprefixed default (`/about` for en, `/es/about` for es), which creates canonical
  ambiguity and asymmetric switching logic.
- **Root redirect** implemented via Astro i18n `redirectToDefaultLocale` behavior (a static
  `index` that redirects), so `/` → `/en/`.

### D4. Content model: one Astro content collection, folder-per-article

A single `blog` content collection under `src/content/blog/`. **Each article is a folder**
containing an `index.mdx` (or locale-named entries) plus its own images/assets, so assets are
co-located and portable. Localization approach:

- Each article folder carries a stable `slug` and a `lang` frontmatter field; the English and
  Spanish variants of the same article share a `translationKey` (a stable id) so the language
  switcher can jump between equivalents and `hreflang` can pair them.
- Frontmatter is validated with a Zod schema via `defineCollection` (title, description,
  `pubDate`, optional `updatedDate`, `lang`, `translationKey`, `tags`, `draft`, optional
  `heroImage`).

**Chosen over** a flat file-per-article layout (harder to co-locate images) and over separate
top-level `en/`/`es/` collections (duplicates schema, complicates pairing). Folder-per-article
keeps each post self-contained.


### D5. Routing: dynamic `[lang]` segment + content-driven article routes

- `src/pages/[lang]/index.astro` — home per locale.
- `src/pages/[lang]/about.astro` — about per locale.
- `src/pages/[lang]/blog/index.astro` — article index (listing) per locale.
- `src/pages/[lang]/blog/[...slug].astro` — individual article, generated from the collection
  via `getStaticPaths`, filtered by `lang`.
- `src/pages/index.astro` — root redirect to `/en/`.

### D6. SEO & syndication

- **`hreflang`**: every page emits `<link rel="alternate" hreflang="en" ...>`,
  `hreflang="es"`, and `hreflang="x-default"` (pointing to the English URL) for its localized
  equivalents. Pages without a translation omit the missing alternate.
- **Canonical**: each page emits a self-referential canonical using an absolute `site` URL.
- **RSS**: one feed per locale (`/en/rss.xml`, `/es/rss.xml`) built with `@astrojs/rss`,
  listing that locale's non-draft articles.
- **Sitemap**: `@astrojs/sitemap` generates `sitemap-index.xml` including all localized routes;
  the integration is configured with `i18n` so it emits `hreflang` links in the sitemap too.
- **Metadata**: a shared SEO component sets `<title>`, description, Open Graph, and Twitter
  card tags; article pages add article-specific OG (published/updated time, tags).

### D7. UI strings and language switcher

A small `src/i18n/` module holds a `ui` dictionary keyed by locale for chrome strings (nav
labels, "Read more", date formatting locale, etc.) and helper functions (`getLangFromUrl`,
`useTranslations`, `localizedPath`). The language switcher renders links to the current page's
equivalent in the other locale (using `translationKey` for articles, or the mirrored path for
static pages), falling back to the other locale's home if no equivalent exists.

## Risks / Trade-offs

- **Missing translations for a given article** → Language switcher and `hreflang` must degrade
  gracefully: only emit alternates that exist, and fall back to the locale home when a direct
  equivalent is absent. Specced explicitly so implementation handles it.
- **Prefixing the default locale changes canonical URLs** (`/en/...` not `/...`) → Acceptable
  and intentional for symmetry; the root redirect preserves a clean entry point at `/`.
- **`translationKey` drift** (author forgets to match keys across variants) → Mitigate with a
  documented convention and, in the implementation change, an optional build-time check; at
  minimum the Zod schema requires the field so it is never silently absent.
- **Static-only means no server features** → By design; anything dynamic (search, comments) is
  out of scope and, if needed later, would be a client-side island or external service.
- **Vercel static adapter vs. Astro's default static build** → Using `@astrojs/vercel` static
  keeps Vercel-specific output (headers, redirects) first-class; trade-off is a Vercel-coupled
  config, which is acceptable given the stated deployment target.

## Migration Plan

Not applicable in the traditional sense (greenfield, no existing users or data). Rollout is
simply: the follow-up implementation change scaffolds the project per these specs, and Vercel
builds/deploys the static output. Rollback = revert the implementation change; no data
migration is involved.

## Open Questions

- Exact visual design/branding (colors, typography) — deferred to implementation; specs only
  require a baseline style system and design tokens.
- Whether to add a third locale later — out of scope now; the locale-list-driven design leaves
  room for it.
- Date/number formatting details per locale — implementation will use `Intl` with the active
  locale; no spec-level decision needed beyond "format per active locale".
