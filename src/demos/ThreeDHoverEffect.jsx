import React, { useEffect, useState } from 'react';
import { clsx, styled } from 'react-uni-comps';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  .ef-scene {
    perspective: 800px;
    .ef-object {
      transform-style: preserve-3d;
      position: relative;

      .ef-face {
        display: inline-block;
        height: 200px;
        width: 300px;
        transition: box-shadow 0.2s, transform 0.2s;
        background-image: url(https://img1.baidu.com/it/u=1109106620,180722445&fm=253&fmt=auto&app=138&f=JPEG?w=786&h=500);
        background-size: 100% 100%;
        background-repeat: no-repeat;

        &:hover {
          box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.6);
          cursor: pointer;
        }
      }
    }
  }
`;

export default function Test() {
  useEffect(() => {
    let el = document.querySelector('.ef-object');

    const height = el.clientHeight;
    const width = el.clientWidth;

    el.addEventListener('mousemove', handleMove);

    /* Define function a */
    function handleMove(e) {
      const xVal = e.layerX;
      const yVal = e.layerY;
      /*
       * Calculate rotation valuee along the Y-axis
       * Here the multiplier 20 is to
       * Control the rotation
       */
      const yRotation = 20 * ((xVal - width / 2) / width);
      const xRotation = -20 * ((yVal - height / 2) / height);
      const string = 'rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg) scale(1.1)';
      e.currentTarget.style.transform = string;
    }

    el.addEventListener('mouseout', function (e) {
      e.currentTarget.style.transform = ' scale(1) rotateX(0) rotateY(0)';
    });

    el.addEventListener('mousedown', function (e) {
      e.currentTarget.style.transform = 'scale(0.9) rotateX(0) rotateY(0)';
    });

    el.addEventListener('mouseup', function (e) {
      e.currentTarget.style.transform = 'scale(1.1) rotateX(0) rotateY(0)';
    });
  }, []);
  return (
    <StyledContainer>
      <div className="ef-scene">
        <div className="ef-object">
          <div className="ef-face"></div>
        </div>
      </div>
    </StyledContainer>
  );
}
