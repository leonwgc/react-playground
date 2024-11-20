import type { TEasing } from './easings';
import easings from './easings';
import useRaf from './useRaf';

/**
 * re-renders component, while tweening a number from 0 to 1.
 * @param easingName
 * @param ms
 * @param delay
 * @returns
 */
const useTween = (
  easingName: keyof typeof easings = 'inCirc',
  ms: number = 200,
  delay: number = 0
): number => {
  const fn: TEasing = easings[easingName];
  const t = useRaf(ms, delay);

  if (process.env.NODE_ENV !== 'production') {
    if (typeof fn !== 'function') {
      console.error(` ${easingName} is not a valid easing function name`);
      return 0;
    }
  }

  return fn(t);
};

export default useTween;
