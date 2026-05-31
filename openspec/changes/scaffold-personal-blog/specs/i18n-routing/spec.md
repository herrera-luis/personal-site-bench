## ADDED Requirements

### Requirement: URL-prefixed locales
The site SHALL serve all content under URL-prefixed locales, with English under `/en/` and Spanish
under `/es/`, including the default locale (no unprefixed default).

#### Scenario: English pages are served under /en/
- **WHEN** the home, about, and article-index pages are built for English
- **THEN** they SHALL be available at `/en/`, `/en/about/`, and `/en/blog/` respectively

#### Scenario: Spanish pages are served under /es/
- **WHEN** the home, about, and article-index pages are built for Spanish
- **THEN** they SHALL be available at `/es/`, `/es/about/`, and `/es/blog/` respectively

### Requirement: Root redirect to default locale
The site SHALL redirect the bare root URL `/` to the default locale home page so visitors landing
on the root are routed to a localized page.

#### Scenario: Root redirects to the default locale
- **WHEN** a visitor requests `/`
- **THEN** the site SHALL redirect them to `/en/`

### Requirement: Locale resolution and string lookup
The site SHALL resolve the active locale from the URL prefix and provide a translation lookup so
UI strings are rendered in the active locale's language.

#### Scenario: Active locale derived from URL
- **WHEN** a page under `/es/` is rendered
- **THEN** the active locale SHALL resolve to `es` and UI strings SHALL be looked up from the
  Spanish dictionary

#### Scenario: Unknown or missing key falls back to default locale
- **WHEN** a translation key is missing for the active locale
- **THEN** the lookup SHALL fall back to the default locale's value rather than rendering an empty
  string

### Requirement: hreflang alternate links
Each page SHALL declare `hreflang` alternate links for every available locale plus an `x-default`,
so search engines can associate the localized variants.

#### Scenario: Page emits hreflang for each locale and x-default
- **WHEN** a page that exists in both locales is rendered
- **THEN** its `<head>` SHALL include `<link rel="alternate" hreflang="en" ...>`,
  `<link rel="alternate" hreflang="es" ...>`, and `<link rel="alternate" hreflang="x-default" ...>`
  with absolute URLs

#### Scenario: x-default points to the default locale
- **WHEN** the `x-default` alternate is emitted
- **THEN** its URL SHALL point to the default locale (`en`) variant of the page
