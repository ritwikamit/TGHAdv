'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Volume2,
  VolumeX,
  ArrowUpRight,
  MapPin,
} from 'lucide-react';

const TwfRealisticGlobe = dynamic(
  () => import('./twf-realistic-globe').then((mod) => mod.TwfRealisticGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-[340px] xs:max-w-[370px] sm:max-w-[440px] lg:max-w-[500px] aspect-square mx-auto flex items-center justify-center">
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
  FAQ_ITEMS,
  STUDIO_INFO,
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
            // Brief settle delay prevents decoding bursts during fast touch/wheel scroll flicks
            settleTimer = window.setTimeout(() => {
              settleTimer = null;
              tryPlay();
            }, 95);
          } else {
            vid.pause();
          }
        });
      },
      { rootMargin: '40px 0px', threshold: 0.35 }
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
      className={`group relative shrink-0 ${aspectClass} rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#09190c] cursor-pointer border border-[#14531e]/15 shadow-lg transition-transform duration-300 ease-out hover:scale-[1.02] hover:z-30`}
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
            'linear-gradient(180deg, rgba(6,18,8,0) 0%, rgba(6,18,8,0.52) 45%, rgba(6,18,8,0.92) 100%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-end justify-between gap-2 z-20">
        <div className="min-w-0 text-left">
          <span
            className="text-sm sm:text-base text-[#f0b400] block leading-snug mb-0.5 break-words"
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

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="relative z-30 shrink-0 w-8 h-8 rounded-full bg-[#061208]/75 hover:bg-[#14531e] border border-[#f0b400]/35 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          )}
        </button>
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
  const [trailerTab, setTrailerTab] = useState<
    'videos' | 'gallery' | 'signature'
  >('videos');
  const landscapeRowRef = useRef<HTMLDivElement | null>(null);
  const portraitRowRef = useRef<HTMLDivElement | null>(null);
  const photoRowRef = useRef<HTMLDivElement | null>(null);

  const landscapeReels = INSTAGRAM_REELS.filter((r) => !r.isPortrait);
  const portraitReels = INSTAGRAM_REELS.filter((r) => r.isPortrait);

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

  const scrollRow = (
    ref: React.RefObject<HTMLDivElement | null>,
    dir: 'left' | 'right'
  ) => {
    if (!ref.current) return;
    const offset = dir === 'left' ? -440 : 440;
    ref.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

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
          SECTION 1: PROPERTY PREVIEW & GALLERY
         ===================================================================== */}
      <section className="pt-2 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1 sm:px-2">
          <div>
            <span
              className="text-xl sm:text-2xl text-[#9e6800] block leading-none mb-1"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              From Sunlit Haldi to the Last Vidaai · Muzaffarpur
            </span>
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#0f1f12]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              WEDDINGS{' '}
              <span className="italic font-script text-[#14531e] lowercase px-1">
                in
              </span>{' '}
              MOTION
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2.5">
            <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-2xl sm:rounded-full bg-[#14531e]/[0.07] border border-[#14531e]/15">
              {[
                { id: 'videos', label: 'Wedding Films' },
                { id: 'gallery', label: 'Wedding Stills' },
                { id: 'signature', label: 'Mandap & Lawns' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setTrailerTab(
                      tab.id as 'videos' | 'gallery' | 'signature'
                    )
                  }
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs transition-all cursor-pointer ${
                    trailerTab === tab.id
                      ? 'bg-[#14531e] text-white font-medium shadow-sm'
                      : 'text-[#0f1f12]/70 hover:text-[#14531e]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('films')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#14531e] hover:bg-[#0c3a14] border border-[#f0b400]/45 text-white text-[11px] uppercase tracking-wider font-medium transition-colors shadow-sm cursor-pointer"
            >
              <span>All Wedding Films</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#f0b400]" />
            </button>
          </div>
        </div>

        {trailerTab === 'videos' ? (
          <div className="space-y-8">
            {/* ROW 1: LANDSCAPE CLIPS */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2 px-2 sm:px-3">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 min-w-0">
                  <h3
                    className="text-lg sm:text-2xl text-[#0f1f12] lowercase"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    widescreen wedding films
                  </h3>
                  <span
                    className="text-sm sm:text-lg text-[#9e6800]"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    haldi, baraat &amp; varmala stories
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => scrollRow(landscapeRowRef, 'left')}
                    aria-label="Scroll landscape clips left"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#14531e] hover:text-white border border-[#14531e]/15 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollRow(landscapeRowRef, 'right')}
                    aria-label="Scroll landscape clips right"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#14531e] hover:text-white border border-[#14531e]/15 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={landscapeRowRef}
                className="flex items-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-3 px-2 sm:px-3 scroll-smooth snap-x snap-proximity overscroll-x-contain"
              >
                {landscapeReels.map((reel) => (
                  <HoverVideoBox
                    key={reel.id}
                    videoSrc={reel.videoSrc}
                    posterUrl={reel.posterUrl}
                    couple={reel.couple}
                    location={reel.location}
                    aspectClass="w-[78vw] max-w-[300px] sm:w-[370px] lg:w-[420px] aspect-video snap-start"
                    onOpenModal={() => handleOpenReelAsFilm(reel)}
                  />
                ))}
              </div>
            </div>

            {/* ROW 2: PORTRAIT CLIPS */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-2 sm:px-3">
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <h3
                    className="text-xl sm:text-2xl text-[#0f1f12] lowercase"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    vertical wedding reels
                  </h3>
                  <span
                    className="text-base sm:text-lg text-[#9e6800]"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    ceremonies &amp; rituals up close
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => scrollRow(portraitRowRef, 'left')}
                    aria-label="Scroll portrait clips left"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#14531e] hover:text-white border border-[#14531e]/15 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollRow(portraitRowRef, 'right')}
                    aria-label="Scroll portrait clips right"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#14531e] hover:text-white border border-[#14531e]/15 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={portraitRowRef}
                className="flex items-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-3 px-2 sm:px-3 scroll-smooth snap-x snap-proximity overscroll-x-contain"
              >
                {portraitReels.map((reel) => (
                  <HoverVideoBox
                    key={reel.id}
                    videoSrc={reel.videoSrc}
                    posterUrl={reel.posterUrl}
                    couple={reel.couple}
                    location={reel.location}
                    aspectClass="w-[54vw] max-w-[205px] sm:w-[230px] lg:w-[250px] aspect-[9/16] snap-start"
                    onOpenModal={() => handleOpenReelAsFilm(reel)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* PHOTO TABS */
          <div className="space-y-2.5">
            <div className="flex items-center justify-end gap-1.5 px-2 sm:px-3">
              <button
                type="button"
                onClick={() => scrollRow(photoRowRef, 'left')}
                aria-label="Scroll photos left"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#14531e] hover:text-white border border-[#14531e]/15 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollRow(photoRowRef, 'right')}
                aria-label="Scroll photos right"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#14531e] hover:text-white border border-[#14531e]/15 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div
              ref={photoRowRef}
              className="flex items-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-3 px-2 sm:px-3 scroll-smooth snap-x snap-proximity overscroll-x-contain"
            >
              {(trailerTab === 'gallery'
                ? GALLERY_PHOTOS.slice(0, 18)
                : SIGNATURE_FRAMES
              ).map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => onSelectPhoto(photo)}
                  className={`group relative shrink-0 rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#09190c] snap-start cursor-pointer shadow-lg border border-[#14531e]/15 transition-all duration-500 hover:scale-[1.02] ${
                    photo.aspect === 'landscape'
                      ? 'w-[78vw] max-w-[300px] sm:w-[360px] lg:w-[400px] aspect-[3/2]'
                      : 'w-[54vw] max-w-[205px] sm:w-[235px] lg:w-[255px] aspect-[2/3]'
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
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(6,18,8,0) 0%, rgba(6,18,8,0.88) 100%)',
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                    <span
                      className="text-sm text-[#f0b400] block leading-snug"
                      style={{ fontFamily: 'var(--font-script)' }}
                    >
                      {photo.couple}
                    </span>
                    <span className="text-xs text-white/95 font-medium leading-snug block mt-0.5">
                      {photo.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
              className="text-base sm:text-lg text-[#9e6800] block leading-none"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              a look around the property
            </span>
            <h2
              className="text-2xl sm:text-4xl text-black lowercase tracking-tight mt-0.5"
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
                          className="text-xs sm:text-sm text-[#9e6800] block leading-none"
                          style={{ fontFamily: 'var(--font-script)' }}
                        >
                          {photo.couple}
                        </span>
                        <span className="text-[11px] sm:text-xs text-black font-medium leading-snug block mt-1 truncate">
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
                          className="text-xs sm:text-sm text-[#9e6800] block leading-none"
                          style={{ fontFamily: 'var(--font-script)' }}
                        >
                          {photo.couple}
                        </span>
                        <span className="text-[11px] sm:text-xs text-black font-medium leading-snug block mt-1 truncate">
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
          SECTION 3: MINIMAL MAP SECTION (Location + 3D Globe -> Live Google Map)
         ===================================================================== */}
      <section className="px-1 sm:px-2">
        <div className="relative rounded-[22px] sm:rounded-[28px] bg-[#061208] text-[#f7f6f1] border border-[#f0b400]/25 shadow-2xl p-4 sm:p-10 lg:p-12 overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column: Minimal Essential Location Info & Primary Actions */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span
                  className="text-xl sm:text-2xl text-[#f0b400] block leading-snug"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  Find Us
                </span>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl text-[#f7f6f1] lowercase font-normal mt-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  the green heritage resort
                </h2>
              </div>

              <div className="space-y-2.5 text-sm text-[#f7f6f1]/80 font-light border-l-2 border-[#f0b400]/50 pl-4">
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
                  className="py-2.5 px-5 rounded-full bg-[#14531e] hover:bg-[#1b6d28] border border-[#f0b400]/50 active:scale-95 text-white text-[11px] uppercase tracking-[0.14em] font-medium inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
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
                    className="py-2.5 px-5 rounded-full bg-white/10 hover:bg-[#f0b400] hover:text-[#061208] border border-white/20 text-white text-[11px] uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer"
                  >
                    Enquire Now
                  </button>
                )}
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
          SECTION 4: PLANNING & ENQUIRY GUIDANCE SLIDER (No fake reviews)
         ===================================================================== */}
      <section className="px-1 sm:px-2">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <span
            className="text-xl sm:text-2xl text-[#9e6800] block mb-0.5"
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
                className="text-xl sm:text-3xl lg:text-4xl text-[#0f1f12] leading-relaxed font-normal"
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
                  <p className="text-xs uppercase tracking-[0.16em] text-[#0f1f12]/55 mt-0.5">
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
        <div className="rounded-[22px] sm:rounded-[28px] bg-gradient-to-br from-[#0e2613] via-[#09190c] to-[#040d06] text-white p-6 sm:p-10 lg:p-14 border border-[#f0b400]/20 shadow-2xl space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span
              className="text-2xl sm:text-3xl text-[#f0b400] block"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Every Ritual, Held Under One Sky
            </span>
            <h2
              className="text-3xl sm:text-5xl font-normal text-white lowercase tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              your wedding chapter at green heritage
            </h2>
            <p className="text-xs sm:text-sm text-white/75 max-w-lg mx-auto leading-relaxed font-light">
              A wedding brings an entire family under one roof for days you carry for life. Speak directly with our team in Muzaffarpur to hold your auspicious dates and walk the lawns together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                title: 'Haldi & Mehendi Lawns',
                scriptSub: 'sunlit morning joy',
                story:
                  'Picture yellow marigolds drifting over the poolside lawn, green bangles clinking under shaded porticos, and elders laughing without anyone feeling rushed.',
                tag: 'Day Rituals',
              },
              {
                title: 'Sangeet & Varmala Stage',
                scriptSub: 'music, pyros & applause',
                story:
                  'When dusk settles on Bakarpur, our carved facade lights up for your baraat welcome, sangeet dances, and the first quiet breath before you exchange garlands.',
                tag: 'Evening Celebrations',
              },
              {
                title: 'Bridal Suites & Family Rooms',
                scriptSub: 'rest between rituals',
                story:
                  'A bride needs calm mirrors while getting ready, and travelling relatives deserve quiet rest after midnight pheras. Ask our desk for room blocks aligned with your wedding dates.',
                tag: 'Guest Hospitality',
              },
              {
                title: 'Walk the Venue Together',
                scriptSub: 'bakarpur, muzaffarpur',
                story:
                  'Come see where the mandap will stand and feel the space in person on Gobarsahi–Sakri Road. Call or WhatsApp +91 92340 52600 to plan a family walkthrough.',
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
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    {card.story}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#f0b400]">
                  <span style={{ fontFamily: 'var(--font-script)' }}>
                    {card.tag}
                  </span>
                  <Compass className="w-3.5 h-3.5 text-[#f0b400]" />
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 sm:p-8 rounded-2xl bg-[#040d06]/70 border border-[#f0b400]/25 text-center max-w-3xl mx-auto space-y-2">
            <span
              className="text-2xl sm:text-4xl text-[#f0b400] block leading-tight"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              &ldquo;An online enquiry is a request only. A booking is confirmed
              once our team confirms availability and terms directly with
              you.&rdquo;
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/55 block font-light">
              The Green Heritage Resort and Banquet · +91 92340 52600
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
            className="text-xl sm:text-2xl text-[#9e6800] block mb-0.5"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Taking the First Step Together
          </span>
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#0f1f12] lowercase"
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
                    className="text-lg sm:text-xl text-[#9e6800] block leading-snug"
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
                  <p className="text-xs sm:text-sm text-[#0f1f12]/65 leading-relaxed mt-1.5">
                    {item.desc}
                  </p>
                </div>

                {onOpenQuickEnquire && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onOpenQuickEnquire(item.service)}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-medium text-[#14531e] hover:text-[#9e6800] transition-colors cursor-pointer"
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

      {/* =====================================================================
          SECTION 6: VERIFIED VENUE FACTS & QUICK ANSWERS (AEO & GEO)
         ===================================================================== */}
      <section
        aria-label="Verified Venue Facts and Frequently Asked Questions"
        className="px-1 sm:px-2 pb-2"
      >
        <div className="rounded-[22px] sm:rounded-[28px] bg-white/95 border border-[#14531e]/15 p-5 sm:p-8 lg:p-10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#0f1f12]/10 pb-4">
            <div>
              <span
                className="text-xl sm:text-2xl text-[#9e6800] block leading-none"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Clear Information for Families &amp; Guests
              </span>
              <h2
                className="text-2xl sm:text-4xl text-[#0f1f12] lowercase mt-0.5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                verified venue guide &amp; quick answers
              </h2>
            </div>

            <a
              href={PAGE_ROUTES.faqs.path}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                onNavigate('faqs');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#14531e] hover:bg-[#0c3a14] text-white text-[11px] uppercase tracking-[0.16em] font-medium transition-colors self-start sm:self-auto"
            >
              <span>Full FAQs &amp; Policies</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#f0b400]" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Consistent Official Entity Summary */}
            <div className="lg:col-span-5 rounded-2xl bg-[#f7f6f1] border border-[#14531e]/12 p-5 space-y-3.5 text-xs sm:text-sm text-[#0f1f12]/80">
              <h3
                className="text-xl sm:text-2xl text-[#0f1f12] lowercase"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                official property summary
              </h3>

              <dl className="space-y-2.5">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-[#9e6800] font-semibold">
                    Official Name
                  </dt>
                  <dd className="font-medium text-[#0f1f12] mt-0.5">
                    {STUDIO_INFO.name}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-[#9e6800] font-semibold">
                    Location &amp; Pin
                  </dt>
                  <dd className="mt-0.5">
                    {STUDIO_INFO.address} · Map Pin: 26.06385, 85.3504979
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-[#9e6800] font-semibold">
                    Direct Phone / WhatsApp &amp; Email
                  </dt>
                  <dd className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <a
                      href={STUDIO_INFO.phonePrimaryUrl}
                      className="font-medium text-[#14531e] hover:underline"
                    >
                      {STUDIO_INFO.phoneNumber}
                    </a>
                    <span aria-hidden="true">·</span>
                    <a
                      href={STUDIO_INFO.emailUrl}
                      className="font-medium text-[#14531e] hover:underline"
                    >
                      {STUDIO_INFO.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-[#9e6800] font-semibold">
                    Events &amp; Enquiry Confirmation
                  </dt>
                  <dd className="mt-0.5 leading-relaxed">
                    Haldi, mehendi, sangeet, baraat, varmala, pheras, receptions, bridal suites and family guest rooms. Online enquiries are requests only until availability and written terms are confirmed by our desk.
                  </dd>
                </div>
              </dl>

              <div className="pt-2 border-t border-[#0f1f12]/10 flex flex-wrap gap-2">
                {(
                  [
                    { id: 'about', label: 'The Venue' },
                    { id: 'installations', label: 'Spaces & Halls' },
                    { id: 'commissions', label: 'Celebrations' },
                    { id: 'contact', label: 'Contact & Visit' },
                  ] as const
                ).map((link) => (
                  <a
                    key={link.id}
                    href={PAGE_ROUTES[link.id].path}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                      e.preventDefault();
                      onNavigate(link.id);
                    }}
                    className="px-3 py-1.5 rounded-full bg-white hover:bg-[#14531e] hover:text-white border border-[#14531e]/15 text-[11px] font-medium text-[#0f1f12] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column: Semantic Native HTML Q&A Accordion */}
            <div className="lg:col-span-7 space-y-2.5">
              {FAQ_ITEMS.map((faq, idx) => (
                <details
                  key={faq.id}
                  open={idx === 0}
                  className="group rounded-2xl bg-[#f7f6f1] border border-[#14531e]/12 px-4 sm:px-5 py-3.5 open:bg-white open:shadow-sm transition-colors"
                >
                  <summary className="list-none cursor-pointer flex items-center justify-between gap-3 font-medium text-sm sm:text-base text-[#0f1f12]">
                    <span style={{ fontFamily: 'var(--font-display)' }}>
                      {faq.question}
                    </span>
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[#14531e]/10 text-[#14531e] flex items-center justify-center text-xs font-semibold group-open:bg-[#14531e] group-open:text-[#f0b400] transition-colors">
                      +
                    </span>
                  </summary>
                  <p className="mt-2.5 pt-2.5 border-t border-[#0f1f12]/10 text-xs sm:text-sm text-[#0f1f12]/75 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
