import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/utils';

export type BlogEntry = CollectionEntry<'blog'>;

const isProd = import.meta.env.PROD;

/**
 * All non-draft (in production) blog entries for a locale, sorted newest-first.
 */
export async function getArticlesByLocale(lang: Locale): Promise<BlogEntry[]> {
  const entries = await getCollection('blog', ({ data }) => {
    if (data.lang !== lang) return false;
    if (isProd && data.draft) return false;
    return true;
  });
  return entries.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/**
 * The URL slug for an article, derived from its folder/file id with the
 * leading locale-agnostic path segments preserved (e.g. "hello-world").
 */
export function articleSlug(entry: BlogEntry): string {
  // Loader ids look like "hello-world/index" or "hello-world"; strip trailing
  // "/index" and any leading slashes so the public slug is clean.
  return entry.id.replace(/\/index$/, '').replace(/^\/+/, '');
}

/**
 * The public path for an article in its own locale, e.g. "/en/blog/slug/".
 */
export function articlePath(entry: BlogEntry): string {
  return `/${entry.data.lang}/blog/${articleSlug(entry)}/`;
}

/**
 * Find the counterpart of an article in the other locale by translationKey.
 * Returns undefined when no counterpart exists.
 */
export async function getTranslation(
  entry: BlogEntry,
  otherLang: Locale,
): Promise<BlogEntry | undefined> {
  const candidates = await getCollection('blog', ({ data }) => {
    if (data.lang !== otherLang) return false;
    if (isProd && data.draft) return false;
    return data.translationKey === entry.data.translationKey;
  });
  return candidates[0];
}
