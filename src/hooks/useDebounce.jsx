import { useEffect, useState } from 'react';

/**
 * Custom hook that debounces a value.
 *
 * @param {any} value - The value to debounce.
 * @param {number} [delay=600] - The delay in milliseconds for the debounce.
 * @returns {any} - The debounced value.
 *
 * @example
 * const debouncedValue = useDebounce(value, 500);
 */
const useDebounce = (value, delay = 600) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
