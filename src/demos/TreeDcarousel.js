import React, { useState } from 'react';
import { clsx, styled } from 'react-uni-comps';

// refer: https://3dtransforms.desandro.com/carousel
const StyledContainer = styled.div`
  width: 210px;
  height: 140px;
  position: relative;
  perspective: 1000px;

  top: 60px;
  left: 300px;

  @keyframes rotateAn {
    0% {
      transform: rotateY(-160deg);
    }
    11% {
      transform: rotateY(-120deg);
    }
    22% {
      transform: rotateY(-80deg);
    }
    33% {
      transform: rotateY(-40deg);
    }
    44% {
      transform: rotateY(0deg);
    }
    55% {
      transform: rotateY(40deg);
    }
    66% {
      transform: rotateY(80deg);
    }
    77% {
      transform: rotateY(120deg);
    }
    88% {
      transform: rotateY(160deg);
    }
    100% {
      transform: rotateY(200deg);
    }
  }

  .cube {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    transform: translateZ(-288px) rotateY(-160deg);
    animation: rotateAn 18s ease-in-out infinite;

    .carousel__cell {
      width: 190px;
      height: 120px;
      position: absolute;
      left: 10px;
      top: 10px;
    }

    .carousel__cell:nth-child(1) {
      transform: rotateY(0deg) translateZ(288px);
    }
    .carousel__cell:nth-child(2) {
      transform: rotateY(40deg) translateZ(288px);
    }
    .carousel__cell:nth-child(3) {
      transform: rotateY(80deg) translateZ(288px);
    }
    .carousel__cell:nth-child(4) {
      transform: rotateY(120deg) translateZ(288px);
    }
    .carousel__cell:nth-child(5) {
      transform: rotateY(160deg) translateZ(288px);
    }
    .carousel__cell:nth-child(6) {
      transform: rotateY(200deg) translateZ(288px);
    }
    .carousel__cell:nth-child(7) {
      transform: rotateY(240deg) translateZ(288px);
    }
    .carousel__cell:nth-child(8) {
      transform: rotateY(280deg) translateZ(288px);
    }
    .carousel__cell:nth-child(9) {
      transform: rotateY(320deg) translateZ(288px);
    }
  }
`;

export default function Test() {
  return (
    <StyledContainer className="container">
      <div className={clsx('cube')}>
        <img
          className="carousel__cell"
          src="https://img1.baidu.com/it/u=1109106620,180722445&fm=253&fmt=auto&app=138&f=JPEG?w=786&h=500"
        />
        <img
          className="carousel__cell"
          src="https://img2.baidu.com/it/u=530881988,2851020410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=258"
        />
        <img
          className="carousel__cell"
          src="https://www.regenthotel.ca/Content/images/gallery/gallery5.jpg"
        />
        <img
          className="carousel__cell"
          src="https://img1.baidu.com/it/u=1983844725,1214372348&fm=253&fmt=auto&app=138&f=JPEG?w=773&h=500"
        />
        <img
          className="carousel__cell"
          src="https://img1.baidu.com/it/u=1109106620,180722445&fm=253&fmt=auto&app=138&f=JPEG?w=786&h=500"
        />
        <img
          className="carousel__cell"
          src="https://img2.baidu.com/it/u=530881988,2851020410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=258"
        />
        <img
          className="carousel__cell"
          src="https://www.regenthotel.ca/Content/images/gallery/gallery5.jpg"
        />
        <img
          className="carousel__cell"
          src="https://img1.baidu.com/it/u=1109106620,180722445&fm=253&fmt=auto&app=138&f=JPEG?w=786&h=500"
        />
        <img
          className="carousel__cell"
          src="https://img2.baidu.com/it/u=530881988,2851020410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=258"
        />
      </div>
    </StyledContainer>
  );
}
