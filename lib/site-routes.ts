export type PageId =
  | 'home'
  | 'films'
  | 'about'
  | 'commissions'
  | 'installations'
  | 'contact'
  | 'faqs';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://thegreenheritageresort.in');

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
      'The Green Heritage Resort and Banquet | Wedding Destination in Muzaffarpur',
    description:
      'Celebrate every wedding ritual at The Green Heritage Resort and Banquet on Gobarsahi–Sakri Road, Bakarpur, Muzaffarpur, Bihar. Explore open lawns, chandelier banquet halls, bridal suites, haldi, sangeet and wedding films. Call +91 92340 52600.',
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  about: {
    id: 'about',
    path: '/the-venue',
    label: 'The Venue',
    title:
      'The Venue, Director & Verma Family | The Green Heritage Resort, Muzaffarpur',
    description:
      'Discover The Green Heritage Resort and Banquet in Bakarpur, Gobarsahi–Sakri Road, Muzaffarpur 844127 — venue video walkthroughs, the Director’s note, the Verma Family’s welcome, and celebration grounds.',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  commissions: {
    id: 'commissions',
    path: '/celebrations',
    label: 'Celebrations',
    title:
      'Weddings, Haldi, Sangeet & Guest Stays | The Green Heritage Resort, Muzaffarpur',
    description:
      'Plan multi-day weddings, haldi mornings, mehendi courtyards, sangeet nights, receptions and family room blocks at The Green Heritage Resort and Banquet in Muzaffarpur.',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  installations: {
    id: 'installations',
    path: '/spaces-and-halls',
    label: 'Spaces & Halls',
    title:
      'Open Wedding Lawns, Banquet Hall & Suites | The Green Heritage Resort, Muzaffarpur',
    description:
      'Explore open green wedding lawns, chandeliered indoor banquet hall, lakeside poolside lawns, and bridal and family guest suites in Bakarpur, Muzaffarpur.',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  films: {
    id: 'films',
    path: '/wedding-films',
    label: 'Wedding Films',
    title:
      'Wedding Films & Event Gallery | The Green Heritage Resort and Banquet, Muzaffarpur',
    description:
      'Watch real haldi, baraat, varmala and campus walkthrough films alongside authentic wedding and property photography at The Green Heritage Resort, Muzaffarpur.',
    changeFrequency: 'weekly',
    priority: 0.85,
  },
  faqs: {
    id: 'faqs',
    path: '/faqs',
    label: 'FAQs & Guide',
    title:
      'FAQs, Venue Location & Booking Policies | The Green Heritage Resort, Muzaffarpur',
    description:
      'Verified answers about The Green Heritage Resort and Banquet directions on Gobarsahi–Sakri Road, room availability, multi-day wedding hosting, enquiry terms and privacy policies.',
    changeFrequency: 'monthly',
    priority: 0.85,
  },
  contact: {
    id: 'contact',
    path: '/contact',
    label: 'Contact & Visit',
    title:
      'Contact, Directions & Date Enquiry | The Green Heritage Resort and Banquet',
    description:
      'Call or WhatsApp +91 92340 52600, email ajay888277@gmail.com, send an online wedding date enquiry or open Google Maps directions to Bakarpur, Muzaffarpur 844127.',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
};

export function getPageIdFromPath(pathname: string): PageId {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const match = Object.values(PAGE_ROUTES).find((r) => r.path === clean);
  return match ? match.id : 'home';
}

