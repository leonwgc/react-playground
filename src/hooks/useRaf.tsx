import { useState } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

/**
 * source:react-use
 * React animation hook that forces component to re-render on each requestAnimationFrame, returns percentage of time elapsed.
 * @param ms milliseconds for how long to keep re-rendering component, defaults to 1e12.
 * @param delay  delay in milliseconds after which to start re-rendering component, defaults to 0.
 * @returns
 */
const useRaf = (ms: number = 1e12, delay: number = 0): number => {
  const [elapsed, set] = useState<number>(0);

  useIsomorphicLayoutEffect(() => {
    let raf;
    let timerStop;
    let start;

    const onFrame = () => {
      const time = Math.min(1, (Date.now() - start) / ms);
      set(time);
      loop();
    };
    const loop = () => {
      raf = requestAnimationFrame(onFrame);
    };
    const onStart = () => {
      timerStop = setTimeout(() => {
        cancelAnimationFrame(raf);
        set(1);
      }, ms);
      start = Date.now();
      loop();
    };
    const timerDelay = setTimeout(onStart, delay);

    return () => {
      clearTimeout(timerStop);
      clearTimeout(timerDelay);
      cancelAnimationFrame(raf);
    };
  }, [ms, delay]);

  return elapsed;
};

export default useRaf;
