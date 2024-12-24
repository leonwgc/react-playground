import React from 'react';
import { useRequest, useAntdTable } from 'ahooks';
import { Button, Divider, Skeleton, Space, Table } from 'antd';

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

const getTableData = ({ current, pageSize }) => {
  const query = `page=${current}&size=${pageSize}`;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: 100,
        list: [
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
        ]
      });
    }, 300);
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

  const { tableProps } = useAntdTable(getTableData);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id'
    },
    {
      title: 'name',
      dataIndex: 'name'
    },
    {
      title: 'age',
      dataIndex: 'age'
    }
  ];

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
            <div>{item.name}</div>
          ))}
        </div>
      ) : (
        <Skeleton />
      )}

      <Divider orientation="left">table</Divider>

      <Table columns={columns} rowKey="id" {...tableProps} />
    </div>
  );
};