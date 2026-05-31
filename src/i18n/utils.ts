import { SITE, DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from '../config/site';
import { ui, defaultLang, type UIKey } from './ui';

/** Returns a typed translator bound to a locale. Missing keys are type errors. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLang][key];
  };
}

/** Extract the active locale from a URL or pathname (defaults to DEFAULT_LOCALE). */
export function getLocaleFromUrl(url: URL | string): Locale {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg && isLocale(seg)) return seg;
  return DEFAULT_LOCALE;
}

/** The path with its leading locale segment removed (always starts with '/'). */
export function stripLocale(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length && isLocale(parts[0])) parts.shift();
  const rest = parts.join('/');
  return '/' + rest + (rest && !rest.endsWith('/') ? '/' : '');
}

/** Build a localized path for the given locale, preserving the rest of the path. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const rest = stripLocale(pathname).replace(/^\//, '');
  return `/${target}/${rest}`.replace(/\/{2,}/g, '/');
}

/** Localize a locale-relative path (e.g. 'about/') to '/<locale>/about/'. */
export function localizedPath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\//, '');
  return `/${locale}/${clean}`.replace(/\/{2,}/g, '/');
}

/** Absolute URL for a localized path. */
export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE.origin).href;
}

export interface Alternates {
  en: string;
  es: string;
  xDefault: string;
}

/**
 * hreflang alternates for the current page. Given any pathname, returns the
 * absolute counterpart URLs for `en`, `es`, and `x-default` (default locale).
 */
export function getAlternates(pathname: string): Alternates {
  const alts: Partial<Record<Locale, string>> = {};
  for (const loc of LOCALES) {
    alts[loc] = absoluteUrl(switchLocalePath(pathname, loc));
  }
  return {
    en: alts.en!,
    es: alts.es!,
    xDefault: alts[DEFAULT_LOCALE]!,
  };
}
