import React, { useEffect, useRef, useState } from 'react';

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
  const lastTimerRef = useRef(0);

  useEffect(() => {
    const now = Date.now();

    if (now - lastTimeRef.current >= interval) {
      setThrottleValue(value);
      lastTimeRef.current = now;
    } else {
      if (lastTimerRef.current) {
        clearTimeout(lastTimerRef.current);
      }
      lastTimerRef.current = setTimeout(() => {
        setThrottleValue(value);
        lastTimeRef.current = now;
      }, interval);
    }

    return () => {
      if (lastTimerRef.current) {
        clearTimeout(lastTimerRef.current);
      }
    };
  }, [value, interval]);

  return throttleValue;
};

export default useThrottle;
