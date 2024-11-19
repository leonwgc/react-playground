import { useMemo } from 'react';
import { useLatest } from 'react-uni-comps';
import { throttle } from './utils';

/**
 * useThrottleFunc
 *
 * @param {Function} func - The function to throttle.
 * @param {number} [interval=600] - The delay in milliseconds for the throttle.
 * @returns {Function} - The throttled function.
 *
 * @example
 * const throttledFunc = useThrottleFunc(myFunction, 500);
 * throttledFunc(); // Call this function, and it will be throttled
 */
const useThrottleFunc = (func, interval = 600) => {
  const funcRef = useLatest(func);
  return useMemo(() => throttle(() => funcRef.current(), interval), [interval]);
};

export default useThrottleFunc;
