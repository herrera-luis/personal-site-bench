import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { parseHTML } from 'linkedom';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const DIST = join(__dirname, '..', 'dist');
export const ORIGIN = 'https://personal-site.example';
export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

/** Read a file from dist. */
export function readDist(relPath: string): string {
  const full = join(DIST, relPath);
  return readFileSync(full, 'utf-8');
}

export function distExists(relPath: string): boolean {
  return existsSync(join(DIST, relPath));
}

/** Parse a dist HTML file into a queryable document. */
export function readDoc(relPath: string): Document {
  const html = readDist(relPath);
  const { document } = parseHTML(html);
  return document as unknown as Document;
}

/** Collect hreflang alternates from a parsed document. */
export function getHreflang(doc: Document): Record<string, string> {
  const out: Record<string, string> = {};
  doc.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => {
    const lang = el.getAttribute('hreflang')!;
    out[lang] = el.getAttribute('href')!;
  });
  return out;
}

/** Get the language-switcher anchor href(s) from a parsed document. */
export function getSwitcherHrefs(doc: Document): string[] {
  const hrefs: string[] = [];
  doc.querySelectorAll('.lang-switcher a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href) hrefs.push(href);
  });
  return hrefs;
}
