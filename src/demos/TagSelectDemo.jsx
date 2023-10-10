import React, { useState } from 'react';
import TagSelect from '../components/TagSelect';
import { langs } from '../components/data.mjs';
import { Divider } from 'react-uni-comps';

function TagSelectDemo() {
  const [value, setValue] = useState([langs[0]]);
  return (
    <div>
      <Divider>normal</Divider>
      <TagSelect data={langs} onChange={setValue} value={value} />
      <Divider>readonly</Divider>
      <TagSelect data={langs.slice(0)} onChange={setValue} value={value} readOnly />
    </div>
  );
}
export default TagSelectDemo;
