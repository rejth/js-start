'use strict';

// Цель
let mission = 2500000;

// Доход
let money = parseFloat(prompt('Ваш месячный доход?'));

// Возможные расходы в виде массива
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').split(',');

// Депозит
let deposit = confirm('Есть ли у вас депозит в банке?');

// Обязательные расходы
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = parseFloat(prompt('Во сколько это обойдется?'));
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = parseFloat(prompt('Во сколько это обойдется?'));

// Тип введенных данных
function showTypeOf(data) {
  console.log(data, typeof(data));
}
showTypeOf(mission);
showTypeOf(money);
showTypeOf(addExpenses);
showTypeOf(deposit);
showTypeOf(amount1);
showTypeOf(amount2);

console.log('Обязательные расходы: ', addExpenses);

// Расходы за месяц
function getExpensesMonth() {
  return amount1 + amount2;
}
console.log('Расходы за месяц: ', getExpensesMonth());

// Накопления за месяц
function getAccumulatedMonth() {
  return Math.ceil(money - getExpensesMonth());
}
let accumulatedMonth = getAccumulatedMonth();

// Cрок достижения цели в месяцах
function getTargetMonth() {
  return mission / accumulatedMonth;
}
console.log('Срок достижения цели: ', getTargetMonth(), ' месяцев');

// Бюджет на день
let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);

// вызов функции getStatusIncome
function getStatusIncome() {
  if (budgetDay >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    return'У вас средний уровень дохода';
  } else if (budgetDay < 600 && budgetDay >= 0) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else if (budgetDay < 0) {
    return'Что то пошло не так';
  }
}
// Вызов функции getStatusIncome
console.log('getStatusIncome(): ', getStatusIncome());
