## ADDED Requirements

### Requirement: Folder-per-article content collection

Articles SHALL be organized in an Astro content collection where each article lives in its own
folder that co-locates the MDX body and the article's own image/asset files. The collection
MUST be typed so entries can be queried at build time to generate pages, listings, and feeds.

#### Scenario: Article co-locates its assets

- **WHEN** an author adds an article as a folder containing its MDX file and an image
- **THEN** the article and its image live together in that folder and the image can be
  referenced from the article

#### Scenario: Collection is queryable at build time

- **WHEN** the build queries the article collection
- **THEN** it returns typed entries usable to generate article pages, listings, and RSS feeds

### Requirement: Validated frontmatter schema

Each article's frontmatter SHALL be validated against a schema that requires a title, a
description, a publication date (`pubDate`), a locale (`lang`, one of `en` or `es`), and a
`translationKey`; and that optionally supports an updated date (`updatedDate`), `tags`, a
`draft` flag, and a hero image. A build MUST fail when required frontmatter is missing or of
the wrong type.

#### Scenario: Valid frontmatter passes

- **WHEN** an article declares title, description, `pubDate`, `lang`, and `translationKey`
- **THEN** the article validates and builds successfully

#### Scenario: Missing required frontmatter fails the build

- **WHEN** an article omits a required field (e.g. `lang` or `translationKey`)
- **THEN** the build fails with a schema validation error

### Requirement: Locale pairing via translation key

Localized variants of the same article SHALL share a common `translationKey` so the English
and Spanish versions can be paired for the language switcher and `hreflang` alternates. Two
articles with the same `translationKey` but different `lang` values MUST be treated as
translations of each other.

#### Scenario: Pairing English and Spanish variants

- **WHEN** an English article and a Spanish article share the same `translationKey`
- **THEN** the system treats them as equivalents so the language switcher and `hreflang`
  alternates link between them

#### Scenario: Article with no counterpart

- **WHEN** an article's `translationKey` has no matching entry in the other locale
- **THEN** the system treats it as having no equivalent (no cross-locale alternate is emitted)
