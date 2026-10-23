/**
 * Tier 2: Boundary & Corner Cases Test Suite
 * Minimum >= 20 edge, boundary, and stress scenarios (22 total tests)
 */

const {
  TestRunner,
  assert,
  assertEqual,
  assertDeepEqual,
  assertMatch,
  assertIncludes,
  assertGreaterThanOrEqual,
  assertThrows,
  StoreContextSimulator,
  Slide0Simulator,
  isValidVietnamesePhone,
  calculateDiscount,
  generateOrderId,
} = require('./test_harness_utils.cjs');

const runner = new TestRunner('Tier 2: Boundary & Corner Cases');

// -----------------------------------------------------------------------------
// Boundary Group 1: Slide 0 & Keyboard Event Edge Cases
// -----------------------------------------------------------------------------
runner.describe('Group 1: Slide 0 State & Event Boundaries', () => {
  runner.test('B1.1 Dismissing card hides card and reveals floating reopening triggers', () => {
    const sim = new Slide0Simulator();
    assertEqual(sim.isCardOpen, true);
    sim.dismissCard();
    assertEqual(sim.isCardOpen, false, 'Card must be dismissed');
    sim.reopenCard();
    assertEqual(sim.isCardOpen, true, 'Card must be restored');
  });

  runner.test('B1.2 Repeated Escape key presses cleanly alternate card visibility', () => {
    const sim = new Slide0Simulator();
    for (let i = 0; i < 6; i++) {
      const expected = i % 2 !== 0; // Starts true, first esc makes it false
      sim.handleKeyDown('Escape');
      assertEqual(sim.isCardOpen, expected, `Cycle ${i} failed`);
    }
  });

  runner.test('B1.3 Keyboard navigation shortcuts are strictly suppressed when focused in INPUT or TEXTAREA', () => {
    const sim = new Slide0Simulator({ initialPage: 0, initialModal: true });
    // Simulate user pressing Space or Enter inside an input box
    const spaceInInput = sim.handleKeyDown(' ', 'INPUT');
    assertEqual(spaceInInput, false, 'Space in INPUT must be ignored');
    assertEqual(sim.currentPage, 0, 'Page must not change');

    const enterInTextarea = sim.handleKeyDown('Enter', 'TEXTAREA');
    assertEqual(enterInTextarea, false, 'Enter in TEXTAREA must be ignored');
    assertEqual(sim.currentPage, 0, 'Page must not change');

    const rightInInput = sim.handleKeyDown('ArrowRight', 'INPUT');
    assertEqual(rightInInput, false, 'ArrowRight in INPUT must be ignored');
    assertEqual(sim.currentPage, 0, 'Page must not change');
  });

  runner.test('B1.4 When already on Page 1, Slide 0 keyboard shortcuts do nothing', () => {
    const sim = new Slide0Simulator();
    sim.onNextPage();
    assertEqual(sim.currentPage, 1);
    const res = sim.handleKeyDown('ArrowRight');
    assertEqual(res, false, 'Should not process Slide 0 keys when on Page 1');
    assertEqual(sim.currentPage, 1);
  });
});

// -----------------------------------------------------------------------------
// Boundary Group 2: Empty Cart & Quantity Edge Cases
// -----------------------------------------------------------------------------
runner.describe('Group 2: Cart Quantities & Empty State Boundaries', () => {
  runner.test('B2.1 Empty cart subtotal and total count are exactly 0', () => {
    const sim = new StoreContextSimulator();
    assertEqual(sim.cart.length, 0);
    assertEqual(sim.cartSubtotal, 0);
    assertEqual(sim.cartTotalCount, 0);
  });

  runner.test('B2.2 Submitting checkout with empty cart throws an explicit error', () => {
    const sim = new StoreContextSimulator();
    assertThrows(() => {
      sim.submitOrder({
        customerName: 'Khách Hàng',
        phoneNumber: '0901234567',
        address: 'Hà Nội',
        paymentMethod: 'cod',
      });
    }, 'Must reject submitting order with 0 items');
  });

  runner.test('B2.3 Decrementing quantity of single item (qty = 1) from cart removes it completely', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Item', price: 1000000 };
    sim.addToCart(p1, 'Black', 'M', 1);
    assertEqual(sim.cart.length, 1);

    sim.updateQuantity('p1-Black-M', -1);
    assertEqual(sim.cart.length, 0, 'Quantity reaching 0 must remove item');
    assertEqual(sim.cartSubtotal, 0);
  });

  runner.test('B2.4 Adding item with zero or negative quantity is safely ignored', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Item', price: 1000000 };
    sim.addToCart(p1, 'Black', 'M', 0);
    sim.addToCart(p1, 'Black', 'M', -5);
    assertEqual(sim.cart.length, 0, 'Must not add zero or negative quantity items');
  });

  runner.test('B2.5 High-quantity stress test (e.g., 50 items) calculates without numeric overflow', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Item', price: 18500000 };
    sim.addToCart(p1, 'Black', 'M', 50);
    assertEqual(sim.cartTotalCount, 50);
    assertEqual(sim.cartSubtotal, 18500000 * 50);
    assertEqual(Number.isNaN(sim.cartSubtotal), false);
  });
});

// -----------------------------------------------------------------------------
// Boundary Group 3: Phone Number Validation Matrix
// -----------------------------------------------------------------------------
runner.describe('Group 3: Phone Number Validation Boundary Matrix', () => {
  runner.test('B3.1 Standard 10-digit mobile prefixes (09, 08, 07, 03, 05) are valid', () => {
    const validPhones = [
      '0901234567',
      '0987654321',
      '0876637806',
      '0888888888',
      '0771234567',
      '0389998888',
      '0581234567',
    ];
    for (const phone of validPhones) {
      assert(isValidVietnamesePhone(phone), `Phone "${phone}" should be valid`);
    }
  });

  runner.test('B3.2 International +84 format is recognized and valid', () => {
    assert(isValidVietnamesePhone('+84901234567'), '+84901234567 must be valid');
    assert(isValidVietnamesePhone('+84876637806'), '+84876637806 must be valid');
  });

  runner.test('B3.3 Phone numbers formatted with spaces or dashes are cleanly normalized', () => {
    assert(isValidVietnamesePhone('090 123 4567'), 'Spaces should be handled');
    assert(isValidVietnamesePhone('0876-637-806'), 'Dashes should be handled');
  });

  runner.test('B3.4 Malformed, alphabetic, or out-of-bounds phone numbers are rejected', () => {
    const invalidPhones = [
      '',
      '   ',
      '12345',
      '0901234567890', // too long
      '0123456789',    // old 11-digit prefix 01
      '090abcdef1',
      'null',
      '!@#$%^&*()',
    ];
    for (const phone of invalidPhones) {
      assert(!isValidVietnamesePhone(phone), `Phone "${phone}" should be invalid`);
    }
  });
});

// -----------------------------------------------------------------------------
// Boundary Group 4: Coupon Code Discount Logic
// -----------------------------------------------------------------------------
runner.describe('Group 4: Coupon Code Robustness & Precision', () => {
  runner.test('B4.1 "VUONGGIA" coupon applies exact 10% discount', () => {
    assertEqual(calculateDiscount(20000000, 'VUONGGIA'), 2000000);
  });

  runner.test('B4.2 Coupon code is case-insensitive (vuonggia, VuongGia)', () => {
    assertEqual(calculateDiscount(10000000, 'vuonggia'), 1000000);
    assertEqual(calculateDiscount(10000000, 'VuongGia'), 1000000);
  });

  runner.test('B4.3 Coupon code ignores leading/trailing whitespace', () => {
    assertEqual(calculateDiscount(10000000, '  VUONGGIA  '), 1000000);
  });

  runner.test('B4.4 Invalid, unrecognized, or empty coupon codes apply 0 discount', () => {
    assertEqual(calculateDiscount(10000000, 'DISCOUNT50'), 0);
    assertEqual(calculateDiscount(10000000, 'SALE'), 0);
    assertEqual(calculateDiscount(10000000, ''), 0);
    assertEqual(calculateDiscount(10000000, null), 0);
  });

  runner.test('B4.5 Discount rounds to nearest integer Dong (no fractional decimals)', () => {
    const subtotal = 7555555;
    const discount = calculateDiscount(subtotal, 'VUONGGIA');
    assertEqual(discount, Math.round(subtotal * 0.1));
    assertEqual(Number.isInteger(discount), true);
  });
});

// -----------------------------------------------------------------------------
// Boundary Group 5: Product Variations & Integrity
// -----------------------------------------------------------------------------
runner.describe('Group 5: Product Variations & Customer Data Integrity', () => {
  runner.test('B5.1 Same product in different sizes creates separate cart items', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'vg-coat-01', name: 'Cashmere Coat', price: 18500000 };
    sim.addToCart(p1, 'Camel', 'S', 1);
    sim.addToCart(p1, 'Camel', 'M', 1);
    assertEqual(sim.cart.length, 2, 'Different sizes must not collide');
    assertEqual(sim.cart[0].selectedSize, 'S');
    assertEqual(sim.cart[1].selectedSize, 'M');
  });

  runner.test('B5.2 Same product in different colors creates separate cart items', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'vg-coat-01', name: 'Cashmere Coat', price: 18500000 };
    sim.addToCart(p1, 'Camel', 'M', 1);
    sim.addToCart(p1, 'Black', 'M', 1);
    assertEqual(sim.cart.length, 2, 'Different colors must not collide');
    assertEqual(sim.cart[0].selectedColor, 'Camel');
    assertEqual(sim.cart[1].selectedColor, 'Black');
  });

  runner.test('B5.3 Customer name and address with Vietnamese unicode characters are preserved', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'vg-dress-01', name: 'Silk Dress', price: 8600000 };
    sim.addToCart(p1, 'Champagne', 'M', 1);

    const name = 'Nguyễn Thị Huyền Trang';
    const address = 'Số 88 Phố Tràng Tiền, Quận Hoàn Kiếm, Hà Nội';
    sim.submitOrder({
      customerName: name,
      phoneNumber: '0901234567',
      address,
      paymentMethod: 'cod',
    });

    assertEqual(sim.completedOrder.orderDetails.customerName, name);
    assertEqual(sim.completedOrder.orderDetails.address, address);
  });

  runner.test('B5.4 Whitespace-only customer name or address is rejected', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'vg-dress-01', name: 'Silk Dress', price: 8600000 };
    sim.addToCart(p1, 'Champagne', 'M', 1);

    assertThrows(() => {
      sim.submitOrder({
        customerName: '   ',
        phoneNumber: '0901234567',
        address: 'Hà Nội',
        paymentMethod: 'cod',
      });
    }, 'Must reject whitespace-only name');

    assertThrows(() => {
      sim.submitOrder({
        customerName: 'Huyền Trang',
        phoneNumber: '0901234567',
        address: '     ',
        paymentMethod: 'cod',
      });
    }, 'Must reject whitespace-only address');
  });
});

const summary = runner.summary();
module.exports = summary;
