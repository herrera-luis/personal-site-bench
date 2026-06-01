import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function dist(path: string) {
  return readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
}

describe("feeds and sitemap", () => {
  it("generates localized RSS feeds", () => {
    const en = dist("en/rss.xml");
    const es = dist("es/rss.xml");

    expect(en).toContain("Personal Site articles in English");
    expect(en).toContain("/en/articles/sample-note/");
    expect(en).not.toContain("/es/articles/sample-note/");

    expect(es).toContain("Articulos de Personal Site en espanol");
    expect(es).toContain("/es/articles/sample-note/");
    expect(es).not.toContain("/en/articles/sample-note/");
  });

  it("generates a sitemap with localized routes", () => {
    const sitemap = dist("sitemap-0.xml");

    expect(sitemap).toContain("https://personal-site.example/en/");
    expect(sitemap).toContain("https://personal-site.example/es/");
    expect(sitemap).toContain("https://personal-site.example/en/about/");
    expect(sitemap).toContain("https://personal-site.example/es/about/");
    expect(sitemap).toContain("https://personal-site.example/en/articles/");
    expect(sitemap).toContain("https://personal-site.example/es/articles/");
    expect(sitemap).toContain("https://personal-site.example/en/articles/sample-note/");
    expect(sitemap).toContain("https://personal-site.example/es/articles/sample-note/");
  });
});
