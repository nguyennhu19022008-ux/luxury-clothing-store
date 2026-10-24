/**
 * adversarial_converging_motion_oracle.cjs
 * Empirical Adversarial Challenger & Oracle for Converging Lateral Scroll Reveal & Compact Card Sizing
 *
 * Verifies:
 * 1. Lateral converging motion engine (.reveal-slide-left & .reveal-slide-right) in index.css
 * 2. Accessibility: prefers-reduced-motion suppression
 * 3. Alternating left-to-right & right-to-left cascade in MagazineLookbookGrid
 * 4. Compact card scale bounds (max-w-[480px] / max-w-[760px]) & 16:9 ratio in ProductCard
 * 5. Architectural square edges (rounded-none) preserved
 * 6. Cross-section converging motion (Hero, Category, Lookbook, Atelier)
 * 7. Zero emoji invariant
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const projectRoot = path.resolve(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  bold: '\x1b[1m',
};

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function runTest(suite, name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ${colors.green}✔ PASS${colors.reset} [${suite}] ${name}`);
  } catch (err) {
    failedTests++;
    console.error(`  ${colors.red}✖ FAIL${colors.reset} [${suite}] ${name}`);
    console.error(`    ${colors.red}${err.message}${colors.reset}`);
  }
}

function readFile(relPath) {
  return fs.readFileSync(path.join(projectRoot, relPath), 'utf8');
}

console.log(`\n${colors.bold}${colors.cyan}======================================================================${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}  CONVERGING LATERAL MOTION & COMPACT CARD SIZING ADVERSARIAL ORACLE  ${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}======================================================================${colors.reset}\n`);

// -----------------------------------------------------------------------------
// SUITE 1: Lateral Converging CSS Engine & Reduced-Motion
// -----------------------------------------------------------------------------
console.log(`${colors.bold}${colors.yellow}► SUITE 1: Lateral Converging Motion Engine & Accessibility${colors.reset}`);

runTest('CSS Engine', '.reveal-slide-left defines negative translateX offset and luxury cubic-bezier', () => {
  const css = readFile('src/index.css');
  assert(css.includes('.reveal-slide-left'), 'index.css must declare .reveal-slide-left');
  assert(css.includes('translateX(-40px)'), 'reveal-slide-left must have negative translateX offset');
  assert(css.includes('cubic-bezier(0.16, 1, 0.3, 1)'), 'Must use cubic-bezier(0.16, 1, 0.3, 1) easing');
});

runTest('CSS Engine', '.reveal-slide-right defines positive translateX offset and luxury cubic-bezier', () => {
  const css = readFile('src/index.css');
  assert(css.includes('.reveal-slide-right'), 'index.css must declare .reveal-slide-right');
  assert(css.includes('translateX(40px)'), 'reveal-slide-right must have positive translateX offset');
});

runTest('CSS Engine', 'Both classes reset to translateX(0) and opacity 1 upon .is-revealed', () => {
  const css = readFile('src/index.css');
  assert(css.includes('.reveal-slide-left.is-revealed'), 'Must declare .reveal-slide-left.is-revealed');
  assert(css.includes('.reveal-slide-right.is-revealed'), 'Must declare .reveal-slide-right.is-revealed');
  assert(css.includes('translateX(0) translateY(0)'), 'Must reset transform to (0, 0)');
});

runTest('CSS Engine', 'prefers-reduced-motion suppresses lateral slide transforms', () => {
  const css = readFile('src/index.css');
  const reducedMotionBlock = css.substring(css.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert(reducedMotionBlock.includes('.reveal-slide-left'), 'reduced-motion block must include .reveal-slide-left');
  assert(reducedMotionBlock.includes('.reveal-slide-right'), 'reduced-motion block must include .reveal-slide-right');
  assert(reducedMotionBlock.includes('transform: none !important'), 'reduced-motion must force transform: none');
});

// -----------------------------------------------------------------------------
// SUITE 2: Compact Card Scale & Square Geometry in ProductCard
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.yellow}► SUITE 2: ProductCard Compact Scale & Geometry${colors.reset}`);

runTest('ProductCard', 'ProductCard caps width to max-w-[480px] for standard cards', () => {
  const code = readFile('src/components/ProductCard.jsx');
  assert(code.includes('max-w-[480px]'), 'ProductCard must enforce max-w-[480px] on standard cards to prevent oversized display');
});

runTest('ProductCard', 'ProductCard caps width to max-w-[760px] for spotlight cards', () => {
  const code = readFile('src/components/ProductCard.jsx');
  assert(code.includes('max-w-[760px]'), 'ProductCard must enforce max-w-[760px] on spotlight card');
});

runTest('ProductCard', 'ProductCard maintains strict rounded-none architectural edges', () => {
  const code = readFile('src/components/ProductCard.jsx');
  assert(code.includes('rounded-none overflow-hidden'), 'Outer article must enforce rounded-none overflow-hidden');
  assert(!code.includes('rounded-2xl'), 'Outer article must NOT contain rounded-2xl');
  assert(!code.includes('rounded-xl'), 'Media frame must NOT contain rounded-xl');
});

runTest('ProductCard', 'ProductCard media frame maintains aspect-[16/9] widescreen ratio', () => {
  const code = readFile('src/components/ProductCard.jsx');
  assert(code.includes('aspect-[16/9]'), 'Media frame must enforce aspect-[16/9]');
});

runTest('ProductCard', 'ProductCard accepts revealClass prop with fallback', () => {
  const code = readFile('src/components/ProductCard.jsx');
  assert(code.includes('revealClass = \'\''), 'ProductCard must support revealClass prop');
  assert(code.includes('animationRevealClass = revealClass || \'reveal-on-scroll\''), 'Must provide fallback animation class');
});

// -----------------------------------------------------------------------------
// SUITE 3: MagazineLookbookGrid Converging Rhythm
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.yellow}► SUITE 3: MagazineLookbookGrid Alternating Lateral Rhythm${colors.reset}`);

runTest('LookbookGrid', 'Products grid passes alternating reveal-slide-left and reveal-slide-right', () => {
  const code = readFile('src/components/MagazineLookbookGrid.jsx');
  assert(code.includes('reveal-slide-left'), 'Must assign reveal-slide-left to left column');
  assert(code.includes('reveal-slide-right'), 'Must assign reveal-slide-right to right column');
  assert(code.includes('idx % 2 === 1'), 'Must alternate based on odd/even column modulo');
});

runTest('LookbookGrid', 'Products grid centers cards within columns using flex justify-center', () => {
  const code = readFile('src/components/MagazineLookbookGrid.jsx');
  assert(code.includes('flex justify-center'), 'Must center constrained cards with flex justify-center');
});

runTest('LookbookGrid', 'Lookbook Interlude split assigns reveal-slide-left to Look 02 and reveal-slide-right to Manifesto', () => {
  const code = readFile('src/components/MagazineLookbookGrid.jsx');
  assert(code.includes('reveal-slide-left relative bg-luxury-ivory'), 'Look 02 visual must have reveal-slide-left');
  assert(code.includes('reveal-slide-right flex flex-col justify-between'), 'Manifesto column must have reveal-slide-right');
});

// -----------------------------------------------------------------------------
// SUITE 4: Cross-Section Converging Motion Harmony
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.yellow}► SUITE 4: Cross-Section Converging Motion Harmony${colors.reset}`);

runTest('Cross-Section', 'HeroLookbook coordinates reveal-slide-left (narrative) and reveal-slide-right (visual)', () => {
  const code = readFile('src/components/HeroLookbook.jsx');
  assert(code.includes('reveal-slide-left'), 'HeroLookbook must include reveal-slide-left');
  assert(code.includes('reveal-slide-right'), 'HeroLookbook must include reveal-slide-right');
});

runTest('Cross-Section', 'CategoryShowcase coordinates reveal-slide-left (bento) and reveal-slide-right (showcase)', () => {
  const code = readFile('src/components/CategoryShowcase.jsx');
  assert(code.includes('reveal-slide-left'), 'CategoryShowcase must include reveal-slide-left');
  assert(code.includes('reveal-slide-right'), 'CategoryShowcase must include reveal-slide-right');
});

runTest('Cross-Section', 'AtelierStory coordinates reveal-slide-left (artisan) and reveal-slide-right (manifesto)', () => {
  const code = readFile('src/components/AtelierStory.jsx');
  assert(code.includes('reveal-slide-left'), 'AtelierStory must include reveal-slide-left');
  assert(code.includes('reveal-slide-right'), 'AtelierStory must include reveal-slide-right');
});

// -----------------------------------------------------------------------------
// SUITE 5: Global Zero-Emoji Invariant
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.yellow}► SUITE 5: Global Code Purity & Zero-Emoji Invariant${colors.reset}`);

runTest('Emoji Purity', 'Zero emoji characters exist in src/ directory', () => {
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/u;
  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (/\.(jsx?|tsx?|css|html)$/.test(entry.name)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const match = content.match(emojiRegex);
        assert(!match, `Found emoji "${match?.[0]}" in file ${path.relative(projectRoot, fullPath)}`);
      }
    }
  }
  scanDir(path.join(projectRoot, 'src'));
});

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.cyan}======================================================================${colors.reset}`);
console.log(`  TOTAL TESTS: ${totalTests}`);
console.log(`  PASSED:      ${colors.green}${passedTests}${colors.reset}`);
console.log(`  FAILED:      ${failedTests > 0 ? colors.red : colors.green}${failedTests}${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}======================================================================${colors.reset}\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log(`${colors.green}${colors.bold}VERDICT: APPROVE — 100% Converging Lateral Motion & Compact Cards Certified!${colors.reset}\n`);
}
