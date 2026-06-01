export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

export const siteAuthor = 'Luis Herrera';
export const siteTitle = 'Luis Herrera';
export const siteUrl =
  import.meta.env.SITE ?? 'https://personal-site-bench.vercel.app';

export const translations = {
  en: {
    skipToContent: 'Skip to content',
    nav: {
      home: 'Home',
      about: 'About',
      articles: 'Articles',
    },
    languageSwitcherLabel: 'Change language',
    currentLanguage: 'Current language',
    readMore: 'Read more',
    latestArticles: 'Latest articles',
    allArticles: 'All articles',
    noArticles: 'No articles published yet.',
    publishedOn: 'Published on',
    updatedOn: 'Updated on',
    articleFallback:
      'Article translation unavailable; opening articles in Spanish.',
    footer: 'Built as a static bilingual Astro + MDX site.',
    home: {
      title: 'Luis Herrera — Personal Site',
      description:
        'A bilingual personal website and blog about software, craft, and learning.',
      eyebrow: 'Personal website',
      heading: 'Writing about software, systems, and thoughtful craft.',
      intro:
        'Welcome to my bilingual home on the web: a place for articles, notes, and projects in English and Spanish.',
      primaryCta: 'Read articles',
      secondaryCta: 'About me',
    },
    about: {
      title: 'About Luis Herrera',
      description:
        'Learn more about Luis Herrera, his work, interests, and ways to connect.',
      heading: 'About me',
      body: 'I am a software practitioner who enjoys building reliable web experiences, documenting what I learn, and sharing ideas across languages.',
      details:
        'This site is intentionally static, accessible, and content-first so articles remain fast, durable, and easy to maintain.',
      linksHeading: 'Connect',
    },
    articles: {
      title: 'Articles',
      description: 'Essays and notes by Luis Herrera in English.',
      heading: 'Articles',
      intro: 'Long-form writing, practical notes, and bilingual reflections.',
    },
    notFound: {
      title: 'Page not found',
      description: 'The requested page could not be found.',
      heading: 'Page not found',
      body: 'The page you requested does not exist or is not available in this language.',
      cta: 'Go home',
    },
    rss: {
      title: 'Luis Herrera articles in English',
      description: 'Latest English articles from Luis Herrera.',
    },
  },
  es: {
    skipToContent: 'Saltar al contenido',
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      articles: 'Artículos',
    },
    languageSwitcherLabel: 'Cambiar idioma',
    currentLanguage: 'Idioma actual',
    readMore: 'Leer más',
    latestArticles: 'Artículos recientes',
    allArticles: 'Todos los artículos',
    noArticles: 'Aún no hay artículos publicados.',
    publishedOn: 'Publicado el',
    updatedOn: 'Actualizado el',
    articleFallback: 'Traducción no disponible; abriendo artículos en inglés.',
    footer: 'Construido como un sitio estático bilingüe con Astro + MDX.',
    home: {
      title: 'Luis Herrera — Sitio personal',
      description:
        'Un sitio personal y blog bilingüe sobre software, oficio y aprendizaje.',
      eyebrow: 'Sitio personal',
      heading: 'Escribo sobre software, sistemas y oficio con intención.',
      intro:
        'Bienvenido a mi hogar bilingüe en la web: un espacio para artículos, notas y proyectos en español e inglés.',
      primaryCta: 'Leer artículos',
      secondaryCta: 'Sobre mí',
    },
    about: {
      title: 'Acerca de Luis Herrera',
      description:
        'Conoce más sobre Luis Herrera, su trabajo, intereses y formas de conectar.',
      heading: 'Acerca de mí',
      body: 'Soy un profesional de software que disfruta crear experiencias web confiables, documentar aprendizajes y compartir ideas en varios idiomas.',
      details:
        'Este sitio es estático, accesible y centrado en el contenido para que los artículos sean rápidos, duraderos y fáciles de mantener.',
      linksHeading: 'Conectar',
    },
    articles: {
      title: 'Artículos',
      description: 'Ensayos y notas de Luis Herrera en español.',
      heading: 'Artículos',
      intro: 'Textos extensos, notas prácticas y reflexiones bilingües.',
    },
    notFound: {
      title: 'Página no encontrada',
      description: 'No se pudo encontrar la página solicitada.',
      heading: 'Página no encontrada',
      body: 'La página solicitada no existe o no está disponible en este idioma.',
      cta: 'Ir al inicio',
    },
    rss: {
      title: 'Artículos de Luis Herrera en español',
      description: 'Artículos recientes en español de Luis Herrera.',
    },
  },
} as const;

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function assertLocale(value: string | undefined): Locale {
  if (isLocale(value)) return value;
  throw new Error(`Unsupported locale: ${value ?? '(missing)'}`);
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en';
}

export function localePath(locale: Locale, path = '/'): string {
  const normalizedPath =
    path === '/' ? '' : path.replace(/^\//, '').replace(/\/?$/, '/');
  return `/${locale}/${normalizedPath}`;
}

export function articlePath(locale: Locale, slug: string): string {
  return localePath(locale, `/articles/${slug}/`);
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

export function localeAlternates(path: string): Record<Locale, string> {
  return Object.fromEntries(
    locales.map((locale) => [locale, localePath(locale, path)]),
  ) as Record<Locale, string>;
}
