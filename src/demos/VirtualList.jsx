import React from 'react';
import { styled, useEventListener } from 'react-uni-comps';
import List from 'rc-virtual-list';

const data = new Array(1000).fill().map((e, i) => i + 1);

const StyledList = styled.div`
  box-sizing: border-box;
  padding: 1px;
  width: 200px;
  height: 400px;
  border: 1px solid #ccc;

  .item {
    box-sizing: border-box;
    height: 40px;
    border: 1px dashed #00bc8d;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function VirtualListDemo() {
  const ref = React.useRef();
  const distance = React.useRef(0);
  useEventListener(ref, 'wheel', (e) => {
    distance.current += e.deltaY;

    console.log(distance.current);
  });
  return (
    <div>
      <h3>virtual list from Ali</h3>
      <div style={{ display: 'flex' }}>
        <StyledList>
          <List
            data={data}
            height={400}
            itemHeight={40}
            component={StyledList} // default: 'div'
            styles={{ verticalScrollBar: { display: 'none' } }} // hide vertical scrollbar
            extraRender={(info) => <div>this is end</div>}
          >
            {(item) => (
              <div className="item" key={item}>
                {item}
              </div>
            )}
          </List>
        </StyledList>

        <StyledList ref={ref} style={{ overflow: 'scroll' }}>
          <div style={{ height: '100vh' }}></div>
        </StyledList>
      </div>
    </div>
  );
}
