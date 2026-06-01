import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = existsSync(join(root, 'dist'))
  ? join(root, 'dist')
  : join(root, '.vercel', 'output', 'static');

function readDist(path) {
  const file = join(dist, path);
  if (!existsSync(file)) {
    throw new Error(`Expected ${path} to exist in dist`);
  }
  return readFileSync(file, 'utf8');
}

function assertIncludes(content, needle, label) {
  if (!content.includes(needle)) {
    throw new Error(`Expected ${label} to include ${needle}`);
  }
}

const pages = {
  root: readDist('index.html'),
  enHome: readDist('en/index.html'),
  esHome: readDist('es/index.html'),
  enAbout: readDist('en/about/index.html'),
  esAbout: readDist('es/about/index.html'),
  enArticle: readDist('en/articles/sample-article/index.html'),
  esArticle: readDist('es/articles/sample-article/index.html'),
};

assertIncludes(pages.root, '/en/', 'root redirect');

for (const [label, html] of Object.entries(pages).filter(([key]) => key !== 'root')) {
  assertIncludes(html, 'hreflang="en"', label);
  assertIncludes(html, 'hreflang="es"', label);
  assertIncludes(html, 'hreflang="x-default"', label);
  assertIncludes(html, '<header', label);
  assertIncludes(html, '<footer', label);
  assertIncludes(html, 'RSS', label);
}

assertIncludes(pages.enHome, 'Home', 'English home nav');
assertIncludes(pages.enHome, 'Articles', 'English home nav');
assertIncludes(pages.enHome, 'About', 'English home nav');
assertIncludes(pages.enHome, 'Full article', 'English home article link');
assertIncludes(pages.enHome, 'A quiet sample article', 'English home article');
assertIncludes(pages.enHome, 'href="/es/"', 'English home language switcher');

assertIncludes(pages.esHome, 'Inicio', 'Spanish home nav');
assertIncludes(pages.esHome, 'Artículos', 'Spanish home nav');
assertIncludes(pages.esHome, 'Acerca de', 'Spanish home nav');
assertIncludes(pages.esHome, 'Artículo completo', 'Spanish home article link');
assertIncludes(pages.esHome, 'Un artículo de muestra tranquilo', 'Spanish home article');
assertIncludes(pages.esHome, 'href="/en/"', 'Spanish home language switcher');

assertIncludes(pages.enAbout, 'href="/es/about/"', 'English about language switcher');
assertIncludes(pages.esAbout, 'href="/en/about/"', 'Spanish about language switcher');
assertIncludes(pages.enArticle, 'href="/es/articles/sample-article/"', 'English article language switcher');
assertIncludes(pages.esArticle, 'href="/en/articles/sample-article/"', 'Spanish article language switcher');

assertIncludes(pages.enArticle, '<h1>A quiet sample article</h1>', 'English article h1');
assertIncludes(pages.enArticle, '<h3>A complete English article exercising the long-form template.</h3>', 'English article dek');
assertIncludes(pages.enArticle, 'Template exercise', 'English article callout');
assertIncludes(pages.esArticle, '<h1>Un artículo de muestra tranquilo</h1>', 'Spanish article h1');
assertIncludes(pages.esArticle, '<h3>Un artículo completo en español que prueba la plantilla de lectura extensa.</h3>', 'Spanish article dek');
assertIncludes(pages.esArticle, 'Prueba de plantilla', 'Spanish article callout');

const enFeed = readDist('en/rss.xml');
const esFeed = readDist('es/rss.xml');
assertIncludes(enFeed, 'A quiet sample article', 'English RSS');
assertIncludes(enFeed, 'https://personal-site.example/en/articles/sample-article/', 'English RSS URL');
assertIncludes(esFeed, 'Un artículo de muestra tranquilo', 'Spanish RSS');
assertIncludes(esFeed, 'https://personal-site.example/es/articles/sample-article/', 'Spanish RSS URL');
if (enFeed.includes('Un artículo de muestra tranquilo')) throw new Error('English feed contains Spanish title');
if (esFeed.includes('A quiet sample article')) throw new Error('Spanish feed contains English title');

const sitemapFiles = readdirSync(dist).filter((file) => file.startsWith('sitemap') && file.endsWith('.xml'));
if (sitemapFiles.length === 0) {
  throw new Error('Expected sitemap XML output');
}
const sitemapText = sitemapFiles.map((file) => readDist(file)).join('\n');
for (const url of [
  'https://personal-site.example/en/',
  'https://personal-site.example/es/',
  'https://personal-site.example/en/about/',
  'https://personal-site.example/es/about/',
  'https://personal-site.example/en/articles/sample-article/',
  'https://personal-site.example/es/articles/sample-article/',
]) {
  assertIncludes(sitemapText, url, 'sitemap');
}

const combined = Object.values(pages).join('\n');
for (const forbidden of ['Subscribe', 'subscribe form', 'Company', 'Course', 'Contact']) {
  if (combined.includes(forbidden)) {
    throw new Error(`Unexpected forbidden text found: ${forbidden}`);
  }
}

console.log('Build verification passed.');
