import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-routes';

export default function robots(): MetadataRoute.Robots {
  const normalizedBase = SITE_URL.replace(/\/+$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'OAI-SearchBot',
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'Google-Extended',
          'ClaudeBot',
          'Applebot-Extended',
          'Bingbot',
        ],
        allow: '/',
      },
    ],
    sitemap: `${normalizedBase}/sitemap.xml`,
    host: normalizedBase,
  };
}
