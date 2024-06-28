import React, { useState, useEffect, useRef } from 'react';

import { getElement, applyStyleOrClsToElement } from './dom';

import { useLatest, useUpdateEffect, useIsomorphicLayoutEffect } from 'react-uni-comps';

const useLayoutEffect = useIsomorphicLayoutEffect;

/**
 * Add mounting transition effect to component.
 * @param el
 * @param visible when visible is true, el shows. run the mount transition.
 * @param from the start styles/class name.
 * @param to the end styles/class name.
 * @param duration transition duration. (unit: ms)
 * @param delay  time to wait before transiton. (unit: ms)
 * @returns boolean. true means the component is still active (still visible or going to be hidden after animation finish). false means the component need to be unmounted.
 */
export default function useMountTransition(
  el: HTMLElement | (() => HTMLElement) | React.MutableRefObject<HTMLElement>,
  visible: boolean,
  from: string | React.CSSProperties,
  to: string | React.CSSProperties,
  duration = 220,
  delay = 0
): boolean {
  const [active, setActive] = useState(visible);
  const latestEl = useLatest(el);
  const timerRef = useRef(0);
  const fromRef = useLatest(from);
  const toRef = useLatest(to);

  useLayoutEffect(() => {
    const el = getElement(latestEl);
    if (visible && !active && el instanceof Element) {
      applyStyleOrClsToElement(el, fromRef.current);
      setActive(true);

      timerRef.current = window.setTimeout(() => {
        applyStyleOrClsToElement(el, toRef.current);
      }, delay);
    }
  }, [visible, active, fromRef, toRef, latestEl, delay]);

  useUpdateEffect(() => {
    if (!visible && active) {
      const el = getElement(latestEl);
      timerRef.current = window.setTimeout(() => {
        applyStyleOrClsToElement(el, fromRef.current);
        timerRef.current = window.setTimeout(() => {
          setActive(false);
        }, duration);
      }, delay);
    }
  }, [visible, active]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return active || visible;
}
