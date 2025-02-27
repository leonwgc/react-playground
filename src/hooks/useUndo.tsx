import React, { useCallback, useMemo, useRef } from 'react';

/**
 * Inserts a value at a given index in an array.
 *
 * @param arr - The source array.
 * @param cursor - The index to insert the value at.
 * @param value - The value to insert.
 *
 * @returns A new array with the value inserted at the given index.
 */
function insert<T>(arr: T[], cursor: number, value: T) {
  return [...arr.slice(0, cursor), value, ...arr.slice(cursor + 1)];
}

/**
 * Custom hook to manage undo and redo functionality for a given state.
 *
 * @param initialState - The initial state value.
 *
 * @returns A tuple containing:
 *   - value: The current state value.
 *   - setValue: A function to update the state, automatically handling the undo stack.
 *   - controls: An object with undo, redo functions and canUndo, canRedo flags.
 *
 * Usage:
 * const [value, setValue, { undo, redo, canUndo, canRedo }] = useUndo(initialValue);
 */
const useUndo = <T,>(initialState: T) => {
  const [state, setState] = React.useState([initialState]);
  const [cursor, setCursor] = React.useState(0);
  const initialStateRef = useRef(initialState);

  const size = state.length;

  const undo = useCallback(() => setCursor(Math.max(cursor - 1, 0)), [cursor]);
  const redo = useCallback(() => setCursor(Math.min(cursor + 1, size - 1)), [cursor, size]);

  const setValue = useCallback(
    (value: T) => {
      const nextCursor = cursor + 1;
      const nextState = insert(state, nextCursor, value);

      setState(nextState);
      setCursor(nextCursor);
    },
    [cursor, state]
  );

  const value = useMemo(() => state[cursor], [state, cursor]);

  const reset = useCallback(() => {
    setCursor(0);
    setState([initialStateRef.current]);
  }, []);

  return [value, setValue, { undo, redo, reset, canUndo: cursor > 0, canRedo: cursor < size - 1 }];
};

export default useUndo;
