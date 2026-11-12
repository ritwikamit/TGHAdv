'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Trees,
  Calendar,
  Phone,
  PhoneCall,
  Mail,
  X,
  Navigation,
  ArrowUpRight,
} from 'lucide-react';
import { STUDIO_INFO } from '@/lib/masoom-data';
import { PageId } from './twf-sidebar';
import { WhatsAppMinimalIcon } from './twf-icons';

interface TwfMobileDockProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenQuickEnquire: (service?: string) => void;
}

export function TwfMobileDock({
  activePage,
  onNavigate,
  onOpenQuickEnquire,
}: TwfMobileDockProps) {
  const [callMenuOpen, setCallMenuOpen] = useState(false);

  // Close Quick Call Menu on Escape key
  useEffect(() => {
    if (!callMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCallMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [callMenuOpen]);

  const handleNav = (page: PageId) => {
    setCallMenuOpen(false);
    onNavigate(page);
  };

  const leftItems: {
    id: PageId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'Venue', icon: Trees },
  ];

  return (
    <div className="sm:hidden">
      {/* Backdrop Scrim when Quick Call Menu is open */}
      <AnimatePresence>
        {callMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={() => setCallMenuOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-30 bg-black/55 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* Floating Bottom Container (Two Aesthetic Flanking Cylinders + Centered Circular Call Icon) */}
      <nav
        aria-label="Smartphone quick navigation bar"
        className="fixed inset-x-0 bottom-[max(10px,env(safe-area-inset-bottom))] z-40 px-3 flex flex-col items-center pointer-events-none select-none"
      >
        {/* QUICK CALL POPOVER MENU (Opens above centered circular Call button) */}
        <AnimatePresence>
          {callMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 440, damping: 32 }}
              role="dialog"
              aria-label="Quick Call and Contact Menu"
              className="pointer-events-auto mb-3 w-[min(calc(100vw-24px),340px)] rounded-[24px] bg-[#07160a]/96 backdrop-blur-md border border-[#f0b400]/40 shadow-[0_24px_56px_rgba(0,0,0,0.78)] p-3.5 text-[#f7f6f1] space-y-2.5"
            >
              {/* Popover Header */}
              <div className="flex items-center justify-between gap-2 px-1 pb-2 border-b border-white/10">
                <div className="min-w-0">
                  <span
                    className="text-lg text-[#f0b400] block leading-none"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    Quick Call Desk
                  </span>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/65 mt-0.5 truncate">
                    The Green Heritage · Muzaffarpur
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCallMenuOpen(false)}
                  aria-label="Close quick call menu"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#14531e] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Direct Call Button */}
              <a
                href={STUDIO_INFO.phonePrimaryUrl}
                onClick={() => setCallMenuOpen(false)}
                className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl bg-[#14531e] hover:bg-[#1b6d28] border border-[#f0b400]/45 shadow-lg shadow-[#14531e]/35 transition-transform active:scale-[0.98]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-full bg-[#f0b400] text-[#061208] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-white block">
                      Call {STUDIO_INFO.phoneNumber}
                    </span>
                    <span className="text-[10px] text-white/75 block truncate">
                      Speak directly with our wedding desk
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#f0b400] shrink-0" />
              </a>

              {/* WhatsApp & Email Row */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={STUDIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCallMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl bg-white/[0.07] hover:bg-[#14531e]/75 border border-white/15 transition-colors active:scale-[0.98]"
                >
                  <span className="w-8 h-8 rounded-full bg-[#14531e]/55 border border-[#f0b400]/35 flex items-center justify-center shrink-0">
                    <WhatsAppMinimalIcon className="w-3.5 h-3.5 text-[#f0b400]" />
                  </span>
                  <div className="min-w-0">
                    <span className="text-[11px] font-medium text-white block leading-tight">
                      WhatsApp
                    </span>
                    <span className="text-[9px] text-white/60 block leading-tight mt-0.5">
                      Instant chat
                    </span>
                  </div>
                </a>

                <a
                  href={STUDIO_INFO.emailUrl}
                  onClick={() => setCallMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl bg-white/[0.07] hover:bg-[#14531e]/75 border border-white/15 transition-colors active:scale-[0.98]"
                >
                  <span className="w-8 h-8 rounded-full bg-[#14531e]/55 border border-[#f0b400]/35 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-[#f0b400]" />
                  </span>
                  <div className="min-w-0">
                    <span className="text-[11px] font-medium text-white block leading-tight">
                      Email Desk
                    </span>
                    <span className="text-[9px] text-white/60 block leading-tight mt-0.5">
                      Mail form
                    </span>
                  </div>
                </a>
              </div>

              {/* Book / Enquire + Google Maps Directions Row */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCallMenuOpen(false);
                    onOpenQuickEnquire('Quick Mobile Call Enquiry');
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-[10px] uppercase tracking-wider font-medium text-white transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#f0b400]" />
                  <span>Enquire Dates</span>
                </button>

                <a
                  href={STUDIO_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCallMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-[10px] uppercase tracking-wider font-medium text-white transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#f0b400]" />
                  <span>Directions</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SYMMETRIC SPLIT-CYLINDER DOCK: [Home · Venue]  (Call)  [WhatsApp · Contact] */}
        <div className="w-full max-w-[356px] flex items-center justify-center gap-2">
          {/* LEFT CYLINDER: Home + Venue */}
          <div className="pointer-events-auto flex-1 min-w-0 h-[52px] rounded-full bg-gradient-to-b from-[#0b1f0f]/95 to-[#061208]/98 backdrop-blur-md border border-[#f0b400]/35 shadow-[0_12px_26px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.14)] px-1.5 grid grid-cols-2 gap-1 items-center">
            {leftItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  aria-label={item.label}
                  className={`h-[40px] rounded-full flex flex-col items-center justify-center gap-0.5 transition-all duration-150 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-[#14531e] text-[#f0b400] border border-[#f0b400]/45 shadow-[0_2px_10px_rgba(20,83,30,0.6)]'
                      : 'text-white/85 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon
                    className={`w-[16px] h-[16px] ${
                      isActive ? 'text-[#f0b400]' : 'text-white/95'
                    }`}
                  />
                  <span className="text-[9px] font-medium tracking-wide leading-none">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* CENTER FLOATING CIRCULAR CALL BUTTON */}
          <div className="pointer-events-auto relative shrink-0 -my-1.5">
            <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-[#a77300] via-[#fae06b] to-[#1b6d28] shadow-[0_10px_24px_rgba(0,0,0,0.6),0_0_18px_rgba(240,180,0,0.3)]">
              <button
                type="button"
                onClick={() => setCallMenuOpen((prev) => !prev)}
                aria-expanded={callMenuOpen}
                aria-label="Open quick call menu"
                className={`relative z-10 w-[56px] h-[56px] rounded-full flex flex-col items-center justify-center gap-0.5 transition-transform duration-150 cursor-pointer active:scale-90 ${
                  callMenuOpen
                    ? 'bg-[#f0b400] text-[#061208]'
                    : 'bg-gradient-to-br from-[#1d752b] via-[#14531e] to-[#081d0c] text-[#f0b400]'
                }`}
              >
                {callMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <>
                    <PhoneCall className="w-[18px] h-[18px]" />
                    <span className="text-[8px] uppercase tracking-[0.12em] font-semibold leading-none text-white/95">
                      Call
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT CYLINDER: WhatsApp + Contact */}
          <div className="pointer-events-auto flex-1 min-w-0 h-[52px] rounded-full bg-gradient-to-b from-[#0b1f0f]/95 to-[#061208]/98 backdrop-blur-md border border-[#f0b400]/35 shadow-[0_12px_26px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.14)] px-1.5 grid grid-cols-2 gap-1 items-center">
            <a
              href={STUDIO_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setCallMenuOpen(false)}
              aria-label="Chat on WhatsApp"
              className="h-[40px] rounded-full flex flex-col items-center justify-center gap-0.5 text-white/90 hover:text-[#f0b400] hover:bg-white/[0.06] transition-all duration-150 cursor-pointer active:scale-95"
            >
              <WhatsAppMinimalIcon className="w-[16px] h-[16px] text-[#f0b400]" />
              <span className="text-[9px] font-medium tracking-wide leading-none">
                WhatsApp
              </span>
            </a>

            <button
              type="button"
              onClick={() => handleNav('contact')}
              aria-label="Contact & Visit"
              className={`h-[40px] rounded-full flex flex-col items-center justify-center gap-0.5 transition-all duration-150 cursor-pointer active:scale-95 ${
                activePage === 'contact'
                  ? 'bg-[#14531e] text-[#f0b400] border border-[#f0b400]/45 shadow-[0_2px_10px_rgba(20,83,30,0.6)]'
                  : 'text-white/85 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <Mail
                className={`w-[16px] h-[16px] ${
                  activePage === 'contact' ? 'text-[#f0b400]' : 'text-white/95'
                }`}
              />
              <span className="text-[9px] font-medium tracking-wide leading-none">
                Contact
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
