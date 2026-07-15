## ADDED Requirements

### Requirement: Per-locale RSS feeds

The site SHALL publish a separate RSS feed for each locale (`/en/rss.xml` and `/es/rss.xml`).
Each feed MUST list that locale's published (non-draft) articles with title, description,
publication date, and an absolute link, ordered newest first.

#### Scenario: English feed lists English articles

- **WHEN** `/en/rss.xml` is requested
- **THEN** it returns a valid RSS document containing only English published articles with
  absolute links, newest first

#### Scenario: Spanish feed lists Spanish articles

- **WHEN** `/es/rss.xml` is requested
- **THEN** it returns a valid RSS document containing only Spanish published articles with
  absolute links, newest first

#### Scenario: Drafts excluded from feeds

- **WHEN** an article is marked `draft: true`
- **THEN** it does not appear in any RSS feed

### Requirement: Sitemap covering all localized routes

The site SHALL generate a sitemap that includes all localized routes for both locales and MUST
include `hreflang` alternate references between equivalent localized pages.

#### Scenario: Sitemap includes both locales

- **WHEN** the sitemap is generated
- **THEN** it lists routes under both `/en/` and `/es/` and includes `hreflang` alternate
  links between equivalent pages

### Requirement: Per-page SEO metadata

Every page SHALL emit SEO metadata including a localized `<title>` and description, a
self-referential canonical URL (absolute), and Open Graph / Twitter card tags. Article pages
MUST additionally emit article-specific metadata (published time, updated time when present,
and tags).

#### Scenario: Canonical and social metadata on every page

- **WHEN** any page is rendered
- **THEN** its `<head>` includes a title, description, an absolute self-referential canonical
  link, and Open Graph / Twitter card tags

#### Scenario: Article-specific metadata

- **WHEN** an article page is rendered
- **THEN** it additionally emits article metadata including published time, updated time when
  present, and tags
