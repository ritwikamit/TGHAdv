'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import * as THREE from 'three';
import { Navigation, Globe2, Plus, Minus } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/masoom-data';

interface TwfRealisticGlobeProps {
  onOpenQuickEnquire?: (service?: string) => void;
}

const RESORT_COORDS = {
  lat: 26.06385,
  lng: 85.3504979,
  name: 'The Green Heritage',
  subtitle: 'Bakarpur, Muzaffarpur',
};

export function TwfRealisticGlobe({
  onOpenQuickEnquire: _onOpenQuickEnquire,
}: TwfRealisticGlobeProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const globeVizRef = useRef<HTMLDivElement | null>(null);
  const zoomFeatherOverlayRef = useRef<HTMLDivElement | null>(null);
  const mapWrapperRef = useRef<HTMLDivElement | null>(null);
  const isMapLockedRef = useRef(false);
  const isAnimatingTransitionRef = useRef(false);
  const currentEaseRef = useRef(0);
  const transitionRafRef = useRef<number | null>(null);
  const resumeRotateFnRef = useRef<(() => void) | null>(null);

  const [shouldPreloadMap, setShouldPreloadMap] = useState(false);
  const [shouldInitGlobe, setShouldInitGlobe] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);

  const worldInstanceRef = useRef<{
    width: (w: number) => { height: (h: number) => void };
    pointOfView: (
      pov: { lat?: number; lng?: number; altitude?: number },
      ms?: number
    ) => { lat: number; lng: number; altitude: number };
    controls: () => {
      autoRotate: boolean;
      autoRotateSpeed: number;
      enableDamping: boolean;
      dampingFactor: number;
      enableZoom: boolean;
      enablePan: boolean;
      zoomSpeed: number;
      minDistance: number;
      maxDistance: number;
      touches?: { ONE?: THREE.TOUCH | null; TWO?: THREE.TOUCH | null };
    } | null;
    camera: () => THREE.Camera | null;
    _destructor?: () => void;
  } | null>(null);

  // Initialize WebGL 3D Globe immediately after hydration (so it is pre-built during the splash screen),
  // while keeping Google Maps iframe lazy until approaching viewport.
  useEffect(() => {
    const initTimer = window.setTimeout(() => {
      setShouldInitGlobe(true);
    }, 30);

    const stageEl = stageRef.current;
    if (!stageEl) {
      return () => window.clearTimeout(initTimer);
    }

    const preloadObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldPreloadMap(true);
          preloadObserver.disconnect();
        }
      },
      { rootMargin: '650px 0px' }
    );

    preloadObserver.observe(stageEl);
    return () => {
      window.clearTimeout(initTimer);
      preloadObserver.disconnect();
    };
  }, []);

  const cancelActiveTransition = useCallback(() => {
    if (transitionRafRef.current !== null) {
      cancelAnimationFrame(transitionRafRef.current);
      transitionRafRef.current = null;
    }
    isAnimatingTransitionRef.current = false;
  }, []);

  const applyZoomTransitionVisuals = useCallback((rawEase: number) => {
    const ease = Math.max(0, Math.min(1, rawEase));
    currentEaseRef.current = ease;

    const vizEl = globeVizRef.current;
    const featherEl = zoomFeatherOverlayRef.current;
    const mapEl = mapWrapperRef.current;

    if (vizEl) {
      // Pure GPU opacity + scale3d (avoids per-frame CSS mask-image rasterization lag)
      const globeOpacity = Math.max(0, 1 - Math.pow(ease, 1.05) * 1.08);
      const globeScale = 1 + ease * 0.24;
      vizEl.style.opacity = globeOpacity.toFixed(3);
      vizEl.style.transform = `scale3d(${globeScale.toFixed(4)}, ${globeScale.toFixed(4)}, 1)`;
      vizEl.style.visibility = globeOpacity <= 0.004 ? 'hidden' : 'visible';
    }

    if (featherEl) {
      // Peak dark-emerald vignette mid-transition to blend globe dive into live map cleanly
      const midGlow = Math.sin(ease * Math.PI) * 0.52 + ease * 0.35;
      featherEl.style.opacity = Math.min(0.88, midGlow).toFixed(3);
    }

    if (mapEl) {
      const mapOpacity = Math.max(0, Math.min(1, (ease - 0.12) / 0.88));
      const mapScale = 0.90 + ease * 0.10;
      mapEl.style.opacity = mapOpacity.toFixed(3);
      mapEl.style.transform = `scale3d(${mapScale.toFixed(4)}, ${mapScale.toFixed(4)}, 1)`;
      mapEl.style.visibility = mapOpacity <= 0.004 ? 'hidden' : 'visible';
    }
  }, []);

  const animateTransition = useCallback(
    (
      fromEase: number,
      toEase: number,
      durationMs: number,
      onComplete?: () => void
    ) => {
      cancelActiveTransition();
      isAnimatingTransitionRef.current = true;
      const startTime = performance.now();

      const tick = (now: number) => {
        const linear = Math.min(1, (now - startTime) / durationMs);
        const eased =
          linear < 0.5
            ? 4 * linear * linear * linear
            : 1 - Math.pow(-2 * linear + 2, 3) / 2;

        const current = fromEase + (toEase - fromEase) * eased;
        applyZoomTransitionVisuals(current);

        if (linear < 1) {
          transitionRafRef.current = requestAnimationFrame(tick);
        } else {
          transitionRafRef.current = null;
          isAnimatingTransitionRef.current = false;
          applyZoomTransitionVisuals(toEase);
          onComplete?.();
        }
      };

      transitionRafRef.current = requestAnimationFrame(tick);
    },
    [applyZoomTransitionVisuals, cancelActiveTransition]
  );

  const handleZoomToMap = useCallback(() => {
    setShouldPreloadMap(true);
    cancelActiveTransition();
    isMapLockedRef.current = false;

    const world = worldInstanceRef.current;
    if (!world) {
      applyZoomTransitionVisuals(1);
      isMapLockedRef.current = true;
      setIsMapActive(true);
      if (mapWrapperRef.current) {
        mapWrapperRef.current.style.pointerEvents = 'auto';
      }
      return;
    }

    const controls = world.controls();
    if (controls) {
      controls.autoRotate = false;
    }

    world.pointOfView(
      {
        lat: RESORT_COORDS.lat,
        lng: RESORT_COORDS.lng,
        altitude: 0.18,
      },
      760
    );

    animateTransition(currentEaseRef.current, 1, 740, () => {
      isMapLockedRef.current = true;
      setIsMapActive(true);
      if (mapWrapperRef.current) {
        mapWrapperRef.current.style.pointerEvents = 'auto';
      }
    });
  }, [animateTransition, applyZoomTransitionVisuals, cancelActiveTransition]);

  const handleBackToGlobe = useCallback(() => {
    cancelActiveTransition();
    isMapLockedRef.current = false;

    if (mapWrapperRef.current) {
      mapWrapperRef.current.style.pointerEvents = 'none';
    }

    const world = worldInstanceRef.current;
    if (world) {
      const controls = world.controls();
      if (controls) {
        controls.autoRotate = false;
      }

      // Position camera close over Bakarpur underneath the dissolving map, then pull back in one fluid sweep
      world.pointOfView(
        {
          lat: RESORT_COORDS.lat,
          lng: RESORT_COORDS.lng,
          altitude: 0.24,
        },
        0
      );

      world.pointOfView(
        {
          lat: RESORT_COORDS.lat,
          lng: RESORT_COORDS.lng,
          altitude: 1.55,
        },
        820
      );
    }

    const startEase =
      currentEaseRef.current > 0.02 ? currentEaseRef.current : isMapActive ? 1 : 0;

    if (startEase <= 0.005) {
      applyZoomTransitionVisuals(0);
      setIsMapActive(false);
      resumeRotateFnRef.current?.();
      return;
    }

    animateTransition(startEase, 0, 760, () => {
      setIsMapActive(false);
      if (!isMapLockedRef.current && !isAnimatingTransitionRef.current) {
        resumeRotateFnRef.current?.();
      }
    });
  }, [
    animateTransition,
    applyZoomTransitionVisuals,
    cancelActiveTransition,
    isMapActive,
  ]);

  useEffect(() => {
    if (!isMapActive) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleBackToGlobe();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleBackToGlobe, isMapActive]);

  useEffect(() => {
    if (!shouldInitGlobe) return;
    const container = globeVizRef.current;
    if (!container) return;

    let isCancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    let visibilityObserver: IntersectionObserver | null = null;
    let resumeAutoRotateTimer: NodeJS.Timeout | null = null;
    let warmupPauseTimer: number | null = null;

    const initGlobe = async () => {
      const GlobeModule = await import('globe.gl');
      if (isCancelled || !container) return;

      const Globe = GlobeModule.default;
      const isCompact = window.innerWidth < 640;
      const width = container.clientWidth || (isCompact ? 300 : 460);
      const height = container.clientHeight || (isCompact ? 300 : 460);

      container.innerHTML = '';

      const world = new Globe(container, {
        animateIn: false,
        rendererConfig: {
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        },
      })
        .width(width)
        .height(height)
        .backgroundColor('rgba(0,0,0,0)')
        .globeImageUrl('/globe/earth-blue-marble.jpg')
        .bumpImageUrl('/globe/earth-topology.png')
        .showAtmosphere(true)
        .atmosphereColor('#5ea376')
        .atmosphereAltitude(0.13)
        .ringsData([])
        .pointsData([])
        .labelsData([])
        // Clean Location Pin + Boxless, Dotless Label Anchored Exact Tip-On at 26.06385, 85.3504979
        .htmlElementsData([RESORT_COORDS])
        .htmlLat('lat')
        .htmlLng('lng')
        .htmlAltitude(0)
        .htmlElement(() => {
          const anchor = document.createElement('div');
          anchor.style.position = 'relative';
          anchor.style.width = '0px';
          anchor.style.height = '0px';
          anchor.style.pointerEvents = 'auto';
          anchor.style.cursor = 'pointer';
          anchor.title = 'The Green Heritage Resort & Banquet — Click to zoom into Google Map';

          anchor.innerHTML = `
            <div style="
              position: absolute;
              left: 0;
              bottom: 0;
              transform: translate(-50%, 0);
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              white-space: nowrap;
              background: transparent;
              border: none;
              box-shadow: none;
            ">
              <div style="
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.98), 0 0 4px rgba(0, 0, 0, 0.95);
                margin-bottom: 3px;
                line-height: 1.15;
              ">
                <div style="
                  font-family: Georgia, serif;
                  font-size: 13px;
                  font-weight: 700;
                  letter-spacing: 0.03em;
                  color: #ffffff;
                ">
                  ${RESORT_COORDS.name}
                </div>
                <div style="
                  font-family: system-ui, -apple-system, sans-serif;
                  font-size: 9.5px;
                  font-weight: 600;
                  letter-spacing: 0.05em;
                  color: rgba(255, 255, 255, 0.92);
                ">
                  ${RESORT_COORDS.subtitle}
                </div>
              </div>
              <svg width="26" height="32" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block; filter: drop-shadow(0 3px 8px rgba(0,0,0,0.9));">
                <path d="M12 1C6.2 1 1.5 5.7 1.5 11.5C1.5 19.2 12 29 12 29C12 29 22.5 19.2 22.5 11.5C22.5 5.7 17.8 1 12 1Z" fill="#e52421" stroke="#ffffff" stroke-width="1.5"/>
                <circle cx="12" cy="11.2" r="3.4" fill="#ffffff"/>
              </svg>
            </div>
          `;

          anchor.onclick = (e) => {
            e.stopPropagation();
            handleZoomToMap();
          };

          return anchor;
        });

      const renderer = world.renderer?.();
      if (renderer) {
        if (typeof renderer.setPixelRatio === 'function') {
          const maxRatio = window.innerWidth < 640 ? 1.35 : 1.6;
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxRatio));
        }
        // Required on mobile Chrome/Safari so two-thumb pinch zooms the 3D globe smoothly instead of the viewport
        if (renderer.domElement) {
          renderer.domElement.style.touchAction = 'none';
          renderer.domElement.style.display = 'block';
          renderer.domElement.style.margin = '0 auto';
        }
      }

      const globeMaterial = world.globeMaterial() as THREE.MeshPhongMaterial;
      if (globeMaterial) {
        globeMaterial.bumpScale = 10;

        new THREE.TextureLoader().load('/globe/earth-water.png', (texture) => {
          if (isCancelled) return;
          globeMaterial.specularMap = texture;
          globeMaterial.specular = new THREE.Color('#7ca882');
          globeMaterial.shininess = 15;
          globeMaterial.needsUpdate = true;
        });
      }

      const directionalLight = world
        .lights()
        .find((light: THREE.Light) => light.type === 'DirectionalLight');
      if (directionalLight) {
        directionalLight.position.set(1, 1, 1);
      }

      // Focus camera cleanly over Bakarpur, Muzaffarpur with comfortable framing on smartphones
      const initialAltitude = window.innerWidth < 640 ? 2.15 : 1.65;
      world.pointOfView(
        {
          lat: RESORT_COORDS.lat,
          lng: RESORT_COORDS.lng,
          altitude: initialAltitude,
        },
        0
      );

      const controls = world.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.enableDamping = true;
        controls.dampingFactor = 0.075;
        controls.enableZoom = true;
        controls.enablePan = false;
        controls.zoomSpeed = 1.25;
        controls.minDistance = 122;
        controls.maxDistance = 440;
        controls.touches = {
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_ROTATE,
        };

        resumeRotateFnRef.current = () => {
          if (!isMapLockedRef.current && !isAnimatingTransitionRef.current) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;
          }
        };

        const handleZoomChange = () => {
          const vizEl = globeVizRef.current;
          if (!vizEl) return;
          const cam = world.camera();
          if (!cam) return;

          if (isAnimatingTransitionRef.current || isMapLockedRef.current) {
            return;
          }

          const dist = cam.position.length();

          // Keep crisp 3D globe interactive across pinch zoom (145 -> 440); dive into Google Map only at ultra-close pinch (<145)
          if (dist >= 145) {
            if (currentEaseRef.current > 0) {
              applyZoomTransitionVisuals(0);
            }
            return;
          }

          const rawT = Math.max(0, Math.min(1, (145 - dist) / (145 - 124)));
          const ease = rawT * rawT * (3 - 2 * rawT);

          if (rawT > 0.05) {
            setShouldPreloadMap(true);
            controls.autoRotate = false;
          }

          applyZoomTransitionVisuals(ease);

          if (rawT >= 0.92) {
            controls.autoRotate = false;
            animateTransition(ease, 1, 260, () => {
              isMapLockedRef.current = true;
              setIsMapActive(true);
              if (mapWrapperRef.current) {
                mapWrapperRef.current.style.pointerEvents = 'auto';
              }
            });
          }
        };

        handleZoomChange();
        controls.addEventListener('change', handleZoomChange);

        controls.addEventListener('start', () => {
          controls.autoRotate = false;
          if (resumeAutoRotateTimer) clearTimeout(resumeAutoRotateTimer);
        });

        controls.addEventListener('end', () => {
          if (resumeAutoRotateTimer) clearTimeout(resumeAutoRotateTimer);
          resumeAutoRotateTimer = setTimeout(() => {
            if (
              !isMapLockedRef.current &&
              !isAnimatingTransitionRef.current &&
              currentEaseRef.current <= 0.02
            ) {
              controls.autoRotate = true;
              controls.autoRotateSpeed = 0.55;
            }
          }, 1400);
        });
      }

      worldInstanceRef.current = world;
      let canPauseOffscreen = false;
      warmupPauseTimer = window.setTimeout(() => {
        canPauseOffscreen = true;
        window.dispatchEvent(new CustomEvent('tgh:globe-ready'));
        if (stageRef.current) {
          const rect = stageRef.current.getBoundingClientRect();
          const inRange =
            rect.bottom >= -260 &&
            rect.top <= (window.innerHeight || 800) + 260;
          if (!inRange) {
            const w = worldInstanceRef.current as unknown as {
              pauseAnimation?: () => void;
            } | null;
            w?.pauseAnimation?.();
          }
        }
      }, 220);

      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width: nextW, height: nextH } = entry.contentRect;
          if (nextW > 0 && nextH > 0 && worldInstanceRef.current) {
            worldInstanceRef.current.width(nextW).height(nextH);
          }
        }
      });
      resizeObserver.observe(container);

      visibilityObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const w = worldInstanceRef.current as unknown as {
              pauseAnimation?: () => void;
              resumeAnimation?: () => void;
            } | null;
            if (!w) return;
            if (entry.isIntersecting) {
              setShouldPreloadMap(true);
              w.resumeAnimation?.();
            } else if (canPauseOffscreen) {
              w.pauseAnimation?.();
            }
          });
        },
        { rootMargin: '260px 0px' }
      );
      visibilityObserver.observe(container);
    };

    initGlobe();

    return () => {
      isCancelled = true;
      cancelActiveTransition();
      if (warmupPauseTimer !== null) clearTimeout(warmupPauseTimer);
      if (resumeAutoRotateTimer) clearTimeout(resumeAutoRotateTimer);
      if (resizeObserver) resizeObserver.disconnect();
      if (visibilityObserver) visibilityObserver.disconnect();
      if (worldInstanceRef.current) {
        try {
          worldInstanceRef.current._destructor?.();
        } catch {
          // noop
        }
        worldInstanceRef.current = null;
      }
    };
  }, [
    animateTransition,
    applyZoomTransitionVisuals,
    cancelActiveTransition,
    handleZoomToMap,
    shouldInitGlobe,
  ]);

  const handleFocusResort = useCallback(() => {
    if (isMapActive || currentEaseRef.current > 0.02) {
      handleBackToGlobe();
      return;
    }

    if (!worldInstanceRef.current) return;
    const alt = window.innerWidth < 640 ? 2.15 : 1.65;
    worldInstanceRef.current.pointOfView(
      {
        lat: RESORT_COORDS.lat,
        lng: RESORT_COORDS.lng,
        altitude: alt,
      },
      900
    );
  }, [handleBackToGlobe, isMapActive]);

  const handleStepZoom = useCallback((direction: 'in' | 'out') => {
    const world = worldInstanceRef.current;
    if (!world || isMapActive) return;
    const pov = world.pointOfView({});
    const currentAlt = typeof pov?.altitude === 'number' ? pov.altitude : 1.85;
    const nextAlt =
      direction === 'in'
        ? Math.max(0.55, currentAlt - 0.45)
        : Math.min(3.2, currentAlt + 0.45);
    world.pointOfView(
      {
        lat: pov?.lat ?? RESORT_COORDS.lat,
        lng: pov?.lng ?? RESORT_COORDS.lng,
        altitude: nextAlt,
      },
      420
    );
  }, [isMapActive]);

  return (
    <div
      ref={stageRef}
      className="relative w-full min-w-0 flex flex-col items-center justify-center select-none"
    >
      {/* Centered 3D Globe Stage sized proportionally so entire globe + halo + pin fits on smartphones */}
      <div className="relative w-full max-w-[300px] sm:max-w-[440px] lg:max-w-[500px] aspect-square mx-auto flex items-center justify-center">
        {/* Subtle loading ring while WebGL initializes */}
        {!shouldInitGlobe && (
          <div
            aria-hidden="true"
            className="w-[78%] h-[78%] rounded-full border border-[#f0b400]/20 bg-radial from-[#14531e]/25 via-[#061208] to-[#061208] animate-pulse"
          />
        )}

        {/* 3D Globe Layer */}
        <div
          ref={globeVizRef}
          className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing will-change-transform [&>div]:mx-auto"
        />

        {/* Soft Circular Dark Emerald Ambient Edge Feather Matching #061208 Section */}
        <div
          ref={zoomFeatherOverlayRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            background:
              'radial-gradient(closest-side at 50% 50%, rgba(6,18,8,0) 45%, rgba(6,18,8,0.45) 68%, rgba(6,18,8,0.84) 86%, rgba(6,18,8,1) 99%)',
          }}
        />

        {/* Actual Live Google Map Card — Smoothly Crossfades & Scales To/From 3D Globe on GPU */}
        <div
          ref={mapWrapperRef}
          className={`absolute inset-1.5 sm:inset-2.5 z-20 overflow-hidden rounded-[24px] bg-[#061208] border border-[#f0b400]/35 ring-1 ring-[#f0b400]/25 shadow-[0_28px_70px_rgba(0,0,0,0.65)] will-change-transform ${
            isMapActive ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          style={{
            opacity: isMapActive ? 1 : 0,
            transform: isMapActive ? 'scale3d(1, 1, 1)' : 'scale3d(0.90, 0.90, 1)',
            visibility: isMapActive ? 'visible' : 'hidden',
          }}
        >
          {shouldPreloadMap && (
            <iframe
              src={STUDIO_INFO.mapsEmbedUrl}
              title="The Green Heritage Resort and Banquet — Google Map"
              className="w-full h-full border-0"
              style={{ filter: 'saturate(1.07) contrast(1.03)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          )}

          {/* Soft Luxury Vignette & Inner Perimeter Polish */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[24px] shadow-[inset_0_0_28px_rgba(6,18,8,0.18)] ring-1 ring-inset ring-[#14531e]/20"
          />

          {/* Minimal Top-Right Back-to-Globe Pill Inside Map Overlay */}
          <div className="pointer-events-none absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30">
            <button
              type="button"
              onClick={handleBackToGlobe}
              className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#061208]/88 hover:bg-[#14531e] border border-[#f0b400]/45 text-[#f7f6f1] text-[10px] uppercase tracking-wider font-medium shadow-lg backdrop-blur-md transition-colors cursor-pointer"
            >
              <Globe2 className="w-3.5 h-3.5 text-[#f0b400]" />
              <span>3D Globe</span>
            </button>
          </div>
        </div>
      </div>

      {/* Minimal Toggle & Zoom Controls Below Globe */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 relative z-10">
        {isMapActive ? (
          <button
            type="button"
            onClick={handleBackToGlobe}
            aria-label="Return to 3D Globe view"
            className="px-4 py-1.5 rounded-full bg-[#14531e] hover:bg-[#1b6d28] text-white border border-[#f0b400]/45 text-[10px] tracking-wider uppercase font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Globe2 className="w-3 h-3 text-[#f0b400]" />
            <span>3D Globe</span>
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleZoomToMap}
              aria-label="Smoothly zoom into Google Map of The Green Heritage Resort"
              className="px-4 py-1.5 rounded-full bg-[#14531e] hover:bg-[#1b6d28] text-white border border-[#f0b400]/45 text-[10px] tracking-wider uppercase font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Navigation className="w-3 h-3 text-[#f0b400]" />
              <span>Live Map</span>
            </button>

            <button
              type="button"
              onClick={() => handleStepZoom('in')}
              aria-label="Zoom in 3D globe"
              title="Zoom in"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-[#f7f6f1] border border-white/15 inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => handleStepZoom('out')}
              aria-label="Zoom out 3D globe"
              title="Zoom out"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-[#f7f6f1] border border-white/15 inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        <button
          type="button"
          onClick={handleFocusResort}
          aria-label="Center 3D globe on The Green Heritage Resort"
          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[#f7f6f1] border border-white/15 text-[10px] tracking-wider uppercase font-medium transition-colors cursor-pointer"
        >
          Center Pin
        </button>
      </div>

      {!isMapActive && (
        <p className="mt-2 text-[10px] text-white/55 tracking-wide text-center">
          Pinch with thumbs to zoom · Drag to rotate
        </p>
      )}
    </div>
  );
}
