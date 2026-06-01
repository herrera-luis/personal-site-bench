import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import { articlePath, type Locale } from './i18n';

export type ArticleEntry = CollectionEntry<'articles'>;

export interface ArticleSummary {
  entry: ArticleEntry;
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  href: string;
  hasTranslation: boolean;
  translations: Partial<Record<Locale, string>>;
}

function normalizeEntryId(id: string): string {
  return id.replace(/\.mdx$/, '');
}

export function getArticleSlug(entry: ArticleEntry): string {
  const parts = normalizeEntryId(entry.id).split('/');
  return parts.slice(0, -1).join('/');
}

export function getArticleLocale(entry: ArticleEntry): Locale {
  const locale = normalizeEntryId(entry.id).split('/').at(-1);
  if (locale !== 'en' && locale !== 'es') {
    throw new Error(`Article ${entry.id} must be stored as en.mdx or es.mdx`);
  }
  if (entry.data.locale !== locale) {
    throw new Error(
      `Article ${entry.id} frontmatter locale must match its filename`,
    );
  }
  return locale;
}

function isPublished(entry: ArticleEntry): boolean {
  return !entry.data.draft;
}

export async function getPublishedArticleEntries(): Promise<ArticleEntry[]> {
  const entries = await getCollection('articles');
  return entries.filter(isPublished);
}

export async function getArticlesByLocale(
  locale: Locale,
): Promise<ArticleSummary[]> {
  const entries = await getPublishedArticleEntries();
  const summaries = entries
    .filter((entry) => getArticleLocale(entry) === locale)
    .map((entry) => toArticleSummary(entry, entries))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return summaries;
}

export async function getArticleByLocaleAndSlug(
  locale: Locale,
  slug: string,
): Promise<ArticleEntry | undefined> {
  const entries = await getPublishedArticleEntries();
  return entries.find(
    (entry) =>
      getArticleLocale(entry) === locale && getArticleSlug(entry) === slug,
  );
}

export function toArticleSummary(
  entry: ArticleEntry,
  allEntries: ArticleEntry[],
): ArticleSummary {
  const locale = getArticleLocale(entry);
  const slug = getArticleSlug(entry);
  const relatedEntries = allEntries.filter(
    (candidate) => getArticleSlug(candidate) === slug,
  );
  const translations = Object.fromEntries(
    relatedEntries.map((candidate) => [
      getArticleLocale(candidate),
      articlePath(getArticleLocale(candidate), slug),
    ]),
  ) as Partial<Record<Locale, string>>;

  return {
    entry,
    slug,
    locale,
    title: entry.data.title,
    description: entry.data.description,
    pubDate: entry.data.pubDate,
    updatedDate: entry.data.updatedDate,
    href: articlePath(locale, slug),
    hasTranslation: relatedEntries.length > 1,
    translations,
  };
}

export async function getArticleTranslations(
  slug: string,
): Promise<Partial<Record<Locale, string>>> {
  const entries = await getPublishedArticleEntries();
  return Object.fromEntries(
    entries
      .filter((entry) => getArticleSlug(entry) === slug)
      .map((entry) => [
        getArticleLocale(entry),
        articlePath(getArticleLocale(entry), slug),
      ]),
  ) as Partial<Record<Locale, string>>;
}

export async function getAllPublishedArticleSummaries(): Promise<
  ArticleSummary[]
> {
  const entries = await getPublishedArticleEntries();
  return entries.map((entry) => toArticleSummary(entry, entries));
}
