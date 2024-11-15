import React, { useRef, useState } from 'react';
import 'animate.css';
import useMountAnimationCSS from '../hooks/useMountAnimation';

export default () => {
  const ref = useMountAnimationCSS('fadeInDown', () => {
    console.log('finished');
  });
  return (
    <div>
      <div
        ref={ref}
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'red',
          position: 'fixed',
          top: 100,
          left: 200
        }}
      />
    </div>
  );
};
