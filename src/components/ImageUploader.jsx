import React, { useEffect } from 'react';
import DeleteImageButton from './DeleteImageButton';
import { StyledDropArea } from './ImageUploaderStyles';
import ImageUploaderPreview from './ImageUploaderPreview';
import { defaultInfo, defaultError } from './ImageUploaderData';
import ContentLoadingSkeleton from './ContentLoadingSkeleton';
import { useEventListener, FileInputTrigger, deepClone, clsx, useUnmount } from 'react-uni-comps';

/**
 * ImageUploader
 * @returns
 */
const ImageUploader = ({ type, onImageRemove, defaultUrl, defaultUuid, defaultSize }) => {
  const ref = React.useRef();
  const imgRef = React.useRef();

  const [info, setInfo] = React.useState(defaultInfo);
  const [error, setError] = React.useState(defaultError);
  const [text, setText] = React.useState('');
  const [uploading, setUploading] = React.useState(false);

  const { size, name, url, file, uuid } = info;

  const revokeUrl = () => {
    if (url && file) {
      URL.revokeObjectURL(url);
    }
  };

  const handle = (files = []) => {
    const image = files[0];
    revokeUrl();

    const objectURL = URL.createObjectURL(image);

    setInfo({
      name: image.name,
      size: parseInt(image.size / 1000, 10),
      url: objectURL,
      file: image,
      loaded: false
    });
  };

  useEventListener(ref, 'dragover', (e) => {
    e.preventDefault();
    if (!ref.current.classList.contains('highlight')) {
      ref.current.classList.add('highlight');
    }
  });
  useEventListener(ref, 'dragenter', (e) => {
    e.preventDefault();
    ref.current.classList.toggle('highlight');
  });
  useEventListener(ref, 'dragleave', (e) => {
    e.preventDefault();
    ref.current.classList.toggle('highlight');
  });
  useEventListener(ref, 'drop', (e) => {
    e.preventDefault();
    ref.current.classList.remove('highlight');
    if (info.urlData && info.loaded) {
      return;
    }
    const files = Array.from(e.dataTransfer.files);

    if (files.length > 1) {
      window.alert('Please select only one file.');
      return;
    }
    handle(files);
  });

  useEffect(() => {
    if (defaultUrl && !info.loaded) {
      setInfo({
        ...info,
        url: defaultUrl,
        size: defaultSize,
        uuid: defaultUuid
      });
    }
  }, [defaultUrl, defaultUuid]);

  useUnmount(revokeUrl);

  const hasImage = info.loaded && info.url;

  return (
    <>
      <StyledDropArea ref={ref} className={clsx({ hasPic: hasImage })}>
        {info.url ? (
          <img
            ref={imgRef}
            src={url}
            onLoad={(e) => {
              const newInfo = {
                ...info,
                loaded: true,
                width: e.target.naturalWidth,
                height: e.target.naturalHeight
              };

              setInfo(newInfo);
            }}
            style={{ objectFit: 'fill', opacity: !info.loaded ? 0.1 : 1 }}
          />
        ) : (
          <div style={{ margin: '48px 48px' }}>
            <div>
              <span>
                <FileInputTrigger
                  accept="image/png,image/jpg"
                  onChange={(files) => handle(files)}
                  className="change-image-trigger"
                  style={{ cursor: 'pointer' }}
                >
                  Browse
                </FileInputTrigger>
                , Drag your image here
              </span>
            </div>
            <div className="or" style={{ fontSize: 12, color: '#ccc', margin: '16px 0' }}>
              or
            </div>
            <div></div>
          </div>
        )}
        {uploading && <ContentLoadingSkeleton />}
        {info.uuid && (
          <div>
            <div className="image-info">
              <div className="l">
                <div>{name}</div>
                {size ? <div>File size: {size}Kb</div> : null}
              </div>
              <div className="r">
                <DeleteImageButton
                  onClick={() => {
                    revokeUrl();

                    setInfo(deepClone(defaultInfo));
                    setText('');

                    onImageRemove?.();
                  }}
                />
              </div>
            </div>
            <ImageUploaderPreview url={url} type={type} />
          </div>
        )}
      </StyledDropArea>
    </>
  );
};

export default ImageUploader;
