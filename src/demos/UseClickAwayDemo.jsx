import React, { useState, useRef } from 'react';
import useClickAway from '../hooks/useClickAway';
import { Button } from 'react-uni-comps';

export default () => {
  const [counter, setCounter] = useState(0);

  const ref = useClickAway(() => {
    setCounter((s) => s + 1);
  });

  return (
    <div>
      <Button ref={ref} type="primary">
        box
      </Button>
      <p style={{ userSelect: 'none' }}>counter: {counter}</p>
    </div>
  );
};
