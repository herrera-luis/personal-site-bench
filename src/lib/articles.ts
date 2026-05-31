import { getCollection, type CollectionEntry } from 'astro:content';
import { isLocale, type Locale } from '../config/site';

export type ArticleEntry = CollectionEntry<'articles'>;

/** Parse `<slug>/<locale>/README` style ids into { slug, locale }. */
export function parseArticleId(id: string): { slug: string; locale: Locale } | null {
  // id looks like: "hello-world/en/README" (no extension) or "hello-world/en"
  const parts = id.split('/').filter(Boolean);
  if (parts.length < 2) return null;
  const slug = parts[0];
  const localeSeg = parts[1];
  if (!isLocale(localeSeg)) return null;
  return { slug, locale: localeSeg };
}

export interface LoadedArticle {
  slug: string;
  locale: Locale;
  entry: ArticleEntry;
}

/**
 * Return published articles for a locale, newest first.
 * Drafts are excluded.
 */
export async function getArticlesByLocale(locale: Locale): Promise<LoadedArticle[]> {
  const all = await getCollection('articles');
  const items: LoadedArticle[] = [];
  for (const entry of all) {
    const parsed = parseArticleId(entry.id);
    if (!parsed) continue;
    if (parsed.locale !== locale) continue;
    if (entry.data.draft) continue;
    items.push({ slug: parsed.slug, locale: parsed.locale, entry });
  }
  items.sort(
    (a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime(),
  );
  return items;
}

/** Find a single article by slug + locale. */
export async function getArticle(
  slug: string,
  locale: Locale,
): Promise<LoadedArticle | undefined> {
  const all = await getCollection('articles');
  for (const entry of all) {
    const parsed = parseArticleId(entry.id);
    if (!parsed) continue;
    if (parsed.slug === slug && parsed.locale === locale) {
      return { slug, locale, entry };
    }
  }
  return undefined;
}
