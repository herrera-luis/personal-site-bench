## ADDED Requirements

### Requirement: Localized home page

The site SHALL provide a home page for each locale at `/[locale]/` that introduces the site
owner and links to recent articles, using the active locale's translations.

#### Scenario: Home page renders per locale

- **WHEN** a visitor requests `/en/` or `/es/`
- **THEN** the site SHALL render a home page whose chrome and copy are in the requested locale

#### Scenario: Home page lists recent articles

- **WHEN** the home page renders for a locale
- **THEN** it SHALL list that locale's most recent non-draft articles with links to their
  article pages

### Requirement: Localized about page

The site SHALL provide an about page for each locale at `/[locale]/about/`.

#### Scenario: About page renders per locale

- **WHEN** a visitor requests `/en/about/` or `/es/about/`
- **THEN** the site SHALL render an about page in the requested locale

### Requirement: Article listing page

The site SHALL provide an article listing (index) page for each locale at
`/[locale]/articles/` that lists that locale's published articles ordered by publication date
(newest first).

#### Scenario: Listing shows only the locale's articles

- **WHEN** a visitor requests `/es/articles/`
- **THEN** only Spanish articles SHALL be listed, ordered newest first

#### Scenario: Draft articles are excluded from production listing

- **WHEN** the article listing is built for production and an article is marked `draft: true`
- **THEN** that article SHALL NOT appear in the listing

### Requirement: Article page

The site SHALL render an article page for each published article at
`/[locale]/articles/[slug]/`, generated from the content collection filtered by locale, and
SHALL display its title, publication date, and rendered MDX body.

#### Scenario: Article page is generated per locale and slug

- **WHEN** the site builds
- **THEN** it SHALL generate one static article page per published article at
  `/[locale]/articles/[slug]/`

#### Scenario: Article renders its metadata and body

- **WHEN** an article page renders
- **THEN** it SHALL display the article title, its publication date formatted for the locale,
  and the article's rendered MDX content

### Requirement: Folder-per-article content model

Articles SHALL use a folder-per-article content model in which each article is a directory,
scoped by locale, containing its MDX body file and any co-located assets, managed as a typed
Astro content collection.

#### Scenario: Article body and assets are co-located

- **WHEN** an author adds an article
- **THEN** the article SHALL live in its own folder under its locale (e.g.
  `articles/en/<slug>/`) holding the MDX body and its images/assets

#### Scenario: Frontmatter is schema-validated

- **WHEN** the site builds and an article's frontmatter is missing a required field (title,
  description, publication date, or the cross-locale translation key) or has an invalid type
- **THEN** the build SHALL fail with a validation error

#### Scenario: Translations are linkable across locales

- **WHEN** an article defines a cross-locale translation key shared with its counterpart in the
  other locale
- **THEN** the system SHALL be able to resolve one locale's article to the other locale's
  equivalent via that key
