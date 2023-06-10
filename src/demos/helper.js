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
