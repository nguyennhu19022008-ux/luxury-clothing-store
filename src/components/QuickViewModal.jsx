import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Ruler, Sparkles, Check, ShieldCheck } from 'lucide-react';
import { useStore, formatVND } from '../context/StoreContext';

export const QuickViewModal = () => {
  const { quickViewProduct, closeQuickView, addToCart, openCart, openQuickOrder } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset internal states when product changes
  useEffect(() => {
    if (quickViewProduct) {
      setActiveImageIndex(0);
      setSelectedColorIndex(0);
      setSelectedSizeIndex(0);
      setQuantity(1);
      setShowSizeGuide(false);
      setIsZoomed(false);
    }
  }, [quickViewProduct]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && quickViewProduct) {
        closeQuickView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, closeQuickView]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const colors = product.colors || [{ id: 'standard', name: 'Tiêu chuẩn', hex: '#141413' }];
  const sizes = product.sizes || [
    { id: 'S', name: 'S', measurements: 'Ngực 84-88cm' },
    { id: 'M', name: 'M', measurements: 'Ngực 88-92cm' },
    { id: 'L', name: 'L', measurements: 'Ngực 92-96cm' },
    { id: 'XL', name: 'XL', measurements: 'Ngực 96-102cm' },
  ];
  const images = product.images?.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200'
  ];

  const currentColor = colors[selectedColorIndex] || colors[0];
  const currentSize = sizes[selectedSizeIndex] || sizes[0];
  const activeImage = images[activeImageIndex] || images[0];

  const handleAddToCart = () => {
    addToCart(product, currentColor, currentSize, quantity);
    closeQuickView();
    openCart();
  };

  const handleBuyNow = () => {
    const colorName = currentColor.name || currentColor.id;
    const sizeName = currentSize.name || currentSize.id;
    const singleItem = {
      id: `${product.id}-${colorName}-${sizeName}`,
      product,
      selectedColor: colorName,
      colorHex: currentColor.hex,
      selectedSize: sizeName,
      quantity,
    };
    closeQuickView();
    openQuickOrder(singleItem);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={closeQuickView}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-luxury-bone border border-luxury-sand shadow-2xl flex flex-col lg:flex-row overflow-hidden animate-modal-spring"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button [X] */}
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 text-luxury-dark hover:text-neutral-500 bg-luxury-bone/80 hover:bg-luxury-bone backdrop-blur-md border border-luxury-sand transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-dark"
          aria-label="Đóng cửa sổ xem nhanh"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Product Gallery */}
        <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-luxury-ivory border-b lg:border-b-0 lg:border-r border-luxury-sand">
          {/* Main Visual with hover zoom */}
          <div
            className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 border border-luxury-sand/80 cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img
              src={activeImage}
              alt={product.name}
              className={`w-full h-full object-cover object-top transition-transform duration-500 ease-out ${
                isZoomed ? 'scale-110' : 'scale-100'
              }`}
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-luxury-bone/95 backdrop-blur-sm text-[10px] font-mono tracking-wider uppercase text-luxury-dark border border-luxury-sand shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-20 flex-shrink-0 overflow-hidden border transition-all ${
                    idx === activeImageIndex
                      ? 'border-luxury-dark ring-1 ring-luxury-dark'
                      : 'border-luxury-sand opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Xem ảnh góc nhìn ${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & SKU */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-luxury-muted">
                {product.categoryName}
              </span>
              {product.sku && (
                <span className="text-[10px] font-mono text-luxury-muted">
                  SKU: {product.sku}
                </span>
              )}
            </div>

            {/* Product Title */}
            <h2 id="quick-view-title" className="font-serif text-2xl sm:text-3xl text-luxury-dark font-medium leading-snug text-balance">
              {product.name}
            </h2>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 pb-2 border-b border-luxury-sand">
              <span className="font-serif text-2xl text-luxury-dark font-semibold">
                {formatVND(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-luxury-muted line-through font-mono">
                  {formatVND(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Composition Highlight */}
            {product.composition && (
              <div className="p-3 bg-luxury-ivory border border-luxury-sand/80 text-xs text-luxury-charcoal flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-luxury-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-luxury-dark uppercase tracking-wider text-[10px] block">
                    Chất liệu tự nhiên thượng thừa
                  </span>
                  <p className="mt-0.5 leading-relaxed text-pretty max-w-[75ch]">{product.composition}</p>
                </div>
              </div>
            )}

            {/* Color Swatches */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-luxury-muted uppercase tracking-wider font-medium text-[11px]">
                  Màu sắc: <strong className="text-luxury-dark">{currentColor.name}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {colors.map((color, idx) => (
                  <button
                    key={color.id || idx}
                    type="button"
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`group relative w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      idx === selectedColorIndex ? 'ring-2 ring-luxury-dark ring-offset-2 scale-110' : 'opacity-80 hover:opacity-100 border border-neutral-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Chọn màu ${color.name}`}
                  >
                    {idx === selectedColorIndex && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector & Guide */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-luxury-muted uppercase tracking-wider font-medium text-[11px]">
                  Kích cỡ: <strong className="text-luxury-dark">{currentSize.name}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="flex items-center gap-1 text-[11px] text-luxury-muted hover:text-luxury-dark underline tracking-wider"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Hướng dẫn số đo</span>
                </button>
              </div>

              {/* Sizing Grid */}
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size, idx) => (
                  <button
                    key={size.id || idx}
                    type="button"
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`py-2 text-xs font-mono font-medium tracking-wider uppercase border transition-all ${
                      idx === selectedSizeIndex
                        ? 'bg-luxury-dark text-luxury-bone border-luxury-dark shadow-sm'
                        : 'bg-transparent text-luxury-charcoal border-luxury-sand hover:border-luxury-dark'
                    }`}
                  >
                    {size.name || size.id}
                  </button>
                ))}
              </div>

              {/* Size Measurement Guide Tooltip/Box */}
              {showSizeGuide && (
                <div className="p-3 bg-luxury-ivory border border-luxury-sand text-xs space-y-1.5 animate-fadeIn">
                  <div className="font-semibold text-luxury-dark text-[11px] uppercase tracking-wider">
                    Thông số may đo khuyến nghị:
                  </div>
                  <ul className="space-y-1 font-mono text-[11px] text-luxury-charcoal">
                    {sizes.map((s) => (
                      <li key={s.id} className="flex justify-between border-b border-luxury-sand/40 py-0.5">
                        <span className="font-bold">Size {s.id}:</span>
                        <span>{s.measurements || 'Chuẩn form may đo'}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Quantity Stepper */}
            <div className="space-y-2 pt-2">
              <span className="text-luxury-muted uppercase tracking-wider font-medium text-[11px] block">
                Số lượng:
              </span>
              <div className="inline-flex items-center border border-luxury-sand bg-luxury-ivory">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="p-2.5 text-luxury-dark hover:text-neutral-500 transition-colors"
                  aria-label="Giảm số lượng"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-2 font-mono text-xs font-semibold text-luxury-dark min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="p-2.5 text-luxury-dark hover:text-neutral-500 transition-colors"
                  aria-label="Tăng số lượng"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dual Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-luxury-sand">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="py-3 px-4 bg-transparent hover:bg-luxury-ivory text-luxury-dark border border-luxury-dark text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm Vào Giỏ</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="py-3 px-4 bg-luxury-dark hover:bg-neutral-800 text-luxury-bone border border-luxury-dark text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md"
              >
                <span>Mua Ngay</span>
              </button>
            </div>

            <p className="text-[10.5px] text-center text-luxury-muted tracking-wide flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
              <span>Đặc quyền thử trang phục tại gia · Miễn phí đổi cỡ 48h</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
