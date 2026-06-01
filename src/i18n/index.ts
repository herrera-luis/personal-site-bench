export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const siteConfig = {
  url: 'https://personal-site.example',
  author: 'A. Writer',
  profileUrl: 'https://social.example/a-writer',
} as const;

type Dictionary = {
  site: {
    name: string;
    roles: string;
    description: string;
  };
  nav: {
    home: string;
    articles: string;
    about: string;
  };
  languageSwitcher: {
    label: string;
    current: string;
  };
  footer: {
    profile: string;
    rss: string;
    copyright: string;
  };
  rss: {
    title: string;
    description: string;
  };
  article: {
    fullArticle: string;
    published: string;
    byline: string;
    empty: string;
    updated: string;
  };
  pages: {
    home: {
      title: string;
      intro: string;
      articlesHeading: string;
    };
    about: {
      title: string;
      description: string;
      heading: string;
      bio: string;
      profileLink: string;
    };
  };
};

export const dictionary = {
  en: {
    site: {
      name: 'Personal Site',
      roles: '[writer / essays / notes]',
      description: 'A quiet bilingual website for essays, notes, and long-form writing.',
    },
    nav: {
      home: 'Home',
      articles: 'Articles',
      about: 'About',
    },
    languageSwitcher: {
      label: 'Language',
      current: 'Current language',
    },
    footer: {
      profile: 'Profile',
      rss: 'RSS',
      copyright: 'All words by A. Writer unless noted.',
    },
    rss: {
      title: 'Personal Site articles',
      description: 'Recent English articles from Personal Site.',
    },
    article: {
      fullArticle: 'full article',
      published: 'Published',
      byline: 'By A. Writer',
      empty: 'No articles have been published yet.',
      updated: 'Updated',
    },
    pages: {
      home: {
        title: 'Personal Site',
        intro: 'Short essays and field notes, written with a preference for clarity over noise.',
        articlesHeading: 'Articles',
      },
      about: {
        title: 'About',
        description: 'A short bio for A. Writer.',
        heading: 'About A. Writer',
        bio: 'A. Writer is a placeholder author for a minimal personal website. This space keeps attention on essays, notes, and the habit of writing things down clearly.',
        profileLink: 'External profile',
      },
    },
  },
  es: {
    site: {
      name: 'Personal Site',
      roles: '[escritura / ensayos / notas]',
      description: 'Un sitio bilingue y sereno para ensayos, notas y textos largos.',
    },
    nav: {
      home: 'Inicio',
      articles: 'Articulos',
      about: 'Acerca de',
    },
    languageSwitcher: {
      label: 'Idioma',
      current: 'Idioma actual',
    },
    footer: {
      profile: 'Perfil',
      rss: 'RSS',
      copyright: 'Todos los textos son de A. Writer salvo que se indique lo contrario.',
    },
    rss: {
      title: 'Articulos de Personal Site',
      description: 'Articulos recientes en espanol de Personal Site.',
    },
    article: {
      fullArticle: 'articulo completo',
      published: 'Publicado',
      byline: 'Por A. Writer',
      empty: 'Todavia no se han publicado articulos.',
      updated: 'Actualizado',
    },
    pages: {
      home: {
        title: 'Personal Site',
        intro: 'Ensayos breves y notas de campo, escritos con preferencia por la claridad antes que el ruido.',
        articlesHeading: 'Articulos',
      },
      about: {
        title: 'Acerca de',
        description: 'Una breve biografia de A. Writer.',
        heading: 'Acerca de A. Writer',
        bio: 'A. Writer es una autoria de marcador de posicion para un sitio personal minimo. Este espacio mantiene la atencion en ensayos, notas y el habito de escribir con claridad.',
        profileLink: 'Perfil externo',
      },
    },
  },
} satisfies Record<Locale, Dictionary>;

export const languageNames = {
  en: 'English',
  es: 'Espanol',
} satisfies Record<Locale, string>;

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function ensureTrailingSlash(pathname: string): string {
  if (pathname === '') return '/';
  const [path, query = ''] = pathname.split('?');
  const normalized = path.endsWith('/') || path.includes('.') ? path : `${path}/`;
  return query ? `${normalized}?${query}` : normalized;
}

export function localizePath(locale: Locale, pathname = '/'): string {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return ensureTrailingSlash(`/${locale}${cleanPath === '/' ? '' : cleanPath}`);
}

export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const parts = cleanPath.split('/');

  if (isLocale(parts[1])) {
    parts[1] = targetLocale;
    return ensureTrailingSlash(parts.join('/') || '/');
  }

  return localizePath(targetLocale, cleanPath);
}

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteConfig.url).toString();
}
