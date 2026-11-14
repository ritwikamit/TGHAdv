import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, Marcellus } from 'next/font/google';
import { TwfClickSound } from '@/components/twf-click-sound';
import { TwfEmailHandler } from '@/components/twf-email-handler';
import { FAQ_ITEMS, STUDIO_INFO } from '@/lib/masoom-data';
import { DEFAULT_OG_IMAGES, SITE_URL } from '@/lib/site-routes';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default:
      'The Green Heritage Resort and Banquet | Best Wedding Resort & Banquet in Muzaffarpur',
    template: '%s | The Green Heritage Resort Muzaffarpur',
  },
  description:
    'Rated 4.6★ best wedding resort and banquet in Muzaffarpur (Bakarpur, Gobarsahi–Sakri Road). Featuring 2,000+ guest capacity open marriage lawns, crystal banquet halls, poolside haldi, 25+ luxury rooms, and complete wedding planner services. Call or WhatsApp +91 92340 52600.',
  applicationName: 'The Green Heritage Resort and Banquet',
  keywords: [
    'The Green Heritage Resort and Banquet',
    'best resort in muzaffarpur',
    'best resort in muzzafarpur',
    'best wedding resort in muzaffarpur',
    'best wedding resort in muzzafarpur',
    'best wedding planner near me',
    'best wedding planner in muzaffarpur',
    'wedding resort near me',
    'resort near me',
    'best banquet hall in muzaffarpur',
    'best marriage hall in muzaffarpur',
    'marriage hall in muzzafarpur',
    'banquet hall in muzzafarpur',
    'wedding lawns in muzaffarpur',
    'open air marriage lawn muzaffarpur',
    'luxury resort in bihar',
    'destination wedding in muzaffarpur',
    'resort on gobarsahi sakri road',
    'resort in bakarpur muzaffarpur',
    'poolside haldi venue muzaffarpur',
    'wedding resort with rooms muzaffarpur',
    'Jaipur royal marriage theme muzaffarpur',
    'The Green Heritage Resort',
  ],
  authors: [{ name: 'The Green Heritage Resort and Banquet' }],
  creator: 'The Green Heritage Resort and Banquet',
  publisher: 'The Green Heritage Resort and Banquet',
  category: 'Hospitality & Wedding Venues',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/icon-48x48.png?v=2', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96x96.png?v=2', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192x192.png?v=2', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png?v=2', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'The Green Heritage Resort and Banquet | Best Wedding Resort in Muzaffarpur',
    description:
      'Where families gather for royal weddings, haldi mornings, sangeet nights and joyful stays on Gobarsahi–Sakri Road, Muzaffarpur. Reach us at +91 92340 52600 for wedding dates and venue tours.',
    url: '/',
    siteName: 'The Green Heritage Resort and Banquet',
    locale: 'en_IN',
    type: 'website',
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Green Heritage Resort and Banquet | Best Wedding Resort in Muzaffarpur',
    description:
      'Grand wedding lawns, chandeliered banquet halls and bridal suites in Bakarpur, Gobarsahi–Sakri Road, Muzaffarpur 844127. Call +91 92340 52600.',
    images: [DEFAULT_OG_IMAGES[0]],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const baseUrl = SITE_URL.replace(/\/+$/, '');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Resort', 'EventVenue', 'Hotel', 'LocalBusiness'],
        '@id': `${baseUrl}/#venue`,
        name: STUDIO_INFO.name,
        alternateName: [
          'The Green Heritage Resort & Banquet',
          'The Green Heritage Muzaffarpur',
          'Green Heritage Resort',
          'The Green Heritage',
        ],
        slogan: 'Best Wedding Resort & Marriage Banquet in Muzaffarpur',
        keywords:
          'best resort in muzaffarpur, best wedding resort in muzaffarpur, best wedding planner near me, best marriage hall in muzaffarpur, best banquet hall in muzaffarpur, wedding resort near me, best resort in muzzafarpur',
        url: baseUrl,
        logo: `${baseUrl}/icon-512x512.png?v=2`,
        image: [
          `${baseUrl}/og-preview-brand-v5.jpg`,
          `${baseUrl}/og-preview-brand-v4.jpg`,
          `${baseUrl}/og-resort-preview.jpg`,
          `${baseUrl}/og-resort-aerial.jpg`,
          `${baseUrl}/og-resort-courtyard.jpg`,
          `${baseUrl}/TGHLogo.png`,
        ],
        description:
          'Rated 4.6★ best wedding resort and banquet in Muzaffarpur (Bakarpur, Gobarsahi–Sakri Road). Featuring 2,000+ guest capacity open-air marriage lawns, crystal banquet halls, poolside haldi arena, 25+ luxury rooms, and complete wedding planner services.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Bakarpur, Gobarsahi–Sakri Road',
          addressLocality: 'Muzaffarpur',
          addressRegion: 'Bihar',
          postalCode: '844127',
          addressCountry: 'IN',
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Muzaffarpur',
          },
          {
            '@type': 'City',
            name: 'Patna',
          },
          {
            '@type': 'City',
            name: 'Hajipur',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'North Bihar',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Bihar',
          },
        ],
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '26.06385',
          longitude: '85.3504979',
        },
        telephone: '+91-9234052600',
        email: STUDIO_INFO.email,
        hasMap: STUDIO_INFO.mapsUrl,
        priceRange: '₹₹ - Affordable & Luxury Wedding Packages',
        currenciesAccepted: 'INR',
        openingHours: 'Mo-Su 00:00-23:59',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.6',
          reviewCount: '550',
          bestRating: '5.0',
          worstRating: '1.0',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Wedding & Event Packages',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Complete Wedding Planning & Coordination',
                description:
                  'End-to-end wedding planner services in Muzaffarpur including royal mandap styling, stage decor, floral design, lighting, sound and guest management.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Royal Wedding Lawns & Receptions',
                description:
                  'Sprawling open-air green wedding lawns accommodating up to 2,000+ guests for grand varmala, pheras and celebrations.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Air Conditioned Crystal Banquet Hall',
                description:
                  'Centrally AC banquet hall with crystal chandeliers for indoor sangeet, ring ceremony, and VIP dining up to 700 guests.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Poolside Haldi & Mehendi Arena',
                description:
                  'Scenic open-air poolside venue for sunlit haldi ceremonies, mehendi rituals, and vibrant pre-wedding celebrations.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Bridal Suites & 25+ Luxury Guest Rooms',
                description:
                  'Dedicated bridal vanity dressing suite and 25+ air-conditioned executive rooms and private cottages for family stays.',
              },
            },
          ],
        },
        amenityFeature: [
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Grand Wedding Lawns (2,000+ Guests)',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Air Conditioned Crystal Banquet Halls',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: '150+ Vehicle Valet Parking',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Bridal Vanity Suite & Family Cottages',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Poolside Haldi & Mehendi Arena',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Pure Vegetarian & Multi-Cuisine Catering',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: '24/7 Concierge, Power Backup & Security',
            value: true,
          },
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-9234052600',
          email: STUDIO_INFO.email,
          contactType: 'reservations and wedding enquiries',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi'],
        },
        sameAs: [
          STUDIO_INFO.instagram,
          STUDIO_INFO.facebook,
          STUDIO_INFO.tripadvisor,
          STUDIO_INFO.justdial,
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: STUDIO_INFO.name,
        inLanguage: 'en-IN',
        publisher: {
          '@id': `${baseUrl}/#venue`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'The Venue',
            item: `${baseUrl}/the-venue`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Celebrations & Planning',
            item: `${baseUrl}/celebrations`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Spaces & Banquet Halls',
            item: `${baseUrl}/spaces-and-halls`,
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Wedding Films',
            item: `${baseUrl}/wedding-films`,
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: 'FAQs & Venue Guide',
            item: `${baseUrl}/faqs`,
          },
          {
            '@type': 'ListItem',
            position: 7,
            name: 'Contact & Booking',
            item: `${baseUrl}/contact`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}/#faq`,
        mainEntity: FAQ_ITEMS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${jakarta.variable} ${marcellus.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48x48.png?v=2" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon-96x96.png?v=2" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png?v=2" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        {/* Preload brand logo for instant loading screen display */}
        <link rel="preload" as="image" href="/TGHLogo.webp" type="image/webp" fetchPriority="high" />
        {/* Preload hero images for instant switching between dedicated pages */}
        <link rel="preload" as="image" href="/TGHPhotos/heroes/films-hero.webp" type="image/webp" />
        <link rel="preload" as="image" href="/TGHPhotos/heroes/venue-hero-v2.webp" type="image/webp" />
        <link rel="preload" as="image" href="/TGHPhotos/heroes/packages-hero.webp" type="image/webp" />
        <link rel="preload" as="image" href="/TGHPhotos/HotelGround/Hall/banquet-hall.webp" type="image/webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#061208] text-[#0f1f12] font-sans antialiased selection:bg-[#f0b400]/30 selection:text-[#0f1f12]"
      >
        <TwfClickSound />
        <TwfEmailHandler />
        {children}
      </body>
    </html>
  );
}
