import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

export const HeroLookbook = ({ onExploreClick, onOpenFabricInspector }) => {
  return (
    <section className="relative w-full min-h-[calc(100vh-72px)] flex items-center bg-luxury-bone overflow-hidden border-b border-luxury-sand">
      {/* 2XL & Widescreen Flank Editorial Coordinates (Eliminates wide-screen empty flank feel on 1440px+) */}
      <div className="hidden min-[1400px]:flex 2xl:flex absolute left-6 2xl:left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-8 text-[10px] font-mono tracking-[0.3em] uppercase text-luxury-sand select-none pointer-events-none [writing-mode:vertical-rl] rotate-180">
        <span>HAUTE COUTURE /// N° 01</span>
        <span className="w-8 h-[1px] bg-luxury-sand/80" />
        <span>PARIS — HANOI</span>
      </div>

      <div className="hidden min-[1400px]:flex 2xl:flex absolute right-6 2xl:right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-8 text-[10px] font-mono tracking-[0.3em] uppercase text-luxury-sand select-none pointer-events-none [writing-mode:vertical-rl]">
        <span>AUTOMNE — HIVER 2026</span>
        <span className="w-8 h-[1px] bg-luxury-sand/80" />
        <span>EDITION LIMITÉE</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Left: Editorial Narrative & CTAs (Balanced Column) */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8 z-10">
            
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
                  className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-luxury-ivory hover:bg-luxury-dark text-luxury-muted hover:text-luxury-bone border border-luxury-sand text-[10px] font-mono tracking-wider uppercase rounded-full transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Soi kính lúp cấu trúc sợi len Cashmere và lụa tơ tằm"
                >
                  <Sparkles className="w-3 h-3 text-luxury-gold" />
                  <span>Kính lúp sợi vải →</span>
                </button>
              )}
            </div>

            {/* Monumental Headline with text-balance and non-breaking space for compound word */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-luxury-dark leading-[1.14] text-balance descender-safe">
              Bản Hòa Ca Của Tinh Giản <br className="hidden sm:inline" /> &amp; May&nbsp;Đo Thượng Tuyển
            </h1>

            {/* Editorial Subtext with text-pretty and optimal character container */}
            <p className="font-sans text-base sm:text-lg text-luxury-charcoal max-w-[75ch] font-normal leading-relaxed text-pretty">
              Kiến tạo từ sợi len cashmere Mông Cổ và lụa tơ tằm nguyên bản, mỗi nếp gấp tôn vinh vẻ đẹp trường tồn vượt trên dòng chảy thời gian.
            </p>

            {/* Action Buttons: Nested CTA & Island Button Architecture */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#collection"
                onClick={onExploreClick}
                className="group inline-flex items-center justify-between gap-4 pl-8 pr-3 py-3 bg-luxury-dark text-luxury-bone text-xs font-semibold uppercase tracking-[0.18em] transition-all hover:bg-neutral-800 hover:shadow-xl active:scale-[0.98] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-dark cursor-pointer"
              >
                <span>KHÁM PHÁ BỘ SƯU TẬP</span>
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  <ArrowRight className="w-4 h-4 stroke-[1.75]" />
                </span>
              </a>

              <a
                href="#lookbook"
                className="group inline-flex items-center justify-between gap-3 pl-7 pr-3 py-3 border border-luxury-dark text-luxury-dark text-xs font-semibold uppercase tracking-[0.18em] transition-all hover:bg-luxury-ivory active:scale-[0.98] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-dark cursor-pointer"
              >
                <span>XEM LOOKBOOK MÙA THU</span>
                <span className="w-8 h-8 rounded-full bg-luxury-dark/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Compass className="w-4 h-4 stroke-[1.5]" />
                </span>
              </a>
            </div>

            {/* Material Credentials Row with inline flow */}
            <div className="pt-5 border-t border-luxury-sand/80 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-luxury-muted font-sans">
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                <span>100% Cashmere &amp; Mulberry Silk</span>
              </span>
              <span className="text-luxury-sand hidden sm:inline">•</span>
              <span>Handmade in Atelier Hà Đông</span>
              <span className="text-luxury-sand hidden sm:inline">•</span>
              <span>Dịch vụ thử đồ tại gia độc quyền</span>
            </div>

          </div>

          {/* Right: Double-Bezel 16:9 Widescreen Monumental Lookbook Image with Layered Composition */}
          <div className="relative flex justify-center items-center w-full">
            
            {/* Ambient Champagne Gold Glowing Aura */}
            <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-luxury-gold/15 blur-3xl pointer-events-none animate-luxury-aura" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-luxury-sand/30 blur-2xl pointer-events-none animate-luxury-aura" style={{ animationDelay: '-5s' }} />

            {/* Offset Architectural Backplate for Layered Depth */}
            <div className="absolute -inset-2 sm:-inset-3 bg-luxury-ivory/70 border border-luxury-sand/80 rounded-3xl -rotate-1 pointer-events-none shadow-md hidden sm:block" />

            {/* Double-Bezel Outer Shell */}
            <div className="relative p-2.5 sm:p-3 bg-luxury-bone/90 sm:bg-luxury-ivory/90 rounded-3xl border border-luxury-sand/80 shadow-2xl backdrop-blur-sm w-full">
              
              {/* Inner Core in 16:9 Widescreen */}
              <div className="relative w-full aspect-[16/9] rounded-[calc(1.5rem-0.625rem)] overflow-hidden bg-neutral-900 satin-sheen-box group shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                
                <img
                  src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop"
                  alt="Maison Vuonggia Look 01 - Măng tô Cashmere May đo"
                  className="w-full h-full object-cover object-[center_28%] sm:object-[center_20%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  loading="eager"
                />

                {/* Subtle Film Grain / Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Editorial Look Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-luxury-bone/90 backdrop-blur-md p-3.5 border border-luxury-sand text-left rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-widest text-luxury-gold font-bold uppercase">
                      LOOK 01 · EDITION LIMITÉE
                    </span>
                    <span className="text-[11px] font-mono text-luxury-muted">
                      2026 COUTURE
                    </span>
                  </div>
                  <div className="font-serif text-base text-luxury-dark font-medium mt-0.5">
                    Măng tô Cashmere May Đo Thủ Công
                  </div>
                </div>

              </div>

              {/* Floating Fabric Swatch Pill */}
              <div className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-3 bg-luxury-bone/95 border border-luxury-sand/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 z-20">
                <span className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse" />
                <span className="text-[10px] sm:text-[10.5px] font-mono tracking-wider text-luxury-dark font-medium uppercase">
                  100% Cashmere Mông Cổ · 14.5μm
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
