import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import toggleTabs from './modules/toggleTabs';
import toggleSlider from './modules/toggleSlider';
import handlerPhotoMouseEnter from './modules/handlerPhotoMouseEnter';
import calculator from './modules/calculator';
import sendForm from './modules/sendForm';

// Таймер
countTimer('31 december 2020');

// Меню
toggleMenu();

// Popup-окно
togglePopUp();

// Tabs
toggleTabs();

// Слайдер
toggleSlider();

// Блок "Наша команда"
handlerPhotoMouseEnter();

// Калькулятор
calculator(100);

// Отправка данных формы на сервер
sendForm('form1'); // главная форма в header
sendForm('form2'); // форма в footer
sendForm('form3'); // форма из модального окна
