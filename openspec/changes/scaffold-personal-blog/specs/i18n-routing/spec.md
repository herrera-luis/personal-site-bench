## ADDED Requirements

### Requirement: URL-prefixed locales

The site SHALL support English (`en`, the default) and Spanish (`es`) using Astro i18n routing
with URL-prefixed locales, such that every localized route is prefixed with its locale segment
(`/en/...` and `/es/...`), including the default locale.

#### Scenario: English routes are prefixed

- **WHEN** the English home and about pages are built
- **THEN** they are served at `/en/` and `/en/about/` respectively

#### Scenario: Spanish routes are prefixed

- **WHEN** the Spanish home and about pages are built
- **THEN** they are served at `/es/` and `/es/about/` respectively

### Requirement: Root redirect to default locale

The site SHALL redirect the bare root path (`/`) to the default locale's home page (`/en/`).

#### Scenario: Visiting the root

- **WHEN** a visitor requests `/`
- **THEN** they are redirected to `/en/`

### Requirement: hreflang alternates on every page

Every page SHALL emit `hreflang` alternate link tags for each locale in which an equivalent of
that page exists, plus an `hreflang="x-default"` alternate pointing to the English equivalent.
When a page has no equivalent in a given locale, that locale's alternate MUST be omitted rather
than pointing to a non-existent URL.

#### Scenario: Page with both locale variants

- **WHEN** a page that exists in both English and Spanish is rendered
- **THEN** its `<head>` includes `hreflang="en"`, `hreflang="es"`, and `hreflang="x-default"`
  alternate links pointing at the correct absolute URLs

#### Scenario: Page missing a translation

- **WHEN** an article exists only in English
- **THEN** the rendered English page does not emit an `hreflang="es"` alternate

### Requirement: Locale-aware URL and translation helpers

The site SHALL provide helpers to detect the active locale from the URL, build locale-prefixed
paths, and look up translated UI strings from a per-locale dictionary. UI chrome (navigation
labels, buttons, dates) MUST render in the active locale.

#### Scenario: UI chrome renders in the active locale

- **WHEN** a page is viewed under `/es/`
- **THEN** navigation labels and other UI chrome strings render in Spanish

#### Scenario: Locale detected from URL

- **WHEN** the active locale is derived from a URL beginning with `/en/` or `/es/`
- **THEN** the helper returns `en` or `es` accordingly
