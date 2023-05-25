import React, { useRef, useState, useEffect } from 'react';
import { Button, styled } from 'react-uni-comps';
import { useUpdateStore, useAppData } from '~/redux';
import Accordion from 'alcedo-ui/Accordion';
import Popover from 'alcedo-ui/Popover';
import TextArea from 'alcedo-ui/TextArea';
import getCaretCoordinates from './libs/getCaretCoordinates';

const StyledTrigger = styled.div`
  width: 300px;
  height: 200px;

  .text-input-el {
    height: 200px;
    width: 300px;
  }
`;

export default function App() {
  const { list = ['leonwang', 'wgc', 'giantfish'] } = useAppData();
  const [visible, setVisible] = useState(false);

  const ref = useRef();
  const textAreaRefWrap = useRef();
  const textAreaRef = useRef();

  const lastInputIndexRef = useRef();
  const [value, setValue] = useState('');
  const [popStyle, setPopStyle] = useState({ left: 0, top: -16 });

  const onTextChange = (value) => {
    setValue(value);
  };

  return (
    <div>
      <StyledTrigger ref={textAreaRefWrap}>
        <TextArea
          autoHeight
          value={value}
          triggerClassName="text-input-el"
          onChange={onTextChange}
          ref={textAreaRef}
          onKeyUp={(e) => {
            if (e.shiftKey) {
              if (e.key === '{') {
                const el = e.target;
                const pos = getCaretCoordinates(el, el.selectionEnd);
                // 300 is ta width, 20 is base height
                setPopStyle({ left: pos.left - 300, top: 20 + pos.top });
                lastInputIndexRef.current = el.selectionStart;
                setVisible(true);
              } else if (e.key === '}') {
                setVisible(false);
                lastInputIndexRef.current = null;
              }
            }
          }}
        />
      </StyledTrigger>

      <Popover
        hasTriangle={false}
        theme={Popover.Theme.PRIMARY}
        visible={visible}
        // visible
        triggerEl={textAreaRefWrap.current}
        onRequestClose={() => setVisible(false)}
        position={Popover.Position.RIGHT_TOP}
        resetPositionWait={0}
        style={{
          zIndex: 1000,
          marginLeft: popStyle.left,
          marginTop: popStyle.top
        }}
      >
        <Accordion title="" className="accordion-examples" ref={ref}>
          <div className="accordion-examples-content">
            {list.map((item) => (
              <div
                style={{ padding: '6px 0' }}
                onClick={() => {
                  const originValue = value || '';
                  const inputIndex = lastInputIndexRef.current;
                  if (inputIndex) {
                    const newValue =
                      originValue.slice(0, inputIndex - 1) +
                      '{' +
                      `${item}` +
                      '}' +
                      originValue.slice(inputIndex);
                    setValue(newValue);
                    lastInputIndexRef.current = null;
                  }

                  setVisible(false);

                  textAreaRef.current.focus();
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </Accordion>
      </Popover>
    </div>
  );
}
