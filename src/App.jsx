import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Page0_Copyright } from './components/Page0_Copyright';
import { Header } from './components/Header';
import { HeroLookbook } from './components/HeroLookbook';
import { CategoryShowcase } from './components/CategoryShowcase';
import { MagazineLookbookGrid } from './components/MagazineLookbookGrid';
import { AtelierStory } from './components/AtelierStory';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { QuickOrderModal } from './components/QuickOrderModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { LuxuryCursor } from './components/LuxuryCursor';
import { LuxuryTransitionCurtain } from './components/LuxuryTransitionCurtain';
import { InteractiveOpeningCurtain } from './components/InteractiveOpeningCurtain';
import { FabricInspectorModal } from './components/FabricInspectorModal';

function AppContent() {
  // Direct Storefront Entry: Starts with currentPage === 1 by default
  const [currentPage, setCurrentPage] = useState(1);
  const [isCurtainUnveiled, setIsCurtainUnveiled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCurtainActive, setIsCurtainActive] = useState(false);
  const [isFabricModalOpen, setIsFabricModalOpen] = useState(false);

  const {
    cartTotalCount,
    setIsCartOpen,
    openCart,
    openQuickView,
    openQuickOrder,
    isCopyrightModalOpen,
    openCopyrightModal,
    closeCopyrightModal,
  } = useStore();

  // Sync title and body background based on page or modal state
  useEffect(() => {
    if (!isCurtainUnveiled || currentPage === 0 || isCopyrightModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    if (currentPage === 0 || isCopyrightModalOpen) {
      document.body.style.backgroundColor = '#000000';
      document.title = 'DESIGN BY VUONGGIA — Intellectual Property Certificate';
    } else {
      document.body.style.backgroundColor = '#FDFBF7';
      document.title = 'VUONGGIA — Luxury Minimalist Atelier';
    }
  }, [currentPage, isCopyrightModalOpen, isCurtainUnveiled]);

  // Handlers with Haute Couture Curtain Transitions
  const handleNextPage = () => {
    setIsCurtainActive(true);
    closeCopyrightModal();
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleGoToPage0 = () => {
    openCopyrightModal();
  };

  const handleCloseCopyrightModal = () => {
    closeCopyrightModal();
    setCurrentPage(1);
  };

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
  };

  const handleQuickView = (product) => {
    openQuickView(product);
  };

  const handleQuickOrder = (itemOrProduct, color, size) => {
    if (itemOrProduct && itemOrProduct.product) {
      openQuickOrder(itemOrProduct);
    } else {
      const product = itemOrProduct;
      const colorName = typeof color === 'object' ? (color.name || color.id) : (color || 'Tiêu chuẩn');
      const colorHex = typeof color === 'object' ? color.hex : null;
      const sizeName = typeof size === 'object' ? (size.name || size.id) : (size || 'M');
      const singleItem = {
        id: `${product.id}-${colorName}-${sizeName}`,
        product,
        selectedColor: colorName,
        colorHex,
        selectedSize: sizeName,
        quantity: 1,
      };
      openQuickOrder(singleItem);
    }
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleOpenSearch = () => {
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative font-sans">
      
      {/* Film Grain Paper Texture Overlay */}
      <div className="luxury-film-grain" />

      {/* Luxury Bespoke Cursor */}
      <LuxuryCursor />

      {/* Haute Couture Silk Shutter Transition Curtain */}
      <LuxuryTransitionCurtain
        isTransitioning={isCurtainActive}
        onComplete={() => setIsCurtainActive(false)}
      />

      {/* Interactive Silk Shutter Opening Curtain (Click-to-Unveil) */}
      {!isCurtainUnveiled && (
        <InteractiveOpeningCurtain
          onComplete={() => setIsCurtainUnveiled(true)}
        />
      )}

      {/* ============================================================ */}
      {/* 1. INTELLECTUAL PROPERTY CERTIFICATE: MODAL / OVERLAY         */}
      {/* When isCopyrightModalOpen or currentPage === 0               */}
      {/* ============================================================ */}
      {(isCopyrightModalOpen || currentPage === 0) && (
        <Page0_Copyright
          isOpen={isCopyrightModalOpen || currentPage === 0}
          onClose={handleCloseCopyrightModal}
          onNextPage={handleNextPage}
        />
      )}

      {/* ============================================================ */}
      {/* 2. EDITORIAL LOOKBOOK STOREFRONT                             */}
      {/* Rendered only when currentPage === 1                         */}
      {/* ============================================================ */}
      {currentPage === 1 && (
        <div className="w-full flex flex-col min-h-screen bg-luxury-bone text-luxury-charcoal animate-reveal-up">
          
          {/* Editorial Sticky Navigation Bar */}
          <Header
            onGoToPage0={handleGoToPage0}
            cartCount={cartTotalCount}
            onOpenCart={handleOpenCart}
            onOpenSearch={handleOpenSearch}
          />

          <main className="flex-grow">
            {/* Monumental Hero Lookbook */}
            <HeroLookbook
              onExploreClick={() => {
                const el = document.getElementById('collection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenFabricInspector={() => setIsFabricModalOpen(true)}
            />

            {/* 5 Curator Category Plates */}
            <CategoryShowcase onSelectCategory={handleSelectCategory} />

            {/* Magazine Lookbook Grid & Catalog */}
            <MagazineLookbookGrid
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              onQuickView={handleQuickView}
              onQuickOrder={handleQuickOrder}
            />

            {/* Atelier Craftsmanship & Story */}
            <AtelierStory />
          </main>

          {/* Luxury Brand Editorial Footer */}
          <Footer onGoToPage0={handleGoToPage0} />

        </div>
      )}

      {/* ============================================================ */}
      {/* 3. INTERACTIVE COMMERCE MODALS & OVERLAYS (MILESTONE 2)       */}
      {/* ============================================================ */}
      <QuickViewModal />
      <CartDrawer />
      <QuickOrderModal />
      <OrderSuccessModal />
      <FabricInspectorModal
        isOpen={isFabricModalOpen}
        onClose={() => setIsFabricModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
