import { useCallback, useState } from 'react';
/**
 * Persist and rehydrate a value stored in localStorage.
 *
 * @param {string} key
 * @param {*} initialValue
 * @returns {[any, (value: any) => void]}
 */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    }
  }, []);

  return [storedValue, setValue];
}

export default useLocalStorage;
