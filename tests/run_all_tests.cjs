/**
 * Master E2E Test Suite Runner
 * Orchestrates Tier 1, Tier 2, Tier 3, and Tier 4 Opaque-Box test suites.
 * Usage: node tests/run_all_tests.cjs
 */

const fs = require('fs');
const path = require('path');
const { colors } = require('./test_harness_utils.cjs');

console.log(`\n${colors.bold}${colors.white}╔══════════════════════════════════════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.bold}${colors.white}║     VUONGGIA — LUXURY MINIMALIST ATELIER E2E VERIFICATION SUITE         ║${colors.reset}`);
console.log(`${colors.bold}${colors.white}║     4-Tier Opaque-Box Comprehensive Quality & Forensic Audit             ║${colors.reset}`);
console.log(`${colors.bold}${colors.white}╚══════════════════════════════════════════════════════════════════════════╝${colors.reset}\n`);

const startTime = Date.now();

// Execute all 4 tiers
const tier1 = require('./tier1_features.cjs');
const tier2 = require('./tier2_boundaries.cjs');
const tier3 = require('./tier3_interactions.cjs');
const tier4 = require('./tier4_scenarios.cjs');

const allTiers = [tier1, tier2, tier3, tier4];
const totalDuration = Date.now() - startTime;

const grandTotal = allTiers.reduce((sum, t) => sum + t.total, 0);
const grandPassed = allTiers.reduce((sum, t) => sum + t.passed, 0);
const grandFailed = allTiers.reduce((sum, t) => sum + t.failed, 0);

// Print High-Fashion Lookbook Quality Certificate
console.log(`\n${colors.bold}${colors.white}══════════════════════════════════════════════════════════════════════════${colors.reset}`);
console.log(`${colors.bold}${colors.white}              E2E TEST HARNESS EXECUTION SUMMARY REPORT                   ${colors.reset}`);
console.log(`${colors.bold}${colors.white}══════════════════════════════════════════════════════════════════════════${colors.reset}`);

console.log(`\n  ┌─────────────────────────────────────┬─────────┬─────────┬────────┬──────────┐`);
console.log(`  │ ${colors.bold}Test Tier${colors.reset}                           │ ${colors.bold}Total${colors.reset}   │ ${colors.bold}Passed${colors.reset}  │ ${colors.bold}Failed${colors.reset} │ ${colors.bold}Duration${colors.reset} │`);
console.log(`  ├─────────────────────────────────────┼─────────┼─────────┼────────┼──────────┤`);

allTiers.forEach((tier) => {
  const namePadded = tier.tierName.padEnd(35, ' ');
  const totalPadded = String(tier.total).padStart(7, ' ');
  const passedPadded = `${colors.green}${String(tier.passed).padStart(7, ' ')}${colors.reset}`;
  const failedPadded = tier.failed > 0 
    ? `${colors.red}${String(tier.failed).padStart(6, ' ')}${colors.reset} `
    : `${colors.dim}${String(tier.failed).padStart(6, ' ')}${colors.reset} `;
  const durationPadded = `${String(tier.duration).padStart(6, ' ')}ms`;
  console.log(`  │ ${namePadded} │ ${totalPadded} │ ${passedPadded} │ ${failedPadded} │ ${durationPadded} │`);
});

console.log(`  └─────────────────────────────────────┴─────────┴─────────┴────────┴──────────┘`);

console.log(`\n  ${colors.bold}Aggregate Results:${colors.reset}`);
console.log(`  • Total Tests Executed: ${colors.bold}${grandTotal}${colors.reset}`);
console.log(`  • Tests Passed:         ${colors.green}${colors.bold}${grandPassed}${colors.reset}`);
console.log(`  • Tests Failed:         ${grandFailed > 0 ? colors.red : colors.dim}${colors.bold}${grandFailed}${colors.reset}`);
console.log(`  • Total Time Elapsed:   ${colors.cyan}${totalDuration}ms${colors.reset}`);

// Export JSON report for CI/CD and forensic auditing
const reportData = {
  timestamp: new Date().toISOString(),
  environment: {
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
  },
  metrics: {
    total: grandTotal,
    passed: grandPassed,
    failed: grandFailed,
    durationMs: totalDuration,
    successRate: `${((grandPassed / grandTotal) * 100).toFixed(2)}%`,
  },
  tiers: allTiers,
};

const reportPath = path.join(__dirname, 'test_results.json');
fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2), 'utf8');
console.log(`\n  ${colors.dim}Structured audit report written to: ${reportPath}${colors.reset}\n`);

if (grandFailed > 0) {
  console.log(`${colors.bgRed}${colors.white}${colors.bold} ✖ E2E VERIFICATION FAILED WITH ${grandFailed} DEFECT(S) ${colors.reset}\n`);
  process.exit(1);
} else {
  console.log(`${colors.bgGreen}${colors.white}${colors.bold} ✔ 100% E2E VERIFICATION PASSED — ALL 4 TIERS CERTIFIED ${colors.reset}\n`);
  process.exit(0);
}
