import { useState } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

/**
 * Request animation frame
 * @param {*} ms
 * @param {*} delay
 * @returns
 */
const useRequestAnimationFrame = (ms = 10000, delay) => {
  const [elapsed, setElapsed] = useState(0);

  useIsomorphicLayoutEffect(() => {
    let startTime;
    let timerStop;
    let timerStart;
    let raf;

    const onFrame = () => {
      setElapsed(Math.min(1, (Date.now() - startTime) / ms));
      loop();
    };

    const loop = () => {
      raf = requestAnimationFrame(onFrame);
    };

    timerStart = setTimeout(() => {
      timerStop = setTimeout(() => {
        cancelAnimationFrame(raf);
        setElapsed(1);
      }, ms);
      startTime = Date.now();
      loop();
    }, delay);

    return () => {
      clearTimeout(timerStart);
      clearTimeout(timerStop);
      cancelAnimationFrame(raf);
    };
  }, [ms, delay]);

  return elapsed;
};

export default useRequestAnimationFrame;
