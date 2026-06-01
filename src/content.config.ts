import { defineCollection, z } from 'astro:content';

const articleLocale = z.enum(['en', 'es']);

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    locale: articleLocale,
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    author: z.string().default('Luis Herrera'),
    image: z.string().optional(),
  }),
});

export const collections = { articles };
