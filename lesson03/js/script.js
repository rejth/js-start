'use strict';

let mission = 2500000;
console.log('Цель заработать : ', mission, ' рублей', typeof mission);

let money = parseFloat(prompt('Ваш месячный доход?'));
console.log('money : ', money, typeof money);

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').split(',');
console.log('addExpenses : ', addExpenses, typeof addExpenses);

let deposit = Boolean(prompt('Есть ли у вас депозит в банке?'));
console.log('deposit : ', typeof deposit);

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = parseFloat(prompt('Во сколько это обойдется?'));
console.log('amount1 : ', amount1, typeof amount1);

let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = parseFloat(prompt('Во сколько это обойдется?'));
console.log('amount2 : ', amount2,  typeof amount2);

let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц : ', budgetMonth);

let period = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута за : ', period, ' месяцев');

let budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день : ', budgetDay);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay >= 0) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
  console.log('Что то пошло не так');
}