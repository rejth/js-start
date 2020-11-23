// Task 1
let lang = prompt();

// через if
if (lang === 'ru') {
  console.log('Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье');
} else if (lang === 'en') {
  console.log('Monday', 'Tuesday', 'Wensday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
}

// через switch-case
switch(lang) {
  case 'ru':
    console.log('Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье');
    break;
  case 'en':
    console.log('Monday', 'Tuesday', 'Wensday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
}

// Через многомерный массив без ифов и switch
let arr = [];
arr.ru = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
arr.en = ['Monday', 'Tuesday', 'Wensday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
lang === 'ru' ? console.log(arr.ru) : lang === 'en' ? console.log(arr.en) : console.log('foo');

// Task 2
let namePerson = prompt();
namePerson === 'Артем' ? console.log('директор'): namePerson === 'Максим' ? console.log('преподаватель') : console.log('студент');