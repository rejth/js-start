'use strict';

const startButton = document.querySelector('#start'); // кнопка "рассчитать"
startButton.disabled = true;
const cancelButton = document.querySelector('#cancel'); // кнопка "сбросить"

const incomePlusButton = document.querySelector('.income_add'), // кнопка "+" доход
      expensesPlusButton = document.querySelector('.expenses_add'), // кнопка "+" расход
      depositCheckboxValue = document.querySelector('#deposit-check'), // чекбокс "депозит"
      possibleIncomeValueOne = document.querySelectorAll('.additional_income-item')[0], // возможный доход 1
      possibleincomeValueTwo = document.querySelectorAll('.additional_income-item')[1], // возможный доход 2
      salaryAmountValue = document.querySelector('.salary-amount'), // месячный доход
      additionalExpensesItemValue = document.querySelector('.additional_expenses-item'), // возможные расходы
      targetAmountValue = document.querySelector('.target-amount'), // цель
      periodSelectValue = document.querySelector('.period-select'), // ползунок "период расчета"
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
    periodAmountValue = document.querySelector('.period-amount'), // период расчета
    namePlaceholderInputs = document.querySelectorAll('.data input[placeholder="Наименование"]'),
    digitPlaceholderInputs = document.querySelectorAll('.data input[placeholder="Сумма"]');

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
    // Начать расчет
    start: function() {
      [...document.querySelectorAll('.data input')].map(item => item.disabled = true); // блокировка всех input
      this.budget = +salaryAmountValue.value;
      this.getExpenses();
      this.getIncomes();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getBudget();
      this.showResult();
      startButton.style.display = 'none';
      cancelButton.style.display = 'block';
    },
    // Сбросить все введенные данные
    reset: function() {
      this.deposit = false;
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
      this.income = {};
      this.incomeMonth = 0;
      this.addIncome = [];
      this.expenses = {};
      this.expensesMonth = 0;
      this.addExpenses = [];
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      // удаление созданных блоков с расходами
      let actualExpensesItemsArray = [...document.querySelectorAll('.expenses-items')];
      actualExpensesItemsArray.filter(item => item !== actualExpensesItemsArray[0]).forEach(item => item.remove());
      // удаление созданных блоков с доходами
      let actualIncomesItemsArray = [...document.querySelectorAll('.income-items')];
      actualIncomesItemsArray.filter(item => item !== actualIncomesItemsArray[0]).forEach(item => item.remove());
      // очистка всех input
      [...document.querySelectorAll('input')].map(item => item.value = '');
      // разблокировка всех input
      [...document.querySelectorAll('.data input')].map(item => item.disabled = false);
      // Сброс ползунка
      periodSelectValue.value = '1';
      cancelButton.style.display = 'none';
      startButton.style.display = 'block';
      startButton.disabled = true;
    },
    // Показать результаты расчета
    showResult: function() {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      targetMonthValue.value = Math.ceil(this.getTargetMonth());
      periodSelectValue.addEventListener('input', () => {
        periodAmountValue.textContent = periodSelectValue.value;
        incomePeriodValue.value = this.calcSavedMoney();
      });
    },
    // Добавить блок с обязательным расходом
    addExpensesBlock: function() {
      const clonedExpensesItem = expensesItems[0].cloneNode(true);
      [...clonedExpensesItem.querySelectorAll('input')].map(item => item.value = ''); // очистка input
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
      [...clonedIncomesItem.querySelectorAll('input')].map(item => item.value = ''); // очистка input
      incomeItems[0].parentNode.insertBefore(clonedIncomesItem, incomePlusButton);
      // если больше 3-х доходов, скрываем кнопку "+"
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3) {
        incomePlusButton.style.display = 'none';
      }
    },
    // Получить сумму обязательных расходов
    getExpenses: function() {
      expensesItems.forEach(item => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
          this.expenses[itemExpenses] = +cashExpenses;
        }
      });
    },
    // Получить сумму дополнительных доходов
    getIncomes: function() {
      incomeItems.forEach(item => {
        let itemIncomes = item.querySelector('.income-title').value;
        let cashIncomes = item.querySelector('.income-amount').value;
        if (itemIncomes !== '' && cashIncomes !== '') {
          this.income[itemIncomes] = +cashIncomes;
        }
      });
      // Суммарный доход за месяц
      for (let key in this.income) {
        this.incomeMonth += +this.income[key];
      }
    },
    // Получить возможные расходы
    getAddExpenses: function() {
      let addExpenses = additionalExpensesItemValue.value.split(',');
      addExpenses.forEach(item => {
        if (item.trim() !== '') {
          this.addExpenses.push(item);
        }
      });
    },
    // Получить расходы за месяц
    getExpensesMonth: function() {
      for (let item in this.expenses) {
        this.expensesMonth += this.expenses[item];
      }
      return this.expensesMonth;
    },
    // Получить бюджет на месяц и на день
    getBudget: function() {
      this.budgetMonth = Math.ceil(this.budget + this.incomeMonth - this.expensesMonth);
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    // Получить срок достижения цели
    getTargetMonth: function() {
      return targetAmountValue.value / this.budgetMonth;
    },
    // Получить сумму накоплений за период
    calcSavedMoney: function() {
      return this.budgetMonth * periodSelectValue.value;
    }
};

// Кнопка "Рассчитать"
salaryAmountValue.addEventListener('input', () => startButton.disabled = salaryAmountValue.value.trim() === '');
startButton.addEventListener('click', appData.start.bind(appData));

// Кнопка "Сбросить"
cancelButton.addEventListener('click', appData.reset.bind(appData));

// Кнопки "+"
expensesPlusButton.addEventListener('click', appData.addExpensesBlock);
incomePlusButton.addEventListener('click', appData.addIncomesBlock);

// Валидация форм для ввода букв
let inputsString = document.querySelectorAll('.data input[placeholder="Наименование"]');
document.addEventListener('input', function() {
    inputsString = document.querySelectorAll('.data input[placeholder="Наименование"]');
    inputsString.forEach(function(item) {
      item.value = item.value.replace(/[^А-Яа-яЁё\s\,]|[\d]/g, '');
    });
});

// Валидация форм для ввода цифр
let inputsDisits = document.querySelectorAll('.data input[placeholder="Сумма"]');
document.addEventListener('input', function() {
    inputsDisits = document.querySelectorAll('.data input[placeholder="Сумма"]');
    inputsDisits.forEach(function(item) {
      item.value = item.value.replace(/[^\d]/g, '');
    });
});