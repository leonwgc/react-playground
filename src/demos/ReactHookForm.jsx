import React from 'react';
import {
  Button,
  Input,
  styled,
  useMount,
  Space,
  Divider,
} from 'react-uni-comps';
import MaterialTextField from 'alcedo-ui/MaterialTextField';
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

const ErrorMsg = styled.div`
  color: red;
`;

const defaultValues = {
  name: 'wgc',
  color: 'red',
  gender: 'male',
  age: null,
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
    setValue,
    trigger,
    getValues,
  } = useForm({ defaultValues, mode: 'all' });

  useMount(() => {
    setTimeout(() => {
      //   resetField('name', { defaultValue: 'leonwgc' }); // simulate ajax call to update a field
      reset({
        name: 'leonwgc',
        gender: 'female',
        color: 'blue',
      }); // reset whole form state
    }, 500);
  });

  // 返回 {name,onBlur,onChange, ref}
  register('age', {
    validate: value => Number(value) > 8 || 'age must be greater than 8',
  });

  return (
    <div>
      {/* TODO: devtool  */}
      <DevTool control={control} />
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
            <Input {...field} placeholder="wgc will render color input" />
          )}
        />
        <ErrorMsg>{errors?.name?.message}</ErrorMsg>
      </div>

      {watch('name') === 'wgc' && (
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
          <option value="unknown">please select</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <ErrorMsg>{errors?.gender?.message}</ErrorMsg>
      </div>

      <div>
        <Space>
          <label>age</label>
          <Input
            placeholder="大于8的数"
            value={watch('age') || ''} // 有无似乎无所谓，看情况
            onChange={v => {
              setValue('age', v);
              trigger('age');
            }}
            onBlur={() => trigger('age')}
          />
          <ErrorMsg>{errors.age?.message}</ErrorMsg>
        </Space>
      </div>

      <Button style={{ marginTop: 20 }} onClick={() => reset()}>
        Reset All
      </Button>

      <Button style={{ marginTop: 20 }} onClick={() => resetField('name')}>
        Reset name
      </Button>

      <Divider>
        <h3>values</h3>
      </Divider>

      <div>watch: {JSON.stringify(watch())}</div>
      <div>getValues {JSON.stringify(getValues())}</div>

      <Divider>
        <h3>errors</h3>
        <div>{JSON.stringify(errors)}</div>
      </Divider>

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
