import React, { useCallback, useEffect, useMemo, useState } from 'react';
import throttle from 'lodash/throttle';
import { useEventListener, useUpdateEffect, Button } from 'react-uni-comps';

import Popover from 'w-popover';

export const useThrottle = (fn, wait, options) => {
  return React.useMemo(() => throttle(fn, wait, options), [fn, wait, options]);
};

export default function Test() {
  const [visible, setVisible] = useState(true);
  return (
    <div style={{ height: '200vh' }}>
      <Popover
        visible={visible}
        onClose={() => setVisible(false)}
        closeOnClickOutside
        content="hello,world"
        transitionDuration={500}
        style={{ background: 'red', padding: 20 }}
      >
        <Button type="primary" onClick={() => setVisible(true)}>
          click me
        </Button>
      </Popover>
    </div>
  );
}
