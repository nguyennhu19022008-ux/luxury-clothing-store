import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Gift, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore, formatVND } from '../context/StoreContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartTotalCount,
    isGiftWrapSelected,
    setIsGiftWrapSelected,
    giftWrapPrice,
    openQuickOrder,
  } = useStore();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  const giftFee = isGiftWrapSelected ? giftWrapPrice : 0;
  const grandTotal = cartSubtotal + giftFee;

  const handleCheckout = () => {
    openQuickOrder(null); // Full cart checkout
  };

  const handleExplore = () => {
    closeCart();
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!isCartOpen}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
      />

      {/* Drawer Container */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-luxury-bone border-l border-luxury-sand shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-luxury-sand flex items-center justify-between bg-luxury-ivory">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-luxury-dark" />
            <h2 id="cart-drawer-title" className="font-serif text-lg sm:text-xl font-medium text-luxury-dark tracking-wide uppercase">
              Giỏ Hàng Tinh Tuyển
            </h2>
            <span className="px-2 py-0.5 bg-luxury-dark text-luxury-bone font-mono text-[11px] rounded-full">
              {cartTotalCount}
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="p-1.5 text-luxury-dark hover:text-neutral-500 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-dark"
            aria-label="Đóng giỏ hàng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-grow overflow-y-auto p-5 sm:p-6 space-y-4">
          {cart.length === 0 ? (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-luxury-ivory border border-luxury-sand flex items-center justify-center text-luxury-muted">
                <ShoppingBag className="w-8 h-8 stroke-[1.25]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl text-luxury-dark font-medium text-balance">
                  Giỏ hàng của bạn đang trống
                </h3>
                <p className="text-xs text-luxury-muted max-w-[75ch] text-pretty">
                  Chưa có kiệt tác may đo nào được tuyển chọn. Hãy khám phá bộ sưu tập giới hạn Atelier 2026.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExplore}
                className="mt-4 px-6 py-3 bg-luxury-dark text-luxury-bone text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-sm"
              >
                Khám Phá Bộ Sưu Tập
              </button>
            </div>
          ) : (
            /* Cart Items List */
            <div className="divide-y divide-luxury-sand/70">
              {cart.map((item) => {
                const img = item.product?.images?.[0] || 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=300';
                return (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                    {/* Thumbnail (3:4) */}
                    <div className="relative aspect-[3/4] w-20 flex-shrink-0 bg-luxury-ivory border border-luxury-sand overflow-hidden">
                      <img src={img} alt={item.product?.name} className="w-full h-full object-cover object-top" />
                    </div>

                    {/* Item Info */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm sm:text-base text-luxury-dark font-medium line-clamp-1">
                            {item.product?.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-luxury-muted hover:text-red-700 p-1 transition-colors"
                            aria-label="Xóa sản phẩm"
                            title="Xóa khỏi giỏ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Variants */}
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-luxury-muted">
                          {item.colorHex && (
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-neutral-300 inline-block"
                              style={{ backgroundColor: item.colorHex }}
                            />
                          )}
                          <span>{item.selectedColor}</span>
                          <span>·</span>
                          <span className="font-mono font-medium">Size {item.selectedSize}</span>
                        </div>
                      </div>

                      {/* Price & Quantity Controls */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-luxury-sand/40">
                        <span className="font-serif text-sm font-semibold text-luxury-dark">
                          {formatVND(item.product?.price * item.quantity)}
                        </span>

                        <div className="inline-flex items-center border border-luxury-sand bg-luxury-ivory">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1.5 text-luxury-dark hover:text-neutral-500 transition-colors"
                            aria-label="Giảm số lượng"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 py-0.5 font-mono text-xs font-semibold text-luxury-dark min-w-[28px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1.5 text-luxury-dark hover:text-neutral-500 transition-colors"
                            aria-label="Tăng số lượng"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer & Order Summary */}
        {cart.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-luxury-sand bg-luxury-ivory space-y-4">
            {/* Velvet Gift Box Toggle */}
            <div className="p-3 bg-luxury-bone border border-luxury-sand flex items-start gap-3">
              <input
                id="drawer-gift-wrap"
                type="checkbox"
                checked={isGiftWrapSelected}
                onChange={(e) => setIsGiftWrapSelected(e.target.checked)}
                className="mt-1 h-4 w-4 rounded-none border-luxury-sand text-luxury-dark focus:ring-luxury-dark cursor-pointer"
              />
              <label htmlFor="drawer-gift-wrap" className="text-xs text-luxury-charcoal cursor-pointer flex-grow">
                <span className="font-semibold text-luxury-dark block flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-luxury-gold" />
                  Hộp quà nhung cao cấp đính nơ lụa (+150.000₫)
                </span>
                <span className="text-[11px] text-luxury-muted block mt-0.5">
                  Hộp nhung dập chìm thương hiệu Maison Vuonggia kèm thiệp ký gửi viết tay.
                </span>
              </label>
            </div>

            {/* Financial Summary */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-luxury-muted">
                <span>Tạm tính ({cartTotalCount} món):</span>
                <span className="font-mono text-luxury-dark">{formatVND(cartSubtotal)}</span>
              </div>

              {isGiftWrapSelected && (
                <div className="flex justify-between text-luxury-muted">
                  <span>Hộp quà nhung lụa:</span>
                  <span className="font-mono text-luxury-dark">+{formatVND(giftWrapPrice)}</span>
                </div>
              )}

              <div className="flex justify-between text-luxury-muted">
                <span>Phí vận chuyển:</span>
                <span className="text-luxury-dark font-medium uppercase text-[11px]">Đặc quyền 0₫</span>
              </div>

              <div className="pt-2 border-t border-luxury-sand flex justify-between items-baseline">
                <span className="font-serif text-sm font-semibold text-luxury-dark uppercase tracking-wider">
                  Tổng thanh toán:
                </span>
                <span className="font-serif text-xl font-bold text-luxury-dark">
                  {formatVND(grandTotal)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-3.5 px-4 bg-luxury-dark hover:bg-neutral-800 text-luxury-bone text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
            >
              <span>Tiến Hành Đặt Hàng</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-luxury-muted flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-luxury-gold" />
              <span>Thanh toán an toàn · Thử đồ tại gia trước khi trả tiền</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
