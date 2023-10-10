/**
 * Get diff info {added:T[],removed:T[],kept:T[]}
 * @param {*} newArray
 * @param {*} oldArray
 * @param {*} eq
 */
export const getDiff = (newArray = [], oldArray = [], eq) => {
  const added = [];
  const removed = [];
  const kept = []; // kept from old

  for (let item of newArray) {
    if (!oldArray.find((oi) => eq(item, oi))) {
      added.push(item);
    }
  }

  for (let item of oldArray) {
    if (!newArray.find((ni) => eq(ni, item))) {
      removed.push(item);
    } else {
      kept.push(item);
    }
  }

  return { added, removed, kept };
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

/**
 * Get string byte length
 * https://ads-help.yahoo-net.jp/s/article/H000044627?language=en_US
 * @param {*} str
 * @returns
 */
export const getStringByteLength = (str) => {
  if (!str || typeof str !== 'string') {
    return 0;
  }
  let byteLength = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode <= 0x7f) {
      byteLength += 1;
    } else {
      byteLength += 2;
    }
  }
  return byteLength;
};
