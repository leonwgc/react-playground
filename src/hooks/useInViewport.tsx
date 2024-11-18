import { useState, default as React } from 'react';

/**
 * useInViewport
 *
 * @param {IntersectionObserverInit} options - options to be used with IntersectionObserver
 * @returns {React.MutableRefObject<HTMLElement | null>} - A ref that can be used to set the element to be
 * observed and a boolean indicating if the element is in viewport or not.
 * @example
 *
 * const Component = () => {
 *   const [ref, inViewport] = useInViewport({
 *     root: null,
 *     rootMargin: '0px',
 *     threshold: 1.0,
 *   });
 *
 *   return (
 *     <div ref={ref}>
 *       element is {inViewport ? 'in' : 'not in'} viewport
 *     </div>
 *   );
 * };
 */
function useInViewport(options: IntersectionObserverInit) {
  const [inViewPort, setInViewport] = useState(null);
  const previousObserver = React.useRef(null);

  const customRef = React.useCallback((node) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect();
      previousObserver.current = null;
    }

    if (node?.nodeType === Node.ELEMENT_NODE) {
      const observer = new IntersectionObserver(([entry]) => {
        setInViewport(entry.isIntersecting);
      }, options);

      observer.observe(node);
      previousObserver.current = observer;
    }
  }, []);

  return [customRef, inViewPort];
}

export default useInViewport;
