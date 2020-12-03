'use strict';

// Восстановить порядок книг.
const books = document.querySelectorAll('.book');
console.log('books: ', books);

books[0].before(books[1]);
books[2].before(books[4]);
books[2].before(books[3]);
books[2].before(books[5]);

// Заменить картинку заднего фона на другую из папки image
document.body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
const bookTitle3 = document.querySelectorAll('.book a')[2];
console.log('bookTitle3: ', bookTitle3);
bookTitle3.textContent = 'Книга 3. this и Прототипы Объектов';

// Удалить рекламу со страницы
const adv = document.querySelector('.adv').remove();

// Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
const book2 = document.querySelectorAll('.book>ul')[1].children;
console.log('book2: ', book2);
book2[3].after(book2[6]);
book2[4].after(book2[8]);

const book5 = document.querySelectorAll('.book>ul')[4].children;
console.log('book5 : ', book5);
book5[2].before(book5[9]);
book5[2].after(book5[4]);
book5[3].after(book5[5]);

// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
const newElement = document.createElement('li');
newElement.textContent = 'Глава 8: За пределами ES6';

const book6 = document.querySelectorAll('.book>ul')[5];
console.log('book6 : ', book6 );
book6.append(newElement);
