// github docs: https://github.com/fengyuanchen/cropperjs/blob/main/README.md#options
import React, { useState } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { styled, useEventListener, Space, Button } from 'react-uni-comps';

const StyledImageWrapper = styled.div`
  background-color: #f1f3f4;
  border: 1px solid;
  overflow: hidden;
  position: relative;
  height: 56px;
  width: 106px;
`;

const StyledWrapper = styled.div`
  .cropper {
    width: 600px;
    height: 400px;
    overflow: hidden;
    box-sizing: border-box;

    .cropper-point.point-se {
      width: 5px;
      height: 5px;
    }

    img {
      display: block;
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
    // You can send the data to the server-side to crop the image directly:
    console.log(cropperRef.current.getData());
    setCropData(cropperRef.current?.getCroppedCanvas().toDataURL());
  };

  useEventListener(imageRef, 'load', () => {
    cropperRef.current = new Cropper(imageRef.current, {
      viewMode: 1,
      background: false,
      responsive: true,
      checkOrientation: false,
      guides: false,
      center: false,
      rotatable: false,
      scalable: false,
      zoomable: false,
      autoCropArea: 1,
      // autoCrop: true,
      aspectRatio: 1.91,
      preview: '.preview',
      minCropBoxWidth: 50,
      ready() {
        const cropBoxData = this.cropper.getCropBoxData();
        this.cropper.setCropBoxData({ ...cropBoxData, top: 0, left: 0 });
        this.cropper.crop();
      },
      crop(event) {
        console.log(event.detail);
      }
    });
  });

  return (
    <StyledWrapper>
      <div style={{ width: '100%' }}>
        <input type="file" onChange={onChange} />
        <button>Use default img</button>
        <br />

        <Space>
          <div className="cropper" ref={cropperRef}>
            <img src={defaultSrc} ref={imageRef} />
          </div>
          <div>
            <Button type="primary" onClick={getCropData}>
              Crop
            </Button>
          </div>
        </Space>
      </div>

      <div>
        <Space>
          <StyledImageWrapper
            className="preview"
            onClick={() => cropperRef.current.setAspectRatio(1.91)}
          >
            <img src={cropData} alt="cropped" />
          </StyledImageWrapper>

          <StyledImageWrapper
            className="preview"
            onClick={() => cropperRef.current.setAspectRatio(1)}
          >
            <img src={cropData} alt="cropped" />
          </StyledImageWrapper>

          <StyledImageWrapper
            className="preview"
            onClick={() => cropperRef.current.setAspectRatio(4 / 5)}
          >
            <img src={cropData} alt="cropped" />
          </StyledImageWrapper>
        </Space>
      </div>
    </StyledWrapper>
  );
};

export default Demo;
