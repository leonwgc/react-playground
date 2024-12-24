import React from 'react';
import { useRequest } from 'ahooks';
import { Button, Divider, Skeleton, Space } from 'antd';

const getUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'wgc',
          age: 18
        },
        {
          id: 2,
          name: 'giantfish',
          age: 19
        },
        {
          id: 3,
          name: 'leon',
          age: 20
        }
      ]);
    }, 500);
  });
};

export default () => {
  const { loading, error, data, run, params, refresh, mutate, cancel } = useRequest(getUsers, {
    manual: true,
    onBefore: (params) => {
      console.log('before', JSON.stringify(params));
    },
    onSuccess: (data, params) => {
      console.log('success', JSON.stringify(data), JSON.stringify(params));
    },
    onError: (error, params) => {
      console.log('error', JSON.stringify(error), JSON.stringify(params));
    },
    onFinally: (params) => {
      console.log('finally', JSON.stringify(params));
    }
  });

  return (
    <div>
      <Divider orientation="left">data list</Divider>
      <Space>
        <Button
          type="primary"
          block
          onClick={() => {
            run(123);
          }}
        >
          run
        </Button>
        <Button onClick={cancel}>cancel</Button>
      </Space>

      {!loading ? (
        <div>
          {data?.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};
