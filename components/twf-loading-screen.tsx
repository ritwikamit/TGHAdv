'use client';

import React, { useState, useEffect, useCallback } from 'react';

const MIN_SPLASH_MS = 2000;
const MAX_WAIT_MS = 6500;
const CRITICAL_PRELOAD_IMAGES = [
  '/TGHLogo.png',
  '/reels/posters/DSG3HcWEcov.jpg',
  '/globe/earth-blue-marble.jpg',
  '/globe/earth-topology.png',
  '/globe/earth-water.png',
];

export function TwfLoadingScreen() {
  const [progress, setProgress] = useState(14);
  const [statusLabel, setStatusLabel] = useState('Preparing Sanctuary');
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  const dismissLoader = useCallback(() => {
    setProgress(100);
    setStatusLabel('Ready');
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const cleanup = window.setTimeout(() => setShouldRender(false), 450);
      return () => window.clearTimeout(cleanup);
    }
  }, [isLoading]);

  useEffect(() => {
    let cancelled = false;
    const startTime = performance.now();
    let docComplete = typeof document !== 'undefined' && document.readyState === 'complete';
    let fontsReady = false;
    let mediaReady = false;
    let globeReady = false;
    let finishTimer: number | null = null;

    const tryFinish = () => {
      if (cancelled) return;
      const elapsed = performance.now() - startTime;
      const allLoaded = docComplete && fontsReady && mediaReady && globeReady;
      if (elapsed >= MIN_SPLASH_MS && allLoaded) {
        setProgress(100);
        setStatusLabel('Welcome to The Green Heritage');
        finishTimer = window.setTimeout(() => {
          if (!cancelled) dismissLoader();
        }, 160);
      } else if (elapsed < MIN_SPLASH_MS && allLoaded) {
        const remaining = Math.ceil(MIN_SPLASH_MS - elapsed);
        if (finishTimer !== null) window.clearTimeout(finishTimer);
        finishTimer = window.setTimeout(tryFinish, remaining + 10);
      }
    };

    const onWindowLoad = () => {
      docComplete = true;
      tryFinish();
    };

    if (!docComplete && typeof window !== 'undefined') {
      window.addEventListener('load', onWindowLoad, { once: true });
    }

    const onGlobeReady = () => {
      globeReady = true;
      tryFinish();
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('tgh:globe-ready', onGlobeReady, { once: true });
    }

    // Warm fonts, globe bundle, globe textures, and hero poster during the >= 2s splash
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready
        .catch(() => undefined)
        .finally(() => {
          fontsReady = true;
          tryFinish();
        });
    } else {
      fontsReady = true;
    }

    import('globe.gl').catch(() => undefined);

    Promise.all(
      CRITICAL_PRELOAD_IMAGES.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          })
      )
    ).then(() => {
      mediaReady = true;
      tryFinish();
    });

    // Fallback in case globe WebGL is unsupported or a third-party resource stalls
    const globeGraceTimer = window.setTimeout(() => {
      globeReady = true;
      tryFinish();
    }, 3200);

    const maxCapTimer = window.setTimeout(() => {
      docComplete = true;
      fontsReady = true;
      mediaReady = true;
      globeReady = true;
      tryFinish();
    }, MAX_WAIT_MS);

    // Smooth real-time progress bar tracking elapsed time + asset milestones
    const ticker = window.setInterval(() => {
      if (cancelled) return;
      const elapsedRatio = Math.min(1, (performance.now() - startTime) / MIN_SPLASH_MS);
      const milestoneBonus =
        (docComplete ? 10 : 0) +
        (fontsReady ? 5 : 0) +
        (mediaReady ? 12 : 0) +
        (globeReady ? 10 : 0);
      const computed = Math.min(97, Math.round(14 + elapsedRatio * 46 + milestoneBonus));
      setProgress((prev) => Math.max(prev, computed));
      if (elapsedRatio < 0.45) {
        setStatusLabel('Preparing Sanctuary');
      } else if (!mediaReady || !globeReady) {
        setStatusLabel('Loading Visuals & Globe');
      } else {
        setStatusLabel('Almost Ready');
      }
    }, 90);

    return () => {
      cancelled = true;
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', onWindowLoad);
        window.removeEventListener('tgh:globe-ready', onGlobeReady);
      }
      window.clearInterval(ticker);
      window.clearTimeout(globeGraceTimer);
      window.clearTimeout(maxCapTimer);
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
