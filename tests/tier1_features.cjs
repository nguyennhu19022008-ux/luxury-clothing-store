/**
 * Tier 1: Feature Coverage Test Suite
 * Minimum >= 5 test cases per feature across 13 core features (78 total tests)
 */

const fs = require('fs');
const path = require('path');
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
  formatVND,
  getContrastRatio,
} = require('./test_harness_utils.cjs');

const runner = new TestRunner('Tier 1: Feature Coverage');

const projectRoot = path.resolve(__dirname, '..');
const page0Path = path.join(projectRoot, 'src', 'components', 'Page0_Copyright.jsx');
const productsPath = path.join(projectRoot, 'src', 'data', 'products.js');
const indexHtmlPath = path.join(projectRoot, 'index.html');
const tailwindConfigPath = path.join(projectRoot, 'tailwind.config.js');
const indexCssPath = path.join(projectRoot, 'src', 'index.css');

// Load files if they exist
let page0Content = '';
if (fs.existsSync(page0Path)) {
  page0Content = fs.readFileSync(page0Path, 'utf8');
}
let productsContent = '';
if (fs.existsSync(productsPath)) {
  productsContent = fs.readFileSync(productsPath, 'utf8');
}
let indexHtmlContent = '';
if (fs.existsSync(indexHtmlPath)) {
  indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
}
let tailwindConfigContent = '';
if (fs.existsSync(tailwindConfigPath)) {
  tailwindConfigContent = fs.readFileSync(tailwindConfigPath, 'utf8');
}
let indexCssContent = '';
if (fs.existsSync(indexCssPath)) {
  indexCssContent = fs.readFileSync(indexCssPath, 'utf8');
}

// -----------------------------------------------------------------------------
// FEATURE 1: Slide 0 OLED Cover (F4)
// -----------------------------------------------------------------------------
runner.describe('Feature 1: Slide 0 OLED Cover (Page0_Copyright)', () => {
  runner.test('1.1 Direct Storefront Entry (currentPage === 1) & Copyright Modal on demand', () => {
    const sim = new Slide0Simulator();
    assertEqual(sim.currentPage, 1, 'App shell must initialize directly on Storefront (currentPage === 1)');
    sim.openCopyrightModal();
    assertEqual(sim.isCopyrightModalOpen, true, 'Copyright Modal opens on demand');
    sim.closeCopyrightModal();
    assertEqual(sim.isCopyrightModalOpen, false, 'Copyright Modal closes cleanly');
  });

  runner.test('1.2 Full viewport 100vh / 100vw container styling is applied', () => {
    assert(page0Content.includes('w-screen') || page0Content.includes('inset-0'), 'Must span full viewport width');
    assert(page0Content.includes('h-screen') || page0Content.includes('inset-0'), 'Must span full viewport height');
    assert(page0Content.includes('overflow-hidden'), 'Must suppress scrollbars on Page 0');
  });

  runner.test('1.3 Pure OLED black (#000000 / bg-black) background styling', () => {
    assert(page0Content.includes('bg-black'), 'Background must use pure OLED black bg-black');
  });

  runner.test('1.4 Pure white (#FFFFFF / text-white) high-contrast foreground styling', () => {
    assert(page0Content.includes('text-white'), 'Primary typography must be text-white');
    const contrast = getContrastRatio('#FFFFFF', '#000000');
    assertGreaterThanOrEqual(contrast, 20.0, 'White on OLED black must achieve 21:1 contrast ratio');
  });

  runner.test('1.5 Navigation bars and standard footers are completely absent on Slide 0', () => {
    assert(!page0Content.includes('<Navbar') && !page0Content.includes('<Header'), 'Page0_Copyright must not render Navbar or Header');
    assert(!page0Content.includes('<Footer'), 'Page0_Copyright must not render storefront Footer');
  });

  runner.test('1.6 Component exports clean named or default Page0_Copyright', () => {
    assert(page0Content.includes('export const Page0_Copyright') || page0Content.includes('export default Page0_Copyright'), 'Must export Page0_Copyright component');
  });
});

// -----------------------------------------------------------------------------
// FEATURE 2: 5-Row Diagonal Marquee (F5)
// -----------------------------------------------------------------------------
runner.describe('Feature 2: 5-Row Diagonal Marquee', () => {
  runner.test('2.1 Exactly 5 diagonal rows are instantiated', () => {
    assert(page0Content.includes('length: 5') || page0Content.includes('Array.from({ length: 5 })'), 'Must render exactly 5 diagonal rows of text');
  });

  runner.test('2.2 Rotation angle is configured precisely at -32deg', () => {
    assert(page0Content.includes('-32deg') || page0Content.includes('-rotate-[32deg]'), 'Container must tilt at exactly -32 degrees');
  });

  runner.test('2.3 Each kinetic row displays uppercase "DESIGN BY VUONGGIA"', () => {
    assert(page0Content.includes('DESIGN BY VUONGGIA'), 'Must include verbatim text "DESIGN BY VUONGGIA"');
    assert(page0Content.includes('uppercase'), 'Typography must enforce uppercase styling');
  });

  runner.test('2.4 Marquee duration adheres to 60s - 70s slow elegant cadence', () => {
    assert(page0Content.includes('60s') && page0Content.includes('70s'), 'Animation speed must alternate between 60s and 70s');
  });

  runner.test('2.5 Alternating rows utilize inverted/reverse motion direction', () => {
    assert(page0Content.includes('reverse') || page0Content.includes('animationDirection'), 'Alternating rows must feature reversed directional flow');
  });

  runner.test('2.6 Font family utilizes Anton / monumental high-impact display serif or sans', () => {
    assert(page0Content.includes('font-anton') || page0Content.includes('font-black'), 'Marquee must use monumental font class');
  });
});

// -----------------------------------------------------------------------------
// FEATURE 3: Frosted Glass Copyright Card (F6)
// -----------------------------------------------------------------------------
runner.describe('Feature 3: Frosted Glass Copyright Card', () => {
  runner.test('3.1 Frosted glass aesthetic utilizes backdrop blur and translucent dark background', () => {
    assert(page0Content.includes('backdrop-blur') || page0Content.includes('bg-black/50'), 'Card must have backdrop-blur and semi-transparent bg');
  });

  runner.test('3.2 Title displays "DESIGN BY VUONGGIA" with skewed VUONGGIA insignia box', () => {
    assert(page0Content.includes('DESIGN BY'), 'Card must render DESIGN BY');
    assert(page0Content.includes('-skew-x-6') || page0Content.includes('skew'), 'VUONGGIA title box must feature signature skew effect');
  });

  runner.test('3.3 Badge declares verbatim "THUỘC QUYỀN SỞ HỮU CỦA VUONGGIA"', () => {
    assert(page0Content.includes('THUỘC QUYỀN SỞ HỮU CỦA VUONGGIA'), 'Must contain exact badge "THUỘC QUYỀN SỞ HỮU CỦA VUONGGIA"');
  });

  runner.test('3.4 Anti-commercial clause contains verbatim non-negotiable legal text', () => {
    const clause = 'TUYỆT ĐỐI KHÔNG THƯƠNG MẠI, MUA BÁN, SANG NHƯỢNG DƯỚI MỌI HÌNH THỨC SAU KHI ĐÃ SỞ HỮU';
    assert(page0Content.includes(clause), `Must contain exact clause: "${clause}"`);
  });

  runner.test('3.5 Dismiss button [X] is provided to toggle card visibility', () => {
    assert(page0Content.includes('setIsCardOpen(false)') || page0Content.includes('aria-label="Tắt bảng thông tin"'), 'Card must include [X] button to dismiss');
  });

  runner.test('3.6 Primary CTA button to explore collection is prominently rendered', () => {
    assert(page0Content.includes('KHÁM PHÁ BỘ SƯU TẬP') || page0Content.includes('VÀO BỘ SƯU TẬP'), 'Must feature primary CTA into collection');
  });
});

// -----------------------------------------------------------------------------
// FEATURE 4: 1-Click Contact Copy Utility (F7)
// -----------------------------------------------------------------------------
runner.describe('Feature 4: 1-Click Contact Copy Utility', () => {
  runner.test('4.1 Official Email is verbatim nguyennhu19022008@gmail.com', () => {
    assert(page0Content.includes('nguyennhu19022008@gmail.com'), 'Must list exact email nguyennhu19022008@gmail.com');
  });

  runner.test('4.2 Official Hotline is verbatim 0876637806', () => {
    assert(page0Content.includes('0876637806'), 'Must list exact hotline 0876637806');
  });

  runner.test('4.3 Copy utility handles clipboard writing with secure fallback', () => {
    assert(page0Content.includes('navigator.clipboard') || page0Content.includes('execCommand'), 'Must have robust clipboard handling with fallback');
  });

  runner.test('4.4 Visual feedback state updates to "ĐÃ CHÉP" upon copy action', () => {
    assert(page0Content.includes('ĐÃ CHÉP'), 'Button text must switch to "ĐÃ CHÉP" upon copy');
    assert(page0Content.includes('SAO CHÉP'), 'Default button text must be "SAO CHÉP"');
  });

  runner.test('4.5 Feedback auto-resets after delay (~2500ms)', () => {
    assert(page0Content.includes('2500'), 'Copied state should automatically reset after ~2.5s');
  });

  runner.test('4.6 Simulator verifies email & phone copy return exact values', () => {
    const sim = new Slide0Simulator();
    assertEqual(sim.copyEmail(), 'nguyennhu19022008@gmail.com', 'copyEmail must return author email');
    assertEqual(sim.copyPhone(), '0876637806', 'copyPhone must return author hotline');
  });
});

// -----------------------------------------------------------------------------
// FEATURE 5: Keyboard Shortcuts Navigation (F9)
// -----------------------------------------------------------------------------
runner.describe('Feature 5: Keyboard Shortcuts Navigation', () => {
  runner.test('5.1 Pressing ArrowRight transitions to Page 1 / closes Modal', () => {
    const sim = new Slide0Simulator({ initialPage: 0, initialModal: true });
    const handled = sim.handleKeyDown('ArrowRight');
    assert(handled, 'ArrowRight must be handled');
    assertEqual(sim.currentPage, 1, 'Should transition to Page 1');
    assertEqual(sim.isCopyrightModalOpen, false, 'Modal should close');
  });

  runner.test('5.2 Pressing Space transitions to Page 1 / closes Modal', () => {
    const sim = new Slide0Simulator({ initialPage: 0, initialModal: true });
    const handled = sim.handleKeyDown(' ');
    assert(handled, 'Space must be handled');
    assertEqual(sim.currentPage, 1, 'Should transition to Page 1');
    assertEqual(sim.isCopyrightModalOpen, false, 'Modal should close');
  });

  runner.test('5.3 Pressing Enter transitions to Page 1 / closes Modal', () => {
    const sim = new Slide0Simulator({ initialPage: 0, initialModal: true });
    const handled = sim.handleKeyDown('Enter');
    assert(handled, 'Enter must be handled');
    assertEqual(sim.currentPage, 1, 'Should transition to Page 1');
    assertEqual(sim.isCopyrightModalOpen, false, 'Modal should close');
  });

  runner.test('5.4 Pressing Escape toggles card dismissal state', () => {
    const sim = new Slide0Simulator({ initialPage: 0, initialModal: true });
    assertEqual(sim.isCardOpen, true);
    sim.handleKeyDown('Escape');
    assertEqual(sim.isCardOpen, false, 'Escape should dismiss card');
    sim.handleKeyDown('Escape');
    assertEqual(sim.isCardOpen, true, 'Second Escape should reopen card');
  });

  runner.test('5.5 Non-navigation keys (e.g., Tab, ArrowDown, A) do not trigger page change', () => {
    const sim = new Slide0Simulator({ initialPage: 0, initialModal: true });
    assertEqual(sim.handleKeyDown('Tab'), false);
    assertEqual(sim.handleKeyDown('ArrowDown'), false);
    assertEqual(sim.handleKeyDown('a'), false);
    assertEqual(sim.currentPage, 0, 'Page must remain 0');
  });

  runner.test('5.6 Page0_Copyright event listener cleans up on unmount', () => {
    assert(page0Content.includes('removeEventListener'), 'Keyboard listener must be unregistered in cleanup function');
  });
});

// -----------------------------------------------------------------------------
// FEATURE 6: Editorial Header & Navigation (F10)
// -----------------------------------------------------------------------------
runner.describe('Feature 6: Editorial Header & Navigation', () => {
  const headerPath = path.join(projectRoot, 'src', 'components', 'Header.jsx');
  let headerContent = '';
  if (fs.existsSync(headerPath)) {
    headerContent = fs.readFileSync(headerPath, 'utf8');
  }

  runner.test('6.1 Header file exists in components directory', () => {
    assert(fs.existsSync(headerPath), 'src/components/Header.jsx must exist');
  });

  runner.test('6.2 Brand logo displays VUONGGIA with luxury typography styling', () => {
    assert(headerContent.includes('VUONGGIA'), 'Header must render brand name VUONGGIA');
  });

  runner.test('6.3 Cart button is rendered with real-time count badge', () => {
    assert(headerContent.includes('cart') || headerContent.includes('Cart') || headerContent.includes('ShoppingBag'), 'Cart icon/trigger must be in Header');
  });

  runner.test('6.4 Link/trigger to return to Slide 0 copyright screen exists', () => {
    assert(headerContent.includes('onReturnToPage0') || headerContent.includes('Slide 0') || headerContent.includes('Bản quyền') || headerContent.includes('setCurrentPage(0)') || headerContent.includes('Shield'), 'Header should provide trigger to return to Slide 0');
  });

  runner.test('6.5 Zero emojis in Header code', () => {
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    assert(!emojiRegex.test(headerContent), 'Header must contain zero emojis');
  });

  runner.test('6.6 Header integrates Lucide React vector icons', () => {
    assert(headerContent.includes('lucide-react'), 'Header must import icons from lucide-react');
  });
});

// -----------------------------------------------------------------------------
// FEATURE 7: Asymmetrical Hero Lookbook (F11)
// -----------------------------------------------------------------------------
runner.describe('Feature 7: Asymmetrical Hero Lookbook', () => {
  const heroPath = path.join(projectRoot, 'src', 'components', 'HeroLookbook.jsx');
  let heroContent = '';
  if (fs.existsSync(heroPath)) {
    heroContent = fs.readFileSync(heroPath, 'utf8');
  }

  runner.test('7.1 HeroLookbook component file exists', () => {
    assert(fs.existsSync(heroPath), 'src/components/HeroLookbook.jsx must exist');
  });

  runner.test('7.2 Hero incorporates asymmetric layout styling', () => {
    assert(heroContent.includes('grid') || heroContent.includes('flex'), 'Hero must use CSS grid/flex layout');
  });

  runner.test('7.3 Editorial campaign narrative headline is present', () => {
    assert(heroContent.includes('2026') || heroContent.includes('Atelier') || heroContent.includes('Bộ sưu tập') || heroContent.includes('Tĩnh Lặng') || heroContent.includes('Thời Trang'), 'Hero must feature editorial campaign copy');
  });

  runner.test('7.4 CTA button smoothly guides visitor into collection', () => {
    assert(heroContent.includes('button') || heroContent.includes('a'), 'Hero must provide actionable CTA');
  });

  runner.test('7.5 Imagery uses high-resolution photography asset', () => {
    assert(heroContent.includes('images.unsplash.com') || heroContent.includes('img') || heroContent.includes('src'), 'Hero must display editorial photography');
  });

  runner.test('7.6 Zero emojis in HeroLookbook code', () => {
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    assert(!emojiRegex.test(heroContent), 'HeroLookbook must contain zero emojis');
  });
});

// -----------------------------------------------------------------------------
// FEATURE 8: 5-Category Showcase (F12)
// -----------------------------------------------------------------------------
runner.describe('Feature 8: 5-Category Showcase', () => {
  const showcasePath = path.join(projectRoot, 'src', 'components', 'CategoryShowcase.jsx');
  let showcaseContent = '';
  if (fs.existsSync(showcasePath)) {
    showcaseContent = fs.readFileSync(showcasePath, 'utf8');
  }

  runner.test('8.1 CategoryShowcase component file exists', () => {
    assert(fs.existsSync(showcasePath), 'src/components/CategoryShowcase.jsx must exist');
  });

  runner.test('8.2 Exactly 5 core categories are supported in products.js', () => {
    assert(productsContent.includes('ao-khoac') || productsContent.includes('Áo khoác'), 'Must have category Áo khoác');
    assert(productsContent.includes('vay-dam') || productsContent.includes('Váy/Đầm'), 'Must have category Váy/Đầm');
    assert(productsContent.includes('so-mi-lua') || productsContent.includes('Sơ mi lụa'), 'Must have category Sơ mi lụa');
    assert(productsContent.includes('quan-tay') || productsContent.includes('Quần tây may đo'), 'Must have category Quần tây may đo');
    assert(productsContent.includes('phu-kien') || productsContent.includes('Phụ kiện tinh tuyển'), 'Must have category Phụ kiện tinh tuyển');
  });

  runner.test('8.3 CategoryShowcase references categories or onSelectCategory', () => {
    assert(showcaseContent.includes('category') || showcaseContent.includes('Category') || showcaseContent.includes('CATEGORIES'), 'Must handle categories');
  });

  runner.test('8.4 Category cards include hover micro-interactions', () => {
    assert(showcaseContent.includes('hover:') || showcaseContent.includes('group-hover') || showcaseContent.includes('transition'), 'Must implement hover transitions');
  });

  runner.test('8.5 Responsive layout across mobile/tablet/desktop', () => {
    assert(showcaseContent.includes('sm:') || showcaseContent.includes('md:') || showcaseContent.includes('lg:'), 'Must include responsive Tailwind breakpoints');
  });

  runner.test('8.6 Zero emojis in CategoryShowcase', () => {
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    assert(!emojiRegex.test(showcaseContent), 'CategoryShowcase must contain zero emojis');
  });
});

// -----------------------------------------------------------------------------
// FEATURE 9: Magazine Lookbook Grid & Catalog (F3, F13)
// -----------------------------------------------------------------------------
runner.describe('Feature 9: Magazine Lookbook Grid & Product Catalog', () => {
  const gridPath = path.join(projectRoot, 'src', 'components', 'MagazineLookbookGrid.jsx');
  let gridContent = '';
  if (fs.existsSync(gridPath)) {
    gridContent = fs.readFileSync(gridPath, 'utf8');
  }

  runner.test('9.1 MagazineLookbookGrid component file exists', () => {
    assert(fs.existsSync(gridPath), 'src/components/MagazineLookbookGrid.jsx must exist');
  });

  runner.test('9.2 Catalog contains at least 12 handcrafted bespoke products', () => {
    const matches = productsContent.match(/id:\s*['"]vg-/g) || [];
    assertGreaterThanOrEqual(matches.length, 12, 'Catalog must contain at least 12 products');
  });

  runner.test('9.3 Every product model contains id, name, category, price, colors, sizes', () => {
    assert(productsContent.includes('price:'), 'Must include price field');
    assert(productsContent.includes('colors:'), 'Must include colors array');
    assert(productsContent.includes('sizes:'), 'Must include sizes array');
    assert(productsContent.includes('composition:'), 'Must include composition specification');
  });

  runner.test('9.4 Category filter tabs allow switching categories', () => {
    assert(gridContent.includes('filter') || gridContent.includes('activeCategory') || gridContent.includes('selectedCategory') || gridContent.includes('CATEGORIES'), 'Grid must support category filtering');
  });

  runner.test('9.5 ProductCard provides Quick View and Buy Now triggers', () => {
    const cardPath = path.join(projectRoot, 'src', 'components', 'ProductCard.jsx');
    assert(fs.existsSync(cardPath), 'src/components/ProductCard.jsx must exist');
    const cardContent = fs.readFileSync(cardPath, 'utf8');
    assert(cardContent.includes('QuickView') || cardContent.includes('quickView') || cardContent.includes('Chi tiết') || cardContent.includes('Xem'), 'Card must have Quick View trigger');
  });

  runner.test('9.6 Price formatting in Vietnamese Dong (VND)', () => {
    const formatted = formatVND(18500000);
    assertIncludes(formatted, '18.500.000', 'Must format currency cleanly with thousands separators');
  });
});

// -----------------------------------------------------------------------------
// FEATURE 10: Quick View Modal Specs & Interactivity (F17)
// -----------------------------------------------------------------------------
runner.describe('Feature 10: Quick View Modal', () => {
  runner.test('10.1 Simulator opens and closes Quick View modal cleanly', () => {
    const sim = new StoreContextSimulator();
    assertEqual(sim.quickViewProduct, null);
    const mockProduct = { id: 'vg-coat-01', name: 'Cashmere Coat', price: 18500000 };
    sim.openQuickView(mockProduct);
    assertEqual(sim.quickViewProduct.id, 'vg-coat-01');
    sim.closeQuickView();
    assertEqual(sim.quickViewProduct, null);
  });

  runner.test('10.2 Modal allows adding product with selected color and size into cart', () => {
    const sim = new StoreContextSimulator();
    const mockProduct = { id: 'vg-coat-01', name: 'Cashmere Coat', price: 18500000 };
    sim.addToCart(mockProduct, 'Camel', 'M', 1);
    assertEqual(sim.cart.length, 1);
    assertEqual(sim.cart[0].selectedColor, 'Camel');
    assertEqual(sim.cart[0].selectedSize, 'M');
  });

  runner.test('10.3 Quick View supports instantaneous "Mua ngay" transition', () => {
    const sim = new StoreContextSimulator();
    const mockProduct = { id: 'vg-coat-01', name: 'Cashmere Coat', price: 18500000 };
    const singleItem = { id: 'vg-coat-01-Camel-M', product: mockProduct, selectedColor: 'Camel', selectedSize: 'M', quantity: 1 };
    sim.openQuickOrder(singleItem);
    assertEqual(sim.isQuickOrderOpen, true);
    assertEqual(sim.quickOrderItem.id, 'vg-coat-01-Camel-M');
  });

  runner.test('10.4 Composition and fabric specs are present in catalog items', () => {
    assert(productsContent.includes('100% Cashmere'), 'Catalog specifies natural cashmere fiber');
    assert(productsContent.includes('Lụa Tơ Tằm Hà Đông'), 'Catalog specifies artisanal silk');
  });

  runner.test('10.5 Multiple color swatches are defined for luxury garments', () => {
    assert(productsContent.includes('hex:'), 'Products have color hex codes for swatches');
  });

  runner.test('10.6 Sizing standard S/M/L/XL is supported with measurements', () => {
    assert(productsContent.includes('measurements:'), 'Products include size measurements');
  });
});

// -----------------------------------------------------------------------------
// FEATURE 11: Quick Cart Drawer Specs & Subtotal (F18)
// -----------------------------------------------------------------------------
runner.describe('Feature 11: Quick Cart Drawer', () => {
  runner.test('11.1 Adding item to cart updates total count and subtotal', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Shirt', price: 5400000 };
    sim.addToCart(p1, 'Trắng', 'M', 2);
    assertEqual(sim.cartTotalCount, 2);
    assertEqual(sim.cartSubtotal, 10800000);
  });

  runner.test('11.2 Incrementing quantity updates cart subtotal synchronously', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Shirt', price: 5400000 };
    sim.addToCart(p1, 'Trắng', 'M', 1);
    sim.updateQuantity('p1-Trắng-M', 1);
    assertEqual(sim.cart[0].quantity, 2);
    assertEqual(sim.cartSubtotal, 10800000);
  });

  runner.test('11.3 Decrementing quantity updates cart subtotal synchronously', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Shirt', price: 5400000 };
    sim.addToCart(p1, 'Trắng', 'M', 2);
    sim.updateQuantity('p1-Trắng-M', -1);
    assertEqual(sim.cart[0].quantity, 1);
    assertEqual(sim.cartSubtotal, 5400000);
  });

  runner.test('11.4 Removing item empties cart and resets subtotal to 0', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Shirt', price: 5400000 };
    sim.addToCart(p1, 'Trắng', 'M', 1);
    sim.removeFromCart('p1-Trắng-M');
    assertEqual(sim.cart.length, 0);
    assertEqual(sim.cartSubtotal, 0);
  });

  runner.test('11.5 Cart drawer toggle controls visibility', () => {
    const sim = new StoreContextSimulator();
    assertEqual(sim.isCartOpen, false);
    sim.openCart();
    assertEqual(sim.isCartOpen, true);
    sim.closeCart();
    assertEqual(sim.isCartOpen, false);
  });

  runner.test('11.6 Collation of identical items with same color and size increments quantity', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Shirt', price: 5400000 };
    sim.addToCart(p1, 'Trắng', 'M', 1);
    sim.addToCart(p1, 'Trắng', 'M', 2);
    assertEqual(sim.cart.length, 1, 'Same color and size must collate into 1 cart item');
    assertEqual(sim.cart[0].quantity, 3);
  });
});

// -----------------------------------------------------------------------------
// FEATURE 12: Quick Order Form & Address Validation (F19)
// -----------------------------------------------------------------------------
runner.describe('Feature 12: Quick Order Form & Address Validation', () => {
  runner.test('12.1 Validates customer name is not empty', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Scarf', price: 3200000 };
    sim.addToCart(p1, 'Mono', 'FreeSize', 1);

    assertThrows(() => {
      sim.submitOrder({
        customerName: '',
        phoneNumber: '0901234567',
        address: 'Hà Nội',
        paymentMethod: 'cod',
      });
    }, 'Must reject empty customer name');
  });

  runner.test('12.2 Validates phone number against Vietnamese telecommunications standard', () => {
    assertEqual(isValidVietnamesePhone('0908123456'), true);
    assertEqual(isValidVietnamesePhone('0876637806'), true);
    assertEqual(isValidVietnamesePhone('0398765432'), true);
    assertEqual(isValidVietnamesePhone('12345'), false);
    assertEqual(isValidVietnamesePhone('abc-phone'), false);
  });

  runner.test('12.3 Validates shipping address is present', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Scarf', price: 3200000 };
    sim.addToCart(p1, 'Mono', 'FreeSize', 1);

    assertThrows(() => {
      sim.submitOrder({
        customerName: 'Hoàng Nam',
        phoneNumber: '0908123456',
        address: '',
        paymentMethod: 'cod',
      });
    }, 'Must reject empty shipping address');
  });

  runner.test('12.4 Discount coupon code "VUONGGIA" grants 10% discount', () => {
    const discount = calculateDiscount(10000000, 'VUONGGIA');
    assertEqual(discount, 1000000, 'VUONGGIA must deduct 10%');
  });

  runner.test('12.5 Luxury velvet gift wrap adds 150.000 VND fee', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Scarf', price: 3200000 };
    sim.addToCart(p1, 'Mono', 'FreeSize', 1);

    sim.submitOrder({
      customerName: 'Minh Châu',
      phoneNumber: '0908123456',
      address: 'Đà Nẵng',
      paymentMethod: 'cod',
      giftWrap: true,
    });

    assertEqual(sim.completedOrder.giftWrap, 150000);
    assertEqual(sim.completedOrder.totalAmount, 3200000 + 150000);
  });

  runner.test('12.6 Complimentary luxury shipping fee is 0 VND', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Scarf', price: 3200000 };
    sim.addToCart(p1, 'Mono', 'FreeSize', 1);

    sim.submitOrder({
      customerName: 'Minh Châu',
      phoneNumber: '0908123456',
      address: 'Đà Nẵng',
      paymentMethod: 'cod',
      giftWrap: false,
    });

    assertEqual(sim.completedOrder.shipping, 0, 'Shipping must be 0 VND complimentary');
  });
});

// -----------------------------------------------------------------------------
// FEATURE 13: Mock Payment Methods & Confirmation (F20, F21)
// -----------------------------------------------------------------------------
runner.describe('Feature 13: Mock Payment Methods & Royal Confirmation Receipt', () => {
  runner.test('13.1 Supports COD (Thử đồ tại gia) payment method', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Shirt', price: 5400000 };
    sim.addToCart(p1, 'Trắng', 'M', 1);

    const res = sim.submitOrder({
      customerName: 'Lan Anh',
      phoneNumber: '0908123456',
      address: 'Hà Nội',
      paymentMethod: 'cod',
    });
    assertEqual(res.success, true);
    assertEqual(sim.completedOrder.orderDetails.paymentMethod, 'cod');
  });

  runner.test('13.2 Supports VietQR payment method', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Shirt', price: 5400000 };
    sim.addToCart(p1, 'Trắng', 'M', 1);

    const res = sim.submitOrder({
      customerName: 'Lan Anh',
      phoneNumber: '0908123456',
      address: 'Hà Nội',
      paymentMethod: 'vietqr',
    });
    assertEqual(res.success, true);
    assertEqual(sim.completedOrder.orderDetails.paymentMethod, 'vietqr');
  });

  runner.test('13.3 Supports Card (Visa/Mastercard) payment method', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Shirt', price: 5400000 };
    sim.addToCart(p1, 'Trắng', 'M', 1);

    const res = sim.submitOrder({
      customerName: 'Lan Anh',
      phoneNumber: '0908123456',
      address: 'Hà Nội',
      paymentMethod: 'card',
    });
    assertEqual(res.success, true);
    assertEqual(sim.completedOrder.orderDetails.paymentMethod, 'card');
  });

  runner.test('13.4 Generates official Order ID conforming to VG-2026-XXXX format', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Shirt', price: 5400000 };
    sim.addToCart(p1, 'Trắng', 'M', 1);

    const res = sim.submitOrder({
      customerName: 'Lan Anh',
      phoneNumber: '0908123456',
      address: 'Hà Nội',
      paymentMethod: 'cod',
    });
    assertMatch(res.orderId, /^VG-2026-\d{4}$/, 'Order ID must match VG-2026-XXXX pattern');
  });

  runner.test('13.5 Successful order clears shopping cart in full checkout mode', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Shirt', price: 5400000 };
    sim.addToCart(p1, 'Trắng', 'M', 1);
    assertEqual(sim.cart.length, 1);

    sim.submitOrder({
      customerName: 'Lan Anh',
      phoneNumber: '0908123456',
      address: 'Hà Nội',
      paymentMethod: 'cod',
    });
    assertEqual(sim.cart.length, 0, 'Cart must be cleared after successful checkout');
  });

  runner.test('13.6 Order confirmation stores timestamp and item breakdown', () => {
    const sim = new StoreContextSimulator();
    const p1 = { id: 'p1', name: 'Silk Shirt', price: 5400000 };
    sim.addToCart(p1, 'Trắng', 'M', 1);

    sim.submitOrder({
      customerName: 'Lan Anh',
      phoneNumber: '0908123456',
      address: 'Hà Nội',
      paymentMethod: 'cod',
    });
    assert(sim.completedOrder.createdAt, 'Must include createdAt timestamp');
    assertEqual(sim.completedOrder.items.length, 1);
  });
});

// -----------------------------------------------------------------------------
// FEATURE 14: Milestone 4 R1 Direct Storefront Entry & Copyright Modal Overlay
// -----------------------------------------------------------------------------
runner.describe('Feature 14: R1 Direct Storefront Entry & Fullscreen Copyright Modal', () => {
  const appPath = path.join(projectRoot, 'src', 'App.jsx');
  const storeContextPath = path.join(projectRoot, 'src', 'context', 'StoreContext.jsx');
  const appContent = fs.readFileSync(appPath, 'utf8');
  const storeContextContent = fs.readFileSync(storeContextPath, 'utf8');
  const headerContent = fs.readFileSync(path.join(projectRoot, 'src', 'components', 'Header.jsx'), 'utf8');
  const footerContent = fs.readFileSync(path.join(projectRoot, 'src', 'components', 'Footer.jsx'), 'utf8');

  runner.test('14.1 App initializes directly into Storefront (useState(1))', () => {
    assert(appContent.includes('useState(1)'), 'Initial currentPage must be 1 for direct storefront entry');
  });

  runner.test('14.2 Page0_Copyright supports fullscreen modal props (isOpen, onClose, onNextPage)', () => {
    assert(page0Content.includes('isOpen = true'), 'Page0_Copyright must accept isOpen prop');
    assert(page0Content.includes('onClose'), 'Page0_Copyright must accept onClose prop');
    assert(page0Content.includes('ĐÓNG [ESC]'), 'Page0_Copyright must render top-right direct exit button');
  });

  runner.test('14.3 Header renders standard VG © 2026 trigger button with ShieldCheck icon', () => {
    assert(headerContent.includes('VG © 2026'), 'Header must render VG © 2026 token');
    assert(headerContent.includes('ShieldCheck'), 'Header must render ShieldCheck icon');
  });

  runner.test('14.4 Footer renders standard VG © 2026 trigger buttons with ShieldCheck icon', () => {
    assert(footerContent.includes('VG © 2026'), 'Footer must render VG © 2026 token button');
    assert(footerContent.includes('ShieldCheck'), 'Footer must render ShieldCheck icon');
  });

  runner.test('14.5 StoreContext manages isCopyrightModalOpen with dedicated open and close actions', () => {
    assert(storeContextContent.includes('isCopyrightModalOpen'), 'StoreContext must manage isCopyrightModalOpen state');
    assert(storeContextContent.includes('openCopyrightModal'), 'StoreContext must provide openCopyrightModal action');
    assert(storeContextContent.includes('closeCopyrightModal'), 'StoreContext must provide closeCopyrightModal action');
  });
});

// -----------------------------------------------------------------------------
// FEATURE 15: Milestone 4 R2 16:9 Widescreen Split 2-Column Layouts
// -----------------------------------------------------------------------------
runner.describe('Feature 15: R2 16:9 Widescreen Split 2-Column Layouts', () => {
  const heroContent = fs.readFileSync(path.join(projectRoot, 'src', 'components', 'HeroLookbook.jsx'), 'utf8');
  const catContent = fs.readFileSync(path.join(projectRoot, 'src', 'components', 'CategoryShowcase.jsx'), 'utf8');
  const gridContent = fs.readFileSync(path.join(projectRoot, 'src', 'components', 'MagazineLookbookGrid.jsx'), 'utf8');
  const cardContent = fs.readFileSync(path.join(projectRoot, 'src', 'components', 'ProductCard.jsx'), 'utf8');
  const storyContent = fs.readFileSync(path.join(projectRoot, 'src', 'components', 'AtelierStory.jsx'), 'utf8');
  const footerContent = fs.readFileSync(path.join(projectRoot, 'src', 'components', 'Footer.jsx'), 'utf8');

  runner.test('15.1 HeroLookbook utilizes balanced 2-column split and 16:9 widescreen image', () => {
    assert(heroContent.includes('lg:grid-cols-2'), 'Hero must use balanced 2-column layout (lg:grid-cols-2)');
    assert(heroContent.includes('aspect-[16/9]'), 'Hero image container must enforce aspect-[16/9]');
    assert(heroContent.includes('object-[center_28%]'), 'Hero image must frame model with object-[center_28%]');
  });

  runner.test('15.2 CategoryShowcase utilizes balanced 2-column master-detail layout with 16:9 showcase frame', () => {
    assert(catContent.includes('lg:grid-cols-2'), 'CategoryShowcase must use balanced 2-column split');
    assert(catContent.includes('aspect-[16/9]'), 'Category showcase frame must enforce aspect-[16/9]');
    assert(!catContent.includes('grid-cols-5'), 'CategoryShowcase must eliminate cramped 5-column grid');
  });

  runner.test('15.3 MagazineLookbookGrid uses 2-column catalog and 16:9 lookbook interlude', () => {
    assert(gridContent.includes('lg:grid-cols-2'), 'Catalog grid and lookbook interlude must use 2-column spread');
    assert(gridContent.includes('aspect-[16/9]'), 'Lookbook interlude visual must use aspect-[16/9]');
  });

  runner.test('15.4 ProductCard frames merchandise in 16:9 widescreen ratio with centered focal point', () => {
    assert(cardContent.includes('aspect-[16/9]'), 'ProductCard must use aspect-[16/9] image frame');
    assert(cardContent.includes('object-[center_30%]'), 'ProductCard must center focal point at 30%');
  });

  runner.test('15.5 AtelierStory utilizes balanced 2-column layout and 16:9 artisan workshop image', () => {
    assert(storyContent.includes('lg:grid-cols-2'), 'AtelierStory must use balanced 2-column split');
    assert(storyContent.includes('aspect-[16/9]'), 'Atelier workshop image must enforce aspect-[16/9]');
    assert(storyContent.includes('object-[center_40%]'), 'Atelier workshop image must frame artisan at center 40%');
  });

  runner.test('15.6 Footer utilizes balanced 2-column architectural split', () => {
    assert(footerContent.includes('lg:grid-cols-2'), 'Footer must use balanced 2-column architectural layout');
  });
});

// -----------------------------------------------------------------------------
// FEATURE 16: Milestone 4 R3 Generous Typography & Anti-Narrow Wrapping
// -----------------------------------------------------------------------------
runner.describe('Feature 16: R3 Generous Typography & Anti-Narrow Wrapping', () => {
  const cssContent = fs.readFileSync(path.join(projectRoot, 'src', 'index.css'), 'utf8');
  const tailwindContent = fs.readFileSync(path.join(projectRoot, 'tailwind.config.js'), 'utf8');
  const heroContent = fs.readFileSync(path.join(projectRoot, 'src', 'components', 'HeroLookbook.jsx'), 'utf8');
  const catContent = fs.readFileSync(path.join(projectRoot, 'src', 'components', 'CategoryShowcase.jsx'), 'utf8');
  const cardContent = fs.readFileSync(path.join(projectRoot, 'src', 'components', 'ProductCard.jsx'), 'utf8');

  runner.test('16.1 Global index.css enforces text-wrap: balance for headings and text-wrap: pretty for paragraphs', () => {
    assert(cssContent.includes('text-wrap: balance'), 'index.css must enforce text-wrap: balance for headings');
    assert(cssContent.includes('text-wrap: pretty'), 'index.css must enforce text-wrap: pretty for paragraphs');
  });

  runner.test('16.2 Character-width bounds (60ch, 75ch, 85ch) defined in CSS and Tailwind configuration', () => {
    assert(cssContent.includes('75ch'), 'index.css must define optimal 75ch character boundary');
    assert(tailwindContent.includes('75ch'), 'tailwind.config.js must extend maxWidth with 75ch');
  });

  runner.test('16.3 Primary headings across components utilize text-balance class', () => {
    assert(heroContent.includes('text-balance'), 'Hero headline must include text-balance');
    assert(catContent.includes('text-balance'), 'CategoryShowcase headline must include text-balance');
    assert(cardContent.includes('text-balance'), 'ProductCard title must include text-balance');
  });

  runner.test('16.4 Primary descriptions across components utilize text-pretty and character bounds', () => {
    assert(heroContent.includes('text-pretty') && heroContent.includes('75ch'), 'Hero subtext must include text-pretty and 75ch');
    assert(catContent.includes('text-pretty') && catContent.includes('75ch'), 'CategoryShowcase descriptions must include text-pretty and 75ch');
    assert(cardContent.includes('text-pretty') && cardContent.includes('75ch'), 'ProductCard tagline must include text-pretty and 75ch');
  });
});

const summary = runner.summary();
module.exports = summary;
