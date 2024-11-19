import React from 'react';

/**
 * Custom hook that provides functionality to copy text to the clipboard.
 *
 * @returns {Array} An array containing the copied text and a function to copy text.
 * The first element is the current state of the copied text.
 * The second element is a function that takes a string value and copies it to the clipboard.
 *
 * Usage:
 * const [copiedText, copyToClipboard] = useCopyToClipboard();
 * copyToClipboard('some text'); // This will copy 'some text' to the clipboard.
 */
export default function useCopyToClipboard() {
  const [state, setState] = React.useState(null);

  const copyToClipboard = React.useCallback((value) => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
          setState(value);
        } else {
          throw new Error('writeText not supported');
        }
      } catch (e) {
        legacyCopy(value);
        setState(value);
      }
    };

    handleCopy();
  }, []);

  return [state, copyToClipboard];
}

function legacyCopy(text) {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
}
