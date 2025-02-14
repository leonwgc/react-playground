export const langs = [
  { sid: 1, id: 5, code: 'zh_CN', name: 'Chinese' },
  { sid: 2, id: 11, code: 'en', name: 'English' },
  { sid: 3, id: 15, code: 'fr', name: 'French' },
  { sid: 4, id: 16, code: 'de', name: 'German' },
  { sid: 5, id: 24, code: 'it', name: 'Italian' },
  { sid: 6, id: 25, code: 'ja', name: 'Japanese' },
  { sid: 7, id: 36, code: 'pt', name: 'Portuguese' },
  { sid: 8, id: 39, code: 'ru', name: 'Russian' },
  { sid: 9, id: 43, code: 'es', name: 'Spanish' }
];

export const addableTagSelectData = [
  {
    id: 1,
    name: 'Call to Action Phrases',
    children: [
      { id: 1, name: 'Book Now1', type: 2 },
      { id: 2, name: 'Book Now2', type: 2 },
      { id: 3, name: 'Book Now3', type: 2 },
      { id: 4, name: 'Book Now4', type: 2 },
      { id: 5, name: 'Book Now5', type: 2 },
      { id: 6, name: 'Book Now6', type: 2 },
      { id: 7, name: 'Book Now7', type: 2 }
    ]
  },
  {
    id: 2,
    name: 'test actions',
    children: [
      { id: 11, name: 'aaa' },
      { id: 12, name: 'bbbbbb' },
      { id: 13, name: 'cccccc' },
      { id: 15, name: 'ddddd' },
      { id: 16, name: 'Click to Secure Your Stay' },
      { id: 17, name: 'Book a Well-Deserved Vacation' }
    ]
  }
];

export const displayPathSelectData = [
  { id: 1, name: 'Book Now1', type: 2 },
  { id: 2, name: 'Book Now2', type: 2 },
  { id: 3, name: 'Book Now3', type: 2 },
  { id: 4, name: 'Book Now4', type: 2 },
  { id: 5, name: 'Book Now5', type: 2 },
  { id: 6, name: 'Book Now6', type: 2 },
  { id: 7, name: 'Book Now7', type: 2 }
];

const fb = (a) => {
  if (a == 1 || a == 2) {
    return 1;
  }

  return fb(a - 1) + fb(a - 2);
};

// for (let i = 1; i < 15; i++) {
//   console.log(fb(i));
// }
