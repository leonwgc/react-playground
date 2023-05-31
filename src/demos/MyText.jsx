import React, { useState, useRef } from 'react';
import { styled, useMount } from 'react-uni-comps';

const Wrapper = styled.div`
  overflow-y: visible;
  height: 300px;
  border: 1px solid #eee;
  padding: 4px;
  outline: none;
`;

const filterNextLineSymbol = (text) => text.replace(/\n/g, '');

const getAndProcessHtmlContent = (rootEl) => {
  const childNodes = rootEl.childNodes;
  const arr = [];
  for (let el of childNodes) {
    const nodeType = el.nodeType;
    switch (nodeType) {
      case 3: {
        arr.push(el.textContent);
        break;
      }
      case 1: {
        arr.push(el.innerText);
        if (el.innerText.length > 10) {
          el.style.color = 'red';
        } else {
          el.style.color = 'unset';
        }
      }
      default: {
        console.log(el);
        break;
      }
    }
  }

  const reseult = arr.map((item) => item.replace(/\n/, ''));
  return reseult;
};

const App = () => {
  const [value, setValue] = useState(`111\n222`);

  return (
    <div>
      <MultiplelineInput value={value} onChage={(v) => setValue(v)} />
      <textarea style={{ width: '100%', height: 200 }} value={value}></textarea>
    </div>
  );
};

function MultiplelineInput({ value, onChage }) {
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

    if (value && value.length) {
      value
        .split(/\n/g)
        .map((txt) => (ref.current.innerHTML += `<div>${filterNextLineSymbol(txt)}</div>`));
    }
  });

  return (
    <div>
      <Wrapper
        ref={ref}
        contentEditable
        onInput={(e) => {
          const v = getAndProcessHtmlContent(e.target).join('\n');
          onChage(v);
        }}
      />
    </div>
  );
}

export default App;
