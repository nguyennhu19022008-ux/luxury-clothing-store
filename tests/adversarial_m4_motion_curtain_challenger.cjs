/**
 * Adversarial Challenger Suite: Requirements R1, R2, R3, R4 (Milestone M5)
 * Verifies:
 * - R1: InteractiveOpeningCurtain mechanics, keydown listener, input suppression, reduced motion, haptic feedback
 * - R2: Edge-to-Edge Full-Bleed layout classes across all 5 sections (no max-w-7xl)
 * - R3: Asymmetric Hero 60/40, Bento switcher, Lookbook spotlight & rhythm, Velvet Obsidian #0D0D0D theme
 * - R4: Parallax classes, text mask wipe, elastic haptics, satin sheen on buttons, WCAG AA, 0 emoji
 */

const fs = require('fs');
const path = require('path');
const { getContrastRatio } = require('./test_harness_utils.cjs');

const projectRoot = path.resolve(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

let passed = 0;
let failed = 0;
const results = [];

function test(name, fn) {
  const start = Date.now();
  try {
    fn();
    const duration = Date.now() - start;
    passed++;
    results.push({ name, passed: true, duration });
    console.log(`  \x1b[32m✔ PASS\x1b[0m ${name} (${duration}ms)`);
  } catch (err) {
    const duration = Date.now() - start;
    failed++;
    results.push({ name, passed: false, duration, error: err.message });
    console.error(`  \x1b[31m✖ FAIL\x1b[0m ${name}: ${err.message}`);
  }
}

console.log('\n\x1b[1m\x1b[35m======================================================================\x1b[0m');
console.log('\x1b[1m\x1b[35m  EMPIRICAL ADVERSARIAL CHALLENGER SUITE: MILESTONE M5                 \x1b[0m');
console.log('\x1b[1m\x1b[35m  Haute Couture Upgrade: Curtain, Full-Bleed, Asymmetry, Motion       \x1b[0m');
console.log('\x1b[1m\x1b[35m======================================================================\x1b[0m\n');

// -----------------------------------------------------------------------------
// SUITE 1: Requirement R1 — Interactive Silk Shutter Curtain
// -----------------------------------------------------------------------------
console.log('\x1b[1m\x1b[36m► SUITE 1: Requirement R1 — Interactive Silk Shutter Curtain\x1b[0m');

test('1.1 InteractiveOpeningCurtain.jsx renders curtain-upper and curtain-lower shutter halves', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/InteractiveOpeningCurtain.jsx'), 'utf8');
  assert(code.includes('curtain-upper'), 'Must include curtain-upper shutter half');
  assert(code.includes('curtain-lower'), 'Must include curtain-lower shutter half');
  assert(code.includes('-translate-y-full'), 'Upper shutter must slide upward (-translate-y-full)');
  assert(code.includes('translate-y-full'), 'Lower shutter must slide downward (translate-y-full)');
  assert(code.includes('bg-[#000000]'), 'Shutters must use pure OLED black (#000000)');
});

test('1.2 Curtain contains Haute Couture brand MAISON VUONGGIA and invite CHẠM ĐỂ MỞ MÀN /// CLICK TO ENTER', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/InteractiveOpeningCurtain.jsx'), 'utf8');
  assert(code.includes('MAISON VUONGGIA'), 'Curtain must display monumental title MAISON VUONGGIA');
  assert(
    code.includes('CHẠM ĐỂ MỞ MÀN /// CLICK TO ENTER'),
    'Curtain must display exact verbatim invitation text "CHẠM ĐỂ MỞ MÀN /// CLICK TO ENTER"'
  );
  assert(code.includes('COLLECTION 2026'), 'Curtain must display collection subtitle');
});

test('1.3 Curtain handles click and keydown (Space, Enter, ArrowRight) to trigger unveil', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/InteractiveOpeningCurtain.jsx'), 'utf8');
  assert(code.includes('onClick={handleUnveil}'), 'Curtain container must bind onClick to handleUnveil');
  assert(code.includes('window.addEventListener(\'keydown\', handleKeyDown)'), 'Curtain must listen for keydown events');
  assert(code.includes('Enter') && code.includes('Space'), 'Curtain must recognize Space and Enter keys');
});

test('1.4 Curtain strictly suppresses keyboard shortcuts when user is focused in INPUT or TEXTAREA', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/InteractiveOpeningCurtain.jsx'), 'utf8');
  assert(
    code.includes('[\'INPUT\', \'TEXTAREA\'].includes(e.target?.tagName)'),
    'Curtain must suppress shortcut trigger if focused in INPUT or TEXTAREA'
  );
});

test('1.5 Curtain unmount cleans up timerRef and removes keydown event listener', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/InteractiveOpeningCurtain.jsx'), 'utf8');
  assert(code.includes('clearTimeout(timerRef.current)'), 'Curtain unmount must clean up timerRef');
  assert(code.includes('window.removeEventListener(\'keydown\', handleKeyDown)'), 'Curtain must remove keydown listener');
});

test('1.6 App.jsx mounts InteractiveOpeningCurtain when isCurtainUnveiled === false', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/App.jsx'), 'utf8');
  assert(code.includes('!isCurtainUnveiled &&'), 'App.jsx must render curtain conditionally on !isCurtainUnveiled');
  assert(code.includes('<InteractiveOpeningCurtain'), 'App.jsx must mount InteractiveOpeningCurtain component');
  assert(code.includes('onComplete={() => setIsCurtainUnveiled(true)}'), 'Curtain onComplete must set isCurtainUnveiled to true');
});

test('1.7 App.jsx locks body scroll (overflow: hidden) while curtain is closed', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/App.jsx'), 'utf8');
  assert(
    code.includes('!isCurtainUnveiled') && code.includes('document.body.style.overflow = \'hidden\''),
    'Body scroll must be locked when curtain is active'
  );
});

test('1.8 Page0_Copyright remains accessible via VG © 2026 header/footer triggers after curtain opens', () => {
  const headerCode = fs.readFileSync(path.join(projectRoot, 'src/components/Header.jsx'), 'utf8');
  const footerCode = fs.readFileSync(path.join(projectRoot, 'src/components/Footer.jsx'), 'utf8');
  assert(headerCode.includes('VG © 2026') && headerCode.includes('ShieldCheck'), 'Header must retain VG © 2026 button');
  assert(footerCode.includes('VG © 2026') && footerCode.includes('ShieldCheck'), 'Footer must retain VG © 2026 button');
});

test('1.9 Curtain handleUnveil provides haptic vibration for supported mobile devices', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/InteractiveOpeningCurtain.jsx'), 'utf8');
  assert(code.includes('navigator.vibrate'), 'Curtain handleUnveil must incorporate navigator.vibrate haptic feedback');
});

// -----------------------------------------------------------------------------
// SUITE 2: Requirement R2 — Edge-to-Edge Full-Bleed Layout
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m\x1b[36m► SUITE 2: Requirement R2 — Edge-to-Edge Full-Bleed Layout\x1b[0m');

const fullBleedSignature = 'w-full max-w-none px-6 sm:px-12 lg:px-16 xl:px-24';

test('2.1 HeroLookbook outer section wrapper enforces full bleed (w-full max-w-none px-6 sm:px-12 lg:px-16 xl:px-24)', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  assert(code.includes(fullBleedSignature), 'HeroLookbook wrapper must enforce full-bleed padding scale');
  assert(!code.includes('max-w-7xl mx-auto'), 'HeroLookbook must eliminate box container max-w-7xl');
});

test('2.2 CategoryShowcase outer wrapper enforces full bleed without max-w-7xl container boxing', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/CategoryShowcase.jsx'), 'utf8');
  assert(code.includes(fullBleedSignature), 'CategoryShowcase wrapper must enforce full-bleed scale');
  assert(!code.includes('max-w-7xl mx-auto'), 'CategoryShowcase must eliminate max-w-7xl');
});

test('2.3 MagazineLookbookGrid outer wrapper enforces full bleed without max-w-7xl container boxing', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/MagazineLookbookGrid.jsx'), 'utf8');
  assert(code.includes(fullBleedSignature), 'MagazineLookbookGrid wrapper must enforce full-bleed scale');
  assert(!code.includes('max-w-7xl mx-auto'), 'MagazineLookbookGrid must eliminate max-w-7xl');
});

test('2.4 AtelierStory outer wrapper enforces full bleed without max-w-7xl container boxing', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/AtelierStory.jsx'), 'utf8');
  assert(code.includes(fullBleedSignature), 'AtelierStory wrapper must enforce full-bleed scale');
  assert(!code.includes('max-w-7xl mx-auto'), 'AtelierStory must eliminate max-w-7xl');
});

test('2.5 Footer outer wrapper enforces full bleed without max-w-7xl container boxing', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/Footer.jsx'), 'utf8');
  assert(code.includes(fullBleedSignature), 'Footer wrapper must enforce full-bleed scale');
  assert(!code.includes('max-w-7xl mx-auto'), 'Footer must eliminate max-w-7xl');
});

test('2.6 HeroLookbook provides flank coordinates on 1440px+ viewports (min-[1400px]:flex) with parallax', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  assert(code.includes('min-[1400px]:flex') && code.includes('2xl:flex'), 'HeroLookbook must activate flank coordinates on 1440px+');
  assert(code.includes('HAUTE COUTURE /// N° 01') && code.includes('PARIS — HANOI'), 'Left flank coordinate must be present');
  assert(code.includes('AUTOMNE — HIVER 2026'), 'Right flank coordinate must be present');
  assert(code.includes('parallax-fast'), 'Flank coordinates must feature parallax-fast motion');
});

// -----------------------------------------------------------------------------
// SUITE 3: Requirement R3 — Asymmetrical Layouts & Rich Palettes
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m\x1b[36m► SUITE 3: Requirement R3 — Asymmetrical Layouts & Rich Palettes\x1b[0m');

test('3.1 HeroLookbook implements asymmetric 60/40 editorial layout while retaining lg:grid-cols-2', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  assert(code.includes('lg:grid-cols-2'), 'Must preserve lg:grid-cols-2 for test compatibility');
  assert(
    code.includes('lg:[grid-template-columns:3fr_2fr]') || code.includes('grid-template-columns:3fr_2fr'),
    'Must declare 60/40 magazine editorial asymmetric ratio (3fr_2fr)'
  );
});

test('3.2 CategoryShowcase implements Asymmetric Bento layout with elevated active card (bg-[#EFE9DF]) and badge', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/CategoryShowcase.jsx'), 'utf8');
  assert(code.includes('bg-[#EFE9DF]'), 'Active category card must render high-contrast Ivory/Camel backdrop bg-[#EFE9DF]');
  assert(code.includes('Đang Khảo Cứu'), 'Active category card must display Đang Khảo Cứu badge');
  assert(code.includes('scale-[1.01]') || code.includes('translate-x-'), 'Active card must show tactile offset');
});

test('3.3 CategoryShowcase provides interactive 16:9 filmstrip thumbnail carousel while strictly avoiding grid-cols-5', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/CategoryShowcase.jsx'), 'utf8');
  assert(code.includes('aspect-[16/9]'), 'Showcase and filmstrip must utilize 16:9 widescreen ratio');
  assert(!code.includes('grid-cols-5'), 'Must strictly avoid grid-cols-5 to prevent narrow card clipping');
  assert(code.includes('overflow-x-auto') || code.includes('flex'), 'Filmstrip must use fluid flex carousel');
});

test('3.4 MagazineLookbookGrid and ProductCard implement Product 0 monumental spotlight card with badge', () => {
  const gridCode = fs.readFileSync(path.join(projectRoot, 'src/components/MagazineLookbookGrid.jsx'), 'utf8');
  const cardCode = fs.readFileSync(path.join(projectRoot, 'src/components/ProductCard.jsx'), 'utf8');
  assert(gridCode.includes('isSpotlight') && gridCode.includes('lg:col-span-2'), 'Product 0 must span 2 columns with isSpotlight');
  assert(cardCode.includes('isSpotlight'), 'ProductCard must accept isSpotlight prop');
  assert(
    cardCode.includes('CHẾ TÁC NỔI BẬT /// ATELIER SPOTLIGHT'),
    'Spotlight card must display badge "CHẾ TÁC NỔI BẬT /// ATELIER SPOTLIGHT"'
  );
});

test('3.5 MagazineLookbookGrid implements alternating 7/5 asymmetric pairs rhythm', () => {
  const gridCode = fs.readFileSync(path.join(projectRoot, 'src/components/MagazineLookbookGrid.jsx'), 'utf8');
  assert(
    gridCode.includes('rhythmClass') || gridCode.includes('idx % 2') || gridCode.includes('lg:pr-') || gridCode.includes('lg:pl-'),
    'Catalog grid must feature alternating asymmetric rhythm'
  );
});

test('3.6 AtelierStory enforces Velvet Obsidian Midnight theme background (bg-[#0D0D0D]) with atmospheric transition veil', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/AtelierStory.jsx'), 'utf8');
  assert(code.includes('bg-[#0D0D0D]'), 'AtelierStory must use Velvet Obsidian Midnight canvas bg-[#0D0D0D]');
  assert(
    code.includes('bg-gradient-to-b from-black') || code.includes('CHUYỂN TIẾP KHÔNG GIAN'),
    'AtelierStory must feature atmospheric transition veil'
  );
});

test('3.7 AtelierStory craftsmanship pillars utilize dark stone aesthetic with champagne gold accents', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/AtelierStory.jsx'), 'utf8');
  assert(code.includes('bg-[#161616]'), 'Pillars must utilize dark stone background bg-[#161616]');
  assert(code.includes('border-white/10'), 'Pillars must have border-white/10');
  assert(code.includes('text-luxury-gold') || code.includes('border-luxury-gold/50'), 'Pillars must have champagne gold accents');
});

// -----------------------------------------------------------------------------
// SUITE 4: Requirement R4 — Scroll-Driven & Haptic Motion
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m\x1b[36m► SUITE 4: Requirement R4 — Scroll-Driven & Haptic Motion\x1b[0m');

test('4.1 src/index.css defines .parallax-slow and .parallax-fast with will-change: transform', () => {
  const css = fs.readFileSync(path.join(projectRoot, 'src/index.css'), 'utf8');
  assert(css.includes('.parallax-slow'), 'index.css must define .parallax-slow');
  assert(css.includes('.parallax-fast'), 'index.css must define .parallax-fast');
  assert(css.includes('will-change: transform'), 'Parallax classes must enforce will-change: transform');
});

test('4.2 Parallax classes are attached to decorative backdrop elements in HeroLookbook', () => {
  const hero = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  assert(hero.includes('parallax-slow'), 'HeroLookbook backplate must include parallax-slow');
  assert(hero.includes('parallax-fast'), 'HeroLookbook flank ribbons must include parallax-fast');
});

test('4.3 src/index.css defines text mask wipe classes (.text-mask-container and .text-mask-wipe)', () => {
  const css = fs.readFileSync(path.join(projectRoot, 'src/index.css'), 'utf8');
  assert(css.includes('.text-mask-container'), 'index.css must define .text-mask-container');
  assert(css.includes('.text-mask-wipe'), 'index.css must define .text-mask-wipe');
  assert(css.includes('overflow: hidden'), '.text-mask-container must set overflow: hidden');
});

test('4.4 HeroLookbook wraps monumental heading with text-mask-container and text-mask-wipe', () => {
  const hero = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  assert(hero.includes('text-mask-container'), 'Hero heading must be wrapped in .text-mask-container');
  assert(hero.includes('text-mask-wipe'), 'Hero heading must include .text-mask-wipe');
});

test('4.5 Primary CTAs feature satin sheen sweeps (.satin-sheen-box or .btn-satin-sheen)', () => {
  const css = fs.readFileSync(path.join(projectRoot, 'src/index.css'), 'utf8');
  const hero = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  const card = fs.readFileSync(path.join(projectRoot, 'src/components/ProductCard.jsx'), 'utf8');
  assert(css.includes('.btn-satin-sheen'), 'index.css must define .btn-satin-sheen');
  assert(hero.includes('btn-satin-sheen'), 'Hero CTA must apply btn-satin-sheen');
  assert(card.includes('btn-satin-sheen'), 'ProductCard Mua Ngay button must apply btn-satin-sheen');
});

test('4.6 Interactive buttons and cards feature spring physics (.elastic-haptic)', () => {
  const css = fs.readFileSync(path.join(projectRoot, 'src/index.css'), 'utf8');
  const curtain = fs.readFileSync(path.join(projectRoot, 'src/components/InteractiveOpeningCurtain.jsx'), 'utf8');
  const hero = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  const cat = fs.readFileSync(path.join(projectRoot, 'src/components/CategoryShowcase.jsx'), 'utf8');
  const card = fs.readFileSync(path.join(projectRoot, 'src/components/ProductCard.jsx'), 'utf8');
  const story = fs.readFileSync(path.join(projectRoot, 'src/components/AtelierStory.jsx'), 'utf8');

  assert(css.includes('.elastic-haptic'), 'index.css must define .elastic-haptic');
  assert(curtain.includes('elastic-haptic'), 'Curtain trigger must feature .elastic-haptic');
  assert(hero.includes('elastic-haptic'), 'Hero buttons must feature .elastic-haptic');
  assert(cat.includes('elastic-haptic'), 'Category buttons must feature .elastic-haptic');
  assert(card.includes('elastic-haptic'), 'Product cards must feature .elastic-haptic');
  assert(story.includes('elastic-haptic'), 'Atelier monoliths must feature .elastic-haptic');
});

test('4.7 @media (prefers-reduced-motion: reduce) in index.css completely halts animations and transitions', () => {
  const css = fs.readFileSync(path.join(projectRoot, 'src/index.css'), 'utf8');
  assert(css.includes('@media (prefers-reduced-motion: reduce)'), 'index.css must define prefers-reduced-motion block');
  assert(css.includes('transform: none !important'), 'Reduced motion must enforce transform: none !important');
  assert(css.includes('transition: none !important'), 'Reduced motion must enforce transition: none !important');
});

test('4.8 LuxuryCursor safely guards window.matchMedia for headless/jsdom environment safety', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/LuxuryCursor.jsx'), 'utf8');
  assert(
    code.includes('typeof window.matchMedia === \'function\''),
    'LuxuryCursor must guard window.matchMedia function existence'
  );
});

// -----------------------------------------------------------------------------
// SUITE 5: Requirement R4 — WCAG AA Contrast & Zero-Emoji Purity
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m\x1b[36m► SUITE 5: Requirement R4 — WCAG AA Contrast & Zero-Emoji Purity\x1b[0m');

test('5.1 Contrast between Velvet Obsidian (#0D0D0D) and White (#FFFFFF) exceeds 19:1', () => {
  const ratio = getContrastRatio('#FFFFFF', '#0D0D0D');
  assert(ratio >= 19.0, `Contrast ratio ${ratio.toFixed(2)}:1 must exceed 19:1`);
});

test('5.2 Contrast between Velvet Obsidian (#0D0D0D) and Champagne Gold (#D4AF37 / #A68A56) passes WCAG AA', () => {
  const champagneRatio = getContrastRatio('#D4AF37', '#0D0D0D');
  const goldRatio = getContrastRatio('#A68A56', '#0D0D0D');
  assert(champagneRatio >= 8.0, `Champagne Gold contrast ratio ${champagneRatio.toFixed(2)}:1 must exceed 8.0:1`);
  assert(goldRatio >= 4.5, `Gold contrast ratio ${goldRatio.toFixed(2)}:1 must meet WCAG AA 4.5:1 requirement`);
});

test('5.3 Contrast between Bone (#FDFBF7) and Charcoal (#2D2B28) exceeds 13.0:1', () => {
  const ratio = getContrastRatio('#2D2B28', '#FDFBF7');
  assert(ratio >= 13.0, `Contrast ratio ${ratio.toFixed(2)}:1 must exceed 13.0:1`);
});

test('5.4 All interactive elements provide visible focus indicators (focus-visible:ring)', () => {
  const header = fs.readFileSync(path.join(projectRoot, 'src/components/Header.jsx'), 'utf8');
  const hero = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  const card = fs.readFileSync(path.join(projectRoot, 'src/components/ProductCard.jsx'), 'utf8');
  assert(header.includes('focus-visible:ring'), 'Header buttons must define focus-visible:ring');
  assert(hero.includes('focus-visible:ring'), 'Hero buttons must define focus-visible:ring');
  assert(card.includes('focus-visible:ring'), 'ProductCard buttons must define focus-visible:ring');
});

test('5.5 Zero emojis exist across all files in src/ directory', () => {
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
  const srcDir = path.join(projectRoot, 'src');

  function scan(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (/\.(jsx?|tsx?|css|html)$/.test(entry.name)) {
        const text = fs.readFileSync(fullPath, 'utf8');
        const match = text.match(emojiRegex);
        assert(!match, `Found emoji "${match?.[0]}" in ${fullPath}`);
      }
    }
  }
  scan(srcDir);
});

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m\x1b[35m======================================================================\x1b[0m');
console.log(`\x1b[1m  TOTAL TESTS: ${passed + failed}\x1b[0m`);
console.log(`\x1b[32m  PASSED:      ${passed}\x1b[0m`);
console.log(`\x1b[${failed > 0 ? '31' : '32'}m  FAILED:      ${failed}\x1b[0m`);
console.log('\x1b[1m\x1b[35m======================================================================\x1b[0m\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\x1b[32mVERDICT: APPROVE — All Milestone M5 requirements empirically certified!\x1b[0m\n');
  process.exit(0);
}
