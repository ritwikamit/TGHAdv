'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export function TwfScrollProgress() {
  const [visible, setVisible] = useState(false);
  const progressCircleRef = useRef<SVGCircleElement | null>(null);
  const visibleRef = useRef(false);

  // SVG circular perimeter
  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      rafId = null;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress =
        scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;

      if (progressCircleRef.current) {
        const dashOffset = circumference - progress * circumference;
        progressCircleRef.current.style.strokeDashoffset = `${dashOffset.toFixed(2)}`;
      }

      const nextVisible = scrollTop > 120;
      if (nextVisible !== visibleRef.current) {
        visibleRef.current = nextVisible;
        setVisible(nextVisible);
      }
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [circumference]);

  const scrollToTop = () => {
    const startY = window.scrollY || document.documentElement.scrollTop || 0;
    if (startY <= 0) return;
    const duration = Math.min(820, Math.max(420, startY * 0.22));
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Silky quartic ease-out curve
      const easeOut = 1 - Math.pow(1 - t, 4);
      window.scrollTo(0, startY * (1 - easeOut));
      if (t < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <div
      className={`fixed bottom-[calc(82px+env(safe-area-inset-bottom))] right-3 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        title="Scroll to top"
        className="group relative w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#09190c]/95 backdrop-blur-md text-white flex items-center justify-center shadow-2xl border border-[#f0b400]/25 transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
      >
        {/* SVG Circular Border that fills with scroll down and empties on scroll up */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1"
          viewBox="0 0 52 52"
        >
          {/* Subtle background track */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="3"
          />
          {/* Active progress ring */}
          <circle
            ref={progressCircleRef}
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke="#f0b400"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{ transition: 'stroke-dashoffset 60ms linear' }}
          />
        </svg>

        {/* Arrow Up Icon with subtle upward glide on hover */}
        <ArrowUp className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#f0b400] group-hover:-translate-y-0.5 transition-transform duration-200" />
      </button>
    </div>
  );
}
