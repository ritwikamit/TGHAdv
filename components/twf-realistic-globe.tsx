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
  const mapWrapperRef = useRef<HTMLDivElement | null>(null);
  const isTransitioningRef = useRef(false);
  const isMapLockedRef = useRef(false);
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

  const handleZoomToMap = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    isMapLockedRef.current = true;
    setShouldPreloadMap(true);
    setIsMapActive(true);

    const world = worldInstanceRef.current;
    if (world) {
      const controls = world.controls();
      if (controls) {
        controls.autoRotate = false;
      }
      world.pointOfView(
        {
          lat: RESORT_COORDS.lat,
          lng: RESORT_COORDS.lng,
          altitude: 0.16,
        },
        650
      );
    }

    window.setTimeout(() => {
      isTransitioningRef.current = false;
    }, 650);
  }, []);

  const handleBackToGlobe = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    isMapLockedRef.current = false;
    setIsMapActive(false);

    const world = worldInstanceRef.current;
    if (world) {
      const controls = world.controls();
      if (controls) {
        controls.autoRotate = false;
      }
      const initialAlt = window.innerWidth < 640 ? 1.85 : 1.65;
      world.pointOfView(
        {
          lat: RESORT_COORDS.lat,
          lng: RESORT_COORDS.lng,
          altitude: initialAlt,
        },
        700
      );
    }

    window.setTimeout(() => {
      isTransitioningRef.current = false;
      resumeRotateFnRef.current?.();
    }, 750);
  }, []);

  useEffect(() => {
    if (!isMapActive) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleBackToGlobe();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // Two-thumb pinch-out on map wrapper smoothly returns to Globe on smartphones
    const mapEl = mapWrapperRef.current;
    let initialTouchDist = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialTouchDist = Math.hypot(dx, dy);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialTouchDist > 0) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDist = Math.hypot(dx, dy);
        // Pinching thumbs together (zoom out) -> glide back to 3D globe
        if (initialTouchDist - currentDist > 30) {
          initialTouchDist = 0;
          handleBackToGlobe();
        }
      }
    };

    const onTouchEnd = () => {
      initialTouchDist = 0;
    };

    if (mapEl) {
      mapEl.addEventListener('touchstart', onTouchStart, { passive: true });
      mapEl.addEventListener('touchmove', onTouchMove, { passive: true });
      mapEl.addEventListener('touchend', onTouchEnd, { passive: true });
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (mapEl) {
        mapEl.removeEventListener('touchstart', onTouchStart);
        mapEl.removeEventListener('touchmove', onTouchMove);
        mapEl.removeEventListener('touchend', onTouchEnd);
      }
    };
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
      const width = container.clientWidth || (isCompact ? 360 : 460);
      const height = container.clientHeight || (isCompact ? 360 : 460);

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
          anchor.title = 'The Green Heritage Resort & Banquet — Tap to open Live Map';

          anchor.innerHTML = `
            <div role="button" tabindex="0" aria-label="The Green Heritage Resort & Banquet — Tap to open Live Map" style="
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
              padding: 14px 18px;
              cursor: pointer;
              touch-action: manipulation;
              -webkit-tap-highlight-color: transparent;
              user-select: none;
            ">
              <div style="
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.98), 0 0 4px rgba(0, 0, 0, 0.95);
                margin-bottom: 3px;
                line-height: 1.15;
                pointer-events: none;
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
              <svg width="28" height="34" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block; filter: drop-shadow(0 3px 8px rgba(0,0,0,0.9)); pointer-events: none;">
                <path d="M12 1C6.2 1 1.5 5.7 1.5 11.5C1.5 19.2 12 29 12 29C12 29 22.5 19.2 22.5 11.5C22.5 5.7 17.8 1 12 1Z" fill="#e52421" stroke="#ffffff" stroke-width="1.6"/>
                <circle cx="12" cy="11.2" r="3.4" fill="#ffffff"/>
              </svg>
            </div>
          `;

          let lastTrigger = 0;
          const triggerMap = (e?: Event) => {
            const now = Date.now();
            if (now - lastTrigger < 500) return;
            lastTrigger = now;
            if (e) {
              e.stopPropagation();
              if (e.cancelable && e.type === 'touchend') {
                e.preventDefault();
              }
            }
            handleZoomToMap();
          };

          anchor.onclick = triggerMap;
          anchor.onpointerup = triggerMap;
          anchor.ontouchend = triggerMap;

          const innerTarget = anchor.firstElementChild as HTMLElement | null;
          if (innerTarget) {
            innerTarget.onclick = triggerMap;
            innerTarget.onpointerup = triggerMap;
            innerTarget.ontouchend = triggerMap;
            innerTarget.onkeydown = (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerMap(e);
              }
            };
          }

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
      const initialAltitude = window.innerWidth < 640 ? 1.85 : 1.65;
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
        controls.dampingFactor = 0.08;
        controls.enableZoom = true;
        controls.enablePan = false;
        controls.zoomSpeed = isCompact ? 1.6 : 1.25;
        controls.minDistance = 122;
        controls.maxDistance = 420;
        controls.touches = {
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        };

        resumeRotateFnRef.current = () => {
          if (!isMapLockedRef.current && !isTransitioningRef.current) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;
          }
        };

        const handleControlsChange = () => {
          if (isTransitioningRef.current || isMapLockedRef.current) {
            return;
          }
          const cam = world.camera();
          if (!cam) return;
          const dist = cam.position.length();

          // Smoothly glide into Google Map when pinching all the way in to Bakarpur
          if (dist <= 128) {
            handleZoomToMap();
          }
        };

        controls.addEventListener('change', handleControlsChange);

        controls.addEventListener('start', () => {
          controls.autoRotate = false;
          if (resumeAutoRotateTimer) clearTimeout(resumeAutoRotateTimer);
        });

        controls.addEventListener('end', () => {
          if (resumeAutoRotateTimer) clearTimeout(resumeAutoRotateTimer);
          resumeAutoRotateTimer = setTimeout(() => {
            if (!isMapLockedRef.current && !isTransitioningRef.current) {
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
  }, [handleZoomToMap, shouldInitGlobe]);

  const handleFocusResort = useCallback(() => {
    if (isMapActive) {
      handleBackToGlobe();
      return;
    }

    if (!worldInstanceRef.current) return;
    const alt = window.innerWidth < 640 ? 1.85 : 1.65;
    worldInstanceRef.current.pointOfView(
      {
        lat: RESORT_COORDS.lat,
        lng: RESORT_COORDS.lng,
        altitude: alt,
      },
      800
    );
  }, [handleBackToGlobe, isMapActive]);

  const handleStepZoom = useCallback(
    (direction: 'in' | 'out') => {
      if (isMapActive) {
        if (direction === 'out') {
          handleBackToGlobe();
        } else {
          // Open high-res full map in new window
          window.open(STUDIO_INFO.mapsUrl, '_blank', 'noopener,noreferrer');
        }
        return;
      }
      const world = worldInstanceRef.current;
      if (!world) return;
      const pov = world.pointOfView({});
      const currentAlt = typeof pov?.altitude === 'number' ? pov.altitude : 1.85;

      if (direction === 'in') {
        if (currentAlt <= 0.65) {
          handleZoomToMap();
          return;
        }
        const nextAlt = Math.max(0.22, currentAlt - 0.45);
        if (nextAlt <= 0.28) {
          handleZoomToMap();
        } else {
          world.pointOfView(
            {
              lat: pov?.lat ?? RESORT_COORDS.lat,
              lng: pov?.lng ?? RESORT_COORDS.lng,
              altitude: nextAlt,
            },
            420
          );
        }
      } else {
        const nextAlt = Math.min(3.2, currentAlt + 0.45);
        world.pointOfView(
          {
            lat: pov?.lat ?? RESORT_COORDS.lat,
            lng: pov?.lng ?? RESORT_COORDS.lng,
            altitude: nextAlt,
          },
          420
        );
      }
    },
    [isMapActive, handleZoomToMap, handleBackToGlobe]
  );

  return (
    <div
      ref={stageRef}
      className="relative w-full min-w-0 flex flex-col items-center justify-center select-none"
    >
      {/* Centered 3D Globe & Map Stage — perfectly masked with identical rounded corners & border */}
      <div
        className="relative w-[90vw] max-w-[340px] xs:max-w-[370px] sm:max-w-[440px] lg:max-w-[500px] aspect-square mx-auto rounded-[24px] overflow-hidden bg-[#061208] border border-[#f0b400]/25 ring-1 ring-[#f0b400]/20 shadow-[0_24px_60px_rgba(0,0,0,0.65)] flex items-center justify-center"
        style={{
          isolation: 'isolate',
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          borderRadius: '24px',
        }}
      >
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
          style={{ touchAction: 'none' }}
          className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing [&>div]:mx-auto"
        />

        {/* Actual Live Google Map Card — Smoothly Crossfades & Scales on GPU */}
        <div
          ref={mapWrapperRef}
          className={`absolute inset-0 z-20 rounded-[24px] overflow-hidden bg-[#061208] transition-all duration-500 ease-out ${
            isMapActive
              ? 'opacity-100 scale-100 pointer-events-auto visible'
              : 'opacity-0 scale-95 pointer-events-none invisible'
          }`}
          style={{
            isolation: 'isolate',
            WebkitMaskImage: '-webkit-radial-gradient(white, black)',
            borderRadius: '24px',
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
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_28px_rgba(6,18,8,0.22)] ring-1 ring-inset ring-[#14531e]/20"
          />

          {/* Minimal Top-Right Back-to-Globe Pill Inside Map Overlay */}
          <div className="pointer-events-none absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30">
            <button
              type="button"
              onClick={handleBackToGlobe}
              className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#061208]/90 hover:bg-[#14531e] border border-[#f0b400]/45 text-[#f7f6f1] text-[11px] sm:text-xs uppercase tracking-wider font-medium shadow-lg backdrop-blur-md transition-colors cursor-pointer"
            >
              <Globe2 className="w-3.5 h-3.5 text-[#f0b400]" />
              <span>← Back to Globe</span>
            </button>
          </div>
        </div>
      </div>

      {/* Minimal Toggle & Zoom Controls Below Globe */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 relative z-10">
        {isMapActive ? (
          <>
            <button
              type="button"
              onClick={handleBackToGlobe}
              aria-label="Return to 3D Globe view"
              className="px-4 py-1.5 rounded-full bg-[#14531e] hover:bg-[#1b6d28] text-white border border-[#f0b400]/45 text-xs tracking-wider uppercase font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Globe2 className="w-3.5 h-3.5 text-[#f0b400]" />
              <span>3D Globe</span>
            </button>

            <button
              type="button"
              onClick={() => handleStepZoom('out')}
              aria-label="Zoom out back to 3D globe"
              title="Zoom out back to 3D globe"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#f7f6f1] border border-white/15 inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => handleStepZoom('in')}
              aria-label="Open detailed Google Map directions"
              title="Open Google Maps directions"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#f7f6f1] border border-white/15 inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleZoomToMap}
              aria-label="Smoothly zoom into Google Map of The Green Heritage Resort"
              className="px-4 py-1.5 rounded-full bg-[#14531e] hover:bg-[#1b6d28] text-white border border-[#f0b400]/45 text-xs tracking-wider uppercase font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-[#f0b400]" />
              <span>Live Map</span>
            </button>

            <button
              type="button"
              onClick={() => handleStepZoom('in')}
              aria-label="Zoom in 3D globe towards map"
              title="Zoom in (Double click / pinch in flies to Map)"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#f7f6f1] border border-white/15 inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => handleStepZoom('out')}
              aria-label="Zoom out 3D globe"
              title="Zoom out"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#f7f6f1] border border-white/15 inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleFocusResort}
              aria-label="Center 3D globe on The Green Heritage Resort"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[#f7f6f1] border border-white/15 text-xs tracking-wider uppercase font-medium transition-colors cursor-pointer"
            >
              Center Pin
            </button>
          </>
        )}
      </div>

      <p className="mt-2 text-xs text-white/60 tracking-wide text-center">
        {isMapActive
          ? 'Zoom out or tap "3D Globe" to return to global view'
          : 'Pinch thumbs to zoom in to Map · Zoom out returns to Globe'}
      </p>
    </div>
  );
}
