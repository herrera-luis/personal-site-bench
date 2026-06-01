import { getCollection, type CollectionEntry } from 'astro:content';
import { isLocale, type Locale } from '../i18n/dictionary';

export type ArticleEntry = CollectionEntry<'articles'>;

export type ArticleRecord = {
  entry: ArticleEntry;
  slug: string;
  locale: Locale;
};

export function parseArticleId(id: string): { slug: string; locale: Locale } {
  const parts = id.split('/');
  const slug = parts[0];
  const locale = parts[1];

  if (!slug || !isLocale(locale)) {
    throw new Error(`Article ${id} must follow articles/<slug>/<locale>/README.mdx`);
  }

  return { slug, locale };
}

export async function getArticles(): Promise<ArticleRecord[]> {
  const entries = await getCollection('articles');
  return entries.map((entry) => {
    const { slug, locale } = parseArticleId(entry.id);
    return { entry, slug, locale };
  });
}

export async function getArticlesByLocale(locale: Locale): Promise<ArticleRecord[]> {
  return (await getArticles())
    .filter((article) => article.locale === locale)
    .sort((a, b) => b.entry.data.pubDate.valueOf() - a.entry.data.pubDate.valueOf());
}

export async function getArticle(locale: Locale, slug: string): Promise<ArticleRecord | undefined> {
  return (await getArticles()).find((article) => article.locale === locale && article.slug === slug);
}
