import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { locales } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { useTranslations } from '@/i18n/ui';
import { getArticles, getSlug } from '@/lib/articles';

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Locale;
  const t = useTranslations(lang);
  const articles = await getArticles(lang);
  const site = context.site ?? new URL('https://personal-site.example');

  return rss({
    title: t('rss.title'),
    description: t('rss.description'),
    site,
    items: articles.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description ?? entry.data.dek,
      pubDate: entry.data.pubDate,
      link: new URL(`/${lang}/articles/${getSlug(entry)}/`, site).href,
    })),
    customData: `<language>${lang === 'es' ? 'es-ES' : 'en-US'}</language>`,
  });
}
