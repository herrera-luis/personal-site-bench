import { describe, expect, it } from "vitest";
import { canonicalUrl, hreflangAlternates, localizedPath, switchLocalePath } from "../src/i18n/routes";

describe("localized routes", () => {
  it("maps core routes for both locales", () => {
    expect(localizedPath("en", "home")).toBe("/en/");
    expect(localizedPath("es", "home")).toBe("/es/");
    expect(localizedPath("en", "about")).toBe("/en/about/");
    expect(localizedPath("es", "about")).toBe("/es/about/");
    expect(localizedPath("en", "articles")).toBe("/en/articles/");
    expect(localizedPath("es", "articles")).toBe("/es/articles/");
    expect(localizedPath("en", "article", "sample-note")).toBe("/en/articles/sample-note/");
    expect(localizedPath("es", "article", "sample-note")).toBe("/es/articles/sample-note/");
    expect(localizedPath("en", "rss")).toBe("/en/rss.xml");
    expect(localizedPath("es", "rss")).toBe("/es/rss.xml");
  });

  it("generates language switch targets", () => {
    expect(switchLocalePath("en", "home")).toBe("/es/");
    expect(switchLocalePath("es", "about")).toBe("/en/about/");
    expect(switchLocalePath("en", "article", "sample-note")).toBe("/es/articles/sample-note/");
  });

  it("generates canonical URLs and hreflang alternates", () => {
    expect(canonicalUrl("/en/about/")).toBe("https://personal-site.example/en/about/");
    expect(hreflangAlternates("article", "sample-note")).toEqual([
      { locale: "en", href: "https://personal-site.example/en/articles/sample-note/" },
      { locale: "es", href: "https://personal-site.example/es/articles/sample-note/" },
      { locale: "x-default", href: "https://personal-site.example/en/articles/sample-note/" }
    ]);
  });
});
