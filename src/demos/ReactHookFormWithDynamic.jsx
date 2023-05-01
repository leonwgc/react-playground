import React, { useEffect, useState } from 'react';
import { Button, Input, styled, useMount, Space, Icon, useUpdateEffect } from 'react-uni-comps';
import MaterialTextField from 'alcedo-ui/MaterialTextField';
import CircularLoading from 'alcedo-ui/CircularLoading';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

const ErrorMsg = styled.div`
  color: red;
`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const {
    control,
    register,
    reset,
    getValues,
    watch,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      tels: ['11', '22'],
      name: ''
    },
    mode: 'all'
  });
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: 'tels'
  });

  const watchedTels = watch('tels');

  useUpdateEffect(() => {
    console.log(watchedTels);
  }, [watchedTels]);

  useMount(() => {
    setTimeout(() => {
      setLoading(false);
      reset({
        name: 'wgc',
        tels: ['15901634301']
      });
    }, 1000);
  });

  return (
    <div>
      {loading && <CircularLoading size={CircularLoading.Size.LARGE} />}
      {fields.map((field, index, ar) => (
        <div key={field.id}>
          <Space>
            <Controller
              name={`tels[${index}]`}
              control={control}
              rules={{
                required: 'required',
                pattern: {
                  value: /\d+/,
                  message: 'not a valid tel'
                }
              }}
              render={({ field }) => (
                <MaterialTextField
                  key={field.id}
                  {...field}
                  value={watchedTels[index]} // wanna change to controlled , but not work
                  placeholder="input your tel"
                />
              )}
            />
            <Button onClick={() => remove(index)}>
              <Icon type="icon-delete" />
            </Button>
            {index < ar.length - 1 && (
              <Button onClick={() => swap(index, index + 1)}>
                <Icon type="icon-down" />
              </Button>
            )}
            {index > 0 && (
              <Button onClick={() => swap(index, index - 1)}>
                <Icon type="icon-up" />
              </Button>
            )}
          </Space>
        </div>
      ))}
      <div style={{ marginTop: 16 }}>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'must have value' }}
          render={({ field }) => <Input {...field} />}
        />
        <ErrorMsg>{errors?.name?.message}</ErrorMsg>
      </div>
      <Space style={{ marginTop: 16 }}>
        <Button type="primary" onClick={() => append()}>
          +
        </Button>
        <Button type="default" disabled={!isValid} onClick={() => console.log(getValues())}>
          Save
        </Button>
      </Space>

      {/* <DevTool control={control} /> */}
    </div>
  );
}
