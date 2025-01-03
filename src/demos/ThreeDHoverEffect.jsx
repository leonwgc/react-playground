import React, { useEffect, useState } from 'react';
import { clsx, styled, createGlobalStyle } from 'react-uni-comps';
import ArcHoverEffect from '../components/ArcHoverEffect';

// ref: https://codepen.io/technokami/pen/abojmZa

const GlobalStyle = createGlobalStyle`
   body{
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
   }
`;

const Item = styled.div`
  display: inline-block;
  height: 300px;
  width: 400px;
  transition: box-shadow 0.1s, transform 0.1s;
  background-image: url(https://img1.baidu.com/it/u=1109106620,180722445&fm=253&fmt=auto&app=138&f=JPEG?w=786&h=500);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  &:hover {
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.6);
  }
`;

export default function Test() {
  return (
    <>
      <GlobalStyle />
      <ArcHoverEffect>
        <Item />
      </ArcHoverEffect>
    </>
  );
}
