(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"));
	else if(typeof define === 'function' && define.amd)
		define(["moment"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("moment")) : factory(root["moment"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moment = __webpack_require__(2);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _minutely = __webpack_require__(3);
	
	var _minutely2 = _interopRequireDefault(_minutely);
	
	var _hourly = __webpack_require__(5);
	
	var _hourly2 = _interopRequireDefault(_hourly);
	
	var _daily = __webpack_require__(6);
	
	var _daily2 = _interopRequireDefault(_daily);
	
	var _weekly = __webpack_require__(7);
	
	var _weekly2 = _interopRequireDefault(_weekly);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NextMoment = function () {
	  function NextMoment(start, options) {
	    var current = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	    _classCallCheck(this, NextMoment);
	
	    this.start = start;
	    this.options = options;
	    this.current = current;
	  }
	
	  _createClass(NextMoment, [{
	    key: 'getNext',
	    value: function getNext() {
	      var result = false;
	
	      switch (this.options.repeat) {
	        case "minutely":
	          result = (0, _minutely2.default)(this.start, this.options, this.current);
	          break;
	
	        case "hourly":
	          result = (0, _hourly2.default)(this.start, this.options, this.current);
	          break;
	
	        case "daily":
	          result = (0, _daily2.default)(this.start, this.options, this.current);
	          break;
	
	        case "weekly":
	          result = (0, _weekly2.default)(this.start, this.options, this.current);
	          break;
	
	        default:
	          break;
	      }
	
	      return _moment2.default.isMoment(result) ? result.toDate() : false;
	    }
	  }]);
	
	  return NextMoment;
	}();
	
	exports.default = NextMoment;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (base, options) {
	  var current = arguments.length <= 2 || arguments[2] === undefined ? (0, _moment2.default)() : arguments[2];
	
	  var endAt = options.end_at;
	  var interval = options.interval > 0 ? options.interval : 1; // set invalid interval to 1
	
	  // convert to moment
	  if (!_moment2.default.isMoment(base)) base = (0, _moment2.default)(base);
	  if (endAt && !_moment2.default.isMoment(endAt)) endAt = (0, _moment2.default)(endAt);
	
	  // current moment in time
	  if (!_moment2.default.isMoment(current)) current = (0, _moment2.default)(current);
	
	  var diffInterval = 0;
	  if (options.interrupt) {
	    diffInterval = current.diff(base, "minutes");
	    diffInterval = diffInterval > 0 ? diffInterval : 0;
	  }
	
	  var addInterval = (Math.floor(diffInterval / interval) + 1) * interval;
	  var nextStart = base.clone().add(addInterval, "minutes");
	
	  nextStart = (0, _adjustDST2.default)(base, nextStart);
	
	  if (endAt && nextStart.isAfter(endAt)) {
	    return false;
	  }
	
	  return nextStart;
	};
	
	var _moment = __webpack_require__(2);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _adjustDST = __webpack_require__(4);
	
	var _adjustDST2 = _interopRequireDefault(_adjustDST);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (base, next) {
	  if (!_moment2.default.isMoment(base) || !_moment2.default.isMoment(next)) {
	    return false;
	  }
	  var result = next.clone();
	
	  if (base.isDST() != result.isDST()) {
	    if (base.isDST()) {
	      // fall back
	      result.add(1, "hours");
	    } else {
	      // spring forward
	      result.subtract(1, "hours");
	    }
	  }
	  return result;
	};
	
	var _moment = __webpack_require__(2);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (base, options) {
	  var current = arguments.length <= 2 || arguments[2] === undefined ? (0, _moment2.default)() : arguments[2];
	
	  var endAt = options.end_at;
	  var interval = options.interval > 0 ? options.interval : 1; // set invalid interval to 1
	
	  // convert to moment
	  if (!_moment2.default.isMoment(base)) base = (0, _moment2.default)(base);
	  if (endAt && !_moment2.default.isMoment(endAt)) endAt = (0, _moment2.default)(endAt);
	
	  // current moment in time
	  if (!_moment2.default.isMoment(current)) current = (0, _moment2.default)(current);
	
	  var diffInterval = 0;
	  if (options.interrupt) {
	    diffInterval = current.diff(base, "hours");
	    diffInterval = diffInterval > 0 ? diffInterval : 0;
	  }
	
	  var addInterval = (Math.floor(diffInterval / interval) + 1) * interval;
	  var nextStart = base.clone().add(addInterval, "hours");
	
	  nextStart = (0, _adjustDST2.default)(base, nextStart);
	
	  if (endAt && nextStart.isAfter(endAt)) {
	    return false;
	  }
	
	  return nextStart;
	};
	
	var _moment = __webpack_require__(2);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _adjustDST = __webpack_require__(4);
	
	var _adjustDST2 = _interopRequireDefault(_adjustDST);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (base, options) {
	  var current = arguments.length <= 2 || arguments[2] === undefined ? (0, _moment2.default)() : arguments[2];
	
	  var endAt = options.end_at;
	  var interval = options.interval > 0 ? options.interval : 1; // set invalid interval to 1
	
	  // convert to moment
	  if (!_moment2.default.isMoment(base)) base = (0, _moment2.default)(base);
	  if (endAt && !_moment2.default.isMoment(endAt)) endAt = (0, _moment2.default)(endAt);
	
	  // current moment in time
	  if (!_moment2.default.isMoment(current)) current = (0, _moment2.default)(current);
	
	  var diffInterval = 0;
	  if (options.interrupt) {
	    diffInterval = current.diff(base, "days");
	    diffInterval = diffInterval > 0 ? diffInterval : 0;
	  }
	
	  var addInterval = (Math.floor(diffInterval / interval) + 1) * interval;
	  var nextStart = base.clone().add(addInterval, "days");
	
	  if (endAt && nextStart.isAfter(endAt)) {
	    return false;
	  }
	
	  return nextStart;
	};
	
	var _moment = __webpack_require__(2);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _adjustDST = __webpack_require__(4);
	
	var _adjustDST2 = _interopRequireDefault(_adjustDST);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (base, options) {
	  var current = arguments.length <= 2 || arguments[2] === undefined ? (0, _moment2.default)() : arguments[2];
	
	  var endAt = options.end_at;
	  var interval = options.interval > 0 ? options.interval : 1; // set invalid interval to 1
	  var days_week = options.days_week;
	
	  // convert to moment
	  if (!_moment2.default.isMoment(base)) base = (0, _moment2.default)(base);
	  if (endAt && !_moment2.default.isMoment(endAt)) endAt = (0, _moment2.default)(endAt);
	
	  // current moment in time
	  if (!_moment2.default.isMoment(current)) current = (0, _moment2.default)(current);
	
	  var nextStart = false;
	  var diffInterval = 0;
	  var addInterval = 0;
	
	  if (days_week && days_week.length) {
	    (function () {
	      var daysOnWk = [];
	      var i = 0;
	      var dayWk = null;
	      var found = false;
	      var fRepeatWeekAfter = null; // holder for next repeat is on the following week*.
	
	      days_week.forEach(function (currentValue) {
	        daysOnWk.push(base.clone().day(currentValue));
	      });
	
	      for (i = 0; i < daysOnWk.length && !found; i++) {
	        dayWk = daysOnWk[i];
	
	        if (options.interrupt) {
	          if (dayWk.isAfter(current) && dayWk.isAfter(base)) {
	            nextStart = dayWk;
	            found = true;
	          }
	        } else {
	          // non interrupt
	          if (current.isBefore(dayWk) && base.isBefore(dayWk)) {
	            nextStart = dayWk;
	            found = true;
	          } else if (current.isAfter(dayWk) && base.isBefore(dayWk)) {
	            nextStart = dayWk;
	            found = true;
	          }
	        }
	      }
	
	      for (i = 0; i < daysOnWk.length && !found; i++) {
	        dayWk = daysOnWk[i];
	        diffInterval = 0;
	
	        if (options.interrupt) {
	          diffInterval = current.diff(base, "weeks");
	          diffInterval = diffInterval > 0 ? diffInterval - 1 : 0;
	        }
	
	        addInterval = (Math.floor(diffInterval / interval) + 1) * interval;
	        dayWk = dayWk.add(addInterval, "weeks");
	
	        if (!fRepeatWeekAfter) {
	          // take the firest repeat on this week and advance to next interval repeat.
	          // it is use when repeat is not on the week.
	          fRepeatWeekAfter = dayWk.clone().add(addInterval, "weeks");
	        }
	
	        if (options.interrupt) {
	          if (dayWk.isAfter(current)) {
	            nextStart = dayWk;
	            found = true;
	          }
	        } else {
	          if (current.isBefore(dayWk) && base.isBefore(dayWk)) {
	            nextStart = dayWk;
	            found = true;
	          } else if (current.isAfter(dayWk) && base.isBefore(dayWk)) {
	            nextStart = dayWk;
	            found = true;
	          }
	        }
	      }
	
	      if (!found && fRepeatWeekAfter) {
	        nextStart = fRepeatWeekAfter;
	      }
	    })();
	  } else {
	    diffInterval = 0;
	    if (options.interrupt) {
	      diffInterval = current.diff(base, "weeks");
	      diffInterval = diffInterval > 0 ? diffInterval : 0;
	    }
	
	    addInterval = (Math.floor(diffInterval / interval) + 1) * interval;
	    nextStart = base.clone().add(addInterval, "weeks");
	  }
	
	  if (endAt && nextStart.isAfter(endAt)) {
	    nextStart = false;
	  }
	
	  return nextStart;
	};
	
	var _moment = __webpack_require__(2);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _adjustDST = __webpack_require__(4);
	
	var _adjustDST2 = _interopRequireDefault(_adjustDST);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=NextMoment.js.map