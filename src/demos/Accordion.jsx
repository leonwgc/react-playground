import React, { useRef } from 'react';
import { Button } from 'react-uni-comps';
import { useUpdateStore, useAppData } from '~/redux';
import Accordion from 'alcedo-ui/Accordion';

export default function App() {
  const updateStore = useUpdateStore();
  const { list = [1, 2, 3] } = useAppData();

  const ref = useRef();

  return (
    <div>
      <Accordion title="Title" className="accordion-examples" ref={ref}>
        <div className="accordion-examples-content">
          {list.map(item => (
            <div style={{ padding: '6px 0' }}>list{item}</div>
          ))}
        </div>
      </Accordion>
      <Button
        type="primary"
        style={{ marginTop: 20 }}
        onClick={() => {
          updateStore({ list: [1, 2, 3, 4, 5, 6] });
          ref.current.resetHeight();
        }}
      >
        Add more
      </Button>
    </div>
  );
}
