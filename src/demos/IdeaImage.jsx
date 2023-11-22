import React, { useRef, useState } from 'react';
import { FileInputTrigger, Button, Space, styled } from 'react-uni-comps';

const StyledImageWrap = styled.div`
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 8px;
  background-color: #fff;
  width: 284px;

  .b1 {
    width: 4px;
    height: 54px;
    background-color: #ddd;
  }

  .b2 {
    width: 3px;
    height: 48px;
    background-color: #eee;
  }
  .text {
    font-size: 12px;
    color: #333;
    margin-left: 8px;

    div:first-of-type {
      margin-bottom: 4px;
    }
  }
`;

export default function App() {
  return (
    <StyledImageWrap>
      <img
        width={101}
        height={62}
        src="https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2023/05/29/5d5a593d-d9b2-4cb6-86ba-349342a8364f_44459f1b.jpg"
      />
      <div className="b1" />
      <div className="b2" />
      <div className="text">
        <div>Building</div>
        <div>Landscape</div>
      </div>
    </StyledImageWrap>
  );
}
