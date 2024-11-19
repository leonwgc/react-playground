import React, { useEffect, useState } from 'react';

/**
 * useThrottle
 *
 * @param {any} value
 * @param {number} [interval=600]
 * @returns {any}
 */
const useThrottle = (value, interval = 600) => {
  const [throttleValue, setThrottleValue] = useState(value);
  const lastTimeRef = React.useRef(0);

  useEffect(() => {
    const now = Date.now();
    let timer = 0;

    if (now - lastTimeRef.current >= interval) {
      setThrottleValue(value);
      lastTimeRef.current = now;
    } else {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setThrottleValue(value);
        lastTimeRef.current = now;
      }, interval);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [value, interval]);

  return throttleValue;
};

export default useThrottle;
