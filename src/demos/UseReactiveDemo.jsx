import React from 'react';
import useReactive from '../hooks/useReactive';

export default () => {
  const state = useReactive({
    count: 0,
    inputVal: '',
    obj: {
      value: ''
    },
    arr: [],
    bug: '',
    bugs: ['feat', 'fix', 'chore'],
    addBug(bug) {
      this.bugs.push(bug);
    },
    get bugsCount() {
      return this.bugs.length;
    }
  });

  return (
    <div>
      <p> state.count：{state.count}</p>

      <button style={{ marginRight: 8 }} onClick={() => state.count++}>
        state.count++
      </button>
      <button onClick={() => state.count--}>state.count--</button>

      <p style={{ marginTop: 20 }}> state.inputVal: {state.inputVal}</p>
      <input onChange={(e) => (state.inputVal = e.target.value)} />

      <p style={{ marginTop: 20 }}> state.obj.value: {state.obj.value}</p>
      <input
        onChange={(e) => {
          state.obj.value = e.target.value;
        }}
      />

      <p style={{ marginTop: 20 }}> state.notExistProp: {state.notExistProp?.value}</p>
      <input
        onChange={(e) => {
          if (!state.notExistProp) {
            state.notExistProp = {};
          }
          state.notExistProp.value = e.target.value;
        }}
      />

      <div>
        <p>
          state.arr: <span role="test-array">{JSON.stringify(state.arr)}</span>
        </p>
        <button
          style={{ marginRight: '10px' }}
          onClick={() => state.arr.push(Math.floor(Math.random() * 100))}
          role="pushbtn"
        >
          push
        </button>
        <button style={{ marginRight: '10px' }} onClick={() => state.arr.pop()} role="popbtn">
          pop
        </button>
        <button style={{ marginRight: '10px' }} onClick={() => state.arr.shift()} role="shiftbtn">
          shift
        </button>
        <button
          style={{ marginRight: '10px' }}
          role="unshiftbtn"
          onClick={() => state.arr.unshift(Math.floor(Math.random() * 100))}
        >
          unshift
        </button>
        <button style={{ marginRight: '10px' }} role="reverse" onClick={() => state.arr.reverse()}>
          reverse
        </button>
        <button style={{ marginRight: '10px' }} role="sort" onClick={() => state.arr.sort()}>
          sort
        </button>
      </div>
      <div>
        <p>state.bugsCount: {state.bugsCount}</p>

        <form
          onSubmit={(e) => {
            state.addBug(state.bug);
            state.bug = '';
            e.preventDefault();
          }}
        >
          <input type="text" value={state.bug} onChange={(e) => (state.bug = e.target.value)} />
          <button type="submit" style={{ marginLeft: '10px' }}>
            Add
          </button>
          <button type="button" style={{ marginLeft: '10px' }} onClick={() => state.bugs.pop()}>
            Delete
          </button>
        </form>

        <br />

        <ul>
          {state.bugs.map((bug) => (
            <li key={bug}>{bug}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
