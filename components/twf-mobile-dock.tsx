'use client';

import React from 'react';
import { Home, Phone, Images, MessageSquare, Menu } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/masoom-data';
import { PageId } from './twf-sidebar';
import { WhatsAppMinimalIcon } from './twf-icons';

interface TwfMobileDockProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenQuickEnquire?: (service?: string) => void;
  onOpenMenu?: () => void;
}

export function TwfMobileDock({
  activePage,
  onNavigate,
  onOpenQuickEnquire,
  onOpenMenu,
}: TwfMobileDockProps) {
  return (
    <nav
      aria-label="Smartphone quick navigation dock"
      className="sm:hidden fixed bottom-[max(14px,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 select-none pointer-events-auto"
    >
      <div className="flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 py-1.5 rounded-full bg-[#061208]/92 backdrop-blur-xl border border-[#f0b400]/35 shadow-[0_12px_36px_rgba(0,0,0,0.65)]">
        {/* 1. Home Icon */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          aria-label="Home"
          title="Home"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer ${
            activePage === 'home'
              ? 'bg-[#f0b400]/20 text-[#f0b400]'
              : 'text-[#f7f6f1]/80 hover:text-[#f0b400]'
          }`}
        >
          <Home className="w-5 h-5" />
        </button>

        {/* 2. Direct Call Icon */}
        <a
          href={STUDIO_INFO.phonePrimaryUrl}
          aria-label={`Call ${STUDIO_INFO.phoneNumber}`}
          title={`Call ${STUDIO_INFO.phoneNumber}`}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#f7f6f1]/80 hover:text-[#f0b400] active:scale-90 transition-all cursor-pointer"
        >
          <Phone className="w-5 h-5 text-[#f0b400]" />
        </a>

        {/* 3. WhatsApp Icon */}
        <a
          href={STUDIO_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat on WhatsApp with ${STUDIO_INFO.phoneNumber}`}
          title="Chat on WhatsApp"
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#25D366] hover:brightness-110 active:scale-90 transition-all cursor-pointer"
        >
          <WhatsAppMinimalIcon className="w-5 h-5" />
        </a>

        {/* 4. Gallery / Wedding Films Icon */}
        <button
          type="button"
          onClick={() => onNavigate('films')}
          aria-label="View Wedding Films & Gallery"
          title="Wedding Films & Gallery"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer ${
            activePage === 'films'
              ? 'bg-[#f0b400]/20 text-[#f0b400]'
              : 'text-[#f7f6f1]/80 hover:text-[#f0b400]'
          }`}
        >
          <Images className="w-5 h-5" />
        </button>

        {/* 5. Quick Enquiry Icon */}
        <button
          type="button"
          onClick={() => onOpenQuickEnquire?.()}
          aria-label="Quick Enquiry"
          title="Quick Enquiry"
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#f7f6f1]/80 hover:text-[#f0b400] active:scale-90 transition-all cursor-pointer"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        {/* 6. Navigation Menu Icon */}
        <button
          type="button"
          onClick={() => onOpenMenu?.()}
          aria-label="Open Navigation Menu"
          title="Navigation Menu"
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#f7f6f1]/80 hover:text-[#f0b400] active:scale-90 transition-all cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
