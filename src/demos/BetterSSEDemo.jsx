import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { EventSource } from 'eventsource';

// https://matthewwid.github.io/better-sse/

export default function BetterSSEDemo() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8080/better-sse');

    eventSource.addEventListener('better-sse-event', (event) => {
      setValue((v) => v + '\n' + event.data);
    });

    eventSource.addEventListener('error', (e) => {
      console.log('error occured');
    });

    return () => {
      /**
       * To explicitly close the connection, call the `close` method.
       * This will prevent any reconnection from happening.
       */
      eventSource.close();
    };
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
