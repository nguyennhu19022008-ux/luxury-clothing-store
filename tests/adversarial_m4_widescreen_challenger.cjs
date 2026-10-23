/**
 * Adversarial M4 Widescreen Challenger Test Harness
 * Empirical Verification of:
 * 1. 16:9 Widescreen aspect ratio enforcement
 * 2. Split 2-Column layout architecture
 * 3. Anti-narrow wrapping, text-wrap balance & pretty, max-w-[75ch] bounds
 * 4. Direct storefront entry & Slide 0 modal integration (M4 R1 contract)
 * 5. Production build bundle verification
 *
 * Usage: node tests/adversarial_m4_widescreen_challenger.cjs
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'src');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(
      `${message ? message + ' - ' : ''}Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
    );
  }
}

function runTest(suite, name, fn) {
  totalTests++;
  const start = Date.now();
  try {
    fn();
    const duration = Date.now() - start;
    passedTests++;
    console.log(`  ${colors.green}✔ PASS${colors.reset} [${suite}] ${name} ${colors.dim}(${duration}ms)${colors.reset}`);
  } catch (err) {
    const duration = Date.now() - start;
    failedTests++;
    failures.push({ suite, name, error: err.message });
    console.error(`  ${colors.red}✖ FAIL${colors.reset} [${suite}] ${name} ${colors.dim}(${duration}ms)${colors.reset}`);
    console.error(`     ${colors.red}${err.message}${colors.reset}`);
  }
}

function readFile(relPath) {
  const fullPath = path.join(projectRoot, relPath);
  assert(fs.existsSync(fullPath), `Target file does not exist: ${relPath}`);
  return fs.readFileSync(fullPath, 'utf8');
}

console.log(`${colors.bold}${colors.cyan}======================================================================${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}  EMPIRICAL ADVERSARIAL CHALLENGER SUITE: MILESTONE M4               ${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}  Widescreen (16:9), 2-Col Split, Anti-Narrow Typography, & Build    ${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}======================================================================${colors.reset}\n`);

// ============================================================================
// SUITE 1: 16:9 Widescreen Ratio Enforcement Across All Target Components
// ============================================================================
console.log(`${colors.bold}${colors.yellow}► SUITE 1: 16:9 Widescreen Ratio Enforcement${colors.reset}`);

runTest('16:9 Widescreen', 'HeroLookbook image frame enforces aspect-[16/9] or aspect-video', () => {
  const content = readFile('src/components/HeroLookbook.jsx');
  const hasAspect169 = content.includes('aspect-[16/9]') || content.includes('aspect-video');
  assert(hasAspect169, 'HeroLookbook must enforce aspect-[16/9] or aspect-video on its image container');
  assert(content.includes('object-cover'), 'HeroLookbook image must use object-cover');
  assert(content.includes('overflow-hidden'), 'HeroLookbook frame must use overflow-hidden');
});

runTest('16:9 Widescreen', 'CategoryShowcase master frame enforces aspect-[16/9] or aspect-video', () => {
  const content = readFile('src/components/CategoryShowcase.jsx');
  const hasAspect169 = content.includes('aspect-[16/9]') || content.includes('aspect-video');
  assert(hasAspect169, 'CategoryShowcase must enforce aspect-[16/9] or aspect-video on showcase frame');
  assert(content.includes('object-cover'), 'CategoryShowcase image must use object-cover');
  assert(content.includes('overflow-hidden'), 'CategoryShowcase frame must use overflow-hidden');
});

runTest('16:9 Widescreen', 'MagazineLookbookGrid editorial spreads enforce aspect-[16/9] or aspect-video', () => {
  const content = readFile('src/components/MagazineLookbookGrid.jsx');
  const hasAspect169 = content.includes('aspect-[16/9]') || content.includes('aspect-video');
  assert(hasAspect169, 'MagazineLookbookGrid must enforce aspect-[16/9] on lookbook spreads');
  assert(content.includes('overflow-hidden'), 'MagazineLookbookGrid visual frames must use overflow-hidden');
});

runTest('16:9 Widescreen', 'ProductCard visual frame enforces aspect-[16/9] or aspect-video', () => {
  const content = readFile('src/components/ProductCard.jsx');
  const hasAspect169 = content.includes('aspect-[16/9]') || content.includes('aspect-video');
  assert(hasAspect169, 'ProductCard must enforce aspect-[16/9] or aspect-video on product media frame');
  assert(content.includes('object-cover'), 'ProductCard image must use object-cover');
  assert(content.includes('overflow-hidden'), 'ProductCard image container must use overflow-hidden');
});

runTest('16:9 Widescreen', 'AtelierStory artisan photography enforces aspect-[16/9] or aspect-video', () => {
  const content = readFile('src/components/AtelierStory.jsx');
  const hasAspect169 = content.includes('aspect-[16/9]') || content.includes('aspect-video');
  assert(hasAspect169, 'AtelierStory must enforce aspect-[16/9] or aspect-video on photography frame');
  assert(content.includes('object-cover'), 'AtelierStory image must use object-cover');
  assert(content.includes('overflow-hidden'), 'AtelierStory image frame must use overflow-hidden');
});

runTest('16:9 Widescreen', 'Widescreen aspect classes are uniformly syntax-compliant', () => {
  const files = [
    'src/components/HeroLookbook.jsx',
    'src/components/CategoryShowcase.jsx',
    'src/components/MagazineLookbookGrid.jsx',
    'src/components/ProductCard.jsx',
    'src/components/AtelierStory.jsx',
  ];
  for (const f of files) {
    const content = readFile(f);
    const matches = content.match(/aspect-\[[^\]]+\]/g) || [];
    for (const m of matches) {
      assert(m === 'aspect-[16/9]', `File ${f} contains unexpected arbitrary aspect ratio ${m}, expected aspect-[16/9]`);
    }
  }
});

// ============================================================================
// SUITE 2: Split 2-Column Layout Architecture Across All Sections
// ============================================================================
console.log(`\n${colors.bold}${colors.yellow}► SUITE 2: Split 2-Column Layout Architecture${colors.reset}`);

runTest('Split 2-Column', 'HeroLookbook uses 2-column grid architecture (lg:grid-cols-2)', () => {
  const content = readFile('src/components/HeroLookbook.jsx');
  assert(content.includes('lg:grid-cols-2'), 'HeroLookbook must declare lg:grid-cols-2');
  assert(content.includes('grid-cols-1'), 'HeroLookbook must be mobile-responsive (grid-cols-1)');
});

runTest('Split 2-Column', 'CategoryShowcase uses 2-column master-detail layout (lg:grid-cols-2)', () => {
  const content = readFile('src/components/CategoryShowcase.jsx');
  assert(content.includes('lg:grid-cols-2'), 'CategoryShowcase must declare lg:grid-cols-2 for master-detail');
  assert(content.includes('grid-cols-1'), 'CategoryShowcase must be mobile-responsive (grid-cols-1)');
});

runTest('Split 2-Column', 'MagazineLookbookGrid uses 2-column catalog grid and 2-column editorial spread', () => {
  const content = readFile('src/components/MagazineLookbookGrid.jsx');
  const occurrences = (content.match(/lg:grid-cols-2/g) || []).length;
  assert(occurrences >= 2, `MagazineLookbookGrid must feature at least 2 distinct lg:grid-cols-2 layouts (found ${occurrences})`);
});

runTest('Split 2-Column', 'AtelierStory uses balanced 2-column split (lg:grid-cols-2)', () => {
  const content = readFile('src/components/AtelierStory.jsx');
  assert(content.includes('lg:grid-cols-2'), 'AtelierStory must declare lg:grid-cols-2');
});

runTest('Split 2-Column', 'Footer uses balanced 2-column architectural split (lg:grid-cols-2)', () => {
  const content = readFile('src/components/Footer.jsx');
  assert(content.includes('lg:grid-cols-2'), 'Footer must declare lg:grid-cols-2');
});

// ============================================================================
// SUITE 3: Anti-Narrow Wrapping, Text-Wrap, and Line-Length Constraints
// ============================================================================
console.log(`\n${colors.bold}${colors.yellow}► SUITE 3: Anti-Narrow Wrapping & Typography Bounds${colors.reset}`);

runTest('Anti-Narrow Wrapping', 'CategoryShowcase has NO grid-cols-5 cramped cards', () => {
  const content = readFile('src/components/CategoryShowcase.jsx');
  assert(!content.includes('grid-cols-5'), 'CategoryShowcase must NOT contain grid-cols-5');
  assert(!content.includes('sm:grid-cols-5'), 'CategoryShowcase must NOT contain sm:grid-cols-5');
  assert(!content.includes('md:grid-cols-5'), 'CategoryShowcase must NOT contain md:grid-cols-5');
  assert(!content.includes('lg:grid-cols-5'), 'CategoryShowcase must NOT contain lg:grid-cols-5');
});

runTest('Anti-Narrow Wrapping', 'src/index.css defines global text-wrap: balance and text-wrap: pretty', () => {
  const content = readFile('src/index.css');
  assert(content.includes('text-wrap: balance'), 'index.css must define text-wrap: balance');
  assert(content.includes('text-wrap: pretty'), 'index.css must define text-wrap: pretty');
});

runTest('Anti-Narrow Wrapping', 'src/index.css defines character bounds (.max-w-prose-optimal 75ch)', () => {
  const content = readFile('src/index.css');
  assert(content.includes('75ch'), 'index.css must define optimal 75ch character bounds');
  assert(content.includes('max-w-prose-optimal'), 'index.css must provide .max-w-prose-optimal');
});

runTest('Anti-Narrow Wrapping', 'tailwind.config.js extends maxWidth with prose bounds', () => {
  const content = readFile('tailwind.config.js');
  assert(content.includes("'75ch'") || content.includes('"75ch"'), 'tailwind.config.js must define 75ch max-width');
});

runTest('Anti-Narrow Wrapping', 'Headings across key components utilize text-balance / text-wrap', () => {
  const files = [
    'src/components/HeroLookbook.jsx',
    'src/components/CategoryShowcase.jsx',
    'src/components/MagazineLookbookGrid.jsx',
    'src/components/ProductCard.jsx',
    'src/components/AtelierStory.jsx',
    'src/components/Footer.jsx',
  ];
  for (const f of files) {
    const content = readFile(f);
    assert(
      content.includes('text-balance') || content.includes('text-wrap: balance'),
      `File ${f} must specify text-balance for headings`
    );
  }
});

runTest('Anti-Narrow Wrapping', 'Paragraphs across key components utilize text-pretty / text-wrap', () => {
  const files = [
    'src/components/HeroLookbook.jsx',
    'src/components/CategoryShowcase.jsx',
    'src/components/MagazineLookbookGrid.jsx',
    'src/components/ProductCard.jsx',
    'src/components/AtelierStory.jsx',
    'src/components/Footer.jsx',
  ];
  for (const f of files) {
    const content = readFile(f);
    assert(
      content.includes('text-pretty') || content.includes('text-wrap: pretty'),
      `File ${f} must specify text-pretty for body text`
    );
  }
});

runTest('Anti-Narrow Wrapping', 'Key prose containers enforce max-w-[75ch] or character bounds', () => {
  const files = [
    'src/components/HeroLookbook.jsx',
    'src/components/CategoryShowcase.jsx',
    'src/components/MagazineLookbookGrid.jsx',
    'src/components/ProductCard.jsx',
    'src/components/AtelierStory.jsx',
  ];
  for (const f of files) {
    const content = readFile(f);
    assert(
      content.includes('max-w-[75ch]') || content.includes('max-w-prose-optimal') || content.includes('max-w-prose'),
      `File ${f} must contain max-w-[75ch] or prose bound constraint`
    );
  }
});

// ============================================================================
// SUITE 4: Direct Storefront Entry & Slide 0 Modal Integration (M4 R1 Contract)
// ============================================================================
console.log(`\n${colors.bold}${colors.yellow}► SUITE 4: Direct Storefront Entry & Modal Architecture${colors.reset}`);

runTest('Storefront Entry & Modal', 'App.jsx initializes directly to Storefront (currentPage === 1)', () => {
  const content = readFile('src/App.jsx');
  assert(content.includes('useState(1)'), 'App.jsx must initialize currentPage to 1 for direct storefront entry');
});

runTest('Storefront Entry & Modal', 'Page0_Copyright is rendered conditionally as modal overlay', () => {
  const content = readFile('src/App.jsx');
  assert(
    content.includes('isCopyrightModalOpen') && content.includes('<Page0_Copyright'),
    'App.jsx must render Page0_Copyright conditioned on isCopyrightModalOpen || currentPage === 0'
  );
});

runTest('Storefront Entry & Modal', 'Header provides VG © 2026 trigger button with ShieldCheck icon', () => {
  const content = readFile('src/components/Header.jsx');
  assert(content.includes('VG © 2026'), 'Header must contain VG © 2026 button text');
  assert(content.includes('ShieldCheck'), 'Header must use Lucide ShieldCheck icon');
  assert(content.includes('onGoToPage0'), 'Header must invoke onGoToPage0');
});

runTest('Storefront Entry & Modal', 'Footer provides dual VG © 2026 trigger buttons with ShieldCheck icon', () => {
  const content = readFile('src/components/Footer.jsx');
  const count = (content.match(/VG © 2026/g) || []).length;
  assert(count >= 2, `Footer must contain at least 2 VG © 2026 triggers (found ${count})`);
  assert(content.includes('ShieldCheck'), 'Footer must use Lucide ShieldCheck icon');
  assert(content.includes('onGoToPage0'), 'Footer must invoke onGoToPage0');
});

runTest('Storefront Entry & Modal', 'Page0_Copyright provides prominent top-right [X] ĐÓNG [ESC] button', () => {
  const content = readFile('src/components/Page0_Copyright.jsx');
  assert(content.includes('ĐÓNG [ESC]'), 'Page0_Copyright must contain ĐÓNG [ESC] button');
  assert(content.includes('handleCloseModal'), 'Page0_Copyright must have handleCloseModal callback');
  assert(content.includes('isOpen'), 'Page0_Copyright must accept isOpen prop');
});

runTest('Storefront Entry & Modal', 'StoreContext manages isCopyrightModalOpen with mutual overlay exclusion', () => {
  const content = readFile('src/context/StoreContext.jsx');
  assert(content.includes('isCopyrightModalOpen'), 'StoreContext must define isCopyrightModalOpen state');
  assert(content.includes('openCopyrightModal'), 'StoreContext must define openCopyrightModal()');
  assert(content.includes('closeCopyrightModal'), 'StoreContext must define closeCopyrightModal()');
  assert(content.includes('setIsCartOpen(false)'), 'openCopyrightModal must close cart overlay');
  assert(content.includes('setQuickViewProduct(null)'), 'openCopyrightModal must close quick view overlay');
  assert(content.includes('setIsQuickOrderOpen(false)'), 'openCopyrightModal must close quick order overlay');
});

// ============================================================================
// SUITE 5: Zero-Emoji Invariant & Anti-Slop Audit
// ============================================================================
console.log(`\n${colors.bold}${colors.yellow}► SUITE 5: Zero-Emoji Invariant & Code Purity Audit${colors.reset}`);

runTest('Code Purity', 'Source code (src/) contains zero emoji characters', () => {
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
  function walkDir(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(walkDir(fullPath));
      } else if (/\.(jsx?|tsx?|css|html)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
    return files;
  }
  const files = walkDir(srcDir);
  for (const f of files) {
    const text = fs.readFileSync(f, 'utf8');
    const match = text.match(emojiRegex);
    assert(!match, `Found illegal emoji "${match ? match[0] : ''}" in file: ${path.relative(projectRoot, f)}`);
  }
});

// ============================================================================
// SUITE 6: Production Build & Bundle Output Verification
// ============================================================================
console.log(`\n${colors.bold}${colors.yellow}► SUITE 6: Production Build & Asset Integrity${colors.reset}`);

runTest('Production Build', 'npm run build executes with exit code 0 and generates clean dist assets', () => {
  try {
    const buildOutput = execSync('npm run build', {
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'pipe'],
      encoding: 'utf8',
      timeout: 30000,
    });
    assert(buildOutput.includes('built in') || fs.existsSync(path.join(projectRoot, 'dist', 'index.html')), 'Build failed to produce dist/index.html');
  } catch (err) {
    throw new Error(`Production build failed: ${err.message}\n${err.stderr || ''}`);
  }

  const distHtml = path.join(projectRoot, 'dist', 'index.html');
  assert(fs.existsSync(distHtml), 'dist/index.html must exist after build');
  const htmlContent = fs.readFileSync(distHtml, 'utf8');
  assert(htmlContent.length > 200, 'dist/index.html appears truncated or empty');

  const assetsDir = path.join(projectRoot, 'dist', 'assets');
  assert(fs.existsSync(assetsDir), 'dist/assets directory must exist');
  const assetFiles = fs.readdirSync(assetsDir);
  const jsBundle = assetFiles.find((f) => f.endsWith('.js'));
  const cssBundle = assetFiles.find((f) => f.endsWith('.css'));
  assert(jsBundle, 'dist/assets must contain compiled JS bundle');
  assert(cssBundle, 'dist/assets must contain compiled CSS bundle');
});

// ============================================================================
// SUMMARY & VERDICT
// ============================================================================
console.log(`\n${colors.bold}${colors.cyan}======================================================================${colors.reset}`);
console.log(`  TOTAL TESTS: ${totalTests}`);
console.log(`  PASSED:      ${colors.green}${passedTests}${colors.reset}`);
console.log(`  FAILED:      ${failedTests > 0 ? colors.red : colors.dim}${failedTests}${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}======================================================================${colors.reset}`);

if (failedTests > 0) {
  console.log(`\n${colors.bold}${colors.red}VERDICT: REJECT — ${failedTests} empirical tests failed!${colors.reset}\n`);
  process.exit(1);
} else {
  console.log(`\n${colors.bold}${colors.green}VERDICT: APPROVE — All Milestone M4 widescreen, responsive, and typography requirements empirically certified!${colors.reset}\n`);
  process.exit(0);
}
