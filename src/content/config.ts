import { defineCollection, z } from 'astro:content';

/**
 * Folder-per-article content model.
 * Each article lives at `src/content/articles/<slug>/<locale>/README.mdx`.
 * Using the stable content-collections API (type: 'content') keeps content
 * under `src/content/` and yields slugs like `<slug>/<locale>/README`, from
 * which we derive the article slug + locale.
 */
const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional().default(false),
    // Optional layout controls that let an article vary its structure.
    wide: z.boolean().optional().default(false),
    showToc: z.boolean().optional().default(false),
    layoutVariant: z.enum(['default', 'feature']).optional().default('default'),
    profileLink: z.string().url().optional(),
  }),
});

export const collections = { articles };
