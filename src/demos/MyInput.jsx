import React, { useRef, useImperativeHandle, useState } from 'react';
import { styled, clsx } from 'react-uni-comps';

const prefixClassName =
  (prefix) =>
  (className = '') => {
    className = className.trim();
    return className ? prefix + '-' + className : prefix;
  };

const getClassName = prefixClassName('ds-input');

//#region  style

const StyledInput = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  font-size: 14px;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  box-sizing: border-box;
  color: #333;

  background-image: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  transition: all 0.3s;

  &.disabled {
    color: #ccc;
  }

  &.focused {
    color: #06789d;
  }

  .suffix {
    margin-left: 8px;
    user-select: none;
  }

  input {
    flex: 1;
    position: relative;
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    appearance: none;
    box-shadow: none;
    width: 100%;

    &::placeholder {
      color: #bfbfbf;
      user-select: none;
    }
  }
`;
//#endregion

/** custom input*/
const Input = React.forwardRef((props, ref) => {
  const { className, style, suffix, disabled, readOnly, ...rest } = props;

  const inputRef = useRef();
  const [focused, setFocused] = useState(false);
  useImperativeHandle(ref, () => inputRef.current);

  const elProps = {
    ...rest,
    ref: inputRef,
    readOnly,
    disabled,
    onFocus: (e) => {
      setFocused(true);
      props.onFocus?.(e);
    },
    onBlur: (e) => {
      props.onBlur?.(e);

      setTimeout(() => {
        setFocused(false);
      }, 300);
    }
  };

  return (
    <StyledInput
      style={style}
      className={clsx(getClassName(), className, {
        'focused': focused,
        'disabled': disabled,
        'read-only': readOnly
      })}
    >
      {React.createElement('input', elProps)}
      {suffix && <span className={clsx('suffix', getClassName('suffix'))}>{suffix}</span>}
    </StyledInput>
  );
});

Input.displayName = 'DS-Input';

export default Input;
