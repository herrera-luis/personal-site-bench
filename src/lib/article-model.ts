import { z } from "zod";
import { isLocale, type Locale } from "../i18n/routes";

export const articleFrontmatterSchema = z.object({
  title: z.string().min(1),
  dek: z.string().min(1),
  date: z.coerce.date(),
  description: z.string().min(1),
  draft: z.boolean().default(false),
  layoutVariant: z.enum(["default", "wide"]).default("default"),
  showToc: z.boolean().default(false),
  eyebrow: z.string().optional(),
  components: z.array(z.string()).default([])
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

export type ArticleIdentity = {
  slug: string;
  locale: Locale;
};

export function parseArticleId(id: string): ArticleIdentity {
  const parts = id.split("/");
  const [slug, locale, fileName] = parts;

  if (!slug || !locale || !fileName || parts.length !== 3) {
    throw new Error(`Article id must use <slug>/<locale>/README.mdx: ${id}`);
  }

  if (!isLocale(locale)) {
    throw new Error(`Unsupported article locale: ${locale}`);
  }

  if (!/^(README\.mdx?|readme)$/i.test(fileName)) {
    throw new Error(`Article file must be README.mdx: ${id}`);
  }

  return { slug, locale };
}

export function sortNewestFirst<T extends { date: Date }>(articles: T[]): T[] {
  return [...articles].sort((a, b) => b.date.getTime() - a.date.getTime());
}
