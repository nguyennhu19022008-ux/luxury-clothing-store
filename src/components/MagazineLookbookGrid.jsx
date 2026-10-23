import React, { useState } from 'react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Quote, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const MagazineLookbookGrid = ({
  selectedCategory = 'all',
  onSelectCategory,
  onQuickView,
  onQuickOrder,
}) => {
  const [activeTab, setActiveTab] = useState(selectedCategory || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const headerRef = useScrollReveal({ threshold: 0.1 });
  const lookbookRef = useScrollReveal({ threshold: 0.1 });

  const handleTabChange = (catId) => {
    setActiveTab(catId);
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <section id="collection" className="py-20 lg:py-28 bg-luxury-bone border-b border-luxury-sand scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with text-balance and text-pretty */}
        <div ref={headerRef} className="reveal-on-scroll flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-4 h-[1px] bg-luxury-gold inline-block" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-luxury-gold uppercase">
              Catalogue Raisonné 2026
            </span>
            <span className="w-4 h-[1px] bg-luxury-gold inline-block" />
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-luxury-dark font-normal tracking-tight text-balance descender-safe">
            Bộ Sưu Tập May Đo Độc Bản
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-luxury-charcoal mt-3 max-w-[75ch] font-normal leading-relaxed text-pretty">
            Tuyển chọn 12 thiết kế giới hạn được định hình theo phom dáng chuẩn mực, kỹ thuật may đo bespoke và chất liệu tự nhiên thượng thừa.
          </p>
        </div>

        {/* Category Filter Tabs & Sorting Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-4 border-b border-luxury-sand">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none" role="tablist">
            {CATEGORIES.map((cat) => {
              const isActive = (activeTab || 'all') === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabChange(cat.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all rounded-none border cursor-pointer ${
                    isActive
                      ? 'bg-luxury-dark text-luxury-bone border-luxury-dark shadow-sm'
                      : 'bg-transparent text-luxury-muted border-transparent hover:text-luxury-dark hover:border-luxury-sand'
                  } focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-dark`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs text-luxury-muted">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-luxury-dark font-medium border-b border-luxury-sand pb-0.5 focus:outline-none cursor-pointer"
            >
              <option value="featured">Nổi bật nhất</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
            </select>
          </div>

        </div>

        {/* Products Grid: 2-Column Wide Editorial Magazine Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {filteredProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onQuickView={onQuickView}
              onQuickOrder={onQuickOrder}
            />
          ))}
        </div>

        {/* ============================================================ */}
        {/* EDITORIAL SPREAD INTERLUDE: BALANCED 2-COLUMN 16:9 SPLIT     */}
        {/* ============================================================ */}
        <div ref={lookbookRef} id="lookbook" className="reveal-on-scroll mt-24 pt-20 border-t border-luxury-sand scroll-mt-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Visual: 16:9 Widescreen Lookbook Visual */}
            <div className="relative bg-luxury-ivory border border-luxury-sand overflow-hidden aspect-[16/9] group shadow-xl satin-sheen-box">
              <img
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop"
                alt="Editorial Look 02 - Đầm Lụa Tơ Tằm"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-luxury-bone/90 backdrop-blur-sm px-3 py-1 text-[11px] font-mono tracking-widest text-luxury-dark font-bold uppercase border border-luxury-sand">
                LOOK 02 — L'ÉLÉGANCE PURE
              </div>
            </div>

            {/* Right Column: 16:9 Macro Texture Shot + Manifesto Quote */}
            <div className="flex flex-col justify-between space-y-6">
              
              {/* Texture Macro Shot in 16:9 */}
              <div className="relative aspect-[16/9] w-full bg-neutral-200 border border-luxury-sand overflow-hidden shadow-sm satin-sheen-box">
                <img
                  src="https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?q=80&w=800&auto=format&fit=crop"
                  alt="Chi tiết đường may xà cừ và thớ dệt len thô"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 bg-luxury-dark text-luxury-bone px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider">
                  Hand-rolled Seams 21 stitches/inch
                </div>
              </div>

              {/* Manifesto Quote Block with text-pretty */}
              <div className="p-6 sm:p-8 bg-luxury-ivory border border-luxury-sand relative">
                <Quote className="w-8 h-8 text-luxury-gold/50 mb-3" />
                <p className="font-serif italic text-lg sm:text-xl text-luxury-dark leading-relaxed text-pretty max-w-[75ch]">
                  "Thời trang thực thụ không tìm kiếm sự chú ý bằng âm thanh ồn ào. Nó chinh phục không gian bằng sự hoàn hảo của chất liệu và vẻ tĩnh lặng tuyệt đối."
                </p>
                <div className="mt-4 pt-4 border-t border-luxury-sand/80 flex items-center justify-between">
                  <div>
                    <div className="font-sans text-xs font-semibold uppercase tracking-wider text-luxury-dark">
                      Atelier Vuonggia Manifesto
                    </div>
                    <div className="text-[10.5px] font-mono text-luxury-muted">
                      Hà Đông Heritage /// 2026
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-luxury-gold" />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
