import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CATEGORY_ITEMS = [
  {
    id: 'ao-khoac',
    title: 'Áo Khoác & Măng Tô',
    tagline: 'Cashmere & Virgin Wool',
    count: '3 Thiết kế',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
    description: 'Chế tác từ len lông cừu nguyên chất và cashmere Mông Cổ thượng hạng. Đường cắt may dứt khoát định hình phom dáng kiến trúc quyền lực và ấm áp.',
  },
  {
    id: 'vay-dam',
    title: 'Váy & Đầm Dạ Hội',
    tagline: 'Mulberry Silk & Satin',
    count: '3 Thiết kế',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop',
    description: 'Nâng niu từng chuyển động với lụa tơ tằm Hà Đông và satin Ý óng ả. Kỹ thuật cắt xéo bias-cut ôm trọn đường cong cơ thể một cách tự nhiên nhất.',
  },
  {
    id: 'so-mi-lua',
    title: 'Sơ Mi Lụa Tơ Tằm',
    tagline: 'Habotai & Georgette',
    count: '2 Thiết kế',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
    description: 'Vẻ đẹp thanh lịch thường nhật được tái định nghĩa với chất vải habotai siêu nhẹ, khuy xà cừ tự nhiên đính thủ công tinh xảo từng mũi chỉ.',
  },
  {
    id: 'quan-tay',
    title: 'Quần Tây May Đo',
    tagline: 'Merino 130s Bespoke',
    count: '2 Thiết kế',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    description: 'Phom quần đứng thẳng tắp được may đo chuẩn xác theo tỷ lệ vóc dáng người Á Đông từ vải len Merino 130s thoáng khí và chống nhăn tự nhiên.',
  },
  {
    id: 'phu-kien',
    title: 'Phụ Kiện Tinh Tuyển',
    tagline: 'Jacquard Silk & Vachetta',
    count: '2 Thiết kế',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop',
    description: 'Điểm nhấn hoàn hảo cho tổng thể trang phục với khăn lụa dệt hoa văn jacquard thủ công và đồ da vachetta cao cấp thuộc thảo mộc bền bỉ.',
  },
];

export const CategoryShowcase = ({ onSelectCategory }) => {
  const [activeId, setActiveId] = useState('ao-khoac');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const activeItem = CATEGORY_ITEMS.find((c) => c.id === activeId) || CATEGORY_ITEMS[0];
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const handleChoose = (id) => {
    if (id === activeId) return;
    setIsTransitioning(true);
    setActiveId(id);
    if (typeof onSelectCategory === 'function') {
      onSelectCategory(id);
    }
    setTimeout(() => setIsTransitioning(false), 250);
  };

  return (
    <section ref={sectionRef} id="categories" className="reveal-on-scroll py-20 lg:py-32 bg-[#F7F4EE] border-b border-[#E3DDD4] scroll-mt-20">
      <div className="w-full max-w-none px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
        
        {/* Section Header with text-balance and text-pretty */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 pb-6 border-b border-[#E3DDD4]">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.25em] text-luxury-gold uppercase block mb-2">
              Bộ Khảo Cứu Chủng Loại /// ARCHIVE 2026
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-luxury-dark font-normal tracking-tight text-balance descender-safe">
              Năm Phân Loại May Đo Tinh Tuyển
            </h2>
          </div>
          <p className="font-sans text-sm text-luxury-muted max-w-[75ch] mt-4 md:mt-0 font-normal text-pretty">
            Mỗi phân loại đại diện cho một nhánh kỹ nghệ chế tác độc lập tại Atelier, tôn vinh kỹ thuật thủ công và sợi dệt tự nhiên thuần khiết.
          </p>
        </div>

        {/* Asymmetrical Bento Split: Master Switcher on Left, 16:9 Showcase Frame on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-18 items-center">
          
          {/* Left Column: Interactive Asymmetric Category Switcher & Details */}
          <div className="flex flex-col space-y-4">
            <div className="space-y-3">
              {CATEGORY_ITEMS.map((item, idx) => {
                const isActive = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleChoose(item.id)}
                    className={`reveal-child stagger-${idx + 1} w-full p-4 sm:p-5 text-left transition-all duration-300 border rounded-xl flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#EFE9DF] border-luxury-dark shadow-md translate-x-1 sm:translate-x-2'
                        : 'bg-white/60 border-[#E8E2D7] hover:border-luxury-dark/50 hover:bg-white/90'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-luxury-gold font-bold">
                        0{idx + 1}
                      </span>
                      <div>
                        <h3 className="font-serif text-lg sm:text-xl font-medium text-luxury-dark text-balance">
                          {item.title}
                        </h3>
                        <span className="text-[11px] font-mono text-luxury-muted uppercase tracking-wider block mt-0.5">
                          {item.tagline}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-luxury-muted hidden sm:inline">{item.count}</span>
                      <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-luxury-dark rotate-45' : 'text-luxury-muted'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Detail & Collection CTA */}
            <div className="pt-4 border-t border-[#E3DDD4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-luxury-muted max-w-[75ch] text-pretty leading-relaxed">
                {activeItem.description}
              </p>
              <a
                href="#collection"
                onClick={() => {
                  if (typeof onSelectCategory === 'function') onSelectCategory(activeItem.id);
                  const el = document.getElementById('collection');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-luxury-dark text-luxury-bone text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors shrink-0 rounded-full"
              >
                <span>Xem {activeItem.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: 16:9 Widescreen Showcase Image Frame with Warm Camel Frame */}
          <div className="relative w-full aspect-[16/9] bg-luxury-ivory border border-[#D8D0C3] rounded-2xl overflow-hidden shadow-2xl satin-sheen-box group">
            <img
              src={activeItem.image}
              alt={activeItem.title}
              key={activeItem.id}
              className={`w-full h-full object-cover object-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
                isTransitioning ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
              }`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4 bg-luxury-bone/95 backdrop-blur-sm px-3.5 py-1 rounded-full border border-luxury-sand text-[10.5px] font-mono tracking-widest text-luxury-dark font-bold uppercase shadow-sm">
              PHÂN LOẠI /// {activeItem.title.toUpperCase()}
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-luxury-bone/90 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-luxury-sand flex items-center justify-between shadow-lg">
              <div>
                <div className="text-[10px] font-mono tracking-wider text-luxury-gold uppercase font-bold">
                  {activeItem.tagline}
                </div>
                <div className="font-serif text-base sm:text-lg text-luxury-dark font-medium text-balance mt-0.5">
                  {activeItem.title}
                </div>
              </div>
              <span className="text-xs font-mono text-luxury-muted">{activeItem.count}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
