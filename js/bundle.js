/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 147);
/******/ })
/************************************************************************/
/******/ ({

/***/ 147:
/***/ (function(module, exports) {


let timeToFloat = (min, sec) => {
  let decimal = sec / 60;
  return min + decimal;
};

let floatToTimeStr = (float) => {
  let min = parseInt(float);
  let sec = Math.round((float - min) * 60);
  if (sec < 10) {
    sec = '0' + sec;
  }
  return `${min}:${sec}`;
};

let findPace = (time, interval) => {
  return floatToTimeStr(time / interval);
};

let goalTime;
let distanceInterval;
let mileIntervalText;

let getInput = () => {
  let distance = Number(document.querySelector('#distance').value);
  let min = Number(document.querySelector('#goal-min').value);
  let sec = Number(document.querySelector('#goal-sec').value);
  let mileIntervalEl = document.querySelector('#mile-interval');
  let mileInterval = Number(mileIntervalEl.value);
  goalTime = timeToFloat(min, sec);
  mileIntervalText = mileIntervalEl.options[mileIntervalEl.selectedIndex].text;
  distanceInterval = distance / mileInterval;
};

let form = document.querySelector('#form');
form.onsubmit = (event) => {
  event.preventDefault();
  getInput();
  let pace = findPace(goalTime, distanceInterval);
  document.querySelector('#pace-interval').textContent = `${mileIntervalText} mile pace: ${pace}`;
};


/***/ })

/******/ });