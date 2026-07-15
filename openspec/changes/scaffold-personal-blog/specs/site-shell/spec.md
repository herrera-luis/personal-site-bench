## ADDED Requirements

### Requirement: Astro + MDX static project deployable to Vercel

The site SHALL be built with Astro configured for static output (`output: 'static'`), MUST
enable the MDX integration for authoring content, and MUST be configured to deploy to Vercel
as a static site using the Vercel static adapter. The project MUST declare an absolute `site`
URL so canonical, RSS, and sitemap URLs are absolute.

#### Scenario: Static build succeeds

- **WHEN** the production build command is run
- **THEN** Astro emits a fully static site (HTML/CSS/JS, no server runtime) into the build
  output directory
- **AND** the build completes without requiring a server or database

#### Scenario: MDX articles render

- **WHEN** an article authored in `.mdx` is built
- **THEN** its Markdown and any embedded components render to static HTML

#### Scenario: Vercel static deployment target configured

- **WHEN** the project is deployed to Vercel
- **THEN** the Vercel static adapter serves the pre-rendered output with no serverless
  functions required

### Requirement: Shared base layout

The site SHALL provide a reusable base layout applied to every page that renders the HTML
document skeleton, includes global styles, sets `<html lang>` to the active locale, and
exposes slots for page-specific `<head>` metadata and body content.

#### Scenario: Page uses the base layout

- **WHEN** any page is rendered
- **THEN** it is wrapped in the shared base layout with a valid HTML document, global styles
  applied, and `<html lang>` equal to the active locale (`en` or `es`)

### Requirement: Global header with primary navigation

The site SHALL render a global header on every page containing the site title/home link and a
primary navigation menu with links to Home, About, and the article index (Blog). All
navigation links MUST point to routes within the active locale.

#### Scenario: Navigation links stay within the active locale

- **WHEN** a visitor is viewing a page in Spanish (`/es/...`)
- **THEN** the header's Home, About, and Blog links all point to `/es/...` routes

#### Scenario: Navigation present on every page

- **WHEN** any page type (home, about, article index, article) is rendered
- **THEN** the global header with primary navigation is present

### Requirement: Global footer

The site SHALL render a global footer on every page.

#### Scenario: Footer present on every page

- **WHEN** any page is rendered
- **THEN** the global footer is present

### Requirement: Language switcher

The site SHALL render a language switcher in the site chrome that lets the visitor switch
between English and Spanish. When viewing a page that has an equivalent in the other locale,
the switcher MUST link directly to that equivalent; when no direct equivalent exists, it MUST
fall back to the other locale's home page.

#### Scenario: Switch to the equivalent page

- **WHEN** a visitor on an English page that has a Spanish equivalent activates the language
  switcher
- **THEN** they are taken to the Spanish equivalent of that same page

#### Scenario: Fallback when no equivalent exists

- **WHEN** a visitor is on a page whose other-locale equivalent does not exist and activates
  the language switcher
- **THEN** they are taken to the other locale's home page instead of a broken link

### Requirement: Baseline styling and design tokens

The site SHALL include a baseline global style system with design tokens (colors, typography,
spacing) so all pages share a consistent visual foundation.

#### Scenario: Consistent baseline styling

- **WHEN** any page is rendered
- **THEN** the shared baseline styles and design tokens are applied consistently across pages
