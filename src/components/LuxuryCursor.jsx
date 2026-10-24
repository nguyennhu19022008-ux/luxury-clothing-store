import React, { useEffect, useState, useRef } from 'react';

export const LuxuryCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'hover-button' | 'hover-product' | 'hidden'
  const [isVisible, setIsVisible] = useState(false);
  const animFrameRef = useRef(null);
  const targetPosRef = useRef({ x: -100, y: -100 });
  const currentPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad), not touch screens
    const isTouch =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Detect hover target
      const target = e.target;
      if (!target) return;

      const isButton = target.closest('button, a, input, select, [role="button"], [role="tab"]');
      const isProduct = target.closest('article, .product-card-hover, [data-cursor="view"]');

      if (isProduct && !isButton) {
        setCursorState('hover-product');
      } else if (isButton) {
        setCursorState('hover-button');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorState('hidden');
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      setCursorState('default');
    };

    // Smooth trailing physics loop
    const animate = () => {
      currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * 0.18;
      currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * 0.18;
      setTrailingPos({
        x: Math.round(currentPosRef.current.x * 10) / 10,
        y: Math.round(currentPosRef.current.y * 10) / 10,
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden transition-opacity duration-300">
      
      {/* 1. Precise Center Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-luxury-dark transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${
            cursorState === 'hover-button' ? 0 : cursorState === 'hover-product' ? 0.5 : 1
          })`,
        }}
      />

      {/* 2. Fluid Trailing Ring / View Badge */}
      <div
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
          cursorState === 'hover-product'
            ? 'w-16 h-16 -ml-8 -mt-8 bg-luxury-dark/90 text-luxury-bone backdrop-blur-md shadow-2xl scale-100 border border-luxury-gold/50'
            : cursorState === 'hover-button'
            ? 'w-10 h-10 -ml-5 -mt-5 bg-transparent border-[1.5px] border-luxury-gold scale-110 shadow-sm'
            : 'w-7 h-7 -ml-3.5 -mt-3.5 bg-transparent border border-luxury-dark/30 scale-100'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {cursorState === 'hover-product' && (
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold text-luxury-bone select-none">
            XEM
          </span>
        )}
      </div>

    </div>
  );
};
