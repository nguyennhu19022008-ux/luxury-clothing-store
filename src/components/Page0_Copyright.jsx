import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Mail, Phone, AlertTriangle, ArrowRight, Check, Copy, X, Info } from 'lucide-react';

export const Page0_Copyright = ({ isOpen = true, onClose, onNextPage }) => {
  const [copiedField, setCopiedField] = useState(null);
  const [isCardOpen, setIsCardOpen] = useState(true);

  const handleCloseModal = useCallback(() => {
    if (typeof onClose === 'function') {
      onClose();
    }
    if (typeof onNextPage === 'function') {
      onNextPage();
    }
  }, [onClose, onNextPage]);

  // Resilient Clipboard Copy with fallback
  const handleCopy = useCallback(async (text, field) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2500);
    } catch (err) {
      console.warn('Clipboard copy fallback:', err);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2500);
    }
  }, []);

  // Global Keyboard Navigation Controller: [→], [Space], [Enter] triggers onNextPage() / handleCloseModal()
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        handleCloseModal();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsCardOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCloseModal]);

  if (!isOpen) return null;

  const textItem = "DESIGN BY VUONGGIA      ";
  const rowRepeats = Array.from({ length: 12 });

  return (
    <div className="fixed inset-0 w-screen h-screen z-50 overflow-hidden flex items-center justify-center select-none bg-black text-white">
      
      {/* Top-Right Direct Modal Close Button */}
      <button
        onClick={handleCloseModal}
        className="fixed top-5 right-5 sm:top-6 sm:right-6 z-30 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-black/70 hover:bg-white text-white hover:text-black border border-white/60 hover:border-white transition-all backdrop-blur-md cursor-pointer flex items-center gap-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        title="Đóng Modal Bản Quyền (Trở về Cửa Hàng)"
        aria-label="Đóng modal bản quyền"
      >
        <X className="w-4 h-4" />
        <span>ĐÓNG [ESC]</span>
      </button>
      
      {/* ============================================================ */}
      {/* BACKGROUND: EXACTLY 5 LARGE, PROMINENT DIAGONAL ROWS         */}
      {/* Slanted at -32deg, Moving Slowly and Elegantly (60s-70s)     */}
      {/* ============================================================ */}
      <div 
        className="absolute -inset-[100%] pointer-events-none z-0 flex flex-col justify-center items-center gap-16 sm:gap-24 md:gap-32 -rotate-[32deg] overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex whitespace-nowrap font-anton text-7xl sm:text-8xl md:text-9xl lg:text-[115px] xl:text-[135px] tracking-wider uppercase font-black text-white animate-marquee"
            style={{
              animationDuration: rowIndex % 2 === 0 ? '60s' : '70s',
              animationDirection: rowIndex % 2 === 0 ? 'normal' : 'reverse',
            }}
          >
            {rowRepeats.map((_, i) => (
              <span key={i} className="mr-12 sm:mr-16 inline-block opacity-90">
                {textItem}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* ============================================================ */}
      {/* CENTRAL STAGE: BẢNG THÔNG TIN BẢN QUYỀN & LIÊN HỆ           */}
      {/* Hiệu ứng kính mờ (Frosted Glass / Backdrop Blur)             */}
      {/* ============================================================ */}
      {isCardOpen ? (
        <div className="relative z-10 w-full max-w-4xl mx-4 sm:mx-6 anim-stamp-impact">
          <div 
            className="p-6 sm:p-8 md:p-10 bg-black/50 backdrop-blur-md border-2 border-white shadow-[0_0_80px_rgba(0,0,0,0.95)] relative overflow-hidden"
            style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          >
            {/* Corner Tech Marks */}
            <span className="absolute top-2 left-2 text-white font-mono text-xs leading-none pointer-events-none select-none">+</span>
            <span className="absolute top-2 right-2 text-white font-mono text-xs leading-none pointer-events-none select-none">+</span>
            <span className="absolute bottom-2 left-2 text-white font-mono text-xs leading-none pointer-events-none select-none">+</span>
            <span className="absolute bottom-2 right-2 text-white font-mono text-xs leading-none pointer-events-none select-none">+</span>

            {/* Certificate Header Badge with X CLOSE BUTTON */}
            <div className="flex items-center justify-between border-b-2 border-white/40 pb-3 mb-5">
              <div className="flex items-center gap-2 font-mono text-xs text-white font-black uppercase tracking-widest">
                <ShieldCheck className="w-5 h-5 text-white" />
                <span>INTELLECTUAL PROPERTY CERTIFICATE /// 2026</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-white text-black font-mono text-[11px] font-black uppercase tracking-wider">
                  ID: VG-LUXURY-2026-IP
                </span>

                {/* THE X CLOSE BUTTON */}
                <button
                  onClick={() => setIsCardOpen(false)}
                  className="p-1 hover:bg-white text-white hover:text-black border border-white/60 hover:border-white transition-colors cursor-pointer flex items-center justify-center ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  title="Tắt bảng thông tin (Dấu X)"
                  aria-label="Tắt bảng thông tin"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Monumental Headline */}
            <div className="text-center my-4 sm:my-6">
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-300 mb-1">
                CHỨNG NHẬN QUYỀN TÁC GIẢ & THIẾT KẾ ĐỘC BẢN
              </div>
              
              <h1 className="font-anton text-5xl sm:text-7xl lg:text-8xl text-white tracking-wide uppercase leading-none drop-shadow-[0_4px_20px_rgba(255,255,255,0.25)]">
                DESIGN BY <span className="bg-white text-black px-3 py-0.5 inline-block transform -skew-x-6">VUONGGIA</span>
              </h1>

              <div className="inline-block mt-3 px-4 py-1.5 bg-white text-black font-mono text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg">
                THUỘC QUYỀN SỞ HỮU CỦA VUONGGIA
              </div>
            </div>

            {/* Strict Non-Commercial Clause */}
            <div 
              className="my-5 p-4 sm:p-5 bg-black/35 backdrop-blur-sm border-2 border-white font-mono text-center"
              style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            >
              <div className="flex items-center justify-center gap-2 text-white font-black text-xs sm:text-sm uppercase tracking-wider mb-1.5">
                <AlertTriangle className="w-5 h-5 text-white" />
                <span>ĐIỀU KHOẢN NGHIÊM NGẶT: KHÔNG THƯƠNG MẠI HÓA</span>
              </div>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed max-w-2xl mx-auto">
                Hệ thống web và toàn bộ mã nguồn, cấu trúc giao diện, tài nguyên hình ảnh được chuyển giao với điều kiện cam kết: 
                <strong className="bg-white text-black px-1.5 py-0.5 ml-1 inline-block font-black uppercase">
                  TUYỆT ĐỐI KHÔNG THƯƠNG MẠI, MUA BÁN, SANG NHƯỢNG DƯỚI MỌI HÌNH THỨC SAU KHI ĐÃ SỞ HỮU.
                </strong>
              </p>
            </div>

            {/* Official Contact Info (Email & Phone) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-1">
              
              {/* Email Box */}
              <div 
                className="p-4 bg-black/35 backdrop-blur-sm border-2 border-white flex flex-col justify-between space-y-2"
                style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
              >
                <div className="flex items-center justify-between text-neutral-300 font-bold uppercase text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-white" />
                    ĐỊA CHỈ EMAIL CHÍNH THỨC:
                  </span>
                  <button
                    onClick={() => handleCopy('nguyennhu19022008@gmail.com', 'email')}
                    className="px-2.5 py-1 bg-white text-black hover:bg-neutral-200 font-bold text-[10px] uppercase transition-colors cursor-pointer flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                    title="Sao chép Email"
                  >
                    {copiedField === 'email' ? <Check className="w-3 h-3 text-black" /> : <Copy className="w-3 h-3 text-black" />}
                    <span>{copiedField === 'email' ? 'ĐÃ CHÉP' : 'SAO CHÉP'}</span>
                  </button>
                </div>
                <a
                  href="mailto:nguyennhu19022008@gmail.com"
                  className="text-white hover:underline font-bold text-sm sm:text-base break-all transition-colors block"
                >
                  nguyennhu19022008@gmail.com
                </a>
              </div>

              {/* Phone Box */}
              <div 
                className="p-4 bg-black/35 backdrop-blur-sm border-2 border-white flex flex-col justify-between space-y-2"
                style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
              >
                <div className="flex items-center justify-between text-neutral-300 font-bold uppercase text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-white" />
                    SỐ ĐIỆN THOẠI / HOTLINE:
                  </span>
                  <button
                    onClick={() => handleCopy('0876637806', 'phone')}
                    className="px-2.5 py-1 bg-white text-black hover:bg-neutral-200 font-bold text-[10px] uppercase transition-colors cursor-pointer flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                    title="Sao chép Số điện thoại"
                  >
                    {copiedField === 'phone' ? <Check className="w-3 h-3 text-black" /> : <Copy className="w-3 h-3 text-black" />}
                    <span>{copiedField === 'phone' ? 'ĐÃ CHÉP' : 'SAO CHÉP'}</span>
                  </button>
                </div>
                <a
                  href="tel:0876637806"
                  className="font-anton text-2xl sm:text-3xl text-white tracking-wider hover:underline transition-colors block"
                >
                  0876637806
                </a>
              </div>

            </div>

            {/* Start CTA Button */}
            <div className="mt-6 pt-5 border-t-2 border-white/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-neutral-300">
                Nhấn phím <strong className="text-white bg-neutral-900 px-1.5 py-0.5 border border-white/40">[→]</strong>, <strong className="text-white bg-neutral-900 px-1.5 py-0.5 border border-white/40">[Space]</strong> hoặc <strong className="text-white bg-neutral-900 px-1.5 py-0.5 border border-white/40">[Enter]</strong> để bắt đầu
              </div>

              <button
                onClick={handleCloseModal}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-white hover:bg-neutral-200 text-black font-mono text-xs sm:text-sm md:text-base font-black uppercase tracking-wider transition-all cursor-pointer shadow-2xl flex items-center justify-center gap-2 border-2 border-white active:scale-95 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>KHÁM PHÁ BỘ SƯU TẬP (TRANG 01)</span>
                <ArrowRight className="w-5 h-5 text-black" />
              </button>
            </div>

          </div>
        </div>
      ) : (
        /* RE-OPEN CONTROLS WHEN CARD IS CLOSED */
        <div className="fixed bottom-6 z-20 flex items-center gap-3 animate-fadeUp">
          <button
            onClick={() => setIsCardOpen(true)}
            className="px-4 py-2.5 bg-black/90 hover:bg-black text-white border-2 border-white font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer backdrop-blur-md flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title="Mở lại bảng thông tin bản quyền"
          >
            <Info className="w-4 h-4 text-white" />
            <span>MỞ BẢNG THÔNG TIN BẢN QUYỀN</span>
          </button>

          <button
            onClick={handleCloseModal}
            className="px-6 py-2.5 bg-white hover:bg-neutral-200 text-black border-2 border-white font-mono text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title="Khám phá bộ sưu tập (Trang 01)"
          >
            <span>VÀO BỘ SƯU TẬP (TRANG 01)</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      )}

    </div>
  );
};
