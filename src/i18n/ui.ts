import type { Locale } from '../config/site';

/**
 * Typed UI-string dictionary. `en` is the source of truth for keys; `es`
 * must provide the same keys (enforced structurally by the `Record` type).
 */
export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.articles': 'Articles',
    'nav.about': 'About',
    'nav.language': 'Language',
    'lang.en': 'English',
    'lang.es': 'Español',
    'home.latest': 'Latest articles',
    'home.empty': 'No articles yet. Check back soon.',
    'article.fullArticle': 'Full article',
    'article.by': 'By',
    'articles.title': 'Articles',
    'articles.description': 'Writing, notes, and long-form pieces.',
    'about.title': 'About',
    'about.profileLink': 'External profile',
    'footer.rss': 'RSS',
    'footer.copyright': 'All rights reserved.',
    'site.description': 'A minimal, content-first personal site.',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.articles': 'Artículos',
    'nav.about': 'Acerca de',
    'nav.language': 'Idioma',
    'lang.en': 'English',
    'lang.es': 'Español',
    'home.latest': 'Últimos artículos',
    'home.empty': 'Aún no hay artículos. Vuelve pronto.',
    'article.fullArticle': 'Artículo completo',
    'article.by': 'Por',
    'articles.title': 'Artículos',
    'articles.description': 'Escritos, notas y piezas de formato largo.',
    'about.title': 'Acerca de',
    'about.profileLink': 'Perfil externo',
    'footer.rss': 'RSS',
    'footer.copyright': 'Todos los derechos reservados.',
    'site.description': 'Un sitio personal minimalista y centrado en el contenido.',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)['en'];
