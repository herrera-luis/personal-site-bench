import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

/**
 * Resolve the static build output directory. The @astrojs/vercel (static)
 * adapter emits to `.vercel/output/static`; a plain static build emits `dist`.
 */
function resolveDist() {
  const candidates = [
    path.join(ROOT, '.vercel', 'output', 'static'),
    path.join(ROOT, 'dist'),
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return candidates[0];
}

export const DIST = resolveDist();
export const LOCALES = ['en', 'es'];

export function distPath(...parts) {
  return path.join(DIST, ...parts);
}

export function pageFile(locale, ...parts) {
  return distPath(locale, ...parts, 'index.html');
}

export function exists(p) {
  return existsSync(p);
}

export async function read(p) {
  return readFile(p, 'utf8');
}

/** Extract the value of the `lang` attribute on the <html> tag. */
export function getHtmlLang(html) {
  const m = html.match(/<html[^>]*\blang="([^"]+)"/i);
  return m ? m[1] : null;
}

/** Collect all <link rel="alternate" hreflang="..."> entries. */
export function getHreflangLinks(html) {
  const out = [];
  const re = /<link[^>]*rel="alternate"[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0];
    const hl = tag.match(/hreflang="([^"]+)"/i);
    const href = tag.match(/href="([^"]+)"/i);
    if (hl && href) out.push({ hreflang: hl[1], href: href[1] });
  }
  return out;
}

export function getCanonical(html) {
  const m = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i);
  return m ? m[1] : null;
}

/** Return the language-switcher href for a given target locale. */
export function getLangSwitchHref(html, targetLocale) {
  const re = new RegExp(`<a[^>]*data-lang-switch="${targetLocale}"[^>]*>`, 'i');
  const m = html.match(re);
  if (!m) return null;
  const href = m[0].match(/href="([^"]+)"/i);
  return href ? href[1] : null;
}

export function countMatches(html, re) {
  const matches = html.match(re);
  return matches ? matches.length : 0;
}
