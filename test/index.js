import { notStrictEqual, strictEqual } from 'assert';

import { transformToString, isSequent, stringifyBlock, getBlock } from '../dist/index.cjs';

const expectedError = "Object isn't array or it's undefined or empty";

const a1 = [4];
const a2 = [4, 5];
const a3 = [1, 2, 3, 4, 7, 8, 9, 12, 14, 55, 56, 57, 90];
const a4 = [4, 5, 7, 8];

describe('Array transform to string tests', () => {
  it('Sequent value should return true', () => {
    strictEqual(isSequent(4, 5), true);
  });
  it('Not sequent value should return false', () => {
    strictEqual(isSequent(5, 8), false);
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
  it(`Should throw error: "${expectedError}"`, async () => {
    try {
      await transformToString(undefined);
    } catch (error) {
      strictEqual(error.message, expectedError);
    }
  });

  it(`Should throw error: "${expectedError}"`, async () => {
    try {
      await transformToString([]);
    } catch (error) {
      strictEqual(error.message, expectedError);
    }
  });

  it(`Should transform ${JSON.stringify(a1)} -> "4"`, async () => {
    const result = await transformToString(a1);
    strictEqual(result, '4');
  });

  it(`Should transform ${JSON.stringify(a2)} -> "4,5"`, async () => {
    const result = await transformToString(a2);
    strictEqual(result, '4,5');
  });

  it(`Should transform ${JSON.stringify(a3)} -> "1-4,7-9,12,14,55-57,90"`, async () => {
    const result = await transformToString(a3);
    strictEqual(result, '1-4,7-9,12,14,55-57,90');
  });

  it(`Should transform ${JSON.stringify(a4)} -> "4,5,7,8"`, async () => {
    const result = await transformToString(a4);
    strictEqual(result, '4,5,7,8');
  });
});
