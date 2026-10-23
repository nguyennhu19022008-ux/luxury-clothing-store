/**
 * Tier 4: Real-World Scenarios Test Suite
 * Comprehensive End-to-End Persona Customer Journeys (3 full multi-step journeys)
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
  formatVND,
} = require('./test_harness_utils.cjs');

const runner = new TestRunner('Tier 4: Real-World Scenarios');

// -----------------------------------------------------------------------------
// Scenario A: The First-Time Luxury Connoisseur (Cashmere & COD)
// -----------------------------------------------------------------------------
runner.describe('Scenario A: The First-Time Luxury Connoisseur (Thùy Linh - Hà Nội)', () => {
  runner.test('A.1 Complete Journey: Direct Storefront entry & Copyright Modal -> Cashmere Coat -> Quick View -> Buy Now -> COD Order', () => {
    // 1. Initial Landing on Storefront with Copyright Modal available
    const nav = new Slide0Simulator();
    const store = new StoreContextSimulator();

    assertEqual(nav.currentPage, 1, 'Step 1: Direct Storefront startup');
    // User opens Copyright Modal via VG © 2026 trigger
    nav.openCopyrightModal();
    assertEqual(nav.isCopyrightModalOpen, true, 'Copyright Modal opens on demand');
    assertEqual(nav.isCardOpen, true, 'Frosted card is visible initially');

    // 2. User checks author contact email and copies it
    const email = nav.copyEmail();
    assertEqual(email, 'nguyennhu19022008@gmail.com', 'Step 2: Email copy verified');

    // 3. User closes modal / returns to storefront
    nav.closeCopyrightModal();
    assertEqual(nav.isCopyrightModalOpen, false, 'Step 3: Modal closed, browsing storefront');
    assertEqual(nav.currentPage, 1, 'Storefront active');

    // 4. User browses lookbook and finds Cashmere Coat
    const cashmereCoat = {
      id: 'vg-coat-01',
      sku: 'AT-CSH-001',
      name: 'Măng tô Cashmere May đo Thượng hạng',
      category: 'ao-khoac',
      price: 18500000,
    };

    // 5. User opens Quick View modal
    store.openQuickView(cashmereCoat);
    assertEqual(store.quickViewProduct.id, 'vg-coat-01', 'Step 4: Quick View opened for Cashmere Coat');

    // 6. User chooses size "M" and color "Be Lạc Đà Thượng Hạng"
    const selectedColor = 'Be Lạc Đà Thượng Hạng';
    const selectedSize = 'M';

    // 7. User clicks "Mua ngay" (Instant single item checkout)
    const singleItem = {
      id: `${cashmereCoat.id}-${selectedColor}-${selectedSize}`,
      product: cashmereCoat,
      selectedColor,
      selectedSize,
      quantity: 1,
    };
    store.openQuickOrder(singleItem);

    assertEqual(store.isQuickOrderOpen, true, 'Step 5: Quick Order opened');
    assertEqual(store.quickViewProduct, null, 'Quick View closed for modal exclusivity');
    assertEqual(store.quickOrderItem.id, 'vg-coat-01-Be Lạc Đà Thượng Hạng-M');

    // 8. User fills in shipping info and selects COD
    const orderResult = store.submitOrder({
      customerName: 'Nguyễn Thùy Linh',
      phoneNumber: '0908123456',
      address: 'Số 15 Phố Tràng Tiền, Quận Hoàn Kiếm, Hà Nội',
      note: 'Giao giờ hành chính, mang đủ size để thử tại gia',
      paymentMethod: 'cod',
      giftWrap: false,
    });

    // 9. Verification of Royal Order Confirmation
    assertEqual(orderResult.success, true, 'Step 6: Order placed successfully');
    assertMatch(orderResult.orderId, /^VG-2026-\d{4}$/, 'Order ID generated with format VG-2026-XXXX');

    const order = store.completedOrder;
    assertEqual(order.items.length, 1);
    assertEqual(order.items[0].product.name, 'Măng tô Cashmere May đo Thượng hạng');
    assertEqual(order.subtotal, 18500000);
    assertEqual(order.discount, 0);
    assertEqual(order.shipping, 0, 'Complimentary shipping');
    assertEqual(order.totalAmount, 18500000);
    assertEqual(order.orderDetails.paymentMethod, 'cod');
    assertEqual(order.orderDetails.customerName, 'Nguyễn Thùy Linh');

    // 10. Customer acknowledges receipt and dismisses confirmation
    store.closeOrderSuccess();
    assertEqual(store.completedOrder, null, 'Step 7: Order confirmation closed cleanly');
  });
});

// -----------------------------------------------------------------------------
// Scenario B: The VIP Bespoke Patron (Discount & VietQR)
// -----------------------------------------------------------------------------
runner.describe('Scenario B: The VIP Bespoke Patron (Hoàng Nam - TP. Hồ Chí Minh)', () => {
  runner.test('B.1 Complete Journey: Slide 0 card dismiss -> Multi-item Cart -> Coupon VUONGGIA -> VietQR Order', () => {
    // 1. Initial Landing on Storefront with Copyright inspection
    const nav = new Slide0Simulator();
    const store = new StoreContextSimulator();

    nav.openCopyrightModal();
    // 2. User clicks [X] to dismiss card and admire typography
    nav.dismissCard();
    assertEqual(nav.isCardOpen, false, 'Step 1: Frosted card dismissed');

    // 3. User clicks floating bottom button [VÀO BỘ SƯU TẬP (TRANG 01)]
    nav.onNextPage();
    assertEqual(nav.currentPage, 1, 'Step 2: Navigated to Storefront');
    assertEqual(nav.isCopyrightModalOpen, false, 'Modal closed');

    // 4. User adds Silk Shirt to cart
    const silkShirt = {
      id: 'vg-shirt-01',
      name: 'Sơ mi Lụa Tơ Tằm Cổ Điển Khuy Xà Cừ',
      category: 'so-mi-lua',
      price: 5400000,
    };
    store.addToCart(silkShirt, 'Trắng Ngọc Trai', 'L', 1);

    // 5. User adds Tailored Trousers to cart
    const tailoredPants = {
      id: 'vg-pants-01',
      name: 'Quần Tây Len Xếp Ly May Đo Cao Cấp',
      category: 'quan-tay',
      price: 6500000,
    };
    store.addToCart(tailoredPants, 'Đen Midnight', 'L', 1);

    // 6. User opens Cart Drawer
    store.openCart();
    assertEqual(store.isCartOpen, true, 'Step 3: Cart Drawer opened');
    assertEqual(store.cartTotalCount, 2, '2 items in cart');
    const initialSubtotal = 5400000 + 6500000; // 11.900.000₫
    assertEqual(store.cartSubtotal, initialSubtotal);

    // 7. User proceeds to Quick Order from Cart Drawer
    store.openQuickOrder(null);
    assertEqual(store.isQuickOrderOpen, true, 'Step 4: Quick Order opened for entire cart');
    assertEqual(store.quickOrderItem, null, 'Cart checkout mode active');

    // 8. User enters details, discount code VUONGGIA, and selects VietQR
    const orderResult = store.submitOrder({
      customerName: 'Trần Hoàng Nam',
      phoneNumber: '0876637806',
      address: 'Căn hộ Penthouse Landmark 81, Quận Bình Thạnh, TP. Hồ Chí Minh',
      discountCode: 'VUONGGIA',
      paymentMethod: 'vietqr',
      giftWrap: false,
    });

    assertEqual(orderResult.success, true, 'Step 5: Order placed successfully');
    const order = store.completedOrder;
    assertEqual(order.items.length, 2);
    assertEqual(order.subtotal, 11900000);
    const expectedDiscount = Math.round(11900000 * 0.1); // 1.190.000₫
    assertEqual(order.discount, expectedDiscount, 'Step 6: 10% VUONGGIA discount verified');
    assertEqual(order.totalAmount, 11900000 - expectedDiscount); // 10.710.000₫
    assertEqual(order.orderDetails.paymentMethod, 'vietqr');

    // 9. Cart must be completely empty after full order
    assertEqual(store.cart.length, 0, 'Step 7: Cart cleared after full order completion');
    assertEqual(store.cartSubtotal, 0);
  });
});

// -----------------------------------------------------------------------------
// Scenario C: The Curated Luxury Gift Buyer (Velvet Gift Box & Visa Card)
// -----------------------------------------------------------------------------
runner.describe('Scenario C: The Curated Luxury Gift Buyer (Minh Châu - Đà Nẵng)', () => {
  runner.test('C.1 Complete Journey: Direct Storefront -> Scarf Accessory (Qty 2) -> Velvet Gift Box -> Visa Payment', () => {
    // 1. Direct Storefront Navigation
    const nav = new Slide0Simulator();
    const store = new StoreContextSimulator();

    assertEqual(nav.currentPage, 1, 'Step 1: Direct Storefront ready immediately');

    // 2. Selects Silk Scarf
    const silkScarf = {
      id: 'vg-acc-01',
      name: 'Khăn Lụa Vuông In Họa Tiết Chìm Độc Bản',
      category: 'phu-kien',
      price: 3200000,
    };

    // 3. Adds 2 scarves for gifting
    store.addToCart(silkScarf, 'Đen & Ngà Voi Đơn Sắc', 'FreeSize', 2);
    assertEqual(store.cartTotalCount, 2);
    assertEqual(store.cartSubtotal, 6400000);

    // 4. Opens checkout with Luxury Velvet Gift Box (+150.000₫)
    store.openQuickOrder(null);
    const orderResult = store.submitOrder({
      customerName: 'Lê Minh Châu',
      phoneNumber: '0901234567',
      address: 'Số 45 Đường Bạch Đằng, Quận Hải Châu, TP. Đà Nẵng',
      note: 'Gói hộp nhung thắt ruy băng đen ngà cẩn thận',
      paymentMethod: 'card',
      giftWrap: true,
    });

    // 5. Verification of Order Details
    assertEqual(orderResult.success, true);
    const order = store.completedOrder;
    assertEqual(order.subtotal, 6400000);
    assertEqual(order.giftWrap, 150000, 'Step 2: 150.000₫ luxury gift box applied');
    assertEqual(order.totalAmount, 6400000 + 150000, 'Step 3: Total matches subtotal + gift box');
    assertEqual(order.orderDetails.paymentMethod, 'card');
    assertMatch(order.orderId, /^VG-2026-\d{4}$/);
  });
});

const summary = runner.summary();
module.exports = summary;
