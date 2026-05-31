## ADDED Requirements

### Requirement: Localized home page
The site SHALL provide a home page per locale that introduces the site and lists the most recent
articles for that locale.

#### Scenario: Home page lists recent articles for its locale
- **WHEN** the English home page at `/en/` is rendered
- **THEN** it SHALL display an introduction and a list of the most recent English articles, each
  linking to its article page

#### Scenario: Home page shows only its locale's articles
- **WHEN** the Spanish home page at `/es/` is rendered
- **THEN** the recent-articles list SHALL contain only Spanish articles

### Requirement: Localized about page
The site SHALL provide an about page per locale with localized biographical/site content.

#### Scenario: About page renders in its locale
- **WHEN** a visitor opens `/es/about/`
- **THEN** the page SHALL render the about content in Spanish using the shared site shell

### Requirement: Article index page
The site SHALL provide an article index (blog listing) page per locale that lists that locale's
articles ordered by publication date, newest first.

#### Scenario: Index lists locale articles newest first
- **WHEN** the English article index at `/en/blog/` is rendered
- **THEN** it SHALL list all published English articles ordered by `pubDate` descending, each
  linking to its article page

#### Scenario: Draft articles are excluded
- **WHEN** the article index is built
- **THEN** articles marked `draft: true` SHALL NOT appear in the listing

### Requirement: Article page
The site SHALL render an individual article page per article per locale that displays the article's
title, publication date, and MDX body content within the shared site shell.

#### Scenario: Article page renders MDX content
- **WHEN** a visitor opens `/en/blog/hello-world/`
- **THEN** the page SHALL render the article's title, formatted publication date, and the compiled
  MDX body

#### Scenario: Article page exposes its translation to the language switcher
- **WHEN** an article that has a translation in the other locale is rendered
- **THEN** the page SHALL provide the equivalent translation's URL so the language switcher can
  link to it

#### Scenario: Localized date formatting
- **WHEN** an article page renders its publication date
- **THEN** the date SHALL be formatted according to the active locale's conventions
