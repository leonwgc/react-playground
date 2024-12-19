import React, { useEffect, useCallback, useMemo } from 'react';
import {
  Button,
  Divider,
  Form,
  Switch,
  Input,
  Space,
  Upload,
  Segmented,
  Select,
  ConfigProvider
} from 'antd';
import { StarOutlined, StarFilled, StarTwoTone, UploadOutlined } from '@ant-design/icons';
import { countryConfig } from './antd.data';
import '/node_modules/flag-icons/css/flag-icons.min.css';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function AntdDemos() {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = React.useState(false);

  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 }
  };
  const values = Form.useWatch([], form);

  const variant = Form.useWatch('variant', form);

  const phoneNumber = Form.useWatch('phoneNumber', form) || '';

  useEffect(() => {
    form
      .validateFields({ validateOnly: true }) // 5.5.0 新增。仅校验内容而不会将错误信息展示到 UI 上。
      .then(() => setDisabled(false))
      .catch(() => setDisabled(true));
  }, [form, values]);

  // for phone number
  const onSelectChangeHandle = useCallback(
    (value) => {
      const data = countryConfig.find((item) => item.countryCode === value);
      form.setFieldValue('phoneCodeValue', data);
    },
    [countryConfig, form]
  );
  const language = 'zh-CN';

  // 自定义搜索。
  const filterOption = useCallback(
    (input, option) => {
      const item = countryConfig.find((item) => item.countryCode === option?.value);
      return (
        item.chineseName.includes(input) ||
        item.englishName.toLowerCase().includes(input.toLowerCase()) ||
        item.phoneCode.includes(input)
      );
    },
    [language]
  );

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
            <span className="area-code-country-name">
              {language === 'zh-CN' ? item.chineseName : item.englishName}
            </span>
            <span className="area-code-number">{`+${item?.phoneCode}`}</span>
          </Space>
        ),
        value: item.countryCode // phone code maybe duplicated
      })),
    []
  );

  return (
    <ConfigProvider componentSize="large">
      <div>
        <Divider orientation="left">form</Divider>

        <Form
          {...formLayout}
          form={form}
          layout="horizontal"
          requiredMark
          onFinish={(values) => console.log(values)}
          scrollToFirstError={{ behavior: 'smooth', focus: true }}
          variant={variant || 'outlined'}
          labelWrap
          labelAlign="left"
        >
          <Space.Compact>
            <Form.Item name="phoneCode" noStyle initialValue="CN">
              <Select
                popupMatchSelectWidth={false}
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
                onChange={onSelectChangeHandle}
              />
            </Form.Item>
            <Form.Item name="phoneNumber" noStyle>
              <Input />
            </Form.Item>
            <Button type="primary" disabled={!phoneNumber.trim()}>
              Send Code
            </Button>
          </Space.Compact>

          <Form.Item label="Form variant" name="variant">
            <Segmented options={['outlined', 'filled', 'borderless']} />
          </Form.Item>
          <Form.Item
            name="name"
            required
            label="Name very long long label"
            rules={[{ type: 'string', max: 6, message: 'too long', warningOnly: true }]} // warningOnly only show yellow warning , but will not block submit.
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="longgggggggggggggggggggggggggggggggggg"
          >
            <Upload name="logo" action="/upload" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            validateFirst
            rules={[
              { required: true },
              { max: 6, message: 'cant be more than 6' },
              { max: 3, message: 'you can input 2 more numbers' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="checked" required label="Boy" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="password" required label="Password" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            required
            label="Confirm Password"
            dependencies={['password']}
            validateTrigger="onBlur"
            rules={[
              {
                required: true
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The confirm password that you entered do not match!')
                  );
                }
              })
            ]}
          >
            <Input />
          </Form.Item>

          <Space>
            <Button onClick={() => form.scrollToField('name')}>Scroll to Name</Button>

            <Button htmlType="submit" type="primary" disabled={disabled}>
              submit
            </Button>
          </Space>
        </Form>

        <Divider orientation="left">icons</Divider>

        <div>
          <Space>
            <StarFilled style={{ color: 'red' }} />
            <StarOutlined style={{ fontSize: 20, color: 'red' }} spin />
            <StarTwoTone twoToneColor="red" rotate={45} />
          </Space>
        </div>
      </div>
    </ConfigProvider>
  );
}
