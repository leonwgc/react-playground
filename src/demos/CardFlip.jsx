import React, { useState } from 'react';
import { clsx, styled } from 'react-uni-comps';

const StyledContainer = styled.div`
  .scene {
    width: 200px;
    height: 200px;
    perspective: 600px;

    .card {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      border: 1px solid #eee;
      transition: all ease-out 0.6s;

      &.clicked {
        transform: rotateY(180deg);
      }

      .face {
        position: absolute;
        width: 100%;
        height: 100%;
        color: #fff;
        font-size: 50px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        backface-visibility: hidden;

        &.front {
          background-color: red;
        }
        &.back {
          background-color: blue;
          transform: rotateY(180deg);
        }
      }
    }
  }
`;

export default function Test() {
  const [clicked, setCilcked] = useState(false);
  return (
    <StyledContainer>
      <div className="scene" onClick={() => setCilcked((c) => !c)}>
        <div className={clsx('card', { clicked: clicked })}>
          <div className={clsx('face back')}>back</div>
          <div className={clsx('face front')}>front</div>
        </div>
      </div>
    </StyledContainer>
  );
}
