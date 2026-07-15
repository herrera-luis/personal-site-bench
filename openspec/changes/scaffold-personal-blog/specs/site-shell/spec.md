## ADDED Requirements

### Requirement: Shared base layout

The site SHALL provide a single shared base layout that wraps every page with a consistent
document structure (html/head/body), a header, a main content region, and a footer, so that
all pages share the same chrome.

#### Scenario: Every page renders through the base layout

- **WHEN** any page (home, about, article listing, or article) is rendered
- **THEN** the output SHALL include the shared header, a `<main>` content region, and the
  shared footer from the base layout

#### Scenario: Locale is available to the shell

- **WHEN** a page for a given locale renders the base layout
- **THEN** the layout SHALL set the `<html lang>` attribute to that page's locale and expose
  the locale to header, footer, and language switcher

### Requirement: Primary navigation

The header SHALL present primary navigation linking to the current locale's home, about, and
articles pages, with links pointing at locale-prefixed URLs.

#### Scenario: Navigation links are locale-prefixed

- **WHEN** the header renders for locale `es`
- **THEN** the nav links SHALL target `/es/`, `/es/about/`, and `/es/articles/` (and the `en`
  equivalents when rendering for locale `en`)

#### Scenario: Active page is indicated

- **WHEN** the current page matches a navigation destination
- **THEN** that navigation item SHALL be marked as the current/active item (e.g.
  `aria-current="page"`)

### Requirement: Language switcher

The site SHALL provide a language switcher in the shell that lets the visitor move between the
English and Spanish versions of the current page while preserving the current page context.

#### Scenario: Switching locale preserves the page

- **WHEN** a visitor on `/en/about/` activates the language switcher for Spanish
- **THEN** the switcher SHALL link to `/es/about/`

#### Scenario: Switching an article preserves the translated article

- **WHEN** a visitor is on an article page and a translation exists in the other locale
- **THEN** the switcher SHALL link to that translated article's URL in the other locale

#### Scenario: Missing translation falls back gracefully

- **WHEN** a visitor is on a page that has no counterpart in the other locale
- **THEN** the switcher SHALL link to that other locale's home page rather than a broken URL

### Requirement: Footer

The shell SHALL render a footer that is consistent across all pages and localized to the
current locale.

#### Scenario: Footer text is localized

- **WHEN** the footer renders for a given locale
- **THEN** its text (e.g. copyright and any labels) SHALL use that locale's translations
