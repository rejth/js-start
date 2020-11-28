'use strict';

let week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

let options = {weekday: 'long'};
let currentDate = new Date();
let weekDay = new Intl.DateTimeFormat('ru-RU', options).format(currentDate);

for (let element of week) {
  if ((element === weekDay) && (element === 'суббота' || element === 'воскресенье')) {
    document.write('<br>' + '<strong>' + '<i>' + element + '</i>' + '</strong>');
  } else if (element === weekDay) {
    document.write('<br>' + '<strong>' + element + '</strong>');
  } else if (element === 'суббота' || element === 'воскресенье') {
    document.write('<br>' + '<i>' + element + '</i>');
  } else {
    document.write('<br>' + element);
  }
}