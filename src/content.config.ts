import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { articleFrontmatterSchema } from "./lib/article-model";

const articles = defineCollection({
  loader: glob({ pattern: "**/README.mdx", base: "./src/content/articles" }),
  schema: articleFrontmatterSchema
});

export const collections = { articles };
