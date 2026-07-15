import { getCollection, type CollectionEntry } from 'astro:content';
import { isLocale, type Locale } from '../i18n/ui';
import { localizedPath } from '../i18n/utils';

export type ArticleEntry = CollectionEntry<'articles'>;

export interface Article {
  entry: ArticleEntry;
  locale: Locale;
  slug: string;
}

// Glob loader ids look like "en/my-slug/index". Parse locale + slug from it.
function parseId(id: string): { locale: Locale; slug: string } | null {
  const parts = id.split('/');
  const locale = parts[0];
  if (!isLocale(locale)) return null;
  const rest = parts.slice(1);
  // Drop a trailing "index" segment if present.
  if (rest.length > 0 && rest[rest.length - 1] === 'index') {
    rest.pop();
  }
  const slug = rest.join('/');
  if (!slug) return null;
  return { locale, slug };
}

const isProd = import.meta.env.PROD;

/** All published articles (drafts excluded in production builds). */
export async function getAllArticles(): Promise<Article[]> {
  const entries = await getCollection('articles', ({ data }) => {
    return isProd ? data.draft !== true : true;
  });

  const articles: Article[] = [];
  for (const entry of entries) {
    const parsed = parseId(entry.id);
    if (!parsed) continue;
    articles.push({ entry, locale: parsed.locale, slug: parsed.slug });
  }
  return articles;
}

/** Published articles for a locale, sorted newest-first by pubDate. */
export async function getArticlesByLocale(locale: Locale): Promise<Article[]> {
  const all = await getAllArticles();
  return all
    .filter((a) => a.locale === locale)
    .sort((a, b) => b.entry.data.pubDate.valueOf() - a.entry.data.pubDate.valueOf());
}

/** Site-root-relative URL for an article. */
export function articlePath(article: Pick<Article, 'locale' | 'slug'>): string {
  return localizedPath(article.locale, `articles/${article.slug}`);
}

/**
 * Resolve the counterpart of an article in the target locale via the shared
 * translationKey. Returns undefined if no counterpart exists.
 */
export async function getTranslation(
  translationKey: string,
  targetLocale: Locale,
): Promise<Article | undefined> {
  const all = await getAllArticles();
  return all.find(
    (a) => a.locale === targetLocale && a.entry.data.translationKey === translationKey,
  );
}
