import en from './en.json';
import es from './es.json';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Human-readable language names for the switcher, keyed by locale.
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

// BCP-47 language tags used for <html lang> and hreflang.
export const localeLangTags: Record<Locale, string> = {
  en: 'en',
  es: 'es',
};

const dictionaries = { en, es } as const;

// Translation keys are the keys of the English dictionary. The es dictionary is
// typed against the same shape below, guaranteeing both define the same keys.
export type TranslationKey = keyof typeof en;

// Compile-time guarantee that es defines exactly the same keys as en.
const _esSameKeys: Record<TranslationKey, string> = es;
void _esSameKeys;

export function isLocale(value: string | undefined): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/** Typed translation lookup: t(locale, key) -> localized string. */
export function t(locale: Locale, key: TranslationKey): string {
  return dictionaries[locale][key] ?? dictionaries[defaultLocale][key] ?? key;
}

/** Returns a bound translator for a locale: ui.en('nav.home'). */
export function useTranslations(locale: Locale) {
  return (key: TranslationKey): string => t(locale, key);
}
