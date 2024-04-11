import React, { useLayoutEffect, useMemo } from 'react';
import { styled, useEventListener, useLatest, useForceUpdate, useThrottle } from 'react-uni-comps';

const VirtualListWrapper = styled.div`
  position: relative;
  overflow: auto;
  box-sizing: border-box;

  // hide scroll bar
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  & * {
    box-sizing: border-box;
  }
`;

/**
 * A simple virtual list for vertically scrolling.
 * @param {*} param0
 * @returns
 */
export default function MyVirtualList({
  itemHeight = 40,
  buffer = 4,
  data = [],
  itemRender,
  height,
  style,
  className,
  ...rest
}) {
  const ref = React.useRef();
  const listViewRef = React.useRef();
  const forceUpdate = useForceUpdate();

  const dataLRef = useLatest(data);
  const offsetRef = React.useRef({ start: 0, end: 0 });

  const updateView = useThrottle((e) => {
    const { scrollTop, clientHeight } = e.target;

    const start = Math.max(Math.floor(scrollTop / itemHeight) - buffer, 0);
    const end = Math.min(
      start + Math.ceil(clientHeight / itemHeight) + buffer * 2,
      dataLRef.current.length
    );

    offsetRef.current.start = start;
    offsetRef.current.end = end;
    listViewRef.current.style.transform = `translate3d(0,${start * itemHeight}px,0)`;
    forceUpdate();
  }, 16);

  const scrollHeight = useMemo(() => {
    return data.length * itemHeight;
  }, [data.length, itemHeight]);

  useLayoutEffect(() => {
    updateView({ target: ref.current });
  }, []);

  useEventListener(ref, 'scroll', updateView);

  const { start, end } = offsetRef.current;

  return (
    <VirtualListWrapper ref={ref} className={className} style={{ height, ...style }} {...rest}>
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
      <div ref={listViewRef}>{data.slice(start, end).map(itemRender)}</div>
    </VirtualListWrapper>
  );
}
