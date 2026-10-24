/**
 * adversarial_fullbleed_whitespace_oracle.cjs
 * Empirical Adversarial Challenger & Oracle for Full-Bleed Edge-to-Edge Layout & Whitespace Optimization
 *
 * Verifies:
 * 1. Full-bleed spread architecture across all core sections
 * 2. Center-spine card alignment eliminating empty central canyon
 * 3. Fluid responsive card scale bounds (max-w-[480px] / max-w-[760px]) & 16:9 ratio
 * 4. Architectural square edges (rounded-none) preserved
 * 5. Elimination of dead space inside cards (mt-auto price anchor)
 * 6. Zero emoji invariant
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
console.log(`${colors.bold}${colors.cyan}  FULL-BLEED EDGE-TO-EDGE & WHITESPACE OPTIMIZATION ADVERSARIAL ORACLE ${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}======================================================================${colors.reset}\n`);

// -----------------------------------------------------------------------------
// SUITE 1: Full-Bleed Spread Architecture
// -----------------------------------------------------------------------------
console.log(`${colors.bold}${colors.yellow}► SUITE 1: Full-Bleed Spread Architecture${colors.reset}`);

runTest('Full-Bleed CSS', 'index.css defines .full-bleed-spread utility with fluid edge padding scale', () => {
  const css = readFile('src/index.css');
  assert(css.includes('.full-bleed-spread'), 'index.css must declare .full-bleed-spread');
  assert(css.includes('width: 100%'), 'full-bleed-spread must set width: 100%');
  assert(css.includes('max-width: none'), 'full-bleed-spread must set max-width: none');
});

runTest('Full-Bleed Sections', 'All core sections enforce edge-to-edge full-bleed padding scale', () => {
  const files = [
    'src/components/HeroLookbook.jsx',
    'src/components/CategoryShowcase.jsx',
    'src/components/MagazineLookbookGrid.jsx',
    'src/components/AtelierStory.jsx',
  ];
  for (const f of files) {
    const code = readFile(f);
    assert(
      code.includes('w-full max-w-none px-6 sm:px-12 lg:px-16 xl:px-24'),
      `${f} must declare full-bleed fluid padding scale`
    );
  }
});

// -----------------------------------------------------------------------------
// SUITE 2: Center-Spine Alignment & Whitespace Optimization
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.yellow}► SUITE 2: Center-Spine Alignment & Whitespace Optimization${colors.reset}`);

runTest('Spine Alignment', 'MagazineLookbookGrid implements center-spine alignment for left and right columns', () => {
  const code = readFile('src/components/MagazineLookbookGrid.jsx');
  assert(code.includes('lg:justify-end'), 'Left column must anchor rightward towards the center spine (lg:justify-end)');
  assert(code.includes('lg:justify-start'), 'Right column must anchor leftward towards the center spine (lg:justify-start)');
  assert(code.includes('justify-center'), 'Must fallback to justify-center on mobile');
});

runTest('Spine Alignment', 'Products grid connects cards with calibrated gap and full-width spread', () => {
  const code = readFile('src/components/MagazineLookbookGrid.jsx');
  assert(code.includes('gap-6 lg:gap-8 xl:gap-12'), 'Must declare calibrated grid gap (gap-6 lg:gap-8 xl:gap-12)');
  assert(code.includes('w-full'), 'Grid container must declare w-full for edge-to-edge spread');
});

runTest('Internal Whitespace', 'ProductCard eliminates vertical dead space with mt-auto price anchor', () => {
  const code = readFile('src/components/ProductCard.jsx');
  assert(code.includes('mt-auto pt-2'), 'ProductCard must anchor price row with mt-auto pt-2');
  assert(!code.includes('justify-between flex-grow space-y-2.5'), 'Must avoid loose justify-between spacing that creates dead gaps');
});

// -----------------------------------------------------------------------------
// SUITE 3: Fluid Card Scale Bounds & 16:9 Aspect Ratio
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.yellow}► SUITE 3: Fluid Card Scale Bounds & 16:9 Aspect Ratio${colors.reset}`);

runTest('Scale Bounds', 'ProductCard retains max-w-[480px] baseline with responsive widescreen scaling', () => {
  const code = readFile('src/components/ProductCard.jsx');
  assert(code.includes('max-w-[480px]'), 'Must retain max-w-[480px] for baseline card scale');
  assert(code.includes('xl:max-w-[580px]'), 'Must support fluid widescreen scaling with xl:max-w-[580px]');
});

runTest('Scale Bounds', 'ProductCard retains max-w-[760px] baseline for spotlight card with responsive spread', () => {
  const code = readFile('src/components/ProductCard.jsx');
  assert(code.includes('max-w-[760px]'), 'Must retain max-w-[760px] for spotlight baseline');
  assert(code.includes('xl:max-w-5xl') || code.includes('2xl:max-w-6xl'), 'Must support full-bleed spotlight scaling');
});

runTest('Ratio & Geometry', 'ProductCard strictly enforces aspect-[16/9] and rounded-none', () => {
  const code = readFile('src/components/ProductCard.jsx');
  assert(code.includes('aspect-[16/9]'), 'ProductCard must enforce aspect-[16/9]');
  assert(code.includes('rounded-none overflow-hidden'), 'ProductCard must enforce rounded-none overflow-hidden');
  assert(!code.includes('rounded-2xl'), 'Must ban rounded-2xl');
  assert(!code.includes('rounded-xl'), 'Must ban rounded-xl');
});

// -----------------------------------------------------------------------------
// SUITE 4: Zero-Emoji Invariant
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.yellow}► SUITE 4: Global Code Purity & Zero-Emoji Invariant${colors.reset}`);

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
  console.log(`${colors.green}${colors.bold}VERDICT: APPROVE — 100% Full-Bleed Edge-to-Edge & Whitespace Certified!${colors.reset}\n`);
}
