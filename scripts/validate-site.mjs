import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const distDir = path.join(rootDir, 'dist');
const site = 'https://personal-site.example';

const pages = [
  { route: '/en/', file: 'en/index.html', locale: 'en', counterpartLocale: 'es', counterpart: '/es/' },
  { route: '/es/', file: 'es/index.html', locale: 'es', counterpartLocale: 'en', counterpart: '/en/' },
  {
    route: '/en/about/',
    file: 'en/about/index.html',
    locale: 'en',
    counterpartLocale: 'es',
    counterpart: '/es/about/',
  },
  {
    route: '/es/about/',
    file: 'es/about/index.html',
    locale: 'es',
    counterpartLocale: 'en',
    counterpart: '/en/about/',
  },
  {
    route: '/en/articles/quiet-notes/',
    file: 'en/articles/quiet-notes/index.html',
    locale: 'en',
    counterpartLocale: 'es',
    counterpart: '/es/articles/quiet-notes/',
  },
  {
    route: '/es/articles/quiet-notes/',
    file: 'es/articles/quiet-notes/index.html',
    locale: 'es',
    counterpartLocale: 'en',
    counterpart: '/en/articles/quiet-notes/',
  },
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function readBuiltFile(relativePath) {
  const filePath = path.join(distDir, relativePath);
  return readFile(filePath, 'utf8');
}

function assertAlternate(html, hreflang, href, route) {
  const expected = `<link rel="alternate" hreflang="${hreflang}" href="${href}"`;
  assert(html.includes(expected), `${route} is missing hreflang ${hreflang} -> ${href}`);
}

function assertLanguageSwitcher(html, locale, href, route) {
  const pattern = new RegExp(
    `<a[^>]*(href="${escapeRegExp(href)}"[^>]*data-locale-link="${locale}"|data-locale-link="${locale}"[^>]*href="${escapeRegExp(href)}")[^>]*>`,
  );
  assert(pattern.test(html), `${route} language switcher does not link to ${href}`);
}

for (const page of pages) {
  const html = await readBuiltFile(page.file);
  const enPath = page.route.replace(/^\/(en|es)/, '/en');
  const esPath = page.route.replace(/^\/(en|es)/, '/es');

  assert(html.includes('<main id="content">'), `${page.route} did not render the shared layout`);
  assertLanguageSwitcher(html, page.counterpartLocale, page.counterpart, page.route);
  assertAlternate(html, 'en', `${site}${enPath}`, page.route);
  assertAlternate(html, 'es', `${site}${esPath}`, page.route);
  assertAlternate(html, 'x-default', `${site}${enPath}`, page.route);
}

for (const locale of ['en', 'es']) {
  const rssXml = await readBuiltFile(`${locale}/rss.xml`);
  assert(rssXml.includes('<rss'), `/${locale}/rss.xml is not an RSS document`);
  assert(rssXml.includes('<item>'), `/${locale}/rss.xml has no article items`);
}

await access(path.join(distDir, 'index.html'));

const distEntries = await readdir(distDir);
assert(
  distEntries.some((entry) => entry.startsWith('sitemap') && entry.endsWith('.xml')),
  'sitemap XML was not generated',
);

console.log(`Validated ${pages.length} localized pages, language switchers, hreflang alternates, RSS feeds, and sitemap output.`);
