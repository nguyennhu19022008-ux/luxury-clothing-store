import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, ShieldCheck, Menu, X, ArrowUpRight } from 'lucide-react';

export const Header = ({ onGoToPage0, cartCount = 0, onOpenCart, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartBouncing, setCartBouncing] = useState(false);
  const prevCountRef = useRef(cartCount);

  useEffect(() => {
    if (cartCount > prevCountRef.current) {
      setCartBouncing(true);
      const timer = setTimeout(() => setCartBouncing(false), 700);
      prevCountRef.current = cartCount;
      return () => clearTimeout(timer);
    }
    prevCountRef.current = cartCount;
  }, [cartCount]);

  const navLinks = [
    { label: 'Bộ Sưu Tập Mới', href: '#collection' },
    { label: 'Danh Mục Tinh Tuyển', href: '#categories' },
    { label: 'Lookbook Mùa Thu', href: '#lookbook' },
    { label: 'Kỹ Nghệ Atelier', href: '#atelier' },
    { label: 'Dịch Vụ May Đo', href: '#story' },
  ];

  return (
    <>
      {/* Top Haute Couture Ticker Ribbon */}
      <div className="w-full bg-luxury-dark text-luxury-bone py-1.5 px-4 overflow-hidden border-b border-black select-none z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase text-luxury-sand/80">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ATELIER HÀ NỘI · MỞ CỬA TIẾP ĐÓN</span>
          </div>
          <div className="flex items-center gap-3 mx-auto sm:mx-0">
            <span>AUTOMNE-HIVER 2026</span>
            <span>•</span>
            <span className="text-luxury-gold font-bold">100% SỢI TỰ NHIÊN NGUYÊN BẢN</span>
            <span>•</span>
            <span className="hidden md:inline">DỊCH VỤ THỬ ĐỒ TẠI GIA ĐỘC BẢN</span>
          </div>
          <div className="hidden lg:block text-luxury-muted">
            GMT+7 HANOI / PARIS
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full bg-luxury-bone/90 backdrop-blur-xl border-b border-luxury-sand transition-all animate-island-drop">
        <div className="max-w-7xl h-[72px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <a href="#" className="flex flex-col group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-dark">
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.12em] text-luxury-dark uppercase group-hover:opacity-80 transition-opacity">
              MAISON VUONGGIA
            </span>
            <span className="font-sans text-[8.5px] sm:text-[9.5px] tracking-[0.25em] text-luxury-muted uppercase font-medium">
              Haute Couture & Prêt-à-Porter
            </span>
          </a>
        </div>

        {/* Center: Editorial Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Điều hướng chính">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[12.5px] font-medium tracking-[0.1em] uppercase text-luxury-muted hover:text-luxury-dark transition-colors relative py-1 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-dark"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-luxury-dark transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: Actions Cluster */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Copyright Slide 0 Return Trigger */}
          <button
            onClick={onGoToPage0}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-[10.5px] sm:text-[11px] font-mono tracking-wider text-luxury-dark hover:text-white bg-luxury-ivory hover:bg-luxury-dark border border-luxury-sand hover:border-luxury-dark transition-all rounded-none uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-dark cursor-pointer"
            title="Xem Giấy chứng nhận bản quyền DESIGN BY VUONGGIA (VG © 2026)"
            aria-label="Xem lại bản quyền Page 0"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-bold">VG © 2026</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-luxury-dark hover:text-luxury-muted transition-colors rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-dark"
            title="Tìm kiếm thiết kế"
            aria-label="Tìm kiếm sản phẩm"
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className={`p-2 text-luxury-dark hover:text-luxury-muted transition-colors relative rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-dark active:scale-95 ${cartBouncing ? 'animate-cart-bounce' : ''}`}
            title="Xem giỏ hàng"
            aria-label="Mở giỏ hàng"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {cartCount > 0 && (
              <span className={`absolute top-1 right-1 w-4 h-4 bg-luxury-dark text-luxury-bone text-[9px] font-bold rounded-full flex items-center justify-center ${cartBouncing ? 'animate-cart-bounce' : 'animate-pulse'}`}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-luxury-dark hover:text-luxury-muted transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-dark"
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 w-full bg-luxury-bone border-b border-luxury-sand shadow-2xl py-6 px-6 animate-fadeUp z-50">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm uppercase tracking-wider font-medium text-luxury-charcoal hover:text-luxury-dark py-2 border-b border-luxury-sand/50"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-luxury-muted" />
              </a>
            ))}
            
            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGoToPage0();
                }}
                className="w-full py-3 bg-luxury-dark text-luxury-bone text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>VG © 2026 — CHỨNG NHẬN BẢN QUYỀN</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
    </>
  );
};
