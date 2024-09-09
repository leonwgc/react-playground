import React from 'react';
import { styled, useEventListener, createGlobalStyle } from 'react-uni-comps';

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
}

  @keyframes shrink-name {
  from {
    font-size: 4em;
  }
  to {
    font-size: 1em;
  }
}

@keyframes add-shadow {
  from {
    box-shadow: none;
  }
  to {
    box-shadow: 0 4px 2px -2px gray;
  }
}

@keyframes div-ani {
  from {
    font-size: 14px;
    color: #999;
  }
  to {
    font-size: 96px;
    color: #000;
  }
}

.div {
  animation: div-ani linear both;
}

header {
  animation: add-shadow linear both;
}

h2 {
  animation: shrink-name linear both;
}

header, h2,.div {
  animation-timeline: scroll();
  animation-range: 0 200px;
}
`;

export default function ScrollDrivenAnimation() {
  useEventListener(window, 'scroll', (e) => {
    document.body.style.setProperty(
      '--scroll',
      window.pageYOffset / (document.body.scrollHeight - window.innerHeight)
    );
  });
  return (
    <div className="wrap">
      <header>Header</header>
      <h2>hello</h2>
      <GlobalStyle />
      <div className="div">hello,world</div>
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
