import React, { useCallback, useMemo } from 'react';
import insert from './insert';

/**
 * useUndo
 * @param initialState initial state
 * @returns [value, setValue, undo, redo]
 * @description
 * - `value` is the current state.
 * - `setValue` is a function to set the state.
 * - `undo` is a function to undo the last action.
 * - `redo` is a function to redo the last action.
 */
const useUndo = <T,>(initialState: T) => {
  const [state, setState] = React.useState([initialState]);
  const [cursor, setCursor] = React.useState(0);

  const size = state.length;

  const undo = useCallback(() => setCursor(Math.max(cursor - 1, 0)), [cursor]);
  const redo = useCallback(() => setCursor(Math.min(cursor + 1, size - 1)), [cursor, size]);

  const setValue = (value: T) => {
    const nextCursor = cursor + 1;
    const nextState = insert(state, nextCursor, value);

    setState(nextState);
    setCursor(nextCursor);
  };

  const value = useMemo(() => state[cursor], [state, cursor]);

  return [value, setValue, { undo, redo, cursor, size }];
};

export default useUndo;
