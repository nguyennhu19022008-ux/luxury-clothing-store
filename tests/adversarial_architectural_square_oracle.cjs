/**
 * adversarial_architectural_square_oracle.cjs
 * Empirical Adversarial Challenger & Oracle for Sharp Architectural Square Edges & Geometric Tension
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
console.log(`${colors.bold}${colors.cyan}  ARCHITECTURAL SQUARE EDGES & GEOMETRIC TENSION ADVERSARIAL ORACLE   ${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}======================================================================${colors.reset}\n`);

// -----------------------------------------------------------------------------
// SUITE 1: ProductCard Sharp Architectural Edges
// -----------------------------------------------------------------------------
console.log(`${colors.bold}${colors.yellow}► SUITE 1: ProductCard Sharp Edges & 16:9 Frame${colors.reset}`);

runTest('ProductCard', 'Outer article card enforces rounded-none (bans rounded-2xl)', () => {
  const code = readFile('src/components/ProductCard.jsx');
  assert(!code.includes('rounded-2xl'), 'ProductCard must NOT contain rounded-2xl');
  assert(code.includes('rounded-none overflow-hidden'), 'ProductCard outer container must enforce rounded-none overflow-hidden');
});

runTest('ProductCard', 'Inner media frame enforces rounded-none border-b border-luxury-sand/60', () => {
  const code = readFile('src/components/ProductCard.jsx');
  assert(!code.includes('rounded-xl'), 'ProductCard must NOT contain rounded-xl on media frame');
  assert(
    code.includes('aspect-[16/9]') && code.includes('rounded-none') && code.includes('border-b border-luxury-sand/60'),
    'ProductCard visual frame must have aspect-[16/9], rounded-none, and border-b border-luxury-sand/60'
  );
});

runTest('ProductCard', 'Interactive CTAs and swatches retain rounded-full for geometric tension', () => {
  const code = readFile('src/components/ProductCard.jsx');
  assert(code.includes('rounded-full') && code.includes('Xem Nhanh'), 'Xem Nhanh button must maintain rounded-full');
  assert(code.includes('rounded-full') && code.includes('Mua Ngay'), 'Mua Ngay button must maintain rounded-full');
  assert(code.includes('w-3.5 h-3.5 rounded-full'), 'Color swatches must retain rounded-full circles');
});

// -----------------------------------------------------------------------------
// SUITE 2: HeroLookbook Architectural Framing
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.yellow}► SUITE 2: HeroLookbook Architectural Framing${colors.reset}`);

runTest('HeroLookbook', 'Outer lookbook shell and offset backplate enforce rounded-none (bans rounded-3xl)', () => {
  const code = readFile('src/components/HeroLookbook.jsx');
  assert(!code.includes('rounded-3xl'), 'HeroLookbook must NOT contain rounded-3xl');
  assert(code.includes('parallax-slow') && code.includes('rounded-none'), 'HeroLookbook backplate must enforce rounded-none');
  assert(code.includes('shadow-2xl backdrop-blur-sm') && code.includes('rounded-none'), 'HeroLookbook shell must enforce rounded-none');
});

runTest('HeroLookbook', 'Inner 16:9 core frame enforces rounded-none (bans rounded-[calc...])', () => {
  const code = readFile('src/components/HeroLookbook.jsx');
  assert(!code.includes('rounded-[calc'), 'HeroLookbook inner frame must NOT contain rounded-[calc...]');
  assert(code.includes('aspect-[16/9] rounded-none overflow-hidden'), 'HeroLookbook inner frame must enforce aspect-[16/9] rounded-none overflow-hidden');
});

runTest('HeroLookbook', 'Bottom lookbook tag plaque enforces rounded-none border border-luxury-sand', () => {
  const code = readFile('src/components/HeroLookbook.jsx');
  assert(!code.includes('rounded-xl'), 'HeroLookbook tag plaque must NOT contain rounded-xl');
  assert(
    code.includes('border border-luxury-sand text-left rounded-none'),
    'HeroLookbook bottom tag plaque must enforce border border-luxury-sand and rounded-none'
  );
});

// -----------------------------------------------------------------------------
// SUITE 3: CategoryShowcase Monolith Plinths & Filmstrip
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.yellow}► SUITE 3: CategoryShowcase Monolith Plinths & Filmstrip${colors.reset}`);

runTest('CategoryShowcase', 'Category switcher items (01..05) enforce rounded-none (bans rounded-xl)', () => {
  const code = readFile('src/components/CategoryShowcase.jsx');
  assert(code.includes('border rounded-none flex items-center justify-between'), 'Category switcher buttons must enforce rounded-none');
});

runTest('CategoryShowcase', 'Master 16:9 showcase frame enforces rounded-none (bans rounded-2xl)', () => {
  const code = readFile('src/components/CategoryShowcase.jsx');
  assert(!code.includes('rounded-2xl'), 'CategoryShowcase must NOT contain rounded-2xl');
  assert(code.includes('aspect-[16/9] bg-luxury-ivory border border-[#D8D0C3] rounded-none'), 'CategoryShowcase 16:9 master frame must enforce rounded-none');
});

runTest('CategoryShowcase', 'Bottom detail plaque enforces rounded-none border border-luxury-sand', () => {
  const code = readFile('src/components/CategoryShowcase.jsx');
  assert(code.includes('p-3.5 sm:p-4 rounded-none border border-luxury-sand flex items-center'), 'Category bottom plaque must enforce rounded-none');
});

runTest('CategoryShowcase', 'Filmstrip carousel thumbnails and index badges enforce rounded-none', () => {
  const code = readFile('src/components/CategoryShowcase.jsx');
  assert(!code.includes('rounded-lg'), 'CategoryShowcase filmstrip must NOT contain rounded-lg');
  assert(code.includes('aspect-[16/9] flex-1 min-w-[70px] rounded-none overflow-hidden'), 'Filmstrip thumbnails must enforce rounded-none');
  assert(code.includes('font-mono text-white rounded-none'), 'Thumbnail index badge must enforce rounded-none');
});

// -----------------------------------------------------------------------------
// SUITE 4: AtelierStory Obsidian Monoliths & Archive Frame
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.yellow}► SUITE 4: AtelierStory Obsidian Monoliths & Archive Frame${colors.reset}`);

runTest('AtelierStory', 'Artisan photography outer shell and inner 16:9 frame enforce rounded-none', () => {
  const code = readFile('src/components/AtelierStory.jsx');
  assert(!code.includes('rounded-3xl'), 'AtelierStory must NOT contain rounded-3xl');
  assert(!code.includes('rounded-[calc'), 'AtelierStory must NOT contain rounded-[calc...]');
  assert(code.includes('bg-neutral-900/90 rounded-none border border-luxury-gold/40'), 'AtelierStory photo shell must enforce rounded-none');
  assert(code.includes('aspect-[16/9] bg-black rounded-none overflow-hidden'), 'AtelierStory inner frame must enforce aspect-[16/9] rounded-none');
});

runTest('AtelierStory', 'Bottom archive plaque enforces rounded-none', () => {
  const code = readFile('src/components/AtelierStory.jsx');
  assert(!code.includes('rounded-xl'), 'AtelierStory plaque must NOT contain rounded-xl');
  assert(code.includes('border border-white/15 rounded-none'), 'AtelierStory bottom archive plaque must enforce rounded-none');
});

runTest('AtelierStory', '4 Craftsmanship pillars enforce rounded-none (bans rounded-2xl)', () => {
  const code = readFile('src/components/AtelierStory.jsx');
  assert(!code.includes('rounded-2xl'), 'AtelierStory pillars must NOT contain rounded-2xl');
  assert(code.includes('border border-white/10 hover:border-luxury-gold/50 rounded-none'), 'All 4 craftsmanship pillars must enforce rounded-none');
});

// -----------------------------------------------------------------------------
// SUITE 5: FabricInspectorModal Architectural Consistency
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.yellow}► SUITE 5: FabricInspectorModal Architectural Consistency${colors.reset}`);

runTest('FabricInspectorModal', 'Modal container enforces rounded-none (bans rounded-3xl)', () => {
  const code = readFile('src/components/FabricInspectorModal.jsx');
  assert(!code.includes('rounded-3xl'), 'FabricInspectorModal must NOT contain rounded-3xl');
  assert(code.includes('shadow-2xl rounded-none p-6 sm:p-8'), 'FabricInspectorModal container must enforce rounded-none');
});

runTest('FabricInspectorModal', 'Interactive visual lens shell and inner 16:9 frame enforce rounded-none', () => {
  const code = readFile('src/components/FabricInspectorModal.jsx');
  assert(!code.includes('rounded-[calc'), 'FabricInspectorModal lens must NOT contain rounded-[calc...]');
  assert(code.includes('bg-luxury-ivory/60 rounded-none border'), 'FabricInspectorModal lens outer shell must enforce rounded-none');
  assert(code.includes('aspect-[16/9] w-full rounded-none overflow-hidden'), 'FabricInspectorModal inner 16:9 frame must enforce rounded-none');
});

// -----------------------------------------------------------------------------
// SUITE 6: Global Purity & Zero Bubble-Rounding Audit
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.yellow}► SUITE 6: Global Purity & Zero Bubble-Rounding Audit${colors.reset}`);

runTest('Global Audit', 'Zero bubble-rounding classes (rounded-2xl, rounded-3xl, rounded-xl, rounded-lg, rounded-md, rounded-sm) in src/', () => {
  function walk(dir) {
    let files = [];
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      if (fs.statSync(full).isDirectory()) files.push(...walk(full));
      else if (full.endsWith('.jsx') || full.endsWith('.js') || full.endsWith('.css')) files.push(full);
    }
    return files;
  }

  const files = walk(path.join(projectRoot, 'src'));
  const violations = [];
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = [...content.matchAll(/rounded(-[a-z0-9\[\]]+)?/g)].map((m) => m[0]);
    const nonCompliant = matches.filter((m) => m !== 'rounded-full' && m !== 'rounded-none');
    if (nonCompliant.length > 0) {
      violations.push({ file: path.relative(projectRoot, file), nonCompliant });
    }
  }

  assert(
    violations.length === 0,
    `Found non-compliant rounded classes in: ${JSON.stringify(violations, null, 2)}`
  );
});

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.cyan}======================================================================${colors.reset}`);
console.log(`  TOTAL TESTS: ${totalTests}`);
console.log(`  ${colors.green}PASSED:      ${passedTests}${colors.reset}`);
console.log(`  ${failedTests > 0 ? colors.red : colors.green}FAILED:      ${failedTests}${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}======================================================================${colors.reset}\n`);

if (failedTests > 0) {
  console.error(`${colors.bold}${colors.red}VERDICT: REJECT — Architectural square edge requirements failed!${colors.reset}\n`);
  process.exit(1);
} else {
  console.log(`${colors.bold}${colors.green}VERDICT: APPROVE — 100% Architectural Square Edges & Geometric Tension Certified!${colors.reset}\n`);
  process.exit(0);
}
