'use strict';

const calcButton = document.querySelector('#start');
console.log('calcButton: ', calcButton);

const incomePlus = document.querySelector('.income_add');
console.log('incomePlus: ', incomePlus);
const expensesPlus = document.querySelector('.expenses_add');
console.log('expensesPlus: ', expensesPlus);

const checkbox = document.querySelector('#deposit-check');
console.log('checkbox: ', checkbox);

const income1 = document.querySelectorAll('.additional_income-item')[0];
console.log('income1: ', income1);
const income2 = document.querySelectorAll('.additional_income-item')[1];
console.log('income2: ', income2);

const budgetMonth = document.querySelector('.budget_month-value');
console.log('budgetMonth: ', budgetMonth);

const budgetDay = document.querySelector('.budget_day-value');
console.log('budgetDay: ', budgetDay);

const expensesMonth = document.querySelector('.expenses_month-value');
console.log('expensesMonth: ', expensesMonth);

const additionalIncome = document.querySelector('.additional_income-value');
console.log('additionalIncome: ', additionalIncome);

const additionalExpenses = document.querySelector('.additional_expenses-value');
console.log('additionalExpenses: ', additionalExpenses);

const incomePeriod = document.querySelector('.income_period-value');
console.log('incomePeriod: ', incomePeriod);

const targetMonth = document.querySelector('.target_month-value');
console.log('targetMonth: ', targetMonth);

const inputs = document.querySelectorAll('.data input');
console.log('inputs : ', inputs );

const salaryAmount = inputs[0];
console.log('salaryAmount: ', salaryAmount);

const incomeTitle = inputs[1];
console.log('incomeTitle: ', incomeTitle);

const incomeAmount = inputs[2];
console.log('incomeAmount: ', incomeAmount);

const additionalIncomeItem1 = inputs[3];
console.log('additionalIncomeItem1: ', additionalIncomeItem1);

const additionalIncomeItem2 = inputs[4];
console.log('additionalIncomeItem2: ', additionalIncomeItem2);

const expensesTitle = inputs[5];
console.log('expensesTitle: ', expensesTitle);

let expensesItems = document.querySelectorAll('.expenses-items');
console.log('expensesItems: ', expensesItems);

const expensesAmount = inputs[6];
console.log('expensesAmount: ', expensesAmount);

const additionalExpensesItem = inputs[7];
console.log('additionalExpensesItem : ', additionalExpensesItem);

const depositCheck = inputs[8];
console.log('depositCheck: ', depositCheck);

const depositAmount = inputs[9];
console.log('depositAmount : ', depositAmount );

const depositPercent = inputs[10];
console.log('depositPercent: ', depositPercent);

const targetAmount = inputs[11];
console.log('targetAmount: ', targetAmount);

const periodSelect = inputs[12];
console.log('periodSelect : ', periodSelect );

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

let appData = {
    mission: 2500000,
    period: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    income: {},
    addIncome: [],
    addExpenses: [],
    budget: 0,
    expenses: {},
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function() {
      if (salaryAmount.value === '') {
        alert('Ошибка! Поле "Месячный доход" должно быть заполнено');
        return;
      }
      appData.budget = salaryAmount.value;
      appData.getExpenses();

      appData.getExpensesMonth();
      appData.getBudget();

      appData.getAddExpenses();

      appData.showResult();
    },

    showResult: function() {
      budgetMonth.value = appData.budgetMonth;
      budgetDay.value = appData.budgetDay;
      expensesMonth.value = appData.expensesMonth;
      additionalExpenses.value = appData.addExpenses.join(', ');
    },

    addExpensesBlock: function() {
      let clonedExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(clonedExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
      }
    },

    getExpenses: function() {
      expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        console.log('itemExpenses: ', itemExpenses);
        let cashExpenses = item.querySelector('.expenses-amount').value;
        console.log('cashExpenses: ', cashExpenses);
        if (itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = +cashExpenses;
        }
      });
    },

    getAddExpenses: function() {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
          appData.addExpenses.push(item);
        }
      });
    },

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

calcButton.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);



// appData.asking();

// console.log('Дополнительный источник зароботка: ', appData.income);

// appData.getInfoDeposit();
// console.log('Информация о депозите: ', appData.moneyDeposit, appData.percentDeposit);

// console.log('Возможные расходы за месяц (массив): ', appData.addExpenses);
// console.log('Возможные расходы за месяц (строка): ', appData.addExpenses.map((item) => {
//   return item.charAt(0).toLocaleUpperCase('RU') + item.slice(1);
// }).join(', '));

// // Сумма обязательных расходов за месяц
// console.log('Сумма обязательных расходов за месяц: ', appData.getExpensesMonth());

// // Cрок достижения цели в месяцах
// appData.getBudget();
// appData.getTargetMonth();
// console.log('Срок достижения цели: ', appData.period, ' месяцев');

// appData.calcSavedMoney();
// console.log('Накопленная сумма за период: ', appData.calcSavedMoney());

// // Уровень дохода
// console.log('Уровень дохода: ', appData.getStatusIncome());

// console.log('Наша программа включает в себя данные: ');
// for (let key in appData) {
//   console.log(key, appData[key]);
// }
