import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    lookTag: 'LOOK 01 · EDITION LIMITÉE',
    title: 'Măng tô Cashmere May Đo Thủ Công',
    material: '100% Cashmere Mông Cổ · 14.5μm',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1920&auto=format&fit=crop',
    alt: 'Maison Vuonggia Look 01 - Măng tô Cashmere May đo',
  },
  {
    id: 2,
    lookTag: 'LOOK 02 · L’ÉLÉGANCE PURE',
    title: 'Đầm Lụa Tơ Tằm Hà Đông Dạ Hội',
    material: 'Lụa Tơ Tằm Hà Đông · Nhuộm Thảo Mộc',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1920&auto=format&fit=crop',
    alt: 'Maison Vuonggia Look 02 - Đầm Lụa Tơ Tằm',
  },
  {
    id: 3,
    lookTag: 'LOOK 03 · MAÎTRISE TEXTILE',
    title: 'Blazer Len Dệt Thủ Công Dáng Rũ',
    material: 'Len Lông Cừu Nguyên Bản · Merino 130s',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1920&auto=format&fit=crop',
    alt: 'Maison Vuonggia Look 03 - Blazer Len Dệt',
  },
  {
    id: 4,
    lookTag: 'LOOK 04 · INTRINSÈQUE',
    title: 'Sơ Mi Lụa Habotai Cổ Điển Khuy Xà Cừ',
    material: 'Lụa Habotai Ý · Khuy Xà Cừ Tự Nhiên',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1920&auto=format&fit=crop',
    alt: 'Maison Vuonggia Look 04 - Sơ Mi Lụa Habotai',
  },
];

export const HeroLookbook = ({ onExploreClick, onOpenFabricInspector }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-glide slide transition every 2 seconds (2000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const activeLook = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full min-h-[calc(100vh-72px)] flex items-center bg-luxury-dark overflow-hidden border-b border-luxury-sand/40">
      
      {/* Dynamic 2-Second Background Glide Slider Track */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div
          className="flex w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {HERO_SLIDES.map((slide, idx) => (
            <div key={slide.id} className="relative w-full h-full flex-shrink-0 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-[center_28%] sm:object-[center_25%] scale-105 transition-transform duration-[2000ms] ease-out"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Dual Cinematic Scrim Overlay: Gradient from left for text contrast + ambient vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/45 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />
      </div>

      {/* 2XL & Widescreen Flank Editorial Coordinates (Eliminates wide-screen empty flank feel on 1440px+) */}
      <div className="parallax-fast hidden min-[1400px]:flex 2xl:flex absolute left-6 2xl:left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-8 text-[10px] font-mono tracking-[0.3em] uppercase text-luxury-gold/70 select-none pointer-events-none [writing-mode:vertical-rl] rotate-180 z-20">
        <span>HAUTE COUTURE /// N° 01</span>
        <span className="w-8 h-[1px] bg-luxury-gold/60" />
        <span>PARIS — HANOI</span>
      </div>

      <div className="parallax-fast hidden min-[1400px]:flex 2xl:flex absolute right-6 2xl:right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-8 text-[10px] font-mono tracking-[0.3em] uppercase text-luxury-gold/70 select-none pointer-events-none [writing-mode:vertical-rl] z-20">
        <span>AUTOMNE — HIVER 2026</span>
        <span className="w-8 h-[1px] bg-luxury-gold/60" />
        <span>EDITION LIMITÉE</span>
      </div>

      <div className="relative z-10 w-full max-w-none px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:[grid-template-columns:3fr_2fr] gap-10 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left: Asymmetric 60/40 Editorial Narrative & Haute Couture CTAs (Slides in from Left) */}
          <div className="reveal-slide-left is-revealed flex flex-col justify-center space-y-6 lg:space-y-8 z-10 lg:pr-6 xl:pr-10">
            
            {/* Eyebrow Label with Fabric Inspector Trigger */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[1.5px] bg-luxury-gold inline-block" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-luxury-gold uppercase">
                  Automne - Hiver 2026 /// Capsule Collection
                </span>
              </div>

              {onOpenFabricInspector && (
                <button
                  type="button"
                  onClick={onOpenFabricInspector}
                  className="elastic-haptic inline-flex items-center gap-1.5 px-3 py-0.5 bg-white/10 hover:bg-luxury-gold text-neutral-200 hover:text-luxury-dark border border-white/20 hover:border-luxury-gold text-[10px] font-mono tracking-wider uppercase rounded-full transition-all cursor-pointer shadow-sm backdrop-blur-md"
                  title="Soi kính lúp cấu trúc sợi len Cashmere và lụa tơ tằm"
                >
                  <Sparkles className="w-3 h-3 text-luxury-gold" />
                  <span>Kính lúp sợi vải →</span>
                </button>
              )}
            </div>

            {/* Monumental Headline with text-mask wipe, text-balance and non-breaking space for compound word */}
            <div className="text-mask-container is-revealed">
              <h1 className="text-mask-wipe font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.12] text-balance descender-safe drop-shadow-lg">
                Bản Hòa Ca Của Tinh Giản <br className="hidden sm:inline" /> &amp; May&nbsp;Đo Thượng Tuyển
              </h1>
            </div>

            {/* Editorial Subtext with text-pretty and optimal character container */}
            <p className="font-sans text-base sm:text-lg text-neutral-200 max-w-[75ch] font-normal leading-relaxed text-pretty drop-shadow-sm">
              Kiến tạo từ sợi len cashmere Mông Cổ và lụa tơ tằm nguyên bản, mỗi nếp gấp tôn vinh vẻ đẹp trường tồn vượt trên dòng chảy thời gian.
            </p>

            {/* Action Buttons: Nested CTA & Island Button Architecture */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#collection"
                onClick={onExploreClick}
                className="btn-satin-sheen elastic-haptic group inline-flex items-center justify-between gap-4 pl-8 pr-3 py-3 bg-white hover:bg-luxury-gold text-luxury-dark text-xs font-semibold uppercase tracking-[0.18em] transition-all hover:shadow-2xl rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              >
                <span>KHÁM PHÁ BỘ SƯU TẬP</span>
                <span className="w-8 h-8 rounded-full bg-luxury-dark/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  <ArrowRight className="w-4 h-4 stroke-[1.75]" />
                </span>
              </a>

              <a
                href="#lookbook"
                className="elastic-haptic group inline-flex items-center justify-between gap-3 pl-7 pr-3 py-3 border border-white/60 text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all hover:bg-white/15 hover:border-white rounded-full backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              >
                <span>XEM LOOKBOOK MÙA THU</span>
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Compass className="w-4 h-4 stroke-[1.5]" />
                </span>
              </a>
            </div>

            {/* Material Credentials Row with inline flow */}
            <div className="pt-5 border-t border-white/20 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-300 font-sans">
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                <span>100% Cashmere &amp; Mulberry Silk</span>
              </span>
              <span className="text-luxury-gold/50 hidden sm:inline">•</span>
              <span>Handmade in Atelier Hà Đông</span>
              <span className="text-luxury-gold/50 hidden sm:inline">•</span>
              <span>Dịch vụ thử đồ tại gia độc quyền</span>
            </div>

            {/* 2-Second Slider Progress Indicators */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-luxury-gold font-bold">
                LOOK 0{currentSlide + 1} / 0{HERO_SLIDES.length}
              </span>
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Bộ chọn ảnh chuyển động">
                {HERO_SLIDES.map((_, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => setCurrentSlide(sIdx)}
                    aria-label={`Chuyển đến Slide ${sIdx + 1}`}
                    className={`h-1.5 transition-all duration-500 rounded-none cursor-pointer ${
                      sIdx === currentSlide
                        ? 'w-8 bg-luxury-gold shadow-sm'
                        : 'w-2.5 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Right: Double-Bezel 16:9 Widescreen Monumental Lookbook Image (Slides in from Right) */}
          <div className="reveal-slide-right is-revealed relative flex justify-center items-center w-full">
            
            {/* Ambient Champagne Gold Glowing Aura */}
            <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-luxury-gold/20 blur-3xl pointer-events-none animate-luxury-aura" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-luxury-sand/30 blur-2xl pointer-events-none animate-luxury-aura" style={{ animationDelay: '-5s' }} />

            {/* Offset Architectural Backplate for Layered Depth */}
            <div className="parallax-slow absolute -inset-2 sm:-inset-3 bg-white/10 border border-white/20 rounded-none -rotate-1 pointer-events-none shadow-md hidden sm:block backdrop-blur-sm" />

            {/* Double-Bezel Outer Shell */}
            <div className="relative p-2.5 sm:p-3 bg-black/40 rounded-none border border-white/20 shadow-2xl backdrop-blur-sm w-full">
              
              {/* Inner Core in 16:9 Widescreen */}
              <div className="relative w-full aspect-[16/9] rounded-none overflow-hidden bg-neutral-900 satin-sheen-box group shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                
                <img
                  src={activeLook.image}
                  alt={activeLook.alt}
                  className="w-full h-full object-cover object-[center_28%] sm:object-[center_20%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  loading="eager"
                />

                {/* Subtle Film Grain / Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 pointer-events-none" />

                {/* Editorial Look Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3.5 border border-luxury-sand text-left rounded-none">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-widest text-luxury-gold font-bold uppercase">
                      {activeLook.lookTag}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-300">
                      2026 COUTURE
                    </span>
                  </div>
                  <div className="font-serif text-base text-white font-medium mt-0.5">
                    {activeLook.title}
                  </div>
                </div>

              </div>

              {/* Floating Fabric Swatch Pill */}
              <div className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-3 bg-black/85 border border-luxury-gold/50 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 z-20">
                <span className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse" />
                <span className="text-[10px] sm:text-[10.5px] font-mono tracking-wider text-luxury-bone font-medium uppercase">
                  {activeLook.material}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
