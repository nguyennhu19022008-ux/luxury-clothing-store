import React, { useState } from 'react';
import { Mail, Phone, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export const Footer = ({ onGoToPage0 }) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmailInput('');
      }, 3500);
    }
  };

  return (
    <footer className="bg-luxury-dark text-luxury-bone pt-20 pb-12 border-t border-luxury-sand/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Balanced 2-Column Architectural Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          
          {/* Column 1: Maison Vuonggia Brand, Newsletter & IP Badge */}
          <div className="space-y-6">
            <div>
              <div className="font-serif text-2xl text-white font-semibold tracking-wider uppercase text-balance">
                MAISON VUONGGIA
              </div>
              <div className="font-sans text-[10px] tracking-[0.25em] text-neutral-400 uppercase mt-0.5">
                Haute Couture &amp; Prêt-à-Porter
              </div>
            </div>

            <p className="text-neutral-400 font-sans text-xs sm:text-sm leading-relaxed max-w-lg text-pretty">
              Xưởng may thời trang tối giản cao cấp. Thiết kế độc bản tôn vinh chất liệu tự nhiên, kỹ nghệ may đo thủ công và vẻ đẹp tĩnh lặng bền vững.
            </p>

            {/* Newsletter In-column Form */}
            <div className="pt-2">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-luxury-gold block mb-2">
                Privilege Newsletter /// 2026
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-2 text-balance descender-safe">
                Đăng Ký Nhận Ấn Phẩm Lookbook Tinh Tuyển
              </h3>
              <p className="font-sans text-xs text-neutral-400 mb-3 text-pretty max-w-[65ch]">
                Nhận lời mời tham dự các buổi ra mắt bộ sưu tập kín và đặc quyền may đo tận gia.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Nhập địa chỉ thư điện tử..."
                  className="px-4 py-3 bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-white focus:ring-1 focus:ring-white flex-grow transition-colors"
                  aria-label="Địa chỉ email đăng ký"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>ĐÃ ĐĂNG KÝ</span>
                    </>
                  ) : (
                    <>
                      <span>ĐĂNG KÝ</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Certificate Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onGoToPage0}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-white/30 text-white text-[11px] font-mono tracking-wider uppercase transition-colors cursor-pointer"
                title="Mở Giấy chứng nhận bản quyền DESIGN BY VUONGGIA (Page 0)"
                aria-label="Chứng nhận bản quyền Page 0"
              >
                <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                <span>VG © 2026 — CHỨNG NHẬN BẢN QUYỀN</span>
              </button>
            </div>
          </div>

          {/* Column 2: Curated Directory (Collections & Contact) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
            {/* Sub-col 1: Collections & Bespoke */}
            <div className="space-y-4">
              <div className="font-mono text-xs text-white font-bold uppercase tracking-widest">
                BỘ SƯU TẬP &amp; DỊCH VỤ
              </div>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#collection" className="hover:text-white transition-colors">Áo khoác &amp; Măng tô Cashmere</a></li>
                <li><a href="#collection" className="hover:text-white transition-colors">Váy &amp; Đầm dạ hội lụa</a></li>
                <li><a href="#collection" className="hover:text-white transition-colors">Sơ mi tơ tằm cổ điển</a></li>
                <li><a href="#collection" className="hover:text-white transition-colors">Quần tây len Merino 130s</a></li>
                <li><a href="#collection" className="hover:text-white transition-colors">Khăn lụa &amp; Thắt lưng da</a></li>
                <li className="pt-2 border-t border-white/10 text-neutral-300 font-medium">May đo số đo riêng (Bespoke)</li>
                <li className="text-neutral-300 font-medium">Đặc quyền thử đồ tại gia</li>
              </ul>
            </div>

            {/* Sub-col 2: Official Contact */}
            <div className="space-y-4 font-sans">
              <div className="font-mono text-xs text-white font-bold uppercase tracking-widest">
                LIÊN HỆ ATELIER
              </div>
              <div className="space-y-3 text-neutral-400">
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase font-mono text-neutral-500">Thư điện tử chính thức:</div>
                    <a href="mailto:nguyennhu19022008@gmail.com" className="text-white hover:underline break-all font-mono">
                      nguyennhu19022008@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] uppercase font-mono text-neutral-500">Hotline may đo riêng:</div>
                    <a href="tel:0876637806" className="text-white hover:underline font-mono text-sm font-bold">
                      0876637806
                    </a>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 pt-1 leading-relaxed">
                  Showroom: Hà Đông Atelier, Hà Nội &amp; Quận 1, TP. Hồ Chí Minh
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Permanent Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-[11px] font-mono">
          <div>
            DESIGN BY VUONGGIA © 2026. TẤT CẢ BẢN QUYỀN SỞ HỮU TRÍ TUỆ ĐÃ ĐƯỢC ĐĂNG KÝ BẢO HỘ.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-500">ID: VG-LUXURY-2026-IP</span>
            <span>•</span>
            <button
              type="button"
              onClick={onGoToPage0}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono tracking-wider text-white hover:text-black bg-neutral-900 hover:bg-white border border-white/40 hover:border-white transition-all uppercase cursor-pointer"
              title="Mở Giấy chứng nhận bản quyền VG © 2026"
              aria-label="Mở Giấy chứng nhận bản quyền VG © 2026"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
              <span>VG © 2026</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
