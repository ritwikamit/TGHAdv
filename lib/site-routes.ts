import type { Metadata } from 'next';

export type PageId =
  | 'home'
  | 'films'
  | 'about'
  | 'commissions'
  | 'installations'
  | 'contact'
  | 'faqs';

const resolvedVercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (resolvedVercelHost
    ? `https://${resolvedVercelHost}`
    : 'https://thegreenheritageresort.in');

export const DEFAULT_OG_IMAGES = [
  {
    url: '/og-preview-brand-v5.jpg?v=brand5',
    width: 1200,
    height: 630,
    type: 'image/jpeg',
    alt: 'The Green Heritage Resort and Banquet — Official Logo, Aerial Resort Campus & Wedding Lawns in Bakarpur, Muzaffarpur',
  },
  {
    url: '/og-preview-brand-v4.jpg?v=brand5',
    width: 1200,
    height: 630,
    type: 'image/jpeg',
    alt: 'The Green Heritage Resort and Banquet — Official Logo, Aerial Resort Campus & Wedding Lawns in Bakarpur, Muzaffarpur',
  },
  {
    url: '/og-resort-preview.jpg?v=brand5',
    width: 1200,
    height: 630,
    type: 'image/jpeg',
    alt: 'The Green Heritage Resort and Banquet — Aerial Resort View, Illuminated Courtyard & Wedding Stage in Bakarpur, Muzaffarpur',
  },
  {
    url: '/og-resort-aerial.jpg?v=brand5',
    width: 1200,
    height: 630,
    type: 'image/jpeg',
    alt: 'Illuminated aerial campus view of The Green Heritage Resort and Banquet, Muzaffarpur',
  },
];

export interface PageRouteMeta {
  id: PageId;
  path: string;
  label: string;
  title: string;
  description: string;
  changeFrequency: 'weekly' | 'monthly';
  priority: number;
}

export const PAGE_ROUTES: Record<PageId, PageRouteMeta> = {
  home: {
    id: 'home',
    path: '/',
    label: 'Home',
    title:
      'The Green Heritage Resort and Banquet | Best Wedding Resort & Banquet in Muzaffarpur',
    description:
      'Rated 4.6★ best wedding resort and banquet in Muzaffarpur (Bakarpur, Gobarsahi–Sakri Road). Featuring 2,000+ guest open marriage lawns, crystal banquet halls, poolside haldi, 25+ rooms & complete wedding planner services. Call +91 92340 52600.',
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  about: {
    id: 'about',
    path: '/the-venue',
    label: 'The Venue',
    title:
      'The Venue & Marriage Lawns | Best Wedding Resort on Gobarsahi–Sakri Road, Muzaffarpur',
    description:
      'Discover why The Green Heritage Resort is recognized as the best resort in Muzaffarpur — grand open-air marriage lawns, illuminated Jaipur royal marriage architecture, poolside haldi venue, and Verma family hospitality in Bakarpur.',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  commissions: {
    id: 'commissions',
    path: '/celebrations',
    label: 'Celebrations',
    title:
      'Wedding Packages & Planning | Best Wedding Planner in Muzaffarpur',
    description:
      'Looking for the best wedding planner near me in Muzaffarpur? Explore comprehensive royal wedding packages for haldi, mehendi, sangeet, baraat, and varmala receptions with transparent pricing at The Green Heritage Resort.',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  installations: {
    id: 'installations',
    path: '/spaces-and-halls',
    label: 'Spaces & Halls',
    title:
      'Banquet Halls & Marriage Lawns | Best Marriage Hall in Muzaffarpur',
    description:
      'Host 2,000+ guests at the best banquet hall and open wedding lawns in Muzaffarpur. Centrally air-conditioned crystal chandelier halls, bridal dressing suite, 25+ AC guest rooms, and 150+ car valet parking in Bakarpur.',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  films: {
    id: 'films',
    path: '/wedding-films',
    label: 'Wedding Films',
    title:
      'Wedding Films & Photo Gallery | Real Weddings at Best Wedding Resort Muzaffarpur',
    description:
      'Watch real wedding films, baraat dances, and cinematic varmala ceremonies captured at The Green Heritage Resort and Banquet, Muzaffarpur. Experience authentic celebrations across our lawns and crystal hall.',
    changeFrequency: 'weekly',
    priority: 0.85,
  },
  faqs: {
    id: 'faqs',
    path: '/faqs',
    label: 'FAQs & Guide',
    title:
      'FAQs & Venue Guide | Best Wedding Resort & Planner in Muzaffarpur Q&A',
    description:
      'Direct answers to top questions: Which is the best wedding resort in Muzaffarpur? Best wedding planner near me? Guest capacity, catering options, room booking, and directions to Gobarsahi–Sakri Road, Bakarpur.',
    changeFrequency: 'monthly',
    priority: 0.85,
  },
  contact: {
    id: 'contact',
    path: '/contact',
    label: 'Contact & Visit',
    title:
      'Contact, Bookings & Location | Best Resort in Muzaffarpur',
    description:
      'Book wedding dates or schedule a walkthrough at the best wedding resort in Muzaffarpur. Call or WhatsApp +91 92340 52600, email ajay888277@gmail.com, or get Google Maps directions to Gobarsahi–Sakri Road, Bakarpur 844127.',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
};

export function buildPageMetadata(pageId: PageId): Metadata {
  const routeMeta = PAGE_ROUTES[pageId];
  return {
    title: routeMeta.title,
    description: routeMeta.description,
    alternates: {
      canonical: routeMeta.path,
    },
    openGraph: {
      title: routeMeta.title,
      description: routeMeta.description,
      url: routeMeta.path,
      siteName: 'The Green Heritage Resort and Banquet',
      locale: 'en_IN',
      type: 'website',
      images: DEFAULT_OG_IMAGES,
    },
    twitter: {
      card: 'summary_large_image',
      title: routeMeta.title,
      description: routeMeta.description,
      images: [DEFAULT_OG_IMAGES[0]],
    },
  };
}

export function getPageIdFromPath(pathname: string): PageId {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const match = Object.values(PAGE_ROUTES).find((r) => r.path === clean);
  return match ? match.id : 'home';
}

