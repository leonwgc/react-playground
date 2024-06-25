import React, { useState } from 'react';
import { clsx, styled } from 'react-uni-comps';

const StyledContainer = styled.div`
  width: 200px;
  height: 200px;
  perspective: 600px;

  .cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    border: 1px solid #eee;
    transform: rotateY(0deg);
    transition: all ease-out 0.6s;
  }

  .cube__face {
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: red;
    color: #fff;
    font-size: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
      transform: rotateY(5deg) skewY(2deg) translateZ(20px);
      font-size: 60px;
      filter: brightness(1.1);
    }
  }
`;

export default function Test() {
  return (
    <StyledContainer>
      <div className={clsx('cube')}>
        <div className={clsx('cube__face')}>Done</div>
      </div>
    </StyledContainer>
  );
}
