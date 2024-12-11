import React from 'react';
import { Button, message, Space, Divider } from 'antd';
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';

export default function AntdDemos() {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div>
      <Space size={32}>
        <Button
          type="primary"
          onClick={() => {
            message.open({
              type: 'success',
              content: 'success',
              duration: 2
            });
          }}
        >
          message
        </Button>

        {contextHolder}

        <Button
          type="primary"
          onClick={() => {
            messageApi.error('use messsage error ');
            // message.error('bad luck');
          }}
        >
          message error
        </Button>
      </Space>

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
