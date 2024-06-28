import React from 'react';
export type TargetType = HTMLElement | (() => HTMLElement) | React.MutableRefObject<HTMLElement>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let passiveIfSupported: boolean | any = false;

try {
  window &&
    window.addEventListener(
      'test',
      null,
      Object.defineProperty({}, 'passive', {
        get() {
          passiveIfSupported = { passive: true };
        }
      })
    );
} catch (err) {}

/**
 * Get target element.
 * @param elRef
 * @returns
 */
export const getElement = (elRef: React.MutableRefObject<TargetType>): HTMLElement => {
  const el = elRef.current;
  let dom;
  if (el instanceof HTMLElement) {
    dom = el;
  } else if ((el as React.MutableRefObject<HTMLElement>).current) {
    dom = (el as React.MutableRefObject<HTMLElement>).current;
  } else if (typeof el === 'function') {
    dom = el();
  }

  return dom;
};

/**
 * Get event target.
 * @param target
 * @param defaultTarget
 * @returns
 */
export const getEventTarget = (target, defaultTarget): Element => {
  if (!target) {
    return defaultTarget;
  }

  let targetElement;

  if (typeof target === 'function') {
    targetElement = target();
  } else if (target && 'current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
};

/**
 * Apply style / className to element.
 * @param el
 * @param styleOrCls
 * @param toBeRemovedCls
 */
export const applyStyleOrClsToElement = (
  el: HTMLElement,
  styleOrCls: React.CSSProperties | string
): void => {
  if (typeof styleOrCls === 'object' && styleOrCls) {
    for (const key of Object.keys(styleOrCls)) {
      el.style[key] = styleOrCls[key];
    }
  } else if (typeof styleOrCls === 'string') {
    el.classList.add(styleOrCls);
  }
};
