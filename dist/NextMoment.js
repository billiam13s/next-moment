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
	
	var _monthly = __webpack_require__(8);
	
	var _monthly2 = _interopRequireDefault(_monthly);
	
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
	
	        case "monthly":
	          result = (0, _monthly2.default)(this.start, this.options, this.current);
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
	
	exports.default = function (base, options, current) {
	  var _checkVars = (0, _helper.checkVars)(current, base, options.interval, options.end_at, options.interrupt);
	
	  var CURRENT = _checkVars.CURRENT;
	  var BASE = _checkVars.BASE;
	  var INTERVAL = _checkVars.INTERVAL;
	  var END_AT = _checkVars.END_AT;
	  var INTERRUPT = _checkVars.INTERRUPT;
	
	
	  var diffInterval = 0;
	  if (INTERRUPT) {
	    diffInterval = CURRENT.diff(BASE, "minutes");
	    diffInterval = diffInterval > 0 ? diffInterval : 0;
	  }
	
	  var ADD_INTERVAL = (Math.floor(diffInterval / INTERVAL) + 1) * INTERVAL;
	  var nextStart = BASE.clone().add(ADD_INTERVAL, "minutes");
	
	  nextStart = (0, _helper.adjustDST)(BASE, nextStart);
	
	  if (END_AT && nextStart.isAfter(END_AT)) {
	    return false;
	  }
	
	  return nextStart;
	};
	
	var _moment = __webpack_require__(2);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _helper = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.checkVars = exports.adjustDST = undefined;
	
	var _moment = __webpack_require__(2);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function adjustDST(base, next) {
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
	
	function checkVars(current, base, interval, endAt, interrupt) {
	  // current moment in time
	  current = current || (0, _moment2.default)();
	  if (!_moment2.default.isMoment(current)) current = (0, _moment2.default)(current);
	
	  if (interrupt === undefined) interrupt = false;
	
	  // set invalid interval to 1
	  interval = interval > 0 ? interval : 1;
	
	  // convert to moment
	  if (!_moment2.default.isMoment(base)) base = (0, _moment2.default)(base);
	  if (endAt && !_moment2.default.isMoment(endAt)) endAt = (0, _moment2.default)(endAt);
	
	  return {
	    CURRENT: current,
	    BASE: base,
	    INTERVAL: interval,
	    END_AT: endAt,
	    INTERRUPT: interrupt
	  };
	}
	
	exports.adjustDST = adjustDST;
	exports.checkVars = checkVars;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (base, options, current) {
	  var _checkVars = (0, _helper.checkVars)(current, base, options.interval, options.end_at, options.interrupt);
	
	  var CURRENT = _checkVars.CURRENT;
	  var BASE = _checkVars.BASE;
	  var INTERVAL = _checkVars.INTERVAL;
	  var END_AT = _checkVars.END_AT;
	  var INTERRUPT = _checkVars.INTERRUPT;
	
	
	  var diffInterval = 0;
	  if (INTERRUPT) {
	    diffInterval = CURRENT.diff(BASE, "hours");
	    diffInterval = diffInterval > 0 ? diffInterval : 0;
	  }
	
	  var ADD_INTERVAL = (Math.floor(diffInterval / INTERVAL) + 1) * INTERVAL;
	  var nextStart = BASE.clone().add(ADD_INTERVAL, "hours");
	
	  nextStart = (0, _helper.adjustDST)(BASE, nextStart);
	
	  if (END_AT && nextStart.isAfter(END_AT)) {
	    return false;
	  }
	
	  return nextStart;
	};
	
	var _moment = __webpack_require__(2);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _helper = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (base, options, current) {
	  var _checkVars = (0, _helper.checkVars)(current, base, options.interval, options.end_at, options.interrupt);
	
	  var CURRENT = _checkVars.CURRENT;
	  var BASE = _checkVars.BASE;
	  var INTERVAL = _checkVars.INTERVAL;
	  var END_AT = _checkVars.END_AT;
	  var INTERRUPT = _checkVars.INTERRUPT;
	
	
	  var diffInterval = 0;
	  if (INTERRUPT) {
	    diffInterval = CURRENT.diff(BASE, "days");
	    diffInterval = diffInterval > 0 ? diffInterval : 0;
	  }
	
	  var ADD_INTERVAL = (Math.floor(diffInterval / INTERVAL) + 1) * INTERVAL;
	  var nextStart = BASE.clone().add(ADD_INTERVAL, "days");
	
	  if (END_AT && nextStart.isAfter(END_AT)) {
	    return false;
	  }
	
	  return nextStart;
	};
	
	var _moment = __webpack_require__(2);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _helper = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (base, options, current) {
	  var _checkVars = (0, _helper.checkVars)(current, base, options.interval, options.end_at, options.interrupt);
	
	  var CURRENT = _checkVars.CURRENT;
	  var BASE = _checkVars.BASE;
	  var INTERVAL = _checkVars.INTERVAL;
	  var END_AT = _checkVars.END_AT;
	  var INTERRUPT = _checkVars.INTERRUPT;
	
	
	  var days_week = options.days_week;
	
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
	        daysOnWk.push(BASE.clone().day(currentValue));
	      });
	
	      for (i = 0; i < daysOnWk.length && !found; i++) {
	        dayWk = daysOnWk[i];
	
	        if (INTERRUPT) {
	          if (dayWk.isAfter(CURRENT) && dayWk.isAfter(BASE)) {
	            nextStart = dayWk;
	            found = true;
	          }
	        } else {
	          // non interrupt
	          if (CURRENT.isBefore(dayWk) && BASE.isBefore(dayWk)) {
	            nextStart = dayWk;
	            found = true;
	          } else if (CURRENT.isAfter(dayWk) && BASE.isBefore(dayWk)) {
	            nextStart = dayWk;
	            found = true;
	          }
	        }
	      }
	
	      for (i = 0; i < daysOnWk.length && !found; i++) {
	        dayWk = daysOnWk[i];
	        diffInterval = 0;
	
	        if (INTERRUPT) {
	          diffInterval = CURRENT.diff(BASE, "weeks");
	          diffInterval = diffInterval > 0 ? diffInterval - 1 : 0;
	        }
	
	        addInterval = (Math.floor(diffInterval / INTERVAL) + 1) * INTERVAL;
	        dayWk = dayWk.add(addInterval, "weeks");
	
	        if (!fRepeatWeekAfter) {
	          // take the firest repeat on this week and advance to next interval repeat.
	          // it is use when repeat is not on the week.
	          fRepeatWeekAfter = dayWk.clone().add(addInterval, "weeks");
	        }
	
	        if (INTERRUPT) {
	          if (dayWk.isAfter(CURRENT)) {
	            nextStart = dayWk;
	            found = true;
	          }
	        } else {
	          if (CURRENT.isBefore(dayWk) && BASE.isBefore(dayWk)) {
	            nextStart = dayWk;
	            found = true;
	          } else if (CURRENT.isAfter(dayWk) && BASE.isBefore(dayWk)) {
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
	    if (INTERRUPT) {
	      diffInterval = CURRENT.diff(BASE, "weeks");
	      diffInterval = diffInterval > 0 ? diffInterval : 0;
	    }
	
	    addInterval = (Math.floor(diffInterval / INTERVAL) + 1) * INTERVAL;
	    nextStart = BASE.clone().add(addInterval, "weeks");
	  }
	
	  if (END_AT && nextStart.isAfter(END_AT)) {
	    nextStart = false;
	  }
	
	  return nextStart;
	};
	
	var _moment = __webpack_require__(2);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _helper = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (base, options, current) {
	  var _checkVars = (0, _helper.checkVars)(current, base, options.interval, options.end_at, options.interrupt);
	
	  var CURRENT = _checkVars.CURRENT;
	  var BASE = _checkVars.BASE;
	  var INTERVAL = _checkVars.INTERVAL;
	  var END_AT = _checkVars.END_AT;
	  var INTERRUPT = _checkVars.INTERRUPT;
	
	
	  var MONTHLY_REPEAT_BY = options.monthly_repeat_by;
	  var STICK_TO_LAST_DAY = options.stick_to_last_day;
	
	  var nextStart = false;
	
	  switch (MONTHLY_REPEAT_BY) {
	    case "day_of_week":
	      nextStart = calculateDayOfWeek(CURRENT, BASE, INTERVAL, STICK_TO_LAST_DAY, INTERRUPT);
	      break;
	    case "day_of_month":
	      nextStart = calculateDayOfMonth(CURRENT, BASE, INTERVAL, STICK_TO_LAST_DAY, INTERRUPT);
	      break;
	    default:
	
	  }
	
	  if (END_AT && _moment2.default.isMoment(nextStart) && nextStart.isAfter(END_AT)) {
	    nextStart = false;
	  }
	
	  return nextStart;
	};
	
	var _moment = __webpack_require__(2);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _helper = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function calculateDayOfWeek(CURRENT, BASE, INTERVAL, STICK_TO_LAST_DAY, INTERRUPT) {
	  var diffInterval = 0;
	  var addInterval = 0;
	}
	
	function calculateDayOfMonth(CURRENT, BASE, INTERVAL, STICK_TO_LAST_DAY, INTERRUPT) {
	  var nextStart = BASE.clone().add(INTERVAL, "months");
	
	  var LAST_DATE_OF_MONTH = BASE.clone().endOf("month");
	  var LAST_DATE_OF_NEXT_START = nextStart.clone().endOf("month");
	
	  if (BASE.isSame(LAST_DATE_OF_MONTH, 'day') && !nextStart.isSame(LAST_DATE_OF_NEXT_START, 'day') && LAST_DATE_OF_NEXT_START.isAfter(nextStart) && STICK_TO_LAST_DAY) {
	    nextStart = nextStart.clone().set("date", LAST_DATE_OF_NEXT_START.date());
	  }
	
	  if (INTERRUPT && CURRENT.isAfter(nextStart)) {
	    nextStart = calculateDayOfMonth(CURRENT, nextStart, INTERVAL, STICK_TO_LAST_DAY, INTERRUPT);
	  }
	
	  return nextStart;
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=NextMoment.js.map