import React from 'react';
import { createGlobalStyle } from 'react-uni-comps';

const GlobalStyle = createGlobalStyle`

body {
    margin: 0;
    padding: 0;
}

.wrap {
    height: 100vh;
    width: 100vw;
    max-height: 100vh;
    overflow-y: scroll;
    padding-left: 10px;
}

@supports (animation-timeline: scroll()) {

@keyframes scroll-animation {
  from {
    font-size: 14px;
    color: #999;
  }
  to {
    font-size: 42px;
    color: #000;
  }
}

.ani {
  position: relative;
  top:200px;
}

.ani {
  animation: scroll-animation linear both;
  animation-timeline: scroll();
  animation-range: 0 200px;
}
}
`;

export default function ScrollDrivenAnimation() {
  return (
    <div className="wrap">
      <GlobalStyle />
      <div className="ani">hello,world</div>
      <div
        style={{
          height: '200vh',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}
      ></div>
    </div>
  );
}
