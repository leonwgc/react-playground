import React from 'react';
import useInViewport from '../hooks/useInViewport';

export default () => {
  const [ref, visible] = useInViewport();

  return (
    <div>
      <div style={{ width: 200, height: 100, border: '1px solid #333' }} ref={ref}>
        {visible ? 'visible' : 'not visible'}
      </div>
    </div>
  );
};
