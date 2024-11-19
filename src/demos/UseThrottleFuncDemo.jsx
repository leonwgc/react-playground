import React, { useRef } from 'react';
import useThrottleFunc from '../hooks/useThrottleFunc';
import { useEventListener } from 'react-uni-comps';

export default () => {
  const timeRef = useRef(Date.now());
  useEventListener(
    window,
    'resize',
    useThrottleFunc(() => {
      const now = Date.now();
      console.log(now - timeRef.current);
      timeRef.current = now;
    })
  );

  return <div></div>;
};
