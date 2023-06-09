import React, { useState, useRef, useEffect } from 'react';
import { styled, useMount } from 'react-uni-comps';
import getCaretCoordinates from './libs/getCaretCoordinates';

const Container = styled.div`
  display: inline-block;
  position: relative;
  border: 1px solid #eee;
  outline: none;
  overflow-y: scroll;

  .el {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    outline: none;
    box-sizing: content-box;
    text-size-adjust: 100%;
    direction: ltr;
    padding: 2px;
    margin: 0px;
    border: 1px solid transparent;
    font-size: 13.3333px;
    font-family: monospace;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    font-stretch: 100%;
    text-align: start;
    text-transform: none;
    text-indent: 0px;
    letter-spacing: normal;
    word-spacing: 0px;
    line-height: normal;
    white-space: pre-wrap;
    word-break: normal;
    overflow-wrap: break-word;
    tab-size: 8;
    z-index: 1;
    caret-color: #333;
  }
  textarea {
    background: transparent;
    color: transparent;
    caret-color: transparent;
  }
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

function setCaret(el, row, col) {
  var range = document.createRange();
  var sel = window.getSelection();

  range.setStart(el.childNodes[row], col);
  range.collapse(true);

  sel.removeAllRanges();
  sel.addRange(range);
}

const App = () => {
  const [value, setValue] = useState(`111\n222\nAlcedo UI DEMOS`);

  return (
    <div>
      <MyCustTextArea
        value={value}
        onChange={(v) => setValue(v)}
        style={{ width: 300, height: 100 }}
      />
    </div>
  );
};

export function MyCustTextArea({ value, onChange, ...rest }) {
  const ref = useRef();
  const textareaRef = useRef();

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
    const pos = getCaretCoordinates(ref.current);
    console.log(pos);
  }, [value]);

  return (
    <Container {...rest}>
      {/* <textarea className="el" ref={textareaRef} value={convertHtmlToPlainText(ref.current)} /> */}
      <div
        className="el"
        ref={ref}
        contentEditable
        onInput={(e) => {
          // onChange(ref.current.innerHTML);
          onChange(convertHtmlToPlainText(e.target));
        }}
      />
    </Container>
  );
}

export default App;
