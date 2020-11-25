'use strict';

let arr = ['34542', '23423', '34234', '4545322', '9848832', '3467783', '15274782'];

// Task 1
for (let i = 0; i < arr.length; i++) {
  if (arr[i][0] === '2' || arr[i][0] === '4') {
    console.log(arr[i]);
  }
}

// Task 2
let n = 100;
for (let i = 2; i <= n; i++) {
  for (let j = 2; j < i; j++) {
    if (i % j === 0) {
      break;
    }
    if (i - j === 1) {
      console.log(i, `- Делители этого числа: 1 и ${i}`);
    }
  }
}