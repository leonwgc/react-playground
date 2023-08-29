import React, { useRef, useState, Fragment } from 'react';
import { styled, clsx, useUpdateEffect, useEventListener, Icon } from 'react-uni-comps';
import TipProvider from 'alcedo-ui/TipProvider';
import TextField from 'alcedo-ui/TextField';
import Popup from 'alcedo-ui/Popup';
import IconButton from 'alcedo-ui/IconButton';
import Theme from 'alcedo-ui/Theme';
import Checkbox from 'alcedo-ui/Checkbox';
import List from 'alcedo-ui/List';
import DynamicRenderList from 'alcedo-ui/DynamicRenderList';
import HelpTip from './HelpTip';
import { tagSelectData } from './libs/testData';

const defaultViewMaxCount = 5;

//#region  styles

const StyledListTags = styled.div`
  border-bottom: 1px solid #06789d;
  padding-bottom: 8px;
  overflow: hidden;
  font-size: 12px;

  &::before,
  &::after {
    display: table;
    content: '';
  }

  .list-tag-item {
    float: left;
    user-select: none;
    height: 30px;
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
    width: 60px;
    height: 30px;
    border-radius: 15px;
    background: #fff;
    border-color: #fff;
    transition: none;

    .text-field-placeholder {
      color: #06789d !important;
      cursor: pointer;
    }

    .text-field-input {
      color: #fff !important;
      cursor: pointer;
    }

    &[disabled] {
      .text-field-placeholder {
        color: #d9d9d9 !important;
      }

      .text-field-input {
        cursor: not-allowed;
      }
    }

    &.focused,
    &.activated {
      width: 144px;
      background: #06789d;
      border-color: #06789d;

      .text-field-placeholder,
      .text-field-input {
        color: #fff !important;
        cursor: text;
      }

      &[disabled] {
        width: auto;
        border-color: #fff !important;
        background: #fff !important;

        .text-field-placeholder {
          color: #d9d9d9 !important;
        }

        .text-field-input {
          cursor: not-allowed;
        }
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

const StyledPopupContent = styled.div`
  font-size: 12px;
  .list-item {
    color: #333;
  }
  &::before,
  &::after {
    display: table;
    content: '';
  }
  .dynamic-list-wrap {
    &::before,
    &::after {
      display: table;
      content: '';
    }
    position: relative;

    .region-bottom {
      position: absolute;
      bottom: 0;
      box-sizing: border-box;
      height: 42px;
      line-height: 40px;
      padding: 0 16px;
      border-top: 1px solid #e7e7e7;
      background: #fff;

      .select-num {
        color: #9b9b9b;
      }

      .clear-button {
        font-weight: 700;
        float: right;
        color: #06789d;
        text-decoration: underline;
        cursor: pointer;
      }

      .select-all {
        float: right;
        color: #06789d;

        .checkbox-icon-wrapper {
          width: 32px;
        }
        &[disabled] {
          color: #d9d9d9;
        }
      }
    }
  }
`;

const StyledSelectedInfo = styled.div`
  margin: 8px;
  color: #333;
  font-size: 12px;
  .view-all {
    color: #06789d;
    margin-left: 24px;
    cursor: pointer;
    text-decoration: underline;
  }
`;

//#endregion

const Tags = (props) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [filterInput, setFilterInput] = useState('');
  const [viewAll, setViewAll] = useState(false);
  const textField = useRef(),
    pop = useRef(),
    filter = useRef();

  const { data, value, parentEl, disabled, showTotalSelected } = props,
    filterClassName = clsx('filter-input', {
      activated: popupVisible
    });

  const resetPopPosition = () => {
    pop?.current?.resetPosition();
  };

  const toggleViewAll = () => {
    setViewAll(!viewAll);
  };

  const addClickHandler = (e) => {
    e.stopPropagation();
    changeVisible(true);
  };

  const changeVisible = (bool) => {
    setPopupVisible(bool);
    setFilterInput('');
  };

  useEventListener(window, 'scroll', () => {
    if (popupVisible) {
      setPopupVisible(false);
    }
  });

  useUpdateEffect(() => {
    resetPopPosition();
  }, [value]);

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
        break;
    }

    onChange?.(newValue);
  };

  const filterDataFn = (data, filter) => {
    return data.filter((item) => {
      return (
        !filter ||
        item?.name.toString().toUpperCase().includes(filter.toUpperCase()) ||
        item?.code?.toString().toUpperCase().includes(filter.toUpperCase())
      );
    });
  };

  let filterData = filterDataFn(data, filterInput),
    filterValue = value.slice(),
    viewValue = viewAll ? filterValue.slice() : filterValue.slice(0, defaultViewMaxCount);

  // filter
  let width = 240,
    // commonProps = {
    //   checkboxUncheckedIconCls: 'icon icon-ico-checkbox-off',
    //   checkboxCheckedIconCls: 'icon icon-ico-checkbox-on',
    //   checkboxIndeterminateIconCls: 'icon icon-ico-checkbox-half'
    // },
    isSelectAll = data.length > 0 && data.every((item) => value.find((pos) => pos.id === item.id)),
    isIndeterminate =
      data.length > 0 &&
      !isSelectAll &&
      data.some((item) => value.find((pos) => pos.id === item.id));

  const selectAllHandler = (bool) => {
    changeValue(
      data?.filter((item) => !item?.disabled),
      bool ? 'add' : 'remove'
    );
  };

  return (
    <Fragment>
      <StyledListTags ref={filter} className="list-tags">
        {viewValue?.map?.((item) => (
          <TipProvider
            key={item.name}
            position={TipProvider.Position.BOTTOM_LEFT}
            tipContent={item?.helpTip}
          >
            <div
              className={clsx('list-tag-item', {
                error: item?.disabled
              })}
              title={item.name}
              onMouseOver={(e) => {
                disabled && addClickHandler(e);
              }}
            >
              {item.name}
              {/* <IconButton
                className="list-tag-item-remove-button"
                iconCls="icon icon-ico-alert-error"
                disabled={disabled}
                onClick={(e) => {
                  e.preventDefault();
                  changeCountryValue(item, 'remove');
                }}
              /> */}
              <Icon
                type="uc-icon-cuowu"
                className="list-tag-item-remove-button"
                onClick={(e) => {
                  e.preventDefault();
                  changeValue(item, 'remove');
                }}
                style={{ width: 18, height: 18, fontSize: 18, top: 6, right: 6 }}
              />
            </div>
          </TipProvider>
        ))}

        <TextField
          ref={textField}
          className={filterClassName}
          value={filterInput}
          placeholder="add..."
          clearButtonVisible={false}
          disabled={disabled}
          rightIconCls={popupVisible ? 'dsicon dsicon-search' : ''}
          onClick={addClickHandler}
          onChange={setFilterInput}
        />

        <Popup
          ref={pop}
          triggerEl={filter.current}
          parentEl={parentEl}
          visible={popupVisible}
          position={Popup.Position.BOTTOM_LEFT}
          hasTriangle={false}
          style={{ width: 'auto' }}
          onRequestClose={() => changeVisible(false)}
        >
          <StyledPopupContent>
            {data.length > 0 ? (
              <div className="dynamic-list-wrap">
                <DynamicRenderList
                  //   {...commonProps}
                  //   className="geography-list"
                  listHeight={300}
                  style={{ width }}
                  data={filterData}
                  value={value}
                  disabled={disabled}
                  displayField="name"
                  valueField="id"
                  selectMode={List.SelectMode.MULTI_SELECT}
                  onItemSelect={(item) => changeValue(item, 'add')}
                  onItemDeselect={(item) => changeValue(item, 'remove')}
                  renderer={(item) => (
                    <span>
                      <span title={item.name}>{item.name}</span>
                      {item.disabled && item?.helpTip ? <HelpTip text={item.helpTip} /> : null}
                    </span>
                  )}
                />

                <div className="region-bottom" style={{ width: width }}>
                  <span className="select-num">{value.length} selected</span>
                  <Checkbox
                    className="select-all"
                    checked={isSelectAll}
                    disabled={disabled}
                    indeterminate={isIndeterminate}
                    label="Select All"
                    onChange={selectAllHandler}
                  />
                </div>
              </div>
            ) : (
              <div className="no-matched">No matched</div>
            )}
          </StyledPopupContent>
        </Popup>
      </StyledListTags>
      {showTotalSelected && value?.length > defaultViewMaxCount ? (
        <StyledSelectedInfo>
          Total {value.length} selected
          <span className="view-all" onClick={toggleViewAll}>
            {viewAll ? 'Fold all' : 'View all'}
          </span>
        </StyledSelectedInfo>
      ) : null}
    </Fragment>
  );
};

const TagSelect = (props) => {
  const { data, value, onChange, disabled, showTotalSelected } = props;

  return (
    <Tags
      data={data}
      value={value}
      disabled={disabled}
      showTotalSelected={showTotalSelected}
      onChange={onChange}
    />
  );
};

export default function App() {
  const [value, setValue] = useState([]);
  return (
    <div>
      <label className="campaign-label">Target Languages</label>
      <TagSelect data={tagSelectData} onChange={setValue} showTotalSelected value={value} />
      <div style={{ height: 10000 }}></div>
    </div>
  );
}
