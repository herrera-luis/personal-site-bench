// Post-build assertions over the generated static output.
//
// Run with: npm test  (after `npm run build`).
//
// The Vercel static adapter emits to `.vercel/output/static`; a plain Astro
// static build emits to `dist`. We auto-detect whichever exists so the runner
// works regardless of adapter.

import { readFile, access, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const thisDir = dirname(fileURLToPath(import.meta.url));
const root = join(thisDir, '..');

const CANDIDATE_DIRS = ['dist', '.vercel/output/static'];
const OUT = CANDIDATE_DIRS.map((d) => join(root, d)).find((d) => existsSync(d));

const SITE = 'https://personal-site.example';

let passed = 0;
let failed = 0;
const failures = [];

function ok(name) {
  passed += 1;
  console.log(`  PASS ${name}`);
}

function fail(name, detail) {
  failed += 1;
  failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
  console.error(`  FAIL ${name}${detail ? ` — ${detail}` : ''}`);
}

function assert(name, cond, detail) {
  if (cond) ok(name);
  else fail(name, detail);
}

async function read(rel) {
  return readFile(join(OUT, rel), 'utf8');
}

async function exists(rel) {
  try {
    await access(join(OUT, rel));
    return true;
  } catch {
    return false;
  }
}

// Count non-overlapping occurrences of a substring.
function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

// Extract the value of `attr=\"...\"` that immediately follows `marker`.
function attrAfter(html, marker, attr) {
  const start = html.indexOf(marker);
  if (start === -1) return null;
  const at = html.indexOf(`${attr}=\"`, start);
  if (at === -1) return null;
  const from = at + attr.length + 2;
  const end = html.indexOf('\"', from);
  if (end === -1) return null;
  return html.slice(from, end);
}

async function main() {
  console.log('\\nPost-build output tests');
  console.log(`Output directory: ${OUT ? OUT.replace(root + '/', '') : '(none found)'}\\n`);

  if (!OUT) {
    fail('A3 build output directory exists', `none of: ${CANDIDATE_DIRS.join(', ')}`);
    return report();
  }

  // ---- A. Build gate (A1/A2 enforced by the npm scripts; A3 here) ----
  console.log('A. Build output');
  assert('A3 root index.html exists', await exists('index.html'));
  assert('A3 per-locale trees exist', (await exists('en/index.html')) && (await exists('es/index.html')));

  // ---- B. Routing: both locales render ----
  console.log('B. Routing — both locales');
  for (const loc of ['en', 'es']) {
    const home = await read(`${loc}/index.html`);
    assert(`B1 ${loc} home has identity strip (site name)`, home.includes('Personal Site'));
    assert(`B1 ${loc} home has [roles] tagline`, home.includes('[') && home.includes(']'));
  }
  const enAbout = await read('en/about/index.html');
  const esAbout = await read('es/about/index.html');
  assert('B2 en about has bio', enAbout.includes('software engineer'));
  assert('B2 es about has Spanish bio', esAbout.includes('ingeniero de software'));
  assert('B3 en articles index exists', await exists('en/articles/index.html'));
  assert('B3 es articles index exists', await exists('es/articles/index.html'));

  const enArt = await read('en/articles/hello-world/index.html');
  const esArt = await read('es/articles/hello-world/index.html');
  assert('B4 en article exists', await exists('en/articles/hello-world/index.html'));
  assert('B4 es article exists', await exists('es/articles/hello-world/index.html'));
  assert('B4 en article has <h1>', enArt.includes('<h1>'));
  assert('B4 en article has <h3> dek', enArt.includes('class=\"dek\"') && enArt.includes('<h3'));
  assert('B4 en article has meta line', enArt.includes('class=\"meta\"') && enArt.includes('Published'));
  assert('B4 en article has Callout output', enArt.includes('class=\"callout\"'));
  assert('B4 es article has Callout output', esArt.includes('class=\"callout\"'));
  assert('B4 es article meta localized', esArt.includes('Publicado'));

  // B5: the localized empty-state strings are defined in the dictionary (the
  // listing pages render them in the zero-article branch).
  const uiSrc = await readFile(join(root, 'src/i18n/ui.ts'), 'utf8');
  assert(
    'B5 empty-state strings defined (en+es)',
    uiSrc.includes('No articles published yet') && uiSrc.includes('Aún no hay artículos')
  );

  // ---- C. Root redirect, JS-free ----
  console.log('C. Root redirect (JS-free)');
  const rootHtml = await read('index.html');
  const refreshTarget = attrAfter(rootHtml, 'http-equiv=\"refresh\"', 'content');
  assert('C1 root has meta-refresh redirect', !!refreshTarget, 'no meta refresh found');
  if (refreshTarget) {
    const urlIdx = refreshTarget.indexOf('url=');
    const url = urlIdx === -1 ? '' : refreshTarget.slice(urlIdx + 4);
    assert('C1 redirect target is /en/', url.replace(SITE, '').startsWith('/en/'), url);
  }
  assert('C1 redirect has no <script', !rootHtml.toLowerCase().includes('<script'));

  // ---- D. hreflang alternates ----
  console.log('D. hreflang alternates');
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
  for (const p of pages) {
    const html = await read(p);
    const enAlt = attrAfter(html, 'hreflang=\"en\"', 'href');
    const esAlt = attrAfter(html, 'hreflang=\"es\"', 'href');
    const xAlt = attrAfter(html, 'hreflang=\"x-default\"', 'href');
    const total = count(html, 'rel=\"alternate\" hreflang=\"');
    assert(`D1 ${p} has exactly 3 hreflang alternates`, total === 3, `found ${total}`);
    assert(`D2 ${p} x-default == en URL`, !!enAlt && !!xAlt && enAlt === xAlt);
    if (enAlt && esAlt) {
      const enPath = enAlt.replace(SITE, '');
      const esPath = esAlt.replace(SITE, '');
      assert(`D3 ${p} en alt is absolute`, enAlt.startsWith(SITE));
      // Path-preserving: identical once the leading locale segment is masked.
      const maskedEn = enPath.startsWith('/en/') ? '/X/' + enPath.slice(4) : enPath;
      const maskedEs = esPath.startsWith('/es/') ? '/X/' + esPath.slice(4) : esPath;
      assert(`D3 ${p} en/es alts are locale-swapped counterparts`, maskedEn === maskedEs);
    } else {
      fail(`D3 ${p} has en+es alternates`);
    }
  }

  // ---- E. Language switcher (path-preserving, JS-free) ----
  console.log('E. Language switcher');
  function switcherHref(html) {
    return attrAfter(html, 'class=\"lang-switcher\"', 'href');
  }
  assert('E1 en article switcher -> /es/articles/hello-world/', switcherHref(enArt) === '/es/articles/hello-world/', switcherHref(enArt));
  assert('E1 es article switcher -> /en/articles/hello-world/', switcherHref(esArt) === '/en/articles/hello-world/', switcherHref(esArt));
  assert('E2 en home switcher -> /es/', switcherHref(await read('en/index.html')) === '/es/');
  assert('E2 es home switcher -> /en/', switcherHref(await read('es/index.html')) === '/en/');
  assert('E3 en about switcher -> /es/about/', switcherHref(enAbout) === '/es/about/');
  assert('E3 es about switcher -> /en/about/', switcherHref(esAbout) === '/en/about/');
  // E4: switcher block contains a real href and no inline JS handler.
  const switcherStart = enArt.indexOf('class=\"lang-switcher\"');
  const switcherSlice = switcherStart === -1 ? '' : enArt.slice(switcherStart, switcherStart + 160);
  assert('E4 switcher has no onclick/JS', !switcherSlice.toLowerCase().includes('onclick'));

  // ---- F. Per-locale RSS ----
  console.log('F. Per-locale RSS');
  assert('F1 en/rss.xml exists', await exists('en/rss.xml'));
  assert('F1 es/rss.xml exists', await exists('es/rss.xml'));
  const enRss = await read('en/rss.xml');
  const esRss = await read('es/rss.xml');
  assert('F1 en rss well-formed', enRss.includes('<rss') && enRss.includes('<channel>'));
  assert('F1 es rss well-formed', esRss.includes('<rss') && esRss.includes('<channel>'));
  assert('F2 en channel uses English strings', enRss.includes('<title>Personal Site — Articles</title>'));
  assert('F2 es channel uses Spanish strings', esRss.includes('<title>Personal Site — Artículos</title>'));
  assert('F3 en item link is en locale URL', enRss.includes(`${SITE}/en/articles/hello-world/`));
  assert('F3 es item link is es locale URL', esRss.includes(`${SITE}/es/articles/hello-world/`));
  assert('F3 en/es feeds differ for same article', enRss.includes('Hello, World') && esRss.includes('Hola, mundo'));

  // ---- G. Sitemap + SEO ----
  console.log('G. Sitemap + SEO');
  assert('G1 sitemap-index.xml exists', await exists('sitemap-index.xml'));
  assert('G1 sitemap-0.xml exists', await exists('sitemap-0.xml'));
  const sm = await read('sitemap-0.xml');
  assert('G1 sitemap has en + es URLs', sm.includes(`${SITE}/en/`) && sm.includes(`${SITE}/es/`));
  const enHome = await read('en/index.html');
  const esHome = await read('es/index.html');
  assert('G2 en title localized', enHome.includes('<title>') && enHome.includes('Home</title>'));
  assert('G2 es title localized', esHome.includes('<title>') && esHome.includes('Inicio</title>'));
  assert('G2 en has meta description', enHome.includes('<meta name=\"description\" content=\"'));
  assert('G2 en og:locale en_US', enHome.includes('property=\"og:locale\" content=\"en_US\"'));
  assert('G2 es og:locale es_ES', esHome.includes('property=\"og:locale\" content=\"es_ES\"'));

  // ---- H. Progressive enhancement / a11y ----
  console.log('H. Progressive enhancement / a11y');
  let scriptCount = 0;
  for (const p of pages) {
    const html = await read(p);
    scriptCount += count(html.toLowerCase(), '<script');
  }
  assert('H1 no <script> tags required for nav/switcher/redirect', scriptCount === 0, `found ${scriptCount}`);
  assert('H2 html lang set per locale', enHome.includes('<html lang=\"en\"') && esHome.includes('<html lang=\"es\"'));
  assert('H2 skip-to-content link present', enHome.includes('class=\"skip-link\"'));

  // ---- I. Content model invariant ----
  console.log('I. Content model invariant');
  // The sample article produced routes for BOTH locales from a single folder
  // with NO per-article route file (the dynamic [slug] route handles it).
  const pagesDir = join(root, 'src/pages/[lang]/articles');
  const routeFiles = await readdir(pagesDir);
  assert(
    'I1 only dynamic [slug] + index routes (no per-article files)',
    routeFiles.sort().join(',') === '[slug].astro,index.astro',
    routeFiles.join(',')
  );
  assert(
    'I1 single folder yields both-locale routes',
    (await exists('en/articles/hello-world/index.html')) &&
      (await exists('es/articles/hello-world/index.html'))
  );

  return report();
}

function report() {
  console.log(`\\n${passed} passed, ${failed} failed\\n`);
  if (failed > 0) {
    console.error('FAILED:');
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log('All post-build tests passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
