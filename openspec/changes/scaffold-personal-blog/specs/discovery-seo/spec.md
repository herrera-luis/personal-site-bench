## ADDED Requirements

### Requirement: Per-locale RSS feeds
The site SHALL generate one RSS feed per locale that contains only that locale's published articles.

#### Scenario: English feed lists only English articles
- **WHEN** the English feed at `/en/rss.xml` is built
- **THEN** it SHALL contain entries only for published English articles, each with title, link,
  description, and publication date

#### Scenario: Spanish feed lists only Spanish articles
- **WHEN** the Spanish feed at `/es/rss.xml` is built
- **THEN** it SHALL contain entries only for published Spanish articles

#### Scenario: Drafts excluded from feeds
- **WHEN** a feed is generated
- **THEN** articles marked `draft: true` SHALL NOT appear in the feed

### Requirement: Multilingual sitemap
The site SHALL generate a `sitemap.xml` covering all localized pages and declaring localized
alternates for translated pages.

#### Scenario: Sitemap includes both locales
- **WHEN** the sitemap is built
- **THEN** it SHALL include URLs for both the `/en/` and `/es/` pages of the site

#### Scenario: Sitemap declares localized alternates
- **WHEN** a page exists in both locales
- **THEN** the sitemap entry SHALL declare the alternate localized URLs for that page

### Requirement: Per-page SEO metadata
Every page SHALL emit SEO metadata including a unique title, description, canonical URL, and social
sharing tags appropriate to the active locale.

#### Scenario: Canonical and title are emitted
- **WHEN** any page is rendered
- **THEN** its `<head>` SHALL include a locale-aware `<title>`, a meta description, and a
  `<link rel="canonical">` with the page's absolute URL

#### Scenario: Open Graph and Twitter tags are emitted
- **WHEN** any page is rendered
- **THEN** its `<head>` SHALL include Open Graph (`og:title`, `og:description`, `og:url`,
  `og:locale`) and Twitter card meta tags

#### Scenario: Article pages expose publication metadata
- **WHEN** an article page is rendered
- **THEN** its SEO metadata SHALL reflect the article's title, description, and publication date
