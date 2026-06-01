import { absoluteUrl, type Locale } from './i18n';

export interface AlternateLink {
  locale: Locale;
  href: string;
}

export interface SeoProps {
  title: string;
  description: string;
  locale: Locale;
  canonicalPath: string;
  alternates?: Partial<Record<Locale, string>>;
  type?: 'website' | 'article';
  image?: string;
}

export function buildSeo({
  title,
  description,
  canonicalPath,
  alternates = {},
  type = 'website',
  image,
}: SeoProps) {
  const canonicalUrl = absoluteUrl(canonicalPath);
  const alternateLinks = Object.entries(alternates).map(([locale, href]) => ({
    locale: locale as Locale,
    href: absoluteUrl(href),
  }));

  return {
    title,
    description,
    canonicalUrl,
    alternateLinks,
    openGraph: {
      title,
      description,
      type,
      url: canonicalUrl,
      image: image ? absoluteUrl(image) : undefined,
    },
  };
}
