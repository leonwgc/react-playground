/* eslint-disable react/prop-types */
import React, {useImperativeHandle} from 'react';

/**
 * Image
 */
const Image = React.forwardRef(
    ({src = '', width = 'auto', height = '100%', aspectRatio = 'auto', style, rest}, ref) => {
        const imageRef = React.useRef();

        useImperativeHandle(ref, () => imageRef.current);

        return <img ref={ref} {...rest} src={src} style={{aspectRatio, height, width, maxWidth: '100%', ...style}} />;
    }
);

Image.displayName = 'DS-Image';

export default Image;
