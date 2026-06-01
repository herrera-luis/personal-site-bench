import type { Locale } from "./i18n/routes";

export const siteConfig = {
  siteName: "Personal Site",
  author: "A. Writer",
  siteUrl: "https://personal-site.example",
  socialLinks: [
    { label: "Profile", href: "https://example.com/profile" },
    { label: "Source", href: "https://example.com/source" }
  ],
  descriptions: {
    en: "A minimal bilingual personal site for essays, notes, and durable web pages.",
    es: "Un sitio personal bilingue y minimo para ensayos, notas y paginas duraderas."
  } satisfies Record<Locale, string>
};
