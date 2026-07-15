## 1. Project setup & Vercel static deployment

- [x] 1.1 Initialize an Astro project in the repo root with TypeScript and a `src/` structure
- [x] 1.2 Add dependencies: `astro`, `@astrojs/mdx`, `@astrojs/rss`, `@astrojs/sitemap`
- [x] 1.3 Configure `astro.config.mjs` with `output: "static"`, the `site` absolute URL, and
      the MDX + sitemap integrations
- [x] 1.4 Add npm scripts (`dev`, `build`, `preview`) and confirm `.gitignore` already ignores
      `node_modules`, `.astro`, `dist`, `.vercel`, `.env*`
- [x] 1.5 Add Vercel static deployment config (static build output, no server adapter)

## 2. i18n foundation (i18n-routing)

- [x] 2.1 Configure Astro i18n with `locales: ["en", "es"]`, `defaultLocale: "en"`, and
      `prefixDefaultLocale: true`
- [x] 2.2 Create per-locale translation dictionaries (`src/i18n/en.json`, `src/i18n/es.json`)
- [x] 2.3 Implement a typed `t(locale, key)` helper and a keys check ensuring both dictionaries
      define the same keys
- [x] 2.4 Implement locale/URL utilities (build locale-prefixed paths, absolute URLs, and
      per-page locale alternates)
- [x] 2.5 Configure the root `/` → `/en/` redirect as static output

## 3. Site shell (site-shell)

- [x] 3.1 Create the shared base layout setting `<html lang>` and wrapping header, `<main>`,
      and footer
- [x] 3.2 Build the header with locale-prefixed primary navigation (home, about, articles) and
      active/`aria-current` indication
- [x] 3.3 Build the localized footer
- [x] 3.4 Build the language switcher that preserves the current page, deep-links translated
      articles via `translationKey`, and falls back to the other locale's home when no
      counterpart exists

## 4. Content model (content-pages)

- [x] 4.1 Define the `articles` content collection with a Zod frontmatter schema (title,
      description, `pubDate`, `updatedDate?`, `tags?`, `draft?`, `translationKey`)
- [x] 4.2 Establish the folder-per-article structure per locale
      (`src/content/articles/en/<slug>/index.mdx`, `.../es/<slug>/index.mdx`) with co-located
      assets
- [x] 4.3 Add helpers to query articles by locale (excluding drafts in production, sorted
      newest-first) and to resolve an article's counterpart via `translationKey`
- [x] 4.4 Add seed example articles in both locales to validate the model

## 5. Pages (content-pages)

- [x] 5.1 Implement the localized home page `/[locale]/` (intro + recent articles)
- [x] 5.2 Implement the localized about page `/[locale]/about/`
- [x] 5.3 Implement the article listing page `/[locale]/articles/` (locale-filtered,
      newest-first, drafts excluded)
- [x] 5.4 Implement the article page `/[locale]/articles/[slug]/` via `getStaticPaths`,
      rendering title, locale-formatted date, and MDX body

## 6. SEO & syndication (seo-syndication)

- [x] 6.1 Build a shared SEO/head component emitting title, description, canonical, and Open
      Graph/Twitter tags
- [x] 6.2 Emit `hreflang` alternates (`en`, `es`, and `x-default` → `en`) on every page
- [x] 6.3 Add article-specific metadata (article Open Graph type, publication date) to article
      pages
- [x] 6.4 Implement per-locale RSS feeds at `/[locale]/rss.xml` listing that locale's non-draft
      articles
- [x] 6.5 Configure the sitemap integration for i18n so all localized URLs and their alternates
      are included

## 7. Verification

- [x] 7.1 Run `astro build` and confirm `/en/…` and `/es/…` pages, `/` redirect, both
      `rss.xml` feeds, and the sitemap are generated
- [x] 7.2 Validate `hreflang`/canonical links and language-switcher behavior across home,
      about, listing, and article pages
- [x] 7.3 Confirm draft exclusion in production and schema-validation failure on bad
      frontmatter
