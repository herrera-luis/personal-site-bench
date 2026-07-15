## 1. Project foundation (Astro + MDX + Vercel static)

- [x] 1.1 Initialize an Astro project in the repo root with `package.json`, `astro.config.mjs`, and `tsconfig.json`
- [x] 1.2 Add dependencies: `astro`, `@astrojs/mdx`, `@astrojs/vercel`, `@astrojs/rss`, `@astrojs/sitemap`
- [x] 1.3 Configure `output: 'static'` and the Vercel static adapter in `astro.config.mjs`
- [x] 1.4 Enable the MDX integration in `astro.config.mjs`
- [x] 1.5 Set the absolute `site` URL in `astro.config.mjs` (used for canonical, RSS, sitemap)
- [x] 1.6 Verify a production build produces static output with no server runtime

## 2. i18n routing (en/es, prefixed locales, root redirect)

- [x] 2.1 Configure Astro i18n with `defaultLocale: 'en'`, `locales: ['en','es']`, and `prefixDefaultLocale: true`
- [x] 2.2 Create `src/pages/index.astro` (or i18n redirect config) so `/` redirects to `/en/`
- [x] 2.3 Create `src/i18n/ui.ts` with a per-locale UI-strings dictionary (nav labels, buttons, date locale)
- [x] 2.4 Create `src/i18n/utils.ts` with helpers: `getLangFromUrl`, `useTranslations`, `localizedPath`
- [x] 2.5 Verify `/en/` and `/es/` routes resolve and UI chrome renders in the active locale

## 3. Site shell (layout, header, nav, footer, language switcher, styles)

- [x] 3.1 Create `src/layouts/BaseLayout.astro` rendering the HTML skeleton, `<html lang>`, global styles, and head/body slots
- [x] 3.2 Create `src/components/Header.astro` with site title/home link and primary nav (Home, About, Blog) scoped to the active locale
- [x] 3.3 Create `src/components/Footer.astro`
- [x] 3.4 Create `src/components/LanguageSwitcher.astro` linking to the other-locale equivalent, falling back to that locale's home
- [x] 3.5 Add baseline global styles and design tokens (colors, typography, spacing)
- [x] 3.6 Verify header, footer, and language switcher appear on every page type

## 4. Content model (folder-per-article collection + schema)

- [x] 4.1 Create `src/content/config.ts` defining the `blog` collection with a Zod schema (title, description, `pubDate`, optional `updatedDate`, `lang`, `translationKey`, `tags`, `draft`, optional `heroImage`)
- [x] 4.2 Establish the folder-per-article convention under `src/content/blog/<article>/` co-locating MDX and assets
- [x] 4.3 Add example English and Spanish article folders sharing a `translationKey`
- [x] 4.4 Add a content query helper to fetch/sort/filter (by locale, non-draft, newest-first) and pair variants by `translationKey`
- [x] 4.5 Verify the build fails when required frontmatter is missing or mistyped

## 5. Content pages (home / about / article index / article)

- [x] 5.1 Create `src/pages/[lang]/index.astro` (home) with intro + recent articles for the locale
- [x] 5.2 Create `src/pages/[lang]/about.astro` (localized about page)
- [x] 5.3 Create `src/pages/[lang]/blog/index.astro` (article index) listing published articles newest-first
- [x] 5.4 Create `src/pages/[lang]/blog/[...slug].astro` generating article pages via `getStaticPaths` filtered by locale, excluding drafts
- [x] 5.5 Render article title, publication/updated dates, MDX body, and tags on the article page
- [x] 5.6 Verify all four page types build in both `en` and `es`

## 6. SEO, hreflang, RSS, and sitemap

- [x] 6.1 Create a shared SEO/head component setting title, description, canonical (absolute), and Open Graph / Twitter card tags
- [x] 6.2 Emit `hreflang` alternates (`en`, `es`, `x-default`) on every page, omitting locales with no equivalent
- [x] 6.3 Add article-specific metadata (published time, updated time, tags) to article pages
- [x] 6.4 Create per-locale RSS endpoints `src/pages/[lang]/rss.xml.ts` (or per-locale files) listing that locale's non-draft articles newest-first
- [x] 6.5 Configure `@astrojs/sitemap` with i18n so the sitemap includes both locales and `hreflang` links
- [x] 6.6 Verify `/en/rss.xml`, `/es/rss.xml`, canonical/hreflang tags, and the sitemap are correct

## 7. Verification and deployment readiness

- [x] 7.1 Run the full production build and confirm it succeeds with no errors
- [x] 7.2 Manually verify `/` redirects to `/en/` and both locales' pages render correctly
- [x] 7.3 Validate the built output is deployable to Vercel as a static site
