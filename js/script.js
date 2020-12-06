'use strict';

const startButton = document.querySelector('#start'); // кнопка "рассчитать"
      startButton.disabled = true;

const incomePlusButton = document.querySelector('.income_add'), // кнопка "+" доход
      expensesPlusButton = document.querySelector('.expenses_add'), // кнопка "+" расход
      depositCheckboxValue = document.querySelector('#deposit-check'), // чекбокс "депозит"
      possibleIncomeValueOne = document.querySelectorAll('.additional_income-item')[0], // возможный доход 1
      possibleincomeValueTwo = document.querySelectorAll('.additional_income-item')[1], // возможный доход 2
      salaryAmountValue = document.querySelector('.salary-amount'), // месячный доход
      additionalExpensesItemValue = document.querySelector('.additional_expenses-item'), // возможные расходы
      targetAmountValue = document.querySelector('.target-amount'), // цель
      periodSelectValue = document.querySelector('.period-select'), // ползунок "период расчета"
      namePlaceholderInputs = document.querySelectorAll('.data input[placeholder="Наименование"]'),
      digitPlaceholderInputs = document.querySelectorAll('.data input[placeholder="Сумма"]'),
      // Результат расчета
      budgetMonthValue = document.querySelector('.budget_month-value'), // результат - бюджет на месяц
      budgetDayValue = document.querySelector('.budget_day-value'), // результат - бюджет на день
      expensesMonthValue = document.querySelector('.expenses_month-value'), // результат - сумма расходов за месяц
      additionalIncomeValue = document.querySelector('.additional_income-value'), // результат - возможные доходы
      additionalExpensesValue = document.querySelector('.additional_expenses-value'), // результат - возможный расходы
      incomePeriodValue = document.querySelector('.income_period-value'), // результат - накопления за период
      targetMonthValue = document.querySelector('.target_month-value');// результат - срок достижения цели

let incomeItems = document.querySelectorAll('.income-items'), // дополнительные доходы
    expensesItems = document.querySelectorAll('.expenses-items'), // обязательные расходы
    periodAmountValue = document.querySelector('.period-amount'); // период расчета

let appData = {
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,

    start: function() {
      appData.budget = +salaryAmountValue.value;
      appData.getExpenses();
      appData.getIncomes();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getBudget();
      appData.showResult();
    },
    // Показать результаты
    showResult: function() {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      periodSelectValue.addEventListener('input', () => {
        periodAmountValue.textContent = periodSelectValue.value;
        incomePeriodValue.value = appData.calcSavedMoney();
      });
    },
    // Добавить блок с обязательным расходом
    addExpensesBlock: function() {
      const clonedExpensesItem = expensesItems[0].cloneNode(true);
      [...clonedExpensesItem.querySelectorAll('input')].map((item) => item.value = ''); // очистка input
      expensesItems[0].parentNode.insertBefore(clonedExpensesItem, expensesPlusButton);
      // если больше 3-х расходов, скрываем кнопку "+"
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
        expensesPlusButton.style.display = 'none';
      }
    },
    // Добавить блок с дополнительным доходом
    addIncomesBlock: function() {
      const clonedIncomesItem = incomeItems[0].cloneNode(true);
      [...clonedIncomesItem.querySelectorAll('input')].map((item) => item.value = ''); // очистка input
      incomeItems[0].parentNode.insertBefore(clonedIncomesItem, incomePlusButton);
      // если больше 3-х доходов, скрываем кнопку "+"
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3) {
        incomePlusButton.style.display = 'none';
      }
    },
    // Получить сумму обязательных расходов
    getExpenses: function() {
      expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = +cashExpenses;
        }
      });
    },
    // Получить сумму дополнительных доходов
    getIncomes: function() {
      incomeItems.forEach(function(item) {
        let itemIncomes = item.querySelector('.income-title').value;
        let cashIncomes = item.querySelector('.income-amount').value;
        if (itemIncomes !== '' && cashIncomes !== '') {
          appData.income[itemIncomes] = +cashIncomes;
        }
      });
      // Доход за месяц
      for (let key in appData.income) {
        appData.incomeMonth += +appData.income[key];
      }
    },
    // Возможные расходы
    getAddExpenses: function() {
      let addExpenses = additionalExpensesItemValue.value.split(',');
      addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
          appData.addExpenses.push(item);
        }
      });
    },
    // Получить расходы за месяц
    getExpensesMonth: function() {
      for (let item in appData.expenses) {
        appData.expensesMonth += appData.expenses[item];
      }
      return appData.expensesMonth;
    },
    // Получить бюджет на месяц и на день
    getBudget: function() {
      appData.budgetMonth = Math.ceil(appData.budget + appData.incomeMonth - appData.expensesMonth);
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    // Получить срок достижения цели
    getTargetMonth: function() {
      return targetAmountValue.value / appData.budgetMonth;
    },
    // Получить сумму накоплений за период
    calcSavedMoney: function() {
      return appData.budgetMonth * periodSelectValue.value;
    }
};

startButton.addEventListener('click', appData.start);
expensesPlusButton.addEventListener('click', appData.addExpensesBlock);
incomePlusButton.addEventListener('click', appData.addIncomesBlock);
salaryAmountValue.addEventListener('input', () => startButton.disabled = salaryAmountValue.value.trim() === '');

// Валидация форм для ввода цифр
[...digitPlaceholderInputs].forEach((input) => input.addEventListener('input', function() {
  this.value = this.value.replace(/[^\d]/g, '');
}));

// Валидация форм для ввода букв
[...namePlaceholderInputs].forEach((input) => input.addEventListener('input', function() {
  this.value = this.value.replace(/[^А-Яа-яЁё\s\,]|[\d]/g, '');
}));