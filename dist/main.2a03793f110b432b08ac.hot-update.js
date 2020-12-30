/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateglo_js_study_project"]("main",{

/***/ "./src/modules/sendForm.js":
/*!*********************************!*\
  !*** ./src/modules/sendForm.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n// Отправка данных формы на сервер\nvar sendForm = function sendForm(formIdString) {\n  var errorMessage = 'Что-то пошло не так...',\n      loadMessage = 'Загрузка...',\n      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';\n  var form = document.getElementById(formIdString),\n      // форма для заполнения заявки\n  statusMessageElement = document.createElement('div'),\n      // сообщение о статусе отправки заявки\n  popup = document.querySelector('.popup'),\n      // pop-up окно\n  inputs = document.querySelectorAll(\"#\".concat(formIdString, \" input\")); // все inputs из формы\n\n  statusMessageElement.style.cssText = 'font-size: 2rem; color: white'; // Функция отправки данных формы на сервер\n\n  var postData = function postData(requestBody) {\n    return fetch('../server.php', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(requestBody)\n    });\n  }; // Валидация данных при вводе телефона\n\n\n  form.addEventListener('input', function (e) {\n    if (e.target.matches('input[name=\"user_phone\"]')) {\n      e.target.setAttribute('pattern', '^[0-9-+()]{11,18}$');\n      e.target.value = e.target.value.replace(/[^\\d+()-]/g, '');\n    }\n  }); // Валидация данных при вводе email\n\n  form.addEventListener('input', function (e) {\n    if (e.target.matches('input[name=\"user_email\"]')) {\n      e.target.setAttribute('pattern', '^[A-Za-z0-9.-_]+@[A-Za-z]+.[A-Za-z]{2,3}$');\n      e.target.value = e.target.value.replace(/[^A-Za-z\\d.@_-]/g, '');\n    }\n  }); // Валидация данных при вводе имени\n\n  form.addEventListener('input', function (e) {\n    if (e.target.matches('input[name=\"user_name\"]')) {\n      e.target.setAttribute('pattern', '[А-Яа-яЁё-]{2,}');\n      e.target.value = e.target.value.replace(/[^А-Яа-яЁё\\s-]|/g, '');\n    }\n  }); // Валидация данных при вводе сообщения\n\n  form.addEventListener('input', function (e) {\n    if (e.target.matches('input[name=\"user_message\"]')) {\n      e.target.setAttribute('type', 'text');\n      e.target.value = e.target.value.replace(/[^А-Яа-яЁё\\s().,!?'\";:-]/g, '');\n    }\n  }); // Слушатель формы на отправку данных\n\n  form.addEventListener('submit', function (e) {\n    e.preventDefault();\n    form.append(statusMessageElement);\n    statusMessageElement.textContent = loadMessage; // сообщение о загрузке\n\n    var formData = new FormData(form);\n    var body = {}; // Перебор данных формы и заполнение тела запроса body\n\n    formData.forEach(function (item, index) {\n      return body[index] = item;\n    }); // у объекта formData есть свой метод forEach()\n    // Отправка данных и уведомление пользователя\n\n    postData(body).then(function (response) {\n      if (response.status !== 200) {\n        throw new Error('Response status code is not 200');\n      }\n\n      statusMessageElement.textContent = successMessage;\n    })[\"catch\"](function (error) {\n      statusMessageElement.textContent = errorMessage;\n      console.error(error);\n    });\n    inputs.forEach(function (item) {\n      return item.value = '';\n    }); // очистка input после отправки данных\n\n    setTimeout(function () {\n      return statusMessageElement.remove();\n    }, 5000); // удаление сообщения о статусе\n\n    setTimeout(function () {\n      return popup.style.display = 'none';\n    }, 7000); // закрытие модального окна\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForm);\n\n//# sourceURL=webpack://glo-js-study-project/./src/modules/sendForm.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "e0ce421c8249ab3d7dae"
/******/ 	})();
/******/ 	
/******/ }
);