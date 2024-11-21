import { useState } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

type AnimateEffects =
  | 'bounce'
  | 'flash'
  | 'pulse'
  | 'rubberBand'
  | 'shakeX'
  | 'shakeY'
  | 'headShake'
  | 'swing'
  | 'tada'
  | 'wobble'
  | 'jello'
  | 'heartBeat'
  | 'backInDown'
  | 'backInLeft'
  | 'backInRight'
  | 'backInUp'
  | 'backOutDown'
  | 'backOutLeft'
  | 'backOutRight'
  | 'backOutUp'
  | 'bounceIn'
  | 'bounceInDown'
  | 'bounceInLeft'
  | 'bounceInRight'
  | 'bounceInUp'
  | 'bounceOut'
  | 'bounceOutDown'
  | 'bounceOutLeft'
  | 'bounceOutRight'
  | 'bounceOutUp'
  | 'fadeIn'
  | 'fadeInDown'
  | 'fadeInDownBig'
  | 'fadeInLeft'
  | 'fadeInLeftBig'
  | 'fadeInRight'
  | 'fadeInRightBig'
  | 'fadeInUp'
  | 'fadeInUpBig'
  | 'fadeInTopLeft'
  | 'fadeInTopRight'
  | 'fadeInBottomLeft'
  | 'fadeInBottomRight'
  | 'fadeOut'
  | 'fadeOutDown'
  | 'fadeOutDownBig'
  | 'fadeOutLeft'
  | 'fadeOutLeftBig'
  | 'fadeOutRight'
  | 'fadeOutRightBig'
  | 'fadeOutUp'
  | 'fadeOutUpBig'
  | 'fadeOutTopLeft'
  | 'fadeOutTopRight'
  | 'fadeOutBottomRight'
  | 'fadeOutBottomLeft'
  | 'flip'
  | 'flipInX'
  | 'flipInY'
  | 'flipOutX'
  | 'flipOutY'
  | 'lightSpeedInRight'
  | 'lightSpeedInLeft'
  | 'lightSpeedOutRight'
  | 'lightSpeedOutLeft'
  | 'rotateIn'
  | 'rotateInDownLeft'
  | 'rotateInDownRight'
  | 'rotateInUpLeft'
  | 'rotateInUpRight'
  | 'rotateOut'
  | 'rotateOutDownLeft'
  | 'rotateOutDownRight'
  | 'rotateOutUpLeft'
  | 'rotateOutUpRight'
  | 'hinge'
  | 'jackInTheBox'
  | 'rollIn'
  | 'rollOut'
  | 'zoomIn'
  | 'zoomInDown'
  | 'zoomInLeft'
  | 'zoomInRight'
  | 'zoomInUp'
  | 'zoomOut'
  | 'zoomOutDown'
  | 'zoomOutLeft'
  | 'zoomOutRight'
  | 'zoomOutUp'
  | 'slideInDown'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideInUp'
  | 'slideOutDown'
  | 'slideOutLeft'
  | 'slideOutRight'
  | 'slideOutUp';

const prefix = 'animate__';

/**
 * Animate a node with animate.css
 *
 * @param {Element} node The node to animate
 * @param {string} animation The animation name to use
 * @return {Promise}
 */
const animateCSS = (node, animation) =>
  new Promise((resolve) => {
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
 * Apply animation to element with animate.css.
 * @param animation
 * @param animationEndCallback
 * @returns
 */
const useAnimateCSS = (animation: AnimateEffects = 'fadeIn', animationEndCallback) => {
  const [node, ref] = useState(null);

  useIsomorphicLayoutEffect(() => {
    if (node instanceof HTMLElement) {
      animateCSS(node, animation).then(animationEndCallback);
    }
  }, [node, animation]);

  return ref;
};

export default useAnimateCSS;
