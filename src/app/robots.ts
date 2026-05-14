import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/*.json$'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/', '/_next/static/media/', '/public/'],
      },
    ],
    sitemap: 'https://www.mrcleanplus.ca/sitemap.xml',
    host: 'https://www.mrcleanplus.ca',
  };
}
