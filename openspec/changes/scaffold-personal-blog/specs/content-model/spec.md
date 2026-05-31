## ADDED Requirements

### Requirement: Folder-per-article content structure
The content model SHALL store each article in its own folder within a `blog` content collection,
allowing per-article assets to be co-located, with localized MDX entries per locale.

#### Scenario: Article folder contains localized entries and assets
- **WHEN** an author creates an article folder under the blog collection
- **THEN** the folder MAY contain one MDX entry per locale (e.g. `en.mdx`, `es.mdx`) and
  co-located asset files (e.g. images) that the article references

### Requirement: Typed frontmatter schema
The content collection SHALL define a typed schema that validates each article's frontmatter at
build time and fails the build on invalid or missing required fields.

#### Scenario: Required fields are validated
- **WHEN** an article entry is missing a required field such as `title`, `description`, `pubDate`,
  `locale`, or `translationKey`
- **THEN** the build SHALL fail with a validation error identifying the offending entry

#### Scenario: Locale must be a supported value
- **WHEN** an article declares a `locale` that is not in the supported locale set (`en`, `es`)
- **THEN** the build SHALL fail with a validation error

#### Scenario: Optional fields are allowed
- **WHEN** an article omits optional fields such as `slug`, `tags`, `draft`, or `cover`
- **THEN** the entry SHALL still validate, applying documented defaults (e.g. `draft` defaults to false)

### Requirement: Translation linkage
The content model SHALL link translations of the same article across locales using a shared
`translationKey`, so the system can find an article's equivalent in another locale.

#### Scenario: Translations share a translation key
- **WHEN** the English and Spanish versions of an article both declare `translationKey: "hello-world"`
- **THEN** the system SHALL treat them as translations of one another and be able to resolve one
  from the other

#### Scenario: Article without a counterpart is allowed
- **WHEN** an article exists in only one locale (no matching `translationKey` in the other locale)
- **THEN** the build SHALL succeed and the article SHALL be reported as having no translation

### Requirement: Slug and URL derivation
The content model SHALL derive each article's URL slug from its `slug` frontmatter when present,
otherwise from the article folder/entry name, enabling localized slugs per locale.

#### Scenario: Explicit slug overrides default
- **WHEN** a Spanish entry declares `slug: "hola-mundo"`
- **THEN** its article URL SHALL be `/es/blog/hola-mundo/`

#### Scenario: Default slug when none provided
- **WHEN** an article entry does not declare a `slug`
- **THEN** the slug SHALL default to the article folder name
