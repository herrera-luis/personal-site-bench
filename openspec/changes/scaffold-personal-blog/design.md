## Context

`herrera-luis/personal-site-bench` is an empty greenfield repository. The goal is a fast,
low-maintenance, **bilingual (English + Spanish)** personal website/blog deployed as a static
site on Vercel. The site must support URL-prefixed locales, translated content, SEO, and feeds,
while keeping authoring simple (write Markdown/MDX, drop it in a folder).

Constraints:
- Static output only (no SSR runtime requirement); free Vercel static hosting.
- Two locales at launch (`en`, `es`) with the architecture open to more later.
- Content authored as MDX so prose can embed components.
- This document plans the architecture; no site code is written in this change.

## Goals / Non-Goals

**Goals:**
- A single Astro project that builds to static HTML/CSS/JS and deploys to Vercel.
- URL-prefixed locales `/en/*` and `/es/*`, with `/` redirecting to the default locale (`en`).
- A reusable site shell (layout, nav, footer) and a language switcher that keeps the reader on the
  equivalent page in the other locale.
- Home, about, and article pages plus a per-locale article index, all localized.
- A folder-per-article content model with a typed frontmatter schema and explicit translation linkage.
- Per-locale RSS feeds, a multilingual sitemap, and per-page SEO/`hreflang` metadata.

**Non-Goals:**
- No CMS, comments, search, authentication, or server-side/runtime APIs.
- No automatic machine translation — translations are authored manually.
- No theming system or design system beyond a clean baseline layout.
- No analytics/tracking decisions (left for a future change).

## Decisions

### Decision 1: Astro with static output, deployed to Vercel
Use Astro in `output: "static"` mode. Astro ships zero JS by default, renders MDX at build time,
and has first-class content collections, i18n routing, RSS, and sitemap integrations — matching
the requirements directly.
- **Alternatives considered**: Next.js (heavier, React-runtime oriented; static export less
  ergonomic for content sites); Eleventy (great static generator but weaker typed content +
  component story than Astro/MDX); Hugo (fast but no MDX/JS component model).
- **Vercel deployment**: static build via `npm run build` producing `dist/`. Use Astro's official
  Vercel preset in static mode (or Vercel's zero-config Astro detection). Root redirect implemented
  via Astro i18n routing config, with a Vercel rewrite/redirect as a fallback.

### Decision 2: i18n via Astro's built-in i18n routing, URL-prefixed
Configure `i18n: { defaultLocale: "en", locales: ["en", "es"], routing: { prefixDefaultLocale: true } }`
so both locales are prefixed (`/en/...`, `/es/...`). The bare root `/` redirects to `/en/`.
- **Why prefix the default locale**: consistent, unambiguous URLs and simpler `hreflang`/sitemap
  generation; avoids "default has no prefix" edge cases.
- **Locale resolution**: locale is derived from the URL prefix; UI strings come from per-locale
  dictionaries (`src/i18n/en.json`, `src/i18n/es.json`) via a small `t(locale, key)` helper.
- **Alternatives considered**: domain/subdomain-based locales (overkill for a personal site);
  cookie/`Accept-Language` detection without prefixes (bad for static SEO and shareable URLs).


### Decision 3: Folder-per-article content model with Astro content collections
Each article is its own folder containing localized MDX entries plus co-located assets, organized
under a `blog` content collection. Locale and translation linkage are encoded in frontmatter via a
`translationKey` (a stable id shared by an article's translations) plus a `locale` field.
Proposed layout:
```
src/content/blog/
  hello-world/            # translationKey: hello-world
    en.mdx                # locale: en, slug: hello-world
    es.mdx                # locale: es, slug: hola-mundo
    cover.jpg
```
- A typed Zod schema (`src/content/config.ts`) validates frontmatter: `title`, `description`,
  `pubDate`, `locale`, `translationKey`, optional `slug`, `tags`, `draft`, `cover`.
- Article URLs: `/en/blog/<slug>/` and `/es/blog/<slug>/` via dynamic routes
  (e.g. `src/pages/[locale]/blog/[...slug].astro`).
- **Alternatives considered**: one flat file per article with locale suffix (harder to co-locate
  assets); separate `en/` and `es/` content trees (duplicates folder structure, weaker linkage).

### Decision 4: SEO, RSS, and sitemap as build-time outputs
- **SEO**: a shared `<SEO>`/`<BaseHead>` component emits title, description, canonical URL,
  Open Graph, Twitter card, and `<link rel="alternate" hreflang="...">` for each locale plus
  `x-default` pointing at the default locale.
- **RSS**: per-locale feeds at `/en/rss.xml` and `/es/rss.xml` generated with `@astrojs/rss`,
  each listing only that locale's articles.
- **Sitemap**: `@astrojs/sitemap` configured with i18n options so it emits localized alternates.

## Risks / Trade-offs

- [Locale/translation drift — an article exists in one locale only] → Treat missing translations
  gracefully: the language switcher links to the locale home (or hides the alternate) when no
  matching `translationKey` exists; specs require this behavior.
- [Root redirect handled in two layers (Astro + Vercel)] → Document a single source of truth
  (Astro i18n config) and use the Vercel rule only as a deploy-time fallback to avoid conflicts.
- [`prefixDefaultLocale: true` changes URLs vs. a non-prefixed default] → Acceptable and chosen
  deliberately for consistency; ensure canonical + sitemap reflect prefixed URLs.
- [MDX build cost grows with many articles] → Static build scales linearly; acceptable for a
  personal blog and revisited only if build times become a problem.
- [hreflang/canonical mistakes hurt SEO] → Centralize URL construction in one helper so canonical,
  hreflang, sitemap, and RSS all derive links the same way.

## Migration Plan

Greenfield — no migration. Deployment path: initialize the Astro project, add integrations,
author content, run `npm run build`, and connect the repo to Vercel for static deploys. Rollback
is trivial (revert commit / redeploy previous build). Implementation happens in a later change;
this change only produces the plan.

## Open Questions

- Default locale confirmed as `en` and locale set `["en", "es"]`? (assumed yes)
- Should `/` redirect be a 302 (temporary) or 308 (permanent)? (assumed permanent/308)
- Desired article slug strategy for Spanish — localized slugs (`/es/blog/hola-mundo/`) vs. shared
  slugs? (assumed localized slugs allowed via frontmatter `slug`)
