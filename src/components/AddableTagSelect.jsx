/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import TipProvider from 'alcedo-ui/TipProvider';
import TextField from 'alcedo-ui/TextField';
import Popover from 'alcedo-ui/Popover';
import IconButton from 'alcedo-ui/IconButton';
// import useUpdateEffect from 'src/hooks/useUpdateEffect';
// import useEventListener from 'src/hooks/useEventListener';
// import styled from 'styled-components';
// import classNames from 'classnames';
import { useUpdateEffect, useEventListener, styled, clsx, useMount } from 'react-uni-comps';
// import { addableTagSelectData } from './data';

const renderRemoveIcon = (readOnly, disabledValues = [], item, onClick) => {
  if (readOnly || disabledValues.find((d) => d.id === item.id)) {
    return null;
  }

  return (
    <IconButton
      className="list-tag-item-remove-button"
      iconCls="icon icon-ico-alert-error"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    />
  );
};

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
          line-height: 18px;

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
  display: block;

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
    float: left;
    user-select: none;
    height: 28px;
    line-height: 28px;
    width: auto;
    border: 1px solid #ddd;
    border-radius: 15px;
    color: #06789d;
    cursor: pointer;
    box-sizing: border-box;
    padding: 0 38px 0 8px;
    position: relative;
    margin: 16px 8px 0 0;

    &.readyOnly {
      padding-right: 8px;
      cursor: auto;
    }

    &.is-editing {
      background-color: #f4f4f4;
      color: #ccc;
    }

    .list-tag-item-remove-button {
      height: 30px;
      width: 30px;
      font-size: 16px;
      color: #ccc;
      position: absolute;
      right: 0;
      top: 0;
    }

    &.error {
      color: #ff5959;
      border-color: #ff5959;

      .list-tag-item-remove-button {
        color: #ff5959;
      }

      &:hover {
        color: #fff;
        background: #ff5959;

        .list-tag-item-remove-button {
          color: #fff;
        }
      }
    }
  }

  .filter-input {
    float: left;
    margin: 16px 8px 0 0;
    /* width: 60px; */
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

  .add-button {
    float: left;
    margin: 16px 8px 0 0;
    padding-left: 8px;
    text-align: left;
    width: 68px;
    height: 30px;
    color: #06789d;
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
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState('auto');
  const [text, setText] = useState('');
  const textField = useRef(),
    pop = useRef(),
    filter = useRef();

  const { data, value, parentEl, disabled, onAddNew, readOnly, disabledValues = [], style } = props,
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
      setVisible(false);
    }
  });

  const changeValue = (items, type) => {
    const { value, onChange } = props;
    let newValue = [];
    if (!Array.isArray(items)) {
      items = [items].filter((item) => !!item);
    }

    switch (type) {
      case 'add':
        const result = value.filter((v) => items?.findIndex((item) => item?.id === v?.id) === -1);
        newValue = [...new Set([...result, ...items])];
        break;
      case 'remove':
        newValue = value.filter((v) => {
          return !items.find((item) => item.name === v.name);
        });

        textField.current.focus();

        break;
    }

    onChange?.(newValue);
  };

  const showInput = !readOnly && !value.length;

  const filteredData = allItemsRef.current.filter(
    (item) => item.name.toLowerCase().indexOf(text.trim().toLowerCase()) > -1
  );

  const onTagItemClick = (item) => {
    // choose this
    changeValue([item], 'add');
    setText('');
    setVisible(false);
  };

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
      {value?.map?.((item) => (
        <TipProvider
          key={item.name}
          position={TipProvider.Position.BOTTOM_LEFT}
          tipContent={item?.helpTip}
        >
          <div
            className={clsx('list-tag-item', {
              'error': item?.disabled,
              'readyOnly': readOnly,
              'is-editing': disabledValues.find((d) => d.id === item.id)
            })}
            title={item.name}
          >
            {item.name}

            {renderRemoveIcon(readOnly, disabledValues, item, () => changeValue(item, 'remove'))}
          </div>
        </TipProvider>
      ))}

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
              onAddNew(currentText);
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
        <div className="tag-values">
          {!text.trim().length ? (
            data.map((tagItem) => (
              <div id={tagItem.id} className="tag-list">
                <div className="tag-title">{tagItem.name}</div>
                <div className="tag-children">
                  {tagItem.children.map((childItem) => (
                    <div
                      key={childItem.id}
                      className="tag-item"
                      onClick={() => onTagItemClick(childItem)}
                    >
                      {childItem.name}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="tag-list">
              <div className="tag-children">
                {filteredData.map((item) => (
                  <div key={item.id} className="tag-item" onClick={() => onTagItemClick(item)}>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </StyledPopover>
    </StyledListTags>
  );
};

const AddableTagSelect = (props) => {
  const {
    data,
    value,
    onChange,
    disabled,
    showTotalSelected = true,
    renderer,
    readOnly,
    disabledValues = [],
    style
  } = props;

  return (
    <Tags
      data={data}
      value={value}
      disabled={disabled}
      showTotalSelected={showTotalSelected}
      onChange={onChange}
      renderer={renderer}
      readOnly={readOnly}
      disabledValues={disabledValues}
      style={style}
      onAddNew={(text) => {
        console.log(text, 'added');
      }}
    />
  );
};

export default AddableTagSelect;
//   <AddableTagSelect data={tagSelectData} onChange={setValue} value={value}  disabledValues/> <id,name> pair
