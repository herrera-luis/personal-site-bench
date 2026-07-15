## ADDED Requirements

### Requirement: Per-page SEO metadata

Every page SHALL emit SEO metadata including a page title, meta description, a canonical URL,
and Open Graph / Twitter card tags, driven by the page's locale and content.

#### Scenario: Canonical URL is absolute and locale-correct

- **WHEN** any page renders
- **THEN** its head SHALL include a `<link rel="canonical">` with the absolute URL of that
  page in its own locale

#### Scenario: Open Graph tags are present

- **WHEN** any page renders
- **THEN** its head SHALL include Open Graph tags (at least `og:title`, `og:description`,
  `og:url`, and `og:type`) reflecting the page content

#### Scenario: Article pages expose article metadata

- **WHEN** an article page renders
- **THEN** its metadata SHALL use the article's title and description and set an article-type
  Open Graph type with the publication date

### Requirement: Per-locale RSS feed

The site SHALL publish an RSS feed for each locale at `/[locale]/rss.xml` listing that locale's
published (non-draft) articles.

#### Scenario: Each locale has its own feed

- **WHEN** the site builds
- **THEN** it SHALL produce `/en/rss.xml` and `/es/rss.xml`

#### Scenario: Feed contains only that locale's published articles

- **WHEN** the Spanish RSS feed is generated
- **THEN** it SHALL include only Spanish non-draft articles, each with title, link (absolute
  URL), description, and publication date

### Requirement: Multilingual sitemap

The site SHALL generate a sitemap that includes every localized page URL, and SHALL express
the locale alternates for each URL.

#### Scenario: Sitemap covers all localized URLs

- **WHEN** the site builds
- **THEN** the generated sitemap SHALL include the `en` and `es` URLs for the home, about,
  article listing, and every published article page

#### Scenario: Sitemap declares locale alternates

- **WHEN** the sitemap lists a URL that has a counterpart in the other locale
- **THEN** the entry SHALL include `hreflang` alternate links to the equivalent URLs in each
  locale
