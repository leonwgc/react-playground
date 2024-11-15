import React, { useState } from 'react';
import 'animate.css';
import useMountAnimationCSS from '../hooks/useMountAnimation';

const effects = [
  'bounce',
  'flash',
  'pulse',
  'rubberBand',
  'bounceIn',
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceInUp',
  'shakeX',
  'shakeY',
  'headShake',
  'swing',
  'tada',
  'wobble',
  'jello',
  'heartBeat',
  'fadeIn',
  'fadeInDown',
  'fadeInDownBig',
  'fadeInLeft',
  'fadeInLeftBig',
  'fadeInRight',
  'fadeInRightBig',
  'fadeInUp',
  'fadeInUpBig',
  'fadeInTopLeft',
  'fadeInTopRight',
  'fadeInBottomLeft',
  'fadeInBottomRight'
];

let i = 0;

export default () => {
  const [animation, setAnimation] = useState(effects[0]);

  const ref = useMountAnimationCSS(
    animation,
    () => {
      setAnimation(effects[++i % effects.length]);
    },
    {
      duration: '600ms',
      delay: '.1s'
    }
  );

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
