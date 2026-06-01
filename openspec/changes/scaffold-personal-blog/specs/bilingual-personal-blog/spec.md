## ADDED Requirements

### Requirement: Static Astro MDX site scaffold

The system SHALL be planned as a static Astro website using MDX for long-form article content and SHALL be deployable on Vercel without requiring a runtime server, database, or server-side rendering.

#### Scenario: Static production build

- **WHEN** the future implementation is built for production
- **THEN** the build MUST emit static assets and HTML suitable for Vercel static hosting.

#### Scenario: MDX article rendering

- **WHEN** an article is authored as MDX with valid frontmatter
- **THEN** the site MUST render the article as a localized static article page.

### Requirement: Localized site shell and navigation

The system SHALL provide a shared site shell with localized navigation labels, accessible landmark structure, and a language switcher on all public pages.

#### Scenario: English navigation

- **WHEN** a visitor opens a page under `/en`
- **THEN** the shell MUST display English navigation labels and links to English routes.

#### Scenario: Spanish navigation

- **WHEN** a visitor opens a page under `/es`
- **THEN** the shell MUST display Spanish navigation labels and links to Spanish routes.

#### Scenario: Language switcher target exists

- **WHEN** a visitor uses the language switcher on a page whose equivalent exists in the other locale
- **THEN** the switcher MUST link to the equivalent route in the other locale.

#### Scenario: Language switcher target missing

- **WHEN** a visitor uses the language switcher on an article without an available translation
- **THEN** the switcher MUST avoid broken links and route to an appropriate fallback for the selected locale, such as that locale's article index.

### Requirement: URL-prefixed bilingual routing

The system SHALL expose canonical localized routes under `/en` and `/es`, SHALL redirect the root path `/` to a default locale, and SHALL reject or handle unsupported locale prefixes predictably.

#### Scenario: Root redirect

- **WHEN** a visitor requests `/`
- **THEN** the site MUST redirect to the configured default locale root.

#### Scenario: English route prefix

- **WHEN** a visitor requests English content
- **THEN** the canonical URL MUST begin with `/en`.

#### Scenario: Spanish route prefix

- **WHEN** a visitor requests Spanish content
- **THEN** the canonical URL MUST begin with `/es`.

#### Scenario: Unsupported locale prefix

- **WHEN** a visitor requests content under an unsupported locale prefix
- **THEN** the site MUST not serve it as canonical content and MUST return an appropriate static not-found or redirect response.

### Requirement: Hreflang and canonical metadata

The system SHALL emit locale-aware canonical URLs and `hreflang` alternates for localized pages where alternate translations exist.

#### Scenario: Page has both locales

- **WHEN** a localized page has both English and Spanish equivalents
- **THEN** the page MUST include canonical metadata for the current URL and `hreflang` links for both `en` and `es` variants.

#### Scenario: Page has one locale

- **WHEN** a localized article exists in only one locale
- **THEN** the page MUST include canonical metadata for the current URL and MUST NOT advertise a missing translation as an alternate.

### Requirement: Localized home pages

The system SHALL provide localized home pages for English and Spanish that introduce the person, highlight recent articles, and link to the about page and article index in the active locale.

#### Scenario: English home page

- **WHEN** a visitor opens `/en/`
- **THEN** the page MUST show English introductory content, localized calls to action, and recent English article links.

#### Scenario: Spanish home page

- **WHEN** a visitor opens `/es/`
- **THEN** the page MUST show Spanish introductory content, localized calls to action, and recent Spanish article links.

### Requirement: Localized about pages

The system SHALL provide localized about pages that present biography, professional context, and relevant personal/social links in the active locale.

#### Scenario: English about page

- **WHEN** a visitor opens `/en/about/`
- **THEN** the page MUST render English about content and English metadata.

#### Scenario: Spanish about page

- **WHEN** a visitor opens `/es/about/`
- **THEN** the page MUST render Spanish about content and Spanish metadata.

### Requirement: Localized article index pages

The system SHALL provide article listing pages for each locale that include only articles available in that locale, ordered by publication date, with localized titles, descriptions, dates, and links.

#### Scenario: English article index

- **WHEN** a visitor opens `/en/articles/`
- **THEN** the page MUST list English article entries and link to English article detail routes.

#### Scenario: Spanish article index

- **WHEN** a visitor opens `/es/articles/`
- **THEN** the page MUST list Spanish article entries and link to Spanish article detail routes.

#### Scenario: Article missing in active locale

- **WHEN** an article does not have content for the active locale
- **THEN** that article MUST be omitted from that locale's article index.

### Requirement: Folder-per-article content model

The system SHALL use a folder-per-article content model where each article has a stable folder slug and one localized MDX file per available locale.

#### Scenario: Article folder contains both translations

- **WHEN** an article folder contains `en.mdx` and `es.mdx`
- **THEN** the site MUST generate English and Spanish article pages associated as translations of the same article.

#### Scenario: Article folder contains one translation

- **WHEN** an article folder contains only one supported locale MDX file
- **THEN** the site MUST generate only that locale's article page and MUST treat the other locale as unavailable.

#### Scenario: Article frontmatter validation

- **WHEN** an article MDX file is processed
- **THEN** required frontmatter such as title, description, publication date, locale, and draft status MUST be validated before publication.

### Requirement: Localized article detail pages

The system SHALL generate localized article detail pages from MDX content using the article folder slug and active locale prefix.

#### Scenario: English article detail

- **WHEN** an English article exists for slug `example-post`
- **THEN** the site MUST generate `/en/articles/example-post/` with English content and metadata.

#### Scenario: Spanish article detail

- **WHEN** a Spanish article exists for slug `example-post`
- **THEN** the site MUST generate `/es/articles/example-post/` with Spanish content and metadata.

#### Scenario: Draft article exclusion

- **WHEN** an article locale file is marked as draft for production
- **THEN** the site MUST exclude that localized article from production pages, feeds, and sitemap output.

### Requirement: Per-locale RSS feeds

The system SHALL generate separate RSS feeds for English and Spanish articles with localized feed metadata and article entries.

#### Scenario: English RSS feed

- **WHEN** the site is built
- **THEN** it MUST generate an English RSS feed containing only published English articles.

#### Scenario: Spanish RSS feed

- **WHEN** the site is built
- **THEN** it MUST generate a Spanish RSS feed containing only published Spanish articles.

### Requirement: Sitemap generation

The system SHALL generate a sitemap for all published localized pages and articles, including localized URL alternates when available.

#### Scenario: Published localized pages included

- **WHEN** the sitemap is generated
- **THEN** it MUST include localized home, about, article index, and published article detail URLs.

#### Scenario: Draft content excluded from sitemap

- **WHEN** article content is marked as draft for production
- **THEN** its localized URL MUST be excluded from the sitemap.

### Requirement: Localized SEO and social metadata

The system SHALL provide localized titles, descriptions, Open Graph metadata, and Twitter/social card metadata for home, about, article index, and article detail pages.

#### Scenario: Localized metadata on English page

- **WHEN** a visitor or crawler loads an English page
- **THEN** metadata MUST use English title and description content with the English canonical URL.

#### Scenario: Localized metadata on Spanish page

- **WHEN** a visitor or crawler loads a Spanish page
- **THEN** metadata MUST use Spanish title and description content with the Spanish canonical URL.

#### Scenario: Article social preview

- **WHEN** a visitor shares an article URL
- **THEN** the page MUST expose article-specific social metadata derived from the localized article frontmatter.
