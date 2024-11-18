import React from 'react';
import useUndo from '../hooks/useUndo';

const Counter = () => {
  const [state, cursor, setValue, { undo, redo }] = useUndo(0);

  const value = state[cursor];

  const increment = () => setValue(value + 1);
  const decrement = () => setValue(value - 1);

  return (
    <>
      <div>{value}</div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>
    </>
  );
};

export default Counter;
