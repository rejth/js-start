'use strict';

const startButton = document.querySelector('#start');
      startButton.disabled = true;

const incomePlusButton = document.querySelector('.income_add'),
      expensesPlusButton = document.querySelector('.expenses_add'),
      depositCheckboxValue = document.querySelector('#deposit-check'),
      possibleIncomeValueOne = document.querySelectorAll('.additional_income-item')[0],
      possibleincomeValueTwo = document.querySelectorAll('.additional_income-item')[1],
      budgetMonthValue = document.querySelector('.budget_month-value'),
      budgetDayValue = document.querySelector('.budget_day-value'),
      expensesMonthValue = document.querySelector('.expenses_month-value'),
      additionalIncomeValue = document.querySelector('.additional_income-value'),
      additionalExpensesValue = document.querySelector('.additional_expenses-value'),
      incomePeriodValue = document.querySelector('.income_period-value'),
      targetMonthValue = document.querySelector('.target_month-value'),
      salaryAmountValue = document.querySelector('.salary-amount'),
      additionalExpensesItemValue = document.querySelector('.additional_expenses-item'),
      targetAmountValue = document.querySelector('.target-amount'),
      periodSelectValue = document.querySelector('.period-select');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    periodAmountValue = document.querySelector('.period-amount');

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

    showResult: function() {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      periodSelectValue.addEventListener('input', () => periodAmountValue.textContent = periodSelectValue.value);
      periodSelectValue.addEventListener('input', () => incomePeriodValue.value = appData.calcSavedMoney());
    },

    addExpensesBlock: function() {
      let clonedExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(clonedExpensesItem, expensesPlusButton);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
        expensesPlusButton.style.display = 'none';
      }
    },

    addIncomesBlock: function() {
      let clonedIncomesItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(clonedIncomesItem, incomePlusButton);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3) {
        incomePlusButton.style.display = 'none';
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

    getIncomes: function() {
      incomeItems.forEach(function(item) {
        let itemIncomes = item.querySelector('.income-title').value;
        console.log('itemIncomes: ', itemIncomes);
        let cashIncomes = item.querySelector('.income-amount').value;
        console.log('cashIncomes: ', cashIncomes);
        if (itemIncomes !== '' && cashIncomes !== '') {
          appData.income[itemIncomes] = +cashIncomes;
        }
      });
      for (let key in appData.income) {
        appData.incomeMonth += +appData.income[key];
      }
    },

    getAddExpenses: function() {
      let addExpenses = additionalExpensesItemValue.value.split(',');
      addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
          appData.addExpenses.push(item);
        }
      });
    },

    getExpensesMonth: function() {
      for (let item in appData.expenses) {
        appData.expensesMonth += appData.expenses[item];
      }
      return appData.expensesMonth;
    },

    getBudget: function() {
      appData.budgetMonth = Math.ceil(appData.budget + appData.incomeMonth - appData.expensesMonth);
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function() {
      return targetAmountValue.value / appData.budgetMonth;
    },

    calcSavedMoney: function() {
      return appData.budgetMonth * periodSelectValue.value;
    }
};

startButton.addEventListener('click', appData.start);
expensesPlusButton.addEventListener('click', appData.addExpensesBlock);
incomePlusButton.addEventListener('click', appData.addIncomesBlock);
periodSelectValue.addEventListener('input', appData.updatePeriodAmount);
salaryAmountValue.addEventListener('input', () => startButton.disabled = salaryAmountValue.value.trim() === '');
