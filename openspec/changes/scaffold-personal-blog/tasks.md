## 1. Project Scaffold and Static Build

- [x] 1.1 Scaffold an Astro project in the greenfield repository without introducing server-side runtime requirements.
- [x] 1.2 Add MDX support and configure TypeScript/build scripts needed for a static production build.
- [x] 1.3 Configure Vercel-compatible static deployment settings and verify the build output directory.
- [x] 1.4 Add baseline formatting, linting, and type-check commands consistent with the Astro project setup.

## 2. Internationalization Foundation

- [x] 2.1 Define supported locales (`en`, `es`), the default locale, localized route labels, and shared URL builders.
- [x] 2.2 Implement URL-prefixed locale routing for `/en/...` and `/es/...` pages.
- [x] 2.3 Configure root `/` redirect behavior to the default locale.
- [x] 2.4 Implement unsupported-locale handling through static not-found or redirect behavior.
- [x] 2.5 Add helpers for localized canonical URLs and `hreflang` alternate metadata.

## 3. Site Shell, Navigation, and Language Switcher

- [x] 3.1 Build the shared layout/site shell with accessible header, main content, footer, and skip-link structure.
- [x] 3.2 Add localized navigation labels and links for home, about, and articles in English and Spanish.
- [x] 3.3 Implement the language switcher for equivalent localized routes.
- [x] 3.4 Implement fallback switcher behavior when an article translation is unavailable.
- [x] 3.5 Verify keyboard navigation and accessible names for shell controls.

## 4. Content Model and MDX Collections

- [x] 4.1 Define the folder-per-article structure under the Astro content directory.
- [x] 4.2 Configure content collection schema validation for required localized article frontmatter.
- [x] 4.3 Implement utilities to group localized MDX files by article folder slug and detect translation availability.
- [x] 4.4 Add initial sample English and Spanish MDX content sufficient to verify routing, metadata, and feeds.
- [x] 4.5 Ensure draft localized article files are excluded from production pages, feeds, and sitemap output.

## 5. Localized Pages

- [x] 5.1 Implement localized home pages at `/en/` and `/es/` with recent article links.
- [x] 5.2 Implement localized about pages at `/en/about/` and `/es/about/`.
- [x] 5.3 Implement localized article index pages at `/en/articles/` and `/es/articles/`.
- [x] 5.4 Implement localized article detail pages at `/en/articles/[slug]/` and `/es/articles/[slug]/`.
- [x] 5.5 Add route generation tests or build-time checks for pages with complete and missing translations.

## 6. SEO, RSS, and Sitemap

- [x] 6.1 Implement shared SEO metadata helpers for localized titles, descriptions, canonical URLs, Open Graph, and social card tags.
- [x] 6.2 Add `hreflang` alternates on localized pages only for translations that exist.
- [x] 6.3 Generate per-locale RSS feeds for published English and Spanish articles.
- [x] 6.4 Generate a sitemap containing localized pages and published localized article URLs.
- [x] 6.5 Verify draft content is absent from RSS feeds and sitemap output.

## 7. Validation and Deployment Readiness

- [x] 7.1 Run formatting, linting, type checking, and the Astro production build locally.
- [x] 7.2 Inspect generated `/en` and `/es` routes, root redirect behavior, and unsupported-locale behavior.
- [x] 7.3 Validate generated RSS XML and sitemap XML for expected localized URLs.
- [x] 7.4 Confirm Vercel deployment configuration uses static output and does not require server runtime settings.
- [x] 7.5 Document implementation conventions for future article authoring and translation workflow.
