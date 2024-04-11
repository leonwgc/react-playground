import React from 'react';
import { styled } from 'react-uni-comps';
import List from 'rc-virtual-list';

const data = new Array(100).fill().map((e, i) => i + 1);

const StyledList = styled.div`
  box-sizing: border-box;
  padding: 1px;
  width: 200px;
  border: 1px solid #ccc;

  .item {
    box-sizing: border-box;
    height: 60px;
    border: 1px dashed #00bc8d;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function VirtualListDemo() {
  return (
    <div>
      <h3>virtual list from Ali</h3>
      <div>
        <StyledList>
          <List data={data} height={400} itemHeight={60} component={StyledList} itemKey="id">
            {(item) => (
              <div className="item" key={item}>
                {item}
              </div>
            )}
          </List>
        </StyledList>
      </div>
    </div>
  );
}
