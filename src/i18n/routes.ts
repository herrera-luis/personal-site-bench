import { siteConfig } from "../site.config";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type RouteKey = "home" | "about" | "articles" | "article" | "rss";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function parseLocale(value: string | undefined): Locale {
  if (isLocale(value)) return value;
  return defaultLocale;
}

export function localizedPath(locale: Locale, route: RouteKey, slug?: string): string {
  if (route === "home") return `/${locale}/`;
  if (route === "about") return `/${locale}/about/`;
  if (route === "articles") return `/${locale}/articles/`;
  if (route === "rss") return `/${locale}/rss.xml`;
  if (!slug) throw new Error("Article routes require a slug.");
  return `/${locale}/articles/${slug}/`;
}

export function switchLocalePath(locale: Locale, route: RouteKey, slug?: string): string {
  const nextLocale = locale === "en" ? "es" : "en";
  return localizedPath(nextLocale, route, slug);
}

export function canonicalUrl(path: string): string {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function localizedUrl(locale: Locale, route: RouteKey, slug?: string): string {
  return canonicalUrl(localizedPath(locale, route, slug));
}

export function hreflangAlternates(route: RouteKey, slug?: string, availableLocales: readonly Locale[] = locales) {
  const alternates = availableLocales.map((locale) => ({
    locale,
    href: localizedUrl(locale, route, slug)
  }));

  if (availableLocales.includes(defaultLocale)) {
    return [
      ...alternates,
      { locale: "x-default" as const, href: localizedUrl(defaultLocale, route, slug) }
    ];
  }

  return alternates;
}

export function ogLocale(locale: Locale): string {
  return locale === "en" ? "en_US" : "es_ES";
}
