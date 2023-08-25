import React, { useRef, useState } from 'react';
import { FileInputTrigger, Button, Space } from 'react-uni-comps';

export default function App() {
  const ref = useRef();
  const [data, setData] = useState({ width: 0, height: 0, naturalWidth: 0, naturalHeight: 0 });
  return (
    <div>
      <Space size={36}>
        <FileInputTrigger
          accept="image/*"
          onChange={(files) => {
            var img = new Image();
            img.src = window.URL.createObjectURL(files[0]);

            img.onload = function () {
              setData({
                width: img.width,
                height: img.height,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight
              });
              ref.current.src = img.src;
              window.URL.revokeObjectURL(img.src);
            };
          }}
        >
          <Button type="primary">Select Image</Button>
        </FileInputTrigger>
        <img ref={ref} width={200} />
      </Space>
      <p>{data.width > 0 && JSON.stringify(data, ' ')}</p>
    </div>
  );
}
