import React from 'react';
import { Button, styled, Space } from 'react-uni-comps';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '~/redux/reducers/counter';

const StyledDiv = styled.div`
  font-size: 30px;
  color: red;
`;

export default function App() {
  const { value } = useSelector(state => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <StyledDiv>{value}</StyledDiv>

      <Space style={{ marginTop: 20 }}>
        <Button
          type="primary"
          onClick={() => {
            dispatch(increment());
          }}
        >
          Increment
        </Button>
        <Button
          type="primary"
          onClick={() => {
            dispatch(decrement());
          }}
        >
          Decrement
        </Button>

        <Button
          type="primary"
          onClick={() => {
            dispatch(reset());
          }}
        >
          Reset
        </Button>
      </Space>
    </div>
  );
}
