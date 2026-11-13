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
      'The Green Heritage Resort and Banquet | Wedding Destination in Muzaffarpur',
    template: '%s',
  },
  description:
    'Celebrate every wedding ritual at The Green Heritage Resort and Banquet on Gobarsahi–Sakri Road, Bakarpur, Muzaffarpur. From sunlit poolside haldi and courtyard mehendi to starlit varmala, sacred pheras and family stays. Call or WhatsApp +91 92340 52600.',
  applicationName: 'The Green Heritage Resort and Banquet',
  keywords: [
    'The Green Heritage Resort and Banquet',
    'wedding venue in Muzaffarpur',
    'banquet hall in Muzaffarpur',
    'resort in Muzaffarpur',
    'resort near Bakarpur',
    'resort Gobarsahi Sakri Road',
    'wedding lawns Muzaffarpur Bihar',
    'haldi mehendi sangeet venue Muzaffarpur',
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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'The Green Heritage Resort and Banquet | Wedding Destination in Muzaffarpur',
    description:
      'Where families gather for haldi, mehendi, sangeet, baraat and pheras on Gobarsahi–Sakri Road, Muzaffarpur. Reach us at +91 92340 52600 for wedding dates and venue tours.',
    url: '/',
    siteName: 'The Green Heritage Resort and Banquet',
    locale: 'en_IN',
    type: 'website',
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Green Heritage Resort and Banquet | Wedding Venue in Muzaffarpur',
    description:
      'Open wedding lawns, chandeliered banquet halls and bridal suites in Bakarpur, Gobarsahi–Sakri Road, Muzaffarpur 844127. Call +91 92340 52600.',
    images: [DEFAULT_OG_IMAGES[0]],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const baseUrl = SITE_URL.replace(/\/+$/, '');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Resort', 'EventVenue'],
        '@id': `${baseUrl}/#venue`,
        name: STUDIO_INFO.name,
        alternateName: 'The Green Heritage Resort & Banquet',
        url: baseUrl,
        logo: `${baseUrl}/TGHLogo.png`,
        image: [
          `${baseUrl}/og-preview-brand-v5.jpg`,
          `${baseUrl}/og-preview-brand-v4.jpg`,
          `${baseUrl}/og-resort-preview.jpg`,
          `${baseUrl}/og-resort-aerial.jpg`,
          `${baseUrl}/og-resort-courtyard.jpg`,
          `${baseUrl}/TGHLogo.png`,
        ],
        description:
          'A wedding resort and banquet venue in Bakarpur, Gobarsahi–Sakri Road, Muzaffarpur, Bihar, hosting haldi, mehendi, sangeet, baraat, varmala, receptions and guest family stays. Call or WhatsApp +91 92340 52600.',
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
        priceRange: '₹₹₹',
        currenciesAccepted: 'INR',
        openingHours: 'Mo-Su 00:00-23:59',
        amenityFeature: [
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Grand Wedding Lawns',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Air Conditioned Banquet Halls',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: '150+ Vehicle Valet Parking',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Bridal & Family Suites',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: '24/7 Concierge & Security',
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
        <link rel="icon" type="image/png" href="/TGHLogo.png" />
        <link rel="shortcut icon" type="image/png" href="/TGHLogo.png" />
        <link rel="apple-touch-icon" href="/TGHLogo.png" />
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
