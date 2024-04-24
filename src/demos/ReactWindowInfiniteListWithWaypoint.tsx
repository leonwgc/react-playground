import React, { useCallback, useState } from 'react';
import { FixedSizeList } from 'react-window';
import { styled, Waypoint } from 'react-uni-comps';

const Item = styled.div`
  box-sizing: border-box;
  height: 40px;
  border-bottom: 1px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const initList = new Array(16).fill(0).map((e, i) => i + 1);

export default function VirtualListDemo() {
  const [data, setData] = useState({
    hasMoreData: true,
    items: initList,
    loadingMore: false
  });

  let loadMoreItems = (startIndex?: number): Promise<any> => {
    setData({ ...data, loadingMore: true });
    return new Promise(() =>
      setTimeout(() => {
        setData({
          hasMoreData: data.items.length < 100,
          items: [...data.items].concat(
            new Array(10).fill(true).map((e, i) => items.length + i + 1)
          ),
          loadingMore: false
        });
      }, 300)
    );
  };

  const { hasMoreData, items = [], loadingMore } = data;
  const itemCount = hasMoreData ? items.length + 1 : items.length;

  const Row = useCallback(
    ({ index, style }) => (
      <Item className="item" style={style} key={items[index]}>
        {index < items.length ? (
          items[index]
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Waypoint onVisible={() => !loadingMore && loadMoreItems(items.length)} />
            <div>Loading....</div>
          </div>
        )}
      </Item>
    ),
    [items]
  );

  return (
    <div>
      <h3>react window infinite list with waypoint </h3>

      <FixedSizeList
        overscanCount={6}
        height={400}
        width={400}
        itemCount={itemCount}
        style={{ border: '1px dashed #eee' }}
        itemSize={40}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
}
