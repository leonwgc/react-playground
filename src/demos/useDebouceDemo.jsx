import React, { useState } from 'react';
import useDebounceValue from '../hooks/useDebounceValue';

export default () => {
  const [value, setValue] = useState();
  const debouncedValue = useDebounceValue(value);

  return (
    <div>
      <input
        style={{ magin: 20, width: 280, height: 40, fontSize: 18 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
      />
      <p style={{ marginTop: 16, fontSize: 20, color: debouncedValue === value ? '#333' : '#999' }}>
        DebouncedValue: {debouncedValue}
      </p>
    </div>
  );
};
