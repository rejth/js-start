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
          slider = document.querySelector('.portfolio-content'),
          dotsContainer = document.querySelector('.portfolio-dots');

    let dots = document.querySelectorAll('.dot'),
        currentSlide = 0,
        idInterval;

    // добавляем пагинацию
    slides.forEach(() => {
      let li = document.createElement('li');
      li.classList.add('dot');
      dotsContainer.append(li);
    });

    dots = document.querySelectorAll('.dot');

    // удаляем активный класс у текущего элемента слайдера
    const prevSlide = (element, index, strClass) => {
      element[index].classList.remove(strClass);
    };

    // добавляем активный класс следующему элементу слайдера
    const nextSlide = (element, index, strClass) => {
      element[index].classList.add(strClass);
    };

    // автоматическое переключение слайдов
    const autoPlaySlider = () => {
      prevSlide(slides, currentSlide, 'portfolio-item-active'); // скрываем текущий слайд
      prevSlide(dots, currentSlide, 'dot-active'); // удаляем активный стиль пагинации текущего слайда

      currentSlide++;

      if (currentSlide === slides.length) {currentSlide = 0;}

      nextSlide(slides, currentSlide, 'portfolio-item-active'); // делаем видимым следующий слайд
      nextSlide(dots, currentSlide, 'dot-active'); // добавялем активный стиль пагинации следующего слайда
    };

    // запуск слайдшоу
    const startAutoPlay = () => {
      idInterval = setInterval(autoPlaySlider, 2000);
    };
    startAutoPlay();

    // останов слайдшоу
    const stopAutoPlay = () => {
      clearInterval(idInterval);
    };

    // останов слайдшоу при наведении на кнопку или пагинацию
    slider.addEventListener('mouseover', (e) => {
      if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {stopAutoPlay();}
    });

    // запуск слайдшоу в иных случаях
    slider.addEventListener('mouseout', (e) => {
      if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {startAutoPlay();}
    });

    // переключение слайдов по клику на кнопку или пагинацию
    slider.addEventListener('click', (e) => {
      e.preventDefault();

      let target = e.target;

      // условие для предовращения влияния клика по слайду на верстку
      if (!target.matches('.dot') && !target.matches('.portfolio-btn')) {return;}

      // удаляем стили у текущего слайда и пагинации
      prevSlide(slides, currentSlide, 'portfolio-item-active');
      prevSlide(dots, currentSlide, 'dot-active');

      // обработка клика по кнопке или пагинации
      if (target.matches('.dot')) {
        dots.forEach((dot, index) => {
          if (dot === target) {currentSlide = index;}
        });
      } else if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      }

      // условие для бесконечного листания слайдов
      if (currentSlide >= slides.length) {
        currentSlide = 0;
      } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
      }

      // добавляем стили следующему слайду и пагинации
      nextSlide(slides, currentSlide, 'portfolio-item-active');
      nextSlide(dots, currentSlide, 'dot-active');
    });
  };
  toggleSlider();

});
