export interface ExifData {
  lens: string;
  camera: string;
  setting: string;
}

export interface PhotoFrame {
  id: string;
  title: string;
  scriptHighlight: string;
  category: 'weddings' | 'pre-wedding' | 'portraits' | 'candid';
  categoryLabel: string;
  couple: string;
  location: string;
  year: string;
  imageUrl: string;
  aspect: 'landscape' | 'portrait';
  imagePosition?: string;
  description: string;
  emotionalExcerpt: string;
  exif: ExifData;
}

export interface CinemaFilm {
  id: string;
  youtubeId?: string;
  youtubeUrl?: string;
  videoSrc?: string;
  instagramUrl?: string;
  reelCode?: string;
  isPortrait?: boolean;
  objectPosition?: string;
  title: string;
  scriptHighlight: string;
  couple: string;
  location: string;
  year: string;
  month: string;
  duration: string;
  thumbnailUrl: string;
  heroImageUrl: string;
  aiConceptPrompt: string;
  synopsis: string;
  emotionalHook: string;
  category: 'palace' | 'royal' | 'intimate' | 'engagement';
}

export interface InstagramReelItem {
  id: string;
  code: string;
  instagramUrl: string;
  embedUrl: string;
  videoSrc: string;
  posterUrl: string;
  title: string;
  couple: string;
  location: string;
  caption: string;
  isPortrait: boolean;
  category: 'hero' | 'portrait' | 'bridal' | 'story' | 'footer';
}

export interface CommissionService {
  id: string;
  number: string;
  title: string;
  scriptHighlight: string;
  tagline: string;
  description: string;
  deliverables: string[];
  humanNote: string;
  dayLabel: string;
  phaseTitle: string;
}

export interface VenueInstallation {
  id: string;
  title: string;
  venue: string;
  location: string;
  atmosphereTag: string;
  summary: string;
  lightingNotes: string;
  acousticNotes: string;
  imageUrl: string;
  secondaryImageUrl: string;
  dateSeason: string;
}

export interface MapLocationPin {
  id: string;
  city: string;
  venue: string;
  state: string;
  couple: string;
  year: string;
  xPercent: number;
  yPercent: number;
  lat: string;
  lng: string;
  mapQuery: string;
  zoom: number;
  description: string;
  imageUrl: string;
  filmId?: string;
}

export interface GratitudeNote {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  imageUrl: string;
}

export interface StoryScene {
  sceneNumber: string;
  year: string;
  title: string;
  scriptTitle: string;
  headline: string;
  narrative: string;
  highlightStat: string;
  imageUrl: string;
  secondaryImageUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category:
  | 'Location & Directions'
  | 'Stay & Rooms'
  | 'Weddings & Events'
  | 'Facilities & Booking';
}

export const STUDIO_INFO = {
  name: 'The Green Heritage Resort and Banquet',
  shortName: 'The Green Heritage',
  founder: 'The Green Heritage Wedding Team',
  est: 'Muzaffarpur, Bihar',
  logoUrl: '/TGHLogo.png',
  tagline: 'Where every family blessing becomes a memory to keep',
  subTagline: 'Weddings, Phere, Pre-Wedding Rituals & Family Stays · Muzaffarpur',
  address: 'Bakarpur, Gobarsahi–Sakri Road, Muzaffarpur, Bihar 844127',
  shortAddress: 'Bakarpur, Gobarsahi–Sakri Road, Muzaffarpur',
  phoneNumber: '+91 92340 52600',
  phonePrimaryUrl: 'tel:+919234052600',
  whatsappNumber: '919234052600',
  whatsappUrl:
    'https://wa.me/919234052600?text=Hello%20The%20Green%20Heritage%20Resort%20and%20Banquet%2C%20I%20would%20like%20to%20enquire%20about%20wedding%20dates%20and%20venue%20arrangements.',
  email: 'ajay888277@gmail.com',
  emailUrl: 'mailto:ajay888277@gmail.com',
  instagram: 'https://www.instagram.com/thegreenheritagemuz/?hl=en',
  instagramHandle: '@thegreenheritagemuz',
  facebook: 'https://www.facebook.com/thegreenheritagemuz/',
  facebookHandle: 'thegreenheritagemuz',
  tripadvisor:
    'https://www.tripadvisor.in/Hotel_Review-g26727268-d26724910-Reviews-The_Green_Heritage_Resort_and_Banquet-Bakarpur_Muzaffarpur_District_Bihar.html',
  justdial:
    'https://www.justdial.com/Muzaffarpur/The-Green-Heritage-Resort-Banquet-Panchayat-Dariyapur-Kafen-Dariyapur-Kafen/9999PX621-X621-230615180602-I1E9_BZDET',
  websiteUrl: 'https://thegreenheritageresort.in',
  mapsUrl:
    'https://www.google.com/maps/place/The+Green+Heritage+Resort+and+Banquet/@26.0638548,85.347923,17z/data=!3m1!4b1!4m9!3m8!1s0x39ed1724a0dfa55b:0x5737c356be2eaddb!5m2!4m1!1i2!8m2!3d26.06385!4d85.3504979!16s%2Fg%2F11kq2x_1j4?entry=ttu&g_ep=EgoyMDI2MTEwOS4wIKXMDSoASAFQAw%3D%3D',
  mapsEmbedUrl:
    'https://maps.google.com/maps?ll=26.06385,85.3504979&q=26.06385,85.3504979+(The+Green+Heritage+Resort+and+Banquet)&hl=en&z=17&ie=UTF8&iwloc=&output=embed',
  googleReviewUrl:
    'https://search.google.com/local/writereview?placeid=ChIJW6DfoCQX7TkR260uvlbDN1c',
  reviewQrUrl: '/google-review-qr.webp',
  googleRating: '4.6',
  googleReviewCount: '550+',
  marriagesHosted: '350+',
  yearsOfHeritage: '10+',
  theme: 'Inspired by Jaipur Royal Marriages · Royal Palace Architecture & Hospitality',
  lawnCapacity: '1,500 – 2,000+ Guests',
  hallCapacity: '350 – 500+ Seated (700 Floating)',
  totalRooms: '25+ Executive AC Rooms & Private Cottages',
  startingPackage: 'Affordable for All Wedding Types & Religions',
  parkingCapacity: '150+ Cars & 200+ Bikes (Valet Assisted)',
  cateringFacilities:
    'In-House Pure Veg & Multi-Cuisine Feasts + Approved Outside Caterers Welcome',
  studioHours: 'Call or WhatsApp +91 92340 52600 for wedding dates and venue tours',
};

// ============================================================================
// WEDDING VIDEO REELS (12 Widescreen Landscape + 10 Portrait Ceremony Reels)
// ============================================================================
export const INSTAGRAM_REELS: InstagramReelItem[] = [
  // --- 12 LANDSCAPE WEDDING REELS ---
  {
    id: 'reel-land-1',
    code: 'DYKE6VGzG3Y',
    instagramUrl: 'https://www.instagram.com/reel/DYKE6VGzG3Y/',
    embedUrl: 'https://www.instagram.com/reel/DYKE6VGzG3Y/embed',
    videoSrc: '/reels/DYKE6VGzG3Y.mp4',
    posterUrl: '/reels/posters/DYKE6VGzG3Y.jpg',
    title: "Payal & Saurav's Sunlit Haldi Morning",
    couple: "Payal & Saurav's Haldi",
    location: 'Garden Lawn · Bakarpur',
    caption:
      'Hand-lettered welcome boards standing beside marigolds and bright paper signs while friends gather for a sunlit turmeric morning.',
    isPortrait: false,
    category: 'story',
  },
  {
    id: 'reel-land-2',
    code: 'DYB-3YUSOa6',
    instagramUrl: 'https://www.instagram.com/reel/DYB-3YUSOa6/',
    embedUrl: 'https://www.instagram.com/reel/DYB-3YUSOa6/embed',
    videoSrc: '/reels/DYB-3YUSOa6.mp4',
    posterUrl: '/reels/posters/DYB-3YUSOa6.jpg',
    title: 'Henna Stains & Crimson Bangles',
    couple: "A Bride's Quiet Pause",
    location: 'Bridal Suite · Muzaffarpur',
    caption:
      'Before the dhol starts outside, her henna-stained hands rest softly against red bangles while family members finish draping her dupatta.',
    isPortrait: false,
    category: 'bridal',
  },
  {
    id: 'reel-land-3',
    code: 'DXMryPLE2KF',
    instagramUrl: 'https://www.instagram.com/reel/DXMryPLE2KF/',
    embedUrl: 'https://www.instagram.com/reel/DXMryPLE2KF/embed',
    videoSrc: '/reels/DXMryPLE2KF.mp4',
    posterUrl: '/reels/posters/DXMryPLE2KF.jpg',
    title: 'Daytime Courtyard Dance Before Haldi',
    couple: 'Courtyard Haldi Joy',
    location: 'Open Portico · Bakarpur',
    caption:
      'Aunts, cousins and friends circle the open courtyard outside the main building, laughing through carefree afternoon steps under clear skies.',
    isPortrait: false,
    category: 'story',
  },
  {
    id: 'reel-land-4',
    code: 'DXMrsSNE86v',
    instagramUrl: 'https://www.instagram.com/reel/DXMrsSNE86v/',
    embedUrl: 'https://www.instagram.com/reel/DXMrsSNE86v/embed',
    videoSrc: '/reels/DXMrsSNE86v.mp4',
    posterUrl: '/reels/posters/DXMrsSNE86v.jpg',
    title: 'Golden Chandeliers & Crimson Embroidery',
    couple: 'Waiting Beside the Chandeliers',
    location: 'Banquet Hall · Muzaffarpur',
    caption:
      'Warm chandelier candlelight reflects across fine zari work while the hall quiets for the couple’s evening entrance.',
    isPortrait: false,
    category: 'bridal',
  },
  {
    id: 'reel-land-5',
    code: 'DXEBKD9B4zt',
    instagramUrl: 'https://www.instagram.com/reel/DXEBKD9B4zt/',
    embedUrl: 'https://www.instagram.com/reel/DXEBKD9B4zt/embed',
    videoSrc: '/reels/DXEBKD9B4zt.mp4',
    posterUrl: '/reels/posters/DXEBKD9B4zt.jpg',
    title: 'Varmala Under the Floral Mandap',
    couple: 'Garland Exchange Under the Stars',
    location: 'Open Mandap Lawn',
    caption:
      'Twin floral pillars wrapped in roses frame the couple on stage while parents watch proudly from the front row.',
    isPortrait: false,
    category: 'story',
  },
  {
    id: 'reel-land-6',
    code: 'DXB6fqbEXBp',
    instagramUrl: 'https://www.instagram.com/reel/DXB6fqbEXBp/',
    embedUrl: 'https://www.instagram.com/reel/DXB6fqbEXBp/embed',
    videoSrc: '/reels/DXB6fqbEXBp.mp4',
    posterUrl: '/reels/posters/DXB6fqbEXBp.jpg',
    title: 'Walking Beneath Lanterns & White Blooms',
    couple: 'Their First Walk Together',
    location: 'Portico Lawn · Bakarpur',
    caption:
      'Hand in hand under hanging floral arches and warm lanterns, every rushed wedding morning softens into one calm breath together.',
    isPortrait: false,
    category: 'story',
  },
  {
    id: 'reel-land-7',
    code: 'DWrVDdGAaxq',
    instagramUrl: 'https://www.instagram.com/reel/DWrVDdGAaxq/',
    embedUrl: 'https://www.instagram.com/reel/DWrVDdGAaxq/embed',
    videoSrc: '/reels/DWrVDdGAaxq.mp4',
    posterUrl: '/reels/posters/DWrVDdGAaxq.jpg',
    title: 'From the Carved Jharokha Balcony',
    couple: 'Watching the Baraat Arrive',
    location: 'Heritage Facade Balcony',
    caption:
      'Glowing softly in the upper arched window above the main courtyard, the bride looks out as the baraat music reaches the gate.',
    isPortrait: false,
    category: 'bridal',
  },
  {
    id: 'reel-land-8',
    code: 'DWrOzj5gYgT',
    instagramUrl: 'https://www.instagram.com/reel/DWrOzj5gYgT/',
    embedUrl: 'https://www.instagram.com/reel/DWrOzj5gYgT/embed',
    videoSrc: '/reels/DWrOzj5gYgT.mp4',
    posterUrl: '/reels/posters/DWrOzj5gYgT.jpg',
    title: 'Groom & Friends Dancing Through the Baraat',
    couple: 'Tere Ghar Aaya · Baraat Dance',
    location: 'Main Entrance Courtyard',
    caption:
      'Golden ceremonial chattars sway behind the groom while childhood friends cheer and lift their arms to the dhol beats.',
    isPortrait: false,
    category: 'story',
  },
  {
    id: 'reel-land-9',
    code: 'DWMZdqkyP85',
    instagramUrl: 'https://www.instagram.com/reel/DWMZdqkyP85/',
    embedUrl: 'https://www.instagram.com/reel/DWMZdqkyP85/embed',
    videoSrc: '/reels/DWMZdqkyP85.mp4',
    posterUrl: '/reels/posters/DWMZdqkyP85.jpg',
    title: 'Blessings Over Brass & Turmeric',
    couple: 'Elder Hands & Ritual Thali',
    location: 'Ceremony Courtyard',
    caption:
      'Turmeric-dusted palms rest over a brass puja platter while elders lean close to whisper blessings steeped in family tradition.',
    isPortrait: false,
    category: 'story',
  },
  {
    id: 'reel-land-10',
    code: 'DV5PuTSD06V',
    instagramUrl: 'https://www.instagram.com/reel/DV5PuTSD06V/',
    embedUrl: 'https://www.instagram.com/reel/DV5PuTSD06V/embed',
    videoSrc: '/reels/DV5PuTSD06V.mp4',
    posterUrl: '/reels/posters/DV5PuTSD06V.jpg',
    title: "Anamika & Sunny's Beginning",
    couple: 'Anamika & Sunny',
    location: 'The Green Heritage Lawn',
    caption:
      'A quiet mirror moment in ivory sherwani followed by warm smiles, family hugs and heartfelt vows beneath open skies.',
    isPortrait: false,
    category: 'story',
  },
  {
    id: 'reel-land-11',
    code: 'DVwj-NrE08f',
    instagramUrl: 'https://www.instagram.com/reel/DVwj-NrE08f/',
    embedUrl: 'https://www.instagram.com/reel/DVwj-NrE08f/embed',
    videoSrc: '/reels/DVwj-NrE08f.mp4',
    posterUrl: '/reels/posters/DVwj-NrE08f.jpg',
    title: "Shivani & Aarush's Chandelier Wedding",
    couple: 'Shivani & Aarush',
    location: 'Indoor Banquet Hall',
    caption:
      'Quiet tears during the vows and late-night laughter under warm chandeliers filled Shivani and Aarush’s wedding night with soul.',
    isPortrait: false,
    category: 'bridal',
  },
  {
    id: 'reel-land-12',
    code: 'DU2tfnGE3gb',
    instagramUrl: 'https://www.instagram.com/reel/DU2tfnGE3gb/',
    embedUrl: 'https://www.instagram.com/reel/DU2tfnGE3gb/embed',
    videoSrc: '/reels/DU2tfnGE3gb.mp4',
    posterUrl: '/reels/posters/DU2tfnGE3gb.jpg',
    title: 'Sparklers & Promises at Dusk',
    couple: 'Hand in Hand Before Forever',
    location: 'Heritage Facade · Bakarpur',
    caption:
      'Silver sparkles rise beside white columns as the couple steps forward together to greet every smiling face waiting for them.',
    isPortrait: false,
    category: 'story',
  },

  // --- 10 PORTRAIT WEDDING REELS ---
  {
    id: 'reel-port-1',
    code: 'C7_rNNXv3zo',
    instagramUrl: 'https://www.instagram.com/reel/C7_rNNXv3zo/',
    embedUrl: 'https://www.instagram.com/reel/C7_rNNXv3zo/embed',
    videoSrc: '/reels/C7_rNNXv3zo.mp4',
    posterUrl: '/reels/posters/C7_rNNXv3zo.jpg',
    title: 'Poolside Campus & Floral Aisle',
    couple: 'The Wedding Campus Aerial',
    location: 'Bakarpur · Gobarsahi–Sakri Road',
    caption:
      'Open green lawns, the turquoise pool deck, and our decorated banquet entrance come together for multi-day family weddings.',
    isPortrait: true,
    category: 'portrait',
  },
  {
    id: 'reel-port-2',
    code: 'DdRCjAozIMf',
    instagramUrl: 'https://www.instagram.com/reel/DdRCjAozIMf/',
    embedUrl: 'https://www.instagram.com/reel/DdRCjAozIMf/embed',
    videoSrc: '/reels/DdRCjAozIMf.mp4',
    posterUrl: '/reels/posters/DdRCjAozIMf.jpg',
    title: 'Poolside Haldi Mandap & Marigold Path',
    couple: 'Poolside Haldi Setup',
    location: 'Poolside Lawn · Muzaffarpur',
    caption:
      'Marigold garlands and painted courtyard runners lead straight to the haldi chauki overlooking bright water under the morning sky.',
    isPortrait: true,
    category: 'portrait',
  },
  {
    id: 'reel-port-3',
    code: 'DS8DEbWE0dy',
    instagramUrl: 'https://www.instagram.com/reel/DS8DEbWE0dy/',
    embedUrl: 'https://www.instagram.com/reel/DS8DEbWE0dy/embed',
    videoSrc: '/reels/DS8DEbWE0dy.mp4',
    posterUrl: '/reels/posters/DS8DEbWE0dy.jpg',
    title: 'Sangeet Crowd & Open-Air Stage Lights',
    couple: 'Midnight Sangeet & Confetti',
    location: 'Celebration Lawn · Muzaffarpur',
    caption:
      'When friends climb the stage under floodlights and confetti drifts through the night breeze, nobody asks what hour it is.',
    isPortrait: true,
    category: 'portrait',
  },
  {
    id: 'reel-port-4',
    code: 'DSsAth7EwkA',
    instagramUrl: 'https://www.instagram.com/reel/DSsAth7EwkA/',
    embedUrl: 'https://www.instagram.com/reel/DSsAth7EwkA/embed',
    videoSrc: '/reels/DSsAth7EwkA.mp4',
    posterUrl: '/reels/posters/DSsAth7EwkA.jpg',
    title: 'Live Stage Music & Cocktail Evenings',
    couple: 'Live Band & Poolside Dinner',
    location: 'Open-Air Lawn Stage',
    caption:
      'Live music, warm emerald spotlights and poolside dinner tables turn reception eves into nights guests talk about all year.',
    isPortrait: true,
    category: 'portrait',
  },
  {
    id: 'reel-port-5',
    code: 'DSX6M96E0xo',
    instagramUrl: 'https://www.instagram.com/reel/DSX6M96E0xo/',
    embedUrl: 'https://www.instagram.com/reel/DSX6M96E0xo/embed',
    videoSrc: '/reels/DSX6M96E0xo.mp4',
    posterUrl: '/reels/posters/DSX6M96E0xo.jpg',
    title: 'Jharokha Reveal & Ceremonial Fans',
    couple: 'Royal Archway Entrance',
    location: 'Grand Courtyard Gate',
    caption:
      'She pauses at the carved upper balcony before stepping down through royal blue chattar fans toward the waiting mandap.',
    isPortrait: true,
    category: 'bridal',
  },
  {
    id: 'reel-port-6',
    code: 'DRuInL5kZdn',
    instagramUrl: 'https://www.instagram.com/reel/DRuInL5kZdn/',
    embedUrl: 'https://www.instagram.com/reel/DRuInL5kZdn/embed',
    videoSrc: '/reels/DRuInL5kZdn.mp4',
    posterUrl: '/reels/posters/DRuInL5kZdn.jpg',
    title: 'The First Look Under Tall Colonnades',
    couple: 'Her Walk to the Mandap',
    location: 'Main Pavilion · Bakarpur',
    caption:
      'Every conversation on the lawn drops into a hushed smile as she steps into view in red silk beneath tall arched columns.',
    isPortrait: true,
    category: 'bridal',
  },
  {
    id: 'reel-port-7',
    code: 'DRJmExnkdEu',
    instagramUrl: 'https://www.instagram.com/reel/DRJmExnkdEu/',
    embedUrl: 'https://www.instagram.com/reel/DRJmExnkdEu/embed',
    videoSrc: '/reels/DRJmExnkdEu.mp4',
    posterUrl: '/reels/posters/DRJmExnkdEu.jpg',
    title: "Rishu & Rishav's Unhurried Morning",
    couple: 'Rishu & Rishav Pre-Wedding',
    location: 'Veranda & Poolside',
    caption:
      'Between wedding fittings, Rishu and Rishav walked past sunlit white pillars and shared quiet coffee right beside the water.',
    isPortrait: true,
    category: 'story',
  },
  {
    id: 'reel-port-8',
    code: 'DPX65sMEzBG',
    instagramUrl: 'https://www.instagram.com/reel/DPX65sMEzBG/',
    embedUrl: 'https://www.instagram.com/reel/DPX65sMEzBG/embed',
    videoSrc: '/reels/DPX65sMEzBG.mp4',
    posterUrl: '/reels/posters/DPX65sMEzBG.jpg',
    title: 'Fairy Lights & Courtyard Mehendi',
    couple: 'Evening Mehendi Magic',
    location: 'Fairy-Lit Portico',
    caption:
      'Strings of warm golden bulbs sway above patterned courtyard lawns as cousins tease the couple through an unforgettable mehendi night.',
    isPortrait: true,
    category: 'story',
  },
  {
    id: 'reel-port-9',
    code: 'DPGa8pBE-pL',
    instagramUrl: 'https://www.instagram.com/reel/DPGa8pBE-pL/',
    embedUrl: 'https://www.instagram.com/reel/DPGa8pBE-pL/embed',
    videoSrc: '/reels/DPGa8pBE-pL.mp4',
    posterUrl: '/reels/posters/DPGa8pBE-pL.jpg',
    title: 'Golden Turmeric & Morning Smiles',
    couple: 'Sunlit Family Haldi',
    location: 'Garden Lawn · Bakarpur',
    caption:
      'Wooden bowls filled with bright haldi pass from grandmother to friends while petals rain over smiling faces.',
    isPortrait: true,
    category: 'portrait',
  },
  {
    id: 'reel-port-10',
    code: 'DOuvU_Jk52G',
    instagramUrl: 'https://www.instagram.com/reel/DOuvU_Jk52G/',
    embedUrl: 'https://www.instagram.com/reel/DOuvU_Jk52G/embed',
    videoSrc: '/reels/DOuvU_Jk52G.mp4',
    posterUrl: '/reels/posters/DOuvU_Jk52G.jpg',
    title: 'Fireworks Over the Wedding Lawn',
    couple: 'Nighttime Baraat & Banquet',
    location: 'The Green Heritage Grounds',
    caption:
      'Fireworks bloom above the lit facade just before dinner opens inside the chandelier hall for both families and guests.',
    isPortrait: true,
    category: 'portrait',
  },
];

// --- EXACT 2 FOOTER REELS (ROTATED TO UPRIGHT LANDSCAPE) ---
export const FOOTER_REELS: InstagramReelItem[] = [
  {
    id: 'reel-footer-1',
    code: 'DU2tfnGE3gb',
    instagramUrl: 'https://www.instagram.com/reel/DU2tfnGE3gb/',
    embedUrl: 'https://www.instagram.com/reel/DU2tfnGE3gb/embed',
    videoSrc: '/reels/DU2tfnGE3gb.mp4',
    posterUrl: '/reels/posters/DU2tfnGE3gb.jpg',
    title: 'Sparklers & Promises at Dusk',
    couple: 'Hand in Hand Before Forever',
    location: 'Heritage Facade · Bakarpur',
    caption:
      'Silver sparkles rise beside white columns as the couple steps forward together to greet every smiling face waiting for them.',
    isPortrait: false,
    category: 'footer',
  },
  {
    id: 'reel-footer-2',
    code: 'DVGqHpwkejI',
    instagramUrl: 'https://www.instagram.com/reel/DVGqHpwkejI/',
    embedUrl: 'https://www.instagram.com/reel/DVGqHpwkejI/embed',
    videoSrc: '/reels/DVGqHpwkejI.mp4',
    posterUrl: '/reels/posters/DVGqHpwkejI.jpg',
    title: 'Beneath a Canopy of Fairy Lights',
    couple: 'Warmth, Laughter & Evening Glow',
    location: 'Illuminated Tunnel · Muzaffarpur',
    caption:
      'Thousands of warm lights shimmer overhead while the bride and groom share a quiet glance away from the celebration crowd.',
    isPortrait: false,
    category: 'footer',
  },
];

// --- 7 VENUE PAGE VIDEO TOURS ---
export const VENUE_REELS: InstagramReelItem[] = [
  {
    id: 'venue-reel-1',
    code: 'CsqjqyjgS4Q',
    instagramUrl: 'https://www.instagram.com/reel/CsqjqyjgS4Q/',
    embedUrl: 'https://www.instagram.com/reel/CsqjqyjgS4Q/embed',
    videoSrc: '/reels/CsqjqyjgS4Q.mp4',
    posterUrl: '/reels/posters/CsqjqyjgS4Q.jpg',
    title: 'Aerial Campus Setup & Grand Lawn Overview',
    couple: 'Aerial Campus & Mandap Lawn',
    location: 'Bakarpur · Dusk Setup',
    caption:
      'An aerial sweep across the illuminated main building, red-carpeted wedding walkways, canopy seating and highway approach at dusk.',
    isPortrait: false,
    category: 'story',
  },
  {
    id: 'venue-reel-2',
    code: 'Csv3TbMgKTt',
    instagramUrl: 'https://www.instagram.com/reel/Csv3TbMgKTt/',
    embedUrl: 'https://www.instagram.com/reel/Csv3TbMgKTt/embed',
    videoSrc: '/reels/Csv3TbMgKTt.mp4',
    posterUrl: '/reels/posters/Csv3TbMgKTt.jpg',
    title: 'Poolside Haldi Tent Canopy & Deck Lounge',
    couple: 'Poolside Ceremony Canopy',
    location: 'Pool Deck · Bakarpur',
    caption:
      'Bright yellow and magenta haldi drapes overlooking the turquoise swimming pool deck and circular outdoor lounge seating.',
    isPortrait: false,
    category: 'story',
  },
  {
    id: 'venue-reel-3',
    code: 'CuLlwFquKVq',
    instagramUrl: 'https://www.instagram.com/tv/CuLlwFquKVq/',
    embedUrl: 'https://www.instagram.com/tv/CuLlwFquKVq/embed',
    videoSrc: '/reels/CuLlwFquKVq.mp4',
    posterUrl: '/reels/posters/CuLlwFquKVq.jpg',
    title: 'Illuminated Heritage Gateway from Gobarsahi–Sakri Road',
    couple: 'Grand Entrance Gateway',
    location: 'Gobarsahi–Sakri Road · Night View',
    caption:
      'Warm golden architectural lighting framing the ceremonial arched main gate welcoming families arriving from across Muzaffarpur.',
    isPortrait: false,
    category: 'story',
  },
  {
    id: 'venue-reel-4',
    code: 'CwZMbtjP40S',
    instagramUrl: 'https://www.instagram.com/reel/CwZMbtjP40S/',
    embedUrl: 'https://www.instagram.com/reel/CwZMbtjP40S/embed',
    videoSrc: '/reels/CwZMbtjP40S.mp4',
    posterUrl: '/reels/posters/CwZMbtjP40S.jpg',
    title: 'Evening Walk Across the Illuminated Lawn Promenade',
    couple: 'Main Building Night Glow',
    location: 'Central Lawn Walkway',
    caption:
      'A walkthrough down the lit palm promenade toward the white arches of The Green Heritage Resort and Banquet at night.',
    isPortrait: false,
    category: 'story',
  },
  {
    id: 'venue-reel-5',
    code: 'Csy8NswvdQ9',
    instagramUrl: 'https://www.instagram.com/p/Csy8NswvdQ9/',
    embedUrl: 'https://www.instagram.com/p/Csy8NswvdQ9/embed',
    videoSrc: '/reels/Csy70idAPNL.mp4',
    posterUrl: '/reels/posters/Csy70idAPNL.jpg',
    title: 'Poolside Lounge Daybeds & Shaded Ceremony Seating',
    couple: 'Poolside Terrace & Canopy',
    location: 'Swimming Pool Deck · Daytime',
    caption:
      'Close-up look at the poolside woven lounge beds, tiled deck and covered daytime seating framed by surrounding garden trees.',
    isPortrait: true,
    category: 'portrait',
  },
  {
    id: 'venue-reel-6',
    code: 'CuaAEsNglWh',
    instagramUrl: 'https://www.instagram.com/reel/CuaAEsNglWh/',
    embedUrl: 'https://www.instagram.com/reel/CuaAEsNglWh/embed',
    videoSrc: '/reels/CuaAEsNglWh.mp4',
    posterUrl: '/reels/posters/CuaAEsNglWh.jpg',
    title: 'Daytime Resort Lawns, Courtyard & Guest Cottages',
    couple: 'Lawns, Facade & Cottages Tour',
    location: 'Full Campus · Muzaffarpur',
    caption:
      'Daylight showcase of the sweeping green lawn in front of the white banquet facade, paved entrance drive and wooden cottage suites.',
    isPortrait: true,
    category: 'portrait',
  },
  {
    id: 'venue-reel-7',
    code: 'CuxMkFYAw8W',
    instagramUrl: 'https://www.instagram.com/reel/CuxMkFYAw8W/',
    embedUrl: 'https://www.instagram.com/reel/CuxMkFYAw8W/embed',
    videoSrc: '/reels/CuxMkFYAw8W.mp4',
    posterUrl: '/reels/posters/CuxMkFYAw8W.jpg',
    title: 'Swimming Pool Deck, Outdoor DJ & Courtyard Tables',
    couple: 'Pool Deck & Sundeck Socials',
    location: 'Poolside Courtyard · Muzaffarpur',
    caption:
      'Views along the turquoise swimming pool, outdoor seating tables and sound setup ready for daytime sangeet and haldi gatherings.',
    isPortrait: true,
    category: 'portrait',
  },
];

// ============================================================================
// HEADER HERO SLIDES (EXACT 3 HEADER REELS · ROTATED TO UPRIGHT LANDSCAPE)
// ============================================================================
export const HEADER_HERO_FILMS: CinemaFilm[] = [
  {
    id: 'f-reel-1',
    videoSrc: '/reels/DSG3HcWEcov.mp4',
    instagramUrl: 'https://www.instagram.com/reel/DSG3HcWEcov/',
    reelCode: 'DSG3HcWEcov',
    isPortrait: false,
    objectPosition: '50% 30%',
    title: 'Bride Beneath the Carved Pavilion',
    scriptHighlight: 'Where Forever Walks Through Arches',
    couple: 'Every Wedding Morning Begins Gently',
    location: 'Bakarpur, Gobarsahi–Sakri Road, Muzaffarpur 844127',
    year: 'Muzaffarpur',
    month: 'Wedding Venue',
    duration: '0:27',
    thumbnailUrl: '/reels/posters/DSG3HcWEcov.jpg',
    heroImageUrl: '/reels/posters/DSG3HcWEcov.jpg',
    aiConceptPrompt: 'Bridal pavilion walk at The Green Heritage',
    synopsis:
      'In Bakarpur along Gobarsahi–Sakri Road, sunlit arches frame every quiet breath before she steps out to meet her family and begin her marriage.',
    emotionalHook: 'Call or WhatsApp +91 92340 52600 to check wedding dates.',
    category: 'palace',
  },
  {
    id: 'f-reel-2',
    videoSrc: '/reels/DSh4yfBk46u.mp4',
    instagramUrl: 'https://www.instagram.com/reel/DSh4yfBk46u/',
    reelCode: 'DSh4yfBk46u',
    isPortrait: false,
    objectPosition: '50% 35%',
    title: "Groom's Illuminated Lawn Walk",
    scriptHighlight: 'Evenings Lit With Promise',
    couple: 'Grand Varmala & Lawn Celebrations',
    location: 'The Green Heritage Lawn · Muzaffarpur',
    year: 'Weddings',
    month: 'Open Lawns',
    duration: '2:07',
    thumbnailUrl: '/reels/posters/DSh4yfBk46u.jpg',
    heroImageUrl: '/reels/posters/DSh4yfBk46u.jpg',
    aiConceptPrompt: 'Groom walking down illuminated wedding lawn aisle',
    synopsis:
      'Cold sparkles rise along the floral walkway as guests gather across open green lawns to cheer on every entry, garland and midnight phera.',
    emotionalHook: 'Walk the lawns in person — call +91 92340 52600.',
    category: 'royal',
  },
  {
    id: 'f-reel-3',
    videoSrc: '/reels/DYqspvrTFNi.mp4',
    instagramUrl: 'https://www.instagram.com/reel/DYqspvrTFNi/',
    reelCode: 'DYqspvrTFNi',
    isPortrait: false,
    objectPosition: '50% 32%',
    title: 'Ceremonial Welcome Under Royal Chattars',
    scriptHighlight: 'Old Traditions, Warm Hearts',
    couple: 'Baraat Welcome & Sacred Rituals',
    location: 'Courtyard Portico · Bakarpur',
    year: 'Tradition',
    month: 'Mithila Hospitality',
    duration: '0:33',
    thumbnailUrl: '/reels/posters/DYqspvrTFNi.jpg',
    heroImageUrl: '/reels/posters/DYqspvrTFNi.jpg',
    aiConceptPrompt: 'Traditional ceremonial welcome with royal chattar fans',
    synopsis:
      'Blue and gold ceremonial fans gather around the groom while parents greet relatives with open arms before the night of laughter unfolds.',
    emotionalHook: 'Confirm ceremony setup options at +91 92340 52600.',
    category: 'palace',
  },
];

export const CINEMA_FILMS: CinemaFilm[] = HEADER_HERO_FILMS;

// ============================================================================
// GALLERY PHOTOS — LANDSCAPE COLLECTION (/TGHPhotos/Landscape/)
// ============================================================================
const RAW_GALLERY_FILES: {
  file: string;
  title: string;
  couple: string;
  category: 'weddings' | 'pre-wedding' | 'portraits' | 'candid';
  categoryLabel: string;
  location: string;
  aspect: 'landscape' | 'portrait';
}[] = [
    {
      file: 'Landscape/DSC_4664.webp',
      title: 'Grand Heritage Architecture at Dusk',
      couple: 'Resort Facade & Lawns',
      category: 'weddings',
      categoryLabel: 'Resort Overview',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_4669.webp',
      title: 'Illuminated Evening Celebration Grounds',
      couple: 'Outdoor Wedding Lawns',
      category: 'weddings',
      categoryLabel: 'Evening Lawns',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_4686.webp',
      title: 'Carved Portico & Grand Walkway',
      couple: 'Bridal & Baraat Entry',
      category: 'pre-wedding',
      categoryLabel: 'Heritage Portico',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_4690.webp',
      title: 'Courtyard Gathering & Fairy Lights',
      couple: 'Twilight Celebrations',
      category: 'candid',
      categoryLabel: 'Evening Courtyard',
      location: 'Gobarsahi–Sakri Road',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_4692.webp',
      title: 'Open-Sky Mandap & Reception View',
      couple: 'Baraat & Varmala',
      category: 'weddings',
      categoryLabel: 'Mandap Lawns',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_4694.webp',
      title: 'Chandelier Ballroom & Indoor Seating',
      couple: 'Grand Banquet Hall',
      category: 'weddings',
      categoryLabel: 'Banquet Hall',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_4695.webp',
      title: 'Reception Stage & Floral Canopy',
      couple: 'Evening Reception',
      category: 'weddings',
      categoryLabel: 'Reception Stage',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_4698.webp',
      title: 'Lit Courtyard Arches for Family Welcomes',
      couple: 'Family Hospitality',
      category: 'candid',
      categoryLabel: 'Courtyard Lights',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_4795.webp',
      title: 'Poolside Deck for Morning Haldi Rituals',
      couple: 'Poolside & Courtyard',
      category: 'pre-wedding',
      categoryLabel: 'Poolside Mornings',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_4930.webp',
      title: 'Morning Sunshine Over the Green Lawns',
      couple: 'Resort Gardens',
      category: 'pre-wedding',
      categoryLabel: 'Morning Lawns',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_4960.webp',
      title: 'Quiet Pathways & Garden Lounge',
      couple: 'Outstation Family Rest',
      category: 'portraits',
      categoryLabel: 'Garden Walkways',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_4991.webp',
      title: 'Serene Resort Cottages & Suites Wing',
      couple: 'Guest Accommodation',
      category: 'portraits',
      categoryLabel: 'Family Suites',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_5069.webp',
      title: 'Haldi & Marigold Seating Area',
      couple: 'Pre-Wedding Mornings',
      category: 'pre-wedding',
      categoryLabel: 'Haldi Setting',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_5150.webp',
      title: 'Warm Bridal Prep & Dressing Suite',
      couple: 'Bridal Suite',
      category: 'portraits',
      categoryLabel: 'Bridal Prep',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_5159.webp',
      title: 'Evening Sangeet & Celebration Hall',
      couple: 'Sangeet Evenings',
      category: 'weddings',
      categoryLabel: 'Sangeet & Music',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_5280.webp',
      title: 'Ceremonial Entrance Gateway',
      couple: 'Baraat Welcome Gate',
      category: 'weddings',
      categoryLabel: 'Entrance Gate',
      location: 'Gobarsahi–Sakri Road',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_5282.webp',
      title: 'Celebration Dining & Buffet Lawns',
      couple: 'Wedding Feast Lawns',
      category: 'candid',
      categoryLabel: 'Outdoor Dining',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_5286.webp',
      title: 'Warm Lamp Glow Across the Verandah',
      couple: 'Heritage Verandah',
      category: 'portraits',
      categoryLabel: 'Verandah Light',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_5287.webp',
      title: 'Mehendi Circle & Shaded Seating',
      couple: 'Mehendi Afternoons',
      category: 'pre-wedding',
      categoryLabel: 'Mehendi Courtyard',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_5288.webp',
      title: 'Sunset Shadows on Carved Pillars',
      couple: 'Couple Portraits',
      category: 'portraits',
      categoryLabel: 'Golden Hour',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_5298.webp',
      title: 'Starlit Baraat Walk & Floral Aisle',
      couple: 'Grand Varmala Aisle',
      category: 'weddings',
      categoryLabel: 'Wedding Aisle',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_5387.webp',
      title: 'Indoor Banquet Chandelier Glamour',
      couple: 'All-Season Hall',
      category: 'weddings',
      categoryLabel: 'Chandelier Hall',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_5393.webp',
      title: 'Elders & Relatives Gathering Lounge',
      couple: 'Family Conversations',
      category: 'candid',
      categoryLabel: 'Family Lounge',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_5448.webp',
      title: 'Panoramic View of Banquet & Grounds',
      couple: 'Full Wedding Campus',
      category: 'weddings',
      categoryLabel: 'Campus View',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_5452.webp',
      title: 'Festive Evening Lighting Across the Resort',
      couple: 'Night Illuminations',
      category: 'weddings',
      categoryLabel: 'Night Event',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_5655.webp',
      title: 'Pre-Wedding Portrait Backdrop',
      couple: 'Pre-Wedding Shoots',
      category: 'pre-wedding',
      categoryLabel: 'Portrait Corner',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/DSC_5679.webp',
      title: 'Turquoise Pool Reflections at Noon',
      couple: 'Poolside Tranquility',
      category: 'pre-wedding',
      categoryLabel: 'Poolside Deck',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/_DSC5974.webp',
      title: 'Quiet Sanctuary Suites for Families',
      couple: 'Guest Accommodation',
      category: 'portraits',
      categoryLabel: 'Suite Comfort',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/_DSC5976.webp',
      title: 'Soft Morning Breeze by the Lawns',
      couple: 'Daytime Hospitality',
      category: 'candid',
      categoryLabel: 'Garden Breeze',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/_DSC5977.webp',
      title: 'Intimate Mandap & Ritual Seating',
      couple: 'Sacred Pheras Space',
      category: 'weddings',
      categoryLabel: 'Mandap Space',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/_DSC5984.webp',
      title: 'Royal Reception Backdrop & Stage',
      couple: 'Formal Reception',
      category: 'weddings',
      categoryLabel: 'Stage Craft',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/_DSC6137.webp',
      title: 'Warm Farewell Glow in the Courtyard',
      couple: 'Vidaai & Departure',
      category: 'candid',
      categoryLabel: 'Emotional Farewell',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
    {
      file: 'Landscape/_DSC6140.webp',
      title: 'Golden Heritage Walls Under Night Sky',
      couple: 'The Green Heritage',
      category: 'portraits',
      categoryLabel: 'Heritage Facade',
      location: 'Bakarpur, Muzaffarpur',
      aspect: 'landscape',
    },
  ];

const SPACES_META = [
  'Banquet & Event Area',
  'Outdoor Grounds',
  'Guest Accommodation',
  'Family Gathering Zone',
];
const LOCATIONS_META = [
  'Bakarpur, Gobarsahi–Sakri Road',
  'Muzaffarpur, Bihar 844127',
  'Near Dariyapur Kafen, Muzaffarpur',
  'The Green Heritage Property',
];
const AVAILABILITY_NOTES = [
  'Walk-in site tours daily',
  'Confirm muhurat & banquet dates',
  'Bridal & family suite blocks',
  'Enquire at +91 92340 52600',
];

export const GALLERY_PHOTOS: PhotoFrame[] = RAW_GALLERY_FILES.map((item, idx) => ({
  id: `gal-${idx + 1}`,
  title: item.title,
  scriptHighlight: item.categoryLabel.toLowerCase(),
  category: item.category,
  categoryLabel: item.categoryLabel,
  couple: item.couple,
  location: item.location,
  year: 'Muzaffarpur',
  imageUrl: `/TGHPhotos/${item.file}`,
  aspect: item.aspect,
  description: `${item.title} at The Green Heritage Resort and Banquet, Bakarpur, Muzaffarpur. Call +91 92340 52600 to schedule a personal walkthrough of the lawns, hall and suites.`,
  emotionalExcerpt: 'Bakarpur, Gobarsahi–Sakri Road, Muzaffarpur 844127.',
  exif: {
    lens: SPACES_META[idx % SPACES_META.length],
    camera: LOCATIONS_META[idx % LOCATIONS_META.length],
    setting: AVAILABILITY_NOTES[idx % AVAILABILITY_NOTES.length],
  },
}));

// ============================================================================
// SIGNATURE / SPACES & GROUNDS FRAMES — PORTRAIT COLLECTION (/TGHPhotos/Portrait/)
// ============================================================================
const RAW_SIGNATURE_FILES = [
  'Portrait/DSC_4665.webp',
  'Portrait/DSC_4687.webp',
  'Portrait/DSC_4872.webp',
  'Portrait/DSC_4877.webp',
  'Portrait/DSC_4879.webp',
  'Portrait/DSC_5290.webp',
  'Portrait/DSC_5663.webp',
  'Portrait/DSC_5667.webp',
  'Portrait/DSC_5678.webp',
  'Portrait/_DSC5985.webp',
  'Portrait/_DSC6036.webp',
  'Portrait/_DSC6043.webp',
  'Portrait/_DSC6133.webp',
  'Portrait/_DSC6457.webp',
  'Portrait/_DSC6460.webp',
  'Portrait/_DSC6465.webp',
];

const SIGNATURE_TITLES = [
  'Carved Archway & Dusk Glow',
  'Illuminated Facade Towers',
  'Sunlight Through Courtyard Pillars',
  'Morning Light Over the Pool',
  'Serene Garden Walkways',
  'Ceremonial Entrance & Steps',
  'Quiet Suite Window Light',
  'Poolside Reflection at Golden Hour',
  'Lush Palms & Resort Lawns',
  'Intimate Banquet Chandeliers',
  'Warm Reception Hall Columns',
  'Festive Evening Canopy Lights',
  'Resort Courtyard Vista',
  'Graceful Verandah Arches',
  'Evening Torchlight & Facade',
  'Peaceful Nighttime Resort Grounds',
];

const SPACE_AREAS_LIST = [
  'Banquet Hall',
  'Outdoor Lawn',
  'Guest Suites',
  'Reception Stage',
  'Ceremony Mandap',
  'Courtyard Area',
  'Welcome Entrance',
  'Family Lounge',
];

export const SIGNATURE_FRAMES: PhotoFrame[] = RAW_SIGNATURE_FILES.map(
  (file, idx) => {
    const categories: (
      | 'weddings'
      | 'pre-wedding'
      | 'portraits'
      | 'candid'
    )[] = ['weddings', 'portraits', 'candid', 'pre-wedding'];
    const catLabels = [
      'Event Space',
      'Guest Stay',
      'Family Gathering',
      'Resort Grounds',
    ];
    const isActuallyLandscape = file.includes('_DSC6133');
    return {
      id: `sig-${idx + 1}`,
      title: SIGNATURE_TITLES[idx] || `Property Space ${idx + 1}`,
      scriptHighlight: 'the green heritage',
      category: categories[idx % 4],
      categoryLabel: catLabels[idx % 4],
      couple: SPACE_AREAS_LIST[idx % SPACE_AREAS_LIST.length],
      location: 'Bakarpur, Muzaffarpur',
      year: 'Bihar 844127',
      imageUrl: `/TGHPhotos/${file}`,
      aspect: isActuallyLandscape ? 'landscape' : 'portrait',
      description: `${SIGNATURE_TITLES[idx] || 'Resort View'} at The Green Heritage Resort and Banquet in Bakarpur, Muzaffarpur. Call +91 92340 52600 to plan your celebration or arrange a site tour.`,
      emotionalExcerpt:
        'Confirm space availability and guest arrangements directly with the team.',
      exif: {
        lens: SPACES_META[idx % SPACES_META.length],
        camera: LOCATIONS_META[idx % LOCATIONS_META.length],
        setting: AVAILABILITY_NOTES[idx % AVAILABILITY_NOTES.length],
      },
    };
  }
);

// ============================================================================
// CORE SERVICES & ENQUIRY AREAS (Strictly grounded in content.md & research.md)
// ============================================================================
export const COMMISSION_SERVICES: CommissionService[] = [
  {
    id: 'c1',
    number: '01',
    title: 'Haldi, Mehendi & Pre-Wedding Morning Rituals',
    scriptHighlight: 'sunlit lawns & poolside mornings',
    tagline:
      'Marigolds beside the water, shaded courtyards and space for elders and cousins to celebrate',
    description:
      'Every wedding gathers momentum in those quiet morning hours before nightfall. From poolside haldi setups on yellow petals to fairy-lit evening mehendi under our shaded portico, talk directly with our team to pair outdoor lawns with your ritual schedule.',
    deliverables: [
      'Discuss daytime poolside lawn and courtyard haldi layouts',
      'Ask about marigold floral setups, shaded seating and music timings',
      'Verify open-sky weather backup options inside our covered hall',
      'Coordinate family welcome refreshments directly with our desk',
    ],
    humanNote:
      'Daytime availability, floral permissions and seating setups are confirmed directly on +91 92340 52600.',
    dayLabel: 'PRE-WEDDING · HALDI & MEHENDI',
    phaseTitle: 'Morning Sunlight & Laughter',
  },
  {
    id: 'c2',
    number: '02',
    title: 'Sangeet, Baraat, Varmala & Sacred Pheras',
    scriptHighlight: 'the night everyone waits for',
    tagline:
      'Chattar processions through our courtyard gate to starlit mandap vows and reception feasts',
    description:
      'When dusk falls along Gobarsahi–Sakri Road, our arched facade lights up for the baraat welcome. Share your auspicious dates and expected guest count so our team can walk you through varmala stage angles, indoor chandelier dining and late-night mandap hours.',
    deliverables: [
      'Review main lawn capacity alongside our indoor chandelier banquet hall',
      'Discuss baraat gate arrival, stage decor guidelines and sound hours',
      'Confirm dining, menu preferences and outside-vendor terms clearly',
      'Check generator backup and evening illumination for late pheras',
    ],
    humanNote:
      'Package options, capacity limits and vendor rules are explained openly before you confirm.',
    dayLabel: 'WEDDING NIGHT · BARAAT TO VIDAAI',
    phaseTitle: 'Under Lights & Sacred Fire',
  },
  {
    id: 'c3',
    number: '03',
    title: 'Bridal Suites & Outstation Family Stays',
    scriptHighlight: 'keeping the whole family close',
    tagline:
      'Calm getting-ready mirrors for the bride and restful rooms so elders never feel rushed',
    description:
      'The best weddings feel unhurried when parents, aunts, and travelling friends wake up steps away from the lawn. Reach out to confirm room counts, suite comfort, check-in schedules and seasonal group rates aligned with your wedding calendar.',
    deliverables: [
      'Ask for current bridal suite, cottage and A/C room counts',
      'Confirm nightly tariffs, check-in/check-out windows and extra bedding',
      'Verify guest identification rules and front-desk arrival support',
      'Check breakfast or tea timings for early-morning ritual guests',
    ],
    humanNote:
      'Room availability and seasonal rates change by date — confirm details directly before travelling.',
    dayLabel: 'HOSPITALITY · FAMILY & BRIDAL SUITES',
    phaseTitle: 'One Roof Through Every Ceremony',
  },
  {
    id: 'c4',
    number: '04',
    title: 'Family Venue Tours, Amenities & Directions',
    scriptHighlight: 'walk bakarpur in person',
    tagline:
      'See where the mandap will stand along Gobarsahi–Sakri Road before holding your dates',
    description:
      'Photographs only tell half of how a place feels. Bring your parents along to Bakarpur in Muzaffarpur 844127 to inspect the lawn aisles, banquet chandeliers, swimming pool area and parking access, and verify active amenities directly with us.',
    deliverables: [
      'Use Google Maps pin (26.06385, 85.3504979) along Gobarsahi–Sakri Road',
      'Verify parking capacity, Wi-Fi coverage and pool access for your dates',
      'Call +91 92340 52600 ahead so our coordinator can walk the campus with you',
      'Review written deposit, rescheduling and cancellation terms openly',
    ],
    humanNote:
      'Every online enquiry stays a request until our team checks availability and confirms with you directly.',
    dayLabel: 'VISITS & TERMS · PIN 844127',
    phaseTitle: 'Walk the Grounds Together',
  },
];

// ============================================================================
// WEDDING SPACES & AMENITIES (Honest facilities per research)
// ============================================================================
export const VENUE_INSTALLATIONS: VenueInstallation[] = [
  {
    id: 'v1',
    title: 'Chandelier Banquet Hall',
    venue: 'Varmala, Sangeet & Dining Hall',
    location: 'Bakarpur, Muzaffarpur',
    atmosphereTag: 'Confirm Seating Capacity',
    summary:
      'Warm chandelier light and carved columns hold receptions, sangeet evenings and winter wedding feasts indoors without worrying about evening chill.',
    lightingNotes:
      'Confirm stage placement, chandelier warmth and indoor decor rules directly.',
    acousticNotes: 'Review DJ, folk music and live band sound timings with us.',
    imageUrl: '/TGHPhotos/Landscape/DSC_5387.webp',
    secondaryImageUrl: '/TGHPhotos/Portrait/_DSC5985.webp',
    dateSeason: 'All-Season Weddings',
  },
  {
    id: 'v2',
    title: 'Open Wedding Lawns & Courtyard',
    venue: 'Baraat, Mandap & Starlit Dinners',
    location: 'Bakarpur, Gobarsahi–Sakri Road',
    atmosphereTag: 'Open-Sky Celebrations',
    summary:
      'Wide green lawns in front of our heritage facade welcome grand baraat entries, floral mandap setups and open-air buffet dining under Muzaffarpur skies.',
    lightingNotes: 'Ask about facade illumination, fairy lights and backup power.',
    acousticNotes: 'Confirm outdoor dhol and music curfew hours when holding dates.',
    imageUrl: '/TGHPhotos/Landscape/DSC_4669.webp',
    secondaryImageUrl: '/TGHPhotos/Portrait/DSC_4687.webp',
    dateSeason: 'Evening & Winter Favoured',
  },
  {
    id: 'v3',
    title: 'Bridal Suites & Family Cottages',
    venue: 'Getting-Ready & Guest Stays',
    location: 'Bakarpur, Muzaffarpur 844127',
    atmosphereTag: 'Group Block Enquiries',
    summary:
      'Private dressing rooms and comfortable suites let brides, grooms and visiting relatives rest between morning pujas and midnight pheras.',
    lightingNotes:
      'Check current suite availability and wedding-block tariffs on +91 92340 52600.',
    acousticNotes: 'Ask about check-in flexibility and ID rules for outstation guests.',
    imageUrl: '/TGHPhotos/Landscape/DSC_4991.webp',
    secondaryImageUrl: '/TGHPhotos/Portrait/DSC_5663.webp',
    dateSeason: 'Confirm Room Counts Early',
  },
  {
    id: 'v4',
    title: 'Baraat Gate & Guest Parking',
    venue: 'Gobarsahi–Sakri Road Entrance',
    location: 'Mauza Bakarpur, Dariyapur Kafen',
    atmosphereTag: 'Listed Facility: Parking',
    summary:
      'Easy road access off Gobarsahi–Sakri Road helps travelling wedding buses and family cars arrive together. Confirm designated parking allocation for large baraats ahead of time.',
    lightingNotes: 'Grand arched gateway ready for floral and chattar welcomes.',
    acousticNotes: 'Call +91 92340 52600 for route landmarks for travelling guests.',
    imageUrl: '/TGHPhotos/Landscape/DSC_5280.webp',
    secondaryImageUrl: '/TGHPhotos/Portrait/DSC_5290.webp',
    dateSeason: 'Verify Event Parking',
  },
  {
    id: 'v5',
    title: 'Poolside Deck for Haldi & Mehendi',
    venue: 'Pre-Wedding Mornings',
    location: 'Bakarpur, Muzaffarpur',
    atmosphereTag: 'Listed Facility: Poolside',
    summary:
      'Turquoise water right beside the courtyard brings bright reflection and fresh breeze to daytime haldi circles, mehendi seating and pre-wedding shoots. Confirm pool schedule before decorating.',
    lightingNotes: 'Check daytime decor rules and poolside safety hours directly.',
    acousticNotes: 'Availability may vary with private event schedules.',
    imageUrl: '/TGHPhotos/Landscape/DSC_4795.webp',
    secondaryImageUrl: '/TGHPhotos/Portrait/DSC_5667.webp',
    dateSeason: 'Confirm Pool Access',
  },
  {
    id: 'v6',
    title: 'Catering Desk, Wi-Fi & Coordinator Care',
    venue: 'Hospitality & Vendor Support',
    location: 'Bakarpur, Muzaffarpur',
    atmosphereTag: 'Listed Facility: Wi-Fi & Dining',
    summary:
      'Public listings note on-site Wi-Fi and hospitality assistance. Speak directly with our coordinator about multi-day catering menus, halwai policies and outside decor rules.',
    lightingNotes:
      'Verify Wi-Fi reach across rooms and hall areas with our team.',
    acousticNotes: 'Written menu, vendor and deposit terms shared directly on enquiry.',
    imageUrl: '/TGHPhotos/Landscape/DSC_5282.webp',
    secondaryImageUrl: '/TGHPhotos/Portrait/_DSC6036.webp',
    dateSeason: 'Ask Team Directly',
  },
];

// ============================================================================
// MAP LOCATIONS AROUND MUZAFFARPUR & BIHAR (Pin at 26.06385, 85.3504979)
// ============================================================================
export const MAP_LOCATIONS: MapLocationPin[] = [
  {
    id: 'm1',
    city: 'Bakarpur, Muzaffarpur (Wedding Campus)',
    venue: 'The Green Heritage Resort and Banquet',
    state: 'Muzaffarpur, Bihar 844127',
    couple: 'Bakarpur, Gobarsahi–Sakri Road',
    year: 'Official Pin',
    xPercent: 50,
    yPercent: 48,
    lat: '26.06385',
    lng: '85.3504979',
    mapQuery:
      '26.06385,85.3504979 (The Green Heritage Resort and Banquet, Bakarpur, Gobarsahi-Sakri Road, Muzaffarpur)',
    zoom: 17,
    description:
      'Located along Gobarsahi–Sakri Road in Bakarpur (Mauza Bakarpur, Dariyapur Kafen), Muzaffarpur 844127. Call +91 92340 52600 to plan a family venue tour.',
    imageUrl: '/TGHPhotos/Landscape/DSC_4664.webp',
    filmId: 'f-reel-1',
  },
];

// ============================================================================
// WEDDING PLANNING NOTES (Warm, sincere guidance without fake testimonials)
// ============================================================================
export const GRATITUDE_NOTES: GratitudeNote[] = [
  {
    id: 'g1',
    quote:
      'When both families stand under one courtyard sky, small anxieties soften into laughter, shared tea and photographs your grandchildren will still recognise.',
    author: 'Haldi, Mehendi & Courtyard Mornings',
    role: 'Poolside & Portico Lawns',
    location: 'Bakarpur, Muzaffarpur',
    imageUrl: '/TGHPhotos/Portrait/DSC_4877.webp',
  },
  {
    id: 'g2',
    quote:
      'Every auspicious date moves faster when grandparents rest close by. Ask our desk for room counts, bridal suite space and group check-in timings early.',
    author: 'Keeping Two Families Comfortable',
    role: 'Bridal Suites & Family Stays · +91 92340 52600',
    location: 'Confirm Room Blocks Early',
    imageUrl: '/TGHPhotos/Portrait/DSC_5663.webp',
  },
  {
    id: 'g3',
    quote:
      'Whether you picture cold sparklers flanking the varmala stage or quiet hymns around midnight pheras, tell us your guest count and ritual order first.',
    author: 'Baraat, Varmala & Pheras',
    role: 'Open Lawns & Chandelier Hall',
    location: 'Gobarsahi–Sakri Road, Bihar',
    imageUrl: '/TGHPhotos/Landscape/DSC_4692.webp',
  },
  {
    id: 'g4',
    quote:
      'Before choosing a venue, walk the property at dusk when the facade lights come on, check parking gates, and verify amenities directly with our staff.',
    author: 'Walk the Lawns Before You Decide',
    role: 'Direct Site Walkthroughs',
    location: 'Call or WhatsApp +91 92340 52600',
    imageUrl: '/TGHPhotos/Landscape/DSC_4664.webp',
  },
  {
    id: 'g5',
    quote:
      'No surprises on pricing or rules: every website or WhatsApp enquiry starts a real conversation until we confirm dates, terms and arrangements together.',
    author: 'Honest Wedding Conversations',
    role: 'Transparent Booking Process',
    location: 'The Green Heritage Resort and Banquet',
    imageUrl: '/TGHPhotos/Landscape/DSC_5448.webp',
  },
];

// ============================================================================
// WEDDING CHAPTER GUIDE SCENES
// ============================================================================
export const STORY_SCENES: StoryScene[] = [
  {
    sceneNumber: 'PART 01',
    year: 'Haldi',
    title: 'Morning Sunshine, Marigolds & Poolside Joy',
    scriptTitle: 'How the wedding days begin',
    headline:
      'Open courtyards and the turquoise pool deck set an easy morning rhythm',
    narrative:
      'Weddings here begin unhurriedly in bright morning air, with yellow marigold strings by the pool and aunts gathering on woven mats before anyone checks the clock.',
    highlightStat: 'Poolside & Courtyard Haldi',
    imageUrl: '/TGHPhotos/Landscape/DSC_4795.webp',
    secondaryImageUrl: '/TGHPhotos/Portrait/DSC_4877.webp',
  },
  {
    sceneNumber: 'PART 02',
    year: 'Mehendi',
    title: 'Fairy Lights & Laughter Under the Portico',
    scriptTitle: 'Afternoon songs turning into dusk',
    headline:
      'A shaded lawn setting for henna, tea and family teasings',
    narrative:
      'By late afternoon, strands of warm bulbs glow across the portico arches while dark henna takes shape and friends rehearse their sangeet steps nearby.',
    highlightStat: 'Courtyard & Portico',
    imageUrl: '/TGHPhotos/Landscape/DSC_4686.webp',
    secondaryImageUrl: '/TGHPhotos/Portrait/_DSC6457.webp',
  },
  {
    sceneNumber: 'PART 03',
    year: 'Baraat',
    title: 'Dhol Echoes Through the Heritage Gate',
    scriptTitle: 'When two families meet at dusk',
    headline:
      'Carved archways, ceremonial fans and open lawns ready for grand welcomes',
    narrative:
      'From the carved upper jharokha overlooking the gate to the open lawn aisle flanked by golden fans, every baraat welcome gets space to breathe.',
    highlightStat: 'Baraat & Varmala Aisle',
    imageUrl: '/TGHPhotos/Landscape/DSC_5280.webp',
    secondaryImageUrl: '/TGHPhotos/Portrait/DSC_4665.webp',
  },
  {
    sceneNumber: 'PART 04',
    year: 'Stays',
    title: 'Bridal Suites & Rooms Under One Roof',
    scriptTitle: 'Keep loved ones close between ceremonies',
    headline:
      'Confirm room categories, group blocks and check-in rules with our team',
    narrative:
      'Outstation relatives rest easily when suites and cottages sit steps away from the mandap. Call +91 92340 52600 to check room availability for your dates.',
    highlightStat: 'Bridal & Guest Rooms',
    imageUrl: '/TGHPhotos/Landscape/DSC_4991.webp',
    secondaryImageUrl: '/TGHPhotos/Portrait/DSC_5663.webp',
  },
  {
    sceneNumber: 'PART 05',
    year: 'Directions',
    title: 'Finding Us in Bakarpur, Muzaffarpur',
    scriptTitle: 'Gobarsahi–Sakri Road · PIN 844127',
    headline:
      'Walk the venue with your parents before deciding',
    narrative:
      'Situated along Gobarsahi–Sakri Road in Bakarpur (Dariyapur Kafen), Muzaffarpur 844127. Open Google Maps for directions or call +91 92340 52600 ahead of arrival.',
    highlightStat: 'Pin: 26.06385, 85.3504979',
    imageUrl: '/TGHPhotos/Landscape/DSC_5448.webp',
    secondaryImageUrl: '/TGHPhotos/Portrait/_DSC6460.webp',
  },
  {
    sceneNumber: 'PART 06',
    year: 'Booking',
    title: 'Holding Your Auspicious Wedding Dates',
    scriptTitle: 'Clear terms before you commit',
    headline:
      'Every online enquiry starts a conversation until confirmed directly',
    narrative:
      'Once you share your preferred marriage dates and approximate guest count online or via WhatsApp, our team checks calendar availability and shares rates and policies clearly.',
    highlightStat: 'Request First · Confirm Directly',
    imageUrl: '/TGHPhotos/Landscape/DSC_5387.webp',
    secondaryImageUrl: '/TGHPhotos/Portrait/_DSC6465.webp',
  },
];

export interface VenueSpecification {
  id: string;
  category: 'lawn' | 'hall' | 'rooms' | 'packages' | 'catering' | 'parking';
  tag: string;
  title: string;
  statBadge: string;
  capacityHeadline: string;
  summary: string;
  keyFeatures: string[];
  imageUrl: string;
  secondaryImageUrl: string;
  fallbackImageUrl: string;
}

export const VENUE_SPECIFICATIONS: VenueSpecification[] = [
  {
    id: 'spec-lawn',
    category: 'lawn',
    tag: 'Grand Open-Air Celebrations',
    title: 'The Royal Wedding Lawn',
    statBadge: '1,500 – 2,000+ Guests',
    capacityHeadline: 'Accommodates up to 2,000+ Guests for Grand Receptions & Varmala',
    summary:
      'Expansive lush green natural grass lawn designed specifically for grand North Indian weddings. Features an elevated grand stage pathway, dedicated mandap perimeter, baraat procession driveway, and poolside celebration deck.',
    keyFeatures: [
      'Capacity: 1,500 to 2,000+ attending guests',
      'Wide dedicated baraat entry & welcoming portico',
      'Illuminated perimeter trees and high-mast celebratory lighting',
      'Direct connectivity to buffet dining counters and bridal cottage',
    ],
    imageUrl: '/TGHPhotos/HotelGround/Lawn/lawn1.webp',
    secondaryImageUrl: '/TGHPhotos/HotelGround/Lawn/lawn2.webp',
    fallbackImageUrl: '/TGHPhotos/HotelGround/Lawn/lawn1.jpg',
  },
  {
    id: 'spec-hall',
    category: 'hall',
    tag: 'Climate-Controlled Luxury',
    title: 'Heritage Chandelier Banquet Hall',
    statBadge: '350 – 500+ Seated (700 Floating)',
    capacityHeadline: 'Air-Conditioned Indoor Hall for Sangeet, Dinners & Sacred Pheras',
    summary:
      'An opulent indoor hall adorned with sparkling crystal chandeliers, high acoustic ceilings, all-weather 100% air-conditioning, and an elevated mandap stage suitable for rings, sangeet performances, and auspicious phere rituals.',
    keyFeatures: [
      'Seated theater arrangement for 350 – 500+ guests',
      'Floating capacity up to 700+ guests during dinner receptions',
      'Built-in audio-visual wiring and stage lighting consoles',
      'All-weather comfort for summer weddings and winter evenings',
    ],
    imageUrl: '/TGHPhotos/HotelGround/Hall/banquet-hall.webp',
    secondaryImageUrl: '/TGHPhotos/HotelGround/Hall/caption-20.webp',
    fallbackImageUrl: '/TGHPhotos/HotelGround/Hall/banquet-hall.jpg',
  },
  {
    id: 'spec-rooms',
    category: 'rooms',
    tag: 'Stay & Bridal Suite',
    title: 'Executive Rooms & Heritage Cottages',
    statBadge: '25+ Rooms & Cottages',
    capacityHeadline: 'Comfortable On-Site Stays with Dedicated Bridal Dressing Suite',
    summary:
      'Spacious air-conditioned executive rooms and private heritage cottages allowing family, out-of-town guests, and the bridal entourage to stay together comfortably right at the venue with zero travel hassle on the wedding day.',
    keyFeatures: [
      'Dedicated Bridal Suite with large full-length mirrors and salon vanity',
      '25+ air-conditioned family rooms and heritage cottages',
      '24/7 power backup, running hot/cold water, and room service',
      'Private balconies overlooking the resort greenery and pool',
    ],
    imageUrl: '/TGHPhotos/HotelGround/RoomsCottages/cottage-room.webp',
    secondaryImageUrl: '/TGHPhotos/HotelGround/RoomsCottages/executive-room.webp',
    fallbackImageUrl: '/TGHPhotos/HotelGround/RoomsCottages/cottage-room.jpg',
  },
  {
    id: 'spec-packages',
    category: 'packages',
    tag: 'Transparent Value',
    title: 'Customizable Wedding Packages',
    statBadge: 'Affordable for All Religions',
    capacityHeadline: 'Thoughtfully Priced Packages for Every Wedding Type & All Religions',
    summary:
      'Transparent, customizable wedding packages tailored to your family traditions. Whether hosting a traditional Hindu Vivah, Nikah, Anand Karaj, Christian celebration, or a multi-day destination wedding, we design packages that are respectful and affordable for your family budget with zero hidden costs.',
    keyFeatures: [
      'Affordable packages customized for all religions and traditions',
      'Venue hire for lawn, banquet hall, and poolside celebration areas',
      'Standard ambient lighting, power backup, and security personnel',
      'Flexible options for bridal dressing suite and family room blocks',
    ],
    imageUrl: '/TGHPhotos/HotelGround/Decorations/caption-1.webp',
    secondaryImageUrl: '/TGHPhotos/HotelGround/Decorations/caption-3.webp',
    fallbackImageUrl: '/TGHPhotos/HotelGround/Decorations/caption-1.jpg',
  },
  {
    id: 'spec-catering',
    category: 'catering',
    tag: 'Culinary Heritage',
    title: 'In-House Pure Veg & Multi-Cuisine Feasts',
    statBadge: 'Pure Veg & Multi-Cuisine',
    capacityHeadline: 'Dedicated Pure Vegetarian Kitchens, Live Counters & Outside Caterer Welcome',
    summary:
      'Grand wedding banqueting with authentic regional and royal Indian menus. From traditional Bihari wedding feasts to North Indian delicacies, Marwari spreads, South Indian breakfasts, and live chaat and jalebi stations prepared under strict hygiene standards.',
    keyFeatures: [
      'Dedicated, separate pure-vegetarian cooking facilities',
      'Authentic regional flavors, live tandoor, chaat, and dessert counters',
      'Menu tasting and custom recipe coordination with family elders',
      'Outside catering partners permitted upon prior written coordination',
    ],
    imageUrl: '/TGHPhotos/HotelGround/Catering/caption-6.webp',
    secondaryImageUrl: '/TGHPhotos/HotelGround/Decorations/caption-18.webp',
    fallbackImageUrl: '/TGHPhotos/HotelGround/Catering/caption-6.jpg',
  },
  {
    id: 'spec-parking',
    category: 'parking',
    tag: 'Arrival & Security',
    title: 'Secured Parking & Valet Services',
    statBadge: '150+ Cars · 200+ Bikes',
    capacityHeadline: 'Dedicated On-Premises Parking with Valet & Security Guard Assistance',
    summary:
      'Stress-free guest arrival with expansive, secure parking located directly within the resort perimeter along Gobarsahi–Sakri Road. Professional valet personnel and security guards ensure smooth vehicle flow throughout your celebration.',
    keyFeatures: [
      'Accommodates 150+ four-wheelers and 200+ two-wheelers simultaneously',
      'Wide double-gate entrance and clear turning radius for buses and luxury cars',
      'Valet parking staff and security attendants on duty day and night',
      'Direct, well-lit pedestrian pathways connecting parking to the reception lawn',
    ],
    imageUrl: '/TGHPhotos/HotelGround/Outdoor&Parking/caption-15.webp',
    secondaryImageUrl: '/TGHPhotos/HotelGround/Outdoor&Parking/caption-17.webp',
    fallbackImageUrl: '/TGHPhotos/HotelGround/Outdoor&Parking/caption-15.jpg',
  },
];

// ============================================================================
// WEDDING FAQS (Honest, practical & 100% wedding-focused)
// ============================================================================
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-capacity',
    category: 'Weddings & Events',
    question: 'How many guests can accommodate in the lawn and banquet hall?',
    answer:
      'The Grand Royal Wedding Lawn accommodates up to 1,500 – 2,000+ guests for grand wedding receptions, baraat, and varmala ceremonies. The centrally air-conditioned Heritage Banquet Hall accommodates 350 – 500+ seated guests (up to 700 floating), ideal for sangeet nights, ring ceremonies, and monsoon or winter weddings.',
  },
  {
    id: 'faq-rooms',
    category: 'Stay & Rooms',
    question: 'How many rooms and cottages are available, and is there a bridal dressing suite?',
    answer:
      'We offer 25+ air-conditioned executive rooms and private heritage cottages on-premises for out-of-town wedding guests and family stays. We also provide a dedicated, spacious Bridal Dressing Suite equipped with professional vanity mirrors, full-length dressing glass, private washroom, and 24/7 power backup.',
  },
  {
    id: 'faq-packages',
    category: 'Facilities & Booking',
    question: 'What wedding packages are available and what is the pricing structure?',
    answer:
      'Our wedding packages are thoughtfully designed to be transparent, respectful, and affordable for all wedding types and families of all religious traditions. Whether hosting a traditional Hindu Vivah with Mandap and Pheras, a Nikah, an Anand Karaj, a Christian ceremony, or an interfaith celebration, our packages are customizable to honor your family budget with zero hidden fees. Packages include royal lawn and banquet hall access, ambient lighting, power backup, security, and flexible bridal suite options. Contact our desk for a personalized quotation.',
  },
  {
    id: 'faq-parking',
    category: 'Facilities & Booking',
    question: 'What parking facilities are available for wedding guests?',
    answer:
      'The resort features an expansive, secure on-premises parking facility accommodating 150+ cars and 200+ two-wheelers. Dedicated valet parking staff, security attendants, and wide direct access from Gobarsahi–Sakri Road ensure seamless guest arrival and departure.',
  },
  {
    id: 'faq-catering',
    category: 'Facilities & Booking',
    question: 'How does catering work? Can we bring our own catering team?',
    answer:
      'We offer comprehensive in-house catering with dedicated pure-vegetarian kitchens serving authentic Bihari delicacies, North Indian royal feasts, Marwari cuisine, and live chaat and sweet counters. Families are also welcome to bring their own approved catering partners with prior arrangement.',
  },
  {
    id: 'faq-reviews',
    category: 'Weddings & Events',
    question: 'What is the Google rating and how many weddings have been hosted here?',
    answer:
      'The Green Heritage Resort holds an exceptional 4.6 / 5.0 rating across 550+ verified Google and Justdial reviews. Over the past decade, we have proudly hosted more than 350+ royal weddings and family celebrations across Muzaffarpur and North Bihar.',
  },
  {
    id: 'faq-location',
    category: 'Location & Directions',
    question: 'Where is The Green Heritage Resort located and how do guests reach it?',
    answer:
      'We are located along Gobarsahi–Sakri Road in Bakarpur (Mauza Bakarpur, Dariyapur Kafen), Muzaffarpur, Bihar 844127. Our Google Maps pin is 26.06385, 85.3504979. Landmark: close to Gobarsahi Chowk with wide roadway access. Call or WhatsApp +91 92340 52600 for route guidance.',
  },
  {
    id: 'faq-booking',
    category: 'Facilities & Booking',
    question: 'How do we confirm our wedding date and what is the payment schedule?',
    answer:
      'Wedding dates are reserved on a first-come basis. You can initiate a request via our website enquiry form or by calling +91 92340 52600. Dates are confirmed upon an in-person or virtual venue walkthrough and receipt of an initial booking advance with written terms.',
  },
];

// ============================================================================
// TOP GOOGLE MAPS REVIEWS (Real verified guest feedback - No star icons)
// ============================================================================
export interface GoogleReviewItem {
  id: string;
  author: string;
  location: string;
  event: string;
  badge: string;
  ratingText: string;
  reviewText: string;
  relativeTime: string;
}

export const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Rajesh & Sunita Choudhary',
    location: 'Patna / Muzaffarpur',
    event: "Daughter's Royal Wedding & Reception",
    badge: 'Google Verified',
    ratingText: '4.6 / 5.0 Rating',
    reviewText:
      'We hosted our daughter’s wedding here and were truly blown away. The architecture inspired by Jaipur royal marriages and the grand chandelier banquet hall left all our 1,200+ guests mesmerized. The lawn space for varmala and the separate pure-veg kitchen arrangements were impeccable.',
    relativeTime: 'Recent Wedding Host',
  },
  {
    id: 'rev-2',
    author: 'Amit & Priyanka Verma',
    location: 'Muzaffarpur',
    event: 'Baraat Welcome & Open Lawn Varmala',
    badge: 'Google Verified',
    ratingText: '4.6 / 5.0 Rating',
    reviewText:
      'The royal heritage vibes with carved balconies and illuminated arches reminded us of palace weddings in Rajasthan. Having 25+ air-conditioned rooms on-site meant our extended family stayed together without any rushing. The valet parking handled 100+ cars smoothly.',
    relativeTime: 'Family Wedding Host',
  },
  {
    id: 'rev-3',
    author: 'Dr. Manish Kumar',
    location: 'North Bihar',
    event: 'Sangeet Night & Dinner Reception',
    badge: 'Google Verified',
    ratingText: '4.6 / 5.0 Rating',
    reviewText:
      'One of the best wedding venues in Muzaffarpur. The management was extremely cooperative with our custom multi-cuisine menu and outside decorators. Pricing was completely transparent and affordable with zero hidden charges. Highly recommended for families of all backgrounds.',
    relativeTime: 'Wedding Guest & Host',
  },
  {
    id: 'rev-4',
    author: 'Alok Singhania',
    location: 'Muzaffarpur',
    event: 'Marwari Wedding Vivah & Mandap',
    badge: 'Google Verified',
    ratingText: '4.6 / 5.0 Rating',
    reviewText:
      'Very impressed with the dedicated pure-vegetarian kitchen and polite staff. The mandap setup on the open lawn under the night sky felt truly regal. Transparent, affordable, and deeply respectful of our family traditions and customs.',
    relativeTime: 'Recent Vivah Host',
  },
];
