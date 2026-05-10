import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';

const BASE_URL = 'https://www.mrcleanplus.ca';

export function buildBreadcrumbLd(params: {
  lang: Locale;
  items: Array<{ name: string; path: string }>;
}) {
  const { lang, items } = params;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}/${lang}${item.path}`,
    })),
  };
}

export function buildPageMetadata(params: {
  lang: Locale;
  route: string;
  title: string;
  description: string;
}): Metadata {
  const { lang, route, title, description } = params;
  const normalizedRoute = route ? `/${route.replace(/^\//, '')}` : '';
  const canonical = `${BASE_URL}/${lang}${normalizedRoute}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        fr: `${BASE_URL}/fr${normalizedRoute}`,
        en: `${BASE_URL}/en${normalizedRoute}`,
        'x-default': `${BASE_URL}/fr${normalizedRoute}`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: 'Mr Clean+',
      locale: lang === 'fr' ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${BASE_URL}/images/logo.png`,
          width: 512,
          height: 512,
          alt: 'Mr Clean+ logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/images/logo.png`],
    },
  };
}
