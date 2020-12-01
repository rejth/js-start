'use strict';

// Кнопку "Рассчитать" через id
const calcButton = document.getElementById('start');
console.log('calcButton: ', calcButton);

// Кнопки “+” (плюс) через Tag, каждую в своей переменной.
const buttonPlus1 = document.getElementsByTagName('button')[0];
console.log('buttonPlus1: ', buttonPlus1);
const buttonPlus2 = document.getElementsByTagName('button')[1];
console.log('buttonPlus2: ', buttonPlus2);

// Чекбокс по id через querySelector
const checkbox = document.querySelector('#deposit-check');
console.log('checkbox: ', checkbox);

// Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
const incomes = document.querySelectorAll('.additional_income-item');
console.log('incomes: ', incomes);

// Каждый элемент в правой части программы через класс(не через querySelector), которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">
const budgetDay = document.getElementsByClassName('budget_day-value')[0];
console.log('budgetDay: ', budgetDay);

const expensesMonth = document.getElementsByClassName('expenses_month-value')[0];
console.log('expensesMonth: ', expensesMonth);

const additionalIncome = document.getElementsByClassName('additional_income-value')[0];
console.log('additionalIncome: ', additionalIncome);

const additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];
console.log('additionalExpenses: ', additionalExpenses);

const incomePeriod = document.getElementsByClassName('income_period-value')[0];
console.log('incomePeriod: ', incomePeriod);

const targetMonth = document.getElementsByClassName('target_month-value')[0];
console.log('targetMonth: ', targetMonth);

// Оставшиеся поля через querySelector каждый в отдельную переменную:
// поля ввода (input) с левой стороны и не забудьте про range.
const inputs = document.querySelectorAll('.data input');
console.log('inputs : ', inputs );
inputs.forEach(element => console.log(element));

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
