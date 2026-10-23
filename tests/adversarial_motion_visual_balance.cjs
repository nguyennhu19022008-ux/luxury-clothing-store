/**
 * Visual Balance & Atelier Motion Verification Suite
 * Verifies:
 * 1. Header cart bouncing state machine (increments trigger, decrements suppressed)
 * 2. 1440px+ Widescreen flank coordinates coverage
 * 3. H1 non-breaking compound word formatting
 * 4. Staggered reveal classes on Category & Atelier Story
 * 5. Modal spring & fade-in CSS keyframes
 * 6. Reduced-motion accessibility fallback
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  \x1b[32m✔ PASS\x1b[0m ${name}`);
  } catch (err) {
    failed++;
    console.error(`  \x1b[31m✖ FAIL\x1b[0m ${name}: ${err.message}`);
  }
}

console.log('\n\x1b[1m\x1b[36m▶ Visual Balance & Atelier Motion Verification Suite\x1b[0m\n');

// 1. Header.jsx Verification
test('Header updates prevCountRef on increments so decrements do not trigger false bounce', () => {
  const content = fs.readFileSync(path.join(projectRoot, 'src/components/Header.jsx'), 'utf8');
  assert(content.includes('prevCountRef.current = cartCount;'), 'Must assign prevCountRef.current');
  // Check that inside the if (cartCount > prevCountRef.current) block, prevCountRef.current is updated
  const ifBlockMatch = content.match(/if\s*\(cartCount\s*>\s*prevCountRef\.current\)\s*\{[\s\S]*?prevCountRef\.current\s*=\s*cartCount;[\s\S]*?return/);
  assert(ifBlockMatch !== null, 'prevCountRef.current must be updated inside increment branch before early return');
});

// 2. HeroLookbook.jsx Verification
test('HeroLookbook flank coordinates activate at 1440px viewport (min-[1400px]:flex)', () => {
  const content = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  assert(content.includes('min-[1400px]:flex'), 'Flank coordinates must be visible on 1440px via min-[1400px]:flex');
  assert(content.includes('2xl:flex'), 'Must retain 2xl:flex support');
  assert(content.includes('HAUTE COUTURE /// N° 01'), 'Must include left coordinate');
  assert(content.includes('PARIS — HANOI'), 'Must include Paris Hanoi coordinate');
});

test('HeroLookbook preserves May&nbsp;Đo non-breaking space in H1', () => {
  const content = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  assert(content.includes('May&nbsp;Đo'), 'H1 headline must bind May&nbsp;Đo with non-breaking space');
});

test('HeroLookbook provides refined object-[center_20%] while preserving test 15.1 compatibility', () => {
  const content = fs.readFileSync(path.join(projectRoot, 'src/components/HeroLookbook.jsx'), 'utf8');
  assert(content.includes('object-[center_28%]'), 'Must retain object-[center_28%] for 15.1 contract');
  assert(content.includes('sm:object-[center_20%]'), 'Must provide refined sm:object-[center_20%]');
});

// 3. Staggered Cascades
test('CategoryShowcase provides reveal-child stagger on category switcher items', () => {
  const content = fs.readFileSync(path.join(projectRoot, 'src/components/CategoryShowcase.jsx'), 'utf8');
  assert(content.includes('reveal-child'), 'Category items must have reveal-child');
  assert(content.includes('stagger-'), 'Category items must specify stagger class');
});

test('AtelierStory provides reveal-child stagger on 4 craftsmanship pillars', () => {
  const content = fs.readFileSync(path.join(projectRoot, 'src/components/AtelierStory.jsx'), 'utf8');
  assert(content.includes('reveal-child'), 'Craftsmanship pillars must have reveal-child');
  assert(content.includes('stagger-'), 'Craftsmanship pillars must specify stagger class');
});

// 4. CSS Engine Verification
test('index.css defines reveal-child, fadeIn keyframes, active-haptic, and prefers-reduced-motion overrides', () => {
  const content = fs.readFileSync(path.join(projectRoot, 'src/index.css'), 'utf8');
  assert(content.includes('.reveal-child'), 'Must define .reveal-child');
  assert(content.includes('.animate-fadeIn') || content.includes('.animate-fade-in'), 'Must define .animate-fadeIn');
  assert(content.includes('active-haptic'), 'Must define active-haptic');
  assert(content.includes('animate-modal-spring'), 'Must define animate-modal-spring');
  assert(content.includes('prefers-reduced-motion'), 'Must handle prefers-reduced-motion');
});

// 5. useScrollReveal Safety
test('useScrollReveal guards against undefined matchMedia and safe entry access', () => {
  const content = fs.readFileSync(path.join(projectRoot, 'src/hooks/useScrollReveal.js'), 'utf8');
  assert(content.includes('typeof window !== \'undefined\''), 'Must guard window');
  assert(content.includes('matchMedia'), 'Must check matchMedia');
  assert(content.includes('entries[0]'), 'Must safely read entries[0]');
});

console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
