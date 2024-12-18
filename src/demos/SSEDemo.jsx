import { Input } from 'antd';
import React, { useEffect, useState } from 'react';

export default function SSEDemo() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8080/sse');

    eventSource.addEventListener('message', (event) => {
      console.log('message rev');
      setValue((v) => v + '\n' + event.data);
    });

    eventSource.addEventListener('error', (e) => {
      console.log('error occured');
    });
  }, []);

  return (
    <div>
      <Input.TextArea
        rows={100}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></Input.TextArea>
    </div>
  );
}
