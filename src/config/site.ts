export const SITE = {
  /** Placeholder identity — never a real person. */
  name: 'Personal Site',
  author: 'A. Writer',
  /** Origin used for absolute URLs (RSS, sitemap, OG, hreflang). */
  origin: 'https://personal-site.example',
  domain: 'personal-site.example',
  /** Social / RSS links shown in the footer (no subscribe form). */
  social: {
    github: 'https://github.com/personal-site',
    mastodon: 'https://mastodon.example/@personal-site',
  },
  /** Optional external profile link surfaced on the About page. */
  profileUrl: 'https://github.com/personal-site',
} as const;

export const DEFAULT_LOCALE = 'en' as const;
export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
