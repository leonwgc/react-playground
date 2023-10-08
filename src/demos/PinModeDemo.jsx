import React, { useState } from 'react';
import PinMode from '../components/PinMode';
import { Space } from 'react-uni-comps';

const data = [
  {
    id: 1,
    content: 'Do not pin',
    label: ''
  },
  {
    id: 0,
    content: 'Show in any unpinned position',
    label: 'Any'
  },
  {
    id: 5,
    content: 'Pin only in position 1',
    label: '1'
  },
  {
    id: 6,
    content: 'Pin only in position 2',
    label: '2'
  }
];

function PinModeDemo() {
  const [value, setValue] = useState([data[0]]);
  return (
    <div>
      <Space size={16}>
        <PinMode
          value={data[0]}
          data={data}
          onChange={setValue}
          displayField="content"
          valueField="id"
          style={{ width: 92 }}
        />
        <PinMode
          value={data[1]}
          data={data}
          onChange={setValue}
          displayField="content"
          valueField="id"
          style={{ width: 92 }}
        />
        <PinMode
          value={data[2]}
          data={data}
          onChange={setValue}
          displayField="content"
          valueField="id"
          style={{ width: 92 }}
        />
        <PinMode
          value={data[3]}
          data={data}
          onChange={setValue}
          displayField="content"
          valueField="id"
          style={{ width: 92 }}
        />
      </Space>
    </div>
  );
}
export default PinModeDemo;
