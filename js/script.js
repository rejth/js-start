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
  countTimer('31 december 2020');

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
    slides.forEach((item, index) => {
      let li = document.createElement('li');
      if (index === 0) {
        li.classList.add('dot');
        li.classList.add('dot-active');
      } else {
        li.classList.add('dot');
      }
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

  // Блок "Наша команда"
  const handlerPhotoMouseEnter = () => {
    const images = document.querySelectorAll('.command img');
    images.forEach(img => {
      const imageSrc = img.src;
      img.addEventListener('mouseenter', () => {
          img.src = img.dataset.img;
      });
      img.addEventListener('mouseleave', () => {
          img.src = imageSrc;
      });
    });
  };
  handlerPhotoMouseEnter();

  // Калькулятор
  const calculator = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          roomType = document.querySelector('.calc-type'),
          roomSquare = document.querySelector('.calc-square'),
          roomCount = document.querySelector('.calc-count'),
          workDuration = document.querySelector('.calc-day'),
          totalPrice = document.querySelector('.calc-total');

    // Валидация значений в калькуляторе
    const validateCalculatorValues = () => {
      const calcContainer = document.querySelector('.calc');
      calcContainer.addEventListener('input', (e) => {
        if (e.target.matches('input')) {
          e.target.value = e.target.value.replace(/[^\d]/g, '');
        }
      });
    };

    validateCalculatorValues();

    // Расчет
    const calcTotalPrice = () => {
      let total = 0,
          countValue = 1,
          dayValue = 1;

      const selectedRoomTypeValue = +roomType.options[roomType.selectedIndex].value,
            roomSquareValue = +roomSquare.value,
            roomCountValue = +roomCount.value,
            workDurationValue = +workDuration.value;

      if (roomCountValue > 1) {
        countValue += (roomCountValue - 1) / 10;
      }

      if (workDurationValue && workDurationValue < 5) {
        dayValue *= 2;
      } else if (workDurationValue && workDurationValue >= 5 && workDurationValue < 10) {
        dayValue *= 1.5;
      }

      if (roomType && roomSquare) {
        total = Math.floor(price * selectedRoomTypeValue * roomSquareValue * countValue * dayValue);
      }

      totalPrice.textContent = total;
    };

    calcBlock.addEventListener('change', (e) => {
      if (e.target.matches('select') || e.target.matches('input')) {
        calcTotalPrice();
      }
    });
  };
  calculator(100);

  // Отправка данных формы на сервер
  const sendForm = (formIdString) => {
    const errorMessage = 'Что-то пошло не так...',
          loadMessage = 'Загрузка...',
          successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.getElementById(formIdString), // форма для заполнения заявки
          statusMessageElement = document.createElement('div'), // сообщение о статусе отправки заявки
          inputs = document.querySelectorAll(`#${formIdString} input`); // все inputs из формы

    statusMessageElement.style.cssText = 'font-size: 2rem; color: white';

    // Функция отправки данных формы на сервер
    const postData = (requestBody) => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
          if (request.readyState !== 4) {return;}
          if (request.status === 200) {
            resolve();
          } else {
            reject();
          }
        });

        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(requestBody));
      });
    };

  // Валидация данных при вводе телефона
    form.addEventListener('input', (e) => {
      if (e.target.matches('input[name="user_phone"]')) {
        e.target.value = e.target.value.replace(/[^\d\+]/g, '');
      }
    });

  // Валидация данных при вводе email
    form.addEventListener('input', (e) => {
      if (e.target.matches('input[name="user_email"]')) {
        e.target.value = e.target.value.replace(/[^A-Za-z\d\.\-@_]/g, '');
      }
    });

  // Валидация данных при вводе имени
    form.addEventListener('input', (e) => {
      if (e.target.matches('input[name="user_name"]')) {
        e.target.value = e.target.value.replace(/[^А-Яа-яЁё\s]|/g, '');
      }
    });

  // Валидация данных при вводе сообщения
    form.addEventListener('input', (e) => {
      if (e.target.matches('input[name="user_message"]')) {
        e.target.value = e.target.value.replace(/[^А-Яа-яЁё\d\s\,\.\?\-:;!'"-&%]/g, '');
      }
    });

    // Слушатель формы
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.append(statusMessageElement);

      statusMessageElement.textContent = loadMessage;

      const formData = new FormData(form);
      let body = {};

      // берем данные формы и заполняем тело запроса body
      formData.forEach((item, index) => body[index] = item); // у объекта formData есть свой метод forEach()

      // отправка данных и уведомление пользователя
      postData(body)
        .then(() => statusMessageElement.textContent = successMessage)
        .catch(() => statusMessageElement.textContent = errorMessage);

      inputs.forEach(item => item.value = ''); // очистка input после отправки данных
    });
  };
  sendForm('form1'); // главная форма в header
  sendForm('form2'); // форма в footer
  sendForm('form3'); // форма из модального окна
});
