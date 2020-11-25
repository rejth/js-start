'use strict';

// Проверка на ввод числа
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Показать тип введенных данных
function showTypeOf(data) {
  console.log(data, typeof(data));
}

// Доход, цель, расходы и депозит
let money,
    mission = 2500000,
    addExpenses = prompt('Перечислите возможные расходы за месяц через запятую').toLowerCase().split(','),
    deposit = confirm('Есть ли у вас депозит в банке?')

let start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
  return parseFloat(money);
};
start();

// Тип введенных данных
showTypeOf(mission);
showTypeOf(money);
showTypeOf(addExpenses);
showTypeOf(deposit);

console.log('Возможные расходы за месяц: ', addExpenses);

// Обязательные расходы за месяц
let expenses = [];

let getExpensesMonth = function() {
  let amount, sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов').toLowerCase();
    amount = prompt('Во сколько это обойдется?');
    while(!isNumber(amount)) {
      amount = prompt('Во сколько это обойдется?');
    }
    sum += parseFloat(amount);
  }

  console.log('Обязательные расходы за месяц: ', expenses);
  return sum;
}

let expensesAmount = getExpensesMonth();

console.log('Сумма обязательных расходов за месяц: ', expensesAmount);

// Накопления за месяц
function getAccumulatedMonth() {
  return Math.ceil(money - expensesAmount);
}
let accumulatedMonth = getAccumulatedMonth();

// Cрок достижения цели в месяцах
function getTargetMonth() {
  let period = mission / accumulatedMonth;
  if (period > 0) {
    console.log('Цель будет достигнута');
    console.log('Срок достижения цели: ', period, ' месяцев');
  } else {
    console.log('Цель не будет достигнута');
  }
  return period;
}
getTargetMonth();

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
