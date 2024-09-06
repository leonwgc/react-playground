import React from 'react';
import { styled, useEventListener, createGlobalStyle } from 'react-uni-comps';

const GlobalStyle = createGlobalStyle`
  margin: 0;
  padding: 0;
`;

export default function VirtualListDemo() {
  useEventListener(window, 'scroll', (e) => {
    document.body.style.setProperty(
      '--scroll',
      window.pageYOffset / (document.body.scrollHeight - window.innerHeight)
    );
  });
  return (
    <div>
      <div
        style={{
          height: '200vh',
          width: 100,
          border: '1px solid red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      ></div>
    </div>
  );
}
