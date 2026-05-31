export const locales = ['en', 'es'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/**
 * Type guard: is the given string one of the supported locales?
 */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Extract the leading locale segment from a pathname.
 * Returns the defaultLocale if no recognised locale segment is present.
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first && isLocale(first)) {
    return first;
  }
  return defaultLocale;
}

/**
 * Swap (or insert) the leading locale segment of a pathname so it points at
 * the same logical page in `targetLocale`. Path-preserving.
 *
 * Examples:
 *   getCounterpartPath('/en/articles/hello-world/', 'es')
 *     -> '/es/articles/hello-world/'
 *   getCounterpartPath('/en/', 'es') -> '/es/'
 */
export function getCounterpartPath(pathname: string, targetLocale: Locale): string {
  const hasTrailingSlash = pathname.endsWith('/');
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }

  let result = '/' + segments.join('/');
  if (hasTrailingSlash && !result.endsWith('/')) {
    result += '/';
  }
  return result;
}
