'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Volume2,
  VolumeX,
  ArrowUpRight,
  MapPin,
  Play,
  Crown,
  Award,
  Users,
  Building2,
  BedDouble,
  Car,
  UtensilsCrossed,
  Tag,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';

const TwfRealisticGlobe = dynamic(
  () => import('./twf-realistic-globe').then((mod) => mod.TwfRealisticGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[440px] lg:max-w-[500px] aspect-square mx-auto flex items-center justify-center">
        <div className="w-[76%] h-[76%] rounded-full border border-[#f0b400]/20 bg-[#0b1f0f] animate-pulse" />
      </div>
    ),
  }
);
import {
  INSTAGRAM_REELS,
  GALLERY_PHOTOS,
  SIGNATURE_FRAMES,
  GRATITUDE_NOTES,
  STUDIO_INFO,
  VENUE_SPECIFICATIONS,
  GOOGLE_REVIEWS,
  CinemaFilm,
  InstagramReelItem,
  PhotoFrame,
} from '@/lib/masoom-data';
import { PAGE_ROUTES } from '@/lib/site-routes';
import { PageId } from './twf-sidebar';

interface TwfHomeSectionsProps {
  onPlayFilm: (film: CinemaFilm) => void;
  onSelectPhoto: (photo: PhotoFrame) => void;
  onNavigate: (page: PageId) => void;
  onOpenQuickEnquire?: (service?: string) => void;
}

interface HoverVideoBoxProps {
  videoSrc: string;
  posterUrl: string;
  couple: string;
  location: string;
  aspectClass?: string;
  onOpenModal: () => void;
}

function HoverVideoBox({
  videoSrc,
  posterUrl,
  couple,
  location,
  aspectClass = 'aspect-[9/16]',
  onOpenModal,
}: HoverVideoBoxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onOpenModal}
      className={`group relative shrink-0 ${aspectClass} rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#09190c] cursor-pointer border border-[#14531e]/20 shadow-lg transition-transform duration-300 ease-out hover:scale-[1.02] hover:z-30`}
    >
      {/* High-resolution instant poster image (Loads in milliseconds, zero bandwidth waste on 4G) */}
      <img
        src={posterUrl || '/og-preview-brand-v4.jpg'}
        alt={couple}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
        onError={(e) => {
          const t = e.currentTarget;
          if (t.src.endsWith('.webp')) {
            t.src = t.src.replace(/\.webp$/i, '.jpg');
          }
        }}
      />

      {/* Video element only mounts / plays when desktop user hovers — zero prebuffering on mobile load */}
      {isHovered && videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover bg-[#061208]"
        />
      )}

      {/* Floating Center Play Badge */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#14531e]/85 backdrop-blur-md border border-[#f0b400]/60 flex items-center justify-center text-[#f0b400] shadow-2xl group-hover:scale-115 transition-transform duration-300">
          <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 transition-opacity duration-300 opacity-90 z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,18,8,0) 0%, rgba(6,18,8,0.52) 45%, rgba(6,18,8,0.92) 100%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-end justify-between gap-2 z-20">
        <div className="min-w-0 text-left">
          <span
            className="text-base sm:text-lg text-[#f0b400] block leading-snug mb-0.5 break-words"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            {location}
          </span>
          <h3
            className="text-base sm:text-lg text-white font-normal leading-snug break-words drop-shadow"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {couple}
          </h3>
        </div>

        {isHovered && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            className="relative z-30 shrink-0 w-8 h-8 rounded-full bg-[#061208]/85 hover:bg-[#14531e] border border-[#f0b400]/40 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export function TwfHomeSections({
  onPlayFilm,
  onSelectPhoto,
  onNavigate,
  onOpenQuickEnquire,
}: TwfHomeSectionsProps) {
  // Exactly 3 Landscape reels (2 on mobile) and 4 Portrait reels (2 on mobile) on Landing Page
  const landscapeReels = useMemo(
    () => INSTAGRAM_REELS.filter((r) => !r.isPortrait).slice(0, 3),
    []
  );
  const portraitReels = useMemo(
    () => INSTAGRAM_REELS.filter((r) => r.isPortrait).slice(0, 4),
    []
  );

  const movingSectionRef = useRef<HTMLDivElement | null>(null);
  const movingRowOneRef = useRef<HTMLDivElement | null>(null);
  const movingRowTwoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let isSectionVisible = false;
    let cachedTop = 0;
    let cachedSpan = 1200;
    let targetProgress = 0;
    let currentProgress = 0;

    const sectionEl = movingSectionRef.current;
    const measureSection = () => {
      if (!sectionEl) return;
      const rect = sectionEl.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      cachedTop = rect.top + scrollTop;
      cachedSpan = Math.max(400, rect.height + window.innerHeight);
      targetProgress = Math.min(
        1,
        Math.max(0, (scrollTop + window.innerHeight - cachedTop) / cachedSpan)
      );
    };

    const applyTransforms = (progress: number) => {
      if (movingRowOneRef.current) {
        const x1 = -120 - progress * 760;
        movingRowOneRef.current.style.transform = `translate3d(${x1.toFixed(1)}px, 0, 0)`;
      }
      if (movingRowTwoRef.current) {
        const x2 = progress * 720 - 1180;
        movingRowTwoRef.current.style.transform = `translate3d(${x2.toFixed(1)}px, 0, 0)`;
      }
    };

    const tickLerp = () => {
      rafId = null;
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) < 0.0005) {
        currentProgress = targetProgress;
        applyTransforms(currentProgress);
        return;
      }
      currentProgress += diff * 0.16;
      applyTransforms(currentProgress);
      if (isSectionVisible) {
        rafId = window.requestAnimationFrame(tickLerp);
      }
    };

    const scheduleTick = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(tickLerp);
      }
    };

    const visibilityObserver = sectionEl
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              isSectionVisible = entry.isIntersecting;
              if (entry.isIntersecting) {
                measureSection();
                currentProgress = targetProgress;
                applyTransforms(currentProgress);
              }
            });
          },
          { rootMargin: '160px 0px' }
        )
      : null;

    if (sectionEl && visibilityObserver) {
      visibilityObserver.observe(sectionEl);
      measureSection();
      currentProgress = targetProgress;
      applyTransforms(currentProgress);
    }

    const resizeObserver =
      sectionEl && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => measureSection())
        : null;
    if (sectionEl && resizeObserver) {
      resizeObserver.observe(sectionEl);
    }

    const handleScroll = () => {
      if (!isSectionVisible) return;
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      targetProgress = Math.min(
        1,
        Math.max(0, (y + window.innerHeight - cachedTop) / cachedSpan)
      );
      scheduleTick();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      visibilityObserver?.disconnect();
      resizeObserver?.disconnect();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const [gratitudeIndex, setGratitudeIndex] = useState(0);

  const handleOpenReelAsFilm = (reel: InstagramReelItem) => {
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
      emotionalHook:
        'Call or WhatsApp +91 92340 52600 for availability and details.',
      category: 'royal',
    });
  };

  const rowOnePhotos = [
    ...GALLERY_PHOTOS.slice(0, 14),
    ...GALLERY_PHOTOS.slice(0, 6),
  ];
  const portraitSignaturePhotos = SIGNATURE_FRAMES.filter(
    (p) => p.aspect === 'portrait'
  );
  const rowTwoPhotos = [
    ...portraitSignaturePhotos,
    ...portraitSignaturePhotos,
  ];

  const currentNote = GRATITUDE_NOTES[gratitudeIndex];

  return (
    <div className="space-y-14 sm:space-y-20">
      {/* =====================================================================
          TOP TRUST & VENUE KEY SPECS BAR (Essential Details for Families & Guests)
         ===================================================================== */}
      <section
        aria-label="Verified Venue Facts and Guest Capacities"
        className="px-1 sm:px-2 pt-1"
      >
        <div className="rounded-[20px] sm:rounded-[24px] bg-[#fbfaf6] border border-[#f0b400]/30 p-4 sm:p-6 shadow-sm reveal-on-scroll">
          {/* Header Line - Inspired by Jaipur Royal Marriages */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#0f1f12]/10 pb-3 mb-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14531e] text-[#f0b400] text-xs font-semibold uppercase tracking-wider shadow-sm">
                <Crown className="w-3.5 h-3.5 text-[#f0b400]" />
                <span>Jaipur Royal Marriage Theme</span>
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#0f1f12]">
                Verified Venue Specifications · Gobarsahi–Sakri Road, Muzaffarpur
              </span>
            </div>

            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#0f1f12]/85 font-medium bg-[#14531e]/[0.06] px-3 py-1.5 rounded-full border border-[#14531e]/15">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-bold text-[#0f1f12]">4.6 / 5.0 Rating</span>
              <span className="text-[#0f1f12]/40">·</span>
              <span>550+ Reviews</span>
              <span className="text-[#0f1f12]/40">·</span>
              <span>350+ Weddings</span>
            </div>
          </div>

          {/* 6 Key Highlights Grid (With Soft Note for Packages, NO Numeric Price, NO Star Icons) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#14531e]/10 space-y-1 shadow-sm hover:border-[#f0b400]/40 transition-colors">
              <div className="flex items-center gap-1.5 text-[#14531e]">
                <Users className="w-4 h-4 text-[#9e6800]" />
                <span className="text-xs uppercase tracking-wider text-[#0f1f12]/80 font-bold">
                  Lawn Capacity
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0f1f12] leading-tight">
                1,500 – 2,000+
              </p>
              <p className="text-xs text-[#0f1f12]/75 leading-tight">
                Grand Receptions
              </p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#14531e]/10 space-y-1 shadow-sm hover:border-[#f0b400]/40 transition-colors">
              <div className="flex items-center gap-1.5 text-[#14531e]">
                <Building2 className="w-4 h-4 text-[#9e6800]" />
                <span className="text-xs uppercase tracking-wider text-[#0f1f12]/80 font-bold">
                  AC Banquet Hall
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0f1f12] leading-tight">
                350 – 500+ Seated
              </p>
              <p className="text-xs text-[#0f1f12]/75 leading-tight">
                700 Floating · AC Hall
              </p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#14531e]/10 space-y-1 shadow-sm hover:border-[#f0b400]/40 transition-colors">
              <div className="flex items-center gap-1.5 text-[#14531e]">
                <BedDouble className="w-4 h-4 text-[#9e6800]" />
                <span className="text-xs uppercase tracking-wider text-[#0f1f12]/80 font-bold">
                  Rooms &amp; Stay
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0f1f12] leading-tight">
                25+ Luxury Rooms
              </p>
              <p className="text-xs text-[#0f1f12]/75 leading-tight">
                Bridal Suite &amp; Cottages
              </p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#14531e]/10 space-y-1 shadow-sm hover:border-[#f0b400]/40 transition-colors">
              <div className="flex items-center gap-1.5 text-[#14531e]">
                <Crown className="w-4 h-4 text-[#9e6800]" />
                <span className="text-xs uppercase tracking-wider text-[#0f1f12]/80 font-bold">
                  Packages
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#14531e] leading-tight">
                Affordable For All
              </p>
              <p className="text-xs text-[#0f1f12]/75 leading-tight">
                All Wedding Types
              </p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#14531e]/10 space-y-1 shadow-sm hover:border-[#f0b400]/40 transition-colors">
              <div className="flex items-center gap-1.5 text-[#14531e]">
                <Car className="w-4 h-4 text-[#9e6800]" />
                <span className="text-xs uppercase tracking-wider text-[#0f1f12]/80 font-bold">
                  Guest Parking
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0f1f12] leading-tight">
                150+ Cars
              </p>
              <p className="text-xs text-[#0f1f12]/75 leading-tight">
                200+ Bikes · Valet
              </p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#14531e]/10 space-y-1 shadow-sm hover:border-[#f0b400]/40 transition-colors">
              <div className="flex items-center gap-1.5 text-[#14531e]">
                <UtensilsCrossed className="w-4 h-4 text-[#9e6800]" />
                <span className="text-xs uppercase tracking-wider text-[#0f1f12]/80 font-bold">
                  Catering
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0f1f12] leading-tight">
                Pure Veg &amp; Multi
              </p>
              <p className="text-xs text-[#0f1f12]/75 leading-tight">
                Live Counters
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 1: PROPERTY PREVIEW & GALLERY
         ===================================================================== */}
      <section className="pt-2 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 px-1 sm:px-2">
          <div>
            <span
              className="text-2xl sm:text-3xl md:text-4xl text-[#9e6800] block leading-snug mb-1 reveal-on-scroll"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              From Sunlit Haldi to the Last Vidaai · Muzaffarpur
            </span>
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#0f1f12] reveal-on-scroll interactive-heading reveal-delay-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              WEDDINGS{' '}
              <span className="italic font-script text-[#14531e] lowercase px-1 text-2xl sm:text-4xl">
                in
              </span>{' '}
              MOTION
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('films')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#14531e] hover:bg-[#0c3a14] border border-[#f0b400]/45 text-white text-xs sm:text-sm uppercase tracking-wider font-medium transition-colors shadow-sm cursor-pointer self-start sm:self-auto"
          >
            <span>All Wedding Films</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#f0b400]" />
          </button>
        </div>

        <div className="space-y-8 px-1 sm:px-2">
          {/* ROW 1: WIDESCREEN WEDDING FILMS (3 on sm+, 2 on smartphone) */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 reveal-on-scroll">
              <h3
                className="text-lg sm:text-2xl text-[#0f1f12] lowercase"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                widescreen wedding films
              </h3>
              <span
                className="text-lg sm:text-xl text-[#9e6800]"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                haldi, baraat &amp; varmala stories
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5">
              {landscapeReels.slice(0, 3).map((reel, idx) => (
                <div key={reel.id} className={idx === 2 ? 'hidden sm:block' : ''}>
                  <HoverVideoBox
                    videoSrc={reel.videoSrc}
                    posterUrl={reel.posterUrl}
                    couple={reel.couple}
                    location={reel.location}
                    aspectClass="aspect-video"
                    onOpenModal={() => handleOpenReelAsFilm(reel)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ROW 2: VERTICAL WEDDING REELS (4 on sm+, 2 on smartphone) */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 reveal-on-scroll">
              <h3
                className="text-lg sm:text-2xl text-[#0f1f12] lowercase"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                vertical wedding reels
              </h3>
              <span
                className="text-lg sm:text-xl text-[#9e6800]"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                ceremonies &amp; rituals up close
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5">
              {portraitReels.slice(0, 4).map((reel, idx) => (
                <div key={reel.id} className={idx >= 2 ? 'hidden sm:block' : ''}>
                  <HoverVideoBox
                    videoSrc={reel.videoSrc}
                    posterUrl={reel.posterUrl}
                    couple={reel.couple}
                    location={reel.location}
                    aspectClass="aspect-[9/16]"
                    onOpenModal={() => handleOpenReelAsFilm(reel)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CTA to explore all wedding films */}
          <div className="pt-2 pb-1 flex justify-center">
            <button
              type="button"
              onClick={() => onNavigate('films')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#14531e] hover:bg-[#0c3a14] border border-[#f0b400]/45 text-white text-xs sm:text-sm uppercase tracking-[0.16em] font-medium transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              <span>Explore All 22+ Wedding Films &amp; Highlights</span>
              <ArrowRight className="w-4 h-4 text-[#f0b400]" />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: SCROLL-DRIVEN INCLINED GALLERY SHOWCASE (LIGHT THEME)
         ===================================================================== */}
      <section
        ref={movingSectionRef}
        className="rounded-[22px] sm:rounded-[28px] bg-white border border-[#e8e1ce] shadow-[0_14px_40px_rgba(15,31,18,0.06)] pt-6 sm:pt-8 pb-4 sm:pb-6 space-y-3 sm:space-y-4 overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-4 sm:px-8">
          <div>
            <span
              className="text-2xl sm:text-3xl text-[#9e6800] block leading-snug reveal-on-scroll"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              a look around the property
            </span>
            <h2
              className="text-2xl sm:text-4xl text-black lowercase tracking-tight mt-0.5 reveal-on-scroll interactive-heading reveal-delay-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              resort &amp; event gallery
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-black/60 hidden sm:inline">
              Scroll page to glide along the inclined gallery
            </span>
            <button
              type="button"
              onClick={() => onNavigate('films')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fdf7e7] hover:bg-[#f0b400] border border-[#e3b94b] text-xs font-medium text-black transition-colors cursor-pointer"
            >
              <span>View All Photos</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Flush full-sheet stage: pure WHITE moving photos stage framed by GOLDEN moving strips with BLACK text */}
        <div className="relative overflow-hidden py-7 sm:py-10 bg-white">
          {/* Native 1:1-crisp rotated band (-3.2deg) spanning beyond section edges so there are zero chopped side gaps */}
          <div
            className="relative w-[114%] -ml-[7%] -rotate-[3.2deg] origin-center bg-white text-black border-y border-[#d89a00]/75 shadow-[0_14px_38px_rgba(15,31,18,0.07)] will-change-transform overflow-hidden"
            style={{ backgroundColor: '#ffffff' }}
          >
            {/* UPPER GOLDEN INCLINED MOVING WORDS STRIP (BLACK TEXT) */}
            <div
              className="relative z-10 border-b border-[#b57f00]/55 py-2.5 sm:py-3 overflow-hidden select-none shadow-sm"
              style={{
                background:
                  'linear-gradient(90deg, #e0a300 0%, #f0b400 28%, #f8cf46 50%, #f0b400 72%, #e0a300 100%)',
              }}
            >
              <div
                className="animate-marquee-left items-center gap-8 text-[11px] sm:text-xs uppercase tracking-[0.28em] text-black font-semibold whitespace-nowrap"
                style={{ color: '#000000' }}
              >
                {[0, 1].map((dupIdx) => (
                  <span
                    key={`upper-strip-${dupIdx}`}
                    aria-hidden={dupIdx === 1}
                    className="inline-flex items-center gap-6 shrink-0 pr-6"
                  >
                    <span>The Green Heritage Resort &amp; Banquet</span>
                    <span className="text-black/75">✦</span>
                    <span>Bakarpur, Muzaffarpur</span>
                    <span className="text-black/75">✦</span>
                    <span>Royal Wedding Lawns</span>
                    <span className="text-black/75">✦</span>
                    <span>Chandelier Banquet Hall</span>
                    <span className="text-black/75">✦</span>
                    <span>Poolside Haldi &amp; Mehendi</span>
                    <span className="text-black/75">✦</span>
                    <span>Bridal &amp; Family Suites</span>
                  </span>
                ))}
              </div>
            </div>

            {/* PURE WHITE GALLERY BAND BETWEEN BOTH GOLDEN STRIPS — SCROLL-INTERACTIVE */}
            <div
              className="relative z-10 bg-white space-y-4 sm:space-y-6 py-6 sm:py-8"
              style={{ backgroundColor: '#ffffff' }}
            >
              {/* Soft pure-white edge fades strictly inside the white photo stage (keeps golden strips vibrant edge-to-edge) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-20 lg:w-24 z-20 bg-gradient-to-r from-white via-white/80 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-20 lg:w-24 z-20 bg-gradient-to-l from-white via-white/80 to-transparent"
              />

              {/* Row 1: Landscape Property & Wedding Frames (Glides Left on Scroll) */}
              <div className="relative w-full overflow-hidden py-1">
                <div
                  ref={movingRowOneRef}
                  className="flex items-center gap-3.5 sm:gap-5 px-4 w-max will-change-transform"
                  style={{
                    transform: 'translate3d(-120px, 0, 0)',
                  }}
                >
                  {rowOnePhotos.map((photo, idx) => (
                    <div
                      key={`m1-${photo.id}-${idx}`}
                      onClick={() => onSelectPhoto(photo)}
                      className="group relative shrink-0 w-[225px] sm:w-[335px] lg:w-[390px] rounded-[14px] sm:rounded-[18px] border border-[#e6e0cf] bg-white p-1.5 sm:p-2 cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1 hover:border-[#f0b400] shadow-[0_8px_24px_rgba(15,31,18,0.08)]"
                    >
                      <div className="aspect-[3/2] w-full overflow-hidden rounded-[10px] sm:rounded-[12px] bg-[#f7f6f1]">
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          width={390}
                          height={260}
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src.endsWith('.webp')) {
                              target.src = target.src.replace(/\.webp$/i, '.jpg');
                            }
                          }}
                        />
                      </div>
                      <div className="pt-2 px-1.5 pb-0.5 bg-white">
                        <span
                          className="text-base sm:text-lg text-[#9e6800] block leading-none"
                          style={{ fontFamily: 'var(--font-script)' }}
                        >
                          {photo.couple}
                        </span>
                        <span className="text-xs sm:text-sm text-black font-medium leading-snug block mt-1 truncate">
                          {photo.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Portrait Celebrations & Architecture Frames (Glides Right on Scroll) */}
              <div className="relative w-full overflow-hidden py-1">
                <div
                  ref={movingRowTwoRef}
                  className="flex items-center gap-4 sm:gap-5 px-4 w-max will-change-transform"
                  style={{
                    transform: 'translate3d(-1180px, 0, 0)',
                  }}
                >
                  {rowTwoPhotos.map((photo, idx) => (
                    <div
                      key={`m2-${photo.id}-${idx}`}
                      onClick={() => onSelectPhoto(photo)}
                      className="group relative shrink-0 w-[150px] sm:w-[205px] lg:w-[230px] rounded-[14px] sm:rounded-[18px] border border-[#e6e0cf] bg-white p-1.5 sm:p-2 cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1 hover:border-[#f0b400] shadow-[0_8px_24px_rgba(15,31,18,0.08)]"
                    >
                      <div className="aspect-[2/3] w-full overflow-hidden rounded-[10px] sm:rounded-[12px] bg-[#f7f6f1]">
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          width={230}
                          height={345}
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src.endsWith('.webp')) {
                              target.src = target.src.replace(/\.webp$/i, '.jpg');
                            }
                          }}
                        />
                      </div>
                      <div className="pt-2 px-1.5 pb-0.5 bg-white">
                        <span
                          className="text-base sm:text-lg text-[#9e6800] block leading-none"
                          style={{ fontFamily: 'var(--font-script)' }}
                        >
                          {photo.couple}
                        </span>
                        <span className="text-xs sm:text-sm text-black font-medium leading-snug block mt-1 truncate">
                          {photo.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* LOWER GOLDEN INCLINED MOVING WORDS STRIP (BLACK TEXT) */}
            <div
              className="relative z-10 border-t border-[#b57f00]/55 py-2.5 sm:py-3 overflow-hidden select-none shadow-sm"
              style={{
                background:
                  'linear-gradient(90deg, #e0a300 0%, #f0b400 28%, #f8cf46 50%, #f0b400 72%, #e0a300 100%)',
              }}
            >
              <div
                className="animate-marquee-right items-center gap-8 text-[11px] sm:text-xs uppercase tracking-[0.28em] text-black font-semibold whitespace-nowrap"
                style={{ color: '#000000' }}
              >
                {[0, 1].map((dupIdx) => (
                  <span
                    key={`lower-strip-${dupIdx}`}
                    aria-hidden={dupIdx === 1}
                    className="inline-flex items-center gap-6 shrink-0 pr-6"
                  >
                    <span>Haldi Mornings</span>
                    <span className="text-black/75">✦</span>
                    <span>Mehendi Courtyards</span>
                    <span className="text-black/75">✦</span>
                    <span>Sangeet Nights</span>
                    <span className="text-black/75">✦</span>
                    <span>Grand Baraat Welcomes</span>
                    <span className="text-black/75">✦</span>
                    <span>Mandap &amp; Midnight Pheras</span>
                    <span className="text-black/75">✦</span>
                    <span>Starlit Wedding Feasts · +91 92340 52600</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          VENUE SPECIFICATIONS & CAPACITIES SHOWCASE (Lawn, Hall, Rooms, Packages, Catering, Parking)
         ===================================================================== */}
      <section
        aria-label="Venue Capacities and Property Specifications"
        className="px-1 sm:px-2 space-y-6 sm:space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span
              className="text-2xl sm:text-3xl md:text-4xl text-[#9e6800] block leading-snug mb-1 reveal-on-scroll"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Every Space Crafted for Auspicious Moments
            </span>
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#0f1f12] reveal-on-scroll interactive-heading reveal-delay-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ROYAL VENUES &amp; CAPACITIES
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#0f1f12]/75 max-w-md font-light leading-relaxed reveal-on-scroll reveal-delay-2">
            Verified property specifications: 2,000+ guest lawns, crystal AC banquet, 25+ rooms, transparent packages, pure-veg kitchens, and secured parking.
          </p>
        </div>

        {/* 6-Card Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {VENUE_SPECIFICATIONS.map((spec) => (
            <div
              key={spec.id}
              className="rounded-[22px] sm:rounded-[24px] bg-white border border-[#14531e]/15 overflow-hidden shadow-md hover:shadow-xl hover:border-[#f0b400]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Clean Photo Frame (No floating badges, cylinders or text overlays) */}
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

              {/* Card Body — Concise Points Only */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <h3
                      className="text-xl sm:text-2xl text-[#0f1f12] font-normal leading-snug"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {spec.title}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-[#14531e] leading-snug mt-1">
                      {spec.capacityHeadline}
                    </p>
                  </div>

                  {/* Bullet Highlights Only (Points in the boxes) */}
                  <ul className="pt-2.5 space-y-2 border-t border-[#0f1f12]/10">
                    {spec.keyFeatures.map((feat, idx) => (
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

                {/* Enquire CTA */}
                <div className="pt-3 border-t border-[#0f1f12]/10 flex items-center justify-between gap-2">
                  <a
                    href={`https://wa.me/919234052600?text=${encodeURIComponent(
                      `Hello The Green Heritage Resort, I am inquiring about the ${spec.title} (${spec.statBadge}) for our wedding.`
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

      {/* =====================================================================
          SECTION 3: MINIMAL MAP SECTION (Location + 3D Globe -> Live Google Map)
         ===================================================================== */}
      <section className="px-1 sm:px-2">
        <div className="relative rounded-[22px] sm:rounded-[28px] bg-[#061208] text-[#f7f6f1] border border-[#f0b400]/25 shadow-2xl p-4 sm:p-10 lg:p-12 overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column: Minimal Essential Location Info & Primary Actions */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span
                  className="text-3xl sm:text-4xl text-[#f0b400] block leading-snug reveal-on-scroll"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  Find Us
                </span>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl text-[#f7f6f1] lowercase font-normal mt-1 reveal-on-scroll interactive-heading reveal-delay-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  the green heritage resort
                </h2>
              </div>

              <div className="space-y-2.5 text-base sm:text-base text-[#f7f6f1]/85 font-light border-l-2 border-[#f0b400]/50 pl-4">
                <p>Bakarpur, Gobarsahi–Sakri Road, Muzaffarpur, Bihar 844127</p>
                <p>
                  <a
                    href={STUDIO_INFO.phonePrimaryUrl}
                    className="text-[#f7f6f1] hover:text-[#f0b400] transition-colors font-medium"
                  >
                    {STUDIO_INFO.phoneNumber}
                  </a>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={STUDIO_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 rounded-full bg-[#14531e] hover:bg-[#1b6d28] border border-[#f0b400]/50 active:scale-95 text-white text-xs sm:text-sm uppercase tracking-[0.14em] font-medium inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#e52421]" />
                  <span>Get Directions</span>
                </a>

                {onOpenQuickEnquire && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenQuickEnquire('Stay or Event Enquiry')
                    }
                    className="py-2.5 px-5 rounded-full bg-white/10 hover:bg-[#f0b400] hover:text-[#061208] border border-white/20 text-white text-xs sm:text-sm uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer"
                  >
                    Enquire Now
                  </button>
                )}
              </div>

              {/* Google Review & Rating Card with Scannable QR Code (No Star Icons) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.05] border border-[#f0b400]/30 backdrop-blur-sm space-y-3 mt-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#14531e] text-[#f0b400] text-xs sm:text-sm font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#f0b400]" />
                      <span>Google Verified</span>
                    </span>
                    <span className="font-bold text-[#f7f6f1] text-sm sm:text-base">4.6 / 5.0 Rating</span>
                  </div>
                  <span className="text-sm sm:text-xs text-[#f0b400] font-medium">
                    550+ Reviews
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#f7f6f1]/85 leading-relaxed font-light">
                  Trusted by <strong>350+ families</strong> across Bihar for royal weddings &amp; celebrations inspired by Jaipur palace hospitality. Scan or tap below to read guest stories or review your stay.
                </p>

                <div className="flex items-center gap-3.5 pt-1">
                  <a
                    href={STUDIO_INFO.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 block rounded-xl overflow-hidden bg-white p-1.5 shadow-md border border-[#f0b400]/40 group"
                    title="Scan or click to review The Green Heritage Resort on Google Maps"
                  >
                    <img
                      src="/google-review-qr.webp"
                      alt="Scan QR code to review The Green Heritage Resort on Google Maps"
                      width={72}
                      height={72}
                      className="w-16 h-16 sm:w-18 sm:h-18 object-contain rounded-lg group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        const t = e.currentTarget;
                        if (t.src.endsWith('.webp')) t.src = '/google-review-qr.png';
                      }}
                    />
                  </a>

                  <div className="space-y-1 min-w-0">
                    <p className="text-sm sm:text-xs font-semibold text-white">
                      Scan to Review on Google Maps
                    </p>
                    <p className="text-xs sm:text-sm text-[#f7f6f1]/70 leading-tight font-light">
                      Point your phone camera at the QR code, or tap the button below.
                    </p>
                    <a
                      href={STUDIO_INFO.googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm sm:text-xs font-semibold text-[#f0b400] hover:text-white transition-colors pt-0.5"
                    >
                      <span>Write a Review on Google</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D Globe -> Smooth Live Google Map */}
            <div className="lg:col-span-7 w-full min-w-0 flex items-center justify-center">
              <TwfRealisticGlobe onOpenQuickEnquire={onOpenQuickEnquire} />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          TOP GOOGLE MAPS REVIEWS (Real Verified Guest Stories — No Star Icons)
         ===================================================================== */}
      <section
        aria-label="Top Google Maps Reviews and Guest Testimonials"
        className="px-1 sm:px-2 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span
              className="text-2xl sm:text-3xl md:text-4xl text-[#9e6800] block leading-snug mb-1 reveal-on-scroll"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Words from Families Who Celebrated With Us
            </span>
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#0f1f12] reveal-on-scroll interactive-heading reveal-delay-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              VERIFIED GOOGLE REVIEWS
            </h2>
          </div>

          <a
            href={STUDIO_INFO.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#14531e] hover:bg-[#0c3a14] border border-[#f0b400]/40 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-sm whitespace-nowrap self-start sm:self-auto"
          >
            <span>Write a Review</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#f0b400]" />
          </a>
        </div>

        {/* 4 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {GOOGLE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-5 sm:p-6 rounded-[20px] sm:rounded-[22px] bg-white border border-[#14531e]/15 shadow-sm hover:shadow-md hover:border-[#f0b400]/50 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-[#0f1f12]/10 pb-2.5">
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#14531e]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{rev.badge}</span>
                  </span>
                  <span className="text-xs sm:text-sm text-[#0f1f12]/55 font-medium">
                    {rev.relativeTime}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#0f1f12]/80 leading-relaxed font-light">
                  &ldquo;{rev.reviewText}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#0f1f12]/10 space-y-0.5">
                <h4
                  className="text-xl sm:text-2xl text-[#14531e]"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  {rev.author}
                </h4>
                <p className="text-xs sm:text-sm text-[#0f1f12]/60 truncate">
                  {rev.event} · {rev.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: PLANNING & ENQUIRY GUIDANCE SLIDER (No fake reviews)
         ===================================================================== */}
      <section className="px-1 sm:px-2">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <span
            className="text-3xl sm:text-4xl text-[#9e6800] block mb-1 leading-snug"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            From the Family&apos;s Heart to Ours
          </span>
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#0f1f12] lowercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            planning a muzaffarpur wedding
          </h2>
        </div>

        <div className="rounded-[20px] sm:rounded-[24px] bg-white/95 border border-[#14531e]/15 p-5 sm:p-10 shadow-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Portrait Image Frame */}
            <div className="lg:col-span-4">
              <div className="aspect-[4/5] max-w-[280px] mx-auto lg:max-w-none rounded-2xl overflow-hidden border border-[#14531e]/15 shadow-lg bg-[#09190c]">
                <img
                  key={currentNote.id}
                  src={currentNote.imageUrl}
                  alt={currentNote.author}
                  decoding="async"
                  className="w-full h-full object-cover object-[50%_18%] transition-all duration-700 ease-out animate-in fade-in"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.endsWith('.webp')) {
                      target.src = target.src.replace(/\.webp$/i, '.jpg');
                    }
                  }}
                />
              </div>
            </div>

            {/* Guidance Note Content */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              <p
                className="text-2xl sm:text-3xl lg:text-4xl text-[#0f1f12] leading-relaxed font-normal"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                &ldquo;{currentNote.quote}&rdquo;
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#14531e]/15">
                <div>
                  <h4
                    className="text-2xl sm:text-3xl text-[#14531e]"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    {currentNote.author}
                  </h4>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.16em] text-[#0f1f12]/55 mt-0.5">
                    {currentNote.role} · {currentNote.location}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setGratitudeIndex(
                        (prev) =>
                          (prev - 1 + GRATITUDE_NOTES.length) %
                          GRATITUDE_NOTES.length
                      )
                    }
                    aria-label="Previous note"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#14531e]/8 hover:bg-[#14531e] hover:text-white text-[#14531e] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setGratitudeIndex(
                        (prev) => (prev + 1) % GRATITUDE_NOTES.length
                      )
                    }
                    aria-label="Next note"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#14531e]/8 hover:bg-[#14531e] hover:text-white text-[#14531e] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          DARK FEATURE BOX: WHAT YOU CAN ENQUIRE ABOUT
         ===================================================================== */}
      <section className="px-1 sm:px-2">
        <div className="rounded-[22px] sm:rounded-[28px] bg-gradient-to-br from-[#0e2613] via-[#09190c] to-[#040d06] text-white p-6 sm:p-10 lg:p-14 border border-[#f0b400]/20 shadow-2xl space-y-8 sm:space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span
              className="text-2xl sm:text-3xl md:text-4xl text-[#f0b400] block reveal-on-scroll"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Every Ritual, Held Under One Sky
            </span>
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-normal text-white lowercase tracking-tight reveal-on-scroll interactive-heading reveal-delay-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              your wedding chapter at green heritage
            </h2>
            <p className="text-xs sm:text-sm text-white/75 max-w-lg mx-auto leading-relaxed font-light reveal-on-scroll reveal-delay-2">
              Celebrate all your wedding ceremonies seamlessly at one grand destination in Bakarpur, Muzaffarpur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'Haldi & Mehendi Lawns',
                scriptSub: 'sunlit morning joy',
                story:
                  'Poolside lawns, sunlit marigolds, and comfortable shaded seating for all family elders.',
                tag: 'Day Rituals',
              },
              {
                title: 'Sangeet & Varmala Stage',
                scriptSub: 'music, pyros & applause',
                story:
                  'Illuminated palace facade, spacious performance stage, and memorable starlit varmala.',
                tag: 'Evening Celebrations',
              },
              {
                title: 'Bridal Suites & Rooms',
                scriptSub: 'rest between rituals',
                story:
                  '25+ air-conditioned luxury rooms and private bridal dressing suites steps from the venue.',
                tag: 'Guest Hospitality',
              },
              {
                title: 'Walk the Venue Together',
                scriptSub: 'bakarpur, muzaffarpur',
                story:
                  'Visit our lawns along Gobarsahi–Sakri Road with family. Call +91 92340 52600 to schedule.',
                tag: 'Site Walkthrough',
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#f0b400]/55 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span
                    className="text-lg sm:text-xl text-[#f0b400] block leading-none"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    {card.scriptSub}
                  </span>
                  <h3
                    className="text-xl sm:text-2xl text-white font-normal"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                    {card.story}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#f0b400]">
                  <span
                    className="text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    {card.tag}
                  </span>
                  <Compass className="w-4 h-4 text-[#f0b400]" />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-[#040d06]/70 border border-[#f0b400]/25 text-center max-w-2xl mx-auto space-y-1.5">
            <span
              className="text-xl sm:text-2xl text-[#f0b400] block leading-tight"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              &ldquo;An online enquiry is a request only. Bookings are confirmed directly with our team.&rdquo;
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-white/70 block font-light">
              The Green Heritage Resort &amp; Banquet · +91 92340 52600
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: HOW TO PLAN YOUR VISIT (3-COLUMN CARDS)
         ===================================================================== */}
      <section className="px-1 sm:px-2 pb-2">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span
            className="text-3xl sm:text-4xl md:text-4xl text-[#9e6800] block mb-1 leading-snug reveal-on-scroll"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Taking the First Step Together
          </span>
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#0f1f12] lowercase reveal-on-scroll interactive-heading reveal-delay-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            begin your wedding conversation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {[
            {
              tag: 'Bridal & Family Stay',
              title: 'rooms for your loved ones',
              service: 'Wedding Guest Stay',
              image: '/TGHPhotos/Landscape/DSC_4991.webp',
              desc: 'Keep parents, cousins and close friends close by through every function. Check room categories, bridal suite comfort and block availability with our desk.',
              cta: 'Check Wedding Rooms',
            },
            {
              tag: 'Mandap & Lawns',
              title: 'hold your wedding date',
              service: 'Wedding & Reception',
              image: '/TGHPhotos/Landscape/DSC_5387.webp',
              desc: 'Share your muhurat dates and guest count so we can guide you through lawn and banquet hall setups, decor rules and catering arrangements.',
              cta: 'Discuss Wedding Dates',
            },
            {
              tag: 'Bakarpur, Muzaffarpur',
              title: 'visit the lawns together',
              service: 'Venue Tour',
              image: '/TGHPhotos/Landscape/DSC_4664.webp',
              desc: 'Bring your family along Gobarsahi–Sakri Road to picture the pheras, entry aisle and dining spaces in person. Call +91 92340 52600 to plan your visit.',
              cta: 'Arrange a Venue Tour',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-[20px] sm:rounded-[22px] bg-white/95 border border-[#14531e]/15 overflow-hidden shadow-md flex flex-col justify-between group hover:border-[#f0b400]/60 transition-colors"
            >
              <div className="aspect-[16/11] overflow-hidden bg-[#061208]">
                <img
                  src={item.image}
                  alt={item.title}
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.endsWith('.webp')) {
                      target.src = target.src.replace(/\.webp$/i, '.jpg');
                    }
                  }}
                />
              </div>
              <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span
                    className="text-xl sm:text-2xl text-[#9e6800] block leading-snug"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    {item.tag}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl text-[#0f1f12] lowercase mt-0.5"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#0f1f12]/75 leading-relaxed mt-1.5">
                    {item.desc}
                  </p>
                </div>

                {onOpenQuickEnquire && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onOpenQuickEnquire(item.service)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-[0.16em] font-semibold text-[#14531e] hover:text-[#9e6800] transition-colors cursor-pointer"
                    >
                      <span>{item.cta}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
