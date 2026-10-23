import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const StoreContext = createContext(null);

// Standard Vietnamese phone regex: (03|05|07|08|09)+8 digits OR +84+(3|5|7|8|9)+8 digits
export const isValidVietnamesePhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.trim().replace(/[\s.-]/g, '');
  const vnPhoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
  return vnPhoneRegex.test(cleaned);
};

// Calculate voucher discount (VUONGGIA: 10%)
export const calculateDiscount = (subtotal, code) => {
  if (!code || typeof code !== 'string') return 0;
  const cleanCode = code.trim().toUpperCase();
  if (cleanCode === 'VUONGGIA') {
    return Math.round(subtotal * 0.1);
  }
  return 0;
};

// Format currency VND
export const formatVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export const StoreProvider = ({ children }) => {
  // 1. Cart state initialized from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('vuonggia_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage:', e);
    }
    return [];
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vuonggia_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  // Modal states
  const [isCopyrightModalOpen, setIsCopyrightModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false);
  const [quickOrderItem, setQuickOrderItem] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [isGiftWrapSelected, setIsGiftWrapSelected] = useState(false);

  // Constant gift box price
  const giftWrapPrice = 150000;

  // Computed properties
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1), 0);
  }, [cart]);

  const cartTotalCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [cart]);

  // Cart operations
  const addToCart = (product, color, size, quantity = 1) => {
    if (!product || !color || !size) {
      throw new Error('Product, color, and size are required to add to cart');
    }
    if (quantity <= 0) return;

    const colorName = typeof color === 'object' ? (color.name || color.id) : String(color);
    const colorHex = typeof color === 'object' ? color.hex : null;
    const sizeName = typeof size === 'object' ? (size.name || size.id) : String(size);

    const itemId = `${product.id}-${colorName}-${sizeName}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemId || item.cartItemId === itemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            cartItemId: itemId,
            product,
            selectedColor: colorName,
            colorHex,
            selectedSize: sizeName,
            quantity,
          },
        ];
      }
    });
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === cartItemId || i.cartItemId === cartItemId);
      if (!item) return prevCart;

      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        return prevCart.filter((i) => i.id !== cartItemId && i.cartItemId !== cartItemId);
      } else {
        return prevCart.map((i) =>
          i.id === cartItemId || i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i
        );
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== cartItemId && i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Modal exclusivity controllers
  const openCopyrightModal = () => {
    setIsCartOpen(false);
    setIsQuickOrderOpen(false);
    setQuickViewProduct(null);
    setIsCopyrightModalOpen(true);
  };

  const closeCopyrightModal = () => {
    setIsCopyrightModalOpen(false);
  };

  const openQuickView = (product) => {
    setIsCartOpen(false);
    setIsQuickOrderOpen(false);
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const openCart = () => {
    setQuickViewProduct(null);
    setIsQuickOrderOpen(false);
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openQuickOrder = (singleItem = null) => {
    setQuickViewProduct(null);
    setIsCartOpen(false);
    setQuickOrderItem(singleItem);
    setIsQuickOrderOpen(true);
  };

  const closeQuickOrder = () => {
    setIsQuickOrderOpen(false);
    setQuickOrderItem(null);
  };

  // Order submission
  const submitOrder = (orderDetails) => {
    if (!orderDetails.customerName || !orderDetails.customerName.trim()) {
      throw new Error('Customer name is required');
    }
    if (!isValidVietnamesePhone(orderDetails.phoneNumber)) {
      throw new Error('Valid Vietnamese phone number is required');
    }
    if (!orderDetails.address || !orderDetails.address.trim()) {
      throw new Error('Shipping address is required');
    }

    const items = quickOrderItem ? [quickOrderItem] : [...cart];
    if (items.length === 0) {
      throw new Error('Cannot submit order with 0 items');
    }

    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discount = calculateDiscount(subtotal, orderDetails.discountCode);
    const giftWrap = orderDetails.giftWrap || isGiftWrapSelected ? giftWrapPrice : 0;
    const shipping = 0; // Complimentary luxury delivery
    const totalAmount = Math.max(0, subtotal - discount + giftWrap + shipping);

    const orderId = `VG-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      orderId,
      items,
      subtotal,
      discount,
      giftWrap,
      shipping,
      totalAmount,
      orderDetails: { ...orderDetails },
      createdAt: new Date().toISOString(),
    };

    setCompletedOrder(newOrder);

    // If checked out from full cart, clear general cart
    if (!quickOrderItem) {
      clearCart();
    }

    closeQuickOrder();
    return { success: true, orderId };
  };

  const closeOrderSuccess = () => {
    setCompletedOrder(null);
  };

  const value = {
    // Cart
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartTotalCount,
    isGiftWrapSelected,
    setIsGiftWrapSelected,
    giftWrapPrice,

    // Copyright Modal
    isCopyrightModalOpen,
    setIsCopyrightModalOpen,
    openCopyrightModal,
    closeCopyrightModal,

    // Cart Drawer
    isCartOpen,
    setIsCartOpen,
    openCart,
    closeCart,

    // Quick View Modal
    quickViewProduct,
    openQuickView,
    closeQuickView,

    // Quick Order Modal
    isQuickOrderOpen,
    setIsQuickOrderOpen,
    quickOrderItem,
    openQuickOrder,
    closeQuickOrder,

    // Order Success
    completedOrder,
    submitOrder,
    closeOrderSuccess,

    // Utilities
    formatVND,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
