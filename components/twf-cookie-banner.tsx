'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, SlidersHorizontal, X, Check } from 'lucide-react';

interface TwfCookieBannerProps {
  onOpenCookiePolicy: () => void;
}

export const COOKIE_STORAGE_KEY = 'tgh_resort_cookie_consent_v1';
export const COOKIE_EVENT_UPDATE = 'tgh:cookie-updated';
export const COOKIE_EVENT_REOPEN = 'tgh:open-cookie-banner';

export interface CookieConsentState {
  essential: true;
  mediaAndAudio: boolean;
  preferences: boolean;
  level: 'all' | 'essential' | 'custom';
  updatedAt: string;
}

export function readCookieConsent(): CookieConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!raw) return null;
    if (raw === 'all') {
      return {
        essential: true,
        mediaAndAudio: true,
        preferences: true,
        level: 'all',
        updatedAt: new Date().toISOString(),
      };
    }
    if (raw === 'essential') {
      return {
        essential: true,
        mediaAndAudio: false,
        preferences: false,
        level: 'essential',
        updatedAt: new Date().toISOString(),
      };
    }
    const parsed = JSON.parse(raw) as Partial<CookieConsentState>;
    return {
      essential: true,
      mediaAndAudio: parsed.mediaAndAudio ?? true,
      preferences: parsed.preferences ?? true,
      level: parsed.level || 'custom',
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function saveCookieConsent(
  level: 'all' | 'essential' | 'custom',
  mediaAndAudio: boolean,
  preferences: boolean
): CookieConsentState {
  const payload: CookieConsentState = {
    essential: true,
    mediaAndAudio,
    preferences,
    level,
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(payload));
    localStorage.setItem('tgh_cookies_accepted', 'true');
    document.cookie = `${COOKIE_STORAGE_KEY}=${encodeURIComponent(
      level
    )}; path=/; max-age=31536000; SameSite=Lax`;
    window.dispatchEvent(new CustomEvent(COOKIE_EVENT_UPDATE, { detail: payload }));
  } catch {
    // noop
  }
  return payload;
}

export function TwfCookieBanner({ onOpenCookiePolicy }: TwfCookieBannerProps) {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [mediaAudioPref, setMediaAudioPref] = useState(true);
  const [uiPref, setUiPref] = useState(true);

  useEffect(() => {
    let t: NodeJS.Timeout;
    const saved = readCookieConsent();
    if (!saved) {
      t = setTimeout(() => setVisible(true), 700);
    } else {
      t = setTimeout(() => {
        setMediaAudioPref(saved.mediaAndAudio);
        setUiPref(saved.preferences);
      }, 0);
    }

    const onReopen = () => {
      const current = readCookieConsent();
      if (current) {
        setMediaAudioPref(current.mediaAndAudio);
        setUiPref(current.preferences);
      }
      setShowCustomize(true);
      setVisible(true);
    };

    window.addEventListener(COOKIE_EVENT_REOPEN, onReopen);
    return () => {
      if (t) clearTimeout(t);
      window.removeEventListener(COOKIE_EVENT_REOPEN, onReopen);
    };
  }, []);

  const handleSave = (
    level: 'all' | 'essential' | 'custom',
    media: boolean,
    prefs: boolean
  ) => {
    saveCookieConsent(level, media, prefs);
    setShowCustomize(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-[90] w-[calc(100vw-20px)] max-w-2xl px-4 py-3.5 sm:px-6 sm:py-4 rounded-[20px] bg-[#09180c]/96 text-white backdrop-blur-md border border-[#f0b400]/35 shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-all duration-300 ease-out"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#14531e]/45 border border-[#f0b400]/50 flex items-center justify-center shrink-0">
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
              We use essential storage for navigation plus optional sound &amp; display preferences.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleSave('all', true, true)}
            className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#14531e] hover:bg-[#1b6d28] border border-[#f0b400]/50 active:scale-95 text-white text-[10px] sm:text-[11px] uppercase tracking-wider font-medium transition-all shadow-md shadow-[#14531e]/35 cursor-pointer"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={() => handleSave('essential', false, false)}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/95 text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
          >
            Essential
          </button>
          <button
            type="button"
            onClick={() => setShowCustomize((prev) => !prev)}
            aria-expanded={showCustomize}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white/85 text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3 h-3 text-[#f0b400]" />
            <span>Manage</span>
          </button>
          <button
            type="button"
            onClick={onOpenCookiePolicy}
            className="px-2 py-1.5 text-white/75 hover:text-white text-[11px] underline underline-offset-4 transition-colors cursor-pointer"
          >
            Policy
          </button>
          <button
            type="button"
            onClick={() => handleSave('essential', false, false)}
            aria-label="Close and use essential storage only"
            className="text-white/55 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showCustomize && (
        <div className="mt-3 pt-3 border-t border-white/10 space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10">
              <div className="min-w-0">
                <span className="text-xs font-medium text-white block">
                  Essential Navigation &amp; Forms
                </span>
                <span className="text-[10px] text-white/60 block">
                  Always active for core site security &amp; routing
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#14531e]/70 border border-[#f0b400]/40 text-[9px] uppercase tracking-wider text-[#f0b400] shrink-0">
                <Check className="w-2.5 h-2.5" /> On
              </span>
            </div>

            <label className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 cursor-pointer">
              <div className="min-w-0">
                <span className="text-xs font-medium text-white block">
                  Interactive Click Audio &amp; Media Prefs
                </span>
                <span className="text-[10px] text-white/60 block">
                  Soft button click pop &amp; visual settings
                </span>
              </div>
              <input
                type="checkbox"
                checked={mediaAudioPref}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setMediaAudioPref(checked);
                  setUiPref(checked);
                }}
                className="w-4 h-4 accent-[#f0b400] cursor-pointer shrink-0"
              />
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleSave('custom', mediaAudioPref, uiPref)}
              className="px-4 py-1.5 rounded-full bg-[#f0b400] hover:bg-[#fae06b] text-[#061208] text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
