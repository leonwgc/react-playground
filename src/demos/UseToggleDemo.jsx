import React from 'react';
import useToggle from '../hooks/useToggle';
import { Button } from 'react-uni-comps';

export default () => {
  const [on, toggle] = useToggle(false);
  return (
    <div>
      <Button onClick={toggle}>Toggle</Button>
      <div>{on ? 'on' : 'off'}</div>
    </div>
  );
};
