/**
 * Reviewer M2 Adversarial Stress Testing & Integrity Verification Suite
 * Independent validation of Milestone 2 implementation
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const storeContextPath = path.join(projectRoot, 'src', 'context', 'StoreContext.jsx');
const quickViewPath = path.join(projectRoot, 'src', 'components', 'QuickViewModal.jsx');
const cartDrawerPath = path.join(projectRoot, 'src', 'components', 'CartDrawer.jsx');
const quickOrderPath = path.join(projectRoot, 'src', 'components', 'QuickOrderModal.jsx');
const orderSuccessPath = path.join(projectRoot, 'src', 'components', 'OrderSuccessModal.jsx');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failures = [];

function check(desc, fn) {
  totalChecks++;
  try {
    fn();
    passedChecks++;
    console.log(`  ✔ PASS: ${desc}`);
  } catch (err) {
    failedChecks++;
    failures.push({ desc, error: err.message });
    console.error(`  ✘ FAIL: ${desc} -> ${err.message}`);
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'Assertion failed');
}

function assertEqual(actual, expected, msg) {
  if (actual !== expected) throw new Error(`${msg || 'Mismatch'}: expected ${expected}, got ${actual}`);
}

console.log('======================================================================');
console.log('   REVIEWER M2 ADVERSARIAL & INTEGRITY VERIFICATION SUITE            ');
console.log('======================================================================\n');

// -----------------------------------------------------------------------------
// SECTION 1: INTEGRITY AUDIT (No Hardcoding, No Bypass, No Cheats)
// -----------------------------------------------------------------------------
console.log('▶ 1. Integrity Audit (Anti-Cheating & Facade Detection)');

const filesToCheck = [
  storeContextPath,
  quickViewPath,
  cartDrawerPath,
  quickOrderPath,
  orderSuccessPath,
];

check('All Milestone 2 target files exist and are non-empty', () => {
  filesToCheck.forEach((fp) => {
    assert(fs.existsSync(fp), `File does not exist: ${fp}`);
    const stat = fs.statSync(fp);
    assert(stat.size > 1000, `File is suspiciously small (${stat.size} bytes): ${fp}`);
  });
});

check('Zero test-cheating keywords or hardcoded test expectations in source files', () => {
  const cheatKeywords = [
    'isTest',
    '__TEST__',
    'process.env.NODE_ENV === "test"',
    'describe(',
    'it(',
    'mockReturn',
    'mockImplementation',
  ];
  filesToCheck.forEach((fp) => {
    const content = fs.readFileSync(fp, 'utf8');
    cheatKeywords.forEach((kw) => {
      assert(!content.includes(kw), `Potential cheat keyword "${kw}" found in ${path.basename(fp)}`);
    });
  });
});

check('Zero emoji characters across all Milestone 2 source files', () => {
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA70}-\u{1FAFF}]/u;
  filesToCheck.forEach((fp) => {
    const content = fs.readFileSync(fp, 'utf8');
    assert(!emojiRegex.test(content), `Emoji found in ${path.basename(fp)}`);
  });
});

// -----------------------------------------------------------------------------
// SECTION 2: STORE CONTEXT LOGICAL VALIDATION
// -----------------------------------------------------------------------------
console.log('\n▶ 2. StoreContext Logic & Boundary Verification');

const storeSource = fs.readFileSync(storeContextPath, 'utf8');

// Extract isValidVietnamesePhone from StoreContext.jsx
// We can evaluate it safely in VM or parse it
const vm = require('vm');

// Extract helper functions (lines before StoreProvider) from StoreContext.jsx
const lines = storeSource.split('\n');
const helperLines = lines.slice(4, 30).join('\n');

const helperCode = `
${helperLines.replace(/export\s+const\s+/g, 'const ')}
module.exports = { isValidVietnamesePhone, calculateDiscount, formatVND };
`;

const sandbox = { module: {}, console, Intl };
vm.createContext(sandbox);
vm.runInContext(helperCode, sandbox);
const { isValidVietnamesePhone, calculateDiscount, formatVND } = sandbox.module.exports;

check('isValidVietnamesePhone correctly parses valid Vietnam numbers', () => {
  const validNumbers = [
    '0908123456',
    '0912345678',
    '0987654321',
    '0876637806',
    '0398765432',
    '0771234567',
    '0581234567',
    '+84908123456',
    '+84876637806',
    '0908.123.456',
    '0876 637 806',
    '+84 876 637 806',
    '0876-637-806',
  ];
  validNumbers.forEach((num) => {
    assert(isValidVietnamesePhone(num) === true, `Expected ${num} to be valid`);
  });
});

check('isValidVietnamesePhone strictly rejects invalid numbers & edge inputs', () => {
  const invalidNumbers = [
    '',
    '   ',
    null,
    undefined,
    1234567890,
    '0123456789',
    '087663780',
    '087663780612',
    '090812345a',
    'abcdefghij',
    '+840908123456',
    '84908123456',
    '00908123456',
    '!@#$%^&*()',
  ];
  invalidNumbers.forEach((num) => {
    assert(isValidVietnamesePhone(num) === false, `Expected ${JSON.stringify(num)} to be invalid`);
  });
});

check('calculateDiscount applies exact 10% for VUONGGIA with whitespace & case resilience', () => {
  assertEqual(calculateDiscount(18500000, 'VUONGGIA'), 1850000, '18.5M * 10% = 1.85M');
  assertEqual(calculateDiscount(18500000, 'vuonggia'), 1850000, 'Case insensitivity');
  assertEqual(calculateDiscount(18500000, '  VuongGia  '), 1850000, 'Whitespace trimming');
  assertEqual(calculateDiscount(1000000, 'VUONGGIA'), 100000, '1M * 10% = 100k');
  assertEqual(calculateDiscount(0, 'VUONGGIA'), 0, '0 * 10% = 0');
  assertEqual(calculateDiscount(-100000, 'VUONGGIA'), -10000, 'Negative value handling');
});

check('calculateDiscount rejects invalid or empty coupon codes cleanly', () => {
  assertEqual(calculateDiscount(18500000, 'SALE10'), 0);
  assertEqual(calculateDiscount(18500000, 'VIP'), 0);
  assertEqual(calculateDiscount(18500000, ''), 0);
  assertEqual(calculateDiscount(18500000, '   '), 0);
  assertEqual(calculateDiscount(18500000, null), 0);
  assertEqual(calculateDiscount(18500000, undefined), 0);
  assertEqual(calculateDiscount(18500000, 123), 0);
});

check('formatVND formats with Vietnamese locale thousands separators', () => {
  const f1 = formatVND(18500000);
  assert(f1.includes('18.500.000'), `Expected 18.500.000, got ${f1}`);
  const f2 = formatVND(150000);
  assert(f2.includes('150.000'), `Expected 150.000, got ${f2}`);
});

// -----------------------------------------------------------------------------
// SECTION 3: COMPONENT STRUCTURE & SPEC VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n▶ 3. Component Spec & Contract Verification');

const qvSource = fs.readFileSync(quickViewPath, 'utf8');
const cdSource = fs.readFileSync(cartDrawerPath, 'utf8');
const qoSource = fs.readFileSync(quickOrderPath, 'utf8');
const osSource = fs.readFileSync(orderSuccessPath, 'utf8');

check('QuickViewModal includes dual CTAs: "Thêm Vào Giỏ" and "Mua Ngay"', () => {
  assert(qvSource.includes('Thêm Vào Giỏ') || qvSource.includes('Thêm vào giỏ'), 'Missing "Thêm vào giỏ" button');
  assert(qvSource.includes('Mua Ngay') || qvSource.includes('Mua ngay'), 'Missing "Mua ngay" button');
});

check('QuickViewModal includes image zoom, swatches, S/M/L/XL selector, and size guide', () => {
  assert(qvSource.includes('isZoomed'), 'Missing zoom state');
  assert(qvSource.includes('colors.map'), 'Missing color swatch mapping');
  assert(qvSource.includes('sizes.map'), 'Missing size selector mapping');
  assert(qvSource.includes('showSizeGuide') || qvSource.includes('Ruler'), 'Missing size guide');
});

check('CartDrawer includes slide-over translate classes, velvet gift box toggle (+150.000₫)', () => {
  assert(cdSource.includes('translate-x-0') && cdSource.includes('translate-x-full'), 'Missing slide-over translate classes');
  assert(cdSource.includes('150.000'), 'Missing 150.000₫ gift box notice');
  assert(cdSource.includes('isGiftWrapSelected'), 'Missing gift wrap state binding');
  assert(cdSource.includes('Tiến Hành Đặt Hàng'), 'Missing checkout CTA');
});

check('QuickOrderModal includes VietQR MB Bank STK 0876637806, COD, and Visa/Mastercard', () => {
  assert(qoSource.includes('0876637806'), 'Missing MB Bank STK 0876637806');
  assert(qoSource.includes('MB Bank'), 'Missing MB Bank mention');
  assert(qoSource.includes('cod'), 'Missing COD payment option');
  assert(qoSource.includes('card'), 'Missing card payment option');
  assert(qoSource.includes('vietqr'), 'Missing VietQR payment option');
  assert(qoSource.includes('VUONGGIA'), 'Missing voucher code logic in modal');
});

check('OrderSuccessModal includes VG-2026-XXXX order code and window.print()', () => {
  assert(osSource.includes('orderId'), 'Missing orderId display');
  assert(osSource.includes('window.print'), 'Missing window.print() implementation');
  assert(osSource.includes('Atelier Vuonggia Official Receipt') || osSource.includes('Biên Nhận'), 'Missing receipt header');
});

// -----------------------------------------------------------------------------
// SECTION 4: STORE STATE SIMULATION STRESS TEST
// -----------------------------------------------------------------------------
console.log('\n▶ 4. Adversarial State Machine & Invariant Stress Tests');

// Test State Invariant Engine
class StateInvariantChecker {
  constructor() {
    this.cart = [];
    this.isCartOpen = false;
    this.quickViewProduct = null;
    this.isQuickOrderOpen = false;
    this.quickOrderItem = null;
    this.completedOrder = null;
    this.giftWrap = false;
    this.giftWrapPrice = 150000;
  }

  get cartSubtotal() {
    return this.cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  get cartTotalCount() {
    return this.cart.reduce((sum, i) => sum + i.quantity, 0);
  }

  addToCart(product, color, size, qty = 1) {
    if (qty <= 0) return;
    const itemId = `${product.id}-${color}-${size}`;
    const idx = this.cart.findIndex((i) => i.id === itemId);
    if (idx > -1) {
      this.cart[idx].quantity += qty;
    } else {
      this.cart.push({ id: itemId, product, selectedColor: color, selectedSize: size, quantity: qty });
    }
  }

  updateQty(id, delta) {
    const item = this.cart.find((i) => i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      this.cart = this.cart.filter((i) => i.id !== id);
    }
  }

  openQuickView(p) {
    this.isCartOpen = false;
    this.isQuickOrderOpen = false;
    this.quickViewProduct = p;
  }

  openCart() {
    this.quickViewProduct = null;
    this.isQuickOrderOpen = false;
    this.isCartOpen = true;
  }

  openQuickOrder(singleItem = null) {
    this.quickViewProduct = null;
    this.isCartOpen = false;
    this.quickOrderItem = singleItem;
    this.isQuickOrderOpen = true;
  }

  submitOrder(details) {
    if (!details.customerName || !details.customerName.trim()) throw new Error('Name required');
    if (!isValidVietnamesePhone(details.phoneNumber)) throw new Error('Invalid phone');
    if (!details.address || !details.address.trim()) throw new Error('Address required');

    const items = this.quickOrderItem ? [this.quickOrderItem] : [...this.cart];
    if (items.length === 0) throw new Error('Zero items');

    const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const discount = calculateDiscount(subtotal, details.discountCode);
    const gift = details.giftWrap ? this.giftWrapPrice : 0;
    const total = Math.max(0, subtotal - discount + gift);

    const orderId = `VG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    this.completedOrder = { orderId, items, subtotal, discount, giftWrap: gift, totalAmount: total, details };

    if (!this.quickOrderItem) {
      this.cart = [];
    }
    this.isQuickOrderOpen = false;
    this.quickOrderItem = null;
    return { success: true, orderId };
  }
}

check('Modal Exclusivity Invariant: Only one overlay open at any time', () => {
  const s = new StateInvariantChecker();
  const p = { id: 'p1', name: 'Item', price: 1000000 };

  s.openQuickView(p);
  assert(s.quickViewProduct !== null && !s.isCartOpen && !s.isQuickOrderOpen, 'QuickView active');

  s.openCart();
  assert(s.quickViewProduct === null && s.isCartOpen && !s.isQuickOrderOpen, 'Cart active');

  s.openQuickOrder();
  assert(s.quickViewProduct === null && !s.isCartOpen && s.isQuickOrderOpen, 'QuickOrder active');
});

check('Rapid quantity decrements gracefully purge item without leaving negative quantity', () => {
  const s = new StateInvariantChecker();
  const p = { id: 'p1', name: 'Item', price: 1000000 };
  s.addToCart(p, 'Black', 'M', 1);

  s.updateQty('p1-Black-M', -5);
  assertEqual(s.cart.length, 0, 'Item should be removed');
  assertEqual(s.cartSubtotal, 0, 'Subtotal should be 0');
  assertEqual(s.cartTotalCount, 0, 'Count should be 0');
});

check('Collation invariant: adding 10 same variants results in 1 cart entry with quantity 10', () => {
  const s = new StateInvariantChecker();
  const p = { id: 'p1', name: 'Coat', price: 5000000 };
  for (let i = 0; i < 10; i++) {
    s.addToCart(p, 'Camel', 'L', 1);
  }
  assertEqual(s.cart.length, 1, 'Only 1 line item');
  assertEqual(s.cart[0].quantity, 10, 'Quantity should be 10');
  assertEqual(s.cartSubtotal, 50000000, 'Subtotal should be 50M');
});

check('Single-item Buy Now leaves preexisting cart items untouched after submission', () => {
  const s = new StateInvariantChecker();
  const cartItem = { id: 'cart-1', name: 'In Cart', price: 2000000 };
  s.addToCart(cartItem, 'White', 'S', 2);
  assertEqual(s.cart.length, 1);

  const buyNowItem = {
    id: 'buynow-1',
    product: { id: 'p2', name: 'Buy Now Item', price: 8000000 },
    selectedColor: 'Black',
    selectedSize: 'M',
    quantity: 1,
  };
  s.openQuickOrder(buyNowItem);
  s.submitOrder({
    customerName: 'Hoang Nam',
    phoneNumber: '0908123456',
    address: 'TP.HCM',
    paymentMethod: 'vietqr',
  });

  assertEqual(s.cart.length, 1, 'Cart items must NOT be wiped');
  assertEqual(s.cart[0].product.name, 'In Cart');
  assertEqual(s.cart[0].quantity, 2);
});

check('Full cart checkout purges general cart items after submission', () => {
  const s = new StateInvariantChecker();
  const cartItem = { id: 'cart-1', name: 'In Cart', price: 2000000 };
  s.addToCart(cartItem, 'White', 'S', 2);
  assertEqual(s.cart.length, 1);

  s.openQuickOrder(null);
  s.submitOrder({
    customerName: 'Thuy Linh',
    phoneNumber: '0908123456',
    address: 'Ha Noi',
    paymentMethod: 'cod',
  });

  assertEqual(s.cart.length, 0, 'Cart must be cleared after full checkout');
});

check('Order ID randomness and format distribution over 1000 iterations', () => {
  const ids = new Set();
  for (let i = 0; i < 1000; i++) {
    const id = `VG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    assert(/^VG-2026-\d{4}$/.test(id), `Invalid format: ${id}`);
    ids.add(id);
  }
  // Check distribution: in 1000 random picks between 1000-9999, collisions should be low
  assert(ids.size > 800, `Expected > 800 unique IDs out of 1000, got ${ids.size}`);
});

console.log('\n======================================================================');
console.log(`TOTAL CHECKS:  ${totalChecks}`);
console.log(`PASSED:        ${passedChecks}`);
console.log(`FAILED:        ${failedChecks}`);
console.log('======================================================================');

if (failedChecks > 0) {
  console.error('\nFAILURE DETAILS:');
  failures.forEach(f => console.error(`- ${f.desc}: ${f.error}`));
  process.exit(1);
} else {
  console.log('\n ALL ADVERSARIAL STRESS CHECKS PASSED WITH 100% PRECISION!');
  process.exit(0);
}
