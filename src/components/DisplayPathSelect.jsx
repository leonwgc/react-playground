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
import { useUpdateEffect, useEventListener, styled, clsx, useMount } from 'react-uni-comps';
// import { addableTagSelectData } from './data';
import removeIcon from './icons/remove.png';
import dynamicIcon from './icons/dynamic.png';

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

  &.focused,
  &:hover {
    border-bottom: 1px solid #06789d;
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

    &.prefix {
      border: none;
      color: #ccc;
      display: inline-flex;
      align-items: center;
      margin-right: 0;
    }

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

const Tags = (props) => {
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState('auto');
  const [text, setText] = useState('');
  const textField = useRef(),
    pop = useRef(),
    filter = useRef();

  const { data, value, onChange, parentEl, disabled, onAddNew, readOnly, style, prefix } = props,
    filterClassName = clsx('filter-input', {
      activated: visible
    });

  const allItemsRef = useRef(data);

  useMount(() => {
    setWidth(filter.current.offsetWidth);
    pop?.current?.resetPosition();
  });

  useEventListener(window, 'scroll', () => {
    if (visible) {
      setVisible(false);
    }
  });

  const showInput = !readOnly && !value;

  const filteredData = allItemsRef.current.filter(
    (item) => item.name.toLowerCase().indexOf(text.trim().toLowerCase()) > -1
  );

  const onTagItemClick = (item) => {
    // choose this
    onChange?.(item);
    setVisible(false);
    // setText('');
  };

  useUpdateEffect(() => {
    if (value) {
      setText('');
    }
  }, [value]);

  useUpdateEffect(() => {
    if (
      text.trim().length &&
      allItemsRef.current.some(
        (item) => item.name.toLowerCase().indexOf(text.trim().toLowerCase()) > -1
      ) &&
      !visible
    ) {
      setVisible(true);
    }
  }, [text, visible]);

  useUpdateEffect(() => {
    if (filteredData.length === 0) {
      setVisible(false);
    }
  }, [filteredData]);

  return (
    <StyledListTags ref={filter} style={style} className={clsx('list-tags', { focused: visible })}>
      {prefix && <div className="prefix list-tag-item">{prefix}</div>}
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
        onClick={() => {
          setVisible(true);
        }}
      />

      <StyledPopover
        visible={visible}
        triggerEl={filter.current}
        parentEl={parentEl || filter.current}
        position={Popover.Position.BOTTOM_LEFT}
        hasTriangle={false}
        resetPositionWait={0}
        onRequestClose={() => {
          setVisible(false);
        }}
        style={{ width: width }}
      >
        {!value && (
          <div className="tag-values">
            <div className="tag-list">
              <div className="tag-children">
                {filteredData.map((item) => (
                  <div key={item.id} className="tag-item" onClick={() => onTagItemClick(item)}>
                    <StyledDynamicIcon />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </StyledPopover>
    </StyledListTags>
  );
};

const DisplayPathSelect = (props) => {
  return <Tags {...props} />;
};

export default DisplayPathSelect;
{
  /* <DisplayPathSelect
  style={{ width: 280 }}
  data={displayPathSelectData}
  onChange={setValue}
  value={value}
  prefix={'/'}
/>; */
}
