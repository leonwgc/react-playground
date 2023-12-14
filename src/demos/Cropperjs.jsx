// github docs: https://github.com/fengyuanchen/cropperjs/blob/main/README.md#options
import React, { useState } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { styled, useEventListener, Space, Button } from 'react-uni-comps';

const StyledOutput = styled.div`
  background-color: #ccc;
  height: 300px;
  width: 300px;
  overflow: hidden;
  padding: 0.5em;
  position: relative;

  img {
    height: 100%;
    width: auto;
  }

  .a {
    aspect-ratio: 1.91 / 1;
    width: 100%;
    height: auto;
  }
  .b {
    aspect-ratio: 1 / 1;
  }
  .c {
    aspect-ratio: 4 / 5;
  }
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
      minCropBoxHeight: 10,
      minCropBoxWidth: 10,
      background: false,
      responsive: true,
      autoCrop: false,
      autoCropArea: 0,
      checkOrientation: false,
      guides: true,
      preview: '.img-preview',
      rotatable: false
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
            <Button onClick={getCropData}>Crop</Button>
          </div>
        </Space>

        <div className="box">
          <h6>Preview</h6>
          <div
            className="img-preview"
            style={{ width: '100%', float: 'left', height: '300px', overflow: 'hidden' }}
          />
        </div>
      </div>

      <div>
        <Space>
          <StyledOutput>
            <img src={cropData} alt="cropped" className="a" />
          </StyledOutput>
          <StyledOutput>
            <img src={cropData} alt="cropped" className="b" />
          </StyledOutput>
          <StyledOutput>
            <img src={cropData} alt="cropped" className="c" />
          </StyledOutput>
        </Space>
      </div>
    </StyledWrapper>
  );
};

export default Demo;
