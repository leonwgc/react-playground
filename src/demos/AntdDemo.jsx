import React from 'react';
import { Button, message, Space } from 'antd';

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
          }}
        >
          message error
        </Button>
      </Space>
    </div>
  );
}
