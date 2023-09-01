import React, { useState, useRef, useEffect } from 'react';
import Input from './MyInput';
import TextField from 'alcedo-ui/TextField';

export default function App() {
  const [text, setText] = useState('');
  const ref = useRef();

  useEffect(() => {
    console.log(ref.current);
  }, []);

  return (
    <div>
      <Input value={text} onChange={(e) => setText(e.target.value)} suffix={'$'} />
      <TextField ref={ref} />
    </div>
  );
}
