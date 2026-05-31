import type { Locale } from '../config/site';

export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export const defaultLang: Locale = 'en';

/** OpenGraph locale codes per UI locale. */
export const ogLocale: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
};

/**
 * Typed UI dictionary. Every locale must define the same keys — enforced by the
 * `satisfies Record<Locale, Record<UIKey, string>>` constraint below, so a
 * missing translation is a compile-time error.
 */
export const ui = {
  en: {
    'site.tagline': '[ writer · builder · tinkerer ]',
    'nav.home': 'Home',
    'nav.articles': 'Articles',
    'nav.about': 'About',
    'lang.switch': 'Español',
    'lang.label': 'Language',
    'home.latest': 'Latest articles',
    'home.empty': 'No articles yet. Check back soon.',
    'home.readMore': 'Full article',
    'articles.title': 'Articles',
    'articles.intro': 'Long-form writing, newest first.',
    'about.title': 'About',
    'about.profile': 'External profile',
    'article.backToArticles': 'Back to articles',
    'meta.by': 'By',
    'footer.rss': 'RSS',
    'footer.copyright': 'All rights reserved.',
    'seo.home.title': 'Personal Site',
    'seo.home.description':
      'A minimal, content-first personal site by A. Writer.',
    'seo.articles.title': 'Articles — Personal Site',
    'seo.articles.description': 'Long-form articles by A. Writer.',
    'seo.about.title': 'About — Personal Site',
    'seo.about.description': 'A short bio for A. Writer.',
    'rss.title': 'Personal Site — Articles',
    'rss.description': 'Long-form articles by A. Writer.',
  },
  es: {
    'site.tagline': '[ escritora · creadora · experimentadora ]',
    'nav.home': 'Inicio',
    'nav.articles': 'Artículos',
    'nav.about': 'Acerca de',
    'lang.switch': 'English',
    'lang.label': 'Idioma',
    'home.latest': 'Últimos artículos',
    'home.empty': 'Aún no hay artículos. Vuelve pronto.',
    'home.readMore': 'Artículo completo',
    'articles.title': 'Artículos',
    'articles.intro': 'Escritura extensa, lo más reciente primero.',
    'about.title': 'Acerca de',
    'about.profile': 'Perfil externo',
    'article.backToArticles': 'Volver a los artículos',
    'meta.by': 'Por',
    'footer.rss': 'RSS',
    'footer.copyright': 'Todos los derechos reservados.',
    'seo.home.title': 'Personal Site',
    'seo.home.description':
      'Un sitio personal minimalista y centrado en el contenido por A. Writer.',
    'seo.articles.title': 'Artículos — Personal Site',
    'seo.articles.description': 'Artículos extensos por A. Writer.',
    'seo.about.title': 'Acerca de — Personal Site',
    'seo.about.description': 'Una breve biografía de A. Writer.',
    'rss.title': 'Personal Site — Artículos',
    'rss.description': 'Artículos extensos por A. Writer.',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)['en'];
