'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, ArrowUpRight } from 'lucide-react';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const fgVideoRef = useRef<HTMLVideoElement | null>(null);
  const isInViewRef = useRef(true);

  const currentSlide = HEADER_HERO_FILMS[activeIndex] || HEADER_HERO_FILMS[0];
  const activeVideoSrc = currentSlide.videoSrc || '/reels/DSG3HcWEcov.mp4';

  useEffect(() => {
    const timer = setInterval(() => {
      if (isInViewRef.current) {
        setActiveIndex((prev) => (prev + 1) % HEADER_HERO_FILMS.length);
      }
    }, 12000);
    return () => clearInterval(timer);
  }, []);

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
  }, [activeIndex, activeVideoSrc]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(
      (prev) => (prev - 1 + HEADER_HERO_FILMS.length) % HEADER_HERO_FILMS.length
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % HEADER_HERO_FILMS.length);
  };

  return (
    <section
      ref={sectionRef}
      onClick={() => onPlayFilm(currentSlide)}
      className="relative w-full min-h-[370px] sm:min-h-[340px] md:min-h-0 sm:aspect-video rounded-[18px] sm:rounded-[24px] overflow-hidden bg-[#061208] select-none shadow-2xl border border-[#14531e]/20 cursor-pointer group"
    >
      {/* Lightly preload metadata for ONLY the single next slide to keep mobile bandwidth & memory lean */}
      {(() => {
        const nextSlide =
          HEADER_HERO_FILMS[(activeIndex + 1) % HEADER_HERO_FILMS.length];
        return nextSlide?.videoSrc && nextSlide.id !== currentSlide.id ? (
          <div className="hidden" aria-hidden="true">
            <video
              key={nextSlide.id}
              src={nextSlide.videoSrc}
              preload="metadata"
              muted
              playsInline
            />
          </div>
        ) : null;
      })()}

      {/* FOREGROUND HEADER VIDEO (Full bleed frame, focal position preserved on smartphone & desktop) */}
      <div className="absolute inset-0 z-10 w-full h-full overflow-hidden bg-[#061208]">
        <video
          key={currentSlide.id}
          ref={fgVideoRef}
          src={activeVideoSrc}
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
          className="absolute inset-0 w-full h-full object-cover bg-[#061208]"
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
          referrerPolicy="no-referrer"
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

      {/* BOTTOM OF HEADER: HEADLINE + SUPPORTING COPY + ACTION BUTTONS & SLIDE SWITCHERS */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-3.5 sm:px-7 lg:px-10 pb-3.5 sm:pb-6 pt-10 flex flex-col md:flex-row md:items-end justify-between gap-2.5 sm:gap-4">
        {/* Left: Script Accent + Headline & Supporting Copy */}
        <div className="min-w-0 text-left">
          <span
            className="text-base sm:text-xl lg:text-2xl text-[#f0b400] block leading-[1.2] mb-0.5 drop-shadow"
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
          <p className="text-[11px] sm:text-xs text-white/90 mt-0.5 max-w-xl font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
            {currentSlide.synopsis}
          </p>
        </div>

        {/* Right: Enquire Now & Get Directions Buttons, Slide Dots & Prev/Next Controls */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-wrap items-center justify-between md:justify-end gap-2 sm:gap-2.5 shrink-0"
        >
          {/* Enquire Now & Get Directions Buttons */}
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
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#14531e] hover:bg-[#1b6d28] border border-[#f0b400]/55 active:scale-95 text-white text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-medium transition-all shadow-lg shadow-[#061208]/45 cursor-pointer"
            >
              <span>Enquire Now</span>
              <ArrowUpRight className="w-3 h-3 text-[#f0b400]" />
            </button>

            <a
              href={STUDIO_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#061208]/65 hover:bg-[#f0b400] hover:text-[#061208] backdrop-blur-md border border-white/25 text-white text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-medium transition-all cursor-pointer"
            >
              <MapPin className="w-3 h-3" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Slide Dots + Prev/Next */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-full bg-[#061208]/60 backdrop-blur-md border border-white/15">
              {HEADER_HERO_FILMS.map((slide, idx) => {
                const active = idx === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Show ${slide.couple}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${active
                      ? 'w-4 sm:w-6 bg-[#f0b400]'
                      : 'w-1.5 bg-white/50 hover:bg-white'
                      }`}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous slide"
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#061208]/65 hover:bg-[#14531e] hover:border-[#f0b400]/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next slide"
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#061208]/65 hover:bg-[#14531e] hover:border-[#f0b400]/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
