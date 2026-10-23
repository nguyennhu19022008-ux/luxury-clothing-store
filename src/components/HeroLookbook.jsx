import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

export const HeroLookbook = ({ onExploreClick }) => {
  return (
    <section className="relative w-full min-h-[calc(100vh-72px)] flex items-center bg-luxury-bone overflow-hidden border-b border-luxury-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Left: Editorial Narrative & CTAs (Balanced Column) */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8 z-10">
            
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-luxury-gold inline-block" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-luxury-gold uppercase">
                Automne - Hiver 2026 /// Capsule Collection
              </span>
            </div>

            {/* Monumental Headline with text-balance */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-luxury-dark leading-[1.12] text-balance descender-safe">
              Bản Hòa Ca Của Tinh Giản &amp; May Đo Thượng Tuyển
            </h1>

            {/* Editorial Subtext with text-pretty and optimal character container */}
            <p className="font-sans text-base sm:text-lg text-luxury-charcoal max-w-[75ch] font-normal leading-relaxed text-pretty">
              Kiến tạo từ sợi len cashmere Mông Cổ và lụa tơ tằm nguyên bản, mỗi nếp gấp tôn vinh vẻ đẹp trường tồn vượt trên dòng chảy thời gian.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#collection"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-luxury-dark text-luxury-bone text-xs font-semibold uppercase tracking-[0.18em] transition-all hover:bg-neutral-800 hover:shadow-lg active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-dark"
              >
                <span>KHÁM PHÁ BỘ SƯU TẬP</span>
                <ArrowRight className="w-4 h-4 stroke-[1.75]" />
              </a>

              <a
                href="#lookbook"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-luxury-dark text-luxury-dark text-xs font-semibold uppercase tracking-[0.18em] transition-all hover:bg-luxury-ivory active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-dark"
              >
                <Compass className="w-4 h-4 stroke-[1.5]" />
                <span>XEM LOOKBOOK MÙA THU</span>
              </a>
            </div>

            {/* Material Credentials Badge */}
            <div className="pt-4 border-t border-luxury-sand/80 flex flex-wrap items-center gap-6 text-xs text-luxury-muted font-sans">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
                <span>100% Cashmere &amp; Mulberry Silk</span>
              </div>
              <span className="text-luxury-sand">•</span>
              <div>
                <span>Handmade in Atelier Hà Đông</span>
              </div>
              <span className="text-luxury-sand">•</span>
              <div>
                <span>Thử đồ tại gia độc quyền</span>
              </div>
            </div>

          </div>

          {/* Right: 16:9 Widescreen Monumental Lookbook Image (Balanced Column) */}
          <div className="relative flex justify-center items-center w-full">
            
            {/* Ambient Champagne Gold Glowing Aura */}
            <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-luxury-gold/15 blur-3xl pointer-events-none animate-luxury-aura" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-luxury-sand/30 blur-2xl pointer-events-none animate-luxury-aura" style={{ animationDelay: '-5s' }} />

            {/* Visual Frame in 16:9 Widescreen Aspect Ratio */}
            <div className="relative w-full aspect-[16/9] bg-luxury-ivory border border-luxury-sand overflow-hidden shadow-2xl group satin-sheen-box">
              
              <img
                src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop"
                alt="Maison Vuonggia Look 01 - Măng tô Cashmere May đo"
                className="w-full h-full object-cover object-[center_28%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                loading="eager"
              />

              {/* Subtle Film Grain / Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Editorial Look Tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-luxury-bone/90 backdrop-blur-md p-3.5 border border-luxury-sand text-left">
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

          </div>

        </div>
      </div>
    </section>
  );
};
