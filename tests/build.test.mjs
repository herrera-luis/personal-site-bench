import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DIST, LOCALES, pageFile, distPath, exists, read } from './helpers.mjs';

test('T1: build produced a dist/ directory', () => {
  assert.ok(exists(DIST), 'dist/ should exist after `npm run build`');
});

test('T3: locale route presence for both locales', () => {
  for (const locale of LOCALES) {
    assert.ok(exists(pageFile(locale)), `Home missing for ${locale}`);
    assert.ok(exists(pageFile(locale, 'about')), `About missing for ${locale}`);
    assert.ok(exists(pageFile(locale, 'articles')), `Articles index missing for ${locale}`);
    assert.ok(
      exists(pageFile(locale, 'articles', 'hello-world')),
      `Sample article missing for ${locale}`,
    );
  }
});

test('T5: article page has one H1, an H3 dek, and a meta line', async () => {
  for (const locale of LOCALES) {
    const html = await read(pageFile(locale, 'articles', 'hello-world'));
    const h1 = (html.match(/<h1[^>]*>/gi) || []).length;
    assert.equal(h1, 1, `expected exactly one <h1> for ${locale}, got ${h1}`);
    assert.ok(/<h3[^>]*class="dek"/i.test(html), `dek H3 missing for ${locale}`);
    assert.ok(/class="meta"/i.test(html), `meta line missing for ${locale}`);
  }
});

test('T11: root redirects to default locale (/en/)', async () => {
  const rootFile = distPath('index.html');
  assert.ok(exists(rootFile), 'dist/index.html should exist');
  const html = await read(rootFile);
  assert.ok(/\/en\//.test(html), 'root should reference /en/ as redirect target');
});

test('T12: per-locale RSS feeds exist and are locale-scoped', async () => {
  for (const locale of LOCALES) {
    const feed = distPath(locale, 'rss.xml');
    assert.ok(exists(feed), `RSS feed missing for ${locale}`);
    const xml = await read(feed);
    assert.ok(/<rss/i.test(xml), `not valid RSS for ${locale}`);
    assert.ok(xml.includes(`<language>${locale}</language>`), `language tag missing for ${locale}`);
    assert.ok(xml.includes(`/${locale}/articles/hello-world/`), `item link missing for ${locale}`);
    const other = locale === 'en' ? 'es' : 'en';
    assert.ok(
      !xml.includes(`/${other}/articles/`),
      `feed for ${locale} should not include ${other} items`,
    );
  }
});

test('T13: sitemap exists and includes both locales', async () => {
  const index = distPath('sitemap-index.xml');
  assert.ok(exists(index), 'sitemap-index.xml missing');
  const idx = await read(index);
  const first = idx.match(/sitemap-\d+\.xml/);
  assert.ok(first, 'sitemap-0.xml reference missing');
  const urls = await read(distPath(first[0]));
  assert.ok(urls.includes('/en/'), 'sitemap missing en URLs');
  assert.ok(urls.includes('/es/'), 'sitemap missing es URLs');
});

test('T15: no external web-font requests in built pages', async () => {
  for (const locale of LOCALES) {
    const html = await read(pageFile(locale));
    assert.ok(!/fonts\.googleapis\.com/i.test(html), 'google fonts referenced');
    assert.ok(!/fonts\.gstatic\.com/i.test(html), 'gstatic fonts referenced');
    assert.ok(!/@font-face/i.test(html), '@font-face declared');
  }
});
