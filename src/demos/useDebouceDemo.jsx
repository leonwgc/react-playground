import React, { useEffect, useState } from 'react';
import { useDebounce } from 'react-uni-comps';

const useDebounceValue = (value, timeout = 600) => {
  const [v, setV] = useState(value);
  const debounceFunc = useDebounce(setV, timeout, [timeout]);

  useEffect(() => {
    debounceFunc(value);
  }, [value]);

  return v;
};

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
