'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface TwfCookieBannerProps {
  onOpenCookiePolicy: () => void;
}

const COOKIE_STORAGE_KEY = 'tgh_resort_cookie_consent_v1';

export function TwfCookieBanner({ onOpenCookiePolicy }: TwfCookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let t: NodeJS.Timeout;
    try {
      const savedConsent = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!savedConsent) {
        t = setTimeout(() => setVisible(true), 600);
      }
    } catch {
      t = setTimeout(() => setVisible(true), 600);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, []);

  const savePreference = (level: 'all' | 'essential') => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, level);
      localStorage.setItem('tgh_cookies_accepted', 'true');
      document.cookie = `${COOKIE_STORAGE_KEY}=${level}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // noop
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-[90] w-[calc(100vw-24px)] max-w-2xl px-4 py-3.5 sm:px-6 sm:py-4 rounded-[20px] bg-[#09180c]/95 text-white backdrop-blur-2xl border border-[#f0b400]/30 shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-all duration-500 ease-out animate-in fade-in slide-in-from-top-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#14531e]/40 border border-[#f0b400]/50 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#f0b400]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4
                className="text-sm sm:text-base font-medium text-white leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Cookie &amp; Privacy Preferences
              </h4>
              <span
                className="text-sm text-[#f0b400] hidden sm:inline"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                clear &amp; minimal storage
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-white/75 leading-relaxed font-light mt-0.5">
              We use essential browser storage for smooth media playback and to remember your display preferences.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={() => savePreference('all')}
            className="px-4 py-1.5 sm:py-2 rounded-full bg-[#14531e] hover:bg-[#1b6d28] border border-[#f0b400]/50 active:scale-95 text-white text-[10px] sm:text-[11px] uppercase tracking-wider font-medium transition-all shadow-md shadow-[#14531e]/35 cursor-pointer"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={() => savePreference('essential')}
            className="px-3.5 py-1.5 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/95 text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
          >
            Essential
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenCookiePolicy();
            }}
            className="px-2.5 py-1.5 text-white/75 hover:text-white text-[11px] underline underline-offset-4 transition-colors cursor-pointer"
          >
            Policy
          </button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Dismiss cookie banner"
            className="text-white/50 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
