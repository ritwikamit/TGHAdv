'use client';

import React from 'react';
import { Phone, Images } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/masoom-data';
import { PageId } from './twf-sidebar';
import { WhatsAppMinimalIcon } from './twf-icons';

interface TwfMobileDockProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenQuickEnquire?: (service?: string) => void;
}

export function TwfMobileDock({
  activePage,
  onNavigate,
}: TwfMobileDockProps) {
  return (
    <nav
      aria-label="Smartphone quick navigation dock"
      className="sm:hidden fixed bottom-[max(14px,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 select-none pointer-events-auto"
    >
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#061208]/92 backdrop-blur-xl border border-[#f0b400]/40 shadow-[0_12px_36px_rgba(0,0,0,0.7)]">
        {/* 1. Direct Call Icon */}
        <a
          href={STUDIO_INFO.phonePrimaryUrl}
          aria-label={`Call ${STUDIO_INFO.phoneNumber}`}
          title={`Call ${STUDIO_INFO.phoneNumber}`}
          className="w-11 h-11 rounded-full flex items-center justify-center text-white/90 hover:text-[#f0b400] active:scale-90 transition-transform cursor-pointer"
        >
          <Phone className="w-5 h-5 text-[#f0b400]" />
        </a>

        {/* 2. WhatsApp Icon (Prominent Center Emerald Pill) */}
        <a
          href={STUDIO_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat on WhatsApp with ${STUDIO_INFO.phoneNumber}`}
          title="Chat on WhatsApp"
          className="w-12 h-12 rounded-full bg-[#14531e] hover:bg-[#1b6d28] border border-[#f0b400]/60 flex items-center justify-center text-white shadow-lg active:scale-95 transition-all cursor-pointer group"
        >
          <WhatsAppMinimalIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        </a>

        {/* 3. Gallery / Wedding Films Icon */}
        <button
          type="button"
          onClick={() => onNavigate('films')}
          aria-label="View Wedding Films & Photo Gallery"
          title="Wedding Films & Gallery"
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer ${
            activePage === 'films'
              ? 'bg-[#f0b400] text-[#061208]'
              : 'text-white/90 hover:text-[#f0b400]'
          }`}
        >
          <Images className={`w-5 h-5 ${activePage === 'films' ? 'text-[#061208]' : 'text-[#f0b400]'}`} />
        </button>
      </div>
    </nav>
  );
}
