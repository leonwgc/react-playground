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

  const undo = useCallback(() => setCursor(cursor - 1), [cursor]);
  const redo = useCallback(() => setCursor(cursor + 1), [cursor]);

  const setValue = (value: T) => {
    const nextCursor = cursor + 1;
    const nextState = insert(state, nextCursor, value);

    setState(nextState);
    setCursor(nextCursor);
  };

  const value = useMemo(() => state[cursor], [state, cursor]);

  return [value, setValue, undo, redo];
};

export default useUndo;
