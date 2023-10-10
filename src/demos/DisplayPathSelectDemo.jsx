import React, { useState } from 'react';
import { displayPathSelectData } from '../components/data.mjs';
import DisplayPathSelect from '../components/DisplayPathSelect';

function AddableTagSelectDemo() {
  const [value, setValue] = useState();
  return (
    <div>
      <DisplayPathSelect
        style={{ width: 280 }}
        data={displayPathSelectData}
        onChange={setValue}
        value={value}
        prefix={'/'}
      />
    </div>
  );
}
export default AddableTagSelectDemo;
