import { getCollection, type CollectionEntry } from 'astro:content';
import { isLocale, type Locale } from './ui';

export type ArticleEntry = CollectionEntry<'articles'>;

/**
 * Legacy collection slugs look like `<slug>/<locale>/README`.
 * Parse the article slug and locale out of it.
 */
export function parseArticleSlug(entrySlug: string): { slug: string; locale: Locale } | null {
  const parts = entrySlug.split('/');
  if (parts.length < 2) return null;
  const localeCandidate = parts[1];
  if (!isLocale(localeCandidate)) return null;
  return { slug: parts[0], locale: localeCandidate };
}

/** All non-draft articles for a locale, most recent first. */
export async function getArticlesForLocale(locale: Locale): Promise<
  Array<{ slug: string; locale: Locale; entry: ArticleEntry }>
> {
  const all = await getCollection('articles', ({ data }) => data.draft !== true);
  const forLocale = all
    .map((entry) => {
      const parsed = parseArticleSlug(entry.slug);
      return parsed && parsed.locale === locale
        ? { slug: parsed.slug, locale: parsed.locale, entry }
        : null;
    })
    .filter((v): v is { slug: string; locale: Locale; entry: ArticleEntry } => v !== null);

  forLocale.sort((a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime());
  return forLocale;
}
