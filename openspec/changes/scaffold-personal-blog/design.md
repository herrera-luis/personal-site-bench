## Context

The target repository, `herrera-luis/personal-site-bench`, is effectively empty and contains only repository hygiene files and a README indicating no implementation exists. The proposed product is a personal website/blog that must be bilingual in English and Spanish, generated statically, and deployable to Vercel. Because the repository is greenfield, the design can establish conventions for routing, content organization, metadata, and build outputs before implementation begins.

## Goals / Non-Goals

**Goals:**

- Use Astro as the static site framework and MDX for authored article content.
- Serve all user-facing pages under URL-prefixed locales: `/en/...` and `/es/...`.
- Provide a consistent site shell with localized navigation and a language switcher.
- Support localized home, about, article index, and article detail pages.
- Use a folder-per-article content model that keeps translations grouped and easy to audit.
- Generate per-locale RSS feeds, a sitemap, canonical URLs, `hreflang` alternates, and localized SEO/social metadata.
- Keep the implementation compatible with Vercel static deployment.

**Non-Goals:**

- Implementing site code as part of this planning change.
- Adding dynamic server-side rendering, databases, comments, authentication, search indexing, analytics, or CMS integration.
- Requiring perfect translation parity for every article at launch beyond metadata that allows missing translations to be handled predictably.
- Designing a visual brand system in detail beyond structural shell and accessibility expectations.

## Decisions

1. **Astro static output with Vercel deployment**
   - Decision: Implement the future site as an Astro project configured for static output, with Vercel running the build and serving generated assets.
   - Rationale: Astro is optimized for content-heavy static sites, supports MDX and content collections, and deploys cleanly to Vercel without requiring a runtime server.
   - Alternatives considered: Next.js static export, Eleventy, and plain Vite. Next.js adds unnecessary framework/runtime complexity for this scope; Eleventy is strong for static content but lacks Astro's component ecosystem and first-class island architecture; plain Vite would require too much custom routing/content plumbing.

2. **URL-prefixed locale routing for all public content**
   - Decision: Use `/en` and `/es` as the only canonical locale roots, and redirect `/` to a default locale.
   - Rationale: Prefixes make localized URLs explicit, cacheable, search-engine friendly, and easy to map in static output. They also avoid ambiguity between language variants.
   - Alternatives considered: Subdomains and unprefixed default-locale routes. Subdomains complicate deployment for a personal site; unprefixed default locale creates asymmetric URLs and harder `hreflang` management.

3. **Locale-aware routing helpers and metadata generation**
   - Decision: Centralize supported locales, default locale, route labels, path builders, canonical URL builders, and alternate-language metadata in shared utilities during implementation.
   - Rationale: Central helpers reduce drift between navigation, page generation, RSS, sitemap, and SEO tags.
   - Alternatives considered: Hard-coding paths directly in page components. That approach is faster initially but creates higher risk of inconsistent links and missing alternates.

4. **Folder-per-article MDX content model**
   - Decision: Store each article in its own folder with one MDX file per locale, such as `src/content/articles/<slug>/en.mdx` and `src/content/articles/<slug>/es.mdx`, plus frontmatter in each localized file.
   - Rationale: Grouping translations by article makes it obvious which locales exist, keeps media colocated with the article, and allows localized titles/descriptions while sharing a stable cross-locale slug.
   - Alternatives considered: Separate `en` and `es` content trees or one MDX file containing both languages. Separate trees make translation parity harder to review; a single bilingual file makes editing and metadata validation less clean.

5. **Localized RSS and sitemap generation at build time**
   - Decision: Generate `/en/rss.xml` and `/es/rss.xml` independently, and generate a sitemap containing localized page URLs with alternate links where supported.
   - Rationale: Feed subscribers and search engines should receive the correct language-specific titles, descriptions, and URLs.
   - Alternatives considered: A single mixed-language feed. A mixed feed is less useful for subscribers and weakens language targeting.

6. **Graceful translation handling**
   - Decision: Article pages must only link to a translation when the corresponding localized MDX file exists; otherwise the language switcher should route to the nearest localized equivalent, such as the locale article index.
   - Rationale: This prevents broken links while allowing publishing cadence to differ by language.
   - Alternatives considered: Requiring every article to be translated before publication. That is simpler for routing but creates unnecessary publishing friction.

## Risks / Trade-offs

- **Risk: Translation drift between English and Spanish content** → Mitigation: Use folder-per-article grouping, required frontmatter, and content validation to make missing translations visible during review.
- **Risk: Duplicate or incorrect SEO metadata** → Mitigation: Generate canonical and `hreflang` metadata through centralized helpers instead of duplicating tags by page.
- **Risk: Root redirect behavior is inconsistent between local development and Vercel** → Mitigation: Prefer static redirect configuration compatible with Vercel and verify generated routes during build validation.
- **Risk: Static-only deployment limits dynamic features** → Mitigation: Treat dynamic features such as comments, search, and newsletter signup as future enhancements outside this scope.
- **Risk: Content collections may not naturally support nested locale files in the desired shape** → Mitigation: Define explicit schema conventions and helper functions to normalize article folder, slug, locale, and translation availability.

## Migration Plan

1. Scaffold the Astro project in the greenfield repository without preserving any existing site implementation.
2. Add MDX/content collection support, localized route generation, and static build scripts.
3. Add the site shell, pages, content fixtures, SEO helpers, RSS generation, sitemap generation, and Vercel configuration.
4. Validate locally with formatting, type checking, Astro build, generated-route inspection, feed validation, and sitemap inspection.
5. Deploy through Vercel as a static site.

Rollback is simple before launch because no production site exists: revert the implementation commits and remove generated deployment configuration if necessary.

## Open Questions

- What production domain should be used for canonical URLs before the first deployment?
- Should `/` redirect to `/en/` unconditionally, or should future implementation consider browser language negotiation where compatible with static/Vercel redirects?
- What initial personal biography, social links, and starter articles should be included when implementation begins?
