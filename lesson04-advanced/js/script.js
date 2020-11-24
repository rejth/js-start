'use strict';

function replaceString(argument) {
  if (typeof(argument) !== 'string') {
    return 'Введите строку, пожалуйста!';
  } else if (argument.length > 30) {
    return argument.substring(0, 31) + '...';
  } else {
    return argument;
  }
}
