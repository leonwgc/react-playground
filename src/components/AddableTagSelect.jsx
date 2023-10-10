/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
// import TipProvider from 'alcedo-ui/TipProvider';
import TextField from 'alcedo-ui/TextField';
import Popover from 'alcedo-ui/Popover';
// import IconButton from 'alcedo-ui/IconButton';
// import useUpdateEffect from 'src/hooks/useUpdateEffect';
// import useEventListener from 'src/hooks/useEventListener';
// import styled from 'styled-components';
// import classNames from 'classnames';
import {
  useUpdateEffect,
  useEventListener,
  styled,
  clsx,
  useMount,
  useForceUpdate,
  useLatest,
  Popup
} from 'react-uni-comps';
// import { addableTagSelectData } from './data';
import removeIcon from './icons/remove.png';
import dynamicIcon from './icons/dynamic.png';
import { getStringByteLength } from './helper.mjs';

const StyledWrapper = styled.div`
  flex-direction: column;
  position: relative;
  .material-text-field {
    width: unset;
  }
  .count-info {
    font-size: 12px;
    color: #999;
    display: flex;
    justify-content: flex-end;
    margin-top: 2px;
    font-weight: 400;
    position: absolute;
    right: 0;

    &.error {
      color: red;
    }
  }
`;

const StyledRemoveIcon = styled.span`
  width: 16px;
  height: 16px;
  margin-left: 12px;
  display: inline-block;
  background: url(${removeIcon}) center/100% no-repeat;
`;

const StyledDynamicIcon = styled.span`
  width: 16px;
  height: 16px;
  margin-right: 2px;
  display: inline-block;
  background: url(${dynamicIcon}) center/100% no-repeat;
`;

// #region styles

const StyledPopover = styled(Popover)`
  .trigger-pop-content .popover-content {
    border: 1px solid #ddd;
  }

  .tag-values {
    padding: 10px 12px 12px;
    max-height: 260px;
    overflow-y: auto;

    .tag-list {
      &:not(:first-of-type) {
        margin-top: 8px;
      }

      .tag-title {
        font-weight: 400;
        font-size: 12px;
        margin-bottom: 8px;
        color: #333;
        line-height: 16.34px;
      }

      .tag-children {
        display: flex;
        flex-wrap: wrap;
        .tag-item {
          user-select: none;
          border-radius: 17px;
          border: 1px solid #ddd;
          color: #06789d;
          margin-right: 6px;
          margin-bottom: 6px;

          cursor: pointer;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 400;
          display: inline-flex;
          align-items: center;

          &:hover {
            background: #ebfaff;
          }
          &:active {
            background: #e6edf1;
          }
        }
      }
    }
  }
`;

const StyledListTags = styled.div`
  border-bottom: 1px solid #ccc;
  padding-bottom: 4px;
  overflow: hidden;
  font-size: 12px;
  display: flex;

  &.error {
    border-color: #ff5959;
  }

  &.focused,
  &:hover {
    border-bottom: 1px solid #004771;

    &.error {
      border-color: #ff5959;
    }
  }

  &.focused {
    border-width: 2px;
  }

  &::before,
  &::after {
    display: table;
    content: '';
  }

  .list-tag-item {
    /* float: left; */
    user-select: none;
    height: 30px;
    display: inline-flex;
    align-items: center;
    width: auto;
    border: 1px solid #ddd;
    border-radius: 17px;
    color: #06789d;
    cursor: pointer;
    box-sizing: border-box;
    padding: 6px 6px 6px 12px;
    position: relative;
    margin: 16px 8px 0 0;

    &.readyOnly {
      padding-right: 8px;
      cursor: auto;
    }
  }

  .filter-input {
    /* float: left; */
    margin: 16px 8px 0 0;
    width: 100%;
    height: 30px;
    border-radius: 15px;
    background: #fff;
    border-color: #fff;
    transition: none;

    &[disabled] {
      .text-field-placeholder {
        color: #d9d9d9 !important;
      }

      .text-field-input {
        cursor: not-allowed;
      }
    }

    .text-field-right-icon {
      color: #fff;
      font-size: 14px;
      width: 28px;
    }
  }
`;

// #endregion

const getAllItems = (data = []) => {
  let items = [];
  data.map((item) => {
    items = items.concat(item.children || []);
  });

  return items;
};

const Tags = (props) => {
  // const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState('auto');
  const [text, setText] = useState('');
  const textField = useRef(),
    pop = useRef(),
    filter = useRef();

  const [focused, setFocused] = React.useState(false);

  const visibleRef = useLatest(focused);
  const forceUpdate = useForceUpdate();

  const {
      data,
      value,
      onChange,
      parentEl,
      disabled,
      onAddNew,
      readOnly,
      style,
      maxLength,
      onBlur
    } = props,
    filterClassName = clsx('filter-input', {
      activated: visible
    });

  const allItemsRef = useRef(getAllItems(data));

  useMount(() => {
    setWidth(filter.current.offsetWidth);
    pop?.current?.resetPosition();
  });

  useEventListener(window, 'scroll', () => {
    if (visible) {
      setFocused(false);
    }
  });

  useUpdateEffect(() => {
    if (visible) {
      forceUpdate();
    }
  }, [visible]);

  const showInput = !readOnly && !value;

  const filteredDataRef = React.useRef(
    allItemsRef.current.filter(
      (item) => item.name.toLowerCase().indexOf(text.trim().toLowerCase()) > -1
    )
  );

  const onTagItemClick = (item) => {
    onChange?.(item);
  };

  useUpdateEffect(() => {
    if (value) {
      setText('');
    }
  }, [value]);

  useUpdateEffect(() => {
    const txt = text.trim().toLowerCase();
    if (txt) {
      filteredDataRef.current = allItemsRef.current.filter(
        (item) => item.name.toLowerCase().indexOf(txt) > -1
      );
    } else {
      filteredDataRef.current = allItemsRef.current;
    }
    forceUpdate();
  }, [text]);

  const byteLength = getStringByteLength(text);
  const hasError = maxLength > 0 && byteLength > maxLength;
  const visible = focused && filteredDataRef.current.length > 0;

  return (
    <StyledWrapper style={style}>
      <StyledListTags
        ref={filter}
        className={clsx('list-tags', { focused: focused, error: hasError })}
      >
        {value ? (
          <div
            className={clsx('list-tag-item', {
              readyOnly: readOnly
            })}
            title={value.name}
          >
            {value.type === 2 && <StyledDynamicIcon />}
            {value.name}
            {readOnly ? null : <StyledRemoveIcon onClick={() => onChange?.(null)} />}
          </div>
        ) : null}

        <TextField
          ref={textField}
          className={filterClassName}
          style={{ display: showInput ? '' : 'none' }}
          value={text}
          clearButtonVisible={false}
          disabled={disabled}
          rightIconCls={visible ? 'dsicon dsicon-search' : ''}
          onChange={setText}
          onKeyDown={(e) => {
            if (e.code === 'Enter' || e.which === 13) {
              const currentText = e.target.value.trim();
              if (currentText.length) {
                onAddNew?.(currentText);
              }
            }
          }}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
        />

        <StyledPopover
          visible={visible}
          triggerEl={filter.current}
          // parentEl={filter.current}
          position={Popover.Position.BOTTOM_LEFT}
          hasTriangle={false}
          resetPositionWait={0}
          onRequestClose={() => {
            setFocused(false);
          }}
          style={{ width: width }}
        >
          {!value && (
            <div className="tag-values">
              {!text.trim().length ? (
                data.map((tagItem) => (
                  <div id={tagItem.id} key={tagItem.id} className="tag-list">
                    <div className="tag-title">{tagItem.name}</div>
                    <div className="tag-children">
                      {tagItem.children.map((childItem) => (
                        <div
                          key={childItem.id}
                          className="tag-item"
                          onClick={() => onTagItemClick(childItem)}
                        >
                          {childItem.type === 2 && <StyledDynamicIcon />}
                          {childItem.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="tag-list">
                  <div className="tag-children">
                    {filteredDataRef.current.map((item) => (
                      <div key={item.id} className="tag-item" onClick={() => onTagItemClick(item)}>
                        {item.type === 2 && <StyledDynamicIcon />}
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </StyledPopover>
      </StyledListTags>
      {focused && maxLength && (
        <div className={clsx('count-info', { error: hasError })}>
          {byteLength}/{maxLength}
        </div>
      )}
      <div style={{ position: 'absolute', top: 500 }}>
        visible: {visible ? 'yes' : 'no'},focus:{focused ? 'yes' : 'no'}{' '}
      </div>
    </StyledWrapper>
  );
};

const AddableTagSelect = (props) => {
  return <Tags {...props} />;
};

export default AddableTagSelect;
//   <AddableTagSelect data={tagSelectData} onChange={setValue} value={value}  onAddNew /> {id,name,type,children:[{id,name,type}]}
