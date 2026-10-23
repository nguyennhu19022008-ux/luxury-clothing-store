import React, { useEffect, useState } from 'react';

export const LuxuryTransitionCurtain = ({ isTransitioning, onComplete }) => {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'covering' | 'unveiling'

  useEffect(() => {
    if (isTransitioning) {
      setPhase('covering');
      const timerMid = setTimeout(() => {
        setPhase('unveiling');
      }, 550);

      const timerEnd = setTimeout(() => {
        setPhase('idle');
        if (onComplete) onComplete();
      }, 1050);

      return () => {
        clearTimeout(timerMid);
        clearTimeout(timerEnd);
      };
    } else {
      setPhase('idle');
    }
  }, [isTransitioning, onComplete]);

  if (phase === 'idle') return null;

  return (
    <div className="fixed inset-0 z-[99990] pointer-events-none flex flex-col justify-center items-center overflow-hidden">
      
      {/* Upper Half Silk Shutter */}
      <div
        className={`absolute top-0 inset-x-0 h-1/2 bg-black transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          phase === 'covering'
            ? 'translate-y-0'
            : '-translate-y-full'
        }`}
      />

      {/* Lower Half Silk Shutter */}
      <div
        className={`absolute bottom-0 inset-x-0 h-1/2 bg-black transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          phase === 'covering'
            ? 'translate-y-0'
            : 'translate-y-full'
        }`}
      />

      {/* Center Haute Couture Emblem & Golden Hairline */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center transition-all duration-300 ${
          phase === 'covering' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-luxury-gold font-semibold mb-2">
          COLLECTION 2026
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-white uppercase font-light">
          MAISON VUONGGIA
        </h2>
        
        {/* Animated Golden Hairline */}
        <div className="w-24 sm:w-32 h-[1px] bg-luxury-gold/80 mt-4 overflow-hidden relative">
          <div className="absolute inset-0 bg-white animate-marquee" style={{ animationDuration: '1s' }} />
        </div>
      </div>

    </div>
  );
};
