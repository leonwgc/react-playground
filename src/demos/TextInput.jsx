import React, { useState } from 'react';
import { styled } from 'react-uni-comps';
import MaterialTextField from 'alcedo-ui/MaterialTextField';
import TextField from 'alcedo-ui/TextField';
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

/** static part use styled template , dynamic part use style prop  */
const StyledTextInputWrapper = styled.div`
  flex-direction: column;
  .material-text-field {
    width: unset;
  }
  .count-info {
    font-size: 12px;
    color: #999;
    display: flex;
    justify-content: flex-end;
    margin-top: 2px;
  }

  .material-provider.has-separator .material-provider-field,
  .text-field {
    &.theme-error {
      border-color: red;
    }
  }
`;

const MyTextInput = ({ maxLength, width, ...rest }) => {
  const val = rest.value || '';
  const hasError = maxLength > 0 && getStringByteLength(val) > maxLength;

  return (
    <StyledTextInputWrapper
      style={{ display: typeof width === 'number' ? 'inline-flex' : 'flex', width }}
    >
      <MaterialTextField {...rest} theme={hasError ? Theme.ERROR : Theme.DEFAULT} />
      {maxLength && (
        <div className="count-info">
          ({getStringByteLength(val)}/{maxLength})
        </div>
      )}
    </StyledTextInputWrapper>
  );
};

const MyTextInput1 = ({ maxLength, width, ...rest }) => {
  const val = rest.value || '';
  const hasError = maxLength > 0 && getStringByteLength(val) > maxLength;

  return (
    <StyledTextInputWrapper
      style={{ display: typeof width === 'number' ? 'inline-flex' : 'flex', width }}
    >
      <TextField {...rest} theme={hasError ? Theme.ERROR : Theme.DEFAULT} />
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
        <MyTextInput1 maxLength={10} value={text} onChange={setText} width={300} />
      </p>
      <p>
        <MyTextInput placeholder="no length limit" value={text} onChange={setText} width={300} />
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
