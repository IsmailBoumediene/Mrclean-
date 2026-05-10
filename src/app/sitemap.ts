import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.mrcleanplus.ca';

const routes = [
  '',
  '/about',
  '/services',
  '/contact',
  '/consult',
  '/faq',
  '/privacy-policy',
  '/terms',
];

const locales = ['fr', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date('2026-05-10');

  for (const locale of locales) {
    for (const route of routes) {
      const normalizedRoute = route ? `${route}` : '';
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            fr: `${BASE_URL}/fr${normalizedRoute}`,
            en: `${BASE_URL}/en${normalizedRoute}`,
          },
        },
      });
    }
  }

  return entries;
}
