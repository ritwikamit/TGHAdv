'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  X,
  ArrowUpRight,
  MapPin,
  Check,
  ChevronDown,
  Phone,
  Mail,
  CheckCircle2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Compass,
  ExternalLink,
} from 'lucide-react';
import {
  INSTAGRAM_REELS,
  VENUE_REELS,
  GALLERY_PHOTOS,
  SIGNATURE_FRAMES,
  COMMISSION_SERVICES,
  VENUE_INSTALLATIONS,
  VENUE_SPECIFICATIONS,
  FAQ_ITEMS,
  STUDIO_INFO,
  CinemaFilm,
  InstagramReelItem,
  PhotoFrame,
} from '@/lib/masoom-data';
import { PageId } from './twf-sidebar';
import { WhatsAppMinimalIcon, FacebookMinimalIcon } from './twf-icons';

interface TwfInnerPagesProps {
  activePage: PageId;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onPlayFilm: (film: CinemaFilm) => void;
  onSelectPhoto: (photo: PhotoFrame) => void;
  onNavigate: (page: PageId) => void;
  onOpenQuickEnquire: (preselectedService?: string) => void;
}

interface InnerHoverVideoBoxProps {
  videoSrc: string;
  posterUrl: string;
  couple: string;
  location: string;
  aspectClass?: string;
  onOpenModal: () => void;
}

function InnerHoverVideoBox({
  videoSrc,
  posterUrl,
  couple,
  location,
  aspectClass = 'aspect-[9/16]',
  onOpenModal,
}: InnerHoverVideoBoxProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isInViewRef = useRef(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;

    vid.defaultMuted = true;
    vid.muted = isMuted;
    vid.playsInline = true;
    let settleTimer: number | null = null;

    const tryPlay = () => {
      if (!isInViewRef.current) return;
      vid.defaultMuted = true;
      vid.muted = isMuted;
      if (vid.preload !== 'auto') {
        vid.preload = 'auto';
      }
      if (vid.readyState === 0) {
        vid.load();
      }
      vid.play().catch(() => {
        vid.muted = true;
        vid.play().catch(() => {});
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewRef.current = entry.isIntersecting;
          if (settleTimer !== null) {
            window.clearTimeout(settleTimer);
            settleTimer = null;
          }
          if (entry.isIntersecting) {
            settleTimer = window.setTimeout(() => {
              settleTimer = null;
              tryPlay();
            }, 95);
          } else {
            vid.pause();
          }
        });
      },
      { rootMargin: '60px 0px', threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      if (settleTimer !== null) {
        window.clearTimeout(settleTimer);
      }
      observer.disconnect();
      vid.pause();
    };
  }, [isMuted]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onClick={onOpenModal}
      className={`group relative ${aspectClass} rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#061208] cursor-pointer border border-[#0f1f12]/10 shadow-lg transition-transform duration-300 ease-out hover:scale-[1.03] hover:z-30`}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterUrl || undefined}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="none"
        onLoadedData={(e) => {
          if (isInViewRef.current) {
            e.currentTarget.muted = isMuted;
            e.currentTarget.play().catch(() => {});
          }
        }}
        onCanPlay={(e) => {
          if (isInViewRef.current) {
            e.currentTarget.muted = isMuted;
            e.currentTarget.play().catch(() => {});
          }
        }}
        className="w-full h-full object-cover bg-[#061208]"
      />

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-32 transition-opacity duration-300 ${
          isHovered ? 'opacity-95' : 'opacity-85'
        }`}
        style={{
          background:
            'linear-gradient(180deg, rgba(6,18,8,0) 0%, rgba(6,18,8,0.88) 100%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-end justify-between gap-2 z-20">
        <div className="min-w-0">
          <span
            className="text-base sm:text-lg text-[#f0b400] block leading-snug mb-0.5 break-words"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            {location}
          </span>
          <h4
            className="text-base sm:text-lg text-[#f7f6f1] font-normal tracking-wide leading-snug break-words drop-shadow"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {couple}
          </h4>
        </div>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="relative z-30 shrink-0 w-8 h-8 rounded-full bg-[#061208]/80 hover:bg-[#14531e] border border-[#f0b400]/35 text-[#f7f6f1] flex items-center justify-center transition-colors cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#f0b400]" />
          )}
        </button>
      </div>
    </div>
  );
}

export function TwfInnerPages({
  activePage,
  searchQuery,
  onSearchChange,
  onPlayFilm,
  onSelectPhoto,
  onOpenQuickEnquire,
}: TwfInnerPagesProps) {
  // Section unfold toggles for Wedding Films (initial 4-6 items) & The Venue (initial 2 items)
  const [showAllLandscape, setShowAllLandscape] = useState(false);
  const [showAllPortrait, setShowAllPortrait] = useState(false);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [showAllSignature, setShowAllSignature] = useState(false);
  const [showAllVenueLandscape, setShowAllVenueLandscape] = useState(false);
  const [showAllVenuePortrait, setShowAllVenuePortrait] = useState(false);

  const iconicWeddingsCol1 = GALLERY_PHOTOS.slice(0, 4);
  const iconicWeddingsCol2 = SIGNATURE_FRAMES.slice(0, 4);
  const iconicWeddingsCol3 = GALLERY_PHOTOS.slice(14, 18);

  const [lightingInspectId, setLightingInspectId] = useState<string | null>(null);

  const [openFaqId, setOpenFaqId] = useState<string>('faq1');
  const [legalTab, setLegalTab] = useState<'faqs' | 'cookies' | 'terms' | 'privacy'>(
    'faqs'
  );

  // Contact / Location Tabs
  const [contactTab, setContactTab] = useState<'enquiry' | 'directions'>('enquiry');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    enquiryType: 'Wedding & Reception',
    preferredDate: '',
    guests: '',
    message: '',
  });

  const contactBodyText = `Hello The Green Heritage Resort and Banquet! I would like to submit an enquiry.\n\nName: ${
    contactForm.name || 'Guest'
  }\nPhone: ${contactForm.phone || 'Not provided'}\nEnquiry Type: ${
    contactForm.enquiryType
  }\nPreferred Date: ${contactForm.preferredDate || 'Flexible'}\nGuests: ${
    contactForm.guests || 'Not specified'
  }\nMessage: ${
    contactForm.message || 'Please share current availability and details.'
  }`;
  const contactWhatsappText = encodeURIComponent(contactBodyText);
  const contactWhatsappHref = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${contactWhatsappText}`;
  const contactMailtoHref = `mailto:${STUDIO_INFO.email}?subject=${encodeURIComponent(
    `${contactForm.enquiryType} — ${contactForm.name || 'Guest'}`
  )}&body=${contactWhatsappText}`;

  const handleOpenReelModal = (reel: InstagramReelItem) => {
    onPlayFilm({
      id: reel.id,
      videoSrc: reel.videoSrc,
      instagramUrl: reel.instagramUrl,
      reelCode: reel.code,
      isPortrait: reel.isPortrait,
      title: reel.title,
      scriptHighlight: 'the green heritage',
      couple: reel.couple,
      location: reel.location,
      year: 'Muzaffarpur',
      month: 'Property Preview',
      duration: reel.isPortrait ? 'Portrait Clip' : 'Property Clip',
      thumbnailUrl: reel.posterUrl,
      heroImageUrl: reel.posterUrl,
      aiConceptPrompt: reel.caption,
      synopsis: reel.caption,
      emotionalHook: 'Call or WhatsApp +91 92340 52600 for availability.',
      category: 'royal',
    });
  };

  const q = searchQuery.trim().toLowerCase();

  const filteredReels = INSTAGRAM_REELS.filter(
    (r) =>
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.couple.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.caption.toLowerCase().includes(q)
  );

  const landscapeVideos = filteredReels.filter((r) => !r.isPortrait);
  const portraitVideos = filteredReels.filter((r) => r.isPortrait);

  const filteredGallery = GALLERY_PHOTOS.filter((p) => {
    return (
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.couple.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    );
  });

  const filteredSignature = SIGNATURE_FRAMES.filter((p) => {
    return (
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.couple.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    );
  });

  // =========================================================================
  // PAGE 1: PROPERTY GALLERY & CLIPS
  // =========================================================================
  if (activePage === 'films') {
    return (
      <div className="space-y-10 sm:space-y-12 py-2 sm:py-4 px-1 sm:px-2">
        <div className="rounded-[20px] sm:rounded-[24px] min-h-[340px] sm:min-h-[370px] lg:min-h-[430px] bg-[#061208] text-[#f7f6f1] p-5 sm:p-10 lg:p-12 relative overflow-hidden border border-[#f0b400]/20 shadow-2xl flex flex-col justify-end">
          <img
            src="/TGHPhotos/heroes/films-hero.webp"
            alt="The Green Heritage Resort Illuminated Gateway Gallery Hero"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.84] contrast-[1.06] transition-transform duration-700"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.endsWith('.webp')) {
                target.src = target.src.replace(/\.webp$/i, '.jpg');
              }
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(6,18,8,0.28) 0%, rgba(6,18,8,0.52) 50%, rgba(6,18,8,0.90) 100%)',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span
                className="text-2xl sm:text-3xl text-[#f0b400] block mb-1 reveal-on-scroll"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                The Green Heritage Wedding Stories · Muzaffarpur
              </span>
              <h1
                className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#f7f6f1] tracking-tight lowercase reveal-on-scroll interactive-heading reveal-delay-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                moments kept across every ritual
              </h1>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search haldi, sangeet, baraat..."
                className="w-full bg-[#09190c]/60 backdrop-blur-xl border border-[#f0b400]/30 rounded-full py-2.5 pl-9 pr-8 text-xs text-[#f7f6f1] placeholder-[#f7f6f1]/55 focus:outline-none focus:border-[#f0b400]"
              />
              <Search className="w-3.5 h-3.5 text-[#f0b400]/80 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f7f6f1]/60 hover:text-[#f7f6f1] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 1. LANDSCAPE WEDDING FILMS (3 on PC, 2 on smartphone, rest under See All) */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#0f1f12]/10 pb-2.5">
            <div>
              <span
                className="text-2xl sm:text-3xl text-[#9e6800] block leading-none reveal-on-scroll"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Widescreen Wedding Highlights
              </span>
              <h2
                className="text-2xl sm:text-4xl text-[#0f1f12] lowercase mt-0.5 reveal-on-scroll interactive-heading reveal-delay-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                landscape wedding films
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-2">
            {(showAllLandscape ? landscapeVideos : landscapeVideos.slice(0, 3)).map((reel, idx) => (
              <div
                key={reel.id}
                className={!showAllLandscape && idx === 2 ? 'hidden sm:block' : ''}
              >
                <InnerHoverVideoBox
                  videoSrc={reel.videoSrc}
                  posterUrl={reel.posterUrl}
                  couple={reel.couple}
                  location={reel.location}
                  aspectClass="aspect-video"
                  onOpenModal={() => handleOpenReelModal(reel)}
                />
              </div>
            ))}
          </div>

          {landscapeVideos.length > 2 && (
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={() => setShowAllLandscape(!showAllLandscape)}
                className="px-6 py-2.5 rounded-full bg-[#14531e] hover:bg-[#0c3a14] border border-[#f0b400]/40 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                {showAllLandscape ? 'Show Less' : `See All (${landscapeVideos.length})`}
              </button>
            </div>
          )}
        </section>

        {/* 2. PORTRAIT WEDDING REELS (4 on PC, 2 on smartphone, rest under See All) */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#0f1f12]/10 pb-2.5">
            <div>
              <span
                className="text-2xl sm:text-3xl text-[#9e6800] block leading-none reveal-on-scroll"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Vertical Ceremony Stories
              </span>
              <h2
                className="text-2xl sm:text-4xl text-[#0f1f12] lowercase mt-0.5 reveal-on-scroll interactive-heading reveal-delay-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                portrait wedding reels
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 py-2">
            {(showAllPortrait ? portraitVideos : portraitVideos.slice(0, 4)).map((reel, idx) => (
              <div
                key={reel.id}
                className={!showAllPortrait && idx >= 2 ? 'hidden sm:block' : ''}
              >
                <InnerHoverVideoBox
                  videoSrc={reel.videoSrc}
                  posterUrl={reel.posterUrl}
                  couple={reel.couple}
                  location={reel.location}
                  aspectClass="aspect-[9/16]"
                  onOpenModal={() => handleOpenReelModal(reel)}
                />
              </div>
            ))}
          </div>

          {portraitVideos.length > 2 && (
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={() => setShowAllPortrait(!showAllPortrait)}
                className="px-6 py-2.5 rounded-full bg-[#14531e] hover:bg-[#0c3a14] border border-[#f0b400]/40 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                {showAllPortrait ? 'Show Less' : `See All (${portraitVideos.length})`}
              </button>
            </div>
          )}
        </section>

        {/* 3. RESORT & EVENT GALLERY (6 on PC, 3 on smartphone, rest under See All) */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#0f1f12]/10 pb-2.5">
            <div>
              <span
                className="text-2xl sm:text-3xl text-[#9e6800] block leading-none reveal-on-scroll"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Rooms, Outdoor Areas &amp; Event Spaces
              </span>
              <h2
                className="text-2xl sm:text-4xl text-[#0f1f12] lowercase mt-0.5 reveal-on-scroll interactive-heading reveal-delay-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                resort &amp; event gallery
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {(showAllGallery ? filteredGallery : filteredGallery.slice(0, 6)).map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className={`group relative aspect-[3/2] rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#061208] border border-[#0f1f12]/10 shadow-md cursor-pointer transition-all duration-500 hover:scale-[1.03] ${
                  !showAllGallery && idx >= 3 ? 'hidden sm:block' : ''
                }`}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.endsWith('.webp')) {
                      target.src = target.src.replace(/\.webp$/i, '.jpg');
                    }
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(6,18,8,0) 0%, rgba(6,18,8,0.85) 100%)',
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-[#f7f6f1]">
                  <span
                    className="text-lg sm:text-xl text-[#f0b400] block leading-snug"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    {photo.couple}
                  </span>
                  <span className="text-xs sm:text-sm text-[#f7f6f1]/95 font-medium leading-snug block mt-0.5">
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredGallery.length > 3 && (
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={() => setShowAllGallery(!showAllGallery)}
                className="px-6 py-2.5 rounded-full bg-[#14531e] hover:bg-[#0c3a14] border border-[#f0b400]/40 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                {showAllGallery ? 'Show Less' : `See All (${filteredGallery.length})`}
              </button>
            </div>
          )}
        </section>

        {/* 4. SPACES & GATHERING VIEWS (8 on PC, 4 on smartphone, rest under See All) */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#0f1f12]/10 pb-2.5">
            <div>
              <span
                className="text-2xl sm:text-3xl text-[#9e6800] block leading-none reveal-on-scroll"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Event &amp; Grounds Preview
              </span>
              <h2
                className="text-2xl sm:text-4xl text-[#0f1f12] lowercase mt-0.5 reveal-on-scroll interactive-heading reveal-delay-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                spaces &amp; gathering views
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {(showAllSignature ? filteredSignature : filteredSignature.slice(0, 8)).map((frame, idx) => (
              <div
                key={frame.id}
                onClick={() => onSelectPhoto(frame)}
                className={`group relative aspect-[2/3] rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#061208] border border-[#0f1f12]/10 shadow-md cursor-pointer transition-all duration-500 hover:scale-[1.03] ${
                  !showAllSignature && idx >= 4 ? 'hidden sm:block' : ''
                }`}
              >
                <img
                  src={frame.imageUrl}
                  alt={frame.title}
                  decoding="async"
                  className={`w-full h-full group-hover:scale-105 transition-transform duration-700 ${
                    frame.aspect === 'landscape'
                      ? 'object-contain bg-[#061208]'
                      : 'object-cover'
                  }`}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.endsWith('.webp')) {
                      target.src = target.src.replace(/\.webp$/i, '.jpg');
                    }
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(6,18,8,0) 0%, rgba(6,18,8,0.85) 100%)',
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-[#f7f6f1]">
                  <span
                    className="text-lg sm:text-xl text-[#f0b400] block leading-snug"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    {frame.couple}
                  </span>
                  <span className="text-xs sm:text-sm text-[#f7f6f1]/95 font-medium leading-snug block mt-0.5">
                    {frame.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredSignature.length > 4 && (
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={() => setShowAllSignature(!showAllSignature)}
                className="px-6 py-2.5 rounded-full bg-[#14531e] hover:bg-[#0c3a14] border border-[#f0b400]/40 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                {showAllSignature ? 'Show Less' : `See All (${filteredSignature.length})`}
              </button>
            </div>
          )}
        </section>
      </div>
    );
  }

  // =========================================================================
  // PAGE 2: THE VENUE & RESORT OVERVIEW
  // =========================================================================
  if (activePage === 'about') {
    const venueLandscapeVideos = VENUE_REELS.filter((r) => !r.isPortrait);
    const venuePortraitVideos = VENUE_REELS.filter((r) => r.isPortrait);

    return (
      <div className="space-y-12 sm:space-y-16 py-2 sm:py-4 px-1 sm:px-2">
        {/* PHOTO HERO BANNER (RESORT ARCHITECTURE, DARK FADED YET CLEARLY VISIBLE) */}
        <section className="rounded-[20px] sm:rounded-[24px] min-h-[320px] sm:min-h-[370px] lg:min-h-[430px] bg-[#061208] text-[#f7f6f1] p-5 sm:p-10 lg:p-12 relative overflow-hidden border border-[#f0b400]/20 shadow-2xl flex flex-col justify-end">
          <img
            src="/TGHPhotos/heroes/venue-hero-v2.webp"
            alt="The Green Heritage Grand Floral Mandap and Illuminated Pavilion"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.86] contrast-[1.06] transition-transform duration-700"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.endsWith('.webp')) {
                target.src = target.src.replace(/\.webp$/i, '.jpg');
              }
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(6,18,8,0.28) 0%, rgba(6,18,8,0.52) 50%, rgba(6,18,8,0.90) 100%)',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span
                className="text-3xl sm:text-4xl text-[#f0b400] block mb-1 reveal-on-scroll"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Bakarpur · Muzaffarpur, Bihar
              </span>
              <h1
                className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#f7f6f1] lowercase reveal-on-scroll interactive-heading reveal-delay-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                welcome to the green heritage
              </h1>
              <p className="text-sm sm:text-base text-[#f7f6f1]/85 mt-3 max-w-xl leading-relaxed">
                In Bakarpur along Gobarsahi–Sakri Road, The Green Heritage Resort and Banquet is where Muzaffarpur families gather for{' '}
                <span
                  className="text-2xl text-[#f0b400] px-1"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  haldi mornings, starlit pheras &amp; joyful stays
                </span>{' '}
                under open lawns and chandelier halls.
              </p>
            </div>

            <div className="shrink-0 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => onOpenQuickEnquire('Venue Walkthrough & Dates')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f0b400] hover:bg-[#ffca2c] text-[#061208] text-xs font-semibold uppercase tracking-[0.16em] transition-colors shadow-lg cursor-pointer"
              >
                <span>Book Venue Tour</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* VENUE VIDEO WALKTHROUGHS (7 DEDICATED RESORT & EVENT REELS) */}
        <section className="rounded-[22px] sm:rounded-[28px] bg-white border border-[#0f1f12]/10 p-5 sm:p-8 lg:p-10 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#0f1f12]/10 pb-4">
            <div>
              <span
                className="text-2xl sm:text-3xl text-[#9e6800] block leading-none reveal-on-scroll"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Real Views From Bakarpur, Muzaffarpur
              </span>
              <h2
                className="text-2xl sm:text-4xl text-[#0f1f12] lowercase mt-0.5 reveal-on-scroll interactive-heading reveal-delay-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                venue walkthrough &amp; lawn videos
              </h2>
            </div>
            <span className="text-xs sm:text-sm text-[#0f1f12]/60">
              Hover or scroll to preview · Tap any video to watch fullscreen
            </span>
          </div>

          {/* 4 Widescreen Venue Videos (Initial 2 with Show All toggle) */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <h3
                className="text-lg sm:text-2xl text-[#0f1f12] lowercase"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                campus, gateway &amp; dusk highlights
              </h3>
              <span
                className="text-lg sm:text-xl text-[#9e6800]"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                aerial &amp; evening views
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {(showAllVenueLandscape ? venueLandscapeVideos : venueLandscapeVideos.slice(0, 2)).map((reel) => (
                <InnerHoverVideoBox
                  key={reel.id}
                  videoSrc={reel.videoSrc}
                  posterUrl={reel.posterUrl}
                  couple={reel.couple}
                  location={reel.location}
                  aspectClass="aspect-video"
                  onOpenModal={() => handleOpenReelModal(reel)}
                />
              ))}
            </div>

            {venueLandscapeVideos.length > 2 && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllVenueLandscape(!showAllVenueLandscape)}
                  className="px-6 py-2.5 rounded-full bg-[#14531e] hover:bg-[#0c3a14] border border-[#f0b400]/40 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  {showAllVenueLandscape ? 'Show Less' : `Show All (${venueLandscapeVideos.length})`}
                </button>
              </div>
            )}
          </div>

          {/* 3 Vertical Venue Reels (Initial 2 with Show All toggle) */}
          <div className="space-y-3 pt-2 border-t border-[#0f1f12]/10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <h3
                className="text-lg sm:text-2xl text-[#0f1f12] lowercase"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                poolside, lawn &amp; cottage reels
              </h3>
              <span
                className="text-lg sm:text-xl text-[#9e6800]"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                up close across the grounds
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {(showAllVenuePortrait ? venuePortraitVideos : venuePortraitVideos.slice(0, 3)).map((reel, idx) => (
                <div
                  key={reel.id}
                  className={!showAllVenuePortrait && idx >= 1 ? 'hidden sm:block' : ''}
                >
                  <InnerHoverVideoBox
                    videoSrc={reel.videoSrc}
                    posterUrl={reel.posterUrl}
                    couple={reel.couple}
                    location={reel.location}
                    aspectClass="aspect-[9/16]"
                    onOpenModal={() => handleOpenReelModal(reel)}
                  />
                </div>
              ))}
            </div>

            <div className={`pt-2 text-center ${!showAllVenuePortrait ? 'sm:hidden' : ''}`}>
              <button
                type="button"
                onClick={() => setShowAllVenuePortrait(!showAllVenuePortrait)}
                className="px-6 py-2.5 rounded-full bg-[#14531e] hover:bg-[#0c3a14] border border-[#f0b400]/40 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                {showAllVenuePortrait ? 'Show Less' : `Show All (${venuePortraitVideos.length})`}
              </button>
            </div>
          </div>
        </section>

        {/* DIRECTOR'S EMOTIONAL NOTE & MESSAGE FROM THE VERMA FAMILY */}
        <section className="space-y-6 sm:space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span
              className="text-3xl sm:text-4xl text-[#9e6800] block leading-none"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Heart &amp; Stewardship Behind The Green Heritage
            </span>
            <h2
              className="text-2xl sm:text-4xl text-[#0f1f12] lowercase tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              words from our director &amp; the verma family
            </h2>
          </div>

          <div className="space-y-6">
            {/* Director / Founder Emotional Note */}
            <article className="rounded-[22px] sm:rounded-[28px] bg-white border border-[#e3d7b8] p-5 sm:p-8 lg:p-10 shadow-[0_14px_40px_rgba(15,31,18,0.06)] flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-10">
              <div className="w-full max-w-[270px] sm:max-w-[290px] shrink-0">
                <div
                  onClick={() =>
                    onSelectPhoto({
                      id: 'venue-founder',
                      title: 'Director & Founder — The Green Heritage Resort and Banquet',
                      scriptHighlight: 'director message',
                      category: 'portraits',
                      categoryLabel: 'Leadership',
                      couple: 'Director, The Green Heritage',
                      location: 'Bakarpur, Muzaffarpur',
                      year: 'Muzaffarpur',
                      imageUrl: '/TGHPhotos/founder.webp',
                      aspect: 'landscape',
                      description:
                        'Director of The Green Heritage Resort and Banquet, Bakarpur, Muzaffarpur — committed to building a welcoming space for multi-generational family weddings.',
                      emotionalExcerpt:
                        'Every courtyard, chandelier and lawn here carries our personal promise to stand beside your family.',
                      exif: {
                        lens: 'Founder & Director',
                        camera: 'The Green Heritage Resort & Banquet',
                        setting: 'Bakarpur, Muzaffarpur',
                      },
                    })
                  }
                  className="group relative p-2.5 sm:p-3 rounded-[20px] bg-[#fbf8f0] border border-[#d89a00]/45 shadow-[0_14px_34px_rgba(15,31,18,0.10)] cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-[13px] border border-[#d89a00]/30 bg-[#09190c]">
                    <img
                      src="/TGHPhotos/founder.webp"
                      alt="Director of The Green Heritage Resort and Banquet"
                      decoding="async"
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.endsWith('.webp')) {
                          target.src = target.src.replace(/\.webp$/i, '.jpg');
                        }
                      }}
                    />
                  </div>
                  <div className="pt-2.5 pb-0.5 text-center">
                    <span
                      className="text-base sm:text-lg text-[#9e6800] block leading-none"
                      style={{ fontFamily: 'var(--font-script)' }}
                    >
                      Director &amp; Founder
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="space-y-1">
                  <span
                    className="text-2xl sm:text-3xl text-[#9e6800] block leading-none"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    From the Director&rsquo;s Heart
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl text-[#0f1f12] lowercase"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    a promise built for every father&rsquo;s smile &amp; every vidaai
                  </h3>
                </div>

                <blockquote className="text-sm sm:text-base text-[#0f1f12]/80 leading-relaxed font-light italic border-l-0 md:border-l-2 border-[#f0b400] md:pl-5">
                  &ldquo;When we first walked the quiet fields of Bakarpur and imagined The Green Heritage Resort and Banquet, we never wanted to build just another brick-and-mortar venue. We wanted a home where a father can welcome guests at the gate with peace in his heart, where grandparents can rest steps away from the mandap, and where a daughter&rsquo;s vidaai feels held by genuine warmth. Every lawn, chandelier and archway here carries my personal promise that our team will treat your family&rsquo;s celebration as if it were our own.&rdquo;
                </blockquote>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#0f1f12]/10">
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-[#0f1f12] block">
                      Founder &amp; Director
                    </span>
                    <span className="text-xs sm:text-sm text-[#0f1f12]/60 block">
                      The Green Heritage Resort &amp; Banquet · Bakarpur, Muzaffarpur
                    </span>
                  </div>
                  <span
                    className="text-xl sm:text-2xl text-[#14531e]"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    Always here to welcome your family
                  </span>
                </div>
              </div>
            </article>

            {/* Message from the Verma Family (Owners) */}
            <article className="rounded-[22px] sm:rounded-[28px] bg-[#fdfcf8] border border-[#e3d7b8] p-5 sm:p-8 lg:p-10 shadow-[0_14px_40px_rgba(15,31,18,0.06)] flex flex-col md:flex-row-reverse items-center gap-6 sm:gap-8 lg:gap-10">
              <div className="w-full max-w-[270px] sm:max-w-[300px] shrink-0">
                <div
                  onClick={() =>
                    onSelectPhoto({
                      id: 'venue-verma-family',
                      title: 'The Verma Family — Owners of The Green Heritage Resort and Banquet',
                      scriptHighlight: 'verma family',
                      category: 'portraits',
                      categoryLabel: 'Resort Owners',
                      couple: 'The Verma Family',
                      location: 'Bakarpur, Muzaffarpur',
                      year: 'Muzaffarpur',
                      imageUrl: '/TGHPhotos/verma-family.webp',
                      aspect: 'landscape',
                      description:
                        'The Verma Family — owners and stewards of The Green Heritage Resort and Banquet in Bakarpur, Muzaffarpur.',
                      emotionalExcerpt:
                        'You are not a booking number to us — you are welcomed into the care of our family.',
                      exif: {
                        lens: 'Resort Owners',
                        camera: 'The Verma Family',
                        setting: 'Bakarpur, Muzaffarpur',
                      },
                    })
                  }
                  className="group relative p-2.5 sm:p-3 rounded-[20px] bg-white border border-[#d89a00]/45 shadow-[0_14px_34px_rgba(15,31,18,0.10)] cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-[13px] border border-[#d89a00]/30 bg-[#09190c]">
                    <img
                      src="/TGHPhotos/verma-family.webp"
                      alt="The Verma Family, owners of The Green Heritage Resort and Banquet"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-[50%_15%] group-hover:scale-[1.03] transition-transform duration-500"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.endsWith('.webp')) {
                          target.src = target.src.replace(/\.webp$/i, '.jpg');
                        }
                      }}
                    />
                  </div>
                  <div className="pt-2.5 pb-0.5 text-center">
                    <span
                      className="text-base sm:text-lg text-[#9e6800] block leading-none"
                      style={{ fontFamily: 'var(--font-script)' }}
                    >
                      The Verma Family · Owners
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="space-y-1">
                  <span
                    className="text-2xl sm:text-3xl text-[#9e6800] block leading-none"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    From Our Family to Yours
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl text-[#0f1f12] lowercase"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    warmth &amp; hospitality by the verma family
                  </h3>
                </div>

                <blockquote className="text-sm sm:text-base text-[#0f1f12]/80 leading-relaxed font-light italic border-l-0 md:border-l-2 border-[#14531e] md:pl-5">
                  &ldquo;As owners of The Green Heritage Resort and Banquet, nothing fills us with greater joy than watching two families come together in laughter, music and blessings under one sky. When you celebrate a wedding, haldi morning or family milestone with us in Bakarpur, you are never just reserving a date — you are entrusting your happiest memories to our whole family. Keeping our lawns green, our hospitality honest and every corner worthy of your blessings is the pride the Verma family wakes up with every day.&rdquo;
                </blockquote>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#0f1f12]/10">
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-[#0f1f12] block">
                      With Warm Regards, The Verma Family
                    </span>
                    <span className="text-xs sm:text-sm text-[#0f1f12]/60 block">
                      Owners · The Green Heritage Resort &amp; Banquet, Muzaffarpur
                    </span>
                  </div>
                  <span
                    className="text-xl sm:text-2xl text-[#9e6800]"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    With gratitude &amp; blessings
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>

      </div>
    );
  }

  // =========================================================================
  // PAGE 3: STAY & EVENTS ENQUIRY OPTIONS
  // =========================================================================
  if (activePage === 'commissions') {
    return (
      <div className="space-y-10 sm:space-y-12 py-2 sm:py-4 px-1 sm:px-2">
        <div className="rounded-[20px] sm:rounded-[24px] min-h-[340px] sm:min-h-[370px] lg:min-h-[430px] bg-[#061208] text-[#f7f6f1] p-5 sm:p-10 lg:p-12 relative overflow-hidden border border-[#f0b400]/20 shadow-2xl flex flex-col justify-end">
          <img
            src="/TGHPhotos/heroes/packages-hero.webp"
            alt="Poolside and Heritage Pavilion at The Green Heritage Resort"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.84] contrast-[1.06] transition-transform duration-700"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.endsWith('.webp')) {
                target.src = target.src.replace(/\.webp$/i, '.jpg');
              }
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(6,18,8,0.28) 0%, rgba(6,18,8,0.52) 50%, rgba(6,18,8,0.90) 100%)',
            }}
          />

          <div className="relative z-10">
            <span
              className="text-3xl sm:text-4xl text-[#f0b400] block mb-1 reveal-on-scroll"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Bakarpur, Gobarsahi–Sakri Road · Muzaffarpur
            </span>
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#f7f6f1] lowercase reveal-on-scroll interactive-heading reveal-delay-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              weddings, pre-wedding rituals &amp; family stays
            </h1>
            <p className="text-sm sm:text-base text-[#f7f6f1]/80 mt-3 max-w-2xl leading-relaxed reveal-on-scroll reveal-delay-2">
              Call or WhatsApp +91 92340 52600 to plan haldi, mehendi, sangeet, baraat, pheras and bridal guest rooms at The Green Heritage Resort and Banquet.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {COMMISSION_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="rounded-[20px] sm:rounded-[24px] bg-white border border-[#0f1f12]/10 p-5 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <span
                  className="text-2xl sm:text-3xl text-[#9e6800] block leading-none reveal-on-scroll"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  {srv.scriptHighlight}
                </span>
                <h2
                  className="text-xl sm:text-3xl text-[#0f1f12] font-normal leading-snug reveal-on-scroll interactive-heading reveal-delay-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {srv.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#0f1f12]/75 leading-relaxed font-light">
                  {srv.description}
                </p>

                <ul className="space-y-1.5 pt-2 border-t border-[#0f1f12]/10">
                  {srv.deliverables.slice(0, 2).map((d, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs sm:text-sm text-[#0f1f12]/85 leading-snug"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#0f1f12]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p
                  className="text-base sm:text-lg text-[#9e6800] leading-snug"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  &ldquo;{srv.humanNote}&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() => onOpenQuickEnquire(srv.title)}
                  className="shrink-0 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#14531e] hover:bg-[#0c3a14] text-white text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer shadow-sm"
                >
                  <span>Enquire Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#f0b400]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 3-COLUMN SPACES & CELEBRATION PREVIEWS (MOVED FROM THE VENUE) */}
        <section className="space-y-6 sm:space-y-8 pt-4 sm:pt-6">
          <div className="text-center max-w-2xl mx-auto">
            <span
              className="text-2xl sm:text-3xl text-[#9e6800] block mb-0.5"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Stay, Events &amp; Grounds
            </span>
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl text-[#0f1f12] lowercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              spaces &amp; celebration previews
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[iconicWeddingsCol1, iconicWeddingsCol2, iconicWeddingsCol3].map(
              (col, colIdx) => (
                <div
                  key={colIdx}
                  className={`space-y-5 sm:space-y-6 ${
                    colIdx === 1 ? 'md:mt-8' : colIdx === 2 ? 'md:mt-16' : ''
                  }`}
                >
                  {col.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => onSelectPhoto(photo)}
                      className="group relative aspect-[4/5] rounded-[20px] overflow-hidden bg-[#061208] border border-[#0f1f12]/10 shadow-xl cursor-pointer"
                    >
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.endsWith('.webp')) {
                            target.src = target.src.replace(/\.webp$/i, '.jpg');
                          }
                        }}
                      />
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(6,18,8,0) 0%, rgba(6,18,8,0.88) 100%)',
                        }}
                      />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-[#f7f6f1]">
                        <div
                          className="text-lg text-[#f0b400] leading-none"
                          style={{ fontFamily: 'var(--font-script)' }}
                        >
                          {photo.location}
                        </div>
                        <div
                          className="text-xl sm:text-2xl text-[#f7f6f1] tracking-wide mt-0.5"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {photo.couple}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </section>
      </div>
    );
  }

  // =========================================================================
  // PAGE 4: FACILITIES & SPACES
  // =========================================================================
  if (activePage === 'installations') {
    return (
      <div className="space-y-10 sm:space-y-12 py-2 sm:py-4 px-1 sm:px-2">
        <div className="rounded-[20px] sm:rounded-[24px] min-h-[340px] sm:min-h-[370px] lg:min-h-[430px] bg-[#061208] text-[#f7f6f1] p-5 sm:p-10 lg:p-12 relative overflow-hidden border border-[#f0b400]/20 shadow-2xl flex flex-col justify-end">
          <img
            src="/TGHPhotos/HotelGround/Hall/banquet-hall.webp"
            alt="Aerial Resort Lawns and Illuminated Heritage Campus"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.84] contrast-[1.06] transition-transform duration-700"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.endsWith('.webp')) {
                target.src = target.src.replace(/\.webp$/i, '.jpg');
              }
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(6,18,8,0.28) 0%, rgba(6,18,8,0.52) 50%, rgba(6,18,8,0.90) 100%)',
            }}
          />

          <div className="relative z-10">
            <span
              className="text-3xl sm:text-4xl text-[#f0b400] block mb-1 reveal-on-scroll"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Lawns, Banquet Hall &amp; Bridal Suites
            </span>
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#f7f6f1] lowercase reveal-on-scroll interactive-heading reveal-delay-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              spaces built for every wedding ceremony
            </h1>
            <p className="text-sm sm:text-base text-[#f7f6f1]/80 mt-3 max-w-xl leading-relaxed reveal-on-scroll reveal-delay-2">
              Every corner at Bakarpur, from the poolside mandap lawn to guest cottages and on-site parking, comes together to keep families close. Confirm active amenities for your wedding dates at +91 92340 52600.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {VENUE_INSTALLATIONS.map((inst) => {
            const inspecting = lightingInspectId === inst.id;
            return (
              <div
                key={inst.id}
                className="rounded-[20px] sm:rounded-[24px] bg-white/95 border border-[#0f1f12]/10 overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] bg-[#061208] overflow-hidden">
                  <img
                    src={inspecting ? inst.secondaryImageUrl : inst.imageUrl}
                    alt={inst.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-all duration-700"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.endsWith('.webp')) {
                        target.src = target.src.replace(/\.webp$/i, '.jpg');
                      }
                    }}
                  />
                  <div className="absolute top-3 left-3 px-3.5 py-1 rounded-full bg-[#061208]/75 backdrop-blur-md border border-[#f0b400]/25 text-xs sm:text-sm text-[#f7f6f1]">
                    {inst.atmosphereTag}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setLightingInspectId(inspecting ? null : inst.id)
                    }
                    className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-[#14531e] hover:bg-[#1b6d28] text-white text-xs sm:text-sm uppercase tracking-wider font-semibold shadow-lg cursor-pointer transition-colors"
                  >
                    {inspecting ? 'View First Photo' : 'See Another Angle'}
                  </button>
                </div>

                <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span
                      className="text-2xl sm:text-3xl text-[#9e6800] block leading-none"
                      style={{ fontFamily: 'var(--font-script)' }}
                    >
                      {inst.venue}
                    </span>
                    <h3
                      className="text-2xl sm:text-3xl text-[#0f1f12] mt-1"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {inst.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#0f1f12]/70 mt-2 leading-relaxed">
                      {inst.summary}
                    </p>
                  </div>

                  <div className="pt-3 flex items-center justify-between gap-3 border-t border-[#0f1f12]/10">
                    <span className="text-xs sm:text-sm text-[#0f1f12]/60 truncate">
                      {inst.lightingNotes}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenQuickEnquire(`Enquiry: ${inst.title}`)
                      }
                      className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#09190c] hover:bg-[#14531e] text-[#f7f6f1] text-xs sm:text-sm uppercase tracking-wider font-medium transition-colors cursor-pointer"
                    >
                      <span>Confirm</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transferred Specifications: Packages, Catering & Parking */}
        <section className="space-y-6 pt-6 border-t border-[#0f1f12]/10">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span
              className="text-2xl sm:text-3xl text-[#9e6800] block leading-none reveal-on-scroll"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Essential Packages, Catering &amp; Parking
            </span>
            <h2
              className="text-2xl sm:text-4xl text-[#0f1f12] lowercase tracking-tight reveal-on-scroll interactive-heading reveal-delay-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              wedding packages &amp; guest facilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {VENUE_SPECIFICATIONS.slice(3).map((spec) => (
              <div
                key={spec.id}
                className="rounded-[22px] sm:rounded-[24px] bg-white border border-[#14531e]/15 overflow-hidden shadow-md hover:shadow-xl hover:border-[#f0b400]/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#09190c]">
                  <img
                    src={spec.imageUrl}
                    alt={spec.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.endsWith('.webp')) {
                        target.src = spec.fallbackImageUrl || target.src.replace(/\.webp$/i, '.jpg');
                      }
                    }}
                  />
                </div>

                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3
                      className="text-xl sm:text-2xl text-[#0f1f12] font-normal leading-snug"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {spec.title}
                    </h3>

                    <ul className="pt-2.5 space-y-2 border-t border-[#0f1f12]/10">
                      {spec.keyFeatures.slice(0, 2).map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-[#0f1f12]/85 leading-snug"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-[#0f1f12]/10 flex items-center justify-between gap-2">
                    <a
                      href={`https://wa.me/919234052600?text=${encodeURIComponent(
                        `Hello The Green Heritage Resort, I am inquiring about ${spec.title} (${spec.statBadge}) for our wedding.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#14531e] hover:text-[#9e6800] transition-colors"
                    >
                      <span>Enquire on WhatsApp</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#f0b400]" />
                    </a>

                    {onOpenQuickEnquire && (
                      <button
                        type="button"
                        onClick={() => onOpenQuickEnquire(spec.title)}
                        className="px-3.5 py-1.5 rounded-full bg-[#14531e]/10 hover:bg-[#14531e] hover:text-white text-[#14531e] text-xs sm:text-sm uppercase tracking-wider font-medium transition-colors cursor-pointer"
                      >
                        Book Tour
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // =========================================================================
  // PAGE 5: FAQS & POLICIES
  // =========================================================================
  if (activePage === 'faqs') {
    return (
      <div className="space-y-8 sm:space-y-10 py-2 sm:py-4 px-1 sm:px-2 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <span
            className="text-3xl sm:text-4xl text-[#9e6800] block reveal-on-scroll"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Direct Answers
          </span>
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl text-[#0f1f12] lowercase reveal-on-scroll interactive-heading reveal-delay-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            frequently asked questions
          </h1>

          <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-[#0f1f12]/5 border border-[#0f1f12]/10 mt-3">
            {[
              { id: 'faqs', label: 'Resort FAQs' },
              { id: 'cookies', label: 'Cookie Policy' },
              { id: 'terms', label: 'Enquiry Terms' },
              { id: 'privacy', label: 'Privacy Policy' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() =>
                  setLegalTab(t.id as 'faqs' | 'cookies' | 'terms' | 'privacy')
                }
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm transition-all cursor-pointer ${
                  legalTab === t.id
                    ? 'bg-[#14531e] text-white font-medium'
                    : 'text-[#0f1f12]/65 hover:text-[#0f1f12]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {legalTab === 'faqs' ? (
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white/95 border border-[#0f1f12]/10 overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div>
                      <span
                        className="text-xl sm:text-2xl text-[#9e6800] block leading-none"
                        style={{ fontFamily: 'var(--font-script)' }}
                      >
                        {item.category}
                      </span>
                      <h3
                        className="text-lg sm:text-2xl text-[#0f1f12] mt-1"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {item.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-[#0f1f12]/50 transition-transform ${
                        isOpen ? 'rotate-180 text-[#14531e]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-sm sm:text-base text-[#0f1f12]/75 leading-relaxed border-t border-[#0f1f12]/5 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[20px] sm:rounded-[24px] bg-white/95 border border-[#0f1f12]/10 p-6 sm:p-8 space-y-4 text-sm sm:text-base text-[#0f1f12]/75 leading-relaxed">
            <h3
              className="text-2xl sm:text-3xl text-[#0f1f12]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {legalTab === 'cookies'
                ? 'Cookie & Browser Storage Policy'
                : legalTab === 'terms'
                ? 'Enquiry & Booking Terms'
                : 'Visitor Privacy Policy'}
            </h3>
            <p>
              {legalTab === 'cookies'
                ? 'This website uses essential browser storage to remember your cookie preference and keep video playback smooth.'
                : legalTab === 'terms'
                ? 'An online or WhatsApp enquiry is a request only, not a confirmed reservation. Bookings are confirmed once The Green Heritage Resort and Banquet team verifies availability and communicates booking, payment and cancellation terms.'
                : 'Your name, phone number, preferred date and optional guest notes are used strictly to respond to your stay or event enquiry. Do not submit identity documents or payment details through web forms.'}
            </p>
            <p>
              For direct clarification, call or WhatsApp{' '}
              <strong>{STUDIO_INFO.phoneNumber}</strong> or email{' '}
              <strong>{STUDIO_INFO.email}</strong>.
            </p>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // PAGE 6: LOCATION & CONTACT
  // =========================================================================
  return (
    <div className="space-y-10 sm:space-y-12 py-2 sm:py-4 px-1 sm:px-2 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span
          className="text-3xl sm:text-4xl text-[#9e6800] block reveal-on-scroll"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          Bakarpur, Gobarsahi–Sakri Road · Muzaffarpur
        </span>
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl text-[#0f1f12] lowercase reveal-on-scroll interactive-heading reveal-delay-1"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          tell us what you are planning
        </h1>

        <div className="inline-flex gap-2 p-1.5 rounded-full bg-[#0f1f12]/5 border border-[#0f1f12]/10 mt-2">
          <button
            type="button"
            onClick={() => setContactTab('enquiry')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              contactTab === 'enquiry'
                ? 'bg-[#14531e] text-white font-medium'
                : 'text-[#0f1f12]/65 hover:text-[#0f1f12]'
            }`}
          >
            Send an Enquiry
          </button>
          <button
            type="button"
            onClick={() => {
              setContactTab('directions');
              setMapLoaded(true);
            }}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              contactTab === 'directions'
                ? 'bg-[#14531e] text-white font-medium'
                : 'text-[#0f1f12]/65 hover:text-[#0f1f12]'
            }`}
          >
            Location &amp; Directions
          </button>
        </div>
      </div>

      {contactTab === 'enquiry' ? (
        <div className="rounded-[20px] sm:rounded-[24px] bg-white/95 border border-[#0f1f12]/10 p-5 sm:p-10 shadow-xl">
          {contactSubmitted ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#14531e] mx-auto" />
              <h3
                className="text-2xl sm:text-3xl text-[#0f1f12]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Thank you for contacting The Green Heritage Resort and Banquet
              </h3>
              <p className="text-xs sm:text-sm text-[#0f1f12]/65 max-w-md mx-auto leading-relaxed">
                Your enquiry has been prepared for WhatsApp{' '}
                <strong>({STUDIO_INFO.phoneNumber})</strong>. An online enquiry is
                a request only, not a confirmed booking. You can also call{' '}
                <strong>{STUDIO_INFO.phoneNumber}</strong> or email{' '}
                <strong>{STUDIO_INFO.email}</strong> directly.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={contactWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#14531e] hover:bg-[#0c3a14] text-white text-xs uppercase tracking-widest transition-colors shadow-lg shadow-[#14531e]/25"
                >
                  <WhatsAppMinimalIcon className="w-4 h-4 text-white" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={STUDIO_INFO.phonePrimaryUrl}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0f1f12]/5 hover:bg-[#0f1f12]/10 text-[#0f1f12]/85 text-xs uppercase tracking-wider transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#14531e]" />
                  <span>Call {STUDIO_INFO.phoneNumber}</span>
                </a>
                <a
                  href={STUDIO_INFO.emailUrl}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0f1f12]/5 hover:bg-[#0f1f12]/10 text-[#0f1f12]/85 text-xs uppercase tracking-wider transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#14531e]" />
                  <span>{STUDIO_INFO.email}</span>
                </a>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setContactSubmitted(true);
                const link = document.createElement('a');
                link.href = contactWhatsappHref;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#0f1f12]/75 mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl bg-[#f7f6f1] border border-[#0f1f12]/15 text-sm text-[#0f1f12] focus:outline-none focus:border-[#14531e]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#0f1f12]/75 mb-1.5">
                    Phone Number / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 rounded-xl bg-[#f7f6f1] border border-[#0f1f12]/15 text-sm text-[#0f1f12] focus:outline-none focus:border-[#14531e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#0f1f12]/75 mb-1.5">
                    Enquiry Type *
                  </label>
                  <select
                    value={contactForm.enquiryType}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        enquiryType: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#f7f6f1] border border-[#0f1f12]/15 text-sm text-[#0f1f12] focus:outline-none focus:border-[#14531e]"
                  >
                    <option value="Wedding & Reception">Wedding &amp; Reception</option>
                    <option value="Haldi, Mehendi & Sangeet">Haldi, Mehendi &amp; Sangeet</option>
                    <option value="Wedding Guest Stay">Wedding Guest Stay</option>
                    <option value="Venue Tour">Venue Tour</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#0f1f12]/75 mb-1.5">
                    Preferred Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.preferredDate}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        preferredDate: e.target.value,
                      })
                    }
                    placeholder="e.g., 15 Dec 2026"
                    className="w-full px-4 py-3 rounded-xl bg-[#f7f6f1] border border-[#0f1f12]/15 text-sm text-[#0f1f12] focus:outline-none focus:border-[#14531e]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#0f1f12]/75 mb-1.5">
                    Number of Guests (Optional)
                  </label>
                  <input
                    type="text"
                    value={contactForm.guests}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, guests: e.target.value })
                    }
                    placeholder="Approximate count"
                    className="w-full px-4 py-3 rounded-xl bg-[#f7f6f1] border border-[#0f1f12]/15 text-sm text-[#0f1f12] focus:outline-none focus:border-[#14531e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#0f1f12]/75 mb-1.5">
                  Message (Optional)
                </label>
                <textarea
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  placeholder="Share your preferred dates, room needs, wedding or family function plans, or any questions for our team..."
                  className="w-full px-4 py-3 rounded-xl bg-[#f7f6f1] border border-[#0f1f12]/15 text-sm text-[#0f1f12] focus:outline-none focus:border-[#14531e]"
                />
              </div>

              <p className="text-xs sm:text-sm text-[#0f1f12]/70 leading-relaxed">
                Your details will be used to respond to this enquiry. Submitting an enquiry is a request only, not a confirmed booking.
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <a
                    href={STUDIO_INFO.phonePrimaryUrl}
                    aria-label={`Call ${STUDIO_INFO.phoneNumber}`}
                    title={`Call ${STUDIO_INFO.phoneNumber}`}
                    className="w-10 h-10 rounded-full bg-[#0f1f12]/5 hover:bg-[#14531e] hover:text-white text-[#0f1f12]/80 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a
                    href={STUDIO_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp ${STUDIO_INFO.phoneNumber}`}
                    title={`WhatsApp ${STUDIO_INFO.phoneNumber}`}
                    className="w-10 h-10 rounded-full bg-[#0f1f12]/5 hover:bg-[#14531e] hover:text-white text-[#0f1f12]/80 flex items-center justify-center transition-colors group"
                  >
                    <WhatsAppMinimalIcon className="w-4 h-4 text-[#0f1f12]/75 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href={contactMailtoHref}
                    data-native-mailto="true"
                    aria-label={`Email ${STUDIO_INFO.email}`}
                    title={`Email ${STUDIO_INFO.email}`}
                    className="w-10 h-10 rounded-full bg-[#0f1f12]/5 hover:bg-[#14531e] hover:text-white text-[#0f1f12]/80 flex items-center justify-center transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={STUDIO_INFO.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="Facebook"
                    className="w-10 h-10 rounded-full bg-[#0f1f12]/5 hover:bg-[#14531e] hover:text-white text-[#0f1f12]/80 flex items-center justify-center transition-colors"
                  >
                    <FacebookMinimalIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={STUDIO_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Google Maps"
                    title="Google Maps"
                    className="w-10 h-10 rounded-full bg-[#0f1f12]/5 hover:bg-[#14531e] hover:text-white text-[#0f1f12]/80 flex items-center justify-center transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full bg-[#14531e] hover:bg-[#0c3a14] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                >
                  Send Enquiry
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="rounded-[20px] sm:rounded-[24px] bg-[#061208] text-[#f7f6f1] border border-[#f0b400]/25 p-5 sm:p-10 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span
                  className="text-xl text-[#f0b400] block leading-snug"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  Official Property Details
                </span>
                <h2
                  className="text-2xl sm:text-3xl text-[#f7f6f1] mt-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  The Green Heritage Resort and Banquet
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#f7f6f1]/80 leading-relaxed border-y border-white/15 py-4">
                <p>
                  <strong className="text-[#f0b400]">Address:</strong>{' '}
                  {STUDIO_INFO.address}
                </p>
                <p>
                  <strong className="text-[#f0b400]">Alternate Directory Listing:</strong>{' '}
                  Mauza Bakarpur, Dariyapur Kafen, Muzaffarpur 844127
                </p>
                <p>
                  <strong className="text-[#f0b400]">Map Coordinates:</strong>{' '}
                  26.06385, 85.3504979
                </p>
                <p>
                  <strong className="text-[#f0b400]">Phone / WhatsApp:</strong>{' '}
                  <a
                    href={STUDIO_INFO.phonePrimaryUrl}
                    className="text-[#f7f6f1] font-medium hover:text-[#f0b400] hover:underline transition-colors"
                  >
                    {STUDIO_INFO.phoneNumber}
                  </a>
                </p>
                <p>
                  <strong className="text-[#f0b400]">Email:</strong>{' '}
                  <a
                    href={STUDIO_INFO.emailUrl}
                    className="text-[#f7f6f1]/90 hover:text-[#f0b400] transition-colors"
                  >
                    {STUDIO_INFO.email}
                  </a>
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={STUDIO_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#14531e] hover:bg-[#1b6d28] border border-[#f0b400]/50 text-white text-xs uppercase tracking-wider font-medium transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#e52421]" />
                  <span>Open Google Maps</span>
                </a>
                <a
                  href={STUDIO_INFO.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-[#f7f6f1]/90 transition-colors"
                >
                  <span>Tripadvisor</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={STUDIO_INFO.justdial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-[#f7f6f1]/90 transition-colors"
                >
                  <span>Justdial</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] w-full rounded-[22px] overflow-hidden border border-[#f0b400]/35 ring-1 ring-[#f0b400]/20 bg-[#061208] shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
                {mapLoaded ? (
                  <>
                    <iframe
                      src={STUDIO_INFO.mapsEmbedUrl}
                      title="The Green Heritage Resort and Banquet Map"
                      className="w-full h-full border-0"
                      style={{ filter: 'saturate(1.07) contrast(1.03)' }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[22px] shadow-[inset_0_0_24px_rgba(6,18,8,0.16)] ring-1 ring-inset ring-[#14531e]/20"
                    />
                    <div className="pointer-events-none absolute top-3 left-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#061208]/88 backdrop-blur-md border border-[#f0b400]/35 shadow-lg">
                      <MapPin className="w-3.5 h-3.5 text-[#e52421] shrink-0" />
                      <span className="text-xs font-medium text-[#f7f6f1]">
                        The Green Heritage · Bakarpur
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-[#061208] flex items-center justify-center text-[#f7f6f1]">
                    <button
                      type="button"
                      onClick={() => setMapLoaded(true)}
                      className="px-5 py-2.5 rounded-full bg-[#14531e] hover:bg-[#1b6d28] border border-[#f0b400]/40 text-white text-xs uppercase tracking-wider font-medium cursor-pointer transition-colors"
                    >
                      Load Interactive Map
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
