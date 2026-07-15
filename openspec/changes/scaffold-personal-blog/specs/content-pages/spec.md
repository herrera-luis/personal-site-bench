## ADDED Requirements

### Requirement: Home page per locale

The site SHALL provide a home page for each locale at the locale root (`/en/` and `/es/`) that
introduces the site owner and surfaces a list of recent articles for that locale, with links
to each article and to the full article index.

#### Scenario: English home page

- **WHEN** a visitor opens `/en/`
- **THEN** they see an English introduction and a list of recent English articles, each
  linking to its article page

#### Scenario: Spanish home page

- **WHEN** a visitor opens `/es/`
- **THEN** they see a Spanish introduction and a list of recent Spanish articles, each
  linking to its article page

### Requirement: About page per locale

The site SHALL provide an About page for each locale at `/en/about/` and `/es/about/` with
localized biography content.

#### Scenario: About page exists in both locales

- **WHEN** a visitor opens `/en/about/` or `/es/about/`
- **THEN** the corresponding localized About page renders within the site shell

### Requirement: Article index (blog listing) per locale

The site SHALL provide an article index page per locale at `/en/blog/` and `/es/blog/` that
lists that locale's published (non-draft) articles ordered by publication date, newest first,
each linking to its individual article page.

#### Scenario: Listing shows the locale's published articles newest-first

- **WHEN** a visitor opens `/es/blog/`
- **THEN** they see the Spanish published articles listed from newest to oldest, each linking
  to its article page

#### Scenario: Drafts are excluded from the listing

- **WHEN** an article is marked `draft: true`
- **THEN** it does not appear in the article index

### Requirement: Individual article page per locale

The site SHALL render each published article as its own page under the locale's `blog` path
(`/{lang}/blog/{slug}/`), showing the article's title, publication date (and updated date when
present), rendered MDX body, and tags. Article pages MUST be generated from the content
collection filtered by locale.

#### Scenario: Rendering a published article

- **WHEN** a visitor opens a published article URL such as `/en/blog/my-first-post/`
- **THEN** the article's title, publication date, rendered MDX body, and tags are displayed
  within the site shell

#### Scenario: Draft articles are not published as pages

- **WHEN** the site is built
- **THEN** articles marked `draft: true` do not generate a public article page
