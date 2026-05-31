import { describe, it, expect } from 'vitest';
import { LOCALES, distExists, readDist, readDoc } from './helpers';

// TEST-1 — Build succeeds and dist contains expected files.
describe('TEST-1: build output', () => {
  it('produced the root redirect and sitemap', () => {
    expect(distExists('index.html')).toBe(true);
    expect(distExists('sitemap-index.xml')).toBe(true);
  });

  for (const locale of LOCALES) {
    it(`produced core pages for ${locale}`, () => {
      expect(distExists(`${locale}/index.html`)).toBe(true);
      expect(distExists(`${locale}/about/index.html`)).toBe(true);
      expect(distExists(`${locale}/articles/index.html`)).toBe(true);
      expect(distExists(`${locale}/articles/hello-world/index.html`)).toBe(true);
      expect(distExists(`${locale}/rss.xml`)).toBe(true);
    });
  }
});

// TEST-2 — Both-locale routes render with expected landmarks.
describe('TEST-2: both-locale routes render', () => {
  const navLabels: Record<string, string[]> = {
    en: ['Home', 'Articles', 'About'],
    es: ['Inicio', 'Artículos', 'Acerca de'],
  };

  for (const locale of LOCALES) {
    it(`home renders identity strip + article list (${locale})`, () => {
      const doc = readDoc(`${locale}/index.html`);
      expect(doc.querySelector('.identity h1')?.textContent).toContain('Personal Site');
      expect(doc.querySelector('.article-list')).toBeTruthy();
      // nav labels localized
      const nav = doc.querySelector('nav.main-nav')!.textContent ?? '';
      for (const label of navLabels[locale]) expect(nav).toContain(label);
    });

    it(`about renders a bio (${locale})`, () => {
      const doc = readDoc(`${locale}/about/index.html`);
      expect(doc.querySelector('h1')?.textContent).toBeTruthy();
      expect(doc.querySelector('.prose p')?.textContent?.length).toBeGreaterThan(20);
    });

    it(`articles index lists the sample (${locale})`, () => {
      const doc = readDoc(`${locale}/articles/index.html`);
      expect(doc.querySelectorAll('.article-card').length).toBeGreaterThanOrEqual(1);
    });

    it(`article view has H1 + H3 dek + meta + prose + rendered Callout (${locale})`, () => {
      const doc = readDoc(`${locale}/articles/hello-world/index.html`);
      expect(doc.querySelector('article.article h1')?.textContent).toBeTruthy();
      expect(doc.querySelector('h3.dek')?.textContent).toBeTruthy();
      expect(doc.querySelector('.article .meta')?.textContent).toBeTruthy();
      expect(doc.querySelector('.prose')).toBeTruthy();
      expect(doc.querySelector('.callout')).toBeTruthy();
    });

    it(`footer has social/RSS + copyright but NO subscribe form (${locale})`, () => {
      const html = readDist(`${locale}/index.html`);
      const doc = readDoc(`${locale}/index.html`);
      const footer = doc.querySelector('footer.site-footer')!;
      expect(footer.textContent).toContain('GitHub');
      expect(footer.querySelector(`a[href="/${locale}/rss.xml"]`)).toBeTruthy();
      expect(footer.querySelector('.copyright')?.textContent).toContain('©');
      // no subscribe form anywhere
      expect(doc.querySelector('form')).toBeNull();
      expect(html.toLowerCase()).not.toContain('subscribe');
    });
  }
});

// TEST-3 — Root redirect + URL-prefixing of the default locale.
describe('TEST-3: root redirect + prefixing', () => {
  it('root redirects to the default locale', () => {
    const html = readDist('index.html');
    expect(html).toMatch(/http-equiv="refresh"/i);
    expect(html).toContain('/en/');
  });

  it('default locale is also URL-prefixed (no un-prefixed pages)', () => {
    expect(distExists('about/index.html')).toBe(false);
    expect(distExists('articles/index.html')).toBe(false);
  });
});
