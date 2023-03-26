import React, { useState } from 'react';
import { Button, Collapse } from 'react-uni-comps';
import { produce } from 'immer';

const baseState = [
  {
    title: 'Learn TypeScript',
    desc: 'Learn TypeScript desc',
  },
  {
    title: 'Try Immer',
    desc: 'Try Immer desc',
  },
];

export default function App() {
  const [list, setList] = useState(baseState);

  return (
    <div>
      <Collapse>
        {list.map(item => (
          <Collapse.Item title={item.title}>{item.desc}</Collapse.Item>
        ))}
      </Collapse>
      <Button
        type="primary"
        style={{ marginTop: 20 }}
        onClick={() => {
          setList(
            produce(draft => {
              const nextId = draft.length + 1;
              draft.push({
                title: 'title ' + nextId,
                desc: 'desc ' + nextId,
              });
            })
          );
        }}
      >
        Add more
      </Button>
    </div>
  );
}
