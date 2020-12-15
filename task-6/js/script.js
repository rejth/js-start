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

const currentDate = new Date(),
      newYearDate = new Date('31 december 2020'),
      currentDateFormatEn = currentDate.toLocaleString("en-US", options).split(', '),
      currentDateFormatRu = currentDate.toLocaleString("ru", options).split(', '),
      hours = currentDate.getHours();

const hi = document.querySelector('.hi'),
      today = document.querySelector('.today'),
      time = document.querySelector('.time'),
      newYear = document.querySelector('.new-year');


if (hours >= 4 && hours < 12) {
  hi.textContent = 'Доброе утро';
}

if (hours >= 12 && hours < 18) {
  hi.textContent = 'Добрый день';
}

if (hours >= 18 && hours < 23) {
  hi.textContent = 'Добрый вечер';
}

if (hours >= 0 && hours < 4) {
  hi.textContent = 'Доброй ночи';
}

today.textContent = 'Сегодня: ' + currentDateFormatRu[0].charAt(0).toLocaleUpperCase('RU') + currentDateFormatRu[0].slice(1);

time.textContent = 'Текущее время: ' + currentDateFormatEn[3];

newYear.textContent = 'До нового года осталось: ' + Math.ceil(Math.abs(currentDate.getTime() - newYearDate.getTime()) / (1000 * 3600 * 24));