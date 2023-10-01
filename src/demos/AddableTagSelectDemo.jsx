import React, { useState } from 'react';
import { addableTagSelectData, langs } from '../components/data';
import { Divider } from 'react-uni-comps';
import AddableTagSelect from '../components/AddableTagSelect';

function AddableTagSelectDemo() {
  const [value, setValue] = useState([]);
  return (
    <div>
      <AddableTagSelect
        style={{ width: 473 }}
        data={addableTagSelectData}
        onChange={setValue}
        value={value}
      />
    </div>
  );
}
export default AddableTagSelectDemo;
