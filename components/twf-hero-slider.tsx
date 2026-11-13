'use client';

import React, { useEffect, useRef } from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { HEADER_HERO_FILMS, STUDIO_INFO, CinemaFilm } from '@/lib/masoom-data';

interface TwfHeroSliderProps {
  onPlayFilm: (film: CinemaFilm) => void;
  onNavigateFilms: () => void;
  onOpenQuickEnquire?: () => void;
}

export function TwfHeroSlider({
  onPlayFilm,
  onNavigateFilms,
  onOpenQuickEnquire,
}: TwfHeroSliderProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const fgVideoRef = useRef<HTMLVideoElement | null>(null);
  const isInViewRef = useRef(true);

  // Single primary hero video — plays directly as requested with zero slide rotation overhead
  const currentSlide = HEADER_HERO_FILMS[0];
  const activeVideoSrc = currentSlide.videoSrc || '/reels/DSG3HcWEcov.mp4';

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewRef.current = entry.isIntersecting;
          const video = fgVideoRef.current;
          if (!video) return;
          if (entry.isIntersecting) {
            video.muted = true;
            video.play().catch(() => { });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = fgVideoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.load();

    if (isInViewRef.current) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => { });
        });
      }
    }
  }, [activeVideoSrc]);

  return (
    <section
      ref={sectionRef}
      onClick={() => onPlayFilm(currentSlide)}
      className="relative w-full min-h-[370px] sm:min-h-[340px] md:min-h-0 sm:aspect-video rounded-[18px] sm:rounded-[24px] overflow-hidden bg-[#061208] select-none shadow-2xl border border-[#14531e]/20 cursor-pointer group"
    >
      {/* FOREGROUND HEADER VIDEO (Single primary video playing directly) */}
      <div className="absolute inset-0 z-10 w-full h-full overflow-hidden bg-[#061208]">
        {/* Instant high-res poster image behind video — 0ms wait on 4G */}
        <img
          src={
            currentSlide.thumbnailUrl ||
            (currentSlide.reelCode
              ? `/reels/posters/${currentSlide.reelCode}.jpg`
              : '/og-preview-brand-v4.jpg')
          }
          alt={currentSlide.title}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          style={{ objectPosition: currentSlide.objectPosition || 'center center' }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <video
          key={currentSlide.id}
          ref={fgVideoRef}
          src={activeVideoSrc}
          poster={
            currentSlide.thumbnailUrl ||
            (currentSlide.reelCode
              ? `/reels/posters/${currentSlide.reelCode}.jpg`
              : undefined)
          }
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ objectPosition: currentSlide.objectPosition || 'center center' }}
          onLoadedData={(e) => {
            if (isInViewRef.current) {
              e.currentTarget.muted = true;
              e.currentTarget.play().catch(() => { });
            }
          }}
          onCanPlay={(e) => {
            if (isInViewRef.current) {
              e.currentTarget.muted = true;
              e.currentTarget.play().catch(() => { });
            }
          }}
          className="absolute inset-0 w-full h-full object-cover bg-transparent"
        />
        {/* Subtle dark fade overlay — video stays crisp & clearly visible on smartphone while UI pops cleanly */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 42%, rgba(4,12,6,0.14) 0%, rgba(4,12,6,0.28) 70%, rgba(4,12,6,0.42) 100%)',
          }}
        />
      </div>

      {/* TOP-LEFT CORNER OF VIDEO BOX: TRANSPARENT RESORT LOGO */}
      <div className="pointer-events-none absolute top-3 left-3 sm:top-5 sm:left-6 z-20">
        <img
          src="/TGHLogo.png"
          alt="The Green Heritage Resort and Banquet"
          loading="eager"
          decoding="async"
          className="w-20 sm:w-32 lg:w-40 h-auto aspect-[3/2] object-contain drop-shadow-[0_0_18px_rgba(247,246,241,0.52)]"
        />
      </div>

      {/* Soft Bottom Gradient Scrim */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[54%] sm:h-1/2 z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,18,8,0) 0%, rgba(6,18,8,0.56) 45%, rgba(6,18,8,0.92) 100%)',
        }}
      />

      {/* BOTTOM OF HEADER: HEADLINE + SUPPORTING COPY + ACTION BUTTONS */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-3.5 sm:px-7 lg:px-10 pb-3.5 sm:pb-6 pt-10 flex flex-col md:flex-row md:items-end justify-between gap-2.5 sm:gap-4">
        {/* Left: Script Accent + Headline & Supporting Copy */}
        <div className="min-w-0 text-left">
          <span
            className="text-lg sm:text-xl lg:text-2xl text-[#f0b400] block leading-[1.2] mb-0.5 drop-shadow"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            {currentSlide.scriptHighlight || 'Bakarpur · Muzaffarpur, Bihar'}
          </span>
          <h1
            className="text-2xl sm:text-3xl lg:text-5xl font-normal text-white tracking-tight leading-snug drop-shadow"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {currentSlide.couple}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 mt-0.5 max-w-xl font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
            {currentSlide.synopsis}
          </p>
        </div>

        {/* Right: Enquire Now & Get Directions Buttons */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-wrap items-center justify-between md:justify-end gap-2 sm:gap-2.5 shrink-0"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => {
                if (onOpenQuickEnquire) {
                  onOpenQuickEnquire();
                } else {
                  onNavigateFilms();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#14531e] hover:bg-[#1b6d28] border border-[#f0b400]/55 active:scale-95 text-white text-xs uppercase tracking-[0.16em] font-medium transition-all shadow-lg shadow-[#061208]/45 cursor-pointer"
            >
              <span>Enquire Now</span>
              <ArrowUpRight className="w-3 h-3 text-[#f0b400]" />
            </button>

            <a
              href={STUDIO_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#061208]/65 hover:bg-[#f0b400] hover:text-[#061208] backdrop-blur-md border border-white/25 text-white text-xs uppercase tracking-[0.14em] font-medium transition-all cursor-pointer"
            >
              <MapPin className="w-3 h-3" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
