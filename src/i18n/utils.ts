import { ui, defaultLang, locales, type Locale, type UIKey } from './ui';

/**
 * Detect the active locale from a URL. Falls back to the default locale.
 * Handles URLs beginning with `/en/` or `/es/` (and the bare `/en`, `/es`).
 */
export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (locales.includes(lang as Locale)) return lang as Locale;
  return defaultLang;
}

/**
 * Returns a translation function bound to the given locale. Missing keys fall
 * back to the default-locale string so UI chrome never renders a raw key.
 */
export function useTranslations(lang: Locale) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Build a locale-prefixed, absolute-from-root path. Every route is prefixed
 * with its locale segment (including the default locale).
 *
 * @example localizedPath('en', 'about') => '/en/about/'
 * @example localizedPath('es')           => '/es/'
 */
export function localizedPath(lang: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  if (clean === '') return `/${lang}/`;
  return `/${lang}/${clean}/`;
}

export { locales, defaultLang, type Locale };
