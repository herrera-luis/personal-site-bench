import { describe, it, expect } from 'vitest';
import { ui, switchLocalePath, otherLocale } from '../src/i18n/ui';

describe('typed dictionary (V6)', () => {
  it('has identical key sets across locales', () => {
    const enKeys = Object.keys(ui.en).sort();
    const esKeys = Object.keys(ui.es).sort();
    expect(esKeys).toEqual(enKeys);
  });

  it('has non-empty values for every key', () => {
    for (const locale of ['en', 'es'] as const) {
      for (const [key, value] of Object.entries(ui[locale])) {
        expect(value, `${locale}.${key}`).toBeTruthy();
      }
    }
  });

  it('localized SEO strings differ between locales (V7)', () => {
    expect(ui.en['nav.home']).not.toEqual(ui.es['nav.home']);
    expect(ui.en['about.bio']).not.toEqual(ui.es['about.bio']);
  });
});

describe('switchLocalePath (path preserving)', () => {
  it('swaps the leading locale segment', () => {
    expect(switchLocalePath('/en/articles/hello-world/', 'es')).toBe(
      '/es/articles/hello-world/'
    );
    expect(switchLocalePath('/es/about/', 'en')).toBe('/en/about/');
    expect(switchLocalePath('/en/', 'es')).toBe('/es/');
  });

  it('otherLocale toggles', () => {
    expect(otherLocale('en')).toBe('es');
    expect(otherLocale('es')).toBe('en');
  });
});
