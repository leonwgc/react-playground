import React, { useRef } from 'react';
import { Space, Divider } from 'react-uni-comps';
import DropdownSelect from 'alcedo-ui/DropdownSelect';
import Switcher from 'alcedo-ui/Switcher';
import Theme from 'alcedo-ui/Theme';

const data = [
  {
    text: 'test1',
    value: 1,
    children: [
      {
        text: 'test111',
        value: 11
      }
    ]
  },
  {
    text: 'test2',
    value: 2,
    desc: 'Here is test2.'
  }
];

export default function App() {
  return (
    <div>
      <Divider>DropdownSelect</Divider>
      <Space size={16}>
        <DropdownSelect
          placeholder="select sth..."
          theme={Theme.DEFAULT}
          popupTheme={Theme.DEFAULT}
          useFilter
          filterPlaceholder="search sth.."
          useSelectAll
          selectAllText="all"
          isLoading={false}
          selectMode={DropdownSelect.SelectMode.MULTI_SELECT}
          itemDisabled={false}
          value={[{ value: 2 }]} // MULTI_SELECT value is array
          data={data}
          onChange={(value) => {
            console.log(value);
          }}
        />

        <DropdownSelect
          value={[{ value: 2 }]}
          data={data}
          onChange={(value) => {
            console.log(value);
          }}
        />
      </Space>
      <Divider>Switcher</Divider>
      <Space>
        <Switcher value={true} />
        <Switcher size={Switcher.Size.SMALL} />
      </Space>
    </div>
  );
}
