import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getArticles } from '../../lib/articles';
import { ui, LOCALES, type Locale } from '../../i18n/ui';

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

export async function GET(context: APIContext) {
  const locale = context.params.locale as Locale;
  const articles = await getArticles(locale);

  return rss({
    title: ui[locale]['rss.title'],
    description: ui[locale]['rss.description'],
    site: context.site ?? 'https://personal-site.example',
    items: articles.map((a) => ({
      title: a.entry.data.title,
      description: a.entry.data.dek,
      pubDate: a.entry.data.pubDate,
      link: `/${locale}/articles/${a.slug}/`,
    })),
  });
}
