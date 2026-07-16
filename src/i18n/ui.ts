export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/**
 * Typed UI string dictionary. Every locale MUST have the same set of keys.
 * Missing keys fail at compile time because `ui.es` is checked against
 * `typeof ui.en`.
 */
export const ui = {
  en: {
    'site.name': 'Personal Site',
    'roles.tagline': '[ writer · engineer · tinkerer ]',
    'nav.home': 'Home',
    'nav.articles': 'Articles',
    'nav.about': 'About',
    'lang.switch': 'Español',
    'lang.label': 'Language',
    'home.title': 'Personal Site',
    'home.description': 'A minimal, content-first personal site by A. Writer.',
    'home.articlesHeading': 'Articles',
    'home.empty': 'No articles yet. Check back soon.',
    'articles.title': 'Articles',
    'articles.description': 'All articles, most recent first.',
    'articles.readFull': 'full article',
    'about.title': 'About',
    'about.description': 'A short bio of A. Writer.',
    'about.heading': 'About',
    'about.bio':
      'A. Writer is a placeholder identity for this scaffold. This site is a minimal, content-first, bilingual demo built with Astro and MDX.',
    'about.profileLabel': 'External profile',
    'article.backToArticles': '← All articles',
    'footer.rights': 'All rights reserved.',
    'footer.rss': 'RSS',
  },
  es: {
    'site.name': 'Personal Site',
    'roles.tagline': '[ escritor · ingeniero · aficionado ]',
    'nav.home': 'Inicio',
    'nav.articles': 'Artículos',
    'nav.about': 'Acerca de',
    'lang.switch': 'English',
    'lang.label': 'Idioma',
    'home.title': 'Personal Site',
    'home.description': 'Un sitio personal minimalista, centrado en el contenido, de A. Writer.',
    'home.articlesHeading': 'Artículos',
    'home.empty': 'Aún no hay artículos. Vuelve pronto.',
    'articles.title': 'Artículos',
    'articles.description': 'Todos los artículos, del más reciente al más antiguo.',
    'articles.readFull': 'artículo completo',
    'about.title': 'Acerca de',
    'about.description': 'Una breve biografía de A. Writer.',
    'about.heading': 'Acerca de',
    'about.bio':
      'A. Writer es una identidad de marcador de posición para este andamiaje. Este sitio es una demostración bilingüe, minimalista y centrada en el contenido, creada con Astro y MDX.',
    'about.profileLabel': 'Perfil externo',
    'article.backToArticles': '← Todos los artículos',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.rss': 'RSS',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)['en'];

/** Type guard: is a string one of the supported locales? */
export function isLocale(value: string | undefined): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/** Returns a typed translator for the given locale. */
export function useTranslations(lang: Locale) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLocale][key];
  };
}

/** The "other" locale, used by the language switcher. */
export function otherLocale(lang: Locale): Locale {
  return lang === 'en' ? 'es' : 'en';
}

/**
 * Swap the leading locale segment of a pathname, preserving the rest of the
 * path. Purely string based so it works during static rendering with no JS.
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split('/');
  // segments[0] === '' because pathname starts with '/'
  if (isLocale(segments[1])) {
    segments[1] = target;
  } else {
    segments.splice(1, 0, target);
  }
  let next = segments.join('/');
  if (!next.startsWith('/')) next = '/' + next;
  return next;
}
