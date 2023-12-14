import React, { useState, createRef } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { styled, useEventListener } from 'react-uni-comps';

const StyledWrapper = styled.div`
  .cropper {
    width: 600px;
    height: 400px;
    overflow: hidden;

    img {
      max-width: 100%;
    }
  }
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
  const cropperRef = React.useRef();
  const imageRef = React.useRef();
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
    setCropData(cropperRef.current?.getCroppedCanvas().toDataURL());
  };

  //   React.useEffect(() => {}, []);

  useEventListener(imageRef, 'load', () => {
    cropperRef.current = new Cropper(imageRef.current, {
      viewMode: 1,
      minCropBoxHeight: 10,
      minCropBoxWidth: 10,
      background: false,
      responsive: true,
      autoCrop: false,
      autoCropArea: 0,
      checkOrientation: false,
      guides: true,
      preview: '.img-preview'
    });
  });

  return (
    <StyledWrapper>
      <div style={{ width: '100%' }}>
        <input type="file" onChange={onChange} />
        <button>Use default img</button>
        <br />
        <br />
        {/* <Cropper
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
        /> */}
        <div className="cropper" ref={cropperRef}>
          <img src={defaultSrc} ref={imageRef} />
        </div>
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
