import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sparkles, Compass } from 'lucide-react';

export const InteractiveOpeningCurtain = ({ onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const timerRef = useRef(null);

  // Clean up any pending timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleUnveil = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);

    // Haptic vibration feedback for supported mobile devices
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(20);
      } catch (_) {}
    }

    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const delay = prefersReducedMotion ? 50 : 750;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (typeof onComplete === 'function') {
        onComplete();
      }
    }, delay);
  }, [isOpening, onComplete]);

  // Keyboard shortcut listener (Space, Enter, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
      if (e.code === 'Space' || e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleUnveil();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUnveil]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Chạm để mở màn trình diễn thời trang Maison Vuonggia"
      onClick={handleUnveil}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          handleUnveil();
        }
      }}
      className={`fixed inset-0 z-[99990] flex items-center justify-center overflow-hidden cursor-pointer select-none focus:outline-none transition-colors duration-300 ${
        isOpening ? 'pointer-events-none' : ''
      }`}
    >
      {/* Upper Half Silk Shutter */}
      <div
        className={`curtain-upper absolute top-0 inset-x-0 h-1/2 bg-[#000000] border-b border-luxury-gold/30 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform ${
          isOpening ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Subtle Vertical Silk Threads Texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-700 via-black to-black" />
        <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between text-[9px] font-mono tracking-[0.3em] uppercase text-neutral-600">
          <span>HAUTE COUTURE /// VOLET SUPÉRIEUR</span>
          <span>PARIS — HANOI</span>
        </div>
      </div>

      {/* Lower Half Silk Shutter */}
      <div
        className={`curtain-lower absolute bottom-0 inset-x-0 h-1/2 bg-[#000000] border-t border-luxury-gold/30 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform ${
          isOpening ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Subtle Vertical Silk Threads Texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-neutral-700 via-black to-black" />
        <div className="absolute top-3 left-6 right-6 flex items-center justify-between text-[9px] font-mono tracking-[0.3em] uppercase text-neutral-600">
          <span>ÉDITION PRIVÉE /// VOLET INFÉRIEUR</span>
          <span>COLLECTION 2026</span>
        </div>
      </div>

      {/* Center Haute Couture Emblem & Interactive Unveil Trigger */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-xl transition-all duration-500 ease-out ${
          isOpening ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* Ambient Gold Aura */}
        <div className="absolute w-72 h-72 rounded-full bg-luxury-gold/15 blur-3xl pointer-events-none animate-pulse" />

        {/* Collection Subtitle */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1px] bg-luxury-gold/70 inline-block" />
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.4em] uppercase text-luxury-gold font-semibold">
            COLLECTION 2026
          </span>
          <span className="w-8 h-[1px] bg-luxury-gold/70 inline-block" />
        </div>

        {/* Monumental Maison Brand */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.25em] text-white uppercase font-light leading-none mb-6">
          MAISON VUONGGIA
        </h1>

        {/* Animated Golden Hairline */}
        <div className="w-32 sm:w-48 h-[1px] bg-luxury-gold/60 mb-8 overflow-hidden relative">
          <div
            className="absolute inset-0 bg-white/90 animate-marquee"
            style={{ animationDuration: '1.2s' }}
          />
        </div>

        {/* Interactive Glowing Shutter Button / Pill */}
        <div className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-neutral-900/90 hover:bg-neutral-800/90 text-white border border-luxury-gold/60 shadow-[0_0_30px_rgba(166,138,86,0.3)] hover:shadow-[0_0_45px_rgba(166,138,86,0.55)] transition-all duration-300 transform group-hover:scale-105 active:scale-95 elastic-haptic">
          <span className="w-2.5 h-2.5 rounded-full bg-luxury-gold animate-ping" />
          <span className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-luxury-bone font-medium">
            CHẠM ĐỂ MỞ MÀN /// CLICK TO ENTER
          </span>
          <Sparkles className="w-4 h-4 text-luxury-gold shrink-0 transition-transform duration-300 group-hover:rotate-12" />
        </div>

        {/* Tactile Keyboard Hint */}
        <p className="mt-5 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
          Nhấp chuột bất kỳ đâu hoặc bấm [Space] / [Enter]
        </p>
      </div>
    </div>
  );
};
