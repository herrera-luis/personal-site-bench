import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  // Folder-per-article: src/content/articles/<slug>/<locale>/README.mdx
  type: 'content',
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    pubDate: z.coerce.date(),
    locale: z.enum(['en', 'es']),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
    layoutVariant: z.enum(['default', 'wide', 'feature']).default('default'),
    showToc: z.boolean().default(false),
  }),
});

export const collections = { articles };
