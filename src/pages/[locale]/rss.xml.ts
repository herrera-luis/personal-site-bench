import rss from "@astrojs/rss";
import { dictionary } from "../../i18n/dictionary";
import { locales, localizedPath, localizedUrl, parseLocale } from "../../i18n/routes";
import { getArticlesByLocale } from "../../lib/articles";

export function getStaticPaths() {
  return locales.map((locale) => ({ params: { locale } }));
}

export async function GET(context: { params: { locale?: string } }) {
  const locale = parseLocale(context.params.locale);
  const labels = dictionary[locale];
  const articles = await getArticlesByLocale(locale);

  return rss({
    title: labels.rss.title,
    description: labels.rss.description,
    site: localizedUrl(locale, "home"),
    items: articles.map((article) => ({
      title: article.title,
      description: article.description,
      pubDate: article.date,
      link: localizedPath(locale, "article", article.slug)
    }))
  });
}
