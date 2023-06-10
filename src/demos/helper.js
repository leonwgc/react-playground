import React from 'react';

const filterNextLineSymbol = (text) => text.replace(/\n/g, '');

// https://javascript.plainenglish.io/how-to-find-the-caret-inside-a-contenteditable-element-955a5ad9bf81
export function getCaretCoordinate() {
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

export function getCaretIndex(element) {
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

export function setCaret(el, row, col) {
  var range = document.createRange();
  var sel = window.getSelection();

  range.setStart(el.childNodes[row], col);
  range.collapse(true);

  sel.removeAllRanges();
  sel.addRange(range);
}

export const getTextFromElement = (el) => {
  if (!el) {
    return '';
  }
  const childNodes = el.childNodes;
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

export const getHTMLFromText = (text, styleFn) => {
  if (!text) return '';
  return text
    .split('\n')
    .map((item) => `<div style="${styleFn?.(item) || ''}">${item}</div>`)
    .join('');
};
