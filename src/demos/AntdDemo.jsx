import React, { useEffect } from 'react';
import {
  Button,
  Divider,
  Form,
  Switch,
  Input,
  Space,
  Upload,
  Segmented,
  ConfigProvider,
  theme
} from 'antd';
import { StarOutlined, StarFilled, StarTwoTone, UploadOutlined } from '@ant-design/icons';
import PhoneNumber from './PhoneNumber';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function AntdDemos() {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = React.useState(false);
  const { token } = theme.useToken();

  useEffect(() => {
    console.log(token.colorPrimary);
  }, []);

  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };
  const values = Form.useWatch([], form);

  const variant = Form.useWatch('variant', form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true }) // 5.5.0 新增。仅校验内容而不会将错误信息展示到 UI 上。
      .then(() => setDisabled(false))
      .catch(() => setDisabled(true));
  }, [form, values]);

  return (
    <ConfigProvider componentSize="large">
      <div>
        <Divider orientation="left">form</Divider>

        <ConfigProvider
          theme={{
            // seed token
            token: { colorPrimary: 'red', fontSize: 30 },
            components: {
              // for each component
              Button: {
                primaryColor: 'green'
              }
            }
          }}
        >
          <Button type="primary">hello</Button>
        </ConfigProvider>

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
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: 'please input phone number.' },
              { max: 11, message: 'too long' }
            ]}
          >
            <PhoneNumber />
          </Form.Item>

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
