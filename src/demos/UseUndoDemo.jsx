import React from 'react';
import useUndo from '../hooks/useUndo';
import { Button } from 'react-uni-comps';

const Counter = () => {
  const [value, setValue, { undo, redo, cursor, size }] = useUndo(0);

  const increment = () => setValue(value + 1);
  const decrement = () => setValue(value - 1);

  return (
    <>
      <div>{value}</div>

      <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
        <Button onClick={increment}>increment</Button>
        <Button onClick={decrement}>decrement</Button>
        <Button onClick={undo} disabled={cursor === 0}>
          undo
        </Button>
        <Button onClick={redo} disabled={cursor === size - 1}>
          redo
        </Button>
      </div>
    </>
  );
};

export default Counter;
