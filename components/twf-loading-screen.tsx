'use client';

import React, { useState, useEffect, useCallback } from 'react';

const SESSION_LOADED_KEY = 'tgh_resort_intro_seen_v1';

export function TwfLoadingScreen() {
  const [progress, setProgress] = useState(25);
  const [statusLabel, setStatusLabel] = useState('Preparing Sanctuary');
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  const dismissLoader = useCallback(() => {
    setProgress(100);
    setStatusLabel('Ready');
    setIsLoading(false);
    try {
      sessionStorage.setItem(SESSION_LOADED_KEY, '1');
    } catch {
      // noop
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const cleanup = window.setTimeout(() => setShouldRender(false), 450);
      return () => window.clearTimeout(cleanup);
    }
  }, [isLoading]);

  useEffect(() => {
    let seenBefore = false;
    try {
      seenBefore = sessionStorage.getItem(SESSION_LOADED_KEY) === '1';
    } catch {
      seenBefore = false;
    }

    // Subsequent navigations/reloads in the same session dismiss super fast
    if (seenBefore) {
      const initQuick = window.setTimeout(() => {
        setProgress(90);
        setStatusLabel('Welcome Back');
      }, 0);
      const quickTimer = window.setTimeout(dismissLoader, 240);
      return () => {
        window.clearTimeout(initQuick);
        window.clearTimeout(quickTimer);
      };
    }

    let cancelled = false;
    let maxCapTimer: number | null = null;
    let finishTimer: number | null = null;

    const completeWhenReady = () => {
      if (cancelled) return;
      setProgress(100);
      setStatusLabel('Welcome to The Green Heritage');
      finishTimer = window.setTimeout(() => {
        if (!cancelled) dismissLoader();
      }, 220);
    };

    // Track real document + font readiness on initial arrival
    const stepTimer = window.setTimeout(() => {
      if (!cancelled) {
        setProgress((prev) => Math.max(prev, 62));
        setStatusLabel('Loading Resort Media');
      }
    }, 180);

    const fontsPromise =
      typeof document !== 'undefined' && document.fonts?.ready
        ? document.fonts.ready.catch(() => undefined)
        : Promise.resolve();

    const docReadyPromise = new Promise<void>((resolve) => {
      if (typeof document === 'undefined' || document.readyState !== 'loading') {
        resolve();
        return;
      }
      const onDomReady = () => {
        document.removeEventListener('DOMContentLoaded', onDomReady);
        resolve();
      };
      document.addEventListener('DOMContentLoaded', onDomReady);
    });

    Promise.all([fontsPromise, docReadyPromise]).then(() => {
      if (cancelled) return;
      setProgress((prev) => Math.max(prev, 88));
      completeWhenReady();
    });

    // Safety cap ensures slow networks never stall the user behind the splash screen
    maxCapTimer = window.setTimeout(completeWhenReady, 850);

    return () => {
      cancelled = true;
      window.clearTimeout(stepTimer);
      if (maxCapTimer !== null) window.clearTimeout(maxCapTimer);
      if (finishTimer !== null) window.clearTimeout(finishTimer);
    };
  }, [dismissLoader]);

  if (!shouldRender) return null;

  return (
    <aside
      aria-label="Loading The Green Heritage Resort and Banquet"
      aria-busy={isLoading}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#061208] transition-opacity duration-400 ease-out ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center justify-center space-y-5 px-6 text-center select-none max-w-xs w-full">
        {/* Resort Brand Emblem */}
        <div className="relative">
          <img
            src="/TGHLogo.png"
            alt="The Green Heritage Resort and Banquet"
            loading="eager"
            decoding="sync"
            className="w-48 sm:w-64 md:w-[300px] h-auto aspect-[3/2] object-contain drop-shadow-[0_0_20px_rgba(247,246,241,0.42)]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Real Progress Bar & Status Text */}
        <div className="w-full max-w-[220px] space-y-2.5">
          <div className="flex items-center justify-between text-[10px] tracking-[0.24em] uppercase text-[#f7f6f1]/75 font-light">
            <span>{statusLabel}</span>
            <span className="text-[#f0b400] tabular-nums font-medium">{progress}%</span>
          </div>

          <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#1b6d28] via-[#f0b400] to-[#fae06b] transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Functional Skip Trigger */}
        <button
          type="button"
          onClick={dismissLoader}
          className="mt-1 px-4 py-1.5 rounded-full bg-white/5 hover:bg-[#14531e]/80 border border-white/15 hover:border-[#f0b400]/45 text-[10px] uppercase tracking-[0.2em] text-white/75 hover:text-white transition-colors cursor-pointer"
        >
          Enter Resort &rarr;
        </button>
      </div>
    </aside>
  );
}
