import React, { useCallback, useMemo } from 'react';
import { Button, Form, Input, Space, Select } from 'antd';
import { countryConfig } from './antd.data';
import '/node_modules/flag-icons/css/flag-icons.min.css';

export default function PhoneNumber({
  value = '',
  onChange,
  codeValue = 'CN',
  codeOnChange,
  onSubmit
}) {
  const { status, errors } = Form.Item.useStatus();
  // 自定义搜索。
  const filterOption = useCallback((input, option) => {
    const item = countryConfig.find((item) => item.countryCode === option?.value);
    return (
      item.chineseName.includes(input) ||
      item.englishName.toLowerCase().includes(input.toLowerCase()) ||
      item.phoneCode.includes(input)
    );
  }, []);

  const selectOptions = useMemo(
    () =>
      countryConfig.map((item) => ({
        label: (
          <Space size={8} className="phone-number-area-code-select">
            <span className="area-code-flag">
              <span
                className={`fi fi-${
                  item?.flagCode?.toLowerCase() || item?.countryCode?.toLowerCase()
                }`}
              />
            </span>
            <span className="area-code-country-name">{item.chineseName}</span>
            <span className="area-code-number">{`+${item?.phoneCode}`}</span>
          </Space>
        ),
        value: item.countryCode // phone code maybe duplicated
      })),
    []
  );

  return (
    <Space.Compact block>
      <Select
        value={codeValue}
        popupMatchSelectWidth={false}
        style={{ maxWidth: 120 }}
        showSearch
        options={selectOptions}
        labelRender={(data) => {
          const item = countryConfig.find((item) => item.countryCode === data.value);
          return item?.phoneCode ? (
            <Space className="phone-number-area-code-select" size={8}>
              <span className="area-code-flag">
                <span
                  className={`fi fi-${
                    item?.flagCode?.toLowerCase() || item?.countryCode?.toLowerCase()
                  }`}
                />
              </span>
              <span className="area-code-number">{`+${item?.phoneCode}`}</span>
            </Space>
          ) : null;
        }}
        optionFilterProp="children"
        filterOption={filterOption}
        onChange={codeOnChange}
      />
      <Input value={value} onChange={onChange} placeholder="Phone Number" />
      <Button
        // type="primary"
        onClick={onSubmit}
        disabled={!value}
        style={{ border: 'none' }}
        color={status === 'error' ? 'danger' : 'primary'}
        variant="solid"
      >
        Send Code
      </Button>
    </Space.Compact>
  );
}
