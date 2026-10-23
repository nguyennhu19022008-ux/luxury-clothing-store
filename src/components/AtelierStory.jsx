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
    <section id="atelier" className="py-20 lg:py-32 bg-luxury-ivory border-b border-luxury-sand scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Narrative Split: Balanced 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Left: 16:9 Widescreen Artisan Photography with Double-Bezel */}
          <div ref={photoRef} className="reveal-scale relative w-full">
            <div className="p-2.5 sm:p-3 bg-luxury-bone/80 rounded-3xl border border-luxury-sand/80 shadow-2xl">
              <div className="aspect-[16/9] bg-neutral-900 rounded-[calc(1.5rem-0.625rem)] overflow-hidden relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] satin-sheen-box group">
                <img
                  src="https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1200&auto=format&fit=crop"
                  alt="Bàn tay nghệ nhân may đo thủ công tại xưởng Maison Vuonggia"
                  className="w-full h-full object-cover object-[center_40%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-luxury-bone/90 backdrop-blur-sm border border-luxury-sand rounded-xl">
                  <div className="font-mono text-[10px] tracking-widest text-luxury-gold uppercase font-bold">
                    ATELIER ARCHIVE /// 2026
                  </div>
                  <div className="font-serif text-sm text-luxury-dark font-medium mt-0.5">
                    Đường kim mũi chỉ thủ công 21 stitches/inch
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Atelier Manifesto & 4 Pillars */}
          <div ref={storyRef} className="reveal-on-scroll flex flex-col justify-center space-y-6">
            
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-luxury-gold inline-block" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-luxury-gold uppercase">
                Triết Lý Xưởng May Maison Vuonggia
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-luxury-dark font-normal tracking-tight text-balance descender-safe">
              Bảo Tồn Kỹ Nghệ Thủ Công Giữa Kỷ Nguyên Công Nghiệp
            </h2>

            <p className="font-sans text-sm sm:text-base text-luxury-charcoal font-normal leading-relaxed text-pretty max-w-[75ch]">
              Maison Vuonggia khởi nguồn từ khát vọng gìn giữ nét tinh tế của kỹ nghệ may đo thủ công truyền thống. Chúng tôi khước từ lối sản xuất hàng loạt nhanh chóng để tập trung vào từng chi tiết: độ mở của ve áo, độ rủ của lụa tơ sống, và cảm giác êm ái khi làn da tiếp xúc với sợi len cashmere nguyên bản.
            </p>

            {/* 4 Pillars Grid (No cards-in-cards, flat layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-luxury-sand/80">
              {pillars.map((pillar, i) => {
                const IconComponent = pillar.icon;
                return (
                  <div key={i} className={`reveal-child stagger-${i + 1} flex flex-col space-y-2`}>
                    <div className="flex items-center gap-2 text-luxury-dark">
                      <IconComponent className="w-4 h-4 text-luxury-gold stroke-[1.75]" />
                      <h3 className="font-serif text-base text-luxury-dark font-semibold text-balance">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-xs text-luxury-muted leading-relaxed font-sans font-normal text-pretty">
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
