import React from 'react';
import useUndo from '../hooks/useUndo';
import { Button } from 'react-uni-comps';

const Counter = () => {
  const [value, setValue, { undo, redo, canUndo, canRedo, reset }] = useUndo(0);

  const increment = () => setValue(value + 1);
  const decrement = () => setValue(value - 1);

  return (
    <>
      <div style={{ fontSize: 20, color: 'green', margin: '20px' }}>{value}</div>

      <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
        <Button onClick={increment}>increment</Button>
        <Button onClick={decrement}>decrement</Button>
        <Button onClick={undo} disabled={!canUndo}>
          undo
        </Button>
        <Button onClick={redo} disabled={!canRedo}>
          redo
        </Button>
        <Button onClick={reset}>reset</Button>
      </div>
    </>
  );
};

export default Counter;
