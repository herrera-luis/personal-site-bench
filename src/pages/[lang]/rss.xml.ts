import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { locales, useTranslations, type Locale } from '../../i18n/ui';
import { getArticlesForLocale } from '../../i18n/articles';

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Locale;
  const t = useTranslations(lang);
  const articles = await getArticlesForLocale(lang);
  const site = context.site ?? new URL('https://personal-site.example');

  return rss({
    title: `${t('site.name')} (${lang})`,
    description: t('home.description'),
    site,
    items: articles.map(({ slug, entry }) => ({
      title: entry.data.title,
      description: entry.data.dek,
      pubDate: entry.data.date,
      link: `/${lang}/articles/${slug}/`,
    })),
    customData: `<language>${lang}</language>`,
  });
}
