import React, { useEffect } from 'react';
import {
  CheckCircle2,
  Printer,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
  X,
  CreditCard,
  QrCode,
  Award
} from 'lucide-react';
import { useStore, formatVND } from '../context/StoreContext';

export const OrderSuccessModal = () => {
  const { completedOrder, closeOrderSuccess } = useStore();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && completedOrder) {
        closeOrderSuccess();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [completedOrder, closeOrderSuccess]);

  if (!completedOrder) return null;

  const {
    orderId,
    items = [],
    subtotal = 0,
    discount = 0,
    giftWrap = 0,
    totalAmount = 0,
    orderDetails = {},
    createdAt,
  } = completedOrder;

  const {
    customerName,
    phoneNumber,
    address,
    paymentMethod = 'cod',
    notes,
  } = orderDetails;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('vi-VN');

  const getPaymentMethodLabel = (method) => {
    switch (method) {
      case 'vietqr':
        return 'Chuyển khoản VietQR (MB Bank: 0876637806 - NGUYEN NHU)';
      case 'card':
        return 'Thẻ thanh toán quốc tế Visa/Mastercard';
      case 'cod':
      default:
        return 'Thanh toán khi nhận hàng & Thử đồ tại gia (COD)';
    }
  };

  const handlePrint = () => {
    try {
      if (typeof window !== 'undefined' && window.print) {
        window.print();
      }
    } catch (e) {
      console.warn('Print failed or cancelled:', e);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={closeOrderSuccess}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div
        className="relative w-full max-w-2xl my-auto bg-luxury-bone border border-luxury-gold/50 shadow-2xl p-6 sm:p-8 md:p-10 text-luxury-charcoal animate-scaleUp max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button [X] */}
        <button
          type="button"
          onClick={closeOrderSuccess}
          className="absolute top-4 right-4 p-2 text-luxury-dark hover:text-neutral-500 bg-luxury-ivory border border-luxury-sand transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-dark"
          aria-label="Đóng biên nhận"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Royal Atelier Seal & Header */}
        <div className="text-center space-y-3 pb-6 border-b border-luxury-sand relative">
          <div className="w-16 h-16 mx-auto rounded-full bg-luxury-ivory border-2 border-luxury-gold/60 flex items-center justify-center shadow-inner">
            <Award className="w-8 h-8 text-luxury-gold stroke-[1.5]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-luxury-gold font-bold block">
              Atelier Vuonggia Official Receipt
            </span>
            <h2 id="success-modal-title" className="font-serif text-2xl sm:text-3xl font-medium text-luxury-dark uppercase tracking-wide text-balance">
              XÁC NHẬN ĐƠN HÀNG THÀNH CÔNG
            </h2>
          </div>

          {/* Official Order Code */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-luxury-ivory border border-luxury-sand/80 font-mono text-xs text-luxury-dark">
            <span className="text-luxury-muted">Mã Đơn Hàng:</span>
            <strong className="tracking-wider text-sm font-bold text-luxury-gold">{orderId}</strong>
          </div>

          <p className="text-xs text-luxury-muted max-w-[75ch] mx-auto pt-1 leading-relaxed text-pretty">
            Trân trọng cảm ơn Quý khách <strong className="text-luxury-dark">{customerName}</strong>.
            Tác phẩm may đo của Quý khách đã được tiếp nhận và chuyển đến Xưởng chế tác Atelier.
          </p>
        </div>

        {/* Customer & Delivery Summary Card */}
        <div className="py-5 border-b border-luxury-sand grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2 bg-luxury-ivory p-3.5 border border-luxury-sand/70">
            <span className="font-mono text-[10px] uppercase text-luxury-gold font-bold tracking-wider block">
              Thông Tin Khách Hàng
            </span>
            <div className="space-y-1 text-luxury-charcoal">
              <div><strong>Họ và tên:</strong> {customerName}</div>
              <div><strong>Số điện thoại:</strong> <span className="font-mono">{phoneNumber}</span></div>
              <div className="line-clamp-2"><strong>Địa chỉ nhận:</strong> {address}</div>
              {notes && <div className="text-luxury-muted italic"><strong>Ghi chú:</strong> {notes}</div>}
            </div>
          </div>

          <div className="space-y-2 bg-luxury-ivory p-3.5 border border-luxury-sand/70">
            <span className="font-mono text-[10px] uppercase text-luxury-gold font-bold tracking-wider block">
              Phương Thức & Thời Gian
            </span>
            <div className="space-y-1 text-luxury-charcoal">
              <div><strong>Thanh toán:</strong> {getPaymentMethodLabel(paymentMethod)}</div>
              <div><strong>Thời gian lập:</strong> <span className="font-mono">{formattedDate}</span></div>
              <div className="text-luxury-green font-medium flex items-center gap-1 mt-1">
                <Truck className="w-3.5 h-3.5" />
                <span>Giao hỏa tốc 24h nội thành</span>
              </div>
            </div>
          </div>
        </div>

        {/* Itemized List of Purchased Garments */}
        <div className="py-5 border-b border-luxury-sand space-y-3">
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-luxury-muted block">
            Danh Mục Trang Phục May Đo ({items.length} tác phẩm):
          </span>

          <div className="divide-y divide-luxury-sand/60">
            {items.map((item, idx) => {
              const itemTotal = (item.product?.price || 0) * (item.quantity || 1);
              return (
                <div key={item.id || idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-luxury-muted text-[11px] w-4">{idx + 1}.</span>
                    <div>
                      <div className="font-serif font-medium text-luxury-dark text-sm">
                        {item.product?.name}
                      </div>
                      <div className="text-[11px] text-luxury-muted flex items-center gap-2">
                        <span>{item.selectedColor}</span>
                        <span>·</span>
                        <span className="font-mono">Size {item.selectedSize}</span>
                        <span>·</span>
                        <span className="font-mono">SL: {item.quantity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="font-serif font-semibold text-luxury-dark">
                    {formatVND(itemTotal)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="py-5 border-b border-luxury-sand space-y-1.5 text-xs">
          <div className="flex justify-between text-luxury-muted">
            <span>Tạm tính các sản phẩm:</span>
            <span className="font-mono text-luxury-dark">{formatVND(subtotal)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-luxury-green font-medium">
              <span>Ưu đãi VIP (VUONGGIA -10%):</span>
              <span className="font-mono">-{formatVND(discount)}</span>
            </div>
          )}

          {giftWrap > 0 && (
            <div className="flex justify-between text-luxury-muted">
              <span>Hộp quà nhung lụa cao cấp:</span>
              <span className="font-mono text-luxury-dark">+{formatVND(giftWrap)}</span>
            </div>
          )}

          <div className="flex justify-between text-luxury-muted">
            <span>Phí vận chuyển và bảo hiểm lụa/cashmere:</span>
            <span className="text-luxury-dark font-medium uppercase text-[10.5px]">Đặc quyền 0₫</span>
          </div>

          <div className="pt-3 border-t border-luxury-sand flex justify-between items-baseline">
            <span className="font-serif text-base font-semibold text-luxury-dark uppercase tracking-wider">
              Tổng thanh toán:
            </span>
            <span className="font-serif text-2xl font-bold text-luxury-dark">
              {formatVND(totalAmount)}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 py-3 px-4 bg-transparent hover:bg-luxury-ivory text-luxury-dark border border-luxury-sand text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>In / Tải Biên Nhận</span>
          </button>

          <button
            type="button"
            onClick={closeOrderSuccess}
            className="flex-1 py-3 px-4 bg-luxury-dark hover:bg-neutral-800 text-luxury-bone text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Tiếp Tục Mua Sắm</span>
          </button>
        </div>

        <p className="text-[10.5px] text-center text-luxury-muted pt-4 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
          <span>Hotline hỗ trợ nghệ nhân may đo 24/7: 0876637806 (VUONGGIA Atelier)</span>
        </p>
      </div>
    </div>
  );
};
