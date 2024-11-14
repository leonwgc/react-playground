import React from 'react';
import useTween from '../hooks/useTween';
import { easing } from 'ts-easing';

Object.keys(easing).map((key) => console.log(key));

export default () => {
  const value = useTween('elastic', 1000, 500);

  const blueBallOpacity = useTween('inOutCubic', 1000, 1000);

  const grayBallOpacity = useTween('elastic', 400, 800);

  return (
    <div>
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: '50px',
          background: 'red',
          position: 'fixed',
          top: value * 200 - 100,
          left: 200
        }}
      />
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: '50px',
          background: 'blue',
          opacity: blueBallOpacity,
          marginLeft: 300,
          transform: `translate(${blueBallOpacity * 100 - 100}px,200px)`
        }}
      />
      // bounce in
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: '#ccc',
          top: 300,
          opacity: grayBallOpacity,
          marginLeft: 300,
          transform: `translate3d(0,${grayBallOpacity * 40 - 40}px,0)`
        }}
      />
      <div>
        <p>
          value: {value},blueBallOpacity: {blueBallOpacity}
        </p>
      </div>
    </div>
  );
};
