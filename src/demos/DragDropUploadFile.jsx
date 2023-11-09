import React from 'react';

import { clsx, Icon, styled, useEventListener, useUnmount, useForceUpdate } from 'react-uni-comps';

const StyledDropArea = styled.div`
  display: inline-flex;
  width: 579px;
  height: 302px;
  border: 2px dashed #ddd;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  user-select: none;
  background-color: #f4f4f4;
`;

export default function App() {
  const ref = React.useRef();
  const imgRef = React.useRef();
  const objectURLRef = React.useRef();
  const forceUpdate = useForceUpdate();

  useEventListener(ref, 'dragover', (e) => e.preventDefault());
  useEventListener(ref, 'dragenter', (e) => e.preventDefault());
  useEventListener(ref, 'drop', (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    if (files.length > 1) {
      window.alert('Please select only one file.');
      return;
    }
    const file0 = files[0];

    if (objectURLRef.current) {
      URL.revokeObjectURL(objectURLRef.current);
    }

    const objectURL = URL.createObjectURL(file0);
    objectURLRef.current = objectURL;
    // ref.current.style.background = `no-repeat center/contain url(${objectURL})`;
    forceUpdate();
  });

  useUnmount(() => {
    if (objectURLRef.current) {
      URL.revokeObjectURL(objectURLRef.current);
    }
  });

  return (
    <StyledDropArea ref={ref}>
      {objectURLRef.current ? (
        <img
          ref={imgRef}
          src={objectURLRef.current}
          onLoad={(e) => {
            console.log(e.target.width);
          }}
          style={{ objectFit: 'fill', width: '100%', height: '100%' }}
        />
      ) : (
        'Drop files here'
      )}
    </StyledDropArea>
  );
}
