import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    layoutVariant: z.enum(['standard', 'wide']).default('standard'),
    showTableOfContents: z.boolean().default(false),
    ogImage: z.string().optional(),
  }),
});

export const collections = { articles };
