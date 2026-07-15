import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import type { Locale } from '../../config/site';
import { LOCALES, SITE } from '../../config/site';
import { useTranslations } from '../../i18n/utils';
import { getArticlesForLocale, articleSlug } from '../../i18n/articles';

export function getStaticPaths() {
  return LOCALES.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async ({ params, site }) => {
  const locale = params.lang as Locale;
  const t = useTranslations(locale);
  const articles = await getArticlesForLocale(locale);
  const origin = site ?? new URL(SITE.url);

  return rss({
    title: `${SITE.name} (${locale})`,
    description: t('articles.description'),
    site: origin,
    items: articles.map((entry) => ({
      title: entry.data.title,
      description: entry.data.dek,
      pubDate: entry.data.date,
      link: `/${locale}/articles/${articleSlug(entry)}/`,
    })),
    customData: `<language>${locale}</language>`,
  });
};
