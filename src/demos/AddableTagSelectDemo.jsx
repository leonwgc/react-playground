import React, { useState } from 'react';
import { addableTagSelectData } from '../components/data.mjs';
import AddableTagSelect from '../components/AddableTagSelect';

function AddableTagSelectDemo() {
  const [value, setValue] = useState();
  return (
    <div>
      <AddableTagSelect
        style={{ width: 473 }}
        data={addableTagSelectData}
        onChange={setValue}
        value={value}
        onAddNew={(text) => {
          const newEntry = { id: null, name: text, type: 1 }; // 1 new added 2: dynamic with stars others: normal
          setValue(newEntry);
          console.log('added');
        }}
        prefix={'/'}
      />
    </div>
  );
}
export default AddableTagSelectDemo;
