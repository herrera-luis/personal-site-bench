export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export type DictionaryShape = {
  localeName: string;
  site: {
    roleTagline: string;
    copyright: string;
  };
  nav: {
    home: string;
    articles: string;
    about: string;
  };
  footer: {
    social: string;
    rss: string;
  };
  home: {
    seoTitle: string;
    seoDescription: string;
    introEyebrow: string;
    articlesHeading: string;
    fullArticle: string;
    emptyArticles: string;
  };
  about: {
    seoTitle: string;
    seoDescription: string;
    heading: string;
    body: string;
    profileLink: string;
  };
  article: {
    published: string;
    updated: string;
    readingView: string;
  };
  rss: {
    title: string;
    description: string;
  };
};

export const dictionary = {
  en: {
    localeName: 'English',
    site: {
      roleTagline: '[notes / essays / field logs]',
      copyright: 'All text by A. Writer.',
    },
    nav: {
      home: 'Home',
      articles: 'Articles',
      about: 'About',
    },
    footer: {
      social: 'Social',
      rss: 'RSS',
    },
    home: {
      seoTitle: 'Personal Site — essays and notes',
      seoDescription: 'A quiet, bilingual personal site for essays, notes, and long-form writing.',
      introEyebrow: 'Personal Site',
      articlesHeading: 'Articles',
      fullArticle: 'Full article',
      emptyArticles: 'No articles are available in this language yet.',
    },
    about: {
      seoTitle: 'About — Personal Site',
      seoDescription: 'A short placeholder biography for A. Writer.',
      heading: 'About',
      body: 'A. Writer is a placeholder author for this minimal personal site. This page keeps the biography intentionally short and points readers toward the writing.',
      profileLink: 'External profile',
    },
    article: {
      published: 'Published',
      updated: 'Updated',
      readingView: 'Reading view',
    },
    rss: {
      title: 'Personal Site articles',
      description: 'Latest English articles from Personal Site.',
    },
  },
  es: {
    localeName: 'Español',
    site: {
      roleTagline: '[notas / ensayos / bitácoras]',
      copyright: 'Todos los textos por A. Writer.',
    },
    nav: {
      home: 'Inicio',
      articles: 'Artículos',
      about: 'Acerca de',
    },
    footer: {
      social: 'Social',
      rss: 'RSS',
    },
    home: {
      seoTitle: 'Personal Site — ensayos y notas',
      seoDescription: 'Un sitio personal bilingüe y sobrio para ensayos, notas y escritura extensa.',
      introEyebrow: 'Personal Site',
      articlesHeading: 'Artículos',
      fullArticle: 'Artículo completo',
      emptyArticles: 'Todavía no hay artículos disponibles en este idioma.',
    },
    about: {
      seoTitle: 'Acerca de — Personal Site',
      seoDescription: 'Una breve biografía de marcador para A. Writer.',
      heading: 'Acerca de',
      body: 'A. Writer es una autoría de marcador para este sitio personal mínimo. Esta página mantiene la biografía deliberadamente breve y dirige a las personas lectoras hacia los textos.',
      profileLink: 'Perfil externo',
    },
    article: {
      published: 'Publicado',
      updated: 'Actualizado',
      readingView: 'Vista de lectura',
    },
    rss: {
      title: 'Artículos de Personal Site',
      description: 'Últimos artículos en español de Personal Site.',
    },
  },
} satisfies Record<Locale, DictionaryShape>;

export function t(locale: Locale): DictionaryShape {
  return dictionary[locale];
}

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}
