import React from 'react';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { Button } from 'react-uni-comps';

export default () => {
  const [v, copy] = useCopyToClipboard();

  return (
    <div>
      <Button
        onClick={() => {
          copy('hello,wrold');
        }}
        type="primary"
      >
        copy hello
      </Button>
    </div>
  );
};
