import React, { useState } from 'react';
import { Button, Input, styled } from 'react-uni-comps';
import MaterialTextField from 'alcedo-ui/MaterialTextField';
import { useForm, Controller } from 'react-hook-form';

const ErrorMsg = styled.div`
  color: red;
`;

const defaultValues = {
  name: 'wgc',
  color: 'red',
};
export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    control,
  } = useForm({ defaultValues, mode: 'all' });

  // for conditional renderer
  const watched = watch();

  return (
    <div>
      <div>
        name:
        <Controller
          name="name"
          control={control}
          rules={{
            required: 'Name is required',
            maxLength: { value: 3, message: 'Name max length is 3' },
          }}
          render={({ field }) => (
            <Input {...field} placeholder="react-uni-comps name" />
          )}
        />
        <ErrorMsg>{errors?.name?.message}</ErrorMsg>
      </div>

      {watched.name === 'wgc' && (
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
