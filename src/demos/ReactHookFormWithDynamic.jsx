import React, { useEffect } from 'react';
import { Button, Input, styled, useMount, Space, Divider, useUpdateEffect } from 'react-uni-comps';
import MaterialTextField from 'alcedo-ui/MaterialTextField';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

const ErrorMsg = styled.div`
  color: red;
`;

export default function App() {
  const {
    control,
    register,
    getValues,
    watch,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      tels: ['']
    },
    mode: 'all'
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tels'
  });

  const watchedTels = watch('tels');

  useUpdateEffect(() => {
    console.log(watchedTels);
  }, [watchedTels]);

  useMount(() => {
    // add first input
    append('');
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <Space>
            <Controller
              name={`tels[${index}]`}
              control={control}
              rules={{
                required: 'required',
                pattern: {
                  value: /\d{11}/,
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
            <Button onClick={() => remove(index)}>Remove</Button>
          </Space>
        </div>
      ))}
      <div style={{ marginTop: 16 }}>
        <Input {...register('name', { required: 'must have value' })} />
        <ErrorMsg>{errors?.name?.message}</ErrorMsg>
      </div>
      <Space style={{ marginTop: 16 }}>
        <Button type="primary" onClick={() => append('')}>
          Add
        </Button>
        <Button type="primary" disabled={!isValid} onClick={() => console.log(getValues())}>
          Save
        </Button>
      </Space>

      <div>{watchedTels.find((t) => t.value === 'wgc') && 'hello wgc'}</div>
      <DevTool control={control} />
    </div>
  );
}
