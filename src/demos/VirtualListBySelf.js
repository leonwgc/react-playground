import React from 'react';
import MyVirtualList from '../components/MyVirtualList';
import { styled } from 'react-uni-comps';

const Item = styled.div`
  box-sizing: border-box;
  height: 40px;
  border-bottom: 1px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const data = new Array(60).fill().map((e, i) => i + 1);

export default function VirtualListDemo() {
  return (
    <div>
      <h3>virtual list from self</h3>

      <MyVirtualList
        data={data}
        height={400}
        style={{ width: 200, border: '1px dashed #eee' }}
        itemHeight={40}
        buffer={4}
        itemRender={(item) => (
          <Item className="item" key={item}>
            {item}
          </Item>
        )}
      />
    </div>
  );
}
