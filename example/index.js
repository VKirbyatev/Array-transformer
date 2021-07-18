const { transformToString } = require('@kirbiatev/array-transformer');

const tests = [
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 3, 4, 5, 6, 7, 8],
  [1, 3, 4, 5, 6, 7, 8, 10, 11, 12],
  [1, 2, 3],
  [1, 2],
  [1, 2, 4],
  [1, 2, 4, 5, 6],
  [1, 2, 3, 7, 8, 9, 15, 17, 19, 20, 21],
  [1, 2, 3, 4, 5, 6, 100, 1091, 1999, 2000, 2001, 2002],
  [1],
  [1, 3, 5, 7, 9, 11],
];

tests.forEach(async (element) => {
  const result = await transformToString(element);
  const stringifiedArray = JSON.stringify(element);

  console.log(`${stringifiedArray} -> ${result}`);
});
