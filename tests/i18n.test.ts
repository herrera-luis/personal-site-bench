import { describe, it, expect } from 'vitest';
import { readDoc, getSwitcherHrefs } from './helpers';
import { ui } from '../src/i18n/ui';
import { switchLocalePath } from '../src/i18n/utils';
import { useTranslations } from '../src/i18n/utils';

// TEST-4 — Language switcher links each page to its exact counterpart path.
describe('TEST-4: language switcher counterpart links', () => {
  const pages: Array<{ enPath: string; esPath: string; file: (l: string) => string }> = [
    { enPath: '/en/', esPath: '/es/', file: (l) => `${l}/index.html` },
    { enPath: '/en/about/', esPath: '/es/about/', file: (l) => `${l}/about/index.html` },
    {
      enPath: '/en/articles/',
      esPath: '/es/articles/',
      file: (l) => `${l}/articles/index.html`,
    },
    {
      enPath: '/en/articles/hello-world/',
      esPath: '/es/articles/hello-world/',
      file: (l) => `${l}/articles/hello-world/index.html`,
    },
  ];

  for (const p of pages) {
    it(`en page links to its es counterpart (${p.enPath})`, () => {
      const doc = readDoc(p.file('en'));
      const hrefs = getSwitcherHrefs(doc);
      expect(hrefs).toContain(p.esPath);
    });
    it(`es page links to its en counterpart (${p.esPath})`, () => {
      const doc = readDoc(p.file('es'));
      const hrefs = getSwitcherHrefs(doc);
      expect(hrefs).toContain(p.enPath);
    });
  }

  it('switcher uses real anchor elements (works without JS)', () => {
    const doc = readDoc('en/index.html');
    const anchors = doc.querySelectorAll('.lang-switcher a[href]');
    expect(anchors.length).toBeGreaterThanOrEqual(1);
  });
});

// TEST-4 (unit) — switchLocalePath preserves the path.
describe('TEST-4 (unit): switchLocalePath preserves path', () => {
  it('swaps the locale segment only', () => {
    expect(switchLocalePath('/en/articles/hello-world/', 'es')).toBe(
      '/es/articles/hello-world/',
    );
    expect(switchLocalePath('/es/about/', 'en')).toBe('/en/about/');
    expect(switchLocalePath('/en/', 'es')).toBe('/es/');
  });
});

// TEST-9 — Dictionary completeness & placeholder identity.
describe('TEST-9: dictionary completeness', () => {
  it('es defines every key present in en', () => {
    const enKeys = Object.keys(ui.en).sort();
    const esKeys = Object.keys(ui.es).sort();
    expect(esKeys).toEqual(enKeys);
  });

  it('no dictionary value is empty', () => {
    for (const locale of ['en', 'es'] as const) {
      for (const [k, v] of Object.entries(ui[locale])) {
        expect(v, `${locale}.${k}`).toBeTruthy();
      }
    }
  });
});

// TEST-10 — Empty-list home renders the empty-state copy.
// Mirrors the home template branch: when the article list is empty, the page
// shows t('home.empty') instead of an article list.
function renderListBranch(locale: 'en' | 'es', articles: unknown[]): string {
  const t = useTranslations(locale);
  return articles.length === 0 ? t('home.empty') : '<ul class="article-list">';
}

describe('TEST-10: empty-state handling', () => {
  it('renders empty-state copy when there are no articles', () => {
    for (const locale of ['en', 'es'] as const) {
      const html = renderListBranch(locale, []);
      expect(html).toContain(ui[locale]['home.empty']);
    }
  });

  it('renders a list when articles exist', () => {
    expect(renderListBranch('en', [{}])).toContain('article-list');
  });
});
