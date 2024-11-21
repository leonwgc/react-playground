import React, { useState } from 'react';
import 'animate.css';
import useAnimateDotCSS from '../hooks/useAnimateCSS';

const allAnimationEffects = [
  'bounce',
  'flash',
  'pulse',
  'rubberBand',
  'shakeX',
  'shakeY',
  'headShake',
  'swing',
  'tada',
  'wobble',
  'jello',
  'heartBeat',
  'backInDown',
  'backInLeft',
  'backInRight',
  'backInUp',
  'backOutDown',
  'backOutLeft',
  'backOutRight',
  'backOutUp',
  'bounceIn',
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceInUp',
  'bounceOut',
  'bounceOutDown',
  'bounceOutLeft',
  'bounceOutRight',
  'bounceOutUp',
  'fadeIn',
  'fadeInDown',
  'fadeInDownBig',
  'fadeInLeft',
  'fadeInLeftBig',
  'fadeInRight',
  'fadeInRightBig',
  'fadeInUp',
  'fadeInUpBig',
  'fadeInTopLeft',
  'fadeInTopRight',
  'fadeInBottomLeft',
  'fadeInBottomRight',
  'fadeOut',
  'fadeOutDown',
  'fadeOutDownBig',
  'fadeOutLeft',
  'fadeOutLeftBig',
  'fadeOutRight',
  'fadeOutRightBig',
  'fadeOutUp',
  'fadeOutUpBig',
  'fadeOutTopLeft',
  'fadeOutTopRight',
  'fadeOutBottomRight',
  'fadeOutBottomLeft',
  'flip',
  'flipInX',
  'flipInY',
  'flipOutX',
  'flipOutY',
  'lightSpeedInRight',
  'lightSpeedInLeft',
  'lightSpeedOutRight',
  'lightSpeedOutLeft',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInDownRight',
  'rotateInUpLeft',
  'rotateInUpRight',
  'rotateOut',
  'rotateOutDownLeft',
  'rotateOutDownRight',
  'rotateOutUpLeft',
  'rotateOutUpRight',
  'hinge',
  'jackInTheBox',
  'rollIn',
  'rollOut',
  'zoomIn',
  'zoomInDown',
  'zoomInLeft',
  'zoomInRight',
  'zoomInUp',
  'zoomOut',
  'zoomOutDown',
  'zoomOutLeft',
  'zoomOutRight',
  'zoomOutUp',
  'slideInDown',
  'slideInLeft',
  'slideInRight',
  'slideInUp',
  'slideOutDown',
  'slideOutLeft',
  'slideOutRight',
  'slideOutUp'
];

let i = 0;

export default () => {
  const [animation, setAnimation] = useState(allAnimationEffects[0]);

  const ref = useAnimateDotCSS(animation, () => {
    setAnimation(allAnimationEffects[++i % allAnimationEffects.length]);
  });

  return (
    <div>
      <div
        ref={ref}
        style={{
          '--animate-duration': '1s',
          '--animate-delay': '.5s',
          '--animate-repeat': 1,
          'width': 100,
          'height': 100,
          'borderRadius': '50%',
          'background': 'red',
          'position': 'fixed',
          'top': 100,
          'left': 200
        }}
      />
    </div>
  );
};
