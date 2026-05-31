import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Folder-per-article content model.
 *
 * Each article lives at `src/content/articles/<slug>/<locale>/README.mdx`, e.g.
 *   src/content/articles/hello-bilingual-world/en/README.mdx
 *   src/content/articles/hello-bilingual-world/es/README.mdx
 *
 * The generated entry id is `<slug>/<locale>` (the path with `/README.{md,mdx}`
 * stripped), from which `lib/articles.ts` derives the slug and locale.
 */
const articles = defineCollection({
  loader: glob({
    pattern: '**/{en,es}/README.{md,mdx}',
    base: './src/content/articles',
    generateId: ({ entry }) => entry.replace(/\/README\.mdx?$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    pubDate: z.coerce.date(),
    /** Widen the reading column on the article page. */
    wide: z.boolean().default(false),
    /** Hide the deck/subtitle on the article page. */
    hideDek: z.boolean().default(false),
    /** Exclude from listings and feeds. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
