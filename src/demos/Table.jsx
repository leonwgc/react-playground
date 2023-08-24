import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useMount, Divider, Button, Space, Icon } from 'react-uni-comps';
import Table from 'alcedo-ui/Table';
import TextField from 'alcedo-ui/TextField';
import { get } from '~/utils/req';
import { useAppData, useUpdateStore } from '~/redux';

export default function App() {
  // dynamic add
  const [data, setData] = useState([
    {
      name: 'hotel1',
      children: [{ en: 'h1 en1', ch: 'h1 ch1' }]
    },
    {
      name: 'hotel2',
      children: [{ en: 'h2 en1', ch: '' }]
    }
  ]);

  const columns = [
    {
      key: 'name',
      align: Table.Align.LEFT,
      headRenderer: 'Name',
      bodyRenderer: (
        rowData,
        rowIndex,
        colIndex,
        parentData,
        tableData,
        collapsed,
        depth,
        path
      ) => (
        <Space align="center">
          {rowData.name}
          {!collapsed && (
            <div>
              <Icon
                type="uc-icon-jia2"
                style={{ color: '#4c637b', cursor: 'pointer' }}
                onClick={() => {
                  rowData.children.push({
                    en: '',
                    ch: ''
                  });

                  setData([...data]);
                }}
              ></Icon>
            </div>
          )}
        </Space>
      )
    },
    {
      key: 'values',
      align: Table.Align.LEFT,
      headRenderer: 'Values',
      bodyRenderer: (
        rowData,
        rowIndex,
        colIndex,
        parentData,
        tableData,
        collapsed,
        depth,
        path
      ) => {
        return (
          <div>
            {collapsed && depth === 0 ? `Values(${rowData.children?.length})` : ''}

            {depth > 0 && (
              <>
                Value {path[1].index + 1}
                <Icon
                  type="uc-icon-guanbi"
                  style={{ color: '#4c637b', marginLeft: 8, cursor: 'pointer' }}
                  onClick={() => {
                    tableData[rowIndex].children.splice(path[1].index, 1);
                    setData([...data]);
                  }}
                ></Icon>
              </>
            )}
          </div>
        );
      }
    },
    {
      key: 'en',
      align: Table.Align.LEFT,
      headRenderer: 'En',
      bodyRenderer: (rowData, rowIndex, colIndex, parentData, tableData, collapsed, depth, path) =>
        depth > 0 ? (
          <TextField
            value={rowData.en}
            onChange={(v) => {
              rowData.en = v;
              setData([...data]);
            }}
          />
        ) : collapsed ? (
          rowData.children
            .filter((item) => item.en)
            .map((item) => item.en)
            .join(', ')
        ) : null
    },
    {
      key: 'ch',
      align: Table.Align.LEFT,
      headRenderer: 'Ch',
      bodyRenderer: (rowData, rowIndex, colIndex, parentData, tableData, collapsed, depth, path) =>
        depth > 0 ? (
          <TextField
            value={rowData.ch}
            onChange={(v) => {
              rowData.ch = v;
              setData([...data]);
            }}
          />
        ) : collapsed ? (
          rowData.children
            .filter((item) => item.ch)
            .map((item) => item.ch)
            .join(', ')
        ) : null
    }
  ];

  return (
    <div>
      <Table isHeadFixed={true} isPaginated={false} canBeExpanded columns={columns} data={data} />
    </div>
  );
}
