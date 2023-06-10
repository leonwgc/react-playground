import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import { styled, useMount, useUpdateEffect } from 'react-uni-comps';
import {
  getCaretIndex,
  getCaretCoordinate,
  setCaret,
  getHTMLFromText,
  getTextFromElement
} from './helper';

const StyledHtmlTextArea = styled.div`
  display: inline-block;
  position: relative;
  border: 1px solid #eee;
  outline: none;
  overflow-y: scroll;
  padding: 2px;
  font-size: 14px;
  white-space: pre-wrap;
  word-break: normal;
  overflow-wrap: break-word;
  width: 100%;
  min-height: 24px;
`;

const styleFn = (txt) => (txt.length > 10 ? 'color:red;font-weight:bold' : '');

const App = () => {
  const ref = useRef({
    index: -1,
    value: ''
  });
  const [value, setValue] = useState(`111\n222\nAlcedo UI DEMOS`);

  return (
    <div>
      <HTMLTextArea
        value={value}
        onChange={(v) => setValue(v)}
        style={{ height: 100 }}
        onKeyUp={(e) => {
          if (e.key === '{') {
            ref.current.index = getCaretIndex(e.target);
            ref.current.value = value;
            console.log('open', getCaretCoordinate(e.target), getCaretIndex(e.target));
          } else if (e.key === '}' || e.key === 'Backspace') {
            if (ref.current.index !== -1) {
              const info = ref.current;
              const left = info.value.slice(0, info.index);
              const right = info.value.slice(info.index);
              console.log('close', ':', left, '|', right);
              ref.current.index = -1;
            }
          }
        }}
      />
    </div>
  );
};

const HTMLTextArea = React.forwardRef((props, ref) => {
  const { value, onChange, ...rest } = props;

  const elRef = useRef();
  useImperativeHandle(ref, () => elRef);

  useUpdateEffect(() => {
    const currentText = getTextFromElement(elRef.current);
    if (currentText !== value) {
      elRef.current.innerHTML = getHTMLFromText(value, styleFn);
    }
  }, [value]);

  useMount(() => {
    elRef.current.addEventListener('paste', function (e) {
      e.preventDefault();
      var text = '';
      if (e.clipboardData && e.clipboardData.getData) {
        text = e.clipboardData.getData('text/plain');
      } else if (window.clipboardData && window.clipboardData.getData) {
        text = window.clipboardData.getData('Text');
      }
      document.execCommand('insertHTML', false, text);
    });

    elRef.current.focus();

    elRef.current.innerHTML = getHTMLFromText(value, styleFn);

    if (value.length) {
      const lastNodeEl = elRef.current.lastElementChild;
      if (lastNodeEl) {
        setCaret(lastNodeEl, 0, lastNodeEl.innerText.length);
      }
    }
  });

  return (
    <StyledHtmlTextArea
      ref={elRef}
      contentEditable
      onInput={(e) => {
        const text = getTextFromElement(e.target);
        console.log(text);
        onChange(text);
      }}
      {...rest}
    />
  );
});

export default App;
