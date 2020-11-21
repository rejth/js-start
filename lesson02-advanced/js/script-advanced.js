'use strict';

// Step 1
let num = 266219;
console.log('Step 1. num: ', num);

// Step 2. Approach 1
let numbers = String(num).split('').map(i => Number(i));
console.log('Step 2. Approach 1: ', numbers);

// Step 2. Approach 2
let splitNum = function (number) {
  let arr = [];
  let numberStr = number.toString();
  for (let i = 0; i < numberStr.length; i++) {
    arr.push(Number(numberStr[i]));
  }
  return arr;
};
console.log('Step 2. Approach 2: ', splitNum(num));

// Step 2
let resultOfMultiplication = numbers.reduce(function(accumulator, currentValue) {
    return accumulator * currentValue;
});
console.log('Step 2. Result of multiplication of numbers: ', resultOfMultiplication);

// Step 3
let resultPow = resultOfMultiplication **= 3;
console.log('Step 3. resultPow: ', resultPow);

// Step 4
console.log(Number(String(resultPow).slice(0, 2)));