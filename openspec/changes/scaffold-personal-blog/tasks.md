## 1. Project bootstrap & Vercel deployment

- [x] 1.1 Initialize an Astro project at the repo root with `output: "static"` and TypeScript config
- [x] 1.2 Add dependencies: `astro`, `@astrojs/mdx`, `@astrojs/rss`, `@astrojs/sitemap`
- [x] 1.3 Register the MDX and sitemap integrations in `astro.config.mjs` and set `site` to the production URL
- [x] 1.4 Add `dev`, `build`, and `preview` npm scripts and verify `npm run build` produces `dist/`
- [x] 1.5 Configure Vercel static deployment via `vercel.json` (root 308 redirect + zero-config Astro detection); connecting the repo in the Vercel dashboard is a manual deploy-time step

## 2. i18n routing foundation

- [x] 2.1 Configure Astro `i18n` with `defaultLocale: "en"`, `locales: ["en", "es"]`, and `prefixDefaultLocale: true`
- [x] 2.2 Implement the `/` root redirect to `/en/` (Astro routing, with a Vercel rewrite as fallback)
- [x] 2.3 Create per-locale string dictionaries (`src/i18n/en.json`, `src/i18n/es.json`)
- [x] 2.4 Implement a `t(locale, key)` helper with fallback to the default locale for missing keys
- [x] 2.5 Implement locale resolution from the URL prefix and a URL-building helper for localized links
- [x] 2.6 Implement an `hreflang`/`x-default` alternate-link generator used by the head component

## 3. Site shell

- [x] 3.1 Create the shared base layout (`<head>`, header, `<main>`, footer) used by all pages
- [x] 3.2 Build the header primary navigation (home, blog, about) with localized labels and active-item state
- [x] 3.3 Build the language switcher that links to the equivalent page in the other locale
- [x] 3.4 Implement graceful fallback in the switcher when no translation exists (link to locale home)
- [x] 3.5 Build the localized footer (site name, copyright)

## 4. Content model

- [x] 4.1 Define the `blog` content collection with a folder-per-article structure
- [x] 4.2 Define the Zod frontmatter schema (`title`, `description`, `pubDate`, `locale`, `translationKey`, optional `slug`, `tags`, `draft`, `cover`)
- [x] 4.3 Validate `locale` against the supported set and apply defaults (e.g. `draft: false`)
- [x] 4.4 Implement translation-linkage helpers that resolve an article's counterpart via `translationKey`
- [x] 4.5 Implement slug/URL derivation (explicit `slug` overrides folder-name default)
- [x] 4.6 Add a sample bilingual article folder (`en.mdx` + `es.mdx`) to exercise the model

## 5. Pages

- [x] 5.1 Build the localized home page (intro + recent articles for the active locale)
- [x] 5.2 Build the localized about page
- [x] 5.3 Build the per-locale article index, ordered by `pubDate` desc and excluding drafts
- [x] 5.4 Build the dynamic article page route rendering MDX with localized date formatting
- [x] 5.5 Wire each article page to expose its translation URL to the language switcher

## 6. Discovery & SEO

- [x] 6.1 Implement per-locale RSS feeds (`/en/rss.xml`, `/es/rss.xml`) excluding drafts
- [x] 6.2 Configure `@astrojs/sitemap` with i18n options to emit localized alternates
- [x] 6.3 Build the shared SEO/head component (title, description, canonical, OG, Twitter, `og:locale`)
- [x] 6.4 Emit `hreflang` alternates (incl. `x-default`) on every page via the head component
- [x] 6.5 Ensure article pages surface publication metadata in SEO output

## 7. Verification

- [x] 7.1 Run `npm run build` and confirm `/en/`, `/es/`, about, index, article, RSS, and sitemap outputs exist
- [x] 7.2 Verify `/` redirects to `/en/` and the language switcher round-trips between equivalent pages
- [x] 7.3 Validate `hreflang`/canonical URLs and sitemap alternates against the built HTML
- [x] 7.4 Confirm draft articles are excluded from index and feeds
- [x] 7.5 Verify static deploy artifacts (`dist/`, `vercel.json`) are ready for Vercel; the live deploy + smoke-test is performed when the repo is connected to Vercel (manual step, branch not merged)
