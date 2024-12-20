import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { styled } from 'react-uni-comps';

// {
//     children: React.Element<any>,
//     width: number,
//     height: number,
//     // If you change this, be sure to update your css
//     handleSize: [number, number] = [10, 10],
//     lockAspectRatio: boolean = false,
//     axis: 'both' | 'x' | 'y' | 'none' = 'both',
//     minConstraints: [number, number] = [10, 10],
//     maxConstraints: [number, number] = [Infinity, Infinity],
//     onResizeStop?: ?(e: SyntheticEvent, data: ResizeCallbackData) => any,
//     onResizeStart?: ?(e: SyntheticEvent, data: ResizeCallbackData) => any,
//     onResize?: ?(e: SyntheticEvent, data: ResizeCallbackData) => any,
//     draggableOpts?: ?Object
//   };

const StyledRipple = styled.div`
  left: 50%;
  top: 50%;
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  color: #fff;
  font-size: 20px;
  overflow: hidden;

  @keyframes ripple {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .effect {
    position: absolute;
    top: 50%;
    width: 200%;
    height: 200%;
    border-radius: 38%;
    background-color: rgb(120, 191, 214);
    animation: ripple 2.5s linear infinite;
    animation-fill-mode: forwards;
  }
`;

function RippleLoading() {
  return (
    <StyledRipple>
      <div className="effect"></div>
    </StyledRipple>
  );
}

export default function ResizableDemo() {
  const [size, setSize] = useState({
    width: 200,
    height: 200
  });

  const onResize = (event, { node, size, handle }) => {
    setSize({ width: size.width, height: size.height });
  };

  return (
    <div>
      <RippleLoading className="ripple" />
      <Resizable
        height={size.height}
        width={size.width}
        onResize={onResize}
        minConstraints={[200, 200]}
        maxConstraints={[400, 400]}
        axis="both"
      >
        <div
          style={{
            width: size.width + 'px',
            height: size.height + 'px',
            border: '1px solid red',
            boxSizing: 'border-box'
          }}
        >
          <span>Contents</span>
        </div>
      </Resizable>
    </div>
  );
}
