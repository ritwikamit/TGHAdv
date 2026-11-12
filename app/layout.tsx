import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, Great_Vibes } from 'next/font/google';
import { TwfClickSound } from '@/components/twf-click-sound';
import { TwfEmailHandler } from '@/components/twf-email-handler';
import { FAQ_ITEMS, STUDIO_INFO } from '@/lib/masoom-data';
import { SITE_URL } from '@/lib/site-routes';
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

const greatVibes = Great_Vibes({
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
    icon: '/TGHLogo.png',
    shortcut: '/TGHLogo.png',
    apple: '/TGHLogo.png',
  },
  openGraph: {
    title: 'The Green Heritage Resort and Banquet | Wedding Destination in Muzaffarpur',
    description:
      'Where families gather for haldi, mehendi, sangeet, baraat and pheras on Gobarsahi–Sakri Road, Muzaffarpur. Reach us at +91 92340 52600 for wedding dates and venue tours.',
    url: '/',
    siteName: 'The Green Heritage Resort and Banquet',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-resort-preview.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'The Green Heritage Resort and Banquet — Aerial Resort View, Illuminated Courtyard & Wedding Stage in Bakarpur, Muzaffarpur',
      },
      {
        url: '/og-resort-aerial.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Illuminated aerial campus view of The Green Heritage Resort and Banquet, Muzaffarpur',
      },
      {
        url: '/og-resort-courtyard.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Heritage facade and courtyard celebrations at The Green Heritage Resort and Banquet, Muzaffarpur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Green Heritage Resort and Banquet | Wedding Venue in Muzaffarpur',
    description:
      'Open wedding lawns, chandeliered banquet halls and bridal suites in Bakarpur, Gobarsahi–Sakri Road, Muzaffarpur 844127. Call +91 92340 52600.',
    images: [
      {
        url: '/og-resort-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'The Green Heritage Resort and Banquet — Wedding Resort & Courtyard Lawns in Muzaffarpur',
      },
    ],
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
      className={`${cormorant.variable} ${jakarta.variable} ${greatVibes.variable}`}
    >
      <head>
        <link rel="icon" type="image/png" href="/TGHLogo.png" />
        <link rel="shortcut icon" type="image/png" href="/TGHLogo.png" />
        <link rel="apple-touch-icon" href="/TGHLogo.png" />
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
