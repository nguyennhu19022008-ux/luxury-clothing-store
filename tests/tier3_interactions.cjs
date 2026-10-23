/**
 * Tier 3: Cross-Feature Interactions Test Suite
 * Minimum >= 10 end-to-end integration workflows (10 total tests)
 */

const {
  TestRunner,
  assert,
  assertEqual,
  assertDeepEqual,
  assertMatch,
  assertIncludes,
  assertGreaterThanOrEqual,
  StoreContextSimulator,
  Slide0Simulator,
} = require('./test_harness_utils.cjs');

const runner = new TestRunner('Tier 3: Cross-Feature Interactions');

// -----------------------------------------------------------------------------
// Interaction 1: App Shell Page 0 -> Storefront -> Return to Page 0
// -----------------------------------------------------------------------------
runner.describe('Interaction 1: Page 0 / Storefront Navigation Lifecycle', () => {
  runner.test('I1.1 Full navigation roundtrip between Slide 0 and Storefront retains cart state', () => {
    const nav = new Slide0Simulator({ initialPage: 0, initialModal: true });
    const store = new StoreContextSimulator();

    // 1. Start on Slide 0
    assertEqual(nav.currentPage, 0);

    // 2. User presses Enter to explore collection
    nav.handleKeyDown('Enter');
    assertEqual(nav.currentPage, 1);

    // 3. User adds an item to cart in Storefront
    const product = { id: 'vg-coat-01', name: 'Cashmere Coat', price: 18500000 };
    store.addToCart(product, 'Camel', 'M', 1);
    assertEqual(store.cartTotalCount, 1);

    // 4. User clicks copyright insignia in header to review Slide 0
    nav.returnToSlide0();
    assertEqual(nav.currentPage, 0);

    // 5. Cart data is preserved in memory/storage
    assertEqual(store.cartTotalCount, 1);
    assertEqual(store.cart[0].product.name, 'Cashmere Coat');

    // 6. User re-enters Storefront
    nav.onNextPage();
    assertEqual(nav.currentPage, 1);
    assertEqual(store.cartTotalCount, 1);
  });
});

// -----------------------------------------------------------------------------
// Interaction 2: Category Filter -> Quick View Pipeline
// -----------------------------------------------------------------------------
runner.describe('Interaction 2: Category Filter to Quick View Pipeline', () => {
  runner.test('I2.1 Category selection filters products and opens matching Quick View', () => {
    const store = new StoreContextSimulator();

    const allProducts = [
      { id: 'p1', name: 'Măng tô Cashmere', category: 'ao-khoac', price: 18500000 },
      { id: 'p2', name: 'Đầm Lụa Hà Đông', category: 'vay-dam', price: 8600000 },
      { id: 'p3', name: 'Sơ mi Lụa', category: 'so-mi-lua', price: 5400000 },
    ];

    // Filter by 'vay-dam'
    const filtered = allProducts.filter((p) => p.category === 'vay-dam');
    assertEqual(filtered.length, 1);
    assertEqual(filtered[0].id, 'p2');

    // Open Quick View on the filtered product
    store.openQuickView(filtered[0]);
    assertEqual(store.quickViewProduct.id, 'p2');
    assertEqual(store.quickViewProduct.name, 'Đầm Lụa Hà Đông');
  });
});

// -----------------------------------------------------------------------------
// Interaction 3: Quick View -> Customization -> Cart Drawer Pipeline
// -----------------------------------------------------------------------------
runner.describe('Interaction 3: Quick View to Cart Drawer Pipeline', () => {
  runner.test('I3.1 Customizing color and size in Quick View adds item and triggers Cart Drawer', () => {
    const store = new StoreContextSimulator();
    const product = {
      id: 'vg-shirt-01',
      name: 'Sơ mi Lụa Tơ Tằm Cổ Điển',
      price: 5400000,
    };

    // User opens Quick View
    store.openQuickView(product);
    assertEqual(store.quickViewProduct.id, 'vg-shirt-01');

    // User selects custom options
    const selectedColor = 'Trắng Ngọc Trai';
    const selectedSize = 'L';

    // User clicks "Thêm vào giỏ"
    store.addToCart(product, selectedColor, selectedSize, 1);
    store.closeQuickView();
    store.openCart();

    // Verify modal transitions & cart content
    assertEqual(store.quickViewProduct, null);
    assertEqual(store.isCartOpen, true);
    assertEqual(store.cart.length, 1);
    assertEqual(store.cart[0].selectedColor, 'Trắng Ngọc Trai');
    assertEqual(store.cart[0].selectedSize, 'L');
    assertEqual(store.cartSubtotal, 5400000);
  });
});

// -----------------------------------------------------------------------------
// Interaction 4: Instant "Mua Ngay" vs General Cart Isolation
// -----------------------------------------------------------------------------
runner.describe('Interaction 4: "Mua Ngay" Isolation vs Cart Checkout', () => {
  runner.test('I4.1 "Mua ngay" single item checkout does NOT wipe existing general cart items', () => {
    const store = new StoreContextSimulator();

    // 1. General cart already has 2 items
    const cartProduct1 = { id: 'p1', name: 'Trousers', price: 6500000 };
    const cartProduct2 = { id: 'p2', name: 'Scarf', price: 3200000 };
    store.addToCart(cartProduct1, 'Black', 'M', 1);
    store.addToCart(cartProduct2, 'Mono', 'FreeSize', 1);
    assertEqual(store.cart.length, 2);
    assertEqual(store.cartSubtotal, 9700000);

    // 2. User sees an exclusive coat and clicks "Mua ngay" (Instant Order)
    const instantProduct = { id: 'p3', name: 'Cashmere Coat', price: 18500000 };
    const instantItem = {
      id: 'p3-Camel-L',
      product: instantProduct,
      selectedColor: 'Camel',
      selectedSize: 'L',
      quantity: 1,
    };
    store.openQuickOrder(instantItem);

    assertEqual(store.isQuickOrderOpen, true);
    assertEqual(store.quickOrderItem.id, 'p3-Camel-L');

    // 3. Complete the single-item checkout
    const result = store.submitOrder({
      customerName: 'Hoàng Nam',
      phoneNumber: '0901234567',
      address: 'Quận 1, TP. HCM',
      paymentMethod: 'cod',
    });
    assertEqual(result.success, true);
    assertEqual(store.completedOrder.items.length, 1);
    assertEqual(store.completedOrder.items[0].product.name, 'Cashmere Coat');

    // 4. CRITICAL INVARIANT: The general cart still contains the 2 items!
    assertEqual(store.cart.length, 2, 'General cart must NOT be wiped by single item buy-now');
    assertEqual(store.cartSubtotal, 9700000);
  });

  runner.test('I4.2 Full cart checkout DOES clear general cart after completion', () => {
    const store = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Trousers', price: 6500000 };
    store.addToCart(p1, 'Black', 'M', 1);
    assertEqual(store.cart.length, 1);

    // Open checkout for entire cart (quickOrderItem = null)
    store.openQuickOrder(null);
    assertEqual(store.quickOrderItem, null);

    store.submitOrder({
      customerName: 'Hoàng Nam',
      phoneNumber: '0901234567',
      address: 'Quận 1, TP. HCM',
      paymentMethod: 'vietqr',
    });

    assertEqual(store.cart.length, 0, 'General cart must be cleared after full cart checkout');
    assertEqual(store.cartSubtotal, 0);
  });
});

// -----------------------------------------------------------------------------
// Interaction 5: Modal Exclusivity Rule
// -----------------------------------------------------------------------------
runner.describe('Interaction 5: Modal Exclusivity Invariant', () => {
  runner.test('I5.1 Opening one modal automatically dismisses any other open modal', () => {
    const store = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Coat', price: 18500000 };

    // Open Quick View
    store.openQuickView(p1);
    assertEqual(store.quickViewProduct !== null, true);
    assertEqual(store.isCartOpen, false);

    // Open Cart -> Quick View must close
    store.openCart();
    assertEqual(store.isCartOpen, true);
    assertEqual(store.quickViewProduct, null);

    // Open Quick Order -> Cart must close
    store.openQuickOrder();
    assertEqual(store.isQuickOrderOpen, true);
    assertEqual(store.isCartOpen, false);
  });
});

// -----------------------------------------------------------------------------
// Interaction 6: Order Lifecycle & Receipt Reset
// -----------------------------------------------------------------------------
runner.describe('Interaction 6: Order Lifecycle & Receipt Reset', () => {
  runner.test('I6.1 Order confirmation modal displays receipt and resets cleanly', () => {
    const store = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Shirt', price: 5400000 };
    store.addToCart(p1, 'Trắng', 'M', 1);

    store.submitOrder({
      customerName: 'Thùy Linh',
      phoneNumber: '0876637806',
      address: 'Hà Nội',
      paymentMethod: 'cod',
    });

    assertEqual(store.completedOrder !== null, true);
    assertMatch(store.completedOrder.orderId, /^VG-2026-\d{4}$/);

    // Customer closes confirmation modal
    store.closeOrderSuccess();
    assertEqual(store.completedOrder, null, 'Completed order modal must reset to null');
  });
});

// -----------------------------------------------------------------------------
// Interaction 7: Gift Wrap Toggle Calculation
// -----------------------------------------------------------------------------
runner.describe('Interaction 7: Gift Wrap Toggle Dynamic Calculations', () => {
  runner.test('I7.1 Toggling luxury gift box dynamically adds and removes 150.000₫', () => {
    const store = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Scarf', price: 3200000 };
    store.addToCart(p1, 'Mono', 'FreeSize', 1);

    // Order with gift wrap
    store.submitOrder({
      customerName: 'Khách',
      phoneNumber: '0901234567',
      address: 'Hà Nội',
      paymentMethod: 'cod',
      giftWrap: true,
    });
    assertEqual(store.completedOrder.totalAmount, 3200000 + 150000);

    // Second order without gift wrap
    store.addToCart(p1, 'Mono', 'FreeSize', 1);
    store.submitOrder({
      customerName: 'Khách',
      phoneNumber: '0901234567',
      address: 'Hà Nội',
      paymentMethod: 'cod',
      giftWrap: false,
    });
    assertEqual(store.completedOrder.totalAmount, 3200000);
  });
});

// -----------------------------------------------------------------------------
// Interaction 8: Sequential Orders Generates Unique IDs
// -----------------------------------------------------------------------------
runner.describe('Interaction 8: Sequential Orders Idempotency', () => {
  runner.test('I8.1 Successive orders generate distinct order identifiers', () => {
    const store = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Item', price: 1000000 };

    store.addToCart(p1, 'A', 'M', 1);
    const o1 = store.submitOrder({
      customerName: 'User 1',
      phoneNumber: '0901234567',
      address: 'Address 1',
      paymentMethod: 'cod',
    });

    store.addToCart(p1, 'B', 'L', 1);
    const o2 = store.submitOrder({
      customerName: 'User 2',
      phoneNumber: '0908765432',
      address: 'Address 2',
      paymentMethod: 'vietqr',
    });

    assert(o1.orderId !== o2.orderId, 'Order IDs must be distinct');
  });
});

// -----------------------------------------------------------------------------
// Interaction 9: Multi-Quantity Cart Drawer Sync with Quick Order
// -----------------------------------------------------------------------------
runner.describe('Interaction 9: Multi-Quantity Cart Drawer Sync with Quick Order', () => {
  runner.test('I9.1 Modifying quantities inside Cart Drawer synchronizes immediately with Quick Order summary', () => {
    const store = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Măng tô Cashmere', price: 18500000 };
    store.addToCart(p1, 'Camel', 'M', 1);

    // Increment quantity in cart drawer
    store.updateQuantity('p1-Camel-M', 1);
    assertEqual(store.cart[0].quantity, 2);
    assertEqual(store.cartSubtotal, 37000000);

    // Open quick order for full cart
    store.openQuickOrder(null);
    const orderResult = store.submitOrder({
      customerName: 'Phương Thảo',
      phoneNumber: '0901234567',
      address: 'Hà Nội',
      paymentMethod: 'cod',
    });

    assertEqual(orderResult.success, true);
    assertEqual(store.completedOrder.subtotal, 37000000);
    assertEqual(store.completedOrder.items[0].quantity, 2);
  });
});

// -----------------------------------------------------------------------------
// Interaction 10: Repeat Customer Shopping Workflow
// -----------------------------------------------------------------------------
runner.describe('Interaction 10: Repeat Customer Shopping Workflow', () => {
  runner.test('I10.1 Completing first order clears cart and allows clean second customer transaction', () => {
    const store = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Scarf', price: 3200000 };
    const p2 = { id: 'p2', name: 'Shirt', price: 5400000 };

    // Order 1
    store.addToCart(p1, 'Mono', 'FreeSize', 1);
    store.submitOrder({
      customerName: 'Customer 1',
      phoneNumber: '0901234567',
      address: 'Hà Nội',
      paymentMethod: 'cod',
    });
    store.closeOrderSuccess();

    // Verify cart is clean
    assertEqual(store.cart.length, 0);

    // Order 2
    store.addToCart(p2, 'Trắng', 'M', 1);
    const order2 = store.submitOrder({
      customerName: 'Customer 2',
      phoneNumber: '0908765432',
      address: 'Sài Gòn',
      paymentMethod: 'vietqr',
    });

    assertEqual(order2.success, true);
    assertEqual(store.completedOrder.items[0].product.name, 'Shirt');
    assertEqual(store.completedOrder.subtotal, 5400000);
  });
});

const summary = runner.summary();
module.exports = summary;
