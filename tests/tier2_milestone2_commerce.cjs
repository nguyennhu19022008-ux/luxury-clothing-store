/**
 * Milestone 2 Direct Verification Suite: Interactive Commerce & Quick Order Checkout
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
  isValidVietnamesePhone,
  calculateDiscount,
  generateOrderId,
  formatVND,
} = require('./test_harness_utils.cjs');

const runner = new TestRunner('Milestone 2: Interactive Commerce & Checkout');

// Test Suite 1: Phone Validation Precision
runner.describe('Milestone 2 - Vietnamese Phone Number Rules', () => {
  runner.test('Standard 10-digit formats are valid', () => {
    assertEqual(isValidVietnamesePhone('0908123456'), true);
    assertEqual(isValidVietnamesePhone('0876637806'), true);
    assertEqual(isValidVietnamesePhone('0398765432'), true);
    assertEqual(isValidVietnamesePhone('0771234567'), true);
    assertEqual(isValidVietnamesePhone('0581234567'), true);
  });

  runner.test('International +84 prefix is valid', () => {
    assertEqual(isValidVietnamesePhone('+84908123456'), true);
    assertEqual(isValidVietnamesePhone('+84876637806'), true);
  });

  runner.test('Formatted with spaces and dots is cleanly normalized', () => {
    assertEqual(isValidVietnamesePhone('0908.123.456'), true);
    assertEqual(isValidVietnamesePhone('0876 637 806'), true);
    assertEqual(isValidVietnamesePhone('+84 876 637 806'), true);
  });

  runner.test('Invalid or fraudulent numbers are rejected', () => {
    assertEqual(isValidVietnamesePhone('0123456789'), false);
    assertEqual(isValidVietnamesePhone('087663780'), false);
    assertEqual(isValidVietnamesePhone('087663780612'), false);
    assertEqual(isValidVietnamesePhone(''), false);
    assertEqual(isValidVietnamesePhone(null), false);
    assertEqual(isValidVietnamesePhone('abcdefghij'), false);
  });
});

// Test Suite 2: Voucher Code Engine
runner.describe('Milestone 2 - Voucher Code Calculation Engine', () => {
  runner.test('Voucher VUONGGIA applies exact 10% discount', () => {
    const discount = calculateDiscount(18500000, 'VUONGGIA');
    assertEqual(discount, 1850000);
  });

  runner.test('Voucher is case insensitive and trims whitespace', () => {
    assertEqual(calculateDiscount(10000000, 'vuonggia'), 1000000);
    assertEqual(calculateDiscount(10000000, '  VUONGGIA  '), 1000000);
    assertEqual(calculateDiscount(10000000, 'VuongGia'), 1000000);
  });

  runner.test('Unrecognized codes return 0 discount', () => {
    assertEqual(calculateDiscount(10000000, 'DISCOUNT10'), 0);
    assertEqual(calculateDiscount(10000000, 'VIP'), 0);
    assertEqual(calculateDiscount(10000000, ''), 0);
    assertEqual(calculateDiscount(10000000, null), 0);
  });
});

// Test Suite 3: Order ID Specification
runner.describe('Milestone 2 - Order ID Generator Format', () => {
  runner.test('Order IDs follow strictly VG-2026-XXXX format', () => {
    for (let i = 0; i < 20; i++) {
      const id = generateOrderId();
      assertMatch(id, /^VG-2026-\d{4}$/, `Order ID ${id} must match VG-2026-XXXX pattern`);
    }
  });
});

// Test Suite 4: Currency Formatter
runner.describe('Milestone 2 - Vietnamese Currency Formatter', () => {
  runner.test('Formats integer amounts to Vietnamese Dong standard', () => {
    const res = formatVND(18500000);
    assertIncludes(res, '18.500.000');
  });
});

runner.summary();
