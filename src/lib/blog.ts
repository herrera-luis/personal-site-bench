import { getCollection, type CollectionEntry } from "astro:content";
import { type Locale, isLocale, localizedPath } from "../i18n/utils";

export type BlogEntry = CollectionEntry<"blog">;

/** The folder name an entry lives in, e.g. id "hello-world/en" -> "hello-world". */
export function folderOf(entry: BlogEntry): string {
  return entry.id.split("/")[0];
}

/**
 * Derive an article's URL slug: explicit frontmatter `slug` wins, otherwise the
 * article folder name is used.
 */
export function slugOf(entry: BlogEntry): string {
  return entry.data.slug ?? folderOf(entry);
}

/** The locale-prefixed, trailing-slashed URL for an article. */
export function articlePath(entry: BlogEntry): string {
  return localizedPath(entry.data.locale, "blog", slugOf(entry));
}

/** All non-draft entries for a locale, newest first. */
export async function getPublishedArticles(locale: Locale): Promise<BlogEntry[]> {
  const all = await getCollection("blog", ({ data }) => {
    return data.locale === locale && data.draft !== true;
  });
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** All published entries across every locale (used to enumerate routes). */
export async function getAllPublishedArticles(): Promise<BlogEntry[]> {
  const all = await getCollection("blog", ({ data }) => data.draft !== true);
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Resolve the article path for the same `translationKey` in another locale.
 * Returns null when no counterpart exists (article only in one language).
 */
export async function translationPath(
  translationKey: string,
  targetLocale: Locale,
): Promise<string | null> {
  if (!isLocale(targetLocale)) return null;
  const matches = await getCollection("blog", ({ data }) => {
    return data.translationKey === translationKey && data.locale === targetLocale;
  });
  const match = matches[0];
  return match ? articlePath(match) : null;
}
