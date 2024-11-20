import React from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

/**
 * useLockBodyScroll
 *
 * A custom hook that locks the body's scroll by setting the overflow style to 'hidden'.
 * This can be useful for modal dialogs or any other UI components where you want to
 * prevent the body from scrolling when a component is open.
 *
 * @returns {void}
 */
export default function useLockBodyScroll() {
  useIsomorphicLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
}
