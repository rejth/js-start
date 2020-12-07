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

function getNoun(number, wordOne, wordTwo, wordThree) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return wordThree;
    }
    n %= 10;
    if (n === 1) {
      return wordOne;
    }
    if (n >= 2 && n <= 4) {
      return wordTwo;
    }
    return wordThree;
}

function currentDateToFirstFormat(currentDateFormat, hours, minutes, seconds) {
   // Вторник
  currentDateFormat[0] = currentDateFormat[0].charAt(0).toLocaleUpperCase('RU') + currentDateFormat[0].slice(1);
   // 4 февраля 2020
  currentDateFormat[1] = currentDateFormat[1].slice(0, -3);

  hours = (hours + getNoun(hours, ' час', ' часа', ' часов')).toString(); // 21 час
  minutes = (minutes + getNoun(minutes, ' минута', ' минуты', ' минут')).toString(); // 5 минут
  seconds = (seconds + getNoun(seconds, ' секунда', ' секунды', ' секунд')).toString(); // 33 секунды

  // Формат - Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды
  const dateFormatOne = 'Сегодня ' + currentDateFormat[0] + ', ' + currentDateFormat[1] + ' года, ' +
                        hours + ', ' + minutes + ', ' + seconds;

  let taskOne = document.querySelector('.task-1');
  taskOne.textContent = dateFormatOne;
}

function currentDateToSecondFormat(currentDateFormat, day, month, year) {
  if (day < 10) {day = '0' + day;} // 04
  if (month < 10) {month = '0' + month;} // 02

  // Формат - 04.02.2020 - 21:05:33
  const dateFormatTwo = day + '.' + month + '.' + year + ' - ' + currentDateFormat[2];

  let taskTwo = document.querySelector('.task-2');
  taskTwo.textContent = dateFormatTwo;
}

const render = function() {
  const currentDate = new Date();
  const currentDateFormat = currentDate.toLocaleString("ru", options).split(', ');
  let day = currentDate.getDate(),
      month = currentDate.getMonth() + 1,
      year = currentDate.getFullYear(),
      hours = currentDate.getHours(),
      minutes = currentDate.getMinutes(),
      seconds = currentDate.getSeconds();

  currentDateToFirstFormat(currentDateFormat, hours, minutes, seconds);
  currentDateToSecondFormat(currentDateFormat, day, month, year);
};

setInterval(function() {
  render();
}, 1000);