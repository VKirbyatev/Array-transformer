'use strict';

/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

const validateValue = (symbol) => !Number.isNaN(Number(symbol));

const isSequent = (c, n) => ++c === n;

const getBlock = (currentBlock, value) => {
  if (!currentBlock) {
    return {
      from: value,
      to: value,
    };
  }

  if (isSequent(currentBlock.to, value)) {
    currentBlock.to = value;
    return currentBlock;
  }

  return {
    from: value,
    to: value,
  };
};

const stringifyBlock = (block) => {
  if (!block) {
    return '';
  }

  const { from, to } = block;

  if (from === to) {
    return `${to}`;
  }

  if (from + 1 === to) {
    return `${from},${to}`;
  }

  return `${from}-${to}`;
};

const stringifyArray = (inputArray) => {
  const lng = inputArray.length;

  if (lng === 0) {
    return '';
  }

  if (lng === 1) {
    return `${inputArray[0]}`;
  }

  let currBlock = null;
  const serializedBlocks = [];

  inputArray.forEach((value, index) => {
    if (!validateValue(value)) {
      throw Error('Only numbers allowed');
    }

    const nextBlock = getBlock(currBlock, value);
    if (currBlock && currBlock !== nextBlock) {
      serializedBlocks.push(stringifyBlock(currBlock));
    }

    if (index < lng - 1) {
      currBlock = nextBlock;
    } else {
      serializedBlocks.push(stringifyBlock(nextBlock));
    }
  });

  return serializedBlocks.join(',');
};

const transformToString = (array) =>
  new Promise((resolve, reject) => {
    if (array && Array.isArray(array) && array.length) {
      resolve(stringifyArray(array));
    } else {
      reject(new Error("Object isn't array or it's undefined or empty"));
    }
  });

exports.getBlock = getBlock;
exports.isSequent = isSequent;
exports.stringifyBlock = stringifyBlock;
exports.transformToString = transformToString;
exports.validateValue = validateValue;
//# sourceMappingURL=index.cjs.map
