import React from 'react';

/**
 * Measure a DOM element's size,aka width & height.
 * @returns {Object} { ref, {width, height }}
 */
function useMeasure() {
  const [size, setSize] = React.useState({
    width: null,
    height: null
  });

  const previousObserver = React.useRef(null);

  const customRef = React.useCallback((node) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect();
      previousObserver.current = null;
    }

    if (node?.nodeType === Node.ELEMENT_NODE) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.borderBoxSize) {
          const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];

          setSize({ width, height });
        }
      });

      observer.observe(node);
      previousObserver.current = observer;
    }
  }, []);

  return [customRef, size];
}

export default useMeasure;
