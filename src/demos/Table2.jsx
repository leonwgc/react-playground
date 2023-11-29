import React, { useState, useEffect, useRef } from 'react';
import Table from 'alcedo-ui/Table';
import Sortable from 'sortablejs';
import { Icon, styled, Space, Input, createGlobalStyle } from 'react-uni-comps';

const GlobalStyle = createGlobalStyle`
.sortable-chosen {
  opacity: .8;
}
.sortable-chosen .hand{
  cursor: grab;
}
.sortable-ghost {
  border-style: dashed;
  border-width: 1px;
  opacity: 0.4;
}
`;

const StyledHand = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #999;
  cursor: grab;
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;

  &:active {
    cursor: grabbing;
  }
`;

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
      name: 'hotel1',
      id: '1',
      msg: 'hi'
    },
    {
      name: 'hotel2',
      id: '2',
      msg: 'hi2'
    },
    {
      name: 'hotel3',
      id: '3',
      msg: 'hi'
    }
  ]);

  const columns = [
    {
      key: 'name',
      align: Table.Align.LEFT,
      headRenderer: 'name',
      bodyRenderer: (rowData) => (
        <span>
          <StyledHand className="hand" />
          {rowData.name}
        </span>
      )
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

  const ref = useRef();

  React.useEffect(() => {
    const tbody = ref.current.content.current.wrapperEl.querySelector('tbody');
    if (tbody) {
      const els = Array.prototype.slice.call(tbody.children, 1);
      els.map((el, index) => {
        el.setAttribute('data-id', data[index].id);
      });
    }
    let s = Sortable.create(ref.current.content.current.wrapperEl.querySelector('tbody'), {
      // dataIdAttr: 'data-id',
      handle: '.hand',
      store: {
        set: function (ss) {
          const ar = ss.toArray().slice(1);
          const newList = data.sort((a, b) => ar.indexOf(a.id) - ar.indexOf(b.id));
          setData([...newList]);
        }
      }
    });

    return () => {
      s.destroy();
    };
  }, []);

  return (
    <div>
      <GlobalStyle />
      <StyledTable
        isPaginated={false}
        columnKeyField="id"
        idField="id"
        columns={columns}
        data={data}
        ref={ref}
      />
    </div>
  );
}
