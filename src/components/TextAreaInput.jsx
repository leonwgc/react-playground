/* eslint-disable react/prop-types */
import * as React from 'react';

// import MaterialTextArea from 'alcedo-ui/MaterialTextArea';

import classNames from 'classnames';
import { getStringByteLength } from './helper.mjs';
import { styled, clsx } from 'react-uni-comps';
import { IconClose } from './IconTextAreaInput';

const StyledTextInputWrapper = styled.div`
  flex-direction: column;
  position: relative;

  &:focus-within {
    .count-info {
      visibility: visible;
    }
    .icon-clear {
      opacity: 1;
    }
  }

  textarea {
    box-sizing: border-box;
    width: 100%;
    transition: all 0.3s ease;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    resize: none;
    word-break: break-all;
    word-wrap: break-word;
    padding-right: 1.15em;
    padding-bottom: 8px;
    font-size: 12px;
    font-family: Open Sans;

    &:hover {
      border-color: #06789d;
    }

    &:focus {
      border-width: 2px;
      border-color: #06789d;
    }

    &.error {
      border-color: red;
    }
  }
  .icon-clear {
    font-size: 14px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    /* visibility: hidden; */
    opacity: 0;
  }
  .icon-right {
    font-size: 14px;
    position: absolute;
    bottom: 8px;
    right: 0;
  }
  .count-info {
    visibility: hidden;
    display: flex;
    font-size: 12px;
    color: #999;
    justify-content: flex-end;
    margin-top: 2px;
    font-weight: 400;
    position: absolute;
    right: 0;
    bottom: -1.2em;

    &.error {
      color: red;
    }
  }
`;

const TextAreaInput = React.forwardRef(
  (
    {
      autoHeight = true,
      maxLength,
      width,
      onBlur,
      error,
      value,
      onClear,
      onChange,
      rightIcon,
      className,
      style,
      ...rest
    },
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
        className={className}
        style={{ ...style, display: typeof width === 'number' ? 'inline-flex' : 'flex', width }}
      >
        <textarea
          rows={1}
          className={classNames({ error: error || hasError })}
          ref={inputRef}
          // onClick={() => {
          //   setFocused(true);
          // }}
          // onBlur={() => {
          //   onBlur?.();
          //   setTimeout(() => {
          //     setFocused(false);
          //   }, 100);
          // }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...rest}
        />
        {maxLength && (
          <div className={classNames('count-info', { error: error })}>
            {getStringByteLength(val)}/{maxLength}
          </div>
        )}

        {showClear && value?.length > 0 && (
          <IconClose
            className="icon-clear"
            onClick={() => {
              onClear?.();
              // inputRef.current.click();
              inputRef.current.focus();
              // setFocused(true);
            }}
          />
        )}

        {rightIcon && <span className="icon-right">{rightIcon}</span>}
      </StyledTextInputWrapper>
    );
  }
);

TextAreaInput.displayName = 'DS-TextAreaInput';

export default TextAreaInput;
