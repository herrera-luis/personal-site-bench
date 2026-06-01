import rss from '@astrojs/rss';
import { absoluteUrl, dictionary, getLocale, locales } from '../../i18n';
import { getArticleDescription, getArticles } from '../../lib/articles';

export function getStaticPaths() {
  return locales.map((locale) => ({ params: { locale } }));
}

export function GET({ params }: { params: { locale?: string } }) {
  const locale = getLocale(params.locale);
  const t = dictionary[locale];
  const articles = getArticles(locale);

  return rss({
    title: t.rss.title,
    description: t.rss.description,
    site: absoluteUrl(`/${locale}/`),
    items: articles.map((article) => ({
      title: article.title,
      description: getArticleDescription(article),
      pubDate: article.date,
      link: `/${locale}/articles/${article.slug}/`,
    })),
    customData: `<language>${locale}</language>`,
  });
}
