import React, { useState } from 'react';
import { styled } from 'react-uni-comps';
import MaterialTextField from 'alcedo-ui/MaterialTextField';
import Theme from 'alcedo-ui/Theme';

const getStringByteLength = (str) => {
  if (!str || typeof str !== 'string') {
    return 0;
  }
  let byteLength = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode <= 0x7f) {
      byteLength += 1;
    } else {
      byteLength += 2;
    }
  }
  return byteLength;
};

const StyledTextInputWrapper = styled.div`
  display: ${({ $width }) => (typeof $width === 'number' ? 'inline-flex' : 'flex')};
  flex-direction: column;
  .material-text-field {
    width: ${({ $width = '100%' }) => (typeof $width === 'string' ? $width : $width + 'px')};
  }
  .count-info {
    width: ${({ $width = '100%' }) => (typeof $width === 'string' ? $width : $width + 'px')};
    font-size: 12px;
    color: #999;
    display: flex;
    justify-content: flex-end;
    margin-top: 2px;
  }

  .material-provider.has-separator .material-provider-field {
    &.theme-error {
      border-color: red;
    }
  }
`;

const MyTextInput = ({ maxLength, width, ...rest }) => {
  const val = rest.value || '';
  const hasError = maxLength > 0 && getStringByteLength(val) > maxLength;

  return (
    <StyledTextInputWrapper $hasError={hasError} $width={width}>
      <MaterialTextField {...rest} theme={hasError ? Theme.ERROR : Theme.DEFAULT} />
      {maxLength && (
        <div className="count-info">
          ({getStringByteLength(val)}/{maxLength})
        </div>
      )}
    </StyledTextInputWrapper>
  );
};

export default function App() {
  const [text, setText] = useState('');
  return (
    <div>
      <p>
        <MyTextInput maxLength={10} value={text} onChange={setText} width={300} />
      </p>
      <p>
        <MyTextInput maxLength={10} value={text} onChange={setText} width={500} />
      </p>
      <p>
        <MyTextInput maxLength={10} value={text} onChange={setText} width={'50%'} />
      </p>
      <p>
        <MyTextInput maxLength={10} value={text} onChange={setText} />
      </p>
    </div>
  );
}
