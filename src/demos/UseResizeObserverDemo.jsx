import React, { useRef, useState } from 'react';
import useMeasure from '../hooks/useMeasure';
// import TextAreaInput from 'src/components/TextAreaInput';
// import useDebounceValue from '../hooks/useDebounceValue';

export default () => {
  const [value, setValue] = useState();

  const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure();

  return (
    <div>
      <textarea
        ref={ref}
        style={{ resize: 'both', paddingRight: 6, boxSizing: 'border-box' }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>

      <div>
        <div>x: {x}</div>
        <div>y: {y}</div>
        <div>width: {width}</div>
        <div>height: {height}</div>
        <div>top: {top}</div>
        <div>right: {right}</div>
        <div>bottom: {bottom}</div>
        <div>left: {left}</div>
      </div>
    </div>
  );
};
