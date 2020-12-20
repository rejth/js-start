window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Таймер
  function countTimer(deadline) {
    const timerHours = document.querySelector('#timer-hours'),
          timerMinutes = document.querySelector('#timer-minutes'),
          timerSeconds = document.querySelector('#timer-seconds');

    let idInterval;

    function getTimeRemaining() {
      const deadlineDate = new Date(deadline).getTime(),
            currentDate = new Date().getTime(),
            timeRemaining = (deadlineDate - currentDate) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 3600);
      return {timeRemaining, hours, minutes, seconds};
    }

    function updateClock() {
      const timer = getTimeRemaining();

      if (timer.timeRemaining <= 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(idInterval);
      } else {
        timerHours.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
        timerMinutes.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
        timerSeconds.textContent = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;
      }
    }

    updateClock();
    idInterval = setInterval(updateClock, 1000);
  }
  countTimer('20 december 2020');

  // Меню
  const toggleMenu = () => {
    const menu = document.querySelector('menu');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    document.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.menu') ||
          target.classList.contains('close-btn') ||
          target.matches('ul>li>a')) {
        handlerMenu();
      } else if (!target.closest('.active-menu')) {
        menu.classList.remove('active-menu');
      }
    });
  };
  toggleMenu();

  // Popup-окно
  const togglePopUp = () => {
    const popupButtons= document.querySelectorAll('.popup-btn'),
          popup = document.querySelector('.popup'),
          popUpContent = document.querySelector('.popup-content');

    // animate popup
    let idInterval,
        count = 0;

    const animatePopUp = () => {
      count++;
      if (parseFloat(popUpContent.style.left) < 38) {
        popUpContent.style.left = count + '%';
      } else {
        clearInterval(idInterval);
        count = 0;
      }
    };

    // Открытие popup окна + анимация
    popupButtons.forEach(item => {
      item.addEventListener('click', () => {
        popup.style.display = 'block';
        popUpContent.style.left = '-50%';
        if (window.innerWidth > 768) {
          idInterval = setInterval(animatePopUp, 10);
        } else {
          popUpContent.style.left = '38%';
        }
      });
    });

    // Закрытие popup окна
    popup.addEventListener('click', (e) => {
      let target = e.target;
      // если нажимаем кнопку "Закрыть" или нажимаем вне области окна, то закрываем его
      if (target.classList.contains('popup-close') || !target.closest('.popup-content')) {
        popup.style.display = 'none';
      }
    });
  };
  togglePopUp();

  // Tabs
  const toggleTabs = () => {
    const tabsHeader = document.querySelector('.service-header'),
          tabs = document.querySelectorAll('.service-header-tab'),
          tabsContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      tabsContent.forEach((item, i) => {
        if (i === index) {
          tabs[i].classList.add('active');
          item.classList.remove('d-none');
        } else {
          tabs[i].classList.remove('active');
          item.classList.add('d-none');
        }
      });
    };

    tabsHeader.addEventListener('click', (e) => {
      let target = e.target;
      target = target.closest('.service-header-tab'); // если нет класса, поднимается выше по DOM-дереву к родителю
      if (target) {
        tabs.forEach((item, i) => {
          if (item === target) {toggleTabContent(i);}
        });
      }
    });
  };
  toggleTabs();

  // Слайдер
  const toggleSlider = () => {
    const slides = document.querySelectorAll('.portfolio-item'),
          dots = document.querySelectorAll('.dot'),
          buttons = document.querySelectorAll('.portfolio-btn'),
          slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
        idInterval;

    const prevSlide = (element, index, strClass) => {
      element[index].classList.remove(strClass); // удаляем активный класс у текущего элемента слайдера
    };

    const nextSlide = (element, index, strClass) => {
      element[index].classList.add(strClass); // добавляем активный класс следующему элементу слайдера
    };

    // Автоматическое переключение слайдов
    const autoPlaySlider = () => {
      prevSlide(slides, currentSlide, 'portfolio-item-active'); // скрываем текущий слайд
      prevSlide(dots, currentSlide, 'dot-active'); // удаляем активный стиль пагинации текущего слайда
      currentSlide++;
      if (currentSlide === slides.length) {currentSlide = 0;}
      nextSlide(slides, currentSlide, 'portfolio-item-active'); // делаем видимым следующий слайд
      nextSlide(dots, currentSlide, 'dot-active'); // добавялем активный стиль пагинации следующего слайда
    };

    // Слайдшоу
    const startAutoPlay = () => {
      idInterval = setInterval(autoPlaySlider, 1500);
    };
    startAutoPlay();

    // Ручное переключение слайдов
    const toggleSliderContent = (index) => {
      slides.forEach((item, i) => {
        if (i === index) {
          dots[i].classList.add('dot-active');
          item.classList.add('portfolio-item-active');
        } else {
          dots[i].classList.remove('dot-active');
          item.classList.remove('portfolio-item-active');
        }
      });
    };

    slider.addEventListener('click', (e) => {
      let target = e.target;
      if (target.classList.contains('dot')) {
        clearInterval(idInterval);
        dots.forEach((item, i) => {
          if (item === target) {toggleSliderContent(i);}
        });
      }
    });

  };
  toggleSlider();

});
