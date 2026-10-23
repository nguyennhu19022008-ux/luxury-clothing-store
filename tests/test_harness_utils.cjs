/**
 * Luxury Minimalist Clothing Store - 4-Tier Test Harness Utilities
 * Self-contained, zero-flakiness testing library & state simulator.
 */

const fs = require('fs');
const path = require('path');

// ANSI color helpers
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
};

// Test Suite State
class TestRunner {
  constructor(tierName) {
    this.tierName = tierName;
    this.currentSuite = '';
    this.results = [];
    this.startTime = Date.now();
  }

  describe(suiteName, fn) {
    this.currentSuite = suiteName;
    console.log(`\n${colors.bold}${colors.cyan}▶ Suite: ${suiteName}${colors.reset}`);
    fn();
  }

  test(testName, fn) {
    const fullName = `${this.currentSuite} > ${testName}`;
    const start = Date.now();
    try {
      fn();
      const duration = Date.now() - start;
      this.results.push({
        suite: this.currentSuite,
        test: testName,
        passed: true,
        duration,
      });
      console.log(`  ${colors.green}✔ PASS${colors.reset} ${testName} ${colors.dim}(${duration}ms)${colors.reset}`);
    } catch (err) {
      const duration = Date.now() - start;
      this.results.push({
        suite: this.currentSuite,
        test: testName,
        passed: false,
        error: err.message,
        stack: err.stack,
        duration,
      });
      console.log(`  ${colors.red}✖ FAIL${colors.reset} ${testName}`);
      console.log(`    ${colors.red}Error: ${err.message}${colors.reset}`);
    }
  }

  summary() {
    const total = this.results.length;
    const passed = this.results.filter((r) => r.passed).length;
    const failed = total - passed;
    const duration = Date.now() - this.startTime;

    console.log(`\n${colors.bold}───────────────────────────────────────────────${colors.reset}`);
    console.log(`${colors.bold}${this.tierName} Results:${colors.reset} ${passed}/${total} passed in ${duration}ms`);
    if (failed > 0) {
      console.log(`${colors.bold}${colors.red}FAILED TESTS (${failed}):${colors.reset}`);
      this.results
        .filter((r) => !r.passed)
        .forEach((r) => {
          console.log(`  • ${r.suite} > ${r.test}: ${r.error}`);
        });
    } else {
      console.log(`${colors.bold}${colors.green}All tests in ${this.tierName} PASSED!${colors.reset}`);
    }
    console.log(`${colors.bold}───────────────────────────────────────────────${colors.reset}\n`);

    return { tierName: this.tierName, total, passed, failed, duration, results: this.results };
  }
}

// Assertions
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed: expected condition to be truthy');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(
      `${message ? message + ' - ' : ''}Expected ${JSON.stringify(expected)} (${typeof expected}), but got ${JSON.stringify(actual)} (${typeof actual})`
    );
  }
}

function assertDeepEqual(actual, expected, message) {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr !== expectedStr) {
    throw new Error(`${message ? message + ' - ' : ''}Deep equality mismatch:\nActual:   ${actualStr}\nExpected: ${expectedStr}`);
  }
}

function assertMatch(actual, regex, message) {
  if (!regex.test(String(actual))) {
    throw new Error(`${message ? message + ' - ' : ''}Value "${actual}" does not match pattern ${regex}`);
  }
}

function assertIncludes(actual, search, message) {
  if (typeof actual === 'string' && !actual.includes(search)) {
    throw new Error(`${message ? message + ' - ' : ''}String does not contain "${search}"`);
  }
  if (Array.isArray(actual) && !actual.includes(search)) {
    throw new Error(`${message ? message + ' - ' : ''}Array does not contain element "${search}"`);
  }
}

function assertGreaterThanOrEqual(actual, expected, message) {
  if (actual < expected) {
    throw new Error(`${message ? message + ' - ' : ''}Expected ${actual} >= ${expected}`);
  }
}

function assertThrows(fn, message) {
  let threw = false;
  try {
    fn();
  } catch (e) {
    threw = true;
  }
  if (!threw) {
    throw new Error(message || 'Expected function to throw an error, but it did not.');
  }
}

// Phone Number Regex Validator according to Vietnam specs
function isValidVietnamesePhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.trim().replace(/[\s.-]/g, '');
  // Standard Vietnamese phone regex: (03|05|07|08|09)+8 digits OR +84+(3|5|7|8|9)+8 digits
  const vnPhoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
  return vnPhoneRegex.test(cleaned);
}

// Discount Code Calculator
function calculateDiscount(subtotal, code) {
  if (!code || typeof code !== 'string') return 0;
  const cleanCode = code.trim().toUpperCase();
  if (cleanCode === 'VUONGGIA') {
    // 10% discount, rounded to integer Dong
    return Math.round(subtotal * 0.1);
  }
  return 0;
}

// Order ID Generator
let orderCounter = 1000;
function generateOrderId() {
  orderCounter++;
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `VG-2026-${randomSuffix}`;
}

// Format Currency
function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

// Store Context State Machine Simulator
class StoreContextSimulator {
  constructor(initialData = {}) {
    this.cart = initialData.cart ? [...initialData.cart] : [];
    this.isCartOpen = false;
    this.isCopyrightModalOpen = false;
    this.quickViewProduct = null;
    this.isQuickOrderOpen = false;
    this.quickOrderItem = null;
    this.completedOrder = null;
    this.giftWrapPrice = 150000;
  }

  openCopyrightModal() {
    this.isCartOpen = false;
    this.quickViewProduct = null;
    this.isQuickOrderOpen = false;
    this.isCopyrightModalOpen = true;
  }

  closeCopyrightModal() {
    this.isCopyrightModalOpen = false;
  }

  get cartSubtotal() {
    return this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  get cartTotalCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  addToCart(product, color, size, quantity = 1) {
    if (!product || !color || !size) {
      throw new Error('Product, color, and size are required to add to cart');
    }
    if (quantity <= 0) return;

    const itemId = `${product.id}-${color}-${size}`;
    const existingIndex = this.cart.findIndex((item) => item.id === itemId);

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: itemId,
        product,
        selectedColor: color,
        selectedSize: size,
        quantity,
      });
    }
  }

  updateQuantity(cartItemId, delta) {
    const item = this.cart.find((i) => i.id === cartItemId);
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      this.removeFromCart(cartItemId);
    } else {
      item.quantity = newQty;
    }
  }

  removeFromCart(cartItemId) {
    this.cart = this.cart.filter((item) => item.id !== cartItemId);
  }

  clearCart() {
    this.cart = [];
  }

  openQuickView(product) {
    this.quickViewProduct = product;
  }

  closeQuickView() {
    this.quickViewProduct = null;
  }

  openCart() {
    this.isCartOpen = true;
    this.quickViewProduct = null; // modal exclusivity
    this.isQuickOrderOpen = false;
  }

  closeCart() {
    this.isCartOpen = false;
  }

  openQuickOrder(singleItem = null) {
    this.isQuickOrderOpen = true;
    this.quickOrderItem = singleItem; // null means checking out entire cart
    this.isCartOpen = false; // modal exclusivity
    this.quickViewProduct = null;
  }

  closeQuickOrder() {
    this.isQuickOrderOpen = false;
    this.quickOrderItem = null;
  }

  submitOrder(details) {
    if (!details.customerName || !details.customerName.trim()) {
      throw new Error('Customer name is required');
    }
    if (!isValidVietnamesePhone(details.phoneNumber)) {
      throw new Error('Valid Vietnamese phone number is required');
    }
    if (!details.address || !details.address.trim()) {
      throw new Error('Shipping address is required');
    }

    const items = this.quickOrderItem ? [this.quickOrderItem] : [...this.cart];
    if (items.length === 0) {
      throw new Error('Cannot submit order with 0 items');
    }

    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discount = calculateDiscount(subtotal, details.discountCode);
    const giftWrap = details.giftWrap ? this.giftWrapPrice : 0;
    const shipping = 0; // Complimentary luxury shipping
    const totalAmount = Math.max(0, subtotal - discount + giftWrap + shipping);

    const orderId = generateOrderId();
    this.completedOrder = {
      orderId,
      items,
      subtotal,
      discount,
      giftWrap,
      shipping,
      totalAmount,
      orderDetails: { ...details },
      createdAt: new Date().toISOString(),
    };

    // If checkout was from cart, clear cart
    if (!this.quickOrderItem) {
      this.clearCart();
    }

    this.closeQuickOrder();
    return { success: true, orderId };
  }

  closeOrderSuccess() {
    this.completedOrder = null;
  }
}

// Slide 0 Navigation Simulator (Updated for R1 Direct Entry & Modal Overlay)
class Slide0Simulator {
  constructor(options = {}) {
    // R1: Direct Storefront Startup by default (currentPage === 1)
    this.currentPage = options.initialPage !== undefined ? options.initialPage : 1;
    this.isCopyrightModalOpen = options.initialModal !== undefined ? options.initialModal : false;
    this.isCardOpen = true;
    this.copiedField = null;
    this.feedbackTimeout = null;
  }

  openCopyrightModal() {
    this.isCopyrightModalOpen = true;
  }

  closeCopyrightModal() {
    this.isCopyrightModalOpen = false;
  }

  dismissCard() {
    this.isCardOpen = false;
  }

  reopenCard() {
    this.isCardOpen = true;
  }

  copyEmail() {
    this.copiedField = 'email';
    return 'nguyennhu19022008@gmail.com';
  }

  copyPhone() {
    this.copiedField = 'phone';
    return '0876637806';
  }

  resetCopyFeedback() {
    this.copiedField = null;
  }

  onNextPage() {
    this.currentPage = 1;
    this.closeCopyrightModal();
  }

  returnToSlide0() {
    this.openCopyrightModal();
    this.currentPage = 0;
  }

  handleKeyDown(key, targetTagName = 'BODY') {
    // If keyboard shortcut happens in an INPUT or TEXTAREA, suppress page transition
    if (targetTagName === 'INPUT' || targetTagName === 'TEXTAREA') {
      return false;
    }

    if (key === 'Escape') {
      this.isCardOpen = !this.isCardOpen;
      return true;
    }

    if (this.currentPage === 0 || this.isCopyrightModalOpen) {
      if (key === 'ArrowRight' || key === ' ' || key === 'Enter') {
        this.onNextPage();
        return true;
      }
    }
    return false;
  }
}

// WCAG Contrast Ratio Calculator
function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function getRelativeLuminance([r, g, b]) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1, hex2) {
  const lum1 = getRelativeLuminance(hexToRgb(hex1));
  const lum2 = getRelativeLuminance(hexToRgb(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

module.exports = {
  TestRunner,
  assert,
  assertEqual,
  assertDeepEqual,
  assertMatch,
  assertIncludes,
  assertGreaterThanOrEqual,
  assertThrows,
  isValidVietnamesePhone,
  calculateDiscount,
  generateOrderId,
  formatVND,
  StoreContextSimulator,
  Slide0Simulator,
  getContrastRatio,
  colors,
};
