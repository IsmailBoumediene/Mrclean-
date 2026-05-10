import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.mrcleanplus.ca/sitemap.xml',
    host: 'https://www.mrcleanplus.ca',
  };
}
