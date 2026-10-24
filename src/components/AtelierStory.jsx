import React from 'react';
import { Scissors, Layers, Sparkles, Shield, Clock, HeartHandshake } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AtelierStory = () => {
  const photoRef = useScrollReveal({ threshold: 0.15 });
  const storyRef = useScrollReveal({ threshold: 0.15 });

  const pillars = [
    {
      icon: Scissors,
      title: 'Kỹ Nghệ May Đo 300 Giờ',
      desc: 'Mỗi mẫu măng tô và âu phục trải qua hơn 45 công đoạn định hình form dáng bằng hơi nước và khâu lót ngực thủ công half-canvas.',
    },
    {
      icon: Layers,
      title: 'Nguồn Vải Tự Nhiên Thượng Tuyển',
      desc: '100% Cashmere Nội Mông chải tay, lụa tơ tằm dệt thủ công từ làng nghề cổ truyền Hà Đông, và len lông cừu Merino Super 130s từ Ý.',
    },
    {
      icon: HeartHandshake,
      title: 'Đặc Quyền Thử Đồ Tại Gia',
      desc: 'Chuyên viên phong cách mang trang phục tận nơi với hộp nhung đen và thiệp ký gửi, hỗ trợ chỉnh sửa số đo cá nhân trong vòng 48 giờ.',
    },
    {
      icon: Shield,
      title: 'Cam Kết Không Thừa Thải',
      desc: 'Chúng tôi chỉ may theo đơn đặt hàng độc bản (Made-to-Order), tôn trọng sức lao động của nghệ nhân và bảo vệ môi trường tự nhiên.',
    },
  ];

  return (
    <section id="atelier" className="py-20 lg:py-32 bg-[#0D0D0D] text-luxury-bone border-b border-white/10 scroll-mt-20 relative overflow-hidden">
      {/* Atmospheric Transition Veil from Warm Bone to Velvet Midnight */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

      <div className="w-full max-w-none px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
        
        {/* Atmospheric Transition Banner */}
        <div className="flex items-center justify-center gap-3 pb-8 border-b border-white/10 mb-12 sm:mb-16">
          <span className="w-8 sm:w-16 h-[1px] bg-luxury-gold/40" />
          <span className="font-mono text-[9px] sm:text-[10.5px] tracking-[0.3em] uppercase text-luxury-gold/90 font-medium text-center">
            CHUYỂN TIẾP KHÔNG GIAN /// VÀO XƯỞNG MAY KÍN ATELIER HÀ ĐÔNG
          </span>
          <span className="w-8 sm:w-16 h-[1px] bg-luxury-gold/40" />
        </div>

        {/* Narrative Split: Balanced 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-center">
          
          {/* Left: 16:9 Widescreen Artisan Photography with Double-Bezel Champagne Glow */}
          <div ref={photoRef} className="reveal-scale relative w-full">
            <div className="p-2.5 sm:p-3 bg-neutral-900/90 rounded-3xl border border-luxury-gold/40 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <div className="aspect-[16/9] bg-black rounded-[calc(1.5rem-0.625rem)] overflow-hidden relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] satin-sheen-box group">
                <img
                  src="https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1200&auto=format&fit=crop"
                  alt="Bàn tay nghệ nhân may đo thủ công tại xưởng Maison Vuonggia"
                  className="w-full h-full object-cover object-[center_40%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-black/85 backdrop-blur-md border border-white/15 rounded-xl">
                  <div className="font-mono text-[10px] tracking-widest text-luxury-gold uppercase font-bold">
                    ATELIER ARCHIVE /// 2026
                  </div>
                  <div className="font-serif text-sm text-white font-medium mt-0.5">
                    Đường kim mũi chỉ thủ công 21 stitches/inch
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Atelier Manifesto & 4 Black Stone Pillars */}
          <div ref={storyRef} className="reveal-on-scroll flex flex-col justify-center space-y-6">
            
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-luxury-gold inline-block" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-luxury-gold uppercase">
                Triết Lý Xưởng May Maison Vuonggia
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight text-balance descender-safe">
              Bảo Tồn Kỹ Nghệ Thủ Công Giữa Kỷ Nguyên Công Nghiệp
            </h2>

            <p className="font-sans text-sm sm:text-base text-neutral-300 font-normal leading-relaxed text-pretty max-w-[75ch]">
              Maison Vuonggia khởi nguồn từ khát vọng gìn giữ nét tinh tế của kỹ nghệ may đo thủ công truyền thống. Chúng tôi khước từ lối sản xuất hàng loạt nhanh chóng để tập trung vào từng chi tiết: độ mở của ve áo, độ rủ của lụa tơ sống, và cảm giác êm ái khi làn da tiếp xúc với sợi len cashmere nguyên bản.
            </p>

            {/* 4 Pillars Grid: Black Stone Craftsmanship Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-6 border-t border-white/15">
              {pillars.map((pillar, i) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={i}
                    className={`reveal-child stagger-${i + 1} elastic-haptic flex flex-col space-y-2 p-5 bg-[#161616] border border-white/10 hover:border-luxury-gold/50 rounded-2xl transition-all duration-300 shadow-lg`}
                  >
                    <div className="flex items-center gap-2 text-white">
                      <IconComponent className="w-4 h-4 text-luxury-gold stroke-[1.75]" />
                      <h3 className="font-serif text-base text-white font-semibold text-balance">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans font-normal text-pretty">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
