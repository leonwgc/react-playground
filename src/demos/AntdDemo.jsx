import React, { useEffect } from 'react';
import { Button, Divider, Row, Col, Form, Switch, Input, Space, Upload } from 'antd';
import { StarOutlined, StarFilled, StarTwoTone, UploadOutlined } from '@ant-design/icons';

const normFile = (e) => {
  console.log('Upload event:', e);
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

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setDisabled(false))
      .catch(() => setDisabled(true));
  }, [form, values]);

  return (
    <div>
      <Divider orientation="left">row col</Divider>
      <Row gutter={16}>
        <Col span={8} style={{ background: '#ccc' }}>
          col1
        </Col>
      </Row>
      <Row gutter={16}>
        <Col offset={8} span={8} style={{ background: '#999' }}>
          col2
        </Col>
      </Row>
      <Row gutter={16}>
        <Col offset={16} span={8} style={{ background: '#333', color: '#fff' }}>
          col3
        </Col>
      </Row>
      <Divider orientation="left">form</Divider>

      <Form
        {...formLayout}
        form={form}
        layout="vertical"
        requiredMark
        onFinish={(values) => console.log(values)}
        scrollToFirstError={{ behavior: 'smooth', focus: true }}
      >
        <Form.Item
          name="name"
          required
          label="Name"
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
  );
}
