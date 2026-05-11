import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.mrcleanplus.ca';

type RouteCfg = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
};

const routes: RouteCfg[] = [
  { path: '',                  priority: 1.0, changeFrequency: 'weekly'  },
  { path: '/services',         priority: 0.95, changeFrequency: 'weekly' },
  { path: '/consult',          priority: 0.95, changeFrequency: 'monthly' },
  { path: '/contact',          priority: 0.85, changeFrequency: 'monthly' },
  { path: '/about',            priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq',              priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy-policy',   priority: 0.3, changeFrequency: 'yearly'  },
  { path: '/terms',            priority: 0.3, changeFrequency: 'yearly'  },
];

const locales = ['fr', 'en'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            'fr-CA': `${BASE_URL}/fr${route.path}`,
            'en-CA': `${BASE_URL}/en${route.path}`,
            fr: `${BASE_URL}/fr${route.path}`,
            en: `${BASE_URL}/en${route.path}`,
            'x-default': `${BASE_URL}/fr${route.path}`,
          },
        },
      });
    }
  }

  return entries;
}
