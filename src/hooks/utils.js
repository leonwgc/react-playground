/**
 * compare two objects shallowly.
 *
 * @param {object} object1 first object
 * @param {object} object2 second object
 * @returns {boolean} whether two objects are equal
 */
export function isShallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

/**
 * @param {Function} cb
 * @param {Number} ms
 * @return {Function}
 *
 * throttle will return a function that will only be called after the first time you call it and after ms milliseconds.
 * if you call it again within ms milliseconds, the timer will be re-set.
 */
export function throttle(cb, ms) {
  let lastTime = 0;
  let timer = 0;

  return () => {
    const now = Date.now();
    if (now - lastTime >= ms) {
      cb();
      lastTime = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(cb, ms);
    }
  };
}

/**
 * Creates a debounced function that delays invoking the provided callback
 * until after the specified milliseconds have elapsed since the last time
 * the debounced function was invoked.
 *
 * @param {Function} cb - The callback function to debounce.
 * @param {Number} ms - The number of milliseconds to delay.
 * @return {Function} - Returns the new debounced function.
 */
export function debounce(cb, ms) {
  let timer = 0;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(cb, ms);
  };
}
