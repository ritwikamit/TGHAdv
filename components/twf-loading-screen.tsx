'use client';

import React, { useState, useEffect } from 'react';

export function TwfLoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Elegant, fast entrance and clean exit
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1150);

    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 1700);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <aside
      aria-label="Loading The Green Heritage Resort and Banquet"
      aria-busy={isLoading}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#061208] transition-opacity duration-600 ease-out ${isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
    >
      <div className="flex flex-col items-center justify-center space-y-6 px-6 text-center select-none">
        {/* Big The Green Heritage Logo */}
        <div className="relative">
          <img
            src="/TGHLogo.png"
            alt="The Green Heritage Resort and Banquet"
            className="w-56 sm:w-72 md:w-[340px] h-auto aspect-[3/2] object-contain drop-shadow-[0_0_22px_rgba(247,246,241,0.48)] transition-transform duration-700 ease-out scale-100 animate-pulse"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Minimal Loading Text */}
        <div className="space-y-1.5">
          <p
            className="text-xs sm:text-sm tracking-[0.35em] uppercase text-[#f7f6f1]/80 font-light inline-flex items-baseline justify-center"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <span>Loading</span>
            <span className="inline-flex items-baseline tracking-[0.2em] ml-0.5" aria-hidden="true">
              <span className="animate-loading-dot-1">.</span>
              <span className="animate-loading-dot-2">.</span>
              <span className="animate-loading-dot-3">.</span>
            </span>
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#f0b400] to-transparent mx-auto rounded-full" />
        </div>
      </div>
    </aside>
  );
}
