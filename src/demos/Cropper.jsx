import React, { useState, createRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { styled } from 'react-uni-comps';

const StyledWrapper = styled.div`
  .box {
    display: inline-block;
    padding: 10px;
    box-sizing: border-box;
  }
  .img-preview {
    overflow: hidden;
  }
`;

const defaultSrc =
  'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg';

export const Demo = () => {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState('#');
  const cropperRef = createRef();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <StyledWrapper>
      <div style={{ width: '100%' }}>
        <input type="file" onChange={onChange} />
        <button>Use default img</button>
        <br />
        <br />
        <Cropper
          ref={cropperRef}
          style={{ height: 400, width: 600 }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={100}
          minCropBoxWidth={100}
          background={false}
          responsive={true}
          autoCropArea={0.8}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={false}
        />
      </div>
      <div>
        <div className="box" style={{ width: '50%', float: 'right' }}>
          <h1>Preview</h1>
          <div className="img-preview" style={{ width: '100%', float: 'left', height: '300px' }} />
        </div>
        <div className="box" style={{ width: '50%', float: 'right', height: '300px' }}>
          <h1>
            <span>Crop</span>
            <button style={{ float: 'right' }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img style={{ width: '100%' }} src={cropData} alt="cropped" />
        </div>
      </div>
      <br style={{ clear: 'both' }} />
    </StyledWrapper>
  );
};

export default Demo;
