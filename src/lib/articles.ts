import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Locale } from '@/i18n/config';

export type ArticleEntry = CollectionEntry<'articles'>;

/**
 * Each entry has an `id` of the form `<slug>/<locale>/README.mdx`.
 * Derive the article slug from the leading path segment.
 */
export function getSlug(entry: ArticleEntry): string {
  return entry.id.split('/')[0];
}

/**
 * Return non-draft articles for a locale, sorted by `pubDate` descending.
 */
export async function getArticles(locale: Locale): Promise<ArticleEntry[]> {
  const all = await getCollection('articles');
  return all
    .filter((entry) => entry.data.locale === locale && entry.data.draft !== true)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Look up a single article entry by slug + locale.
 */
export async function getArticleEntry(
  slug: string,
  locale: Locale
): Promise<ArticleEntry | undefined> {
  const all = await getCollection('articles');
  return all.find(
    (entry) => entry.data.locale === locale && getSlug(entry) === slug
  );
}
