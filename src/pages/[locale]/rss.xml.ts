import rss from '@astrojs/rss';
import type { APIRoute, GetStaticPaths } from 'astro';
import { locales, type Locale, isLocale, t } from '../../i18n/ui';
import { absoluteUrl, localizedPath } from '../../i18n/utils';
import { getArticlesByLocale, articlePath } from '../../lib/articles';

export const getStaticPaths = (() => {
  return locales.map((locale) => ({ params: { locale } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params, site }) => {
  const locale = params.locale;
  if (!isLocale(locale)) {
    return new Response('Not found', { status: 404 });
  }
  const typedLocale: Locale = locale;
  const articles = await getArticlesByLocale(typedLocale);

  return rss({
    title: t(typedLocale, 'rss.title'),
    description: t(typedLocale, 'rss.description'),
    site: site ?? absoluteUrl(localizedPath(typedLocale)),
    items: articles.map((a) => ({
      title: a.entry.data.title,
      description: a.entry.data.description,
      pubDate: a.entry.data.pubDate,
      link: absoluteUrl(articlePath(a)),
    })),
  });
};
