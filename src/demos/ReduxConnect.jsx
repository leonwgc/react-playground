import React from 'react';
import { Button, styled, Space } from 'react-uni-comps';
import { connect } from 'react-redux';
import { increment, decrement, reset, setAsync } from '~/redux/reducers/counter';

const StyledDiv = styled.div`
  font-size: 30px;
  color: red;
`;

function ReduxToolKit({ increment, decrement, reset, counter, setAsync }) {
  return (
    <div>
      <StyledDiv>{counter.value}</StyledDiv>

      <Space style={{ marginTop: 20 }}>
        <Button type="primary" onClick={increment}>
          Increment
        </Button>
        <Button type="primary" onClick={decrement}>
          Decrement
        </Button>

        <Button type="primary" onClick={reset}>
          Reset
        </Button>

        <Button type="primary" onClick={setAsync}>
          setAsync
        </Button>
      </Space>
    </div>
  );
}
export default connect(state => ({ counter: state.counter }), {
  increment,
  decrement,
  reset,
  setAsync,
})(ReduxToolKit);
