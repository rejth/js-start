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
    const menuButton = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeButton = document.querySelector('.close-btn'),
          menuItems = menu.querySelector('ul');

    const handlerMenu = function () {
      menu.classList.toggle('active-menu');
    };

    menuButton.addEventListener('click', handlerMenu);

    closeButton.addEventListener('click', handlerMenu);

    menuItems.addEventListener('click', handlerMenu);

  };
  toggleMenu();

  // Popup-окно
  const togglePopUp = () => {
    const popupButtons= document.querySelectorAll('.popup-btn'),
          popup = document.querySelector('.popup'),
          closePopUpButton = document.querySelector('.popup-close'),
          popUpContent = document.querySelector('.popup-content');

    let idInterval,
        count = 0;

    // animate popup
    const animatePopUp = () => {
      count++;
      if (parseFloat(popUpContent.style.left) < 38) {
        popUpContent.style.left = count + '%';
      } else {
        clearInterval(idInterval);
        count = 0;
      }
    };

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

    closePopUpButton.addEventListener('click', () => {
        popup.style.display = 'none';
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
      while (target !== tabsHeader) {
        if (target.classList.contains('service-header-tab')) {
          tabs.forEach((item, i) => {
            if (item === target) {toggleTabContent(i);}
          });
          return;
        }
        target = target.parentNode;
      }
    });
  };
  toggleTabs();

});
