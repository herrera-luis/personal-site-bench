import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getArticlesByLocale, articlePath } from '../../lib/articles';
import { ui, locales, type Locale } from '../../i18n/ui';

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Locale;
  const site = context.site ?? new URL('https://example.com');
  const articles = await getArticlesByLocale(lang);

  return rss({
    title: `${ui[lang]['site.title']} (${lang})`,
    description: ui[lang]['blog.description'],
    site,
    items: articles.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      link: new URL(articlePath(entry), site).href,
      categories: entry.data.tags,
    })),
    customData: `<language>${lang}</language>`,
  });
}
