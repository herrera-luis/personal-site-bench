import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { LOCALES, type Locale, t, LOCALE_TAGS } from "../../i18n/utils";
import { getPublishedArticles, articlePath } from "../../lib/blog";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

export async function GET(context: APIContext) {
  const locale = context.params.locale as Locale;
  const articles = await getPublishedArticles(locale);

  return rss({
    title: t(locale, "site.title"),
    description: t(locale, "site.description"),
    site: context.site!,
    customData: `<language>${LOCALE_TAGS[locale]}</language>`,
    items: articles.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      link: articlePath(entry),
    })),
  });
}
