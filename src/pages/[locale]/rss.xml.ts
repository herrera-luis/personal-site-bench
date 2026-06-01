import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../../data/site';
import { getArticlesByLocale } from '../../content/articles';
import { isLocale, t } from '../../i18n/dictionary';
import { absoluteUrl, localizedPath } from '../../i18n/routes';

export async function GET(context: APIContext) {
  const localeParam = context.params.locale;
  if (!isLocale(localeParam)) {
    return new Response('Not found', { status: 404 });
  }

  const copy = t(localeParam);
  const articles = await getArticlesByLocale(localeParam);

  return rss({
    title: copy.rss.title,
    description: copy.rss.description,
    site: site.url,
    items: articles.map((article) => ({
      title: article.entry.data.title,
      description: article.entry.data.description,
      pubDate: article.entry.data.pubDate,
      link: absoluteUrl(localizedPath(localeParam, { kind: 'article', slug: article.slug })),
    })),
  });
}

export function getStaticPaths() {
  return [{ params: { locale: 'en' } }, { params: { locale: 'es' } }];
}
