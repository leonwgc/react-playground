import React, { useState, useRef, useEffect } from 'react';
import { styled, useMount } from 'react-uni-comps';
import { getCaretIndex, getCaretCoordinate, setCaret } from './helper';

const HtmlTextArea = styled.div`
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

const filterNextLineSymbol = (text) => text.replace(/\n/g, '');

const convertHtmlToPlainText = (rootEl) => {
  if (!rootEl) {
    return '';
  }
  const childNodes = rootEl.childNodes;
  const arr = [];
  for (let el of childNodes) {
    const nodeType = el.nodeType;
    switch (nodeType) {
      case 3: {
        arr.push(el.textContent);

        if (filterNextLineSymbol(el.textContent).length > 10) {
          const div = document.createElement('div');
          div.innerText = el.textContent;
          div.style.color = 'red';
          el.parentNode.replaceChild(div, el);
          setCaret(div, 0, el.textContent.length);
        }

        break;
      }
      case 1: {
        arr.push(el.innerText);

        if (filterNextLineSymbol(el.innerText).length > 10) {
          el.style.color = 'red';
        } else {
          el.removeAttribute('style');
        }
      }
      default: {
        break;
      }
    }
  }

  return arr.join('\n');
};

const App = () => {
  const [value, setValue] = useState(`111\n222\nAlcedo UI DEMOS`);

  return (
    <div>
      <MyCustTextArea value={value} onChange={(v) => setValue(v)} style={{ height: 100 }} />
    </div>
  );
};

export function MyCustTextArea({ value, onChange, ...rest }) {
  const ref = useRef();

  useMount(() => {
    ref.current.addEventListener('paste', function (e) {
      e.preventDefault();
      var text = '';
      if (e.clipboardData && e.clipboardData.getData) {
        text = e.clipboardData.getData('text/plain');
      } else if (window.clipboardData && window.clipboardData.getData) {
        text = window.clipboardData.getData('Text');
      }
      document.execCommand('insertHTML', false, text);
    });

    ref.current.focus();
  });

  useEffect(() => {
    const pos = getCaretCoordinate(ref.current);
    console.log(pos);

    console.log(getCaretIndex(ref.current));
  }, [value]);

  return (
    <HtmlTextArea
      ref={ref}
      contentEditable
      onInput={(e) => {
        // onChange(ref.current.innerHTML);
        onChange(convertHtmlToPlainText(e.target));
      }}
      {...rest}
    />
  );
}

export default App;
