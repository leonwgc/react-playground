import React, { useState } from 'react';
import Table from 'alcedo-ui/Table';

import { Icon, styled, Space, Input } from 'react-uni-comps';

const EditableText = (props) => {
  const { isEdit = false, value, onChange, onSubmit, ...rest } = props;

  return (
    <div {...rest}>
      {isEdit ? (
        <Input
          value={value}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.which === 13) {
              onSubmit();
            }
          }}
        />
      ) : (
        value
      )}
    </div>
  );
};

const StyledTable = styled(Table)`
  tr {
    .uc-icon {
      color: #fff;
      cursor: pointer;
    }
    &:hover {
      .uc-icon {
        color: #06789d;
      }
    }
  }
`;

export default function App() {
  const [data, setData] = useState([
    {
      name: 'hotel2',
      id: 1,
      msg: 'hi'
    },
    {
      name: 'hotel2',
      id: 2,
      msg: 'hi2'
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
      headRenderer: 'Id',
      bodyRenderer: (rowData) => rowData.id
    },
    {
      key: 'msg',
      align: Table.Align.LEFT,
      headRenderer: 'Msg',
      bodyRenderer: (rowData) => (
        <Space size={8}>
          <EditableText
            isEdit={rowData.isEdit}
            value={rowData.msg}
            onChange={(v) => {
              rowData.msg = v;
              setData([...data]);
            }}
            onSubmit={() => {
              delete rowData.isEdit;
              setData([...data]);
            }}
          />
          {rowData.isEdit ? null : (
            <Icon
              type="uc-icon-bianji"
              onClick={() => {
                rowData.isEdit = true;
                setData([...data]);
              }}
            />
          )}
        </Space>
      )
    }
  ];

  return <StyledTable isPaginated={false} columns={columns} data={data} />;
}
