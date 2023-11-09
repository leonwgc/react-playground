/* eslint-disable react/prop-types */
import * as React from 'react';

// import MaterialTextArea from 'alcedo-ui/MaterialTextArea';

import classNames from 'classnames';
import { getStringByteLength } from './helper.mjs';
import { styled, clsx } from 'react-uni-comps';
import IconClose from './IconClose';

const StyledTextInputWrapper = styled.div`
  flex-direction: column;
  position: relative;

  textarea {
    width: 100%;
    transition: all 0.3s ease;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    resize: none;
    word-break: break-all;
    word-wrap: break-word;
    padding-right: 14px;

    &:hover {
      border-color: #06789d;
    }

    &:focus {
      border-width: 2px;
    }

    &.error {
      border-color: red;
    }
  }
  .icon-clear {
    font-size: 14px;
    position: absolute;
    top: 0;
    right: -14px;
    cursor: pointer;
  }
  .count-info {
    font-size: 12px;
    color: #999;
    display: flex;
    justify-content: flex-end;
    margin-top: 2px;
    font-weight: 400;
    position: absolute;
    right: -14px;
    bottom: -16px;

    &.error {
      color: red;
    }
  }
`;

const TextAreaInput = React.forwardRef(
  (
    { autoHeight = true, maxLength, width, onBlur, error, value, onClear, onChange, ...rest },
    ref
  ) => {
    const val = value || '';
    const hasError = maxLength > 0 && getStringByteLength(val) > maxLength;
    const inputRef = React.useRef();
    const [focused, setFocused] = React.useState(false);
    React.useImperativeHandle(ref, () => inputRef.current);

    const showClear = typeof onClear === 'function';

    React.useEffect(() => {
      if (autoHeight) {
        const el = inputRef.current;
        if (el) {
          el.style.height = 'auto';
          el.scrollTop = 0;
          el.style.height = el.scrollHeight + 'px';
        }
      }
    });

    return (
      <StyledTextInputWrapper
        style={{ display: typeof width === 'number' ? 'inline-flex' : 'flex', width }}
      >
        <textarea
          rows={1}
          className={classNames({ error: error || hasError })}
          ref={inputRef}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...rest}
        />
        {focused && maxLength && (
          <div className={classNames('count-info', { error: error })}>
            {getStringByteLength(val)}/{maxLength}
          </div>
        )}

        {showClear && <IconClose className="icon-clear" onClick={onClear} />}
      </StyledTextInputWrapper>
    );
  }
);

TextAreaInput.displayName = 'DS-TextAreaInput';

export default TextAreaInput;
