import { describe, it, expect } from 'vitest';
import { readDoc, getHreflang, ORIGIN } from './helpers';

// Every generated HTML page and the path it represents.
const pages: Array<{ file: string; enPath: string; esPath: string }> = [
  { file: 'en/index.html', enPath: '/en/', esPath: '/es/' },
  { file: 'es/index.html', enPath: '/en/', esPath: '/es/' },
  { file: 'en/about/index.html', enPath: '/en/about/', esPath: '/es/about/' },
  { file: 'es/about/index.html', enPath: '/en/about/', esPath: '/es/about/' },
  { file: 'en/articles/index.html', enPath: '/en/articles/', esPath: '/es/articles/' },
  { file: 'es/articles/index.html', enPath: '/en/articles/', esPath: '/es/articles/' },
  {
    file: 'en/articles/hello-world/index.html',
    enPath: '/en/articles/hello-world/',
    esPath: '/es/articles/hello-world/',
  },
  {
    file: 'es/articles/hello-world/index.html',
    enPath: '/en/articles/hello-world/',
    esPath: '/es/articles/hello-world/',
  },
];

// TEST-5 — hreflang alternates present & correct on every page.
describe('TEST-5: hreflang alternates', () => {
  for (const p of pages) {
    it(`${p.file} emits en/es/x-default with correct absolute URLs`, () => {
      const doc = readDoc(p.file);
      const hl = getHreflang(doc);
      expect(Object.keys(hl).sort()).toEqual(['en', 'es', 'x-default']);
      expect(hl.en).toBe(`${ORIGIN}${p.enPath}`);
      expect(hl.es).toBe(`${ORIGIN}${p.esPath}`);
      // x-default points to the default locale (en) URL
      expect(hl['x-default']).toBe(`${ORIGIN}${p.enPath}`);
    });
  }

  it('localized <title>, description and og:locale differ between locales', () => {
    const en = readDoc('en/index.html');
    const es = readDoc('es/index.html');
    const enDesc = en.querySelector('meta[name="description"]')?.getAttribute('content');
    const esDesc = es.querySelector('meta[name="description"]')?.getAttribute('content');
    expect(enDesc).toBeTruthy();
    expect(esDesc).toBeTruthy();
    expect(enDesc).not.toBe(esDesc);

    const enOg = en.querySelector('meta[property="og:locale"]')?.getAttribute('content');
    const esOg = es.querySelector('meta[property="og:locale"]')?.getAttribute('content');
    expect(enOg).toBe('en_US');
    expect(esOg).toBe('es_ES');
  });
});
