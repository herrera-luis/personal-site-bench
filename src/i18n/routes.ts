import { defaultLocale, type Locale, locales } from './dictionary';
import { site } from '../data/site';

export type RouteDescriptor =
  | { kind: 'home' }
  | { kind: 'about' }
  | { kind: 'article'; slug: string };

export function localizedPath(locale: Locale, route: RouteDescriptor): string {
  if (route.kind === 'home') return `/${locale}/`;
  if (route.kind === 'about') return `/${locale}/about/`;
  return `/${locale}/articles/${route.slug}/`;
}

export function rssPath(locale: Locale): string {
  return `/${locale}/rss.xml`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

export function canonicalUrl(locale: Locale, route: RouteDescriptor): string {
  return absoluteUrl(localizedPath(locale, route));
}

export function alternates(route: RouteDescriptor): Array<{ locale: Locale | 'x-default'; href: string }> {
  return [
    ...locales.map((locale) => ({ locale, href: canonicalUrl(locale, route) })),
    { locale: 'x-default' as const, href: canonicalUrl(defaultLocale, route) },
  ];
}

export function formatDate(value: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(value);
}
