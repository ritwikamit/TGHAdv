'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { TwfSidebar, PageId } from '@/components/twf-sidebar';
import { TwfHeroSlider } from '@/components/twf-hero-slider';
import { TwfHomeSections } from '@/components/twf-home-sections';
import { TwfInnerPages } from '@/components/twf-inner-pages';
import { TwfFooterAndModals } from '@/components/twf-footer-and-modals';
import { TwfLoadingScreen } from '@/components/twf-loading-screen';
import { TwfCookieBanner } from '@/components/twf-cookie-banner';
import { TwfScrollProgress } from '@/components/twf-scroll-progress';
import { TwfMobileDock } from '@/components/twf-mobile-dock';
import { CinemaFilm, PhotoFrame } from '@/lib/masoom-data';
import { PAGE_ROUTES, getPageIdFromPath } from '@/lib/site-routes';

interface GreenHeritageResortAppProps {
  initialPage?: PageId;
}

export function GreenHeritageResortApp({
  initialPage = 'home',
}: GreenHeritageResortAppProps) {
  const [activePage, setActivePage] = useState<PageId>(initialPage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilm, setActiveFilm] = useState<CinemaFilm | null>(null);
  const [activePhoto, setActivePhoto] = useState<PhotoFrame | null>(null);
  const [quickEnquireOpen, setQuickEnquireOpen] = useState(false);
  const [cookiePolicyOpen, setCookiePolicyOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(
    undefined
  );

  // Sync page state on browser back/forward navigation & keep document title accurate
  useEffect(() => {
    const route = PAGE_ROUTES[activePage];
    if (route && typeof document !== 'undefined') {
      document.title = route.title;
    }
  }, [activePage]);

  useEffect(() => {
    const onPopState = () => {
      setActivePage(getPageIdFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Silky quartic ease-out scroll-to-top helper on menu navigation
  const smoothScrollToTop = useCallback(() => {
    if (typeof window === 'undefined') return;
    const startY = window.scrollY || document.documentElement.scrollTop || 0;
    if (startY <= 4) {
      window.scrollTo(0, 0);
      return;
    }
    const duration = Math.min(480, Math.max(240, startY * 0.14));
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const easeOut = 1 - Math.pow(1 - t, 4);
      window.scrollTo(0, startY * (1 - easeOut));
      if (t < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, []);

  const handleNavigate = (page: PageId) => {
    const targetPath = PAGE_ROUTES[page]?.path || '/';
    if (
      typeof window !== 'undefined' &&
      window.location.pathname !== targetPath
    ) {
      window.history.pushState(null, '', targetPath);
    }
    if (page === activePage) {
      smoothScrollToTop();
      return;
    }
    setActivePage(page);
    smoothScrollToTop();
  };

  const handleSearchSubmit = (q: string) => {
    setSearchQuery(q);
    if (activePage !== 'films') {
      if (
        typeof window !== 'undefined' &&
        window.location.pathname !== PAGE_ROUTES.films.path
      ) {
        window.history.pushState(null, '', PAGE_ROUTES.films.path);
      }
      setActivePage('films');
      smoothScrollToTop();
    }
  };

  const handleOpenQuickEnquire = (service?: string) => {
    setPreselectedService(service);
    setQuickEnquireOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-[#061208] text-[#0f1f12] selection:bg-[#14531e] selection:text-white">
        {/* Minimal Initial Loading Screen */}
        <TwfLoadingScreen />

        {/* Floating Interactive Cookie Consent Notice */}
        <TwfCookieBanner onOpenCookiePolicy={() => setCookiePolicyOpen(true)} />

        {/* Scroll-Up Button with Filling Circular Progress Border */}
        <TwfScrollProgress />

        {/* Smartphone Floating Split-Cylinder Quick Menu Bar + Quick Call Orb */}
        <TwfMobileDock
          activePage={activePage}
          onNavigate={handleNavigate}
          onOpenQuickEnquire={handleOpenQuickEnquire}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* LEFT SIDEBAR MENU */}
        <TwfSidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          onOpenQuickEnquire={() => handleOpenQuickEnquire()}
          onPlayFilm={(film) => setActiveFilm(film)}
          onSelectPhoto={(photo) => setActivePhoto(photo)}
          mobileOpen={mobileMenuOpen}
          onMobileOpenChange={setMobileMenuOpen}
        />

        {/* RIGHT FLOATING SHEET */}
        <div className="ml-1.5 sm:ml-[196px] lg:ml-[232px] mr-1.5 sm:mr-2.5 lg:mr-3 my-1.5 sm:my-2.5 lg:my-3 pb-[calc(74px+env(safe-area-inset-bottom))] sm:pb-0 transition-all duration-300">
          <main className="bg-[#f7f6f1] text-[#0f1f12] rounded-[18px] sm:rounded-[24px] min-h-[calc(100vh-12px)] sm:min-h-[calc(100vh-20px)] lg:min-h-[calc(100vh-24px)] overflow-hidden shadow-2xl flex flex-col justify-between">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full"
              >
                {activePage === 'home' ? (
                  <div className="p-2 sm:p-4 lg:p-5 space-y-6 sm:space-y-10">
                    <TwfHeroSlider
                      onPlayFilm={(film) => setActiveFilm(film)}
                      onNavigateFilms={() => handleNavigate('films')}
                      onOpenQuickEnquire={() => handleOpenQuickEnquire()}
                    />

                    <TwfHomeSections
                      onPlayFilm={(film) => setActiveFilm(film)}
                      onSelectPhoto={(photo) => setActivePhoto(photo)}
                      onNavigate={handleNavigate}
                      onOpenQuickEnquire={(service) => handleOpenQuickEnquire(service)}
                    />
                  </div>
                ) : (
                  <div className="p-2 sm:p-4 lg:p-5">
                    <TwfInnerPages
                      activePage={activePage}
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                      onPlayFilm={(film) => setActiveFilm(film)}
                      onSelectPhoto={(photo) => setActivePhoto(photo)}
                      onNavigate={handleNavigate}
                      onOpenQuickEnquire={(service) => handleOpenQuickEnquire(service)}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <TwfFooterAndModals
              onNavigate={handleNavigate}
              activeFilm={activeFilm}
              onCloseFilm={() => setActiveFilm(null)}
              activePhoto={activePhoto}
              onClosePhoto={() => setActivePhoto(null)}
              onSelectPhoto={(photo) => setActivePhoto(photo)}
              quickEnquireOpen={quickEnquireOpen}
              preselectedService={preselectedService}
              onCloseQuickEnquire={() => setQuickEnquireOpen(false)}
              onOpenQuickEnquire={(service) => handleOpenQuickEnquire(service)}
              cookiePolicyOpen={cookiePolicyOpen}
              onCloseCookiePolicy={() => setCookiePolicyOpen(false)}
            />
          </main>
        </div>
      </div>
    </MotionConfig>
  );
}

