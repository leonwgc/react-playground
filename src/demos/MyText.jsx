import React, { useState, useReducer, useCallback, useRef, useEffect } from 'react';
import { styled, useUpdateEffect, Icon } from 'react-uni-comps';
import Popover from 'alcedo-ui/Popover';
import { getData, getDataByFilter } from './helper';

import { testData } from './libs/testData';
import getCaretCoordinates from './libs/getCaretCoordinates';

const StyledPopover = styled(Popover)`
  &.ppc-picker-popup {
    top: unset !important;
    left: unset !important;
    z-index: 10000;
    margin-left: ${(props) => props.$left || 0}px !important;
    margin-top: ${(props) => props.$top || 0}px !important;
    position: fixed;
    width: 300px;
  }
  .pop-dynamic-values {
    padding: 10px 12px 12px;
    max-height: 260px;
    overflow-y: auto;
    font-size: 12px;

    .tag-list {
      margin-bottom: 8px;

      .tag-title {
        font-weight: 600;
        font-size: 12px;
        margin-bottom: 8px;
      }

      .tag-items,
      .tags {
        display: flex;
        flex-wrap: wrap;
        .tag-item-text {
          user-select: none;
          border-radius: 11px;
          border: 1px solid #ddd;
          padding: 2px 10px;
          color: #06789d;
          margin-right: 6px;
          margin-bottom: 6px;
          cursor: pointer;

          &:hover {
            background-color: #06789d;
            color: #fff;
            border-color: #06789d;
          }
          &.active {
            background-color: #06789d;
            color: #fff;
            border-color: #06789d;
          }
        }
      }
    }
    .tag-category {
      font-size: 13px;
      margin-bottom: 6px;
    }
  }
`;
const defaultPosTop = 20;
const defaultPosLeft = 8;

const StyledTextInput = styled.div`
  border-bottom: 1px solid #ddd;
  display: flex;
  height: 40px;
  align-items: center;
  padding: 0 12px;

  input {
    border: none;
    background-image: none;
    outline: none;
    flex: 1;
  }
  img {
    width: 18px;
    height: 18px;
    flex-basis: 18px;
  }
`;

const StyledAddTrigger = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  color: #06789d;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 12px;
  width: 46px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  box-sizing: border-box;
  &:hover {
    background-color: #06789d;
    color: #fff;
  }
`;

const StyledTextArea = styled.textarea`
  border: 1px solid #ddd;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 160px;
  box-sizing: border-box;
  padding: 6px;
  font-size: 12px;
  line-height: 28px;
  transition: border 0.2s linear;
  color: #333;

  :focus {
    border-color: #004771;
  }

  &.error {
    .text-area-input {
      border-color: red;

      :focus {
        border-color: red;
      }
    }
  }
`;

const MyTextArea = ({
  parentEl,
  className,
  value,
  dynamticValues,
  placeholder,
  disabled,
  onChange,
  onBlur,
  hasDynamicValue,
  ...rest
}) => {
  const triggerRef = useRef(null);
  const timerRef = useRef(0);
  const bracketRef = useRef({
    index: 0,
    value: '',
    left: defaultPosLeft,
    top: defaultPosTop,
    step: 0,
    triggerBy: '{', // {/+
    onIndex: -1, // latest { index
    on: false // as visible
  });

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [visible, setVisible] = useState(false);

  const textAreaRef = useRef();
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);

  const dataRef = useRef(getData(dynamticValues));

  const updateInfo = useCallback((partialInfo) => {
    const el = textAreaRef.current;
    const pos = getCaretCoordinates(el, el.selectionEnd);
    bracketRef.current = {
      ...bracketRef.current,
      ...partialInfo,
      left: pos.left + defaultPosLeft,
      top: pos.top + defaultPosTop - el.scrollTop,
      value: el.value,
      index: el.selectionEnd
    };
    forceUpdate();
  }, []);

  useUpdateEffect(() => {
    if (text.length) {
      const t = text.toLocaleLowerCase().trim();
      dataRef.current = getDataByFilter(dynamticValues, t);
    } else {
      dataRef.current = getData(dynamticValues);
    }
    forceUpdate();
  }, [text]);

  useUpdateEffect(() => {
    if (visible) {
      if (!value) {
        setVisible(false);
      }
    }
  }, [value]);

  useUpdateEffect(() => {
    if (!visible) {
      setText('');
    }
  }, [visible]);

  useEffect(() => {
    if (dynamticValues && !dataRef.current) {
      dataRef.current = getData(dynamticValues);
      forceUpdate();
    }
  }, [dynamticValues]);

  useEffect(() => {
    if (!visible) {
      setText('');
    }
  }, [visible]);

  const handleDynamicValueSelect = ({ value: selected }) => {
    setVisible(false);

    const { value, index, onIndex } = bracketRef.current;
    const left = value.slice(0, onIndex - 1); // no {
    const right = value.slice(index); //
    onChange(left + '{' + selected + '}' + right);

    updateInfo({ on: false });
    textAreaRef.current.focus();
    setTimeout(() => {
      setFocused(true);
    }, 200);
  };

  const showData = dataRef.current;

  return (
    <div {...rest}>
      <div className="trigger-el" ref={triggerRef} style={{ position: 'relative' }}>
        {hasDynamicValue && focused && (
          <StyledAddTrigger
            onClick={() => {
              clearTimeout(timerRef.current);
              textAreaRef.current.focus();
              setVisible(true);
              updateInfo({
                on: true,
                triggerBy: '+',
                onIndex: textAreaRef.current.selectionStart + 1
              });
            }}
          >
            ... Add
          </StyledAddTrigger>
        )}
        <StyledTextArea
          ref={textAreaRef}
          value={value}
          className={className}
          disabled={disabled}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onFocus={() => {
            if (!focused) {
              setFocused(true);
            }
          }}
          onBlur={onBlur}
          placeholder={placeholder}
          onKeyUp={(e) => {
            e.preventDefault();
            if (!hasDynamicValue || !dynamticValues) {
              return; // stop here
            }
            const value = e.target.value;
            const index = e.target.selectionStart;
            const info = bracketRef.current;

            if (e.key === '{' || e.key === '{' || e.code === 'BracketLeft') {
              updateInfo({
                index,
                value,
                on: true,
                onIndex: index,
                triggerBy: '{'
              });
              setVisible(true);
            } else if (e.key === '}' || e.code === 'BracketRight') {
              updateInfo({ on: false });
              setVisible(false);
            } else if (e.key === 'Backspace' || e.which === 8) {
              if (info.on) {
                if (index < info.onIndex) {
                  updateInfo({ on: false });
                  setVisible(false);
                }
                // search
                const search = value.slice(info.onIndex, index);
                if (search.length) {
                  setText(search);
                }
              }
            } else {
              if (info.on) {
                // search
                const search = value.slice(info.onIndex, index);
                if (search.length) {
                  setText(search);
                }
              }
            }
          }}
        />
      </div>

      <StyledPopover
        className="ppc-picker-popup"
        $left={bracketRef.current.left}
        $top={bracketRef.current.top}
        visible={visible}
        triggerEl={triggerRef.current}
        parentEl={parentEl || triggerRef.current}
        position={Popover.Position.RIGHT_TOP}
        hasTriangle={false}
        resetPositionWait={0}
        onRequestClose={() => setVisible(false)}
      >
        <div>
          {bracketRef.current.triggerBy === '+' && (
            <div>
              <StyledTextInput>
                <input
                  value={text}
                  placeholder="keywords"
                  onChange={(e) => setText(e.target.value)}
                />
                <Icon type="uc-icon-sousuo" />
              </StyledTextInput>
            </div>
          )}
          <div className="pop-dynamic-values">
            {showData &&
              Object.keys(showData).map((key, i) => {
                return (
                  <div key={i} className="tag-list">
                    <div className="tag-title">{key}</div>
                    {typeof showData[key] === 'string' ? (
                      <div className="tag-items">
                        <div
                          className="tag-item-text"
                          onClick={() => handleDynamicValueSelect({ value: showData[key] })}
                        >
                          {showData[key]}
                        </div>
                      </div>
                    ) : Array.isArray(showData[key]) ? (
                      <div className="tag-items">
                        {showData[key]?.map((value, i) =>
                          typeof value === 'string' ? (
                            <div
                              key={i}
                              className="tag-item-text"
                              onClick={() => handleDynamicValueSelect({ value: value })}
                            >
                              {value}
                            </div>
                          ) : (
                            <div key={i} className="tag-category-content">
                              {value?.tagCategory !== 'N.A.' && (
                                <div className="tag-category">{value?.tagCategory}</div>
                              )}
                              <div className="tags">
                                {value?.tags?.map((tag) => (
                                  <div
                                    key={tag?.content}
                                    className="tag-item-text"
                                    onClick={() =>
                                      handleDynamicValueSelect({
                                        value: tag?.content
                                      })
                                    }
                                  >
                                    {tag?.content}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })}
          </div>
        </div>
      </StyledPopover>
    </div>
  );
};

const App = () => {
  const [value, setValue] = useState(``);

  return (
    <div>
      <MyTextArea value={value} onChange={setValue} dynamticValues={testData} hasDynamicValue />
    </div>
  );
};

export default App;
