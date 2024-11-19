import React from 'react';
import { useLatest } from 'react-uni-comps';

export default function useClickAway(cb) {
  const ref = React.useRef(null);
  const cbRef = useLatest(cb);

  React.useEffect(() => {
    const handler = (e) => {
      const element = ref.current;
      if (element && !element.contains(e.target)) {
        cbRef.current?.(e);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  return ref;
}
