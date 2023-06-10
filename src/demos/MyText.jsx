import React, { useState, useRef, useEffect } from 'react';
import { styled, useMount } from 'react-uni-comps';
// import getCaretCoordinates from './libs/getCaretCoordinates';

// https://javascript.plainenglish.io/how-to-find-the-caret-inside-a-contenteditable-element-955a5ad9bf81
function getCaretCoordinates() {
  let x = 0,
    y = 0;

  if (typeof window.getSelection !== 'undefined') {
    const selection = window.getSelection();
    if (selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0).cloneRange();
      range.collapse(true);
      const rect = range.getClientRects()[0];
      if (rect) {
        x = rect.left;
        y = rect.top;
      }
    }
  }
  return { x, y };
}

function getCaretIndex(element) {
  let position = 0;

  if (typeof window.getSelection !== 'undefined') {
    const selection = window.getSelection();
    if (selection.rangeCount !== 0) {
      const range = window.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      position = preCaretRange.toString().length;
    }
  }
  return position;
}

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
`;

const filterNextLineSymbol = (text) => text.replace(/\n/g, '');

function getCaretPosition(editableDiv) {
  var caretPos = 0,
    sel,
    range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement('span');
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint('EndToEnd', range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}

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
