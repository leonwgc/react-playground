import React, { useCallback, useEffect, useMemo } from 'react';
import throttle from 'lodash/throttle';
import { useEventListener, useUpdateEffect } from 'react-uni-comps';

export const useThrottle = (fn, wait, options) => {
  return React.useMemo(() => throttle(fn, wait, options), [fn, wait, options]);
};

export default function Test() {
  const log = useThrottle(() => console.log(1), 1000);
  useEventListener(document, 'scroll', log);

  return <div style={{ height: '200vh' }}></div>;
}
