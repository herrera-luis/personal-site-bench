import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getArticlesByLocale } from '@/lib/articles';
import {
  absoluteUrl,
  assertLocale,
  localePath,
  translations,
} from '@/lib/i18n';

export async function GET(context: APIContext) {
  const locale = assertLocale(context.params.locale);
  const t = translations[locale];
  const articles = await getArticlesByLocale(locale);

  return rss({
    title: t.rss.title,
    description: t.rss.description,
    site: context.site ?? absoluteUrl(localePath(locale, '/')),
    items: articles.map((article) => ({
      title: article.title,
      description: article.description,
      pubDate: article.pubDate,
      link: article.href,
    })),
    customData: `<language>${locale}</language>`,
  });
}

export function getStaticPaths() {
  return [{ params: { locale: 'en' } }, { params: { locale: 'es' } }];
}
