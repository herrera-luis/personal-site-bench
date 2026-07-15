import { ui, type UIKey } from './ui';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '../config/site';

/** Extract the locale from the leading segment of a URL/path. */
export function getLocaleFromUrl(url: URL | string): Locale {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg && (LOCALES as readonly string[]).includes(seg)) {
    return seg as Locale;
  }
  return DEFAULT_LOCALE;
}

/** Return a typed translator bound to a locale. Unknown keys are a TS error. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[DEFAULT_LOCALE][key];
  };
}

/** Prefix a path (without leading locale) with the given locale. */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.replace(/^\/+/, '');
  return `/${locale}/${clean}`.replace(/\/+$/, '/');
}

/**
 * Given the current pathname, return the path with its leading locale segment
 * swapped to `target`, preserving the rest of the path.
 */
export function swapLocaleInPath(pathname: string, target: Locale): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length > 0 && (LOCALES as readonly string[]).includes(parts[0])) {
    parts[0] = target;
  } else {
    parts.unshift(target);
  }
  const rebuilt = '/' + parts.join('/');
  // Preserve a trailing slash for directory-style URLs.
  return pathname.endsWith('/') && !rebuilt.endsWith('/') ? rebuilt + '/' : rebuilt;
}

export interface Alternate {
  hreflang: string;
  href: string;
}

/**
 * Build hreflang alternates (en, es, x-default) for the current path.
 * `site` is the absolute origin (e.g. https://personal-site.example).
 */
export function getAlternates(pathname: string, site: string): Alternate[] {
  const origin = site.replace(/\/+$/, '');
  const alternates: Alternate[] = LOCALES.map((loc) => ({
    hreflang: loc,
    href: origin + swapLocaleInPath(pathname, loc),
  }));
  alternates.push({
    hreflang: 'x-default',
    href: origin + swapLocaleInPath(pathname, DEFAULT_LOCALE),
  });
  return alternates;
}
