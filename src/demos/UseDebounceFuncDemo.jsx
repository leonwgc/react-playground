import React, { useState } from 'react';
import useDebounceFunc from '../hooks/useDebounceFunc';
import { useEventListener } from 'react-uni-comps';

export default () => {
  useEventListener(
    window,
    'resize',
    useDebounceFunc(() => {
      console.log(Date.now());
    })
  );

  return <div></div>;
};
