import { useState } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

/**
 * animateCSS
 *
 * @param {Element} node The node to animate
 * @param {string} animation The animation name to use
 * @param {string} [prefix=animate__] The prefix to use for the animation
 * @return {Promise}
 */
const animateCSS = (node, animation, prefix = 'animate__') =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });

/**
 * Apply animate.css effect when the component mounts.
 * @param {*} animation
 * @param {*} animationEndCallback
 * @returns
 */
const useMountAnimationCSS = (animation = 'bounce', animationEndCallback) => {
  const [node, ref] = useState(null);

  useIsomorphicLayoutEffect(() => {
    if (node instanceof Element) {
      node.classList.add('animate__animated');
      animateCSS(node, animation).then(animationEndCallback);
    }
  }, [node, animation]);

  return ref;
};

export default useMountAnimationCSS;
