import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';

export const BASE_URL = 'https://www.mrcleanplus.ca';
export const BRAND_NAME = 'Mr Clean+';
export const PHONE_E164 = '+15144319741';
export const PHONE_DISPLAY = '+1 (514) 431-9741';
export const EMAIL = 'info@mrcleanplus.ca';
export const STREET = '315 Bd René-Lévesque E, appartement 1605';
export const LOCALITY = 'Montreal';
export const REGION = 'QC';
export const POSTAL = 'H2X 3P3';
export const COUNTRY = 'CA';
// Approx geo for 315 Bd René-Lévesque E, Montréal QC H2X 3P3
export const GEO = { latitude: 45.5103, longitude: -73.5547 };
export const PRICE_RANGE = '$$';
export const SAME_AS = [
  'https://www.facebook.com/MrCleanPlus/?utm_source=ig&utm_medium=social&utm_content=link_in_bio',
  'https://www.instagram.com/monsieurcleanplus/',
];

const KEYWORDS_FR = [
  'nettoyage Montréal',
  'service de nettoyage Montréal',
  'femme de ménage Montréal',
  'ménage résidentiel Montréal',
  'entretien ménager Laval',
  'grand ménage Montréal',
  'nettoyage commercial Montréal',
  'nettoyage Airbnb Montréal',
  'nettoyage après construction Montréal',
  'nettoyage après déménagement',
  'service d\'entretien Rive-Nord',
  'service d\'entretien Rive-Sud',
  'compagnie de nettoyage Montréal',
  'Mr Clean+',
];

const KEYWORDS_EN = [
  'cleaning service Montreal',
  'house cleaning Montreal',
  'residential cleaning Montreal',
  'commercial cleaning Montreal',
  'deep cleaning Montreal',
  'Airbnb cleaning Montreal',
  'post-construction cleaning Montreal',
  'move-out cleaning Montreal',
  'cleaning company Laval',
  'cleaning service North Shore',
  'cleaning service South Shore',
  'professional cleaners Montreal',
  'Mr Clean+',
];

export function getKeywords(lang: Locale): string[] {
  return lang === 'fr' ? KEYWORDS_FR : KEYWORDS_EN;
}

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
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const { lang, route, title, description, ogImage, noIndex } = params;
  const normalizedRoute = route ? `/${route.replace(/^\//, '')}` : '';
  const canonical = `${BASE_URL}/${lang}${normalizedRoute}`;
  const image = ogImage ?? `${BASE_URL}/images/logo.png`;

  return {
    title,
    description,
    keywords: getKeywords(lang),
    authors: [{ name: BRAND_NAME, url: BASE_URL }],
    creator: BRAND_NAME,
    publisher: BRAND_NAME,
    category: 'Cleaning Services',
    applicationName: BRAND_NAME,
    formatDetection: { telephone: true, address: true, email: true },
    alternates: {
      canonical,
      languages: {
        'fr-CA': `${BASE_URL}/fr${normalizedRoute}`,
        'en-CA': `${BASE_URL}/en${normalizedRoute}`,
        fr: `${BASE_URL}/fr${normalizedRoute}`,
        en: `${BASE_URL}/en${normalizedRoute}`,
        'x-default': `${BASE_URL}/fr${normalizedRoute}`,
      },
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
          googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: BRAND_NAME,
      locale: lang === 'fr' ? 'fr_CA' : 'en_CA',
      alternateLocale: lang === 'fr' ? ['en_CA'] : ['fr_CA'],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${BRAND_NAME} — ${title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    other: {
      'geo.region': `${COUNTRY}-${REGION}`,
      'geo.placename': LOCALITY,
      'geo.position': `${GEO.latitude};${GEO.longitude}`,
      ICBM: `${GEO.latitude}, ${GEO.longitude}`,
    },
  };
}

// ---------- JSON-LD builders ----------

export function buildOrganizationLd(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: BRAND_NAME,
    url: `${BASE_URL}/${lang}`,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/images/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/images/logo.png`,
    email: EMAIL,
    telephone: PHONE_DISPLAY,
    address: {
      '@type': 'PostalAddress',
      streetAddress: STREET,
      addressLocality: LOCALITY,
      addressRegion: REGION,
      postalCode: POSTAL,
      addressCountry: COUNTRY,
    },
    sameAs: SAME_AS,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE_DISPLAY,
      contactType: 'customer service',
      email: EMAIL,
      areaServed: ['CA-QC'],
      availableLanguage: ['French', 'English'],
    },
  };
}

export function buildWebSiteLd(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: `${BASE_URL}/${lang}`,
    name: BRAND_NAME,
    inLanguage: lang === 'fr' ? 'fr-CA' : 'en-CA',
    publisher: { '@id': `${BASE_URL}/#organization` },
  };
}

type ServiceInfo = { title: string; description: string };
export function buildLocalBusinessLd(params: {
  lang: Locale;
  services: ServiceInfo[];
  rating?: { value: number; reviewCount: number };
}) {
  const { lang, services, rating } = params;
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'CleaningService'],
    '@id': `${BASE_URL}/#business`,
    name: BRAND_NAME,
    url: `${BASE_URL}/${lang}`,
    image: `${BASE_URL}/images/logo.png`,
    logo: `${BASE_URL}/images/logo.png`,
    telephone: PHONE_DISPLAY,
    email: EMAIL,
    priceRange: PRICE_RANGE,
    currenciesAccepted: 'CAD',
    paymentAccepted: 'Cash, Credit Card, Debit Card, E-Transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: STREET,
      addressLocality: LOCALITY,
      addressRegion: REGION,
      postalCode: POSTAL,
      addressCountry: COUNTRY,
    },
    geo: { '@type': 'GeoCoordinates', latitude: GEO.latitude, longitude: GEO.longitude },
    areaServed: [
      { '@type': 'City', name: 'Montreal', containedInPlace: { '@type': 'AdministrativeArea', name: 'Quebec' } },
      { '@type': 'City', name: 'Laval' },
      { '@type': 'AdministrativeArea', name: 'North Shore' },
      { '@type': 'AdministrativeArea', name: 'South Shore' },
    ],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '16:00' },
    ],
    sameAs: SAME_AS,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: lang === 'fr' ? 'Services de nettoyage' : 'Cleaning services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
          provider: { '@id': `${BASE_URL}/#business` },
          areaServed: ['Montreal', 'Laval', 'North Shore', 'South Shore'],
        },
      })),
    },
    ...(rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: rating.value.toFixed(1),
            reviewCount: rating.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

export function buildReviewsLd(items: Array<{ name: string; text: string; stars?: number; service?: string }>) {
  return items.map((item, i) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `${BASE_URL}/#review-${i + 1}`,
    itemReviewed: { '@id': `${BASE_URL}/#business` },
    author: { '@type': 'Person', name: item.name },
    reviewBody: item.text,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: (item.stars ?? 5).toString(),
      bestRating: '5',
      worstRating: '1',
    },
    ...(item.service ? { name: item.service } : {}),
  }));
}

export function buildFaqLd(items: Array<{ question: string; answer: string }>, lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang === 'fr' ? 'fr-CA' : 'en-CA',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

export function buildServicesItemListLd(params: { lang: Locale; services: ServiceInfo[] }) {
  const { lang, services } = params;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: lang === 'fr' ? 'Nos services de nettoyage' : 'Our cleaning services',
    itemListElement: services.map((s, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.description,
        provider: { '@id': `${BASE_URL}/#business` },
        areaServed: ['Montreal', 'Laval', 'North Shore', 'South Shore'],
        serviceType: s.title,
      },
    })),
  };
}
