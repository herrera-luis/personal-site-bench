import { getCollection, type CollectionEntry } from "astro:content";
import { parseArticleId, sortNewestFirst } from "./article-model";
import type { Locale } from "../i18n/routes";

export type ArticleEntry = CollectionEntry<"articles">;

export type LocalizedArticle = {
  slug: string;
  locale: Locale;
  title: string;
  dek: string;
  date: Date;
  description: string;
  draft: boolean;
  layoutVariant: "default" | "wide";
  showToc: boolean;
  eyebrow?: string;
  components: string[];
  entry: ArticleEntry;
};

export function normalizeArticle(entry: ArticleEntry): LocalizedArticle {
  const identity = parseArticleId(entry.id);
  return {
    ...identity,
    title: entry.data.title,
    dek: entry.data.dek,
    date: entry.data.date,
    description: entry.data.description,
    draft: entry.data.draft,
    layoutVariant: entry.data.layoutVariant,
    showToc: entry.data.showToc,
    eyebrow: entry.data.eyebrow,
    components: entry.data.components,
    entry
  };
}

export async function getAllArticles(): Promise<LocalizedArticle[]> {
  const entries = await getCollection("articles", ({ data }) => !data.draft);
  return sortNewestFirst(entries.map(normalizeArticle));
}

export async function getArticlesByLocale(locale: Locale): Promise<LocalizedArticle[]> {
  const articles = await getAllArticles();
  return articles.filter((article) => article.locale === locale);
}

export async function getArticle(locale: Locale, slug: string): Promise<LocalizedArticle | undefined> {
  const articles = await getArticlesByLocale(locale);
  return articles.find((article) => article.slug === slug);
}

export async function getAvailableArticleLocales(slug: string): Promise<Locale[]> {
  const articles = await getAllArticles();
  return articles.filter((article) => article.slug === slug).map((article) => article.locale);
}
