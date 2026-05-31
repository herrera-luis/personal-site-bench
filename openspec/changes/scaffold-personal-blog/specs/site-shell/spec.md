## ADDED Requirements

### Requirement: Shared site shell layout
The site SHALL provide a single shared base layout that wraps every page with a consistent
`<head>`, header, main content region, and footer, so all pages render with the same structure
and global styles.

#### Scenario: Every page uses the shared layout
- **WHEN** any page (home, about, article, or article index) is built and rendered
- **THEN** the output SHALL include the shared header and footer and the page content inside the
  shared `<main>` region

#### Scenario: Global head metadata is present
- **WHEN** a page is rendered
- **THEN** the document `<head>` SHALL include charset, viewport, the page `<title>`, and a
  favicon link supplied by the shared layout

### Requirement: Primary navigation
The site shell SHALL render a primary navigation menu in the header that links to the home, blog
(article index), and about pages of the currently active locale.

#### Scenario: Navigation links target the active locale
- **WHEN** a visitor is viewing a page under `/es/`
- **THEN** the header navigation links SHALL point to `/es/`, `/es/blog/`, and `/es/about/`

#### Scenario: Navigation labels are localized
- **WHEN** a page renders in a given locale
- **THEN** the navigation labels SHALL be displayed in that locale's language using the locale
  string dictionary

#### Scenario: Active page is indicated
- **WHEN** the current page matches a navigation item
- **THEN** that navigation item SHALL be marked as the active/current item (e.g. `aria-current`)

### Requirement: Language switcher
The site shell SHALL render a language switcher that lets the visitor switch between English and
Spanish while staying on the equivalent page in the target locale.

#### Scenario: Switching keeps the visitor on the equivalent page
- **WHEN** a visitor on `/en/blog/hello-world/` activates the Spanish option and a Spanish
  translation of that article exists
- **THEN** the switcher SHALL navigate to the Spanish equivalent (e.g. `/es/blog/hola-mundo/`)

#### Scenario: Missing translation falls back gracefully
- **WHEN** a visitor activates the other locale for a page that has no equivalent translation
- **THEN** the switcher SHALL link to the target locale's home page instead of producing a broken link

#### Scenario: Current locale is indicated in the switcher
- **WHEN** the language switcher is rendered
- **THEN** the currently active locale SHALL be visually and programmatically marked as selected

### Requirement: Footer
The site shell SHALL render a footer on every page containing localized site information such as
the site name and copyright.

#### Scenario: Footer renders localized content
- **WHEN** a page renders in a given locale
- **THEN** the footer SHALL display its text in that locale's language
