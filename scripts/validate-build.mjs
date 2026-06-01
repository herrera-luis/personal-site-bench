import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const requiredPaths = [
  'dist/en/index.html',
  'dist/es/index.html',
  'dist/en/about/index.html',
  'dist/es/about/index.html',
  'dist/en/articles/index.html',
  'dist/es/articles/index.html',
  'dist/en/articles/welcome/index.html',
  'dist/es/articles/welcome/index.html',
  'dist/en/articles/static-astro/index.html',
  'dist/en/rss.xml',
  'dist/es/rss.xml',
  'dist/sitemap.xml',
  'dist/404.html',
];

const missing = requiredPaths.filter((path) => !existsSync(path));
if (missing.length > 0) {
  throw new Error(`Missing expected build outputs:\n${missing.join('\n')}`);
}

const forbiddenPaths = [
  'dist/es/articles/static-astro/index.html',
  'dist/en/articles/draft-note/index.html',
  'dist/es/articles/draft-note/index.html',
];
const unexpected = forbiddenPaths.filter((path) => existsSync(path));
if (unexpected.length > 0) {
  throw new Error(`Unexpected build outputs found:\n${unexpected.join('\n')}`);
}

const englishHome = readFileSync(join('dist', 'en', 'index.html'), 'utf8');
const spanishHome = readFileSync(join('dist', 'es', 'index.html'), 'utf8');
const englishFeed = readFileSync(join('dist', 'en', 'rss.xml'), 'utf8');
const spanishFeed = readFileSync(join('dist', 'es', 'rss.xml'), 'utf8');
const sitemap = readFileSync(join('dist', 'sitemap.xml'), 'utf8');

const assertions = [
  [
    englishHome.includes('hreflang="es"'),
    'English home should include Spanish hreflang',
  ],
  [
    spanishHome.includes('hreflang="en"'),
    'Spanish home should include English hreflang',
  ],
  [
    englishFeed.includes('Why static Astro fits this blog'),
    'English RSS should include English-only article',
  ],
  [
    !spanishFeed.includes('Why static Astro fits this blog'),
    'Spanish RSS should exclude English-only article',
  ],
  [!sitemap.includes('draft-note'), 'Sitemap should exclude draft content'],
  [
    sitemap.includes('/en/articles/welcome/'),
    'Sitemap should include English welcome article',
  ],
  [
    sitemap.includes('/es/articles/welcome/'),
    'Sitemap should include Spanish welcome article',
  ],
];

const failures = assertions
  .filter(([passed]) => !passed)
  .map(([, message]) => message);
if (failures.length > 0) {
  throw new Error(`Build validation failed:\n${failures.join('\n')}`);
}

console.log('Build output validation passed.');
