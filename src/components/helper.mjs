/**
 * Get diff info {added:T[],removed:T[]}
 * @param {*} newArray
 * @param {*} oldArray
 * @param {*} eq
 */
export const getDiff = (newArray = [], oldArray = [], eq) => {
  const added = [];
  const removed = [];

  for (let item of newArray) {
    if (!oldArray.find((oi) => eq(item, oi))) {
      added.push(item);
    }
  }

  for (let item of oldArray) {
    if (!newArray.find((ni) => eq(ni, item))) {
      removed.push(item);
    }
  }

  return { added, removed };
};

//------------------------ test case-----------------------
const arr1 = [1, 2, 3, 4];

const arr0 = [1, 2, 5];

// { added: [ 3, 4 ], removed: [ 5 ] }
console.log(getDiff(arr1, arr0, (a, b) => a === b));

//------------------------ test case1-----------------------

const nArr = [
  { id: 1, name: 'leon' },
  { id: 2, name: 'wgc' },
  { id: 3, name: 'test' }
];

const oArr = [
  { id: 1, name: 'leon' },
  { id: 4, name: 'giantfish' }
];

// {
//   added: [ { id: 2, name: 'wgc' }, { id: 3, name: 'test' } ],
//   removed: [ { id: 4, name: 'giantfish' } ]
// }

console.log(getDiff(nArr, oArr, (a, b) => a.id === b.id));
