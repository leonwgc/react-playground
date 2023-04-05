import React, { useEffect } from 'react';
import { Button, Input, styled, useMount } from 'react-uni-comps';
import MaterialTextField from 'alcedo-ui/MaterialTextField';
import { useForm, Controller } from 'react-hook-form';

const ErrorMsg = styled.div`
  color: red;
`;

const defaultValues = {
  name: 'wgc',
  color: 'red',
  gender: 'male',
};

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    resetField,
    reset,
    control,
  } = useForm({ defaultValues, mode: 'all' });

  // for conditional renderer
  const watched = watch();

  useMount(() => {
    setTimeout(() => {
      //   resetField('name', { defaultValue: 'leonwgc' }); // simulate ajax call to update a field
      reset({
        name: 'leonwgc',
        gender: 'female',
        color: 'blue',
      }); // reset whole form state
    }, 1500);
  });

  return (
    <div>
      <div>
        name:
        <Controller
          name="name"
          control={control}
          rules={{
            required: 'Name is required',
            maxLength: { value: 10, message: 'Name max length is 10' },
          }}
          render={({ field }) => (
            <Input {...field} placeholder="react-uni-comps name" />
          )}
        />
        <ErrorMsg>{errors?.name?.message}</ErrorMsg>
      </div>

      {watched.name === 'leonwgc' && (
        <div>
          <Controller
            name="color"
            control={control}
            rules={{
              required: 'Color is required',
              minLength: {
                value: 3,
                message: 'color should be more than 3 chars',
              },
            }}
            render={({ field }) => (
              <MaterialTextField {...field} placeholder="alcedo color" />
            )}
          />
          <ErrorMsg>{errors?.color?.message}</ErrorMsg>
        </div>
      )}

      <div style={{ margin: '10px 0' }}>
        gender
        <select {...register('gender', { required: 'gender is required' })}>
          <option value="">please select</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <ErrorMsg>{errors?.gender?.message}</ErrorMsg>
      </div>

      <Button style={{ marginTop: 20 }} onClick={() => reset()}>
        Reset All
      </Button>

      <Button style={{ marginTop: 20 }} onClick={() => resetField('name')}>
        Reset name
      </Button>

      <Button
        type="primary"
        style={{ marginTop: 20 }}
        disabled={!isValid}
        onClick={handleSubmit(data => {
          console.log(data);
        })}
      >
        submit
      </Button>
    </div>
  );
}
