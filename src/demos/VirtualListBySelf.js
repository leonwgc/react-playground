import React, { useRef, useState } from 'react';
import MyVirtualList from '../components/MyVirtualList';
import { styled, InputNumber } from 'react-uni-comps';

const StyledVList = styled(MyVirtualList)`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

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
  const ref = useRef();
  const [n, setN] = useState(0);
  return (
    <div>
      <h3>
        virtual list from self{' '}
        <InputNumber
          placeholder="scroll to Item {index}"
          value={n}
          onChange={setN}
          onPressEnter={(v) => {
            ref.current.scrollTo(Number(v));
          }}
        />
      </h3>

      <StyledVList
        ref={ref}
        data={data}
        height={400}
        style={{ width: 400, border: '1px dashed #eee' }}
        itemHeight={40}
        itemRender={({ item, index, style }) => (
          <Item style={style} item={index} data-key={index} key={index}>
            {item}
          </Item>
        )}
      />
    </div>
  );
}
