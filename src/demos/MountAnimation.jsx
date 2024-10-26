import React, { useRef, useState } from 'react';
import { styled, Button } from 'react-uni-comps';
import useMountTransition from '../components/useTransition';

const Item = styled.div`
  display: inline-block;
  position: fixed;
  transition: all 1s;
  background-image: url(https://img1.baidu.com/it/u=1109106620,180722445&fm=253&fmt=auto&app=138&f=JPEG?w=786&h=500);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  &:hover {
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
`;

export default function Test() {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  const active = useMountTransition(
    ref,
    visible,
    { width: '0px', height: '0px', left: 0, top: 0, opacity: 0 },
    { width: '300px', height: '300px', left: '100px', top: '200px', opacity: 1 },
    1000,
    60
  );
  return (
    <div>
      <Button onClick={() => setVisible((v) => !v)}>Toggle visible</Button>
      {active && <Item ref={ref} />}
    </div>
  );
}
