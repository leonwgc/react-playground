import React, { useState } from 'react';
import useMeasure from '../hooks/useMeasure';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-uni-comps';

export default () => {
  const history = useHistory();
  const [value, setValue] = useState();
  const [ref, { width, height }] = useMeasure();

  return (
    <div>
      <textarea
        ref={ref}
        style={{
          resize: 'both',
          paddingRight: 6,
          boxSizing: 'border-box',
          width: 200,
          height: 100
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>

      <div>
        <div>width: {width}</div>
        <div>height: {height}</div>
      </div>

      <Button onClick={() => history.push('/use-mount-animation')}>use-mount-animation</Button>
    </div>
  );
};
