'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const start = function() {
      do {
        money = prompt('Ваш месячный доход?');
      } while (!isNumber(money));
      return parseFloat(money);
    };
start();

let appData = {
    mission: 2500000,
    period: 3,
    deposit: false,
    addIncome: [],
    addExpenses: [],
    budget: money,
    expenses: {},
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
      let addExpenses = prompt('Перечислите возможные расходы за месяц через запятую');
      appData.addExpenses = addExpenses.toLowerCase().split(',');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      let amount = 0;
      for (let i = 0; i < 2; i++) {
        let question = prompt('Введите обязательную статью расходов').toLowerCase();
        do {
          amount = prompt('Во сколько это обойдется?');
        } while (!isNumber(amount));
        appData.expenses[question] = +amount;
      }
    },
    getExpensesMonth: function() {
      for (let item in appData.expenses) {
        appData.expensesMonth += appData.expenses[item];
      }
      return appData.expensesMonth;
    },
    getBudget: function() {
      appData.budgetMonth = Math.ceil(appData.budget - appData.expensesMonth);
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
      appData.period = appData.mission / appData.budgetMonth;
      if (appData.period > 0) {
        console.log('Цель будет достигнута');
      } else {
        console.log('Цель не будет достигнута');
      }
    },
    getStatusIncome: function() {
      if (appData.budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
      } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
        return 'У вас средний уровень дохода';
      } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
      } else if (appData.budgetDay < 0) {
        return 'Что то пошло не так';
      }
    }
};

appData.asking();

// Сумма обязательных расходов за месяц
console.log('Расходы за месяц: ', appData.getExpensesMonth());

// Cрок достижения цели в месяцах
appData.getBudget();
appData.getTargetMonth();
console.log('Срок достижения цели: ', appData.period, ' месяцев');

// Уровень дохода
console.log('Уровень дохода: ', appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(key, appData[key]);
}
