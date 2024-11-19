import React, { useState } from 'react';
import useThrottle from '../hooks/useThrottle';

export default () => {
  const [value, setValue] = useState();
  const throttleValue = useThrottle(value);

  return (
    <div>
      <input
        style={{ magin: 20, width: 280, height: 40, fontSize: 18 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
      />
      <p style={{ marginTop: 16, fontSize: 20, color: throttleValue === value ? '#333' : '#999' }}>
        throttleValue: {throttleValue}
      </p>
    </div>
  );
};
