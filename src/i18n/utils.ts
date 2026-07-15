import { SITE_URL } from '../config.mjs';
import { defaultLocale, locales, type Locale } from './ui';

/**
 * Build a locale-prefixed, trailing-slash path from a locale + optional
 * sub-path. localizedPath('es', 'about') -> '/es/about/'.
 */
export function localizedPath(locale: Locale, subpath = ''): string {
  const clean = subpath.replace(/^\/+/, '').replace(/\/+$/, '');
  return clean === '' ? `/${locale}/` : `/${locale}/${clean}/`;
}

/** Absolute URL for a site-root-relative path, using the configured site URL. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

/**
 * Format a date for a given locale using Intl, in UTC to keep static builds
 * deterministic regardless of the build machine's timezone.
 */
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export interface AlternateLink {
  locale: Locale;
  hreflang: string;
  href: string;
}

/**
 * Given a map of locale -> site-root-relative path for the *same* logical page,
 * return absolute hreflang alternates for every locale plus an x-default entry
 * pointing at the default locale.
 */
export function buildAlternates(
  pathByLocale: Partial<Record<Locale, string>>,
): { alternates: AlternateLink[]; xDefault: string | undefined } {
  const alternates: AlternateLink[] = [];
  for (const locale of locales) {
    const path = pathByLocale[locale];
    if (path) {
      alternates.push({ locale, hreflang: locale, href: absoluteUrl(path) });
    }
  }
  const defaultPath = pathByLocale[defaultLocale];
  return {
    alternates,
    xDefault: defaultPath ? absoluteUrl(defaultPath) : undefined,
  };
}

/**
 * Compute the "switch to the other locale" target for a simple (non-article)
 * page that exists in every locale at the same sub-path.
 */
export function switchLocalePath(current: Locale, target: Locale, subpath = ''): string {
  void current;
  return localizedPath(target, subpath);
}
