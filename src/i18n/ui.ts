import type { Locale } from './config';
import { defaultLocale } from './config';

/**
 * Typed UI dictionary. Every locale shares the same key set; the `en`
 * dictionary is treated as the canonical shape that the others must satisfy.
 */
export const ui = {
  en: {
    'site.name': 'Personal Site',
    'site.roles': 'writer / engineer / curious human',
    'site.tagline': 'Notes on building, writing, and learning in public.',

    'nav.home': 'Home',
    'nav.articles': 'Articles',
    'nav.about': 'About',

    'lang.switch': 'Español',
    'lang.switch.aria': 'Ver esta página en español',

    'skip.toContent': 'Skip to content',

    'home.latest': 'Latest articles',
    'articles.title': 'Articles',
    'articles.intro': 'Long-form writing, newest first.',
    'articles.empty': 'No articles published yet. Check back soon.',
    'articles.readMore': 'Read full article',

    'about.title': 'About',

    'meta.publishedOn': 'Published',
    'meta.by': 'by',

    'footer.rss': 'RSS',
    'footer.rights': 'All rights reserved.',

    'rss.title': 'Personal Site — Articles',
    'rss.description': 'Long-form writing in English from Personal Site.',
  },
  es: {
    'site.name': 'Personal Site',
    'site.roles': 'escritor / ingeniero / humano curioso',
    'site.tagline': 'Notas sobre construir, escribir y aprender en público.',

    'nav.home': 'Inicio',
    'nav.articles': 'Artículos',
    'nav.about': 'Acerca de',

    'lang.switch': 'English',
    'lang.switch.aria': 'View this page in English',

    'skip.toContent': 'Saltar al contenido',

    'home.latest': 'Últimos artículos',
    'articles.title': 'Artículos',
    'articles.intro': 'Escritura extensa, de lo más reciente a lo más antiguo.',
    'articles.empty': 'Aún no hay artículos publicados. Vuelve pronto.',
    'articles.readMore': 'Leer el artículo completo',

    'about.title': 'Acerca de',

    'meta.publishedOn': 'Publicado',
    'meta.by': 'por',

    'footer.rss': 'RSS',
    'footer.rights': 'Todos los derechos reservados.',

    'rss.title': 'Personal Site — Artículos',
    'rss.description': 'Escritura extensa en español de Personal Site.',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

/**
 * Return a typed `t(key)` translation function for the given locale, falling
 * back to the default locale when a key is missing.
 */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key];
  };
}
