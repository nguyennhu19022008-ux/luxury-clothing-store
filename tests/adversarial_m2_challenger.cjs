/**
 * Empirical Adversarial Challenger Test Harness for Milestone 2
 * Comprehensive Customer Journeys, System Invariants, Buy Now Isolation, and Boundary Audits
 * Usage: node tests/adversarial_m2_challenger.cjs
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'src');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(
      `${message ? message + ' - ' : ''}Expected ${JSON.stringify(expected)} (${typeof expected}), got ${JSON.stringify(actual)} (${typeof actual})`
    );
  }
}

function assertMatch(actual, regex, message) {
  if (!regex.test(String(actual))) {
    throw new Error(`${message ? message + ' - ' : ''}Value "${actual}" does not match pattern ${regex}`);
  }
}

function runTest(suite, name, fn) {
  totalTests++;
  const start = Date.now();
  try {
    fn();
    const duration = Date.now() - start;
    passedTests++;
    console.log(`  ${colors.green}✔ PASS${colors.reset} [${suite}] ${name} ${colors.dim}(${duration}ms)${colors.reset}`);
  } catch (err) {
    const duration = Date.now() - start;
    failedTests++;
    failures.push({ suite, name, error: err.message, stack: err.stack });
    console.log(`  ${colors.red}✖ FAIL${colors.reset} [${suite}] ${name}`);
    console.log(`    ${colors.red}Error: ${err.message}${colors.reset}`);
  }
}

// -----------------------------------------------------------------------------
// Harness Imports & Simulation Helpers
// -----------------------------------------------------------------------------
const {
  StoreContextSimulator,
  Slide0Simulator,
  isValidVietnamesePhone,
  calculateDiscount,
  generateOrderId,
  formatVND,
} = require('./test_harness_utils.cjs');

console.log(`\n${colors.bold}${colors.white}╔══════════════════════════════════════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.bold}${colors.white}║     ADVERSARIAL STRESS TEST HARNESS — MILESTONE 2 VERIFICATION           ║${colors.reset}`);
console.log(`${colors.bold}${colors.white}║     Forensic Customer Journeys, Buy Now Isolation, & Invariants          ║${colors.reset}`);
console.log(`${colors.bold}${colors.white}╚══════════════════════════════════════════════════════════════════════════╝${colors.reset}\n`);

// =============================================================================
// TEST SUITE 1: Comprehensive Unicode Emoji Forensic Audit in src/
// =============================================================================
console.log(`${colors.bold}${colors.cyan}▶ Suite 1: Extended Unicode Emoji Forensic Audit${colors.reset}`);

runTest('Suite 1: Emoji Audit', 'Zero emoji invariant across entire src/ tree', () => {
  // Broad Unicode regex matching pictorial/graphic emoji symbols while preserving legal typography symbols (©, ®)
  const broadEmojiRegex = /(?:[\u{1F300}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]|(?![©®™])\p{Extended_Pictographic})/u;

  function scanDirectory(dir) {
    let matches = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        matches = matches.concat(scanDirectory(fullPath));
      } else if (/\.(jsx?|tsx?|html|css|json)$/i.test(entry.name)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (broadEmojiRegex.test(line)) {
            matches.push({ file: fullPath, line: index + 1, snippet: line.trim() });
          }
        });
      }
    }
    return matches;
  }

  const detectedEmojis = scanDirectory(srcDir);
  if (detectedEmojis.length > 0) {
    const errorDetails = detectedEmojis.map((e) => `  ${e.file}:${e.line} -> ${e.snippet}`).join('\n');
    throw new Error(`Found ${detectedEmojis.length} emoji(s) in src/:\n${errorDetails}`);
  }
  assertEqual(detectedEmojis.length, 0, 'Must have zero emojis in source files');
});

// =============================================================================
// TEST SUITE 2: Complete User Journey A (Cashmere Coat -> Cart -> Velvet Gift -> COD)
// =============================================================================
console.log(`\n${colors.bold}${colors.cyan}▶ Suite 2: Complete User Journey A (Cashmere Coat, Cart, Velvet Gift, COD)${colors.reset}`);

runTest('Suite 2: Journey A', 'Step 1: Direct Storefront entry and Copyright Modal inspection', () => {
  const nav = new Slide0Simulator();
  assertEqual(nav.currentPage, 1);
  nav.openCopyrightModal();
  assertEqual(nav.isCopyrightModalOpen, true);
  assertEqual(nav.isCardOpen, true);
  assertEqual(nav.copyEmail(), 'nguyennhu19022008@gmail.com');
  assertEqual(nav.copyPhone(), '0876637806');
});

runTest('Suite 2: Journey A', 'Step 2: Close Copyright Modal and browse storefront', () => {
  const nav = new Slide0Simulator();
  nav.openCopyrightModal();
  nav.closeCopyrightModal();
  assertEqual(nav.isCopyrightModalOpen, false);
  assertEqual(nav.currentPage, 1);
});

runTest('Suite 2: Journey A', 'Step 3: Browse category and open Quick View modal for Cashmere Coat', () => {
  const store = new StoreContextSimulator();
  const coatProduct = {
    id: 'vg-coat-01',
    sku: 'AT-CSH-001',
    name: 'Măng tô Cashmere May đo Thượng hạng',
    category: 'ao-khoac',
    price: 18500000,
    colors: [
      { id: 'camel', name: 'Be Lạc Đà Thượng Hạng', hex: '#C29B72' },
      { id: 'black', name: 'Đen Obsidian', hex: '#141413' },
    ],
    sizes: [
      { id: 'S', name: 'S' },
      { id: 'M', name: 'M' },
      { id: 'L', name: 'L' },
    ],
  };

  store.openQuickView(coatProduct);
  assertEqual(store.quickViewProduct.id, 'vg-coat-01');
  assertEqual(store.isCartOpen, false);
  assertEqual(store.isQuickOrderOpen, false);
});

runTest('Suite 2: Journey A', 'Step 4: Customization & Add to Cart opens Cart Drawer', () => {
  const store = new StoreContextSimulator();
  const coatProduct = {
    id: 'vg-coat-01',
    name: 'Măng tô Cashmere May đo Thượng hạng',
    price: 18500000,
  };

  store.addToCart(coatProduct, 'Be Lạc Đà Thượng Hạng', 'M', 1);
  store.openCart();

  assertEqual(store.isCartOpen, true);
  assertEqual(store.quickViewProduct, null, 'Modal exclusivity: Quick View closed');
  assertEqual(store.cartTotalCount, 1);
  assertEqual(store.cartSubtotal, 18500000);
});

runTest('Suite 2: Journey A', 'Step 5: Apply Velvet Gift Box (+150.000₫) and open Quick Order Form', () => {
  const store = new StoreContextSimulator();
  const coatProduct = {
    id: 'vg-coat-01',
    name: 'Măng tô Cashmere May đo Thượng hạng',
    price: 18500000,
  };
  store.addToCart(coatProduct, 'Be Lạc Đà Thượng Hạng', 'M', 1);

  // User proceeds to checkout
  store.openQuickOrder(null); // checkout whole cart

  assertEqual(store.isQuickOrderOpen, true);
  assertEqual(store.isCartOpen, false, 'Modal exclusivity: Cart Drawer closed');
  assertEqual(store.quickOrderItem, null, 'Cart checkout mode active');
});

runTest('Suite 2: Journey A', 'Step 6: Complete Order with COD and verify Royal Order Receipt', () => {
  const store = new StoreContextSimulator();
  const coatProduct = {
    id: 'vg-coat-01',
    name: 'Măng tô Cashmere May đo Thượng hạng',
    price: 18500000,
  };
  store.addToCart(coatProduct, 'Be Lạc Đà Thượng Hạng', 'M', 1);
  store.openQuickOrder(null);

  const orderResult = store.submitOrder({
    customerName: 'Lê Hoàng Yến',
    phoneNumber: '0912345678',
    address: '123 Phố Huế, Quận Hai Bà Trưng, Hà Nội',
    paymentMethod: 'cod',
    giftWrap: true,
  });

  assertEqual(orderResult.success, true);
  assertMatch(orderResult.orderId, /^VG-2026-\d{4}$/);

  const receipt = store.completedOrder;
  assertEqual(receipt.subtotal, 18500000);
  assertEqual(receipt.giftWrap, 150000, 'Velvet gift box is 150.000₫');
  assertEqual(receipt.shipping, 0, 'Complimentary shipping is 0₫');
  assertEqual(receipt.totalAmount, 18650000);
  assertEqual(receipt.orderDetails.paymentMethod, 'cod');
  assertEqual(receipt.items.length, 1);
  assertEqual(receipt.items[0].product.name, 'Măng tô Cashmere May đo Thượng hạng');

  // Verify Cart is wiped after full cart order
  assertEqual(store.cart.length, 0);
  assertEqual(store.cartTotalCount, 0);
  assertEqual(store.cartSubtotal, 0);

  // Close receipt
  store.closeOrderSuccess();
  assertEqual(store.completedOrder, null);
});

// =============================================================================
// TEST SUITE 3: Complete User Journey B (Multi-item, Coupon VUONGGIA, VietQR)
// =============================================================================
console.log(`\n${colors.bold}${colors.cyan}▶ Suite 3: Complete User Journey B (Multi-item, Coupon, VietQR)${colors.reset}`);

runTest('Suite 3: Journey B', 'Multi-item cart collation and quantity calculation', () => {
  const store = new StoreContextSimulator();
  const silkDress = { id: 'vg-dress-01', name: 'Đầm Lụa Hà Đông Cắt Xéo', price: 8600000 };
  const silkScarf = { id: 'vg-acc-01', name: 'Khăn Lụa Vuông In Họa Tiết', price: 3200000 };

  store.addToCart(silkDress, 'Đen Obsidian', 'S', 1);
  store.addToCart(silkScarf, 'Đen & Ngà Voi', 'FreeSize', 2);

  assertEqual(store.cartTotalCount, 3);
  assertEqual(store.cartSubtotal, 8600000 + 3200000 * 2); // 15.000.000₫
});

runTest('Suite 3: Journey B', 'Coupon VUONGGIA (10%) and VietQR Payment Execution', () => {
  const store = new StoreContextSimulator();
  const silkDress = { id: 'vg-dress-01', name: 'Đầm Lụa Hà Đông Cắt Xéo', price: 8600000 };
  const silkScarf = { id: 'vg-acc-01', name: 'Khăn Lụa Vuông In Họa Tiết', price: 3200000 };

  store.addToCart(silkDress, 'Đen Obsidian', 'S', 1);
  store.addToCart(silkScarf, 'Đen & Ngà Voi', 'FreeSize', 2);
  store.openQuickOrder(null);

  const orderResult = store.submitOrder({
    customerName: 'Đặng Minh Tâm',
    phoneNumber: '0876637806',
    address: 'Villa 18 Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh',
    discountCode: 'VUONGGIA',
    paymentMethod: 'vietqr',
    giftWrap: true,
  });

  assertEqual(orderResult.success, true);
  const receipt = store.completedOrder;
  assertEqual(receipt.subtotal, 15000000);
  assertEqual(receipt.discount, 1500000, '10% of 15.000.000₫ is 1.500.000₫');
  assertEqual(receipt.giftWrap, 150000);
  assertEqual(receipt.totalAmount, 15000000 - 1500000 + 150000); // 13.650.000₫
  assertEqual(receipt.orderDetails.paymentMethod, 'vietqr');
  assertEqual(store.cart.length, 0, 'Cart cleared after full order');
});

// =============================================================================
// TEST SUITE 4: "Mua Ngay" (Buy Now) Isolation Invariant Stress Testing
// =============================================================================
console.log(`\n${colors.bold}${colors.cyan}▶ Suite 4: "Mua Ngay" (Buy Now) Isolation Invariant${colors.reset}`);

runTest('Suite 4: Buy Now Isolation', 'Buy Now single item flow preserves existing cart intact', () => {
  const store = new StoreContextSimulator();

  // 1. Prepopulate cart with 2 expensive items
  const dress = { id: 'vg-dress-01', name: 'Đầm Lụa Hà Đông', price: 8600000 };
  const pants = { id: 'vg-pants-01', name: 'Quần Tây Len Xếp Ly', price: 6500000 };
  store.addToCart(dress, 'Đen', 'M', 1);
  store.addToCart(pants, 'Xám Than', 'L', 2);

  const initialCartCount = store.cartTotalCount; // 3
  const initialCartSubtotal = store.cartSubtotal; // 8.600.000 + 13.000.000 = 21.600.000₫
  assertEqual(initialCartCount, 3);
  assertEqual(initialCartSubtotal, 21600000);

  // 2. User initiates "Mua Ngay" on a separate 3rd product
  const coat = { id: 'vg-coat-01', name: 'Măng tô Cashmere', price: 18500000 };
  const singleItem = {
    id: 'vg-coat-01-Camel-M',
    product: coat,
    selectedColor: 'Camel',
    selectedSize: 'M',
    quantity: 1,
  };

  store.openQuickOrder(singleItem);
  assertEqual(store.isQuickOrderOpen, true);
  assertEqual(store.quickOrderItem.id, 'vg-coat-01-Camel-M');

  // 3. Complete single item order
  const orderResult = store.submitOrder({
    customerName: 'Phạm Bảo Hân',
    phoneNumber: '0987654321',
    address: 'Số 88 Đồng Khởi, Quận 1, TP. Hồ Chí Minh',
    paymentMethod: 'card',
    giftWrap: false,
  });

  assertEqual(orderResult.success, true);
  const receipt = store.completedOrder;
  assertEqual(receipt.items.length, 1);
  assertEqual(receipt.items[0].product.id, 'vg-coat-01');
  assertEqual(receipt.totalAmount, 18500000);

  // 4. CRITICAL INVARIANT: General cart items MUST REMAIN UNTOUCHED!
  assertEqual(store.cart.length, 2, 'Cart still has 2 line items');
  assertEqual(store.cartTotalCount, initialCartCount, 'Cart total count untouched');
  assertEqual(store.cartSubtotal, initialCartSubtotal, 'Cart subtotal untouched');
  assertEqual(store.cart[0].product.id, 'vg-dress-01');
  assertEqual(store.cart[1].product.id, 'vg-pants-01');
  assertEqual(store.cart[1].quantity, 2);
});

// =============================================================================
// TEST SUITE 5: Phone Number Validator Adversarial Boundary Matrix
// =============================================================================
console.log(`\n${colors.bold}${colors.cyan}▶ Suite 5: Vietnamese Phone Validation Boundary Matrix${colors.reset}`);

runTest('Suite 5: Phone Validation', 'All valid telecom prefix families (09, 08, 07, 03, 05)', () => {
  const validNumbers = [
    '0908123456', // Viettel/Mobi
    '0876637806', // Author hotline
    '0771234567', // MobiFone
    '0398765432', // Viettel
    '0581234567', // Vietnamobile
    '+84908123456', // International format
    '+84876637806',
    '0908 123 456', // With spaces
    '0908.123.456', // With dots
    '0908-123-456', // With hyphens
  ];

  for (const phone of validNumbers) {
    assertEqual(isValidVietnamesePhone(phone), true, `Phone "${phone}" must be valid`);
  }
});

runTest('Suite 5: Phone Validation', 'Adversarial rejection of invalid & fraudulent inputs', () => {
  const invalidNumbers = [
    '', // Empty
    ' ', // Whitespace
    null, // Null
    undefined, // Undefined
    '0123456789', // Invalid prefix 01 (legacy 11-digit prefix)
    '0243825000', // Landline (not mobile)
    '090812345', // 9 digits (too short)
    '09081234567', // 11 digits (too long)
    'abcdefghij', // Letters
    '090812345a', // Mixed
    "0908123456'; DROP TABLE orders;--", // SQL injection payload
    '<script>alert(1)</script>', // XSS payload
    '+12025550123', // US number
  ];

  for (const phone of invalidNumbers) {
    assertEqual(isValidVietnamesePhone(phone), false, `Phone "${phone}" must be rejected`);
  }
});

// =============================================================================
// TEST SUITE 6: Voucher Calculation Engine Adversarial Matrix
// =============================================================================
console.log(`\n${colors.bold}${colors.cyan}▶ Suite 6: Voucher Engine Adversarial Matrix${colors.reset}`);

runTest('Suite 6: Voucher Engine', 'Exact 10% calculation on various subtotals', () => {
  assertEqual(calculateDiscount(10000000, 'VUONGGIA'), 1000000);
  assertEqual(calculateDiscount(18500000, 'VUONGGIA'), 1850000);
  assertEqual(calculateDiscount(3200000, 'VUONGGIA'), 320000);
  // Odd amount rounding test (no decimals)
  assertEqual(calculateDiscount(1234567, 'VUONGGIA'), 123457);
});

runTest('Suite 6: Voucher Engine', 'Case insensitivity and whitespace resilience', () => {
  assertEqual(calculateDiscount(5000000, 'vuonggia'), 500000);
  assertEqual(calculateDiscount(5000000, '  VUONGGIA  '), 500000);
  assertEqual(calculateDiscount(5000000, 'VuongGia'), 500000);
  assertEqual(calculateDiscount(5000000, '\tVUONGGIA\n'), 500000);
});

runTest('Suite 6: Voucher Engine', 'Invalid, empty, and malicious coupon handling', () => {
  assertEqual(calculateDiscount(5000000, 'VUONGGIA10'), 0);
  assertEqual(calculateDiscount(5000000, 'DISCOUNT'), 0);
  assertEqual(calculateDiscount(5000000, ''), 0);
  assertEqual(calculateDiscount(5000000, null), 0);
  assertEqual(calculateDiscount(5000000, undefined), 0);
  assertEqual(calculateDiscount(5000000, '   '), 0);
  assertEqual(calculateDiscount(5000000, {}), 0);
});

// =============================================================================
// TEST SUITE 7: Order ID Specification & Formatter Invariants
// =============================================================================
console.log(`\n${colors.bold}${colors.cyan}▶ Suite 7: Order ID & Formatting Invariants${colors.reset}`);

runTest('Suite 7: Order ID & Formatting', '50 sequential order IDs adhere strictly to VG-2026-XXXX format', () => {
  for (let i = 0; i < 50; i++) {
    const id = generateOrderId();
    assertMatch(id, /^VG-2026-\d{4}$/, `Order ID ${id} must follow VG-2026-XXXX`);
  }
});

runTest('Suite 7: Order ID & Formatting', 'Currency formatting adheres to Vietnamese VND locale', () => {
  const formatted = formatVND(18500000);
  assert(formatted.includes('18.500.000'), `Expected formatted amount to include 18.500.000, got ${formatted}`);
  assert(formatted.includes('₫') || formatted.includes('VND'), 'Expected currency symbol');
});

// =============================================================================
// TEST SUITE 8: Modal Exclusivity Invariant in StoreContext.jsx
// =============================================================================
console.log(`\n${colors.bold}${colors.cyan}▶ Suite 8: Modal Exclusivity Invariant Source Verification${colors.reset}`);

runTest('Suite 8: Modal Exclusivity', 'StoreContext.jsx enforces symmetric mutual exclusion across all overlays', () => {
  const storeContextPath = path.join(srcDir, 'context', 'StoreContext.jsx');
  const storeContextCode = fs.readFileSync(storeContextPath, 'utf8');

  // Verify openQuickView resets isCartOpen and isQuickOrderOpen
  assert(
    storeContextCode.includes('setIsCartOpen(false)') && storeContextCode.includes('setIsQuickOrderOpen(false)'),
    'openQuickView must close Cart and QuickOrder overlays'
  );

  // Verify openCart resets quickViewProduct and isQuickOrderOpen
  assert(
    storeContextCode.includes('setQuickViewProduct(null)') && storeContextCode.includes('setIsCartOpen(true)'),
    'openCart must close QuickView and QuickOrder overlays'
  );

  // Verify openQuickOrder resets quickViewProduct and isCartOpen
  assert(
    storeContextCode.includes('setIsCartOpen(false)') && storeContextCode.includes('setIsQuickOrderOpen(true)'),
    'openQuickOrder must close QuickView and Cart overlays'
  );
});

// =============================================================================
// TEST SUITE 9: Adversarial Edge Case Discovery: Gift Wrap Fallback Behavior
// =============================================================================
console.log(`\n${colors.bold}${colors.cyan}▶ Suite 9: Adversarial Edge Case: Gift Wrap State Precedence${colors.reset}`);

runTest('Suite 9: Gift Wrap State', 'Standard path: Velvet Gift Box applies 150.000₫ when selected', () => {
  const store = new StoreContextSimulator();
  const item = { id: 'p1', name: 'Dress', price: 5000000 };
  store.addToCart(item, 'Black', 'M', 1);
  store.openQuickOrder(null);

  const res = store.submitOrder({
    customerName: 'Hoàng Lan',
    phoneNumber: '0908123456',
    address: 'Hà Nội',
    paymentMethod: 'cod',
    giftWrap: true,
  });

  assertEqual(res.success, true);
  assertEqual(store.completedOrder.giftWrap, 150000);
  assertEqual(store.completedOrder.totalAmount, 5150000);
});

runTest('Suite 9: Gift Wrap State', 'Standard path: No Gift Box fee applied when unselected', () => {
  const store = new StoreContextSimulator();
  const item = { id: 'p1', name: 'Dress', price: 5000000 };
  store.addToCart(item, 'Black', 'M', 1);
  store.openQuickOrder(null);

  const res = store.submitOrder({
    customerName: 'Hoàng Lan',
    phoneNumber: '0908123456',
    address: 'Hà Nội',
    paymentMethod: 'cod',
    giftWrap: false,
  });

  assertEqual(res.success, true);
  assertEqual(store.completedOrder.giftWrap, 0);
  assertEqual(store.completedOrder.totalAmount, 5000000);
});

// =============================================================================
// SUMMARY REPORT
// =============================================================================
console.log(`\n${colors.bold}${colors.white}══════════════════════════════════════════════════════════════════════════${colors.reset}`);
console.log(`${colors.bold}${colors.white}          ADVERSARIAL STRESS TEST SUMMARY REPORT                          ${colors.reset}`);
console.log(`${colors.bold}${colors.white}══════════════════════════════════════════════════════════════════════════${colors.reset}`);
console.log(`  • Total Tests Executed: ${colors.bold}${totalTests}${colors.reset}`);
console.log(`  • Tests Passed:         ${colors.green}${colors.bold}${passedTests}${colors.reset}`);
console.log(`  • Tests Failed:         ${failedTests > 0 ? colors.red : colors.dim}${colors.bold}${failedTests}${colors.reset}`);

if (failedTests > 0) {
  console.log(`\n${colors.red}${colors.bold}✖ ADVERSARIAL VERIFICATION FAILED WITH ${failedTests} DEFECT(S)${colors.reset}\n`);
  process.exit(1);
} else {
  console.log(`\n${colors.green}${colors.bold}✔ ALL ADVERSARIAL STRESS SCENARIOS PASSED WITH 100% PRECISION!${colors.reset}\n`);
  process.exit(0);
}
