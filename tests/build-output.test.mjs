import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const read = (rel) => readFileSync(DIST + rel, 'utf8');
const exists = (rel) => existsSync(DIST + rel);

const SLUG = 'hello-bilingual-world';
const LOCALES = ['en', 'es'];

const CONTENT_PAGES = [
  'en/index.html',
  'es/index.html',
  'en/about/index.html',
  'es/about/index.html',
  'en/articles/index.html',
  'es/articles/index.html',
  `en/articles/${SLUG}/index.html`,
  `es/articles/${SLUG}/index.html`,
];

test('build produced a dist directory with a root page', () => {
  assert.ok(exists('index.html'), 'dist/index.html exists — run `npm run build` first');
});

test('root redirects to the default locale', () => {
  const html = read('index.html');
  assert.match(html, /http-equiv="refresh"/i, 'uses a JS-free meta refresh');
  assert.match(html, /url=\/en\//, 'redirect targets /en/');
});

test('core routes render for both locales', () => {
  for (const l of LOCALES) {
    assert.ok(exists(`${l}/index.html`), `${l} home`);
    assert.ok(exists(`${l}/about/index.html`), `${l} about`);
    assert.ok(exists(`${l}/articles/index.html`), `${l} articles index`);
    assert.ok(exists(`${l}/articles/${SLUG}/index.html`), `${l} sample article`);
  }
});

test('home shows the identity strip and a (non-empty) article list', () => {
  for (const l of LOCALES) {
    const html = read(`${l}/index.html`);
    assert.match(html, /class="identity__name"/, `${l} identity strip`);
    assert.match(html, /class="article-list"/, `${l} article list`);
    assert.match(html, new RegExp(`href="/${l}/articles/${SLUG}/"`), `${l} links the article`);
  }
});

test('article reading view has an H1 title and an H3 dek', () => {
  for (const l of LOCALES) {
    const html = read(`${l}/articles/${SLUG}/index.html`);
    assert.match(html, /<h1>[^<]+<\/h1>/, `${l} article H1`);
    assert.match(html, /<h3 class="dek">[^<]+<\/h3>/, `${l} article H3 dek`);
  }
});

test('the language switcher links each page to its counterpart locale', () => {
  const cases = [
    ['en/index.html', '/es/'],
    ['es/index.html', '/en/'],
    ['en/about/index.html', '/es/about/'],
    ['es/about/index.html', '/en/about/'],
    ['en/articles/index.html', '/es/articles/'],
    ['es/articles/index.html', '/en/articles/'],
    [`en/articles/${SLUG}/index.html`, `/es/articles/${SLUG}/`],
    [`es/articles/${SLUG}/index.html`, `/en/articles/${SLUG}/`],
  ];
  for (const [from, to] of cases) {
    const html = read(from);
    assert.match(
      html,
      new RegExp(`href="${to}"\\s+hreflang="(en|es)"`),
      `${from} → ${to}`,
    );
  }
});

test('every content page emits hreflang alternates for en, es and x-default', () => {
  for (const page of CONTENT_PAGES) {
    const html = read(page);
    assert.match(html, /rel="alternate" hreflang="en"/, `${page} en alternate`);
    assert.match(html, /rel="alternate" hreflang="es"/, `${page} es alternate`);
    assert.match(html, /rel="alternate" hreflang="x-default"/, `${page} x-default alternate`);
  }
});

test('reading pages contain no hydrated JS islands (progressive enhancement)', () => {
  for (const l of LOCALES) {
    const home = read(`${l}/index.html`);
    const article = read(`${l}/articles/${SLUG}/index.html`);
    assert.ok(!home.includes('astro-island'), `${l} home has no islands`);
    assert.ok(!article.includes('astro-island'), `${l} article has no islands`);
  }
});

test('per-locale RSS feeds and a sitemap are generated', () => {
  for (const l of LOCALES) {
    assert.ok(exists(`${l}/rss.xml`), `${l} rss.xml`);
    const rss = read(`${l}/rss.xml`);
    assert.match(rss, /<rss/, `${l} rss is a valid feed`);
    assert.match(rss, new RegExp(`/${l}/articles/${SLUG}/`), `${l} rss links the article`);
  }
  assert.ok(exists('sitemap-index.xml'), 'sitemap-index.xml');
});
