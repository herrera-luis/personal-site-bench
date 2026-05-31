import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { LOCALES, DIST, readDist, distExists, readDoc, ORIGIN } from './helpers';

// TEST-6 — Per-locale RSS feeds.
describe('TEST-6: per-locale RSS', () => {
  for (const locale of LOCALES) {
    it(`${locale}/rss.xml exists, is valid-ish XML, localized, with absolute item links`, () => {
      expect(distExists(`${locale}/rss.xml`)).toBe(true);
      const xml = readDist(`${locale}/rss.xml`);
      expect(xml).toContain('<rss');
      expect(xml).toContain('<channel>');
      expect(xml).toContain(`<language>${locale}</language>`);
      // localized channel title
      expect(xml).toMatch(/<title>[^<]*(Articles|Artículos)[^<]*<\/title>/);
      // sample item present with absolute link under origin
      expect(xml).toContain(`${ORIGIN}/${locale}/articles/hello-world/`);
    });
  }
});

// TEST-7 — Sitemap.
describe('TEST-7: sitemap', () => {
  it('sitemap-index.xml exists and references a sitemap file', () => {
    expect(distExists('sitemap-index.xml')).toBe(true);
    const idx = readDist('sitemap-index.xml');
    expect(idx).toContain('<sitemapindex');
    expect(idx).toContain('sitemap-0.xml');
  });

  it('sitemap lists both locales', () => {
    const sm = readDist('sitemap-0.xml');
    expect(sm).toContain(`${ORIGIN}/en/`);
    expect(sm).toContain(`${ORIGIN}/es/`);
  });
});

// TEST-8 — No web fonts anywhere in dist.
describe('TEST-8: no web-font downloads', () => {
  const htmlFiles = [
    'en/index.html',
    'es/index.html',
    'en/articles/hello-world/index.html',
    'es/articles/hello-world/index.html',
    'en/about/index.html',
  ];
  for (const f of htmlFiles) {
    it(`${f} has no @font-face or remote font links`, () => {
      const html = readDist(f).toLowerCase();
      expect(html).not.toContain('@font-face');
      expect(html).not.toContain('fonts.googleapis.com');
      expect(html).not.toContain('fonts.gstatic.com');
      expect(html).not.toContain('use.typekit');
    });
  }
});

// TEST-11 — Folder-per-article contract.
describe('TEST-11: folder-per-article', () => {
  it('source uses src/content/articles/hello-world/{en,es}/README.mdx', () => {
    const base = join(DIST, '..', 'src', 'content', 'articles', 'hello-world');
    expect(existsSync(join(base, 'en', 'README.mdx'))).toBe(true);
    expect(existsSync(join(base, 'es', 'README.mdx'))).toBe(true);
    // colocated asset
    expect(existsSync(join(base, 'cover.svg'))).toBe(true);
  });

  it('the colocated asset resolves in the built page', () => {
    const doc = readDoc('en/articles/hello-world/index.html');
    const img = doc.querySelector('.prose img');
    expect(img).toBeTruthy();
    const src = img!.getAttribute('src') ?? '';
    expect(src).toContain('cover');
    // and the emitted asset file exists in dist
    const asset = src.replace(/^\//, '');
    expect(existsSync(join(DIST, asset))).toBe(true);
  });
});

// TEST-12 — JS-disabled reading (progressive enhancement).
describe('TEST-12: works without JavaScript', () => {
  it('article body text is present in the served HTML', () => {
    const en = readDist('en/articles/hello-world/index.html');
    expect(en).toContain('Welcome to');
    const es = readDist('es/articles/hello-world/index.html');
    expect(es).toContain('Bienvenida a');
  });

  it('reading pages ship no hydrated client scripts', () => {
    const doc = readDoc('en/articles/hello-world/index.html');
    // Astro islands would emit <astro-island> / module scripts; none expected.
    expect(doc.querySelector('astro-island')).toBeNull();
    const moduleScripts = doc.querySelectorAll('script[type="module"]');
    expect(moduleScripts.length).toBe(0);
  });
});
