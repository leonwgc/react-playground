import React, { useState } from 'react';
import { clsx, styled } from 'react-uni-comps';

const StyledContainer = styled.div`
  .scene {
    width: 200px;
    height: 200px;
    perspective: 600px;

    .cube {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transform: translateZ(-100px) rotate3d(1, 1, 1, 45deg);

      .cube__face {
        position: absolute;
        width: 200px;
        height: 200px;
        color: #fff;
        box-sizing: border-box;

        backface-visibility: hidden;

        &--front {
          transform: rotateY(0deg) translateZ(100px);
          background-color: red;
        }
        &--right {
          transform: rotateY(90deg) translateZ(100px);
          background-color: green;
        }
        &--back {
          transform: rotateY(180deg) translateZ(100px);
          background-color: blue;
        }
        &--left {
          transform: rotateY(-90deg) translateZ(100px);
          background-color: pink;
        }
        &--top {
          transform: rotateX(90deg) translateZ(100px);
          background-color: purple;
        }
        &--bottom {
          transform: rotateX(-90deg) translateZ(100px);
          background-color: #00bc8d;
        }
      }
    }
  }
`;

export default function Test() {
  return (
    <StyledContainer>
      <div class="scene">
        <div class="cube">
          <div class="cube__face cube__face--front">front</div>
          <div class="cube__face cube__face--right">right</div>
          <div class="cube__face cube__face--back">back</div>
          <div class="cube__face cube__face--left">left</div>
          <div class="cube__face cube__face--top">top</div>
          <div class="cube__face cube__face--bottom">bottom</div>
        </div>
      </div>
    </StyledContainer>
  );
}
