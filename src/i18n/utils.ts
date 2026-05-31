import en from "./en.json";
import es from "./es.json";

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

const DICTIONARIES: Record<Locale, Record<string, string>> = { en, es };

/** BCP-47 tags used for hreflang, og:locale, and date formatting. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: "en",
  es: "es",
};

export const OG_LOCALE_TAGS: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
};

/** Type guard: is the given value a supported locale? */
export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/**
 * Resolve the active locale from a URL pathname (e.g. "/es/blog/x/").
 * Falls back to the default locale when no known prefix is present.
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : DEFAULT_LOCALE;
}

/**
 * Translate a key for the given locale. Falls back to the default locale's
 * value (and finally the key itself) so we never render an empty string.
 */
export function t(locale: Locale, key: string): string {
  const dict = DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
  if (dict[key] != null) return dict[key];
  const fallback = DICTIONARIES[DEFAULT_LOCALE][key];
  return fallback != null ? fallback : key;
}

/** Curried translator bound to a single locale, handy inside components. */
export function useTranslations(locale: Locale) {
  return (key: string) => t(locale, key);
}

/**
 * Build a locale-prefixed, trailing-slashed path from path segments.
 * localizedPath("es", "blog", "hola-mundo") -> "/es/blog/hola-mundo/"
 * localizedPath("en") -> "/en/"
 */
export function localizedPath(locale: Locale, ...segments: string[]): string {
  const parts = [locale, ...segments]
    .filter((s) => s != null && s !== "")
    .map((s) => String(s).replace(/^\/+|\/+$/g, ""));
  return `/${parts.join("/")}/`;
}

/** The "other" locale relative to the given one (binary en/es model). */
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

/** Format a date according to the active locale's conventions (in UTC). */
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export interface AlternateLink {
  hreflang: string;
  href: string;
}

/**
 * Build hreflang alternate links (one per available locale plus x-default).
 *
 * @param site       The configured Astro `site` URL (absolute origin).
 * @param pathByLocale Map of locale -> path for the equivalent page. Locales
 *                     missing from the map are skipped (e.g. untranslated pages).
 */
export function buildAlternates(
  site: URL | string,
  pathByLocale: Partial<Record<Locale, string>>,
): AlternateLink[] {
  const origin = new URL(site).origin;
  const links: AlternateLink[] = [];

  for (const locale of LOCALES) {
    const path = pathByLocale[locale];
    if (path) {
      links.push({ hreflang: LOCALE_TAGS[locale], href: new URL(path, origin).href });
    }
  }

  const defaultPath = pathByLocale[DEFAULT_LOCALE];
  if (defaultPath) {
    links.push({ hreflang: "x-default", href: new URL(defaultPath, origin).href });
  }

  return links;
}
