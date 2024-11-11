import { useEffect, useState } from 'react';
import { useDebounce } from 'react-uni-comps';

const useDebounceValue = (value, timeout = 600) => {
  const [v, setV] = useState(value);
  const debounceFunc = useDebounce(setV, timeout, [timeout]);

  useEffect(() => {
    debounceFunc(value);
  }, [value]);

  return v;
};

export default useDebounceValue;
