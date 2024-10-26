import React, { useCallback, useState } from 'react';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { styled } from 'react-uni-comps';

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
    hasNextPage: true,
    items: initList,
    loadingMore: false
  });

  let loadMoreItems = (startIndex: number, stopIndex: number): Promise<any> => {
    setData({ ...data, loadingMore: true });
    return new Promise(() =>
      setTimeout(() => {
        setData({
          hasNextPage: data.items.length < 100,
          items: [...data.items].concat(
            new Array(10).fill(true).map((e, i) => items.length + i + 1)
          ),
          loadingMore: false
        });
      }, 1000)
    );
  };

  const { hasNextPage, items = [] } = data;
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  const isItemLoaded = useCallback(
    (index: number) => {
      return index < items.length;
    },
    [items]
  );

  const Row = useCallback(
    ({ index, style }) => (
      <Item className="item" style={style} key={items[index]}>
        {!isItemLoaded(index) ? 'Loading....' : items[index]}
      </Item>
    ),
    [items, isItemLoaded]
  );

  return (
    <div>
      <h3>react window infinite list </h3>

      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            overscanCount={6}
            ref={ref}
            height={400}
            width={400}
            itemCount={itemCount}
            style={{ border: '1px dashed #eee' }}
            itemSize={40}
            onItemsRendered={onItemsRendered}
          >
            {Row}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </div>
  );
}
