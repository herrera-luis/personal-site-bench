import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { LOCALES } from "../i18n/utils";

/**
 * Folder-per-article content model.
 *
 * Each article lives in its own folder under `src/content/blog/<folder>/`
 * with one MDX entry per locale (e.g. `en.mdx`, `es.mdx`) and any co-located
 * assets. The entry `id` therefore looks like "hello-world/en".
 *
 * Translations are linked across locales by a shared `translationKey`.
 */
const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    // Required fields — build fails if any are missing.
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    locale: z.enum(LOCALES),
    translationKey: z.string(),
    // Optional fields with documented defaults.
    slug: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
  }),
});

export const collections = { blog };
