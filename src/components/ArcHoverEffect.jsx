import React, { useRef } from 'react';
import { styled, useEventListener } from 'react-uni-comps';

const StyledContainer = styled.div`
  .ef-scene {
    perspective: 800px;
    .ef-object {
      transform-style: preserve-3d;
      position: relative;
      transition: all 0.2s ease;
    }
  }
`;

function handleMove(e) {
  const el = e.currentTarget;
  const height = el.clientHeight;
  const width = el.clientWidth;
  const xVal = e.offsetX;
  const yVal = e.offsetY;
  const yRotation = 10 * ((xVal - width / 2) / width);
  const xRotation = -10 * ((yVal - height / 2) / height);
  e.currentTarget.style.transform = 'rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
}

const onMouseOut = (e) => {
  e.currentTarget.style.transform = 'rotateX(0) rotateY(0)';
};

export default function ArcHoverEffect({ children }) {
  const ref = useRef();

  useEventListener(ref, 'mousemove', handleMove);
  useEventListener(ref, 'mouseout', onMouseOut);

  return (
    <StyledContainer>
      <div className="ef-scene">
        <div className="ef-object" ref={ref}>
          {children}
        </div>
      </div>
    </StyledContainer>
  );
}
