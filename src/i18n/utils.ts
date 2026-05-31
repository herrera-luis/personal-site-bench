import { ui, DEFAULT_LOCALE, LOCALES, type Locale, type UiKey } from './ui';

export { LOCALES, DEFAULT_LOCALE };
export type { Locale, UiKey };

/** Type guard: is the given string one of the configured locales? */
export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (LOCALES as readonly string[]).includes(value);
}

/** Read the locale from the leading path segment, falling back to the default. */
export function getLocaleFromPath(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0];
  return isLocale(first) ? first : DEFAULT_LOCALE;
}

/** Returns a translation function bound to a locale, with fallback to the default locale. */
export function useTranslations(locale: Locale) {
  return function t(key: UiKey): string {
    return ui[locale][key] ?? ui[DEFAULT_LOCALE][key] ?? key;
  };
}

/**
 * Swap the leading locale segment of a path to `target`, preserving the rest of
 * the path (and any trailing slash). Used by the language switcher and hreflang
 * alternates so every URL maps cleanly to its counterpart in another locale.
 */
export function localizePath(pathname: string, target: Locale): string {
  const hadTrailingSlash = pathname.endsWith('/');
  const segments = pathname.split('/').filter(Boolean);

  if (isLocale(segments[0])) {
    segments[0] = target;
  } else {
    segments.unshift(target);
  }

  const joined = '/' + segments.join('/');
  return hadTrailingSlash && !joined.endsWith('/') ? joined + '/' : joined;
}
