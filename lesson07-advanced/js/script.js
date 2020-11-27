'use strict';

let arr = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

// Вывести на экран все дни недели
// Каждый из них с новой строчки
// Выходные дни - курсивом
// Текущий день - жирным шрифтом(использовать объект даты)
let date = new Date();
let n = date.getDay();

arr.forEach(function(element){
  if (element === arr[n]) {
    console.log(element, '!');
  }
  if (element === 'Суббота' || element === 'Воскресенье') {
    console.log(element, '?');
  }
    console.log(element);
});