import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../config/site';

export type ArticleEntry = CollectionEntry<'articles'>;

/** Derive the slug (folder name) from an entry slug like `hello-world/en/README`. */
export function articleSlug(entry: ArticleEntry): string {
  return entry.slug.split('/')[0];
}

/** Derive the locale from an entry slug like `hello-world/en/README`. */
export function articleLocale(entry: ArticleEntry): Locale {
  return entry.slug.split('/')[1] as Locale;
}

/** All non-draft articles for a locale, sorted reverse-chronologically. */
export async function getArticlesForLocale(locale: Locale): Promise<ArticleEntry[]> {
  const all = await getCollection('articles', (entry) => {
    return articleLocale(entry) === locale && entry.data.draft !== true;
  });
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Every (locale, slug) pair for building static article paths. */
export async function getAllArticleEntries(): Promise<ArticleEntry[]> {
  return getCollection('articles', (entry) => entry.data.draft !== true);
}
