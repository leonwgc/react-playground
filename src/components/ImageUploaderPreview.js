/* eslint-disable react/prop-types */
import React from 'react';
import {StyledImageBlock} from './ImageUploaderStyles';
import Image from './Image';

/**
 * ImageUploaderPreview for different versions
 */
const ImageUploaderPreview = ({type, url = '', ...rest}) => {
    const landscapeRatioN = type === 'Image' ? 1.91 : 4;
    return url ? (
        <div className="image-uploader-preview" {...rest}>
            <StyledImageBlock>
                <div className="img-box">
                    <Image src={url} aspectRatio={`${landscapeRatioN} / 1`} />
                </div>
                <div className="ratio-info">
                    <div className="title">Landscape</div>
                    <div>{landscapeRatioN}:1 ratio</div>
                </div>
            </StyledImageBlock>
            <StyledImageBlock>
                <div className="img-box">
                    <Image src={url} aspectRatio="1 / 1" />
                </div>
                <div className="ratio-info ">
                    <div className="title">Square</div>
                    <div>1:1 ratio</div>
                </div>
            </StyledImageBlock>
            {type === 'Image' && (
                <StyledImageBlock>
                    <div className="img-box">
                        <Image src={url} aspectRatio="4 / 5" />
                    </div>
                    <div className="ratio-info ">
                        <div className="title"> Portrait</div>
                        <div>4:5 ratio</div>
                    </div>
                </StyledImageBlock>
            )}
        </div>
    ) : null;
};

ImageUploaderPreview.displayName = 'DS-ImageUploaderPreview';

export default ImageUploaderPreview;
