import { describe, expect, it } from "vitest";
import { articleFrontmatterSchema, parseArticleId, sortNewestFirst } from "../src/lib/article-model";

describe("article model", () => {
  it("derives slug and locale from nested README ids", () => {
    expect(parseArticleId("sample-note/en/README.mdx")).toEqual({ slug: "sample-note", locale: "en" });
    expect(parseArticleId("sample-note/es/README.mdx")).toEqual({ slug: "sample-note", locale: "es" });
  });

  it("rejects missing required frontmatter", () => {
    const result = articleFrontmatterSchema.safeParse({ title: "Missing fields" });
    expect(result.success).toBe(false);
  });

  it("applies optional frontmatter defaults", () => {
    const result = articleFrontmatterSchema.parse({
      title: "Title",
      dek: "Dek",
      date: "2026-01-10",
      description: "Description"
    });

    expect(result.draft).toBe(false);
    expect(result.layoutVariant).toBe("default");
    expect(result.showToc).toBe(false);
    expect(result.components).toEqual([]);
  });

  it("sorts articles reverse chronologically", () => {
    const sorted = sortNewestFirst([
      { slug: "older", date: new Date("2025-01-01") },
      { slug: "newer", date: new Date("2026-01-01") }
    ]);

    expect(sorted.map((article) => article.slug)).toEqual(["newer", "older"]);
  });
});
