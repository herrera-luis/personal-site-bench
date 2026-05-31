import { getCollection, type CollectionEntry } from 'astro:content';
import { isLocale, type Locale } from '../i18n/utils';

export type ArticleEntry = CollectionEntry<'articles'>;

export interface ParsedArticle {
  entry: ArticleEntry;
  slug: string;
  locale: Locale;
}

/**
 * Derive `{ slug, locale }` from a collection entry id of the form
 * `<slug>/<locale>` (e.g. `hello-bilingual-world/en`).
 */
export function parseArticleId(id: string): { slug: string; locale: string } {
  const parts = id.split('/');
  const locale = parts.pop() ?? '';
  const slug = parts.join('/');
  return { slug, locale };
}

/** All non-draft articles with parsed slug/locale, regardless of locale. */
export async function getAllArticles(): Promise<ParsedArticle[]> {
  const entries = await getCollection('articles', ({ data }) => data.draft !== true);
  const parsed: ParsedArticle[] = [];
  for (const entry of entries) {
    const { slug, locale } = parseArticleId(entry.id);
    if (isLocale(locale)) {
      parsed.push({ entry, slug, locale });
    }
  }
  return parsed;
}

/** Non-draft articles for one locale, sorted newest-first. */
export async function getArticles(locale: Locale): Promise<ParsedArticle[]> {
  const all = await getAllArticles();
  return all
    .filter((a) => a.locale === locale)
    .sort((a, b) => b.entry.data.pubDate.getTime() - a.entry.data.pubDate.getTime());
}
