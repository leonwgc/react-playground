import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useMount, Divider, Button } from 'react-uni-comps';
import Table from 'alcedo-ui/Table';
import TextField from 'alcedo-ui/TextField';
import { get } from '~/utils/req';
import { useAppData, useUpdateStore } from '~/redux';

export default function App() {
  const [data, setData] = useState([
    {
      name: 'hotel name',
      text: 'Title',
      id: 1,
      english: 'hi',
      children: [
        { name: '', text: 'Url', id: 11, english: 'www.baidu.com' },
        { name: '', text: 'Description1', id: 12, english: 'des1' },
        { name: '', text: 'Description2', id: 13, english: 'des2' }
      ]
    }
  ]);

  // dynamic add
  const [data1, setData1] = useState([
    {
      name: 'hotel name',
      index: 1,
      ch: 'nihao',
      english: 'hi',
      children: []
    },
    {
      name: 'hotel name',
      index: 1,
      ch: 'nihao',
      english: 'hi',
      children: []
    }
  ]);

  const columns = [
    {
      key: 'name',
      align: Table.Align.LEFT,
      headRenderer: 'name',
      bodyRenderer: (rowData) => rowData.name
    },
    {
      key: 'text',
      align: Table.Align.LEFT,
      headRenderer: 'Text',
      bodyRenderer: (rowData) => rowData.text
    },
    {
      key: 'english',
      align: Table.Align.LEFT,
      headRenderer: 'English',
      bodyRenderer: (rowData) => (
        <TextField
          value={rowData.english}
          onChange={(v) => {
            rowData.english = v;
            setData([...data]);
          }}
        />
      )
    }
  ];

  const columns1 = [
    {
      key: 'name',
      align: Table.Align.LEFT,
      headRenderer: 'Name',
      bodyRenderer: (rowData) => (
        <div>
          {rowData.name}
          {rowData.name && (
            <div>
              <Button
                type="primary"
                onClick={() => {
                  let lastLen = rowData.children?.length || 0;
                  lastLen += 2;

                  rowData.children.push({
                    english: '',
                    chinese: '',
                    index: lastLen
                  });

                  setData1([...data1]);
                }}
              >
                Add Value
              </Button>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'text',
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
        return <div>value {rowData.index}</div>;
      }
    },
    {
      key: 'english',
      align: Table.Align.LEFT,
      headRenderer: 'English',
      bodyRenderer: (rowData, rowIndex) => (
        <TextField
          value={rowData.english}
          onChange={(v) => {
            rowData.english = v;
            setData1([...data1]);
          }}
        />
      )
    }
  ];

  console.log(data1);

  return (
    <div>
      <Table
        idField="content"
        isHeadFixed={true}
        isPaginated={false}
        canBeExpanded
        columns={columns}
        data={data}
        selectMode={Table.SelectMode.MULTI_SELECT}
      />
      <Divider>dynamic</Divider>

      <Table isHeadFixed={true} isPaginated={false} canBeExpanded columns={columns1} data={data1} />
    </div>
  );
}
