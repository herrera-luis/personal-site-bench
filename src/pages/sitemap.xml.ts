import type { APIContext } from 'astro';
import { getAllPublishedArticleSummaries } from '@/lib/articles';
import { absoluteUrl, localePath, locales } from '@/lib/i18n';

function urlEntry(
  path: string,
  alternates: Partial<Record<string, string>> = {},
) {
  const alternateLinks = Object.entries(alternates)
    .filter((entry): entry is [string, string] => typeof entry[1] === 'string')
    .map(
      ([locale, href]) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${absoluteUrl(href)}" />`,
    )
    .join('');

  return `<url><loc>${absoluteUrl(path)}</loc>${alternateLinks}</url>`;
}

export async function GET(_context: APIContext) {
  const staticPages = ['/', '/about/', '/articles/'];
  const urls: string[] = [];

  for (const page of staticPages) {
    const alternates = Object.fromEntries(
      locales.map((locale) => [locale, localePath(locale, page)]),
    );
    for (const locale of locales) {
      urls.push(urlEntry(localePath(locale, page), alternates));
    }
  }

  const articles = await getAllPublishedArticleSummaries();
  for (const article of articles) {
    urls.push(urlEntry(article.href, article.translations));
  }

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    },
  );
}
