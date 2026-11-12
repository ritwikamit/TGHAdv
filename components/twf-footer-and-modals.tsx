'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  Volume2,
  VolumeX,
  MapPin,
  Instagram,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Users,
} from 'lucide-react';
import {
  STUDIO_INFO,
  FOOTER_REELS,
  GALLERY_PHOTOS,
  SIGNATURE_FRAMES,
  CinemaFilm,
  PhotoFrame,
} from '@/lib/masoom-data';
import { PageId } from './twf-sidebar';
import { WhatsAppMinimalIcon, FacebookMinimalIcon } from './twf-icons';
import {
  readCookieConsent,
  saveCookieConsent,
  COOKIE_EVENT_UPDATE,
  CookieConsentState,
} from './twf-cookie-banner';

interface TwfFooterAndModalsProps {
  onNavigate: (page: PageId) => void;
  activeFilm: CinemaFilm | null;
  onCloseFilm: () => void;
  activePhoto: PhotoFrame | null;
  onClosePhoto: () => void;
  onSelectPhoto: (photo: PhotoFrame) => void;
  quickEnquireOpen: boolean;
  preselectedService?: string;
  onCloseQuickEnquire: () => void;
  onOpenQuickEnquire: (service?: string) => void;
  cookiePolicyOpen?: boolean;
  onCloseCookiePolicy?: () => void;
}

export function TwfFooterAndModals({
  onNavigate,
  activeFilm,
  onCloseFilm,
  activePhoto,
  onClosePhoto,
  onSelectPhoto,
  quickEnquireOpen,
  preselectedService,
  onCloseQuickEnquire,
  onOpenQuickEnquire,
  cookiePolicyOpen,
  onCloseCookiePolicy,
}: TwfFooterAndModalsProps) {
  const footerRef = useRef<HTMLElement | null>(null);
  const footerVideo1Ref = useRef<HTMLVideoElement | null>(null);
  const footerVideo2Ref = useRef<HTMLVideoElement | null>(null);
  const [activeFooterVideoIdx, setActiveFooterVideoIdx] = useState<0 | 1>(0);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [modalVideoMuted, setModalVideoMuted] = useState(false);
  const [photoZoom, setPhotoZoom] = useState(1);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const [cookieState, setCookieState] = useState<CookieConsentState | null>(null);
  const [cookieSavedNotice, setCookieSavedNotice] = useState(false);

  const isCookieOpen = cookieModalOpen || Boolean(cookiePolicyOpen);
  const handleCloseCookieModal = () => {
    setCookieModalOpen(false);
    setCookieSavedNotice(false);
    onCloseCookiePolicy?.();
  };

  useEffect(() => {
    const syncConsent = () => {
      setCookieState(readCookieConsent());
    };
    syncConsent();
    window.addEventListener(COOKIE_EVENT_UPDATE, syncConsent);
    return () => window.removeEventListener(COOKIE_EVENT_UPDATE, syncConsent);
  }, [isCookieOpen]);

  const [enquireForm, setEnquireForm] = useState({
    guestName: '',
    phone: '',
    preferredDate: '',
    guests: '',
    message: '',
  });
  const [userEnquiryType, setUserEnquiryType] = useState<{
    forService?: string;
    value: string;
  } | null>(null);
  const [enquireSubmitted, setEnquireSubmitted] = useState(false);

  const selectedTypeValue =
    (userEnquiryType && userEnquiryType.forService === preselectedService
      ? userEnquiryType.value
      : preselectedService) || 'Wedding & Reception';

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      { rootMargin: '300px 0px', threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeVid =
      activeFooterVideoIdx === 0
        ? footerVideo1Ref.current
        : footerVideo2Ref.current;
    const inactiveVid =
      activeFooterVideoIdx === 0
        ? footerVideo2Ref.current
        : footerVideo1Ref.current;

    if (inactiveVid) {
      inactiveVid.pause();
    }

    if (!isFooterVisible) {
      activeVid?.pause();
      return;
    }

    if (activeVid) {
      if (activeVid.ended) {
        activeVid.currentTime = 0;
      }
      activeVid.defaultMuted = true;
      activeVid.muted = true;
      activeVid.playsInline = true;
      if (activeVid.preload !== 'auto') {
        activeVid.preload = 'auto';
      }
      if (activeVid.readyState === 0) {
        activeVid.load();
      }
      const playPromise = activeVid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          activeVid.muted = true;
          activeVid.play().catch(() => {});
        });
      }
    }
  }, [activeFooterVideoIdx, isFooterVisible]);

  const allPhotos = [...GALLERY_PHOTOS, ...SIGNATURE_FRAMES];
  const currentPhotoIndex = activePhoto
    ? allPhotos.findIndex((p) => p.id === activePhoto.id)
    : -1;

  const handlePrevPhoto = () => {
    if (currentPhotoIndex < 0) return;
    setPhotoZoom(1);
    const prevIdx = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
    onSelectPhoto(allPhotos[prevIdx]);
  };

  const handleNextPhoto = () => {
    if (currentPhotoIndex < 0) return;
    setPhotoZoom(1);
    const nextIdx = (currentPhotoIndex + 1) % allPhotos.length;
    onSelectPhoto(allPhotos[nextIdx]);
  };

  const whatsappText = encodeURIComponent(
    `Hello The Green Heritage Resort and Banquet! I would like to submit an enquiry.\n\nName: ${
      enquireForm.guestName || 'Guest'
    }\nPhone: ${enquireForm.phone || 'Not provided'}\nEnquiry Type: ${selectedTypeValue}\nPreferred Date: ${
      enquireForm.preferredDate || 'Flexible'
    }\nGuests: ${enquireForm.guests || 'Not specified'}\nMessage: ${
      enquireForm.message || 'Please share current availability and details.'
    }`
  );
  const whatsappHref = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${whatsappText}`;
  const quickMailtoHref = `mailto:${STUDIO_INFO.email}?subject=${encodeURIComponent(
    `${selectedTypeValue} — ${enquireForm.guestName || 'Guest'}`
  )}&body=${whatsappText}`;

  const handleQuickEnquireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquireSubmitted(true);
    const link = document.createElement('a');
    link.href = whatsappHref;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* ===================================================================
          CLEAN FULL-BLEED LANDSCAPE VIDEO FOOTER (Matching Header Gap & Radii)
         =================================================================== */}
      <div className="px-2 pb-2 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5 pt-4 sm:pt-6">
        <footer
          ref={footerRef}
          className="relative w-full min-h-[430px] sm:min-h-[420px] sm:aspect-video bg-[#061208] text-white rounded-[18px] sm:rounded-[24px] overflow-hidden flex flex-col justify-end select-none shadow-2xl border border-[#14531e]/25"
        >
        <video
          ref={footerVideo1Ref}
          src={FOOTER_REELS[0].videoSrc}
          poster={FOOTER_REELS[0].posterUrl || `/reels/posters/${FOOTER_REELS[0].code}.jpg`}
          autoPlay
          loop={false}
          muted
          playsInline
          preload="metadata"
          onCanPlay={(e) => {
            if (isFooterVisible && activeFooterVideoIdx === 0) {
              e.currentTarget.muted = true;
              e.currentTarget.play().catch(() => {});
            }
          }}
          onEnded={() => setActiveFooterVideoIdx(1)}
          onError={() => setActiveFooterVideoIdx(1)}
          className={`pointer-events-none absolute inset-0 w-full h-full object-cover bg-[#061208] transition-opacity duration-1000 ease-in-out ${
            activeFooterVideoIdx === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />

        <video
          ref={footerVideo2Ref}
          src={FOOTER_REELS[1].videoSrc}
          poster={FOOTER_REELS[1].posterUrl || `/reels/posters/${FOOTER_REELS[1].code}.jpg`}
          muted
          playsInline
          preload="metadata"
          onCanPlay={(e) => {
            if (isFooterVisible && activeFooterVideoIdx === 1) {
              e.currentTarget.muted = true;
              e.currentTarget.play().catch(() => {});
            }
          }}
          onEnded={() => setActiveFooterVideoIdx(0)}
          onError={() => setActiveFooterVideoIdx(0)}
          className={`pointer-events-none absolute inset-0 w-full h-full object-cover bg-[#061208] transition-opacity duration-1000 ease-in-out ${
            activeFooterVideoIdx === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />

        {/* Subtle dark fade overlay across entire footer video box — video stays clearly visible on smartphone */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[12]"
          style={{
            background:
              'radial-gradient(circle at 50% 38%, rgba(4,12,6,0.16) 0%, rgba(4,12,6,0.30) 70%, rgba(4,12,6,0.44) 100%)',
          }}
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] sm:h-3/5 z-[13]"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,18,8,0) 0%, rgba(6,18,8,0.68) 44%, rgba(6,18,8,0.95) 100%)',
          }}
        />

        <div className="relative z-20 w-full px-4 sm:px-8 lg:px-12 pb-5 sm:pb-7 pt-20 sm:pt-12 bg-transparent space-y-3 sm:space-y-4">
          {/* Tier 1: Resort Logo + Tagline (Left) & Connect Icons + Enquire Button (Right) */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-3.5 sm:gap-5">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2.5 sm:gap-5 min-w-0">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer focus:outline-none"
                aria-label="The Green Heritage Resort and Banquet Home"
              >
                <img
                  src="/TGHLogo.png"
                  alt="The Green Heritage Resort and Banquet"
                  loading="lazy"
                  decoding="async"
                  className="w-24 sm:w-44 lg:w-56 h-auto aspect-[3/2] object-contain drop-shadow-[0_0_20px_rgba(247,246,241,0.5)]"
                  referrerPolicy="no-referrer"
                />
              </button>

              <div className="min-w-0 space-y-1">
                <span
                  className="text-xl sm:text-3xl lg:text-4xl text-[#f0b400] block leading-snug drop-shadow"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  Where every blessing stays with the family
                </span>
                <p
                  className="text-xs sm:text-lg lg:text-xl text-white/95 font-normal tracking-wide drop-shadow"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Weddings, Phere &amp; Celebrations · Bakarpur, Gobarsahi–Sakri Road, Muzaffarpur 844127
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 shrink-0">
              <div className="flex items-center gap-2">
                <a
                  href={STUDIO_INFO.phonePrimaryUrl}
                  aria-label={`Call ${STUDIO_INFO.phoneNumber}`}
                  title={`Call ${STUDIO_INFO.phoneNumber}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-[#14531e] hover:border-[#f0b400]/65 border border-white/25 text-white hover:text-[#f0b400] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={STUDIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${STUDIO_INFO.phoneNumber}`}
                  title={`WhatsApp ${STUDIO_INFO.phoneNumber}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-[#14531e] hover:border-[#f0b400]/65 border border-white/25 text-white hover:text-[#f0b400] flex items-center justify-center transition-colors cursor-pointer group"
                >
                  <WhatsAppMinimalIcon className="w-4 h-4 text-white/95 group-hover:text-[#f0b400]" />
                </a>
                <a
                  href={STUDIO_INFO.emailUrl}
                  aria-label={`Email ${STUDIO_INFO.email}`}
                  title={`Email ${STUDIO_INFO.email}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-[#14531e] hover:border-[#f0b400]/65 border border-white/25 text-white hover:text-[#f0b400] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={STUDIO_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-[#14531e] hover:border-[#f0b400]/65 border border-white/25 text-white hover:text-[#f0b400] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={STUDIO_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-[#14531e] hover:border-[#f0b400]/65 border border-white/25 text-white hover:text-[#f0b400] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <FacebookMinimalIcon className="w-4 h-4" />
                </a>
                <a
                  href={STUDIO_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Maps Directions"
                  title="Open Google Maps"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-[#14531e] hover:border-[#f0b400]/65 border border-white/25 text-white hover:text-[#f0b400] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => onOpenQuickEnquire()}
                className="px-5 sm:px-6 py-2.5 rounded-full bg-[#14531e] hover:bg-[#1b6d28] border border-[#f0b400]/55 active:scale-95 text-white text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-[#061208]/45"
              >
                <span>Enquire Now</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#f0b400]" />
              </button>
            </div>
          </div>
        </div>
        </footer>

        {/* Tier 2: Copyright, Terms, Privacy/Cookie Policy, Developer Credit — Wraps Cleanly on Smartphone */}
        <div className="mt-2.5 sm:mt-3 rounded-[14px] sm:rounded-[18px] bg-[#061208] border border-[#14531e]/30 shadow-lg px-4 sm:px-7 py-3 sm:py-3.5 w-full">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-4 text-center sm:text-left text-[10.5px] sm:text-[11px] xl:text-xs text-[#f7f6f1]/85 leading-relaxed">
            <span>
              &copy; {new Date().getFullYear()} The Green Heritage Resort and Banquet. All rights reserved.
            </span>

            <div className="inline-flex items-center gap-2.5 text-[#f7f6f1]/75 shrink-0">
              <button
                type="button"
                onClick={() => setTermsModalOpen(true)}
                className="hover:text-[#f0b400] transition-colors cursor-pointer underline-offset-4 hover:underline"
              >
                Terms &amp; Conditions
              </button>
              <span className="text-[#f0b400]/45" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setCookieModalOpen(true)}
                className="hover:text-[#f0b400] transition-colors cursor-pointer underline-offset-4 hover:underline"
              >
                Privacy &amp; Cookie Policy
              </button>
            </div>

            <div className="inline-flex items-center gap-1.5 text-[#f7f6f1]/85 shrink-0">
              <span className="leading-none">Designed and Developed by</span>
              <a
                href={`https://wa.me/917766833773?text=${encodeURIComponent(
                  'Hi ACCustomLabs, I visited The Green Heritage Resort website and would like to enquire about your web design and development services.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:opacity-100 opacity-95 transition-opacity"
                title="Chat with ACCustomLabs on WhatsApp (+91 77668 33773)"
                aria-label="Contact ACCustomLabs on WhatsApp"
              >
                <img
                  src="/ac-custom-labs.png"
                  alt="ACCUstomLabs"
                  loading="lazy"
                  decoding="async"
                  className="h-[14px] sm:h-[15px] w-auto object-contain block translate-y-[2.5px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                  referrerPolicy="no-referrer"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          MODAL 1: IN-WEBSITE VIDEO CLIP PLAYER
         =================================================================== */}
      {activeFilm && (
        <div
          onClick={onCloseFilm}
          className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeFilm.couple} — The Green Heritage Resort and Banquet`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[calc(100dvh-16px)] sm:max-h-[calc(100dvh-32px)] bg-[#09190c] border border-[#f0b400]/25 rounded-[18px] sm:rounded-[24px] overflow-hidden shadow-2xl flex flex-col my-auto"
          >
            <div className="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-3.5 border-b border-white/10 bg-[#061208]">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#f0b400] shrink-0" />
                <div className="min-w-0">
                  <h3
                    className="text-base sm:text-lg text-white font-medium truncate"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {activeFilm.couple}
                  </h3>
                  <p className="text-[11px] text-white/60 truncate">
                    {activeFilm.location} · {activeFilm.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {activeFilm.videoSrc && (
                  <button
                    type="button"
                    onClick={() => setModalVideoMuted((m) => !m)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#14531e] text-[11px] sm:text-xs text-white transition-colors cursor-pointer"
                  >
                    {modalVideoMuted ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-[#f0b400]" />
                        <span>Sound On</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={onCloseFilm}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-[#14531e] text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close video player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 min-h-0 w-full bg-[#061208] flex items-center justify-center overflow-hidden">
              {activeFilm.videoSrc ? (
                <video
                  key={activeFilm.videoSrc}
                  src={activeFilm.videoSrc}
                  autoPlay
                  loop
                  muted={modalVideoMuted}
                  controls
                  playsInline
                  preload="auto"
                  className="relative z-10 w-full h-full max-h-[50dvh] sm:max-h-[58dvh] object-contain"
                />
              ) : (
                <div className="relative z-10 w-full aspect-video max-h-[56dvh]">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeFilm.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={`${activeFilm.couple} — The Green Heritage Resort and Banquet`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            <div className="shrink-0 px-4 sm:px-6 py-3.5 sm:py-4 bg-[#08170b] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="min-w-0 max-w-xl">
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  {activeFilm.synopsis}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
                <a
                  href={STUDIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#14531e] hover:text-[#f0b400] text-white flex items-center justify-center transition-colors shrink-0"
                  title={`WhatsApp ${STUDIO_INFO.phoneNumber}`}
                >
                  <WhatsAppMinimalIcon className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const topicRef = activeFilm.couple;
                    onCloseFilm();
                    onOpenQuickEnquire(`Enquiry (${topicRef})`);
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#14531e] hover:bg-[#1b6d28] border border-[#f0b400]/50 text-white text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#f0b400]" />
                  <span>Enquire About Dates</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 2: PHOTOGRAPH VIEWER LIGHTBOX
         =================================================================== */}
      {activePhoto && (
        <div
          onClick={onClosePhoto}
          className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[calc(100dvh-16px)] sm:max-h-[calc(100dvh-32px)] bg-[#09190c] border border-[#f0b400]/20 rounded-[18px] sm:rounded-[24px] overflow-y-auto lg:overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 my-auto"
          >
            <div className="lg:col-span-8 relative bg-[#040d06] flex items-center justify-center min-h-[260px] sm:min-h-[420px] max-h-[55dvh] lg:max-h-[82dvh] overflow-hidden select-none">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                style={{
                  transform: `scale(${photoZoom})`,
                  transition: 'transform 0.25s ease-out',
                }}
                className={`max-w-full max-h-[52dvh] lg:max-h-[78dvh] w-auto h-auto object-contain ${
                  photoZoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
                }`}
                onClick={() => setPhotoZoom((prev) => (prev < 2.5 ? prev + 0.5 : 1))}
                referrerPolicy="no-referrer"
              />

              <div className="absolute top-3 right-3 z-30 flex items-center gap-1 p-1 rounded-full bg-[#061208]/80 backdrop-blur-md border border-white/20 text-white shadow-xl">
                <button
                  type="button"
                  onClick={() => setPhotoZoom((prev) => Math.min(3, prev + 0.5))}
                  aria-label="Zoom in"
                  title="Zoom In"
                  className="w-7 h-7 rounded-full hover:bg-[#14531e] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoZoom((prev) => Math.max(1, prev - 0.5))}
                  aria-label="Zoom out"
                  title="Zoom Out"
                  className="w-7 h-7 rounded-full hover:bg-[#14531e] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                {photoZoom > 1 && (
                  <button
                    type="button"
                    onClick={() => setPhotoZoom(1)}
                    aria-label="Reset zoom"
                    title="Reset to 100%"
                    className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 hover:bg-[#14531e] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
                <span className="text-[10px] px-1.5 text-white/70">
                  {Math.round(photoZoom * 100)}%
                </span>
              </div>

              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#061208]/75 hover:bg-[#14531e] border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#061208]/75 hover:bg-[#14531e] border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="lg:col-span-4 p-4 sm:p-6 flex flex-col justify-between bg-[#09190c] text-white overflow-y-auto max-h-[82dvh]">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className="text-lg sm:text-xl text-[#f0b400] block leading-none"
                      style={{ fontFamily: 'var(--font-script)' }}
                    >
                      {activePhoto.categoryLabel}
                    </span>
                    <h3
                      className="text-xl sm:text-2xl text-white mt-1"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {activePhoto.title}
                    </h3>
                    <p className="text-xs text-white/60 mt-1">
                      {activePhoto.couple} · {activePhoto.location}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClosePhoto}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#14531e] text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    aria-label="Close photo viewer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {activePhoto.description}
                </p>

                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/55">
                    <MapPin className="w-3.5 h-3.5 text-[#f0b400]" />
                    <span>Property Details</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-1 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
                      <span className="text-white/50">Location</span>
                      <span className="text-white text-right">{activePhoto.exif.camera}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
                      <span className="text-white/50">Category</span>
                      <span className="text-white text-right">{activePhoto.exif.lens}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    const spaceTitle = activePhoto.title;
                    onClosePhoto();
                    onOpenQuickEnquire(`Enquiry (${spaceTitle})`);
                  }}
                  className="w-full py-2.5 px-5 rounded-full bg-[#14531e] hover:bg-[#1b6d28] border border-[#f0b400]/50 text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enquire About Dates</span>
                  <ArrowUpRight className="w-4 h-4 text-[#f0b400]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 3: QUICK ENQUIRY MODAL (Aligned with content.md & SXO.md)
         =================================================================== */}
      {quickEnquireOpen && (
        <div
          onClick={onCloseQuickEnquire}
          className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Enquire with The Green Heritage Resort and Banquet"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[calc(100dvh-16px)] sm:max-h-[calc(100dvh-32px)] overflow-y-auto bg-[#f7f6f1] text-[#0f1f12] rounded-[20px] sm:rounded-[28px] p-5 sm:p-8 shadow-2xl border border-[#14531e]/15 my-auto"
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#14531e]/15">
              <div>
                <div className="inline-flex items-center gap-2 text-[#14531e] text-xs uppercase tracking-[0.2em] font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>The Green Heritage · Bakarpur, Muzaffarpur</span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-normal text-[#0f1f12] mt-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Tell Us What You Are{' '}
                  <span
                    className="text-3xl sm:text-4xl text-[#9e6800] ml-1"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    Planning
                  </span>
                </h3>
              </div>

              <button
                type="button"
                onClick={onCloseQuickEnquire}
                className="w-8 h-8 rounded-full bg-[#14531e]/8 hover:bg-[#14531e] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {enquireSubmitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#14531e]/12 text-[#14531e] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4
                  className="text-2xl font-normal text-[#0f1f12]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Thank You, {enquireForm.guestName || 'Guest'}!
                </h4>
                <p className="text-xs sm:text-sm text-[#0f1f12]/70 max-w-md mx-auto leading-relaxed">
                  Your enquiry request has been prepared for WhatsApp{' '}
                  <strong>({STUDIO_INFO.phoneNumber})</strong>. An online enquiry
                  is a request only, not a confirmed booking. You can also call{' '}
                  <strong>{STUDIO_INFO.phoneNumber}</strong> or email{' '}
                  <strong>{STUDIO_INFO.email}</strong> directly.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#14531e] hover:bg-[#0c3a14] border border-[#f0b400]/45 text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors"
                  >
                    <WhatsAppMinimalIcon className="w-4 h-4 text-[#f0b400]" />
                    <span>Open WhatsApp</span>
                  </a>
                  <a
                    href={STUDIO_INFO.phonePrimaryUrl}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-[#14531e]/8 hover:bg-[#14531e]/15 text-xs uppercase tracking-[0.14em] text-[#0f1f12] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#14531e]" />
                    <span>Call {STUDIO_INFO.phoneNumber}</span>
                  </a>
                  <a
                    href={STUDIO_INFO.emailUrl}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-[#14531e]/8 hover:bg-[#14531e]/15 text-xs uppercase tracking-[0.14em] text-[#0f1f12] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#14531e]" />
                    <span>{STUDIO_INFO.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setEnquireSubmitted(false);
                      onCloseQuickEnquire();
                    }}
                    className="px-4 py-3 rounded-full bg-black/5 hover:bg-black/10 text-xs uppercase tracking-[0.14em] text-[#0f1f12]/70 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuickEnquireSubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.14em] text-black/65 font-medium mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={enquireForm.guestName}
                      onChange={(e) =>
                        setEnquireForm({ ...enquireForm, guestName: e.target.value })
                      }
                      placeholder="Full name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-sm text-[#0f1f12] focus:outline-none focus:border-[#14531e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.14em] text-black/65 font-medium mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={enquireForm.phone}
                      onChange={(e) =>
                        setEnquireForm({ ...enquireForm, phone: e.target.value })
                      }
                      placeholder="Your phone number"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-sm text-[#0f1f12] focus:outline-none focus:border-[#14531e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.14em] text-black/65 font-medium mb-1">
                      Enquiry Type *
                    </label>
                    <select
                      value={selectedTypeValue}
                      onChange={(e) =>
                        setUserEnquiryType({
                          forService: preselectedService,
                          value: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-black/15 text-sm text-[#0f1f12] focus:outline-none focus:border-[#14531e]"
                    >
                      <option value="Wedding & Reception">Wedding &amp; Reception</option>
                      <option value="Haldi, Mehendi & Sangeet">Haldi, Mehendi &amp; Sangeet</option>
                      <option value="Wedding Guest Stay">Wedding Guest Stay</option>
                      <option value="Venue Tour">Venue Tour</option>
                      {preselectedService &&
                        ![
                          'Wedding & Reception',
                          'Haldi, Mehendi & Sangeet',
                          'Wedding Guest Stay',
                          'Venue Tour',
                        ].includes(preselectedService) && (
                          <option value={preselectedService}>
                            {preselectedService}
                          </option>
                        )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.14em] text-black/65 font-medium mb-1">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={enquireForm.preferredDate}
                        onChange={(e) =>
                          setEnquireForm({
                            ...enquireForm,
                            preferredDate: e.target.value,
                          })
                        }
                        placeholder="Preferred date"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-black/15 text-sm text-[#0f1f12] focus:outline-none focus:border-[#14531e]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.14em] text-black/65 font-medium mb-1">
                      Guests (Optional)
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={enquireForm.guests}
                        onChange={(e) =>
                          setEnquireForm({ ...enquireForm, guests: e.target.value })
                        }
                        placeholder="Approx. count"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-black/15 text-sm text-[#0f1f12] focus:outline-none focus:border-[#14531e]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.14em] text-black/65 font-medium mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={enquireForm.message}
                    onChange={(e) =>
                      setEnquireForm({ ...enquireForm, message: e.target.value })
                    }
                    placeholder="Share room requirements, wedding/function details or any questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-sm text-[#0f1f12] focus:outline-none focus:border-[#14531e]"
                  />
                </div>

                <p className="text-[11px] text-black/60 leading-relaxed">
                  Your details will be used to respond to this enquiry. Submitting an enquiry is a request only, not a confirmed reservation.
                </p>

                <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={STUDIO_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#14531e]/8 hover:bg-[#14531e]/15 text-[#0f1f12] text-xs font-medium transition-colors border border-[#14531e]/15 group"
                      title={`WhatsApp ${STUDIO_INFO.phoneNumber}`}
                    >
                      <WhatsAppMinimalIcon className="w-3.5 h-3.5 text-[#14531e] transition-colors" />
                      <span>{STUDIO_INFO.phoneNumber}</span>
                    </a>
                    <a
                      href={STUDIO_INFO.phonePrimaryUrl}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#14531e]/8 hover:bg-[#14531e]/15 text-[#0f1f12] text-xs font-medium transition-colors border border-[#14531e]/15 group"
                      title={`Call ${STUDIO_INFO.phoneNumber}`}
                    >
                      <Phone className="w-3.5 h-3.5 text-[#14531e] transition-colors" />
                      <span>Call</span>
                    </a>
                    <a
                      href={quickMailtoHref}
                      data-native-mailto="true"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#14531e]/8 hover:bg-[#14531e]/15 text-[#0f1f12] text-xs font-medium transition-colors border border-[#14531e]/15 group"
                      title={`Send form via Mail to ${STUDIO_INFO.email}`}
                    >
                      <Mail className="w-3.5 h-3.5 text-[#14531e] transition-colors" />
                      <span>Send via Email</span>
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-full bg-[#14531e] hover:bg-[#0c3a14] border border-[#f0b400]/45 text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                  >
                    Send Enquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 4: TERMS & CONDITIONS MODAL
         =================================================================== */}
      {termsModalOpen && (
        <div
          onClick={() => setTermsModalOpen(false)}
          className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Terms & Conditions"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[calc(100dvh-32px)] bg-white rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-2xl flex flex-col my-auto border border-black/10"
          >
            <div className="shrink-0 flex items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-[#14531e]/15 bg-[#f7f6f1]">
              <div>
                <span
                  className="text-base sm:text-lg text-[#9e6800] block leading-none"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  Clear Enquiry &amp; Booking Guidance
                </span>
                <h3
                  className="text-lg sm:text-2xl text-[#0f1f12] font-normal lowercase tracking-tight mt-0.5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  terms &amp; conditions
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTermsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#14531e]/8 hover:bg-[#14531e] hover:text-white text-[#0f1f12] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Terms"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 sm:p-7 space-y-5 text-xs sm:text-sm text-[#0f1f12]/75 leading-relaxed">
              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-semibold text-[#0f1f12]">
                  1. Enquiries vs. Confirmed Bookings
                </h4>
                <p>
                  Submitting an enquiry through this website, by phone or via WhatsApp is treated as a request only. A stay or event booking is confirmed only after The Green Heritage Resort and Banquet team verifies date availability and confirms its booking process and written terms with you.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-semibold text-[#0f1f12]">
                  2. Stay Details, Tariffs &amp; Check-In Rules
                </h4>
                <p>
                  Room options, nightly tariffs, extra-guest charges, check-in and check-out timings, and guest identification rules can vary by season and availability. Confirm all current room details directly at +91 92340 52600 before travelling.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-semibold text-[#0f1f12]">
                  3. Weddings, Events &amp; Venue Policies
                </h4>
                <p>
                  Banquet and lawn options, guest capacity, catering arrangements, decoration terms, outside-vendor permissions and sound or event timings are confirmed directly with property management prior to booking.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-semibold text-[#0f1f12]">
                  4. Facilities &amp; Seasonal Availability
                </h4>
                <p>
                  Any facility references from third-party directories (such as a swimming pool, parking or Wi-Fi) are subject to on-site verification and operating schedules. Please check directly with the desk for your exact dates.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-semibold text-[#0f1f12]">
                  5. Payments, Cancellations &amp; Privacy
                </h4>
                <p>
                  Applicable deposit, payment, rescheduling and cancellation terms are communicated directly by the resort team before any reservation is finalised. Personal details provided in enquiry forms are used solely to respond to your enquiry.
                </p>
              </div>
            </div>

            <div className="shrink-0 p-4 sm:p-5 border-t border-[#14531e]/15 bg-[#f7f6f1] flex items-center justify-between gap-2">
              <span className="text-[11px] text-[#0f1f12]/55">
                The Green Heritage Resort and Banquet · Bakarpur, Muzaffarpur
              </span>
              <button
                type="button"
                onClick={() => setTermsModalOpen(false)}
                className="px-5 py-2 rounded-full bg-[#14531e] hover:bg-[#0c3a14] text-white text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 5: PRIVACY & COOKIE POLICY MODAL
         =================================================================== */}
      {isCookieOpen && (
        <div
          onClick={handleCloseCookieModal}
          className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Privacy & Cookie Policy"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[calc(100dvh-32px)] bg-white rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-2xl flex flex-col my-auto border border-[#14531e]/15"
          >
            <div className="shrink-0 flex items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-[#14531e]/15 bg-[#f7f6f1]">
              <div>
                <span
                  className="text-base sm:text-lg text-[#9e6800] block leading-none"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  Minimal &amp; Transparent
                </span>
                <h3
                  className="text-lg sm:text-2xl text-[#0f1f12] font-normal lowercase tracking-tight mt-0.5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  privacy &amp; cookie policy
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseCookieModal}
                className="w-8 h-8 rounded-full bg-[#14531e]/8 hover:bg-[#14531e] hover:text-white text-[#0f1f12] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Privacy and Cookie Policy"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 sm:p-7 space-y-4 text-xs sm:text-sm text-[#0f1f12]/75 leading-relaxed">
              <p>
                The Green Heritage Resort and Banquet collects only the contact and event details needed to respond to your stay or event enquiries.
              </p>

              <div className="space-y-1.5">
                <h4 className="text-sm font-semibold text-[#0f1f12]">
                  1. Use of Enquiry Information
                </h4>
                <p>
                  Details you enter (name, phone number, enquiry type, preferred date, optional guest count and notes) are prepared directly for your WhatsApp or phone enquiry with our desk (+91 92340 52600). We do not request unnecessary personal documents online.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm font-semibold text-[#0f1f12]">
                  2. Essential Functional Storage
                </h4>
                <p>
                  We use essential browser storage solely to remember your cookie banner choice and support smooth media playback on this site.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm font-semibold text-[#0f1f12]">
                  3. Third-Party Links &amp; Maps
                </h4>
                <p>
                  When you click external links to Google Maps, WhatsApp, Instagram, Facebook, Tripadvisor or Justdial, those third-party platforms operate under their own privacy policies.
                </p>
              </div>
              <div className="space-y-2.5 pt-2 border-t border-[#14531e]/15">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-[#0f1f12]">
                    Manage Storage &amp; Audio Preferences
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#14531e]/10 text-[#14531e] font-medium">
                    {cookieState?.level === 'essential'
                      ? 'Essential Only'
                      : cookieState?.level === 'custom'
                        ? 'Custom'
                        : cookieState?.level === 'all'
                          ? 'All Enabled'
                          : 'Not Set'}
                  </span>
                </div>

                <label className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#f7f6f1] border border-[#14531e]/15 cursor-pointer">
                  <div>
                    <span className="text-xs font-semibold text-[#0f1f12] block">
                      Interactive Click Audio &amp; Media Preferences
                    </span>
                    <span className="text-[11px] text-[#0f1f12]/65 block">
                      Controls subtle button click feedback and saved display preferences.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookieState?.mediaAndAudio ?? true}
                    onChange={(e) => {
                      const enabled = e.target.checked;
                      const updated = saveCookieConsent(
                        enabled ? 'all' : 'essential',
                        enabled,
                        enabled
                      );
                      setCookieState(updated);
                      setCookieSavedNotice(true);
                    }}
                    className="w-4 h-4 accent-[#14531e] cursor-pointer shrink-0"
                  />
                </label>

                {cookieSavedNotice && (
                  <p className="text-[11px] text-[#14531e] font-medium">
                    Preferences updated and saved cleanly.
                  </p>
                )}
              </div>
            </div>

            <div className="shrink-0 p-4 sm:p-5 border-t border-[#14531e]/15 bg-[#f7f6f1] flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] text-[#0f1f12]/55">
                The Green Heritage Resort and Banquet · Muzaffarpur
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const updated = saveCookieConsent('all', true, true);
                    setCookieState(updated);
                    setCookieSavedNotice(true);
                  }}
                  className="px-4 py-2 rounded-full bg-white hover:bg-[#14531e]/10 border border-[#14531e]/25 text-[#0f1f12] text-[11px] uppercase tracking-wider font-medium transition-colors cursor-pointer"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={handleCloseCookieModal}
                  className="px-5 py-2 rounded-full bg-[#14531e] hover:bg-[#0c3a14] text-white text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
