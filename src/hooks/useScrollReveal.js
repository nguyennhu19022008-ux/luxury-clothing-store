import { useEffect, useRef } from 'react';

/**
 * Lightweight, performant Scroll Reveal Hook powered by native IntersectionObserver.
 * GPU-accelerated, zero external dependencies, 60fps smooth viewport tracking.
 *
 * @param {Object} options
 * @param {number} [options.threshold=0.12] - Ratio of element visibility to trigger
 * @param {string} [options.rootMargin='0px 0px -40px 0px'] - Viewport inset trigger margins
 * @param {boolean} [options.once=true] - Trigger once or allow re-triggering
 * @returns {React.RefObject} ref to attach to the animated DOM node
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const { threshold = 0.12, rootMargin = '0px 0px -40px 0px', once = true } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check prefers-reduced-motion safely
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;

    if (prefersReducedMotion) {
      element.classList.add('is-revealed');
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      element.classList.add('is-revealed');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.isIntersecting) {
        element.classList.add('is-revealed');
        if (once) {
          observer.unobserve(element);
        }
      } else if (!once) {
        element.classList.remove('is-revealed');
      }
    }, { threshold, rootMargin });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return ref;
}
