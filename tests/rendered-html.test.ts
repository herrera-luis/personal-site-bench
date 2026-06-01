import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function html(path: string) {
  return readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
}

describe("rendered HTML", () => {
  it("renders a static root redirect", () => {
    const root = html("index.html");
    expect(root).toContain("url=/en/");
    expect(root).toContain("Continue to Personal Site");
  });

  it("renders localized home pages with shell and article links", () => {
    const en = html("en/index.html");
    const es = html("es/index.html");

    expect(en).toContain("Personal Site");
    expect(en).toContain("[writer / builder / observer]");
    expect(en).toContain("A Small Note About Durable Pages");
    expect(en).toContain("href=\"/es/\"");
    expect(en).toContain("hreflang=\"x-default\"");
    expect(en).toContain("RSS feed");

    expect(es).toContain("Notas para una web mas pausada");
    expect(es).toContain("Una Nota Breve Sobre Paginas Duraderas");
    expect(es).toContain("href=\"/en/\"");
    expect(es).toContain("Feed RSS");
  });

  it("renders about pages without forbidden sections", () => {
    const en = html("en/about/index.html");
    const es = html("es/about/index.html");

    expect(en).toContain("About this site");
    expect(es).toContain("Acerca de este sitio");
    expect(en + es).not.toMatch(/subscribe|contact form|course|company/i);
  });

  it("renders localized article pages with metadata and language alternates", () => {
    const en = html("en/articles/sample-note/index.html");
    const es = html("es/articles/sample-note/index.html");

    expect(en).toContain("<h1>A Small Note About Durable Pages</h1>");
    expect(en).toContain("<h3>Static pages can still feel alive");
    expect(en).toContain("Published");
    expect(en).toContain("Design principle");
    expect(en).toContain("href=\"/es/articles/sample-note/\"");
    expect(en).toContain("https://personal-site.example/en/articles/sample-note/");
    expect(en).toContain("hreflang=\"en\"");
    expect(en).toContain("hreflang=\"es\"");
    expect(en).toContain("hreflang=\"x-default\"");

    expect(es).toContain("<h1>Una Nota Breve Sobre Paginas Duraderas</h1>");
    expect(es).toContain("Publicado");
    expect(es).toContain("Principio de diseno");
    expect(es).toContain("href=\"/en/articles/sample-note/\"");
  });
});
