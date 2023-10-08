import React from 'react';
import MaterialDropdownSelect from 'alcedo-ui/MaterialDropdownSelect';
import PinIcon from './icons/pin.png';
import PinFixedIcon from './icons/pin-fixed.png';
import { Space } from 'react-uni-comps';

/**
 * TODO: use customized version of alcedo
 * @param {*} param0
 * @returns
 */
export default function PinMode({ displayField, valueField, data, value, onChange, ...rest }) {
  return (
    <MaterialDropdownSelect
      {...rest}
      autoPopupWidth={false}
      value={value}
      triggerRenderer={(value) => (
        <Space size={18} align="center">
          <img
            alt="icon"
            style={{ width: 18 }}
            src={value?.[valueField] !== 1 ? PinFixedIcon : PinIcon}
          />
          <span>{value?.label}</span>
        </Space>
      )}
      data={data}
      displayField={displayField}
      valueField={valueField}
      onChange={onChange}
    />
  );
}
