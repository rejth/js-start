'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const start = function() {
      do {
        money = prompt('Ваш месячный доход?', 100000);
      } while (!isNumber(money));
      return +money;
    };
start();

let appData = {
    mission: 2500000,
    period: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    income: {},
    addIncome: [],
    addExpenses: [],
    budget: +money,
    expenses: {},
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
      if (confirm('Есть ли у вас дополнительные источники заработка?')) {
        let cashIncome, itemIncome;
        do {
          itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс').toLowerCase();
        } while (isNumber(itemIncome));
        do {
          cashIncome = prompt('Сколько в месяц вы зарабатываете на этом?', 15000);
        } while (!isNumber(cashIncome));
        appData.income[itemIncome] = +cashIncome;
      }

      appData.deposit = confirm('Есть ли у вас депозит в банке?');

      let addExpenses;
      do {
        addExpenses = prompt('Перечислите возможные расходы за месяц через запятую');
      } while (isNumber(addExpenses));
      appData.addExpenses = addExpenses.toLowerCase().split(',');

      let question,
          amount = 0;
      for (let i = 0; i < 2; i++) {
        do {
        question = prompt('Введите обязательную статью расходов', 'Аренда').toLowerCase();
        } while (isNumber(question));
        do {
          amount = prompt('Во сколько это обойдется?', 25000);
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
        console.log('Цель будет достигнута!');
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
    },
    getInfoDeposit: function() {
      if (appData.deposit) {
        do {
          appData.moneyDeposit = +prompt('Какая сумма лежит на депозите?', 500000);
        } while (!isNumber(appData.moneyDeposit));
        do {
          appData.percentDeposit = +prompt('Какой годовой процент?', 10);
        } while (!isNumber(appData.percentDeposit));
      }
    },
    calcSavedMoney: function() {
      return appData.budgetMonth * appData.period;
    }
};

appData.asking();

console.log('Дополнительный источник зароботка: ', appData.income);

appData.getInfoDeposit();
console.log('Информация о депозите: ', appData.moneyDeposit, appData.percentDeposit);

console.log('Возможные расходы за месяц (массив): ', appData.addExpenses);
console.log('Возможные расходы за месяц (строка): ', appData.addExpenses.map((item) => {
  return item.charAt(0).toLocaleUpperCase('RU') + item.slice(1);
}).join(', '));

// Сумма обязательных расходов за месяц
console.log('Сумма обязательных расходов за месяц: ', appData.getExpensesMonth());

// Cрок достижения цели в месяцах
appData.getBudget();
appData.getTargetMonth();
console.log('Срок достижения цели: ', appData.period, ' месяцев');

appData.calcSavedMoney();
console.log('Накопленная сумма за период: ', appData.calcSavedMoney());

// Уровень дохода
console.log('Уровень дохода: ', appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
  console.log(key, appData[key]);
}
