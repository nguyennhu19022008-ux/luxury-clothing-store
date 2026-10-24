/**
 * Independent Adversarial Challenger Suite: Milestone M5
 * Author: challenger_m5_2 (EMPIRICAL CHALLENGER: critic, specialist)
 * Purpose: Independently verify all M5 requirements (R1, R2, R3, R4),
 * edge cases, AST invariants, CSS compilation, contrast mathematics, and zero-emoji purity.
 */

const fs = require('fs');
const path = require('path');
const { getContrastRatio, colors } = require('./test_harness_utils.cjs');

const projectRoot = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureDetails = [];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function test(name, fn) {
  totalTests++;
  const start = Date.now();
  try {
    fn();
    const duration = Date.now() - start;
    passedTests++;
    console.log(`  \x1b[32m✔ PASS\x1b[0m ${name} (${duration}ms)`);
  } catch (err) {
    const duration = Date.now() - start;
    failedTests++;
    failureDetails.push({ name, error: err.message });
    console.error(`  \x1b[31m✖ FAIL\x1b[0m ${name}: ${err.message}`);
  }
}

console.log(`\n\x1b[1m\x1b[35m╔══════════════════════════════════════════════════════════════════════════╗\x1b[0m`);
console.log(`\x1b[1m\x1b[35m║   CHALLENGER_M5_2: INDEPENDENT EMPIRICAL ADVERSARIAL VERIFICATION SUITE   ║\x1b[0m`);
console.log(`\x1b[1m\x1b[35m║   Auditing Requirements R1, R2, R3, R4, Contrast, Layouts & Motion       ║\x1b[0m`);
console.log(`\x1b[1m\x1b[35m╚══════════════════════════════════════════════════════════════════════════╝\x1b[0m\n`);

// =============================================================================
// DOMAIN 1: Requirement R1 — Interactive Silk Shutter Curtain
// =============================================================================
console.log('\x1b[1m\x1b[36m► DOMAIN 1: Requirement R1 — Interactive Silk Shutter Curtain\x1b[0m');

test('1.1 Verbatim Haute Couture brand and invitation copy in Curtain', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/InteractiveOpeningCurtain.jsx'), 'utf8');
  assert(code.includes('MAISON VUONGGIA'), 'Must display brand name MAISON VUONGGIA');
  assert(code.includes('CHẠM ĐỂ MỞ MÀN /// CLICK TO ENTER'), 'Must display verbatim invitation text "CHẠM ĐỂ MỞ MÀN /// CLICK TO ENTER"');
  assert(code.includes('COLLECTION 2026'), 'Must display COLLECTION 2026 subtitle');
});

test('1.2 Curtain structure has upper and lower split-shutter panels in OLED Black', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/InteractiveOpeningCurtain.jsx'), 'utf8');
  assert(code.includes('curtain-upper') && code.includes('curtain-lower'), 'Must have curtain-upper and curtain-lower panels');
  assert(code.includes('-translate-y-full') && code.includes('translate-y-full'), 'Must slide upward and downward respectively');
  assert(code.includes('bg-[#000000]'), 'Must use pure OLED black (#000000)');
});

test('1.3 Curtain interacts with pointer clicks and Space/Enter/ArrowRight keys', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/InteractiveOpeningCurtain.jsx'), 'utf8');
  assert(code.includes('onClick={handleUnveil}'), 'Outer container must trigger handleUnveil on click');
  assert(code.includes('window.addEventListener(\'keydown\', handleKeyDown)'), 'Must bind window keydown listener');
  assert(code.includes('e.code === \'Space\'') || code.includes('e.key === \' \''), 'Must accept Space key');
  assert(code.includes('e.key === \'Enter\''), 'Must accept Enter key');
  assert(code.includes('e.key === \'ArrowRight\''), 'Must accept ArrowRight key');
});

test('1.4 Keydown shortcuts are suppressed when focused in text inputs or textareas', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/InteractiveOpeningCurtain.jsx'), 'utf8');
  assert(
    code.includes('[\'INPUT\', \'TEXTAREA\'].includes(e.target?.tagName)'),
    'Must guard against triggering while user types in input/textarea'
  );
});

test('1.5 Cleanup listener and timer on unmount prevents memory leaks', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/InteractiveOpeningCurtain.jsx'), 'utf8');
  assert(code.includes('window.removeEventListener(\'keydown\', handleKeyDown)'), 'Must remove keydown event listener');
  assert(code.includes('clearTimeout(timerRef.current)'), 'Must clear timer on unmount');
});

test('1.6 Mobile haptic feedback is invoked safely in try/catch', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/components/InteractiveOpeningCurtain.jsx'), 'utf8');
  assert(code.includes('navigator.vibrate(20)'), 'Must call navigator.vibrate(20)');
  assert(code.includes('try {') && code.includes('catch'), 'Must wrap navigator.vibrate in try/catch block');
});

test('1.7 App.jsx mounts curtain initially and locks body scroll until unveiled', () => {
  const appCode = fs.readFileSync(path.join(projectRoot, 'src/App.jsx'), 'utf8');
  assert(appCode.includes('const [isCurtainUnveiled, setIsCurtainUnveiled] = useState(false);'), 'isCurtainUnveiled must default to false');
  assert(appCode.includes('!isCurtainUnveiled &&'), 'Curtain must be mounted when not unveiled');
  assert(appCode.includes('!isCurtainUnveiled || currentPage === 0'), 'Body scroll must be locked when curtain is active');
});

test('1.8 Slide 0 Intellectual Property Modal remains accessible via VG © 2026 buttons', () => {
  const headerCode = fs.readFileSync(path.join(projectRoot, 'src/components/Header.jsx'), 'utf8');
  const footerCode = fs.readFileSync(path.join(projectRoot, 'src/components/Footer.jsx'), 'utf8');
  assert(headerCode.includes('VG © 2026'), 'Header must contain VG © 2026 button');
  assert(footerCode.includes('VG © 2026'), 'Footer must contain VG © 2026 button');
});

// =============================================================================
// DOMAIN 2: Requirement R2 — Edge-to-Edge Full-Bleed Layouts
// =============================================================================
console.log('\n\x1b[1m\x1b[36m► DOMAIN 2: Requirement R2 — Edge-to-Edge Full-Bleed Layouts\x1b[0m');

const targetSections = [
  { name: 'HeroLookbook', file: 'src/components/HeroLookbook.jsx' },
  { name: 'CategoryShowcase', file: 'src/components/CategoryShowcase.jsx' },
  { name: 'MagazineLookbookGrid', file: 'src/components/MagazineLookbookGrid.jsx' },
  { name: 'AtelierStory', file: 'src/components/AtelierStory.jsx' },
  { name: 'Footer', file: 'src/components/Footer.jsx' },
];

targetSections.forEach(({ name, file }) => {
  test(`2.Section ${name} enforces full-bleed scale and eliminates max-w-7xl`, () => {
    const code = fs.readFileSync(path.join(projectRoot, file), 'utf8');
    assert(code.includes('w-full max-w-none px-6 sm:px-12 lg:px-16 xl:px-24'), `${name} must include full-bleed fluid padding scale`);
    assert(!code.includes('max-w-7xl mx-auto'), `${name} must not contain max-w-7xl mx-auto container`);
  });
});

test('2.6 HeroLookbook flank ribbons activate on 1440px+ screens (min-[1400px]:flex 2xl:flex)', () => {
  const heroCode = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  assert(heroCode.includes('min-[1400px]:flex') && heroCode.includes('2xl:flex'), 'Must activate flank ribbons at 1440px+');
  assert(heroCode.includes('pointer-events-none'), 'Flank ribbons must have pointer-events-none to avoid click blocking');
  assert(heroCode.includes('HAUTE COUTURE /// N° 01') && heroCode.includes('AUTOMNE — HIVER 2026'), 'Must display flank coordinates');
  assert(heroCode.includes('parallax-fast'), 'Flank ribbons must have parallax-fast class');
});

// =============================================================================
// DOMAIN 3: Requirement R3 — Asymmetrical Layouts & Rich Palettes
// =============================================================================
console.log('\n\x1b[1m\x1b[36m► DOMAIN 3: Requirement R3 — Asymmetrical Layouts & Rich Palettes\x1b[0m');

test('3.1 HeroLookbook 60/40 magazine asymmetric grid preserves lg:grid-cols-2 compatibility', () => {
  const heroCode = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  assert(heroCode.includes('lg:grid-cols-2'), 'Must preserve lg:grid-cols-2 for AST test compatibility');
  assert(heroCode.includes('lg:[grid-template-columns:3fr_2fr]'), 'Must include 60/40 3fr_2fr ratio declaration');
});

test('3.2 Compiled CSS contains .lg\\:\\[grid-template-columns\\:3fr_2fr\\] rule', () => {
  const distDir = path.join(projectRoot, 'dist/assets');
  const cssFiles = fs.readdirSync(distDir).filter(f => f.endsWith('.css'));
  assert(cssFiles.length > 0, 'Compiled CSS must exist in dist/assets');
  const cssContent = fs.readFileSync(path.join(distDir, cssFiles[0]), 'utf8');
  assert(
    cssContent.includes('grid-template-columns:3fr 2fr'),
    'Compiled CSS must contain grid-template-columns:3fr 2fr rule'
  );
});

test('3.3 CategoryShowcase implements Asymmetric Bento card with active indicator and avoids grid-cols-5', () => {
  const catCode = fs.readFileSync(path.join(projectRoot, 'src/components/CategoryShowcase.jsx'), 'utf8');
  assert(catCode.includes('bg-[#EFE9DF]'), 'Active card must feature high-contrast Camel/Ivory bg-[#EFE9DF]');
  assert(catCode.includes('Đang Khảo Cứu'), 'Active card must include "Đang Khảo Cứu" badge');
  assert(!catCode.includes('grid-cols-5'), 'Must strictly avoid cramped grid-cols-5 layout');
  assert(catCode.includes('aspect-[16/9]'), 'Master showcase frame and filmstrip must use 16:9 widescreen ratio');
});

test('3.4 Catalog (MagazineLookbookGrid & ProductCard) Product 0 Spotlight Card with badge', () => {
  const gridCode = fs.readFileSync(path.join(projectRoot, 'src/components/MagazineLookbookGrid.jsx'), 'utf8');
  const cardCode = fs.readFileSync(path.join(projectRoot, 'src/components/ProductCard.jsx'), 'utf8');
  assert(gridCode.includes('isSpotlight = idx === 0'), 'Product 0 must be marked as spotlight');
  assert(gridCode.includes('lg:col-span-2'), 'Product 0 must span across 2 columns');
  assert(cardCode.includes('CHẾ TÁC NỔI BẬT /// ATELIER SPOTLIGHT'), 'Spotlight card must render atelier spotlight badge');
});

test('3.5 Catalog grid implements 7/5 alternating asymmetric rhythm', () => {
  const gridCode = fs.readFileSync(path.join(projectRoot, 'src/components/MagazineLookbookGrid.jsx'), 'utf8');
  assert(gridCode.includes('lg:pr-1') && gridCode.includes('lg:pl-1'), 'Must apply alternating 7/5 padding rhythm');
});

test('3.6 AtelierStory adopts Velvet Obsidian theme (#0D0D0D) with atmospheric veil banner', () => {
  const storyCode = fs.readFileSync(path.join(projectRoot, 'src/components/AtelierStory.jsx'), 'utf8');
  assert(storyCode.includes('bg-[#0D0D0D]'), 'AtelierStory canvas must be Velvet Obsidian Midnight (#0D0D0D)');
  assert(storyCode.includes('CHUYỂN TIẾP KHÔNG GIAN /// VÀO XƯỞNG MAY KÍN ATELIER HÀ ĐÔNG'), 'Must display transition veil banner');
  assert(storyCode.includes('bg-[#161616]'), 'Pillars must use Black Stone #161616 background');
  assert(storyCode.includes('border-white/10'), 'Pillars must have border-white/10');
});

// =============================================================================
// DOMAIN 4: Requirement R4 — Scroll-Driven & Haptic Motion Systems
// =============================================================================
console.log('\n\x1b[1m\x1b[36m► DOMAIN 4: Requirement R4 — Scroll-Driven & Haptic Motion Systems\x1b[0m');

test('4.1 Spring physics (.elastic-haptic) defined in index.css and applied across components', () => {
  const css = fs.readFileSync(path.join(projectRoot, 'src/index.css'), 'utf8');
  assert(css.includes('.elastic-haptic'), 'index.css must define .elastic-haptic');
  assert(css.includes('cubic-bezier(0.34, 1.56, 0.64, 1)'), 'Must use elastic spring cubic-bezier curve');
  
  const files = [
    'src/components/InteractiveOpeningCurtain.jsx',
    'src/components/HeroLookbook.jsx',
    'src/components/CategoryShowcase.jsx',
    'src/components/ProductCard.jsx',
    'src/components/AtelierStory.jsx',
  ];
  files.forEach(f => {
    const code = fs.readFileSync(path.join(projectRoot, f), 'utf8');
    assert(code.includes('elastic-haptic'), `${f} must utilize .elastic-haptic`);
  });
});

test('4.2 Button satin sheen sweep (.btn-satin-sheen) defined and bound to primary CTAs', () => {
  const css = fs.readFileSync(path.join(projectRoot, 'src/index.css'), 'utf8');
  assert(css.includes('.btn-satin-sheen'), 'index.css must define .btn-satin-sheen');
  assert(css.includes('skewX(-20deg)') || css.includes('skew(-20deg)'), 'Satin sheen pseudo-element must have skew transform');
  
  const hero = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  const card = fs.readFileSync(path.join(projectRoot, 'src/components/ProductCard.jsx'), 'utf8');
  assert(hero.includes('btn-satin-sheen'), 'Hero primary CTA must include btn-satin-sheen');
  assert(card.includes('btn-satin-sheen'), 'ProductCard Mua Ngay must include btn-satin-sheen');
});

test('4.3 Staggered text mask wipe (.text-mask-container & .text-mask-wipe) applied in Hero', () => {
  const css = fs.readFileSync(path.join(projectRoot, 'src/index.css'), 'utf8');
  assert(css.includes('.text-mask-container'), 'index.css must define .text-mask-container');
  assert(css.includes('.text-mask-wipe'), 'index.css must define .text-mask-wipe');
  
  const hero = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  assert(hero.includes('text-mask-container') && hero.includes('text-mask-wipe'), 'Hero headline must use text mask wipe');
});

test('4.4 Smooth parallax classes (.parallax-slow & .parallax-fast) defined and utilized in Hero', () => {
  const css = fs.readFileSync(path.join(projectRoot, 'src/index.css'), 'utf8');
  assert(css.includes('.parallax-slow') && css.includes('.parallax-fast'), 'index.css must define parallax classes');
  assert(css.includes('will-change: transform'), 'Parallax classes must optimize with will-change: transform');
  
  const hero = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  assert(hero.includes('parallax-slow') && hero.includes('parallax-fast'), 'Hero must apply parallax classes');
});

test('4.5 prefers-reduced-motion media query completely halts animations and resets transforms', () => {
  const css = fs.readFileSync(path.join(projectRoot, 'src/index.css'), 'utf8');
  assert(css.includes('@media (prefers-reduced-motion: reduce)'), 'index.css must have prefers-reduced-motion block');
  assert(css.includes('transform: none !important'), 'Must reset transform to none');
  assert(css.includes('display: none !important'), 'Must hide satin sheen pseudo-elements');
});

test('4.6 LuxuryCursor safely guards window.matchMedia existence for headless test runner safety', () => {
  const cursorCode = fs.readFileSync(path.join(projectRoot, 'src/components/LuxuryCursor.jsx'), 'utf8');
  assert(cursorCode.includes('typeof window.matchMedia === \'function\''), 'Must guard window.matchMedia function');
});

// =============================================================================
// DOMAIN 5: Accessibility, Contrast Mathematics & Zero-Emoji Purity
// =============================================================================
console.log('\n\x1b[1m\x1b[36m► DOMAIN 5: Accessibility, Contrast Mathematics & Zero-Emoji Purity\x1b[0m');

const contrastPairs = [
  { fg: '#FFFFFF', bg: '#0D0D0D', label: 'White on Velvet Obsidian', min: 19.0 },
  { fg: '#D4AF37', bg: '#0D0D0D', label: 'Champagne Gold on Velvet Obsidian', min: 8.5 },
  { fg: '#A68A56', bg: '#0D0D0D', label: 'Gold on Velvet Obsidian', min: 5.5 },
  { fg: '#D4D4D4', bg: '#0D0D0D', label: 'Neutral 300 on Velvet Obsidian', min: 12.0 },
  { fg: '#A3A3A3', bg: '#161616', label: 'Neutral 400 on Black Stone Monolith', min: 6.5 },
  { fg: '#2D2B28', bg: '#FDFBF7', label: 'Charcoal text on Luxury Bone canvas', min: 13.0 },
  { fg: '#6E6A64', bg: '#FDFBF7', label: 'Muted text on Luxury Bone canvas', min: 4.8 },
  { fg: '#6E6A64', bg: '#F7F4EE', label: 'Muted text on Showcase background', min: 4.5 },
  { fg: '#111111', bg: '#EFE9DF', label: 'Dark text on Bento Active Card', min: 14.0 },
];

contrastPairs.forEach(({ fg, bg, label, min }) => {
  test(`5.Contrast: ${label} (>= ${min}:1)`, () => {
    const ratio = getContrastRatio(fg, bg);
    assert(ratio >= min, `${label} contrast ratio ${ratio.toFixed(2)}:1 failed to meet threshold ${min}:1`);
  });
});

test('5.Exhaustive Zero-Emoji Scan across all files in src/', () => {
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
  const srcDir = path.join(projectRoot, 'src');
  const violations = [];

  function scan(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (/\.(jsx?|tsx?|css|html)$/.test(entry.name)) {
        const text = fs.readFileSync(fullPath, 'utf8');
        const match = text.match(emojiRegex);
        if (match) {
          violations.push(`${fullPath}: found emoji "${match[0]}"`);
        }
      }
    }
  }
  scan(srcDir);
  assert(violations.length === 0, `Detected emojis in src/: ${violations.join(', ')}`);
});

// =============================================================================
// DOMAIN 6: Package.json Scripts & Production Build Verification
// =============================================================================
console.log('\n\x1b[1m\x1b[36m► DOMAIN 6: Package.json Scripts & Production Build Verification\x1b[0m');

test('6.1 package.json includes "test": "node tests/run_all_tests.cjs"', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
  assert(pkg.scripts && pkg.scripts.test === 'node tests/run_all_tests.cjs', 'package.json must contain standard test script');
});

test('6.2 Production build artifacts (index.html, .js, .css) exist and are non-empty', () => {
  const distHtml = path.join(projectRoot, 'dist/index.html');
  assert(fs.existsSync(distHtml) && fs.statSync(distHtml).size > 500, 'dist/index.html must exist and have content');
  
  const distAssets = path.join(projectRoot, 'dist/assets');
  assert(fs.existsSync(distAssets), 'dist/assets must exist');
  const assets = fs.readdirSync(distAssets);
  const jsFiles = assets.filter(f => f.endsWith('.js'));
  const cssFiles = assets.filter(f => f.endsWith('.css'));
  assert(jsFiles.length > 0 && fs.statSync(path.join(distAssets, jsFiles[0])).size > 50000, 'JS bundle must be properly generated');
  assert(cssFiles.length > 0 && fs.statSync(path.join(distAssets, cssFiles[0])).size > 10000, 'CSS bundle must be properly generated');
});

// =============================================================================
// SUMMARY & VERDICT
// =============================================================================
console.log(`\n\x1b[1m\x1b[35m══════════════════════════════════════════════════════════════════════════\x1b[0m`);
console.log(`\x1b[1m  TOTAL EMPIRICAL TESTS: ${totalTests}\x1b[0m`);
console.log(`\x1b[32m  PASSED:                ${passedTests}\x1b[0m`);
console.log(`\x1b[${failedTests > 0 ? '31' : '32'}m  FAILED:                ${failedTests}\x1b[0m`);
console.log(`\x1b[1m\x1b[35m══════════════════════════════════════════════════════════════════════════\x1b[0m\n`);

if (failedTests > 0) {
  console.error(`\x1b[41m\x1b[37m\x1b[1m VERDICT: REJECT — ${failedTests} FAILURE(S) DETECTED \x1b[0m\n`);
  process.exit(1);
} else {
  console.log(`\x1b[42m\x1b[30m\x1b[1m VERDICT: APPROVE — ALL MILESTONE M5 EMPIRICAL CHALLENGES PASSED (100%) \x1b[0m\n`);
  process.exit(0);
}
