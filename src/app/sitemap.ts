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

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
