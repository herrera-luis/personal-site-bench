export type Locale = 'en' | 'es';

export const SITE = {
  name: 'Personal Site',
  author: 'A. Writer',
  domain: 'personal-site.example',
  url: 'https://personal-site.example',
  defaultLocale: 'en' as Locale,
  locales: ['en', 'es'] as const satisfies readonly Locale[],
  /** Bracketed roles tagline, per locale. */
  roles: {
    en: ['writer', 'engineer', 'tinkerer'],
    es: ['escritora', 'ingeniera', 'aficionada'],
  } as Record<Locale, string[]>,
  social: [
    { label: 'GitHub', href: 'https://github.com/example' },
    { label: 'Mastodon', href: 'https://mastodon.example/@writer' },
  ],
} as const;

export const LOCALES: readonly Locale[] = SITE.locales;
export const DEFAULT_LOCALE: Locale = SITE.defaultLocale;
