import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import { type Locale } from '../i18n';

export type ArticleFrontmatter = {
  title: string;
  dek: string;
  description?: string;
  date: string;
  updated?: string;
  draft?: boolean;
  articleLayout?: 'standard' | 'wide';
  accent?: 'plain' | 'note';
};

type ArticleModule = {
  frontmatter: ArticleFrontmatter;
  default: AstroComponentFactory;
};

export type Article = {
  slug: string;
  locale: Locale;
  title: string;
  dek: string;
  date: Date;
  dateIso: string;
  updatedIso?: string;
  frontmatter: ArticleFrontmatter;
  Content: AstroComponentFactory;
};

const articleModules = import.meta.glob<ArticleModule>(
  '../content/articles/*/{en,es}/README.mdx',
  { eager: true },
);

function parseArticlePath(path: string): { slug: string; locale: Locale } {
  const match = path.match(/articles\/([^/]+)\/(en|es)\/README\.mdx$/);

  if (!match) {
    throw new Error(`Unexpected article path: ${path}`);
  }

  return {
    slug: match[1],
    locale: match[2] as Locale,
  };
}

const allArticles = Object.entries(articleModules).map(([path, articleModule]) => {
  const { slug, locale } = parseArticlePath(path);
  const date = new Date(articleModule.frontmatter.date);
  const updatedIso = articleModule.frontmatter.updated
    ? new Date(articleModule.frontmatter.updated).toISOString()
    : undefined;

  return {
    slug,
    locale,
    title: articleModule.frontmatter.title,
    dek: articleModule.frontmatter.dek,
    date,
    dateIso: date.toISOString(),
    updatedIso,
    frontmatter: articleModule.frontmatter,
    Content: articleModule.default,
  } satisfies Article;
});

export function getArticles(locale: Locale): Article[] {
  return allArticles
    .filter((article) => article.locale === locale && !article.frontmatter.draft)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getArticle(locale: Locale, slug: string): Article | undefined {
  return allArticles.find(
    (article) => article.locale === locale && article.slug === slug && !article.frontmatter.draft,
  );
}

export function getArticleStaticPaths() {
  return allArticles
    .filter((article) => !article.frontmatter.draft)
    .map((article) => ({
      params: {
        locale: article.locale,
        slug: article.slug,
      },
      props: {
        article,
      },
    }));
}

export function getArticleDescription(article: Article): string {
  return article.frontmatter.description ?? article.dek;
}

export function formatArticleDate(locale: Locale, date: Date): string {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
