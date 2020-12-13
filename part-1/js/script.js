'use strict';

const startButton = document.querySelector('#start'), // кнопка "рассчитать"
      cancelButton = document.querySelector('#cancel'), // кнопка "сбросить"
      incomePlusButton = document.querySelector('.income_add'), // кнопка "+" доход
      expensesPlusButton = document.querySelector('.expenses_add'), // кнопка "+" расход
      possibleIncomeValueOne = document.querySelectorAll('.additional_income-item')[0], // возможный доход 1
      possibleincomeValueTwo = document.querySelectorAll('.additional_income-item')[1], // возможный доход 2
      salaryAmountValue = document.querySelector('.salary-amount'), // месячный доход
      additionalExpensesItemValue = document.querySelector('.additional_expenses-item'), // возможные расходы
      targetAmountValue = document.querySelector('.target-amount'), // цель
      periodSelectValue = document.querySelector('.period-select'), // ползунок "период расчета"
      depositCheckboxValue = document.querySelector('#deposit-check'), // чекбокс "депозит"
      depositBankValue = document.querySelector('.deposit-bank'),
      depositAmountValue = document.querySelector('.deposit-amount'),
      depositPercentValue = document.querySelector('.deposit-percent'),
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

startButton.disabled = true;

class AppData {
  constructor() {
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
  }

  // Начать расчет
  start() {
    [...document.querySelectorAll('.data input')].map(item => item.disabled = true); // блокировка всех input
    periodSelectValue.disabled = false; // но не ползунка, чтобы можно было менять диапазон расчета

    [...document.querySelectorAll('.data button')].map(item => item.disabled = true); // блокировка всех кнопок

    this.budget = +salaryAmountValue.value;

    this.getExpenses();
    this.getIncomes();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();

    startButton.style.display = 'none';
    cancelButton.style.display = 'block';
  }

  // Сбросить все введенные данные
  reset() {
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
    // разблокировка всех buttons
    [...document.querySelectorAll('.data button')].map(item => item.disabled = false);

    // Сброс ползунка
    periodSelectValue.value = '1';
    periodAmountValue.textContent = '1';

    // Возвращение кнопок в исходное состояние
    cancelButton.style.display = 'none';
    startButton.style.display = 'block';
    startButton.disabled = true;

    // Сброс депозита
    this.deposit = false;
  }

  // Показать результаты расчета
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());

    periodSelectValue.addEventListener('input', () => {
      periodAmountValue.textContent = periodSelectValue.value;
      incomePeriodValue.value = this.calcSavedMoney();
    });
  }

  // Добавить блок с обязательным расходом
  addExpensesBlock() {
    const clonedExpensesItem = expensesItems[0].cloneNode(true);

    [...clonedExpensesItem.querySelectorAll('input')].map(item => item.value = ''); // очистка input
    expensesItems[0].parentNode.insertBefore(clonedExpensesItem, expensesPlusButton);

    // если больше 3-х расходов, скрываем кнопку "+"
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlusButton.style.display = 'none';
    }
  }

  // Добавить блок с дополнительным доходом
  addIncomesBlock() {
    const clonedIncomesItem = incomeItems[0].cloneNode(true);

    [...clonedIncomesItem.querySelectorAll('input')].map(item => item.value = ''); // очистка input
    incomeItems[0].parentNode.insertBefore(clonedIncomesItem, incomePlusButton);

    // если больше 3-х доходов, скрываем кнопку "+"
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlusButton.style.display = 'none';
    }
  }

  // Получить сумму обязательных расходов
  getExpenses() {
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems.forEach(item => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }

  // Получить сумму дополнительных доходов
  getIncomes() {
    incomeItems = document.querySelectorAll('.income-items');
    incomeItems.forEach(item => {
      const itemIncomes = item.querySelector('.income-title').value;
      const cashIncomes = item.querySelector('.income-amount').value;
      if (itemIncomes !== '' && cashIncomes !== '') {
        this.income[itemIncomes] = +cashIncomes;
      }
    });

    // Суммарный доход за месяц
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  // Получить возможные расходы
  getAddExpenses() {
    const addExpenses = additionalExpensesItemValue.value.split(',');
    addExpenses.forEach(item => {
      if (item.trim() !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  // Получить расходы за месяц
  getExpensesMonth() {
    for (let item in this.expenses) {
      this.expensesMonth += this.expenses[item];
    }
    return this.expensesMonth;
  }

  // Получить бюджет на месяц и на день
  getBudget() {
    const monthIncomeFromDeposit = this.moneyDeposit * this.percentDeposit / 12;
    this.budgetMonth = Math.ceil(this.budget + this.incomeMonth - this.expensesMonth + monthIncomeFromDeposit);
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  // Получить срок достижения цели
  getTargetMonth() {
    return targetAmountValue.value / this.budgetMonth;
  }

  // Получить сумму накоплений за период
  calcSavedMoney() {
    return this.budgetMonth * periodSelectValue.value;
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercentValue.value;
      this.moneyDeposit = depositAmountValue.value;
    }
  }

  changePercent() {
    const selectedBankPercent = this.value;
    if (selectedBankPercent === 'other') {
      // TODO
    } else {
      depositPercentValue.value = selectedBankPercent;
    }
  }

  // Чекбокс "Депозит"
  depositHandler() {
    if (depositCheckboxValue.checked) {
      this.deposit = true;
      depositBankValue.style.display = 'inline-block';
      depositAmountValue.style.display = 'inline-block';
      depositBankValue.addEventListener('change', this.changePercent);
    } else {
      this.deposit = false;
      depositBankValue.style.display = 'none';
      depositAmountValue.style.display = 'none';
      depositBankValue.value = '';
      depositAmountValue.value = '';
      depositBankValue.removeEventListener('change', this.changePercent);
    }
  }

  // Слушатели событий
  eventListeners() {
    let inputsString = document.querySelectorAll('.data input[placeholder="Наименование"]');
    let inputsDisits = document.querySelectorAll('.data input[placeholder="Сумма"]');

    // Кнопка "Рассчитать"
    salaryAmountValue.addEventListener('input', () => startButton.disabled = salaryAmountValue.value.trim() === '');
    startButton.addEventListener('click', this.start.bind(this));

    // Кнопка "Сбросить"
    cancelButton.addEventListener('click', this.reset.bind(this));

    // Кнопки "+"
    expensesPlusButton.addEventListener('click', this.addExpensesBlock.bind(this));
    incomePlusButton.addEventListener('click', this.addIncomesBlock.bind(this));

    // Чекбокс "Депозит"
    depositCheckboxValue.addEventListener('change', this.depositHandler.bind(this));

    // Валидация форм для ввода букв
    document.addEventListener('input', () => {
      inputsString = document.querySelectorAll('.data input[placeholder="Наименование"]');
      inputsString.forEach(item => {
        item.value = item.value.replace(/[^А-Яа-яЁё\s\,]|[\d]/g, '');
      });
    });

    // Валидация форм для ввода цифр
    document.addEventListener('input', () => {
      inputsDisits = document.querySelectorAll('.data input[placeholder="Сумма"]');
      inputsDisits.forEach(item => {
        item.value = item.value.replace(/[^\d]/g, '');
      });
    });
  }
}

const appData = new AppData();
appData.eventListeners();
