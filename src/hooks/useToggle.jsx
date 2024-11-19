import React from 'react';

/**
 * useToggle
 *
 * @param {boolean|string|number} initialValue  initial on state
 * @returns {Array} [on, toggle]
 *
 * @example
 * const [on, toggle] = useToggle(false);
 * return (
 *   <div>
 *     <button onClick={toggle}>Toggle</button>
 *     <div>{on ? 'on' : 'off'}</div>
 *   </div>
 * );
 */
export default function useToggle(initialValue) {
  const [on, setOn] = React.useState(() => {
    if (typeof initialValue === 'boolean') {
      return initialValue;
    }

    return Boolean(initialValue);
  });

  const handleToggle = React.useCallback((value) => {
    if (typeof value === 'boolean') {
      return setOn(value);
    }

    return setOn((v) => !v);
  }, []);

  return [on, handleToggle];
}
