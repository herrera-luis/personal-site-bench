import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  LOCALES,
  pageFile,
  read,
  exists,
  getHtmlLang,
  getHreflangLinks,
  getCanonical,
  getLangSwitchHref,
} from './helpers.mjs';

const PAGES = [
  { parts: [], name: 'home' },
  { parts: ['about'], name: 'about' },
  { parts: ['articles'], name: 'articles' },
  { parts: ['articles', 'hello-world'], name: 'article' },
];

test('T4: <html lang> matches the locale on every page', async () => {
  for (const locale of LOCALES) {
    for (const p of PAGES) {
      const html = await read(pageFile(locale, ...p.parts));
      assert.equal(getHtmlLang(html), locale, `lang mismatch on ${locale} ${p.name}`);
    }
  }
});

test('T7 & T8: language switcher links to the path-preserved counterpart, which exists', async () => {
  for (const locale of LOCALES) {
    const other = locale === 'en' ? 'es' : 'en';
    for (const p of PAGES) {
      const html = await read(pageFile(locale, ...p.parts));
      const href = getLangSwitchHref(html, other);
      assert.ok(href, `no switcher link to ${other} on ${locale} ${p.name}`);
      const expected = '/' + [other, ...p.parts].join('/') + '/';
      assert.equal(href, expected, `switcher counterpart wrong on ${locale} ${p.name}`);
      // T8: target page actually exists in dist/
      assert.ok(exists(pageFile(other, ...p.parts)), `counterpart page missing: ${expected}`);
    }
  }
});

test('T9 & T10: hreflang alternates (en, es, x-default) present and correct + canonical', async () => {
  for (const locale of LOCALES) {
    for (const p of PAGES) {
      const html = await read(pageFile(locale, ...p.parts));
      const links = getHreflangLinks(html);
      const byLang = Object.fromEntries(links.map((l) => [l.hreflang, l.href]));
      assert.ok(byLang.en, `missing hreflang=en on ${locale} ${p.name}`);
      assert.ok(byLang.es, `missing hreflang=es on ${locale} ${p.name}`);
      assert.ok(byLang['x-default'], `missing hreflang=x-default on ${locale} ${p.name}`);

      const suffix = '/' + [...p.parts].join('/');
      const norm = (s) => s.replace(/\/+$/, '/');
      assert.ok(byLang.en.includes(norm('/en' + suffix)), `en alternate wrong on ${locale} ${p.name}`);
      assert.ok(byLang.es.includes(norm('/es' + suffix)), `es alternate wrong on ${locale} ${p.name}`);
      // x-default points to default locale (en)
      assert.ok(
        byLang['x-default'].includes(norm('/en' + suffix)),
        `x-default should point to en on ${locale} ${p.name}`,
      );

      const canonical = getCanonical(html);
      assert.ok(canonical, `missing canonical on ${locale} ${p.name}`);
    }
  }
});

test('T14: localized title, description, and OpenGraph tags present', async () => {
  for (const locale of LOCALES) {
    const html = await read(pageFile(locale));
    assert.ok(/<title>[^<]+<\/title>/i.test(html), `title missing for ${locale}`);
    assert.ok(/<meta[^>]*name="description"[^>]*content="[^"]+"/i.test(html), `description missing for ${locale}`);
    assert.ok(/<meta[^>]*property="og:title"/i.test(html), `og:title missing for ${locale}`);
    assert.ok(/<meta[^>]*property="og:locale"[^>]*content="[^"]+"/i.test(html), `og:locale missing for ${locale}`);
  }
});

test('T6: home renders the article list (populated) with a full-article link', async () => {
  for (const locale of LOCALES) {
    const html = await read(pageFile(locale));
    assert.ok(/class="article-list"/i.test(html), `article list missing for ${locale}`);
    assert.ok(/articles\/hello-world/i.test(html), `article link missing for ${locale}`);
  }
});

test('T16: reading pages contain server-rendered body prose (works with JS disabled)', async () => {
  for (const locale of LOCALES) {
    const html = await read(pageFile(locale, 'articles', 'hello-world'));
    assert.ok(/class="prose"/i.test(html), `prose container missing for ${locale}`);
    assert.ok(/class="callout"/i.test(html), `imported MDX component not rendered for ${locale}`);
    // No client-side script modules required to read the content.
    assert.ok(!/<script[^>]*type="module"[^>]*src=/i.test(html), `unexpected client JS on ${locale} article`);
  }
});
