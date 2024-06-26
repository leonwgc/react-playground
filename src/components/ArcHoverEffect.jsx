import React, { useEffect, useRef } from 'react';
import { styled } from 'react-uni-comps';

const StyledContainer = styled.div`
  .ef-scene {
    perspective: 800px;
    .ef-object {
      transform-style: preserve-3d;
      position: relative;
    }
  }
`;

function handleMove(e) {
  const el = e.currentTarget;
  const height = el.clientHeight;
  const width = el.clientWidth;
  const xVal = e.offsetX;
  const yVal = e.offsetY;
  const yRotation = 20 * ((xVal - width / 2) / width);
  const xRotation = -20 * ((yVal - height / 2) / height);
  const string = 'scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
  e.currentTarget.style.transform = string;
}

const onMouseOut = (e) => {
  e.currentTarget.style.transform = 'scale(1) rotateX(0) rotateY(0)';
};

export default function ArcHoverEffect({ children }) {
  const ref = useRef();

  useEffect(() => {
    let el = ref.current;
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseout', onMouseOut);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <StyledContainer>
      <div className="ef-scene">
        <div className="ef-object" ref={ref}>
          <div className="ef-face">{children}</div>
        </div>
      </div>
    </StyledContainer>
  );
}
