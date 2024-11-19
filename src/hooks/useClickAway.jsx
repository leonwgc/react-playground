import React from 'react';

export default function useClickAway(cb) {
  const ref = React.useRef(null);
  const cbRef = React.useRef(cb);

  React.useLayoutEffect(() => {
    cbRef.current = cb;
  });

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
