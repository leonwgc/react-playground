import { useMemo } from 'react';
import { useLatest } from 'react-uni-comps';
import { debounce } from './utils';

/**
 * Custom hook that returns a debounced version of a function.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} [delay=600] - The delay in milliseconds for the debounce.
 * @returns {Function} - The debounced function.
 *
 * @example
 * const debouncedFunc = useDebounceFunc(myFunction, 500);
 * debouncedFunc(); // Call this function, and it will be debounced
 */
const useDebounceFunc = (func, delay = 600) => {
  const funcRef = useLatest(func);
  return useMemo(() => debounce(() => funcRef.current(), delay), [delay]);
};

export default useDebounceFunc;
