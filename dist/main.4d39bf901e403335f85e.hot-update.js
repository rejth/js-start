/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateglo_js_study_project"]("main",{

/***/ "./src/modules/togglePopUp.js":
/*!************************************!*\
  !*** ./src/modules/togglePopUp.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n// Popup-окно\nvar togglePopUp = function togglePopUp() {\n  var popupButtons = document.querySelectorAll('.popup-btn'),\n      popup = document.querySelector('.popup'),\n      popUpContent = document.querySelector('.popup-content'); // animate popup\n\n  var idInterval,\n      count = 0;\n\n  var animatePopUp = function animatePopUp() {\n    count++;\n\n    if (parseFloat(popUpContent.style.top) < 20) {\n      popUpContent.style.top = count + '%';\n    } else {\n      clearInterval(idInterval);\n      count = 0;\n    }\n  }; // Открытие popup окна + анимация\n\n\n  popupButtons.forEach(function (item) {\n    item.addEventListener('click', function () {\n      popup.style.display = 'block';\n      popUpContent.style.top = '-200%';\n\n      if (window.innerWidth > 768) {\n        idInterval = setInterval(animatePopUp, 20);\n      } // } else if (window.innerWidth <= 768 && window.innerWidth > 690) {\n      // \tpopUpContent.style.left = '30%';\n      // } else if (window.innerWidth <= 690 && window.innerWidth > 500) {\n      // \tpopUpContent.style.left = '25%';\n      // } else if (window.innerWidth <= 500 && window.innerWidth > 448) {\n      // \tpopUpContent.style.left = '18%';\n      // } else if (window.innerWidth <= 448) {\n      // \tpopUpContent.style.left = '15%';\n      // }\n\n    });\n  }); // Закрытие popup окна\n\n  popup.addEventListener('click', function (e) {\n    var target = e.target; // если нажимаем кнопку \"Закрыть\" или нажимаем вне области окна, то закрываем его\n\n    if (target.classList.contains('popup-close') || !target.closest('.popup-content')) {\n      popup.style.display = 'none';\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (togglePopUp);\n\n//# sourceURL=webpack://glo-js-study-project/./src/modules/togglePopUp.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "3dffa73e6d251a31c4d0"
/******/ 	})();
/******/ 	
/******/ }
);