export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** Human-readable language names, used by the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

/** OpenGraph locale codes. */
export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
};

/**
 * Typed UI dictionary. Every interface string is defined for every locale.
 * The English table is the source of truth for the available keys.
 */
export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.articles': 'Articles',
    'nav.about': 'About',
    'nav.primaryLabel': 'Primary navigation',
    'lang.label': 'Language',
    'site.roles': 'writer · engineer · tinkerer',
    'home.intro': 'Notes on software, writing, and the things in between.',
    'articles.heading': 'Articles',
    'articles.empty': 'No articles yet. Check back soon.',
    'article.readMore': 'Read full article',
    'article.by': 'By',
    'about.heading': 'About',
    'about.body':
      'A. Writer is a placeholder author for this starter site. This space holds a short bio — a sentence or two about who you are and what you write about. Swap it for your own words.',
    'about.profile': 'Profile',
    'footer.rss': 'RSS',
    'footer.rights': 'All rights reserved.',
    'meta.home.title': 'Personal Site — writing & notes',
    'meta.home.desc': 'A minimal, content-first personal site with writing and notes.',
    'meta.articles.title': 'Articles — Personal Site',
    'meta.articles.desc': 'Long-form writing and notes from A. Writer.',
    'meta.about.title': 'About — Personal Site',
    'meta.about.desc': 'About A. Writer and this site.',
    'rss.title': 'Personal Site — Articles',
    'rss.description': 'Long-form writing and notes from A. Writer.',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.articles': 'Artículos',
    'nav.about': 'Acerca de',
    'nav.primaryLabel': 'Navegación principal',
    'lang.label': 'Idioma',
    'site.roles': 'escritor · ingeniero · aficionado',
    'home.intro': 'Notas sobre software, escritura y todo lo que hay en medio.',
    'articles.heading': 'Artículos',
    'articles.empty': 'Todavía no hay artículos. Vuelve pronto.',
    'article.readMore': 'Leer el artículo completo',
    'article.by': 'Por',
    'about.heading': 'Acerca de',
    'about.body':
      'A. Writer es un autor de ejemplo para este sitio inicial. Este espacio contiene una breve biografía: una o dos frases sobre quién eres y sobre qué escribes. Sustitúyelo por tus propias palabras.',
    'about.profile': 'Perfil',
    'footer.rss': 'RSS',
    'footer.rights': 'Todos los derechos reservados.',
    'meta.home.title': 'Personal Site — escritura y notas',
    'meta.home.desc': 'Un sitio personal minimalista centrado en el contenido, con escritura y notas.',
    'meta.articles.title': 'Artículos — Personal Site',
    'meta.articles.desc': 'Escritura extensa y notas de A. Writer.',
    'meta.about.title': 'Acerca de — Personal Site',
    'meta.about.desc': 'Acerca de A. Writer y de este sitio.',
    'rss.title': 'Personal Site — Artículos',
    'rss.description': 'Escritura extensa y notas de A. Writer.',
  },
} as const;

export type UiKey = keyof (typeof ui)[typeof DEFAULT_LOCALE];
