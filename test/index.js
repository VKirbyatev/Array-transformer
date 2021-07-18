import { notStrictEqual, strictEqual } from 'assert';

import {
  transformToString,
  isSequent,
  stringifyBlock,
  getBlock,
  validateValue,
} from '../dist/index.cjs';

const arraysError = "Object isn't array or it's undefined or empty";
const nanError = 'Only numbers allowed';

const tests = [
  [4],
  [4, 5],
  [1, 2, 3, 4, 7, 8, 9, 12, 14, 55, 56, 57, 90],
  [4, 5, 7, 8],
  [3, 4, 5, 's', 7, 9],
  [5, 6, NaN, 8, 9],
];

describe('Array transform to string tests', () => {
  it('Sequent value should return true', () => {
    strictEqual(isSequent(4, 5), true);
  });
  it('Not sequent value should return false', () => {
    strictEqual(isSequent(5, 8), false);
  });
  it('Not a number value should return false', () => {
    strictEqual(validateValue('foobar'), false);
  });
  it('Number value should return true', () => {
    strictEqual(validateValue(1), true);
  });
  it('From and to should be equal to 10', () => {
    const block = getBlock(null, 10);
    strictEqual(block.to, 10);
    strictEqual(block.from, 10);
  });
  it('Block should be sequent', () => {
    const currBlock = { from: 3, to: 5 };
    const block = getBlock(currBlock, 6);
    strictEqual(block.to, 6);
    strictEqual(block.from, 3);
    strictEqual(currBlock, block);
  });
  it("Block shouldn't be sequent", () => {
    const currBlock = { from: 3, to: 5 };
    const block = getBlock(currBlock, 10);
    strictEqual(block.to, 10);
    strictEqual(block.from, 10);
    notStrictEqual(currBlock, block);
  });
  it('Should return empty string if block is null', () => {
    strictEqual(stringifyBlock(null), '');
  });
  it('Should return number string if from and to same', () => {
    strictEqual(stringifyBlock({ from: 10, to: 10 }), '10');
  });
  it('Should return 10-15 string if from and to is sequent', () => {
    strictEqual(stringifyBlock({ from: 10, to: 15 }), '10-15');
  });
  it('Should return 10,11 string if from and to differ by 1', () => {
    strictEqual(stringifyBlock({ from: 10, to: 11 }), '10,11');
  });
  it(`Should throw error: "${arraysError} if function param is undefined"`, async () => {
    try {
      await transformToString(undefined);
    } catch (error) {
      strictEqual(error.message, arraysError);
    }
  });

  it(`Should throw error: "${arraysError} if array is empty"`, async () => {
    try {
      await transformToString([]);
    } catch (error) {
      strictEqual(error.message, arraysError);
    }
  });

  it(`Should throw error: "${arraysError} if function param isn't array"`, async () => {
    try {
      await transformToString(0);
    } catch (error) {
      strictEqual(error.message, arraysError);
    }
  });

  it(`Should throw error: "${nanError} if array's element is string"`, async () => {
    try {
      await transformToString(tests[4]);
    } catch (error) {
      strictEqual(error.message, nanError);
    }
  });

  it(`Should throw error: "${nanError} if array's element is NaN"`, async () => {
    try {
      await transformToString(tests[5]);
    } catch (error) {
      strictEqual(error.message, nanError);
    }
  });

  it(`Should transform ${JSON.stringify(tests[0])} -> "4"`, async () => {
    const result = await transformToString(tests[0]);
    strictEqual(result, '4');
  });

  it(`Should transform ${JSON.stringify(tests[1])} -> "4,5"`, async () => {
    const result = await transformToString(tests[1]);
    strictEqual(result, '4,5');
  });

  it(`Should transform ${JSON.stringify(tests[2])} -> "1-4,7-9,12,14,55-57,90"`, async () => {
    const result = await transformToString(tests[2]);
    strictEqual(result, '1-4,7-9,12,14,55-57,90');
  });

  it(`Should transform ${JSON.stringify(tests[3])} -> "4,5,7,8"`, async () => {
    const result = await transformToString(tests[3]);
    strictEqual(result, '4,5,7,8');
  });
});
