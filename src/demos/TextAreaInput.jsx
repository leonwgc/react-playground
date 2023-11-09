import React, { useState } from 'react';
import TextAreaInput from '../components/TextAreaInput';
import { IconUpload } from '../components/IconTextAreaInput';

export default function App() {
  const [text, setText] = useState('');
  return (
    <div>
      <TextAreaInput maxLength={200} value={text} onChange={setText} onClear={() => setText('')} />

      <TextAreaInput
        maxLength={200}
        value={text}
        onChange={setText}
        rightIcon={<IconUpload />}
        style={{ marginTop: 60 }}
      />
    </div>
  );
}
