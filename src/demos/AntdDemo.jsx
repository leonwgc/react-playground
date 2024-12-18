import React, { useEffect } from 'react';
import { Button, message, Space, Divider, Row, Col, Form, Switch, Input, InputNumber } from 'antd';
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import { set } from 'lodash';

export default function AntdDemos() {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = React.useState(false);

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

      <Form form={form} layout="vertical" requiredMark onFinish={(values) => console.log(values)}>
        <Form.Item
          name="name"
          required
          label="Name"
          rules={[{ type: 'string', max: 6, message: 'too long', warningOnly: false }]}
        >
          <Input />
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
        <Button htmlType="submit" type="primary" disabled={disabled}>
          submit
        </Button>
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
