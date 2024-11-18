import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Button } from 'react-uni-comps';

const Counter = () => {
  const [value, setValue] = useLocalStorage('testKey', '0');

  return (
    <>
      <div style={{ fontSize: 20, color: 'green', margin: '20px' }}>{value}</div>

      <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
        <Button onClick={() => setValue('1')}>set value</Button>
        <Button onClick={() => setValue('0')}>reset value</Button>
      </div>
    </>
  );
};

export default Counter;
