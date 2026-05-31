## Why

The repository `herrera-luis/personal-site-bench` is an empty greenfield repo with no
implementation. We need a personal website/blog that reaches both English- and
Spanish-speaking audiences from day one, loads fast, costs nothing to host, and is easy
to extend with new articles. A statically generated, bilingual Astro + MDX site deployed
to Vercel delivers this with minimal runtime, first-class content authoring, and built-in
i18n routing — so we plan the full scaffold now before writing any code.

## What Changes

- Introduce a new Astro project (static output) deployed to Vercel as the foundation of the site.
- Add a shared site shell: base HTML layout, header with primary navigation, footer, and a
  persistent language switcher that preserves the current page across locales.
- Add bilingual i18n with URL-prefixed locales (`/en/...`, `/es/...`), a root (`/`) redirect to
  the default locale, and per-page `hreflang` alternate links (including `x-default`).
- Add the core pages in both locales: home (landing + latest articles), about, and individual
  article pages, plus a per-locale article index.
- Adopt a folder-per-article content model using Astro content collections with MDX, where each
  article lives in its own folder and declares its locale, slug, and translation linkage.
- Add discovery + SEO: a per-locale RSS feed, a multilingual `sitemap.xml`, and per-page SEO
  metadata (canonical, Open Graph, Twitter cards, locale-aware titles/descriptions).
- This is a **greenfield scaffold plan only** — no site code is created by this change.

## Capabilities

### New Capabilities
- `site-shell`: Shared layout, header/navigation, footer, and the language switcher used by every page.
- `i18n-routing`: URL-prefixed `en`/`es` locales, root redirect, locale resolution, and `hreflang` alternates.
- `content-pages`: Home, about, article, and article-index pages rendered per locale.
- `content-model`: Folder-per-article MDX content collection, frontmatter schema, and translation linkage.
- `discovery-seo`: Per-locale RSS feeds, multilingual sitemap, and per-page SEO metadata.

### Modified Capabilities
<!-- None. This is a greenfield repository with no existing specs. -->

## Impact

- **Repository**: `herrera-luis/personal-site-bench` (currently only `README.md` + `.gitignore`).
- **New dependencies (planned, not installed by this change)**: `astro`, `@astrojs/mdx`,
  `@astrojs/rss`, `@astrojs/sitemap`, and the Vercel static adapter/preset.
- **Build & hosting**: Static build output deployed to Vercel; root `/` redirect configured via
  Astro i18n routing and/or Vercel rewrites.
- **Content authoring**: Authors add articles as MDX folders under the content directory.
- **Code**: None changed in this change — planning artifacts only (proposal, design, specs, tasks).
