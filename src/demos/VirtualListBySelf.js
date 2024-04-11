import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { styled, useEventListener, useLatest, useForceUpdate } from 'react-uni-comps';

const data = new Array(50).fill().map((e, i) => i + 1);

const VirtualListWrapper = styled.div`
  border: 1px solid #ccc;
  width: 200px;
  height: 400px;
  position: relative;
  overflow: auto;
  box-sizing: border-box;

  // hide scroll bar
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  .list-phantom {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;
  }

  .list-view {
  }

  & * {
    box-sizing: border-box;
  }

  .item {
    box-sizing: border-box;
    height: 40px;
    border: 1px dashed #00bc8d;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function VirtualListDemo({ itemHeight = 40, buffer = 2 }) {
  const ref = React.useRef();
  const listViewRef = React.useRef();
  const visibleHeightRef = useRef(0);
  const forceUpdate = useForceUpdate();

  const scrollHeight = useMemo(() => {
    return data.length * itemHeight;
  }, [data.length, itemHeight]);

  const dataLRef = useLatest(data);
  const offsetRef = React.useRef({ start: 0, end: 0 });

  useLayoutEffect(() => {
    visibleHeightRef.current = ref.current.offsetHeight;
    offsetRef.current.end = ref.current.offsetHeight / itemHeight;
    forceUpdate();
  }, []);

  useEventListener(ref, 'scroll', (e) => {
    const { scrollTop, clientHeight } = e.target;

    const start = Math.max(Math.floor(scrollTop / itemHeight), 0);
    const end = Math.min(
      start + Math.ceil(clientHeight / itemHeight) + buffer,
      dataLRef.current.length
    );

    offsetRef.current.start = start;
    offsetRef.current.end = end;

    listViewRef.current.style.transform = `translate3d(0,${start * itemHeight}px,0)`;

    forceUpdate();
  });

  const { start, end } = offsetRef.current;

  return (
    <div>
      <h3>virtual list from Ali</h3>

      <VirtualListWrapper ref={ref}>
        <div className="list-phantom" style={{ height: scrollHeight }}></div>
        <div className="list-view" ref={listViewRef}>
          {data.slice(start, end).map((item) => (
            <div className="item" key={item}>
              {item}
            </div>
          ))}
        </div>
      </VirtualListWrapper>
    </div>
  );
}
