import React, { useState } from 'react';
import useDebounceValue from '../hooks/useDebounceValue';

export default () => {
  const [value, setValue] = useState();
  const debouncedValue = useDebounceValue(value);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
    </div>
  );
};
