import React, { useState } from 'react';
import { Eye, ShoppingBag } from 'lucide-react';
import { useStore, formatVND } from '../context/StoreContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ProductCard = ({ product, index = 0, onQuickView, onQuickOrder }) => {
  let store = null;
  try {
    store = useStore();
  } catch (e) {
    // Graceful fallback if rendered outside StoreProvider
  }

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const currentColor = product.colors?.[selectedColorIndex] || product.colors?.[0] || { id: 'standard', name: 'Tiêu chuẩn', hex: '#141413' };
  const currentImage = product.images?.[0] || 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800';

  const handleQuickViewClick = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else if (store?.openQuickView) {
      store.openQuickView(product);
    }
  };

  const handleQuickOrderClick = (e) => {
    e.stopPropagation();
    const currentSize = product.sizes?.[0] || { id: 'M', name: 'M' };
    const colorName = currentColor.name || currentColor.id;
    const sizeName = currentSize.name || currentSize.id;
    const cartItem = {
      id: `${product.id}-${colorName}-${sizeName}`,
      product,
      selectedColor: colorName,
      colorHex: currentColor.hex,
      selectedSize: sizeName,
      quantity: 1,
    };

    if (onQuickOrder) {
      onQuickOrder(cartItem, currentColor, currentSize);
    } else if (store?.openQuickOrder) {
      store.openQuickOrder(cartItem);
    }
  };

  const cardRef = useScrollReveal({ threshold: 0.08 });
  const staggerClass = `stagger-${(index % 4) + 1}`;

  return (
    <article ref={cardRef} className={`reveal-on-scroll ${staggerClass} group flex flex-col bg-luxury-bone border border-luxury-sand/80 hover:border-luxury-dark/80 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 rounded-2xl overflow-hidden p-2.5`}>
      
      {/* Visual Frame with Satin Sheen Sweep in 16:9 Widescreen (Double-Bezel Inner Core) */}
      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-luxury-ivory satin-sheen-box shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover object-[center_30%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-0.5 bg-luxury-bone/95 backdrop-blur-sm text-[9.5px] font-mono tracking-wider uppercase text-luxury-dark border border-luxury-sand/80 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-0.5 bg-luxury-dark text-luxury-bone text-[9px] font-mono tracking-widest uppercase self-start rounded-full">
              NEW
            </span>
          )}
        </div>

        {/* Quick Action Overlay Bar */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
          <button
            type="button"
            onClick={handleQuickViewClick}
            className="flex-1 py-2 px-3 bg-luxury-bone/95 hover:bg-luxury-bone text-luxury-dark backdrop-blur-md text-xs font-semibold uppercase tracking-wider border border-luxury-sand rounded-full flex items-center justify-center gap-1.5 shadow-md active:scale-95 active-haptic transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-dark cursor-pointer"
            title="Xem chi tiết thiết kế"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem Nhanh</span>
          </button>

          <button
            type="button"
            onClick={handleQuickOrderClick}
            className="flex-1 py-2 px-3 bg-luxury-dark hover:bg-neutral-800 text-luxury-bone text-xs font-semibold uppercase tracking-wider rounded-full flex items-center justify-center gap-1.5 shadow-md active:scale-95 active-haptic transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-dark cursor-pointer"
            title="Mua ngay tác phẩm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Mua Ngay</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow space-y-3">
        
        {/* Category & Color Swatches */}
        <div className="flex items-center justify-between">
          <span className="text-[10.5px] font-mono uppercase tracking-widest text-luxury-muted">
            {product.categoryName}
          </span>

          {/* Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5" aria-label="Bảng màu sắc">
              {product.colors.map((color, idx) => (
                <button
                  key={color.id || idx}
                  type="button"
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    idx === selectedColorIndex ? 'ring-2 ring-luxury-dark ring-offset-1 scale-110' : 'border-neutral-300 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Chọn màu ${color.name}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Title with text-balance */}
        <h3
          onClick={handleQuickViewClick}
          className="font-serif text-lg sm:text-xl text-luxury-dark font-medium leading-snug cursor-pointer hover:text-neutral-600 transition-colors text-balance"
        >
          {product.name}
        </h3>

        {/* Tagline with text-pretty and character bound */}
        <p className="text-xs sm:text-sm text-luxury-muted line-clamp-2 font-normal leading-relaxed text-pretty max-w-[75ch]">
          {product.tagline}
        </p>

        {/* Price Row */}
        <div className="pt-2 border-t border-luxury-sand/60 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-base sm:text-lg font-semibold text-luxury-dark">
              {formatVND(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-luxury-muted line-through font-mono">
                {formatVND(product.originalPrice)}
              </span>
            )}
          </div>

          <span className="text-[11px] font-sans font-medium text-luxury-gold uppercase tracking-wider">
            {product.sizes?.map(s => s.id).join(' · ')}
          </span>
        </div>

      </div>

    </article>
  );
};
