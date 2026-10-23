import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  CheckCircle2,
  Gift,
  ArrowRight,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Tag,
  Loader2,
  Copy,
  Check
} from 'lucide-react';
import { useStore, formatVND, isValidVietnamesePhone, calculateDiscount } from '../context/StoreContext';

export const QuickOrderModal = () => {
  const {
    isQuickOrderOpen,
    closeQuickOrder,
    quickOrderItem,
    cart,
    isGiftWrapSelected,
    giftWrapPrice,
    submitOrder,
  } = useStore();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'vietqr' | 'card'
  const [giftWrap, setGiftWrap] = useState(isGiftWrapSelected);

  // Card form simulation
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [addressTouched, setAddressTouched] = useState(false);
  const [voucherMessage, setVoucherMessage] = useState(null);
  const [itemsCollapsed, setItemsCollapsed] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  // Sync gift wrap when modal opens
  useEffect(() => {
    if (isQuickOrderOpen) {
      setGiftWrap(isGiftWrapSelected);
    }
  }, [isQuickOrderOpen, isGiftWrapSelected]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isQuickOrderOpen && !isSubmitting) {
        closeQuickOrder();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isQuickOrderOpen, isSubmitting, closeQuickOrder]);

  // Items to checkout: either single item or all cart items
  const checkoutItems = useMemo(() => {
    if (quickOrderItem) return [quickOrderItem];
    return cart;
  }, [quickOrderItem, cart]);

  // Calculations
  const subtotal = useMemo(() => {
    return checkoutItems.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1), 0);
  }, [checkoutItems]);

  const discountAmount = useMemo(() => {
    return calculateDiscount(subtotal, appliedVoucher);
  }, [subtotal, appliedVoucher]);

  const giftFee = giftWrap ? giftWrapPrice : 0;
  const shippingFee = 0; // Free luxury delivery
  const grandTotal = Math.max(0, subtotal - discountAmount + giftFee + shippingFee);

  // Validations
  const isPhoneValid = isValidVietnamesePhone(phoneNumber);
  const isNameValid = customerName.trim().length > 0;
  const isAddressValid = address.trim().length > 0;

  // Apply Voucher
  const handleApplyVoucher = (e) => {
    e?.preventDefault();
    const clean = voucherCode.trim().toUpperCase();
    if (clean === 'VUONGGIA') {
      setAppliedVoucher('VUONGGIA');
      setVoucherMessage({ type: 'success', text: 'Đặc quyền VIP VUONGGIA: Giảm 10% tổng đơn hàng' });
    } else if (clean === '') {
      setAppliedVoucher('');
      setVoucherMessage(null);
    } else {
      setAppliedVoucher('');
      setVoucherMessage({ type: 'error', text: 'Mã ưu đãi không hợp lệ hoặc đã hết lượt áp dụng' });
    }
  };

  // Copy bank STK
  const handleCopyStk = () => {
    navigator.clipboard?.writeText('0876637806');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameTouched(true);
    setPhoneTouched(true);
    setAddressTouched(true);

    if (!isNameValid || !isPhoneValid || !isAddressValid) {
      return;
    }

    if (checkoutItems.length === 0) {
      alert('Không có sản phẩm nào để đặt hàng.');
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury processing experience
    setTimeout(() => {
      try {
        submitOrder({
          customerName: customerName.trim(),
          phoneNumber: phoneNumber.trim(),
          address: address.trim(),
          notes: notes.trim(),
          discountCode: appliedVoucher,
          giftWrap,
          paymentMethod,
          cardInfo: paymentMethod === 'card' ? { cardNumber, cardExpiry } : null,
        });
      } catch (err) {
        console.error('Order submission failed:', err);
        alert(err.message || 'Đặt hàng thất bại');
      } finally {
        setIsSubmitting(false);
      }
    }, 600);
  };

  if (!isQuickOrderOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={closeQuickOrder}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-order-title"
    >
      <div
        className="relative w-full max-w-4xl my-auto bg-luxury-bone border border-luxury-sand shadow-2xl flex flex-col lg:flex-row overflow-hidden animate-scaleUp max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button [X] */}
        <button
          type="button"
          onClick={closeQuickOrder}
          disabled={isSubmitting}
          className="absolute top-4 right-4 z-20 p-2 text-luxury-dark hover:text-neutral-500 bg-luxury-bone/90 backdrop-blur-md border border-luxury-sand transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-dark"
          aria-label="Đóng biểu mẫu đặt hàng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Customer Information & Payment Methods */}
        <div className="lg:w-7/12 p-5 sm:p-7 overflow-y-auto space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-[1px] bg-luxury-gold inline-block" />
              <span className="text-[10.5px] font-mono tracking-widest uppercase text-luxury-gold">
                Đặt Hàng Trực Tiếp
              </span>
            </div>
            <h2 id="quick-order-title" className="font-serif text-2xl sm:text-3xl font-medium text-luxury-dark text-balance">
              Thông Tin Khách Hàng
            </h2>
            <p className="text-xs text-luxury-muted mt-1 text-pretty max-w-[75ch]">
              {quickOrderItem ? 'Mua ngay tác phẩm độc bản' : 'Thanh toán trọn gói giỏ hàng tinh tuyển'}
            </p>
          </div>

          <form onSubmit={handleSubmit} id="quick-order-form" className="space-y-5">
            {/* Customer Name */}
            <div className="space-y-1">
              <label className="block text-xs font-medium uppercase tracking-wider text-luxury-dark">
                Họ và Tên <span className="text-luxury-red">*</span>
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                onBlur={() => setNameTouched(true)}
                placeholder="Nguyễn Văn A"
                className={`w-full px-3.5 py-2.5 bg-luxury-ivory border text-xs text-luxury-dark placeholder-neutral-400 focus:outline-none focus:ring-1 transition-all ${
                  nameTouched && !isNameValid
                    ? 'border-luxury-red focus:ring-luxury-red'
                    : 'border-luxury-sand focus:border-luxury-dark focus:ring-luxury-dark'
                }`}
              />
              {nameTouched && !isNameValid && (
                <p className="text-[11px] text-luxury-red flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Vui lòng nhập họ và tên của Quý khách</span>
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="block text-xs font-medium uppercase tracking-wider text-luxury-dark">
                Số Điện Thoại <span className="text-luxury-red">*</span>
              </label>
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={() => setPhoneTouched(true)}
                placeholder="0901234567 hoặc +84901234567"
                className={`w-full px-3.5 py-2.5 bg-luxury-ivory border text-xs text-luxury-dark placeholder-neutral-400 focus:outline-none focus:ring-1 transition-all font-mono ${
                  phoneTouched && !isPhoneValid
                    ? 'border-luxury-red focus:ring-luxury-red'
                    : 'border-luxury-sand focus:border-luxury-dark focus:ring-luxury-dark'
                }`}
              />
              {phoneTouched && !isPhoneValid && (
                <p className="text-[11px] text-luxury-red flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Số điện thoại không hợp lệ (Vui lòng nhập 10 chữ số chuẩn mạng viễn thông Việt Nam)</span>
                </p>
              )}
            </div>

            {/* Detailed Address */}
            <div className="space-y-1">
              <label className="block text-xs font-medium uppercase tracking-wider text-luxury-dark">
                Địa Chỉ Nhận Hàng Chi Tiết <span className="text-luxury-red">*</span>
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={() => setAddressTouched(true)}
                placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                className={`w-full px-3.5 py-2.5 bg-luxury-ivory border text-xs text-luxury-dark placeholder-neutral-400 focus:outline-none focus:ring-1 transition-all ${
                  addressTouched && !isAddressValid
                    ? 'border-luxury-red focus:ring-luxury-red'
                    : 'border-luxury-sand focus:border-luxury-dark focus:ring-luxury-dark'
                }`}
              />
              {addressTouched && !isAddressValid && (
                <p className="text-[11px] text-luxury-red flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Vui lòng cung cấp địa chỉ nhận hàng chi tiết</span>
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="block text-xs font-medium uppercase tracking-wider text-luxury-dark">
                Ghi Chú Cho Stylist / Nghệ Nhân May Đo <span className="text-luxury-muted font-normal">(Tùy chọn)</span>
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Yêu cầu riêng về số đo, thời gian thử đồ hoặc dặn dò giao hàng..."
                className="w-full px-3.5 py-2.5 bg-luxury-ivory border border-luxury-sand text-xs text-luxury-dark placeholder-neutral-400 focus:outline-none focus:border-luxury-dark focus:ring-1 focus:ring-luxury-dark resize-none"
              />
            </div>

            {/* 3 Mock Payment Methods */}
            <div className="space-y-2.5 pt-2">
              <label className="block text-xs font-medium uppercase tracking-wider text-luxury-dark">
                Phương Thức Thanh Toán Tinh Tuyển
              </label>

              <div className="space-y-2">
                {/* Method 1: COD */}
                <label
                  className={`block p-3.5 border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-luxury-dark bg-luxury-ivory shadow-sm'
                      : 'border-luxury-sand bg-luxury-bone hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-0.5 text-luxury-dark focus:ring-luxury-dark"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-luxury-dark flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-luxury-gold" />
                          Thanh toán khi nhận hàng & Thử đồ tại gia (COD)
                        </span>
                      </div>
                      <p className="text-[11px] text-luxury-muted mt-1 leading-relaxed">
                        Khách hàng có quyền thử trang phục trong 15 phút cùng chuyên viên tư vấn trước khi thanh toán.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Method 2: VietQR */}
                <label
                  className={`block p-3.5 border cursor-pointer transition-all ${
                    paymentMethod === 'vietqr'
                      ? 'border-luxury-dark bg-luxury-ivory shadow-sm'
                      : 'border-luxury-sand bg-luxury-bone hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="vietqr"
                      checked={paymentMethod === 'vietqr'}
                      onChange={() => setPaymentMethod('vietqr')}
                      className="mt-0.5 text-luxury-dark focus:ring-luxury-dark"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-luxury-dark flex items-center gap-1.5">
                          <QrCode className="w-4 h-4 text-luxury-gold" />
                          Chuyển khoản tức thì qua VietQR (Khuyên dùng)
                        </span>
                      </div>
                      <p className="text-[11px] text-luxury-muted mt-1">
                        Xử lý tức thì 24/7 qua cổng thanh toán liên ngân hàng Napas247.
                      </p>

                      {paymentMethod === 'vietqr' && (
                        <div className="mt-3 p-3 bg-white border border-luxury-sand space-y-2 text-xs animate-fadeIn">
                          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                            <span className="font-semibold text-luxury-dark">Ngân hàng MB Bank</span>
                            <span className="text-[10.5px] font-mono text-luxury-muted">Chi nhánh Hà Nội</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[11.5px]">
                            <div>
                              <span className="text-luxury-muted block text-[10px]">Số tài khoản:</span>
                              <div className="flex items-center gap-1.5 font-mono font-bold text-luxury-dark">
                                <span>0876637806</span>
                                <button
                                  type="button"
                                  onClick={handleCopyStk}
                                  className="text-luxury-muted hover:text-luxury-dark p-0.5"
                                  title="Sao chép STK"
                                >
                                  {copiedBank ? <Check className="w-3.5 h-3.5 text-luxury-green" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            </div>
                            <div>
                              <span className="text-luxury-muted block text-[10px]">Chủ tài khoản:</span>
                              <span className="font-mono font-semibold text-luxury-dark uppercase">NGUYEN NHU</span>
                            </div>
                          </div>
                          <div className="text-[10.5px] font-mono text-luxury-muted pt-1 border-t border-neutral-100">
                            Nội dung chuyển khoản: <strong className="text-luxury-dark">VG {phoneNumber || '[SĐT CỦA QUÝ KHÁCH]'}</strong>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </label>

                {/* Method 3: Card */}
                <label
                  className={`block p-3.5 border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-luxury-dark bg-luxury-ivory shadow-sm'
                      : 'border-luxury-sand bg-luxury-bone hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-0.5 text-luxury-dark focus:ring-luxury-dark"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-luxury-dark flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-luxury-gold" />
                          Thẻ quốc tế Visa / Mastercard / JCB
                        </span>
                      </div>
                      <p className="text-[11px] text-luxury-muted mt-1">
                        Mã hóa chuẩn bảo mật PCI-DSS cấp độ 1 dành cho giao dịch thời trang cao cấp.
                      </p>

                      {paymentMethod === 'card' && (
                        <div className="mt-3 p-3 bg-white border border-luxury-sand space-y-2 text-xs animate-fadeIn">
                          <div>
                            <label className="text-[10px] font-mono uppercase text-luxury-muted block mb-0.5">
                              Số thẻ (Card Number)
                            </label>
                            <input
                              type="text"
                              maxLength={19}
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="4111 2222 3333 4444"
                              className="w-full px-2.5 py-1.5 border border-luxury-sand text-xs font-mono focus:outline-none focus:ring-1 focus:ring-luxury-dark"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-mono uppercase text-luxury-muted block mb-0.5">
                                Hết hạn (MM/YY)
                              </label>
                              <input
                                type="text"
                                maxLength={5}
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="12/28"
                                className="w-full px-2.5 py-1.5 border border-luxury-sand text-xs font-mono focus:outline-none focus:ring-1 focus:ring-luxury-dark"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-mono uppercase text-luxury-muted block mb-0.5">
                                CVV (Mã bảo mật)
                              </label>
                              <input
                                type="password"
                                maxLength={4}
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                placeholder="•••"
                                className="w-full px-2.5 py-1.5 border border-luxury-sand text-xs font-mono focus:outline-none focus:ring-1 focus:ring-luxury-dark"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Order Summary & Auto Calculations */}
        <div className="lg:w-5/12 p-5 sm:p-7 bg-luxury-ivory border-t lg:border-t-0 lg:border-l border-luxury-sand flex flex-col justify-between">
          <div className="space-y-5">
            {/* Summary Title & Items Toggle */}
            <div className="flex items-center justify-between border-b border-luxury-sand pb-3">
              <h3 className="font-serif text-lg font-medium text-luxury-dark uppercase tracking-wide">
                Đơn Hàng ({checkoutItems.reduce((acc, i) => acc + (i.quantity || 1), 0)} món)
              </h3>
              <button
                type="button"
                onClick={() => setItemsCollapsed(!itemsCollapsed)}
                className="lg:hidden text-xs text-luxury-muted flex items-center gap-1"
              >
                <span>{itemsCollapsed ? 'Xem chi tiết' : 'Thu gọn'}</span>
                {itemsCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Items List */}
            <div className={`space-y-3 max-h-52 overflow-y-auto ${itemsCollapsed ? 'hidden lg:block' : 'block'}`}>
              {checkoutItems.map((item, idx) => {
                const img = item.product?.images?.[0] || 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=200';
                return (
                  <div key={item.id || idx} className="flex items-center gap-3 py-1">
                    <img src={img} alt="" className="w-12 h-16 object-cover object-top border border-luxury-sand/80 flex-shrink-0" />
                    <div className="flex-grow text-xs space-y-0.5">
                      <div className="font-serif font-medium text-luxury-dark line-clamp-1">
                        {item.product?.name}
                      </div>
                      <div className="text-[11px] text-luxury-muted flex items-center gap-1.5">
                        <span>{item.selectedColor}</span>
                        <span>·</span>
                        <span className="font-mono">Size {item.selectedSize}</span>
                        <span>·</span>
                        <span className="font-mono">x{item.quantity}</span>
                      </div>
                      <div className="font-serif font-semibold text-luxury-dark">
                        {formatVND(item.product?.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Voucher Code Input */}
            <div className="pt-2 border-t border-luxury-sand/70 space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-luxury-muted flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-luxury-gold" />
                Mã Ưu Đãi Đặc Quyền (Voucher VIP)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  placeholder="Nhập VUONGGIA (-10%)"
                  className="flex-grow px-3 py-2 bg-luxury-bone border border-luxury-sand text-xs font-mono uppercase text-luxury-dark focus:outline-none focus:ring-1 focus:ring-luxury-dark"
                />
                <button
                  type="button"
                  onClick={handleApplyVoucher}
                  className="px-4 py-2 bg-luxury-dark hover:bg-neutral-800 text-luxury-bone text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Áp Dụng
                </button>
              </div>
              {voucherMessage && (
                <div
                  className={`text-[11px] flex items-center gap-1.5 pt-0.5 ${
                    voucherMessage.type === 'success' ? 'text-luxury-green font-medium' : 'text-luxury-red'
                  }`}
                >
                  {voucherMessage.type === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  <span>{voucherMessage.text}</span>
                </div>
              )}
            </div>

            {/* Velvet Gift Box Checkbox */}
            <div className="p-3 bg-luxury-bone border border-luxury-sand flex items-start gap-2.5">
              <input
                id="modal-gift-wrap"
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="mt-1 h-3.5 w-3.5 text-luxury-dark focus:ring-luxury-dark rounded-none cursor-pointer"
              />
              <label htmlFor="modal-gift-wrap" className="text-xs text-luxury-charcoal cursor-pointer flex-grow">
                <span className="font-semibold text-luxury-dark flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-luxury-gold" />
                  Hộp quà nhung cao cấp đính nơ lụa (+150.000₫)
                </span>
                <span className="text-[10.5px] text-luxury-muted block">
                  Đóng gói thủ công sang trọng thích hợp làm quà tặng.
                </span>
              </label>
            </div>

            {/* Auto Financial Breakdown */}
            <div className="space-y-2 pt-2 border-t border-luxury-sand/70 text-xs">
              <div className="flex justify-between text-luxury-muted">
                <span>Tạm tính:</span>
                <span className="font-mono text-luxury-dark">{formatVND(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-luxury-green font-medium">
                  <span>Ưu đãi VIP (VUONGGIA -10%):</span>
                  <span className="font-mono">-{formatVND(discountAmount)}</span>
                </div>
              )}

              {giftWrap && (
                <div className="flex justify-between text-luxury-muted">
                  <span>Hộp quà nhung lụa:</span>
                  <span className="font-mono text-luxury-dark">+{formatVND(giftWrapPrice)}</span>
                </div>
              )}

              <div className="flex justify-between text-luxury-muted">
                <span>Phí vận chuyển:</span>
                <span className="text-luxury-dark font-medium uppercase text-[10.5px]">Đặc quyền 0₫</span>
              </div>

              <div className="pt-3 border-t border-luxury-sand flex justify-between items-baseline">
                <span className="font-serif text-sm font-semibold text-luxury-dark uppercase tracking-wider">
                  Tổng thanh toán:
                </span>
                <span className="font-serif text-2xl font-bold text-luxury-dark">
                  {formatVND(grandTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-6 space-y-2">
            <button
              type="submit"
              form="quick-order-form"
              disabled={isSubmitting}
              className="w-full py-4 bg-luxury-dark hover:bg-neutral-800 disabled:bg-neutral-600 text-luxury-bone text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang khởi tạo đơn hàng...</span>
                </>
              ) : (
                <>
                  <span>Hoàn Tất Đặt Hàng ({formatVND(grandTotal)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-luxury-muted flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
              <span>Bảo mật thông tin · Miễn phí đổi cỡ trong 48 giờ</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
