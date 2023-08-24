import React, { useState, useCallback, useRef } from 'react';
import { useMount, useUpdateEffect } from 'react-uni-comps';
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
      english: '',
      children: [
        { name: '', text: 'Url', id: 11, english: '' },
        { name: '', text: 'Description1', id: 12, english: '' },
        { name: '', text: 'Description2', id: 13, english: '' }
      ]
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
    </div>
  );
}
