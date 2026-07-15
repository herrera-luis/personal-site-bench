export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export const defaultLang = 'en';
export const locales = ['en', 'es'] as const;

export type Locale = (typeof locales)[number];

/**
 * BCP-47 tags used for Intl date/number formatting per locale.
 */
export const dateLocale: Record<Locale, string> = {
  en: 'en-US',
  es: 'es-ES',
};

/**
 * Per-locale UI chrome strings (navigation labels, buttons, etc.).
 */
export const ui = {
  en: {
    'site.title': 'Luis Herrera',
    'site.tagline': 'Notes on software, engineering, and building things.',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.skipToContent': 'Skip to content',
    'lang.switchTo': 'Español',
    'lang.label': 'Language',
    'home.intro.heading': "Hi, I'm Luis",
    'home.intro.body':
      'I write about software engineering, the web, and the craft of building things that last.',
    'home.recent': 'Recent articles',
    'home.viewAll': 'View all articles',
    'blog.title': 'Articles',
    'blog.description': 'Writing on software, engineering, and the web.',
    'blog.empty': 'No articles published yet. Check back soon.',
    'article.readMore': 'Read more',
    'article.published': 'Published',
    'article.updated': 'Updated',
    'article.tags': 'Tags',
    'article.backToBlog': '← Back to all articles',
    'about.title': 'About',
    'footer.rights': 'All rights reserved.',
    'footer.rss': 'RSS',
  },
  es: {
    'site.title': 'Luis Herrera',
    'site.tagline': 'Notas sobre software, ingeniería y la creación de cosas.',
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.blog': 'Blog',
    'nav.skipToContent': 'Saltar al contenido',
    'lang.switchTo': 'English',
    'lang.label': 'Idioma',
    'home.intro.heading': 'Hola, soy Luis',
    'home.intro.body':
      'Escribo sobre ingeniería de software, la web y el arte de construir cosas que perduran.',
    'home.recent': 'Artículos recientes',
    'home.viewAll': 'Ver todos los artículos',
    'blog.title': 'Artículos',
    'blog.description': 'Escritos sobre software, ingeniería y la web.',
    'blog.empty': 'Aún no hay artículos publicados. Vuelve pronto.',
    'article.readMore': 'Leer más',
    'article.published': 'Publicado',
    'article.updated': 'Actualizado',
    'article.tags': 'Etiquetas',
    'article.backToBlog': '← Volver a todos los artículos',
    'about.title': 'Acerca de',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.rss': 'RSS',
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
