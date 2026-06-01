import type { Locale } from "./routes";

export const dictionary = {
  en: {
    nav: {
      home: "Home",
      articles: "Articles",
      about: "About"
    },
    rolesTagline: "writer / builder / observer",
    home: {
      title: "Personal Site",
      heading: "Notes for a slower web",
      intro: "A bilingual place for essays, field notes, and small durable ideas.",
      latest: "Latest articles"
    },
    articles: {
      title: "Articles",
      intro: "Long-form notes and essays in the selected language.",
      empty: "No articles are available in English yet.",
      readMore: "Read article"
    },
    about: {
      title: "About",
      heading: "About this site",
      bio: "This is a placeholder personal website for a writer who prefers careful notes, plain language, and static pages that remain readable without client-side JavaScript.",
      profileLink: "External profile"
    },
    footer: {
      social: "Social",
      rss: "RSS feed",
      copyright: "All text by A. Writer."
    },
    meta: {
      published: "Published",
      byline: "By A. Writer",
      language: "Language",
      switchLanguage: "Switch language",
      xDefault: "Default language"
    },
    rss: {
      title: "Personal Site articles in English",
      description: "English essays and notes from Personal Site."
    },
    article: {
      toc: "On this page"
    }
  },
  es: {
    nav: {
      home: "Inicio",
      articles: "Articulos",
      about: "Acerca de"
    },
    rolesTagline: "escritura / construccion / observacion",
    home: {
      title: "Sitio personal",
      heading: "Notas para una web mas pausada",
      intro: "Un lugar bilingue para ensayos, apuntes e ideas pequenas y duraderas.",
      latest: "Articulos recientes"
    },
    articles: {
      title: "Articulos",
      intro: "Notas y ensayos largos en el idioma seleccionado.",
      empty: "Todavia no hay articulos disponibles en espanol.",
      readMore: "Leer articulo"
    },
    about: {
      title: "Acerca de",
      heading: "Acerca de este sitio",
      bio: "Este es un sitio personal de marcador de posicion para una persona que escribe con calma, usa lenguaje claro y prefiere paginas estaticas legibles sin JavaScript del cliente.",
      profileLink: "Perfil externo"
    },
    footer: {
      social: "Social",
      rss: "Feed RSS",
      copyright: "Todos los textos por A. Writer."
    },
    meta: {
      published: "Publicado",
      byline: "Por A. Writer",
      language: "Idioma",
      switchLanguage: "Cambiar idioma",
      xDefault: "Idioma predeterminado"
    },
    rss: {
      title: "Articulos de Personal Site en espanol",
      description: "Ensayos y notas en espanol de Personal Site."
    },
    article: {
      toc: "En esta pagina"
    }
  }
} satisfies Record<Locale, {
  nav: Record<"home" | "articles" | "about", string>;
  rolesTagline: string;
  home: Record<"title" | "heading" | "intro" | "latest", string>;
  articles: Record<"title" | "intro" | "empty" | "readMore", string>;
  about: Record<"title" | "heading" | "bio" | "profileLink", string>;
  footer: Record<"social" | "rss" | "copyright", string>;
  meta: Record<"published" | "byline" | "language" | "switchLanguage" | "xDefault", string>;
  rss: Record<"title" | "description", string>;
  article: Record<"toc", string>;
}>;

export function t(locale: Locale) {
  return dictionary[locale];
}
