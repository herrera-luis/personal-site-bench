import { defineCollection, z } from 'astro:content';

/**
 * Folder-per-article content model.
 *
 * Each article lives under `src/content/articles/<slug>/<locale>/README.mdx`.
 * Using the stable content collections API (type: 'content'), every MDX file
 * under `src/content/articles/` is loaded automatically. The generated entry
 * `slug` looks like `<slug>/<locale>/README`; helpers derive `slug` and
 * `locale` from it. Adding an article only requires creating one folder with
 * its per-locale files — no registry edits.
 */
const articles = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      dek: z.string(),
      date: z.coerce.date(),
      draft: z.boolean().optional().default(false),
      // Optional layout controls so an article can present a custom structure.
      variant: z.enum(['default', 'wide', 'custom']).optional().default('default'),
      showToc: z.boolean().optional().default(false),
      hero: image().optional(),
      heroAlt: z.string().optional(),
      externalProfile: z.string().url().optional(),
    }),
});

export const collections = { articles };
