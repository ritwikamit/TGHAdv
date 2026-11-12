import type { MetadataRoute } from 'next';
import { PAGE_ROUTES, SITE_URL } from '@/lib/site-routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace(/\/+$/, '');
  const lastModified = new Date('2026-11-12');

  const routeImages: Record<string, string[]> = {
    home: [
      `${baseUrl}/og-resort-preview.jpg`,
      `${baseUrl}/og-resort-aerial.jpg`,
      `${baseUrl}/og-resort-courtyard.jpg`,
    ],
    about: [
      `${baseUrl}/TGHPhotos/heroes/venue-hero-v2.webp`,
      `${baseUrl}/TGHPhotos/founder.webp`,
      `${baseUrl}/TGHPhotos/verma-family.webp`,
    ],
    films: [`${baseUrl}/TGHPhotos/heroes/films-hero.webp`],
    commissions: [`${baseUrl}/TGHPhotos/heroes/packages-hero.webp`],
    installations: [`${baseUrl}/TGHPhotos/heroes/spaces-hero.webp`],
    faqs: [`${baseUrl}/og-resort-preview.jpg`],
    contact: [`${baseUrl}/og-resort-courtyard.jpg`],
  };

  return Object.values(PAGE_ROUTES).map((route) => ({
    url: route.path === '/' ? baseUrl : `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images: routeImages[route.id] || [`${baseUrl}/og-resort-preview.jpg`],
  }));
}
