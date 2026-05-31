import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Folder-per-article model.
 *
 * Each article lives in `src/content/articles/<slug>/<locale>/README.mdx`.
 * The glob loader keys each entry by its path; we parse `<slug>` and `<locale>`
 * from the id (see src/lib/articles.ts). Adding an article requires ONLY
 * creating one folder with its per-locale README.mdx files.
 */
const articles = defineCollection({
  loader: glob({
    pattern: '*/*/README.{md,mdx}',
    base: './src/content/articles',
  }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    // Optional layout controls — let an article present a custom structure.
    wide: z.boolean().default(false),
    hideDek: z.boolean().default(false),
    ogImage: z.string().optional(),
  }),
});

export const collections = { articles };
