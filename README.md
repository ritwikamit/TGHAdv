# The Green Heritage Resort and Banquet (`TGHAdv`)

Official web experience for **The Green Heritage Resort and Banquet** — a luxury wedding, celebration, banquet, and hospitality destination located on **Gobarsahi–Sakri Road, Bakarpur, Muzaffarpur, Bihar 844127**.

---

## Overview

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, this site showcases the resort's lawns, chandelier banquet halls, bridal and family suites, ceremony spaces, and wedding celebration films with responsive smartphone-first UX, smooth scrolling, and structured SEO/AEO/GEO support.

### Highlights

- **Editorial Wedding & Venue Experience**: Hero photography showcase, signature gallery masonry with lightbox viewer, ceremony cards (Haldi, Mehendi, Sangeet, Varmala & Pheras, Bridal Stays), and venue detail sections.
- **Leadership & Heritage Notes**: Dedicated sections on `/the-venue` featuring messages from the **Director / Founder** and the **Verma Family**.
- **Viewport-Aware Wedding Reels**: Embedded celebration & walkthrough reels in header/footer strips and `/wedding-films` with aspect-fitted video framing (`object-cover`) and play-on-view behavior.
- **Smartphone-Optimized UX**: Responsive layout across breakpoints with a floating cylindrical bottom quick-menu dock (`TwfMobileDock`) featuring a centered circular quick-call button, synced scroll-up control, and smooth GPU-composited transitions.
- **Interactive Navigation & Communication**:
  - Client/server-routed navigation sidebar with instant photo archive search.
  - Functional mail actions and enquiry modal redirecting smoothly via `mailto:`.
  - Subtle Web Audio API click feedback (`TwfClickSound`).
  - Minimal interactive location map card + Three.js / `globe.gl` showcase.
- **SEO, AEO & GEO Ready**:
  - Crawlable dedicated App Router pages with unique `<title>`, `<meta name="description">`, canonical links, and Open Graph metadata.
  - Dynamic `/sitemap.xml` ([`app/sitemap.ts`](app/sitemap.ts)) and `/robots.txt` ([`app/robots.ts`](app/robots.ts)) welcoming search engines and AI crawlers (`OAI-SearchBot`, `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `Google-Extended`, `ClaudeBot`, `Applebot-Extended`, `Bingbot`).
  - Machine-readable [`public/llms.txt`](public/llms.txt) source of truth for Generative & Answer Engines.
  - JSON-LD `@graph` structured data (`Resort`, `EventVenue`, `WebSite`, `FAQPage`) paired with the visible **Verified Venue Guide & Quick Answers** section.

---

## Tech Stack

| Category | Technologies |
| --- | --- |
| Framework | Next.js `^15.4.9` (App Router, `output: 'standalone'`) |
| UI & Language | React `^19.2.1`, TypeScript `^5.9.3` |
| Styling & Typography | Tailwind CSS `4.1.11`, `tw-animate-css`, Google Fonts (`Cormorant Garamond`, `Plus Jakarta Sans`, `Great Vibes`) |
| Motion & 3D | `motion` (`^12.23.24`), `three` (`^0.187.0`), `globe.gl` (`^2.46.2`) |
| Icons & Utilities | `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority` |

---

## Routes

| Route | View | Purpose |
| --- | --- | --- |
| `/` | Home | Landing hero, signature spaces, celebration cards, minimal location map, and Verified Venue Guide (AEO/GEO) |
| `/the-venue` | The Venue | Resort story, Director's note, and Verma Family welcome |
| `/celebrations` | Celebrations | Multi-day wedding rituals, haldi, mehendi, sangeet, and family stays |
| `/spaces-and-halls` | Spaces & Halls | Open lawns, chandelier banquet hall, poolside, and suites |
| `/wedding-films` | Wedding Films | Vertical celebration reels and venue walkthroughs |
| `/faqs` | FAQs | Visitor, booking, catering, decor, and capacity answers |
| `/contact` | Contact & Visit | Direct enquiry, phone/WhatsApp, email trigger, and Gobarsahi–Sakri Road directions |
| `/sitemap.xml` | XML Sitemap | Auto-generated sitemap for all pages and key visual assets |
| `/robots.txt` | Robots | Crawler rules for traditional search and AI answer engines |
| `/llms.txt` | LLMs Context | Structured Markdown summary for generative AI engines |

---

## Project Structure

```text
TGHAdv/
├── app/
│   ├── celebrations/page.tsx      # /celebrations route & metadata
│   ├── contact/page.tsx           # /contact route & metadata
│   ├── faqs/page.tsx              # /faqs route & metadata
│   ├── spaces-and-halls/page.tsx  # /spaces-and-halls route & metadata
│   ├── the-venue/page.tsx         # /the-venue route & metadata
│   ├── wedding-films/page.tsx     # /wedding-films route & metadata
│   ├── globals.css                # Global styles, theme tokens & smooth transitions
│   ├── layout.tsx                 # Fonts, global metadata & Schema.org JSON-LD @graph
│   ├── page.tsx                   # Home route entry
│   ├── robots.ts                  # Dynamic /robots.txt generator
│   └── sitemap.ts                 # Dynamic /sitemap.xml generator
├── components/
│   ├── green-heritage-shell.tsx   # Main app shell & History API route sync
│   ├── twf-click-sound.tsx        # Aesthetic subtle click sound feedback
│   ├── twf-cookie-banner.tsx      # Consent banner
│   ├── twf-email-handler.tsx      # Mailto handler for email actions
│   ├── twf-footer-and-modals.tsx  # Reels footer, enquiry/booking modals & quick actions
│   ├── twf-hero-slider.tsx        # Full-bleed hero media slider
│   ├── twf-home-sections.tsx      # Landing sections, gallery, minimal map & AEO/GEO guide
│   ├── twf-inner-pages.tsx        # Venue, Celebrations, Spaces, Films, FAQs & Contact views
│   ├── twf-loading-screen.tsx     # Branded loading overlay
│   ├── twf-mobile-dock.tsx        # Floating cylindrical mobile quick menu & call button
│   ├── twf-realistic-globe.tsx    # Interactive Three.js / globe.gl Earth view
│   ├── twf-scroll-progress.tsx    # Scroll progress & smooth back-to-top trigger
│   ├── twf-search-header.tsx      # Sticky utility header & reels strip
│   └── twf-sidebar.tsx            # Left navigation rail & photo search
├── lib/
│   ├── masoom-data.ts             # Resort info, gallery media, FAQs, services & film reels
│   ├── site-routes.ts             # Canonical route definitions & SEO metadata
│   └── utils.ts                   # Classname helpers
├── public/
│   ├── Gallary/                   # Curated gallery photos
│   ├── SignatureImage/            # Celebration showcase portraits & landscapes
│   ├── TGHPhotos/                 # Web-optimized resort, Director & Verma Family imagery
│   ├── Thumbnails/                # Video poster thumbnails
│   ├── globe/                     # Globe textures
│   ├── reels/                     # Celebration video reels (.mp4)
│   └── llms.txt                   # Generative Engine Optimization facts file
└── The_Green_Heritage_Resort_Documentation/
    └── ...                        # PRD, TRD, SEO, AEO, GEO, SXO, security & QA docs
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.18+ or 20+
- **npm** (or compatible package manager)

### Installation & Local Development

```bash
# 1. Clone the repository
git clone https://github.com/ritwikamit/TGHAdv.git
cd TGHAdv

# 2. Install dependencies
npm install

# 3. Configure environment variables (optional)
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

```bash
npm run dev      # Run Next.js development server
npm run build    # Build optimized production bundle
npm run start    # Start production server
npm run lint     # Run ESLint across the project
npm run clean    # Clean Next.js build artifacts
npx tsc --noEmit # Run TypeScript type checks
```

### Environment Variables

See [`.env.example`](.env.example). Optional site URL override for canonical/sitemap generation:

- `NEXT_PUBLIC_SITE_URL` — Canonical production domain (defaults to `VERCEL_URL` or `https://thegreenheritageresort.in`).

---

## Venue Information

- **Name**: The Green Heritage Resort and Banquet
- **Address**: Gobarsahi–Sakri Road, Bakarpur, Muzaffarpur, Bihar 844127, India
- **Coordinates**: `26.06385, 85.3504979`
- **Phone / WhatsApp**: `+91 92340 52600`
- **Email**: `ajay888277@gmail.com`

Additional planning and launch documentation is available in [`The_Green_Heritage_Resort_Documentation/`](The_Green_Heritage_Resort_Documentation/README.md).
