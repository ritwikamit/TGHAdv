'use client';

import { useEffect } from 'react';

const CLICKABLE_SELECTOR = [
  'button',
  '[role="button"]',
  'a[href]',
  'summary',
  'input[type="button"]',
  'input[type="submit"]',
  'input[type="reset"]',
].join(', ');

/**
 * Global subtle Web Audio synthesizer that produces a warm, organic bubble-pop
 * sound whenever a user clicks interactive buttons or navigation links.
 */
export function TwfClickSound() {
  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let lastPlayedAt = 0;

    const isSoundEnabled = () => {
      try {
        const raw = localStorage.getItem('tgh_resort_cookie_consent_v1');
        if (!raw) return true;
        if (raw === 'essential') return false;
        if (raw === 'all') return true;
        const parsed = JSON.parse(raw) as { mediaAndAudio?: boolean };
        return parsed.mediaAndAudio !== false;
      } catch {
        return true;
      }
    };

    const getAudioContext = (): AudioContext | null => {
      if (typeof window === 'undefined') return null;
      const AudioContextCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextCtor) return null;
      if (!audioCtx) {
        audioCtx = new AudioContextCtor();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
      return audioCtx;
    };

    const playAestheticPop = () => {
      const nowMs = performance.now();
      if (nowMs - lastPlayedAt < 45) return;
      lastPlayedAt = nowMs;

      const ctx = getAudioContext();
      if (!ctx) return;

      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Warm organic water-drop / soft wooden pop envelope (~55ms)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, t);
      osc.frequency.exponentialRampToValueAtTime(190, t + 0.052);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, t);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.085, t + 0.007);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.055);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.06);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0 && event.pointerType === 'mouse') return;
      if (!isSoundEnabled()) return;
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const trigger = target.closest(CLICKABLE_SELECTOR) as HTMLElement | null;
      if (!trigger) return;
      if (
        trigger.hasAttribute('disabled') ||
        trigger.getAttribute('aria-disabled') === 'true'
      ) {
        return;
      }

      playAestheticPop();
    };

    document.addEventListener('pointerdown', handlePointerDown, {
      capture: true,
      passive: true,
    });

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, {
        capture: true,
      });
      if (audioCtx && audioCtx.state !== 'closed') {
        audioCtx.close().catch(() => {});
      }
    };
  }, []);

  return null;
}

