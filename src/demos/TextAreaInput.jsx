import React, { useState } from 'react';
import TextAreaInput from '../components/TextAreaInput';

export default function App() {
  const [text, setText] = useState('');
  return (
    <div>
      <TextAreaInput maxLength={1000} value={text} onChange={setText} onClear={() => setText('')} />
    </div>
  );
}
