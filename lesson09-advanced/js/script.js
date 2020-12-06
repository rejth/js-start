'use strict';

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

const addZeroBeforeNumber = function(day, month) {
  if (day < 10) {day = '0' + day;}
  if (month < 10) {month = '0' + month;}
};

const changeStringSpelling = function(hours) {
  if (hours === 1 || hours === 21) {
    hours = hours + ' час';
  } else if ((hours > 2 && hours < 4) || (hours === 22 || hours === 23)) {
    hours = hours + ' часа';
  } else if ((hours > 5 && hours < 20) || hours === 0) {
    hours = hours + ' часов';
  }
};

const calcDateInFormat = function(date, day, month, year, hours, minutes, seconds) {
  addZeroBeforeNumber(day, month);
  changeStringSpelling(hours, minutes, seconds);

  date[0] = date[0].charAt(0).toLocaleUpperCase('RU') + date[0].slice(1); // Вторник
  date[1] = date[1].slice(0, -3); // 4 февраля 2020

  // Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды
  const dateFormatOne = 'Сегодня ' + date[0] + ', ' + date[1] + ' года, ' +
                        hours + ', ' + minutes + ', ' + seconds;

  // 04.02.2020 - 21:05:33
  const dateFormatTwo = day + '.' + month + '.' + year + ' - ' + date[2];

  let taskOne = document.querySelector('.task-1');
  taskOne.textContent = dateFormatOne;

  let taskTwo = document.querySelector('.task-2');
  taskTwo.textContent = dateFormatTwo;
};

setInterval(function() {
  const now = new Date();
  const nowFormat = now.toLocaleString("ru", options).split(', ');
  let day = now.getDate(),
      month = now.getMonth() + 1,
      year = now.getFullYear(),
      hours = now.getHours(),
      minutes = now.getMinutes(),
      seconds = now.getSeconds();
  calcDateInFormat(nowFormat, day, month, year, hours, minutes, seconds);
}, 1000);