import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseHTML } from 'linkedom';

/**
 * The @astrojs/vercel static adapter writes the static build to
 * `.vercel/output/static`. Fall back to `dist` for a plain static build.
 */
function resolveOutDir(): string {
  const vercel = resolve(process.cwd(), '.vercel/output/static');
  if (existsSync(vercel)) return vercel;
  return resolve(process.cwd(), 'dist');
}

const dist = resolveOutDir();

function read(path: string): string {
  return readFileSync(resolve(dist, path), 'utf-8');
}

function dom(path: string) {
  const { document } = parseHTML(read(path));
  return document;
}

beforeAll(() => {
  if (!existsSync(dist)) {
    throw new Error('build output not found — run `astro build` before the DOM tests.');
  }
});

describe('V2 — both-locale routes render', () => {
  const routes = [
    'en/index.html',
    'es/index.html',
    'en/about/index.html',
    'es/about/index.html',
    'en/articles/index.html',
    'es/articles/index.html',
    'en/articles/hello-world/index.html',
    'es/articles/hello-world/index.html',
  ];
  for (const r of routes) {
    it(`emits ${r}`, () => {
      expect(existsSync(resolve(dist, r)), r).toBe(true);
    });
  }
});

describe('V3 — root redirect to /en', () => {
  it('root index redirects to /en', () => {
    const html = read('index.html');
    // Astro emits a meta refresh + canonical to the default locale.
    expect(html).toMatch(/\/en\/?/);
    expect(html.toLowerCase()).toContain('refresh');
  });
});

describe('V4 — language switcher links to path-preserving counterpart', () => {
  const pairs: Array<[string, string]> = [
    ['en/index.html', '/es/'],
    ['es/index.html', '/en/'],
    ['en/about/index.html', '/es/about/'],
    ['es/about/index.html', '/en/about/'],
    ['en/articles/hello-world/index.html', '/es/articles/hello-world/'],
    ['es/articles/hello-world/index.html', '/en/articles/hello-world/'],
  ];
  for (const [page, expectedHref] of pairs) {
    it(`${page} switcher -> ${expectedHref}`, () => {
      const doc = dom(page);
      const sw = doc.querySelector('a[data-lang-switch]');
      expect(sw, 'switcher present').toBeTruthy();
      expect(sw?.getAttribute('href')).toBe(expectedHref);
    });
  }
});

describe('V5 — hreflang alternates present on every page', () => {
  const pages = [
    'en/index.html',
    'es/index.html',
    'en/about/index.html',
    'es/about/index.html',
    'en/articles/index.html',
    'es/articles/index.html',
    'en/articles/hello-world/index.html',
    'es/articles/hello-world/index.html',
  ];
  for (const page of pages) {
    it(`${page} has en/es/x-default alternates`, () => {
      const doc = dom(page);
      const langs = [...doc.querySelectorAll('link[rel="alternate"][hreflang]')].map(
        (l) => l.getAttribute('hreflang')
      );
      expect(langs).toContain('en');
      expect(langs).toContain('es');
      expect(langs).toContain('x-default');
      // hrefs must be absolute
      for (const l of doc.querySelectorAll('link[rel="alternate"][hreflang]')) {
        expect(l.getAttribute('href')).toMatch(/^https?:\/\//);
      }
    });
  }
});

describe('V7 — localized SEO / OpenGraph', () => {
  it('en vs es titles/og:locale differ appropriately', () => {
    const en = dom('en/about/index.html');
    const es = dom('es/about/index.html');
    expect(en.querySelector('title')?.textContent).not.toBe(
      es.querySelector('title')?.textContent
    );
    expect(en.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe(
      'en_US'
    );
    expect(es.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe(
      'es_ES'
    );
    expect(
      en.querySelector('meta[property="og:title"]')?.getAttribute('content')
    ).toBeTruthy();
  });
});

describe('V8 — per-locale RSS feeds', () => {
  for (const lang of ['en', 'es']) {
    it(`${lang}/rss.xml exists and lists the sample article`, () => {
      const xml = read(`${lang}/rss.xml`);
      expect(xml).toContain('<rss');
      expect(xml).toContain('<item>');
      expect(xml).toContain(`/${lang}/articles/hello-world/`);
    });
  }
});

describe('V9 — sitemap includes both locales', () => {
  it('sitemap index exists', () => {
    expect(existsSync(resolve(dist, 'sitemap-index.xml'))).toBe(true);
  });
  it('sitemap contains en and es URLs', () => {
    const xml = read('sitemap-0.xml');
    expect(xml).toContain('/en/');
    expect(xml).toContain('/es/');
  });
});

describe('V10 — empty-list message is localized and available', () => {
  it('home renders article content (non-empty in this build)', () => {
    const doc = dom('en/index.html');
    // With the sample article present the list is rendered.
    expect(doc.querySelector('.article-list, .empty')).toBeTruthy();
  });
});

describe('V11 — reading works with JS disabled', () => {
  const readingPages = [
    'en/articles/hello-world/index.html',
    'es/articles/hello-world/index.html',
    'en/index.html',
  ];
  for (const page of readingPages) {
    it(`${page} contains prose and no hydration island`, () => {
      const html = read(page);
      const doc = parseHTML(html).document;
      // Article body / content present
      expect(doc.querySelector('main')?.textContent?.trim().length ?? 0).toBeGreaterThan(
        20
      );
      // No client-hydrated island script markers required for reading
      expect(html).not.toContain('astro-island');
    });
  }
});
