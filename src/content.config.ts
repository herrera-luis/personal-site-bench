import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Folder-per-article: each article lives in its own folder under
  // src/content/blog/<article>/index.mdx, co-locating its MDX body and assets.
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      lang: z.enum(['en', 'es']),
      // Stable id shared by the localized variants of the same article so the
      // language switcher and hreflang alternates can pair them.
      translationKey: z.string(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      heroImage: image().optional(),
    }),
});

export const collections = { blog };
