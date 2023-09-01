import React, { useRef, useState } from 'react';
import Table from 'alcedo-ui/Table';
import Popup from 'alcedo-ui/Popup';
import { Icon, styled, Space, Input, Button, useUpdateEffect } from 'react-uni-comps';

const StyledPopWrap = styled.div`
  padding: 12px;
`;

const PopupEditableText = ({ rowData, setData, data, ...rest }) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(rowData.msg);
  const ref = useRef();

  return (
    <div>
      <span
        ref={ref}
        onClick={() => {
          setVisible(true);
        }}
      >
        {rowData.msg}
      </span>
      <Popup
        triggerEl={ref.current}
        visible={visible}
        position={Popup.Position.CENTER}
        hasTriangle={false}
        style={{ width: 232, height: 102 }}
        onRequestClose={() => setVisible(false)}
      >
        <StyledPopWrap>
          <Input
            value={value}
            onChange={(v) => {
              setValue(v);
            }}
          />
          <Space style={{ marginTop: 12 }}>
            <Button
              type="primary"
              onClick={() => {
                rowData.msg = value;
                setData([...data]);
                setVisible(false);
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setVisible(false);
                setValue(rowData.msg);
              }}
            >
              Cancel
            </Button>
          </Space>
        </StyledPopWrap>
      </Popup>
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
          <PopupEditableText rowData={rowData} setData={setData} data={data} />
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
