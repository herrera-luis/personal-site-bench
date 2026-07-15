## ADDED Requirements

### Requirement: URL-prefixed locales

The site SHALL support exactly two locales, English (`en`) and Spanish (`es`), and SHALL serve
every localized page under a locale URL prefix (`/en/…` and `/es/…`), including the default
locale.

#### Scenario: English pages are served under /en/

- **WHEN** a visitor requests the English home page
- **THEN** it SHALL be served at `/en/`

#### Scenario: Spanish pages are served under /es/

- **WHEN** a visitor requests the Spanish home page
- **THEN** it SHALL be served at `/es/`

#### Scenario: Default locale is also prefixed

- **WHEN** the site builds pages for the default locale (`en`)
- **THEN** those pages SHALL use the `/en/` prefix and SHALL NOT be served at unprefixed paths

### Requirement: Root redirect to default locale

Requests to the site root (`/`) SHALL redirect to the default locale's home page (`/en/`).

#### Scenario: Root redirects to default locale

- **WHEN** a visitor requests `/`
- **THEN** the site SHALL redirect them to `/en/`

#### Scenario: Redirect works on static hosting

- **WHEN** the site is deployed as static output to Vercel
- **THEN** the `/` → `/en/` redirect SHALL be produced by the static build (no server runtime
  required)

### Requirement: Localized UI strings

The site SHALL resolve user-interface strings (navigation labels, language switcher, footer,
and other chrome) from a per-locale translation dictionary.

#### Scenario: Strings resolve for the active locale

- **WHEN** a page renders for locale `es`
- **THEN** all UI chrome strings SHALL be taken from the Spanish dictionary

#### Scenario: Both locales define the same keys

- **WHEN** the translation dictionaries are validated
- **THEN** the `en` and `es` dictionaries SHALL define the same set of keys so no string is
  missing in either locale

### Requirement: hreflang alternates

Every localized page SHALL declare `hreflang` alternate links pointing to its equivalents in
each supported locale, plus an `x-default` alternate pointing to the default locale.

#### Scenario: A page lists all locale alternates

- **WHEN** any localized page is rendered
- **THEN** its head SHALL include one `<link rel="alternate" hreflang="…">` for `en` and one
  for `es`, each with an absolute URL

#### Scenario: x-default points to the default locale

- **WHEN** a page's alternates are rendered
- **THEN** an `<link rel="alternate" hreflang="x-default">` SHALL point to the default-locale
  (`en`) equivalent
