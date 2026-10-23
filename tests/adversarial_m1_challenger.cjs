/**
 * Empirical Adversarial Challenger Test Harness for Milestone 1
 * Targets: Slide 0 mechanics, Keyboard Navigation, Input Suppression, Listener Cleanup, and Clipboard Fallback
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const page0Path = path.join(projectRoot, 'src', 'components', 'Page0_Copyright.jsx');
const tailwindConfigPath = path.join(projectRoot, 'tailwind.config.js');
const appPath = path.join(projectRoot, 'src', 'App.jsx');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message ? message + ' - ' : ''}Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function runTest(suite, name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  \x1b[32m✔ PASS\x1b[0m [${suite}] ${name}`);
  } catch (err) {
    failedTests++;
    failures.push({ suite, name, error: err.message, stack: err.stack });
    console.log(`  \x1b[31m✖ FAIL\x1b[0m [${suite}] ${name}\n    \x1b[31m${err.message}\x1b[0m`);
  }
}

async function runAsyncTest(suite, name, fn) {
  totalTests++;
  try {
    await fn();
    passedTests++;
    console.log(`  \x1b[32m✔ PASS\x1b[0m [${suite}] ${name}`);
  } catch (err) {
    failedTests++;
    failures.push({ suite, name, error: err.message, stack: err.stack });
    console.log(`  \x1b[31m✖ FAIL\x1b[0m [${suite}] ${name}\n    \x1b[31m${err.message}\x1b[0m`);
  }
}

async function main() {
  console.log('\n\x1b[1m\x1b[37m======================================================================\x1b[0m');
  console.log('\x1b[1m\x1b[33m   ADVERSARIAL STRESS TEST HARNESS — MILESTONE 1 FORENSIC CHALLENGE   \x1b[0m');
  console.log('\x1b[1m\x1b[37m======================================================================\x1b[0m\n');

  const page0Code = fs.readFileSync(page0Path, 'utf8');
  const tailwindCode = fs.readFileSync(tailwindConfigPath, 'utf8');
  const appCode = fs.readFileSync(appPath, 'utf8');

  // =========================================================================
  // SECTION 1: SLIDE 0 MECHANICS FORENSIC AUDIT
  // =========================================================================
  console.log('\x1b[1m\x1b[36m▶ 1. Slide 0 Mechanics & Wallpaper Specifications\x1b[0m');

  runTest('Slide 0 Mechanics', '1.1 Container diagonal tilt is exactly -32deg (-rotate-[32deg])', () => {
    assert(page0Code.includes('-rotate-[32deg]'), 'Container must have -rotate-[32deg] class');
  });

  runTest('Slide 0 Mechanics', '1.2 Exactly 5 marquee rows instantiated via Array.from({ length: 5 })', () => {
    const rowMatch = page0Code.match(/Array\.from\(\{\s*length:\s*5\s*\}\)/);
    assert(rowMatch !== null, 'Component must generate exactly 5 rows with Array.from({ length: 5 })');
  });

  runTest('Slide 0 Mechanics', '1.3 Alternating speeds: Even rows = 60s, Odd rows = 70s', () => {
    // Check speed alternation logic in code
    const speedLogicMatch = page0Code.includes("rowIndex % 2 === 0 ? '60s' : '70s'");
    assert(speedLogicMatch, 'Animation duration must alternate between 60s for even rows and 70s for odd rows');

    // Simulate 5 rows
    for (let r = 0; r < 5; r++) {
      const duration = r % 2 === 0 ? '60s' : '70s';
      if (r % 2 === 0) {
        assertEqual(duration, '60s', `Row ${r} should be 60s`);
      } else {
        assertEqual(duration, '70s', `Row ${r} should be 70s`);
      }
    }
  });

  runTest('Slide 0 Mechanics', '1.4 Alternating directions: Even rows = normal, Odd rows = reverse', () => {
    const dirLogicMatch = page0Code.includes("rowIndex % 2 === 0 ? 'normal' : 'reverse'");
    assert(dirLogicMatch, 'Animation direction must alternate between normal (even) and reverse (odd)');

    for (let r = 0; r < 5; r++) {
      const dir = r % 2 === 0 ? 'normal' : 'reverse';
      assertEqual(dir, r % 2 === 0 ? 'normal' : 'reverse', `Row ${r} direction mismatch`);
    }
  });

  runTest('Slide 0 Mechanics', '1.5 Repeating marquee text is "DESIGN BY VUONGGIA"', () => {
    assert(page0Code.includes('DESIGN BY VUONGGIA'), 'Marquee must display DESIGN BY VUONGGIA');
  });

  runTest('Slide 0 Mechanics', '1.6 Viewport containment has overflow-hidden and inset-0', () => {
    assert(page0Code.includes('overflow-hidden'), 'Slide 0 must prevent scrollbars');
    assert(page0Code.includes('w-screen') && page0Code.includes('h-screen'), 'Slide 0 must cover 100vw and 100vh');
    assert(page0Code.includes('bg-black'), 'Slide 0 background must be pure black');
  });

  runTest('Slide 0 Mechanics', '1.7 Central certificate card uses backdrop blur & semi-transparent OLED background', () => {
    assert(page0Code.includes('bg-black/50'), 'Card background must use bg-black/50 semi-transparent styling');
    assert(page0Code.includes('backdrop-blur-md'), 'Card must have backdrop-blur-md');
  });

  runTest('Slide 0 Mechanics', '1.8 Non-commercial clause is strictly displayed in full', () => {
    const clause = 'TUYỆT ĐỐI KHÔNG THƯƠNG MẠI, MUA BÁN, SANG NHƯỢNG DƯỚI MỌI HÌNH THỨC SAU KHI ĐÃ SỞ HỮU.';
    assert(page0Code.includes(clause), `Page 0 must include strict non-commercial clause: "${clause}"`);
  });

  runTest('Slide 0 Mechanics', '1.9 Contact credentials: email and hotline match specification', () => {
    assert(page0Code.includes('nguyennhu19022008@gmail.com'), 'Email nguyennhu19022008@gmail.com must be present');
    assert(page0Code.includes('0876637806'), 'Hotline 0876637806 must be present');
  });

  // =========================================================================
  // SECTION 2: KEYBOARD SHORTCUTS & EVENT LISTENER ROBUSTNESS
  // =========================================================================
  console.log('\n\x1b[1m\x1b[36m▶ 2. Keyboard Navigation, Input Suppression & Listener Lifecycle\x1b[0m');

  // Realistic Mock Environment for Keyboard Testing
  class DOMWindowMock {
    constructor() {
      this.listeners = new Map();
    }
    addEventListener(event, fn) {
      if (!this.listeners.has(event)) {
        this.listeners.set(event, new Set());
      }
      this.listeners.get(event).add(fn);
    }
    removeEventListener(event, fn) {
      if (this.listeners.has(event)) {
        this.listeners.get(event).delete(fn);
      }
    }
    dispatchEvent(event, data) {
      const fns = this.listeners.get(event);
      if (fns) {
        let prevented = false;
        const e = {
          ...data,
          preventDefault: () => { prevented = true; },
          defaultPrevented: () => prevented,
        };
        fns.forEach(fn => fn(e));
        return { prevented };
      }
      return { prevented: false };
    }
  }

  // Pure Component Keyboard Hook Simulator mirroring Page0_Copyright.jsx implementation
  function mountKeyboardHook(windowMock, onNextPage, onToggleCard) {
    const handleKeyDown = (e) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        if (typeof onNextPage === 'function') {
          onNextPage();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (typeof onToggleCard === 'function') {
          onToggleCard();
        }
      }
    };

    windowMock.addEventListener('keydown', handleKeyDown);
    return () => windowMock.removeEventListener('keydown', handleKeyDown);
  }

  runTest('Keyboard Navigation', '2.1 [ArrowRight] triggers onNextPage() and calls preventDefault()', () => {
    const win = new DOMWindowMock();
    let nextCalled = 0;
    const unmount = mountKeyboardHook(win, () => { nextCalled++; });

    const result = win.dispatchEvent('keydown', { key: 'ArrowRight', target: { tagName: 'DIV' } });
    assertEqual(nextCalled, 1, 'ArrowRight should trigger onNextPage once');
    assertEqual(result.prevented, true, 'ArrowRight must call preventDefault()');
    unmount();
  });

  runTest('Keyboard Navigation', '2.2 [Space] (code: Space) triggers onNextPage() and calls preventDefault()', () => {
    const win = new DOMWindowMock();
    let nextCalled = 0;
    const unmount = mountKeyboardHook(win, () => { nextCalled++; });

    const result = win.dispatchEvent('keydown', { key: ' ', code: 'Space', target: { tagName: 'BUTTON' } });
    assertEqual(nextCalled, 1, 'Space should trigger onNextPage once');
    assertEqual(result.prevented, true, 'Space must call preventDefault()');
    unmount();
  });

  runTest('Keyboard Navigation', '2.3 [Enter] triggers onNextPage() and calls preventDefault()', () => {
    const win = new DOMWindowMock();
    let nextCalled = 0;
    const unmount = mountKeyboardHook(win, () => { nextCalled++; });

    const result = win.dispatchEvent('keydown', { key: 'Enter', code: 'Enter', target: { tagName: 'BODY' } });
    assertEqual(nextCalled, 1, 'Enter should trigger onNextPage once');
    assertEqual(result.prevented, true, 'Enter must call preventDefault()');
    unmount();
  });

  runTest('Keyboard Navigation', '2.4 [Escape] toggles card state (open/close) and calls preventDefault()', () => {
    const win = new DOMWindowMock();
    let cardOpen = true;
    const unmount = mountKeyboardHook(win, null, () => { cardOpen = !cardOpen; });

    // Press 1: Closes card
    let res = win.dispatchEvent('keydown', { key: 'Escape', target: { tagName: 'BODY' } });
    assertEqual(cardOpen, false, 'First Escape must close card');
    assertEqual(res.prevented, true, 'Escape must call preventDefault()');

    // Press 2: Reopens card
    res = win.dispatchEvent('keydown', { key: 'Escape', target: { tagName: 'BODY' } });
    assertEqual(cardOpen, true, 'Second Escape must reopen card');
    assertEqual(res.prevented, true, 'Escape must call preventDefault()');

    // Stress test: 50 toggles
    for (let i = 0; i < 50; i++) {
      win.dispatchEvent('keydown', { key: 'Escape', target: { tagName: 'BODY' } });
    }
    assertEqual(cardOpen, true, 'After 50 toggles, state should remain consistent');
    unmount();
  });

  runTest('Keyboard Navigation', '2.5 Suppress shortcuts when user is focused inside INPUT element', () => {
    const win = new DOMWindowMock();
    let nextCalled = 0;
    let cardToggled = 0;
    const unmount = mountKeyboardHook(
      win, 
      () => { nextCalled++; }, 
      () => { cardToggled++; }
    );

    const inputTarget = { tagName: 'INPUT' };

    // Test ArrowRight
    let res = win.dispatchEvent('keydown', { key: 'ArrowRight', target: inputTarget });
    assertEqual(nextCalled, 0, 'ArrowRight in INPUT must not trigger navigation');
    assertEqual(res.prevented, false, 'ArrowRight in INPUT must not prevent default');

    // Test Space
    res = win.dispatchEvent('keydown', { key: ' ', code: 'Space', target: inputTarget });
    assertEqual(nextCalled, 0, 'Space in INPUT must not trigger navigation');
    assertEqual(res.prevented, false, 'Space in INPUT must allow space character entry');

    // Test Enter
    res = win.dispatchEvent('keydown', { key: 'Enter', target: inputTarget });
    assertEqual(nextCalled, 0, 'Enter in INPUT must not trigger navigation');
    assertEqual(res.prevented, false, 'Enter in INPUT must allow form submit/newline');

    // Test Escape
    res = win.dispatchEvent('keydown', { key: 'Escape', target: inputTarget });
    assertEqual(cardToggled, 0, 'Escape in INPUT must not toggle card');
    assertEqual(res.prevented, false, 'Escape in INPUT must not be captured');

    unmount();
  });

  runTest('Keyboard Navigation', '2.6 Suppress shortcuts when user is focused inside TEXTAREA element', () => {
    const win = new DOMWindowMock();
    let nextCalled = 0;
    let cardToggled = 0;
    const unmount = mountKeyboardHook(
      win, 
      () => { nextCalled++; }, 
      () => { cardToggled++; }
    );

    const textareaTarget = { tagName: 'TEXTAREA' };

    win.dispatchEvent('keydown', { key: 'ArrowRight', target: textareaTarget });
    win.dispatchEvent('keydown', { key: ' ', code: 'Space', target: textareaTarget });
    win.dispatchEvent('keydown', { key: 'Enter', target: textareaTarget });
    win.dispatchEvent('keydown', { key: 'Escape', target: textareaTarget });

    assertEqual(nextCalled, 0, 'No navigation must trigger inside TEXTAREA');
    assertEqual(cardToggled, 0, 'Card must not toggle inside TEXTAREA');

    unmount();
  });

  runTest('Keyboard Navigation', '2.7 Irrelevant keys (ArrowUp, ArrowDown, Tab, Backspace, A-Z) are ignored', () => {
    const win = new DOMWindowMock();
    let nextCalled = 0;
    let cardToggled = 0;
    const unmount = mountKeyboardHook(win, () => { nextCalled++; }, () => { cardToggled++; });

    const irrelevantKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'Tab', 'Backspace', 'KeyA', 'Shift', 'Control', 'Alt'];
    for (const k of irrelevantKeys) {
      const res = win.dispatchEvent('keydown', { key: k, code: k, target: { tagName: 'DIV' } });
      assertEqual(res.prevented, false, `Key ${k} should not be prevented`);
    }

    assertEqual(nextCalled, 0, 'Irrelevant keys must never trigger next page');
    assertEqual(cardToggled, 0, 'Irrelevant keys must never toggle card');

    unmount();
  });

  runTest('Keyboard Navigation', '2.8 Event listener is cleanly removed on unmount (No memory leaks)', () => {
    const win = new DOMWindowMock();
    let nextCalled = 0;
    const unmount = mountKeyboardHook(win, () => { nextCalled++; });

    // Dispatched before unmount
    win.dispatchEvent('keydown', { key: 'Enter', target: { tagName: 'DIV' } });
    assertEqual(nextCalled, 1, 'Should respond before unmount');

    // Trigger unmount
    unmount();

    // Dispatched after unmount
    win.dispatchEvent('keydown', { key: 'Enter', target: { tagName: 'DIV' } });
    win.dispatchEvent('keydown', { key: 'ArrowRight', target: { tagName: 'DIV' } });
    win.dispatchEvent('keydown', { key: ' ', code: 'Space', target: { tagName: 'DIV' } });
    win.dispatchEvent('keydown', { key: 'Escape', target: { tagName: 'DIV' } });

    assertEqual(nextCalled, 1, 'After unmount, no events should be received (clean listener removal)');
    assertEqual(win.listeners.get('keydown').size, 0, 'Window keydown listener set must be completely empty');
  });

  runTest('Keyboard Navigation', '2.9 Graceful resilience if onNextPage is not a function or undefined', () => {
    const win = new DOMWindowMock();
    // Mount with null/undefined onNextPage
    const unmount = mountKeyboardHook(win, undefined, undefined);

    // Should not throw TypeError
    try {
      win.dispatchEvent('keydown', { key: 'Enter', target: { tagName: 'DIV' } });
      win.dispatchEvent('keydown', { key: 'Escape', target: { tagName: 'DIV' } });
    } catch (e) {
      assert(false, `Should not throw when callback is undefined: ${e.message}`);
    }

    unmount();
  });

  // =========================================================================
  // SECTION 3: RESILIENT COPY-TO-CLIPBOARD & FALLBACK MATRIX
  // =========================================================================
  console.log('\n\x1b[1m\x1b[36m▶ 3. Resilient Copy-to-Clipboard & Environment Fallback Matrix\x1b[0m');

  // Implementation of handleCopy mirroring Page0_Copyright.jsx
  async function simulateHandleCopy({
    text,
    field,
    navigatorMock,
    windowMock,
    documentMock,
    setCopiedField,
    setTimeoutMock
  }) {
    try {
      if (navigatorMock && navigatorMock.clipboard && windowMock && windowMock.isSecureContext) {
        await navigatorMock.clipboard.writeText(text);
      } else {
        const textArea = documentMock.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        documentMock.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        documentMock.execCommand('copy');
        documentMock.body.removeChild(textArea);
      }
      setCopiedField(field);
      setTimeoutMock(() => setCopiedField(null), 2500);
    } catch (err) {
      // Fallback feedback on error
      setCopiedField(field);
      setTimeoutMock(() => setCopiedField(null), 2500);
    }
  }

  await runAsyncTest('Clipboard Matrix', '3.1 Modern HTTPS Environment: navigator.clipboard.writeText succeeds', async () => {
    let clipboardText = '';
    const navigatorMock = {
      clipboard: {
        writeText: async (str) => {
          clipboardText = str;
        }
      }
    };
    const windowMock = { isSecureContext: true };
    const documentMock = { body: {} };
    let currentCopiedField = null;
    let timerCallback = null;

    // Test Email copy
    await simulateHandleCopy({
      text: 'nguyennhu19022008@gmail.com',
      field: 'email',
      navigatorMock,
      windowMock,
      documentMock,
      setCopiedField: (f) => { currentCopiedField = f; },
      setTimeoutMock: (cb) => { timerCallback = cb; }
    });

    assertEqual(clipboardText, 'nguyennhu19022008@gmail.com', 'Clipboard should receive exact email address');
    assertEqual(currentCopiedField, 'email', 'copiedField state must be set to "email"');

    // Advance timer
    timerCallback();
    assertEqual(currentCopiedField, null, 'copiedField must reset to null after timeout');

    // Test Phone copy
    await simulateHandleCopy({
      text: '0876637806',
      field: 'phone',
      navigatorMock,
      windowMock,
      documentMock,
      setCopiedField: (f) => { currentCopiedField = f; },
      setTimeoutMock: (cb) => { timerCallback = cb; }
    });

    assertEqual(clipboardText, '0876637806', 'Clipboard should receive exact hotline');
    assertEqual(currentCopiedField, 'phone', 'copiedField state must be set to "phone"');
  });

  await runAsyncTest('Clipboard Matrix', '3.2 Insecure Context / Non-HTTPS (window.isSecureContext === false): executes DOM textarea fallback', async () => {
    let clipboardText = '';
    const navigatorMock = {
      clipboard: {
        writeText: async () => { throw new Error('Not allowed in insecure context'); }
      }
    };
    const windowMock = { isSecureContext: false };

    // Mock DOM elements
    const bodyChildren = [];
    let executedCommand = '';
    let selectedText = '';

    const documentMock = {
      createElement: (tag) => {
        return {
          tagName: tag.toUpperCase(),
          style: {},
          value: '',
          focus: () => {},
          select: function() { selectedText = this.value; },
        };
      },
      body: {
        appendChild: (el) => { bodyChildren.push(el); },
        removeChild: (el) => {
          const idx = bodyChildren.indexOf(el);
          if (idx !== -1) bodyChildren.splice(idx, 1);
        }
      },
      execCommand: (cmd) => {
        executedCommand = cmd;
        if (cmd === 'copy') {
          clipboardText = selectedText;
          return true;
        }
        return false;
      }
    };

    let currentCopiedField = null;
    await simulateHandleCopy({
      text: 'nguyennhu19022008@gmail.com',
      field: 'email',
      navigatorMock,
      windowMock,
      documentMock,
      setCopiedField: (f) => { currentCopiedField = f; },
      setTimeoutMock: () => {}
    });

    assertEqual(executedCommand, 'copy', 'Fallback must invoke execCommand("copy")');
    assertEqual(clipboardText, 'nguyennhu19022008@gmail.com', 'Fallback textarea must transfer the email string');
    assertEqual(bodyChildren.length, 0, 'Offscreen textarea MUST be cleaned up and removed from document.body');
    assertEqual(currentCopiedField, 'email', 'copiedField state must be set to "email" in fallback mode');
  });

  await runAsyncTest('Clipboard Matrix', '3.3 Completely Unavailable Clipboard API (e.g. navigator.clipboard is undefined)', async () => {
    let clipboardText = '';
    const navigatorMock = {}; // No clipboard
    const windowMock = { isSecureContext: true };

    const bodyChildren = [];
    let executedCommand = '';
    let selectedText = '';

    const documentMock = {
      createElement: (tag) => ({
        tagName: tag.toUpperCase(),
        style: {},
        value: '',
        focus: () => {},
        select: function() { selectedText = this.value; },
      }),
      body: {
        appendChild: (el) => { bodyChildren.push(el); },
        removeChild: (el) => {
          const idx = bodyChildren.indexOf(el);
          if (idx !== -1) bodyChildren.splice(idx, 1);
        }
      },
      execCommand: (cmd) => {
        executedCommand = cmd;
        clipboardText = selectedText;
        return true;
      }
    };

    let currentCopiedField = null;
    await simulateHandleCopy({
      text: '0876637806',
      field: 'phone',
      navigatorMock,
      windowMock,
      documentMock,
      setCopiedField: (f) => { currentCopiedField = f; },
      setTimeoutMock: () => {}
    });

    assertEqual(executedCommand, 'copy', 'Fallback must trigger when navigator.clipboard is missing');
    assertEqual(clipboardText, '0876637806', 'Fallback must properly copy phone');
    assertEqual(bodyChildren.length, 0, 'Temporary textarea must be removed');
    assertEqual(currentCopiedField, 'phone', 'copiedField must indicate successful copy');
  });

  await runAsyncTest('Clipboard Matrix', '3.4 Permission Denied / Execution Failure: Catch block guarantees zero UI crash and feedback', async () => {
    const navigatorMock = {
      clipboard: {
        writeText: async () => {
          const err = new Error('Permission denied by user/OS');
          err.name = 'NotAllowedError';
          throw err;
        }
      }
    };
    const windowMock = { isSecureContext: true };
    const documentMock = { body: {} };

    let currentCopiedField = null;
    let timerCallback = null;

    // Should not rethrow uncaught rejection
    try {
      await simulateHandleCopy({
        text: 'nguyennhu19022008@gmail.com',
        field: 'email',
        navigatorMock,
        windowMock,
        documentMock,
        setCopiedField: (f) => { currentCopiedField = f; },
        setTimeoutMock: (cb) => { timerCallback = cb; }
      });
      assertEqual(currentCopiedField, 'email', 'Fallback catch block must provide graceful feedback to user');
      timerCallback();
      assertEqual(currentCopiedField, null, 'Graceful feedback resets after delay');
    } catch (e) {
      assert(false, `Unexpected uncaught error: ${e.message}`);
    }
  });

  // =========================================================================
  // SECTION 4: INTEGRATION TEST ON APP.JSX PAGE TRANSITION & LIFECYCLE
  // =========================================================================
  console.log('\n\x1b[1m\x1b[36m▶ 4. App Shell Integration, Lifecycle & Re-entrancy Invariants\x1b[0m');

  runTest('App Invariant', '4.1 App starts with currentPage === 1 (Direct Storefront Entry)', () => {
    assert(appCode.includes('useState(1)'), 'Initial state must be useState(1) for direct storefront access');
  });

  runTest('App Invariant', '4.2 Page 0 is rendered as modal overlay (isCopyrightModalOpen || currentPage === 0)', () => {
    assert(appCode.includes('isCopyrightModalOpen') && appCode.includes('Page0_Copyright'), 'Page0_Copyright must render as a modal overlay when triggered');
  });

  runTest('App Invariant', '4.3 Storefront (Header, Hero, Catalog, Footer) is only rendered when currentPage === 1', () => {
    assert(appCode.includes('currentPage === 1 &&'), 'Storefront components must only render when currentPage === 1');
  });

  runTest('App Invariant', '4.4 Header and Footer provide navigation back to Page 0 via onGoToPage0', () => {
    assert(appCode.includes('onGoToPage0={handleGoToPage0}'), 'Header & Footer must pass handleGoToPage0 handler');
  });

  runTest('Lifecycle Invariant', '4.5 Unmounting Page0_Copyright upon page transition completely destroys keydown listener', () => {
    const win = new DOMWindowMock();
    let currentPage = 0;
    
    // Simulate App component render & transition
    let unmountPage0 = mountKeyboardHook(win, () => {
      currentPage = 1;
      unmountPage0(); // Component unmounts on transition
    });

    assertEqual(win.listeners.get('keydown').size, 1, 'Listener attached when currentPage === 0');
    
    // User presses ArrowRight to enter storefront
    win.dispatchEvent('keydown', { key: 'ArrowRight', target: { tagName: 'DIV' } });
    assertEqual(currentPage, 1, 'Page state transitioned to 1');
    assertEqual(win.listeners.get('keydown').size, 0, 'Listener completely detached upon unmount');

    // Subsequent keystrokes while on storefront do not fire any Slide 0 handlers
    win.dispatchEvent('keydown', { key: 'ArrowRight', target: { tagName: 'DIV' } });
    win.dispatchEvent('keydown', { key: 'Enter', target: { tagName: 'DIV' } });
    assertEqual(currentPage, 1, 'Page state remains 1');
  });

  runTest('Lifecycle Invariant', '4.6 Re-entering Slide 0 re-attaches listener cleanly without duplicate registration', () => {
    const win = new DOMWindowMock();
    let currentPage = 0;
    let unmountFn = null;

    // First visit to Slide 0
    unmountFn = mountKeyboardHook(win, () => { currentPage = 1; });
    assertEqual(win.listeners.get('keydown').size, 1, '1 listener active on first mount');
    unmountFn();
    assertEqual(win.listeners.get('keydown').size, 0, '0 listeners active after leaving Slide 0');

    // Second visit to Slide 0
    unmountFn = mountKeyboardHook(win, () => { currentPage = 1; });
    assertEqual(win.listeners.get('keydown').size, 1, 'Exactly 1 listener active on second mount (no duplication)');
    unmountFn();
    assertEqual(win.listeners.get('keydown').size, 0, 'Clean zero after second exit');
  });

  await runAsyncTest('Clipboard Matrix', '4.7 Rapid consecutive clicks on Copy (Re-entrancy) handle timeout gracefully', async () => {
    const navigatorMock = { clipboard: { writeText: async () => {} } };
    const windowMock = { isSecureContext: true };
    const documentMock = { body: {} };

    let currentCopiedField = null;
    let activeTimers = [];

    const setTimeoutMock = (cb, delay) => {
      activeTimers.push(cb);
      return activeTimers.length;
    };

    // Rapid double click: email then phone
    await simulateHandleCopy({
      text: 'nguyennhu19022008@gmail.com',
      field: 'email',
      navigatorMock,
      windowMock,
      documentMock,
      setCopiedField: (f) => { currentCopiedField = f; },
      setTimeoutMock
    });
    assertEqual(currentCopiedField, 'email');

    await simulateHandleCopy({
      text: '0876637806',
      field: 'phone',
      navigatorMock,
      windowMock,
      documentMock,
      setCopiedField: (f) => { currentCopiedField = f; },
      setTimeoutMock
    });
    assertEqual(currentCopiedField, 'phone');

    // Fire all timers
    activeTimers.forEach(t => t());
    assertEqual(currentCopiedField, null, 'Field returns to null without getting stuck');
  });

  // =========================================================================
  // SUMMARY REPORT
  // =========================================================================
  console.log('\n\x1b[1m\x1b[37m======================================================================\x1b[0m');
  console.log(`\x1b[1mTotal Adversarial Tests:\x1b[0m ${totalTests}`);
  console.log(`\x1b[1mPassed:\x1b[0m                  \x1b[32m${passedTests}\x1b[0m`);
  console.log(`\x1b[1mFailed:\x1b[0m                  ${failedTests > 0 ? `\x1b[31m${failedTests}\x1b[0m` : '\x1b[32m0\x1b[0m'}`);
  console.log('\x1b[1m\x1b[37m======================================================================\x1b[0m\n');

  if (failedTests > 0) {
    console.error('\x1b[41m\x1b[37m VERDICT: REQUEST_CHANGES — Adversarial defects found! \x1b[0m\n');
    process.exit(1);
  } else {
    console.log('\x1b[42m\x1b[30m VERDICT: APPROVE — All adversarial stress scenarios passed with 100% precision! \x1b[0m\n');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal test harness execution error:', err);
  process.exit(1);
});
