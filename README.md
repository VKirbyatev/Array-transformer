# array-transformer

## Description

Node.js developer test task project

## Usage

- run `npm install @kirbiatev/array-transformer`
- import `transformToString` function from module

## Tests

- run `npm test` script

## Example of usage

Please check [example project](https://github.com/VKirbyatev/array-transformer/tree/master/example)

```
import { transformToString } from '@kirbiatev/array-transformer';

transformToString([1,2,3,4,5]).then((result) => {
  console.log(result); // result should be '1-5'
});
```
