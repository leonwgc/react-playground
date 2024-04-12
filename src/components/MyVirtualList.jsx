import React, { useCallback, useImperativeHandle, useLayoutEffect, useMemo } from 'react';
import { useLatest, useForceUpdate, useThrottle } from 'react-uni-comps';

/**
 * A simple virtual list for vertically scrolling.
 * @param {*} param0
 * @returns
 */
const MyVirtualList = React.forwardRef(
  (
    {
      itemHeight = 40,
      buffer = 2,
      data = [],
      itemRender,
      height,
      style,
      component = 'div',
      ...rest
    },
    ref
  ) => {
    const outerRef = React.useRef();
    const listViewRef = React.useRef();
    const forceUpdate = useForceUpdate();

    const dataLRef = useLatest(data);
    const offsetRef = React.useRef({ start: 0, end: 0 });

    useImperativeHandle(ref, () => outerRef.current);

    const updateView = useThrottle((e) => {
      const { scrollTop, clientHeight } = e.target;

      const start = Math.max(Math.floor(scrollTop / itemHeight) - buffer, 0);
      const end = Math.min(
        start + Math.ceil(clientHeight / itemHeight) + buffer * (start === 0 ? 1 : 2),
        dataLRef.current.length
      ); // first & last visual count + buffer, others + top buffer + bottom buffer

      offsetRef.current.start = start;
      offsetRef.current.end = end;
      listViewRef.current.style.transform = `translate3d(0,${start * itemHeight}px,0)`;
      forceUpdate();
    }, 16);

    const scrollHeight = useMemo(() => {
      return data.length * itemHeight;
    }, [data.length, itemHeight]);

    useLayoutEffect(() => {
      updateView({ target: outerRef.current });
    }, []);

    const onScroll = useCallback(updateView, []);

    const { start, end } = offsetRef.current;

    return React.createElement(
      component,
      {
        ref: outerRef,
        onScroll,
        style: { height, position: 'relative', overflow: 'auto', ...style },
        ...rest
      },
      <>
        <div
          style={{
            height: scrollHeight,
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            zIndex: -1
          }}
        />
        <div
          ref={listViewRef}
          style={{ WebkitOverflowScrolling: 'touch', willChange: 'transform' }}
        >
          {data.slice(start, end).map(itemRender)}
        </div>
      </>
    );
  }
);

export default MyVirtualList;
