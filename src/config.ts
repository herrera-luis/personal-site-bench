/**
 * Site-wide identity and configuration.
 * Generic placeholder identity — not a real person.
 */
export const SITE = {
  name: 'Personal Site',
  author: 'A. Writer',
  url: 'https://personal-site.example',
  /** Optional external profile link shown on the About page. */
  profileUrl: 'https://example.com/a-writer',
  /** Social / RSS links shown in the footer. */
  social: [
    { label: 'Mastodon', href: 'https://example.com/@writer' },
    { label: 'GitHub', href: 'https://example.com/writer' },
  ],
} as const;
