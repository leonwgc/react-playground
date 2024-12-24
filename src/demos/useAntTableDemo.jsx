import React from 'react';
import { useRequest, useAntdTable } from 'ahooks';
import { Button, Divider, Skeleton, Space, Table, Form, Input } from 'antd';

const getTableData = ({ current, pageSize }, formData) => {
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
  const [form] = Form.useForm();

  const result = useAntdTable(getTableData, { form, defaultPageSize: 15 });

  // All parameters and returned results of useRequest are applicable to useAntdTable
  const {
    tableProps,
    search: { submit, reset },
    refresh,
    ...rest // useRequest returned parameters
  } = result;

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
      <Form form={form}>
        <Form.Item label="name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="age" name="age">
          <Input />
        </Form.Item>

        <Space style={{ margin: '10px 0' }}>
          <Button type="primary" onClick={submit}>
            Add
          </Button>
          <Button type="secondary" onClick={refresh}>
            refresh
          </Button>
        </Space>
      </Form>

      <Table columns={columns} rowKey="id" {...tableProps} />
    </div>
  );
};
