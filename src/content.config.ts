import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Folder-per-article content model. Each article lives in its own directory
// under a locale, e.g. src/content/articles/en/<slug>/index.mdx, holding the
// MDX body and any co-located assets.
const articles = defineCollection({
  loader: glob({
    pattern: '**/index.{md,mdx}',
    base: './src/content/articles',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Stable identifier shared across an article's language versions so the
    // language switcher can deep-link translations.
    translationKey: z.string(),
  }),
});

export const collections = { articles };
