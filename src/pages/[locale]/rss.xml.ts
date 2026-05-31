import rss from '@astrojs/rss';
import type { APIRoute, GetStaticPaths } from 'astro';
import { LOCALES, SITE, type Locale } from '../../config/site';
import { getArticlesByLocale } from '../../lib/articles';
import { ui } from '../../i18n/ui';
import { localizedPath } from '../../i18n/utils';

export const getStaticPaths: GetStaticPaths = () =>
  LOCALES.map((locale) => ({ params: { locale } }));

export const GET: APIRoute = async ({ params, site }) => {
  const locale = params.locale as Locale;
  const articles = await getArticlesByLocale(locale);
  const origin = site ?? new URL(SITE.origin);

  return rss({
    title: ui[locale]['rss.title'],
    description: ui[locale]['rss.description'],
    site: origin,
    items: articles.map((a) => ({
      title: a.entry.data.title,
      description: a.entry.data.description ?? a.entry.data.dek,
      pubDate: a.entry.data.date,
      link: localizedPath(locale, `articles/${a.slug}/`),
    })),
    customData: `<language>${locale}</language>`,
  });
};
