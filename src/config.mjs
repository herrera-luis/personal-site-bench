// Central site + i18n configuration shared by astro.config.mjs and src/.
// Keeping locales in a single array makes adding a locale largely additive.

/** @type {readonly ["en", "es"]} */
export const LOCALES = ['en', 'es'];

/** @type {"en"} */
export const DEFAULT_LOCALE = 'en';

// Absolute site URL used for canonical links, hreflang alternates, RSS and sitemap.
export const SITE_URL = 'https://personal-site-bench.vercel.app';

// Basic site-wide metadata (author-facing chrome lives in the i18n dictionaries).
export const SITE_AUTHOR = 'Luis Herrera';
