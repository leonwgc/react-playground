import React, { useRef, useState } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { styled } from 'react-uni-comps';

const Item = styled.div`
  box-sizing: border-box;
  height: 40px;
  border-bottom: 1px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const data = new Array(600).fill().map((e, i) => i + 1);

export default function VirtualListDemo() {
  const ref = useRef();

  return (
    <div>
      <h3>react window </h3>

      <div style={{ height: 'calc(100vh - 300px)', width: 400 }}>
        <AutoSizer>
          {({ width, height }) => (
            <FixedSizeList
              ref={ref}
              data={data}
              height={height}
              width={width}
              itemCount={data.length}
              style={{ border: '1px dashed #eee' }}
              itemSize={40}
            >
              {({ index, style }) => (
                <Item className="item" style={style} key={data[index]}>
                  {data[index]}
                </Item>
              )}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}
