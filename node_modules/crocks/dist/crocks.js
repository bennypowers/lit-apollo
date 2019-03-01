(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["crocks"] = factory();
	else
		root["crocks"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */
/** @author Henrique Limas */

var combinators = __webpack_require__(1)
var logic = __webpack_require__(12)
var predicates = __webpack_require__(25)

var crocks = {
  Arrow: __webpack_require__(96),
  Async: __webpack_require__(99),
  Const: __webpack_require__(105),
  Either: __webpack_require__(106),
  Equiv: __webpack_require__(109),
  Identity: __webpack_require__(110),
  IO: __webpack_require__(111),
  List: __webpack_require__(112),
  Maybe: __webpack_require__(115),
  Pair: __webpack_require__(116),
  Pred: __webpack_require__(118),
  Reader: __webpack_require__(119),
  ReaderT: __webpack_require__(120),
  Result: __webpack_require__(121),
  Star: __webpack_require__(122),
  State: __webpack_require__(123),
  Tuple: __webpack_require__(125),
  Unit: __webpack_require__(126),
  Writer: __webpack_require__(127)
}

var helpers = Object.assign({},
  __webpack_require__(128), {
    branch: __webpack_require__(171),
    find: __webpack_require__(172),
    prop: __webpack_require__(173),
    propPath: __webpack_require__(174),
    safe: __webpack_require__(175),
    safeAfter: __webpack_require__(176),
    safeLift: __webpack_require__(177),
    toPairs: __webpack_require__(178),
    tryCatch: __webpack_require__(179)
  }
)

var monoids = {
  All: __webpack_require__(180),
  Any: __webpack_require__(181),
  Assign: __webpack_require__(182),
  Endo: __webpack_require__(183),
  First: __webpack_require__(184),
  Last: __webpack_require__(185),
  Max: __webpack_require__(186),
  Min: __webpack_require__(187),
  Prod: __webpack_require__(188),
  Sum: __webpack_require__(189)
}

var pointfree = Object.assign({},
  __webpack_require__(190), {
    evalWith: __webpack_require__(226),
    execWith: __webpack_require__(227),
    fst: __webpack_require__(228),
    log: __webpack_require__(229),
    nmap: __webpack_require__(230),
    race: __webpack_require__(231),
    read: __webpack_require__(232),
    snd: __webpack_require__(233)
  }
)

var transforms = {
  arrayToList: __webpack_require__(234),
  asyncToPromise: __webpack_require__(235),
  eitherToAsync: __webpack_require__(236),
  eitherToFirst: __webpack_require__(237),
  eitherToLast: __webpack_require__(238),
  eitherToMaybe: __webpack_require__(239),
  eitherToResult: __webpack_require__(240),
  firstToAsync: __webpack_require__(241),
  firstToEither: __webpack_require__(242),
  firstToLast: __webpack_require__(243),
  firstToMaybe: __webpack_require__(244),
  firstToResult: __webpack_require__(245),
  lastToAsync: __webpack_require__(246),
  lastToEither: __webpack_require__(247),
  lastToFirst: __webpack_require__(248),
  lastToMaybe: __webpack_require__(249),
  lastToResult: __webpack_require__(250),
  listToArray: __webpack_require__(251),
  maybeToAsync: __webpack_require__(252),
  maybeToEither: __webpack_require__(253),
  maybeToFirst: __webpack_require__(254),
  maybeToLast: __webpack_require__(255),
  maybeToResult: __webpack_require__(256),
  resultToAsync: __webpack_require__(257),
  resultToEither: __webpack_require__(258),
  resultToFirst: __webpack_require__(259),
  resultToLast: __webpack_require__(260),
  resultToMaybe: __webpack_require__(261),
  writerToPair: __webpack_require__(262)
}

module.exports = Object.assign(
  {},
  combinators,
  crocks,
  helpers,
  logic,
  monoids,
  pointfree,
  predicates,
  transforms
)


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  applyTo: __webpack_require__(2),
  composeB: __webpack_require__(5),
  constant: __webpack_require__(7),
  converge: __webpack_require__(8),
  flip: __webpack_require__(9),
  identity: __webpack_require__(10),
  substitution: __webpack_require__(11)
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

// Application (Thrush)
// applyTo :: a -> (a -> b) -> b
function applyTo(x, f) {
  if(!isFunction(f)) {
    throw new TypeError('applyTo: Function required for second argument')
  }

  return f(x)
}

module.exports = curry(applyTo)


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)

function applyCurry(fn, arg) {
  if(!isFunction(fn)) { return fn }
  return fn.length > 1 ? fn.bind(null, arg) : fn.call(null, arg)
}

// curry : ((a, b, c) -> d) -> a -> b -> c -> d
function curry(fn) {
  return function() {
    var xs = [], len = arguments.length;
    while ( len-- ) xs[ len ] = arguments[ len ];

    var args =
      xs.length ? xs : [ undefined ]

    if(args.length < fn.length) {
      return curry(Function.bind.apply(fn, [ null ].concat(args)))
    }

    var val = args.length === fn.length
      ? fn.apply(null, args)
      : args.reduce(applyCurry, fn)

    if(isFunction(val)) {
      return curry(val)
    }

    return val
  }
}

module.exports = curry


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

// isFunction : a -> Boolean
function isFunction(fn) {
  return typeof fn === 'function'
}

module.exports = isFunction


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var compose = __webpack_require__(6)
var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

// Composition (Bluebird)
// composeB :: (b -> c) -> (a -> b) -> a -> c
function composeB(f, g) {
  if(!(isFunction(f) && isFunction(g))) {
    throw new TypeError(
      'composeB: Functions required for first two arguments'
    )
  }

  return compose(f, g)
}

module.exports = curry(composeB)


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

// Composition (Bluebird)
// compose : (b -> c) -> (a -> b) -> a -> c
function compose(f, g) {
  return function(x) {
    return f(g(x))
  }
}

module.exports = compose


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)

// Constant (Kestrel)
// constant : a -> b -> a
var constant =
  function (x) { return function () { return x; }; }

module.exports = curry(constant)


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Matt Ross (amsross) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

// converge (Phoenix or Starling Prime)
// (b -> c -> d) -> (a -> b) -> (a -> c) -> a -> d
function converge(f, g, h, x) {
  if(!isFunction(f) || !isFunction(g) || !isFunction(h)) {
    throw new TypeError('converge: Functions required for first three arguments')
  }

  return curry(f)(g(x), h(x))
}

module.exports = curry(converge)


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

// Flip (Cardinal)
//  flip :: (a -> b -> c) -> b -> a -> c
function flip(f, x, y) {
  if(!isFunction(f)) {
    throw new TypeError(
      'flip: Function required for first argument'
    )
  }

  return curry(f)(y, x)
}

module.exports = curry(flip)


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

// Identity (Idiot)
// identity :: a -> a
var identity =
  function (x) { return x; }

module.exports = identity


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

// Substitution (Starling)
// substitution : (a -> b -> c) -> (a -> b) -> a -> c
function substitution(f, g, x) {
  if(!(isFunction(f) && isFunction(g))) {
    throw new TypeError(
      'substitution: Functions required for first two arguments'
    )
  }

  return curry(f)(x, g(x))
}

module.exports = curry(substitution)


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  and: __webpack_require__(13),
  ifElse: __webpack_require__(19),
  implies: __webpack_require__(20),
  not: __webpack_require__(21),
  or: __webpack_require__(22),
  unless: __webpack_require__(23),
  when: __webpack_require__(24)
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isPredOrFunc = __webpack_require__(14)
var predOrFunc = __webpack_require__(18)

// and : (a -> Boolean) | Pred -> (a -> Boolean) | Pred -> a -> Boolean
function and(f, g) {
  if(!(isPredOrFunc(f) && isPredOrFunc(g))) {
    throw new TypeError(
      'and: Preds or predicate functions required for first two arguments'
    )
  }

  return function (x) { return !!(predOrFunc(f, x) && predOrFunc(g, x)); }
}

module.exports = curry(and)


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Dale Francis (dalefrancis88) */

var Pred = __webpack_require__(15).proxy('Pred')

var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

// isPredOrFunc :: ((a -> b) | pred) -> bool
var isPredOrFunc = function (predOrFunc) { return isFunction(predOrFunc) || isSameType(Pred, predOrFunc); }

module.exports = isPredOrFunc


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var _types = {
  'unk': function () { return 'unknown'; },
  'All': function () { return 'All'; },
  'Any': function () { return 'Any'; },
  'Arrow': function () { return 'Arrow'; },
  'Assign': function () { return 'Assign'; },
  'Async': function () { return 'Async'; },
  'Const': function (inner) { return ("Const(" + inner + ")"); },
  'Either': function () { return 'Either'; },
  'Endo': function () { return 'Endo'; },
  'Equiv': function () { return 'Equiv'; },
  'First': function () { return 'First'; },
  'Identity': function () { return 'Identity'; },
  'IO': function () { return 'IO'; },
  'Last': function () { return 'Last'; },
  'List': function () { return 'List'; },
  'Max': function () { return 'Max'; },
  'Maybe': function () { return 'Maybe'; },
  'Min': function () { return 'Min'; },
  'Pair': function () { return 'Pair'; },
  'Pred': function () { return 'Pred'; },
  'Prod': function () { return 'Prod'; },
  'Reader': function () { return 'Reader'; },
  'Result': function () { return 'Result'; },
  'Star': function () { return 'Star'; },
  'State': function () { return 'State'; },
  'Sum': function () { return 'Sum'; },
  'Tuple': function (n) { return (n + "-Tuple"); },
  'Unit': function () { return 'Unit'; },
  'Writer': function () { return 'Writer'; }
}

var type =
  function (type) { return _types[type] || _types['unk']; }

var proxy =
  function (t, ctx) { return ({ type: function () { return type(t)(ctx); } }); }

var typeFn = function (t, ver, ctx) {
  var typeStr = type(t)(ctx)
  return ("crocks/" + typeStr + "@" + (ver || 0))
}

module.exports = {
  proxy: proxy, type: type, typeFn: typeFn
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var type = __webpack_require__(17)

// isSameType :: Container m => (m, m) -> Boolean
function isSameType(x, y) {
  var tX = type(x)
  var tY = type(y)

  return tX === tY
    || isFunction(x) && x.name === tY
    || isFunction(y) && y.name === tX
}

module.exports = curry(isSameType)


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)

function type(x) {
  if(x) {
    if(isFunction(x.type)) {
      return x.type()
    }
  }
  return {}.toString.call(x).slice(8, -1)
}

module.exports = type


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)

function predOrFunc(pred, x) {
  if(isFunction(pred)) {
    return pred(x)
  }
  return pred.runWith(x)
}

module.exports = predOrFunc


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isPredOrFunc = __webpack_require__(14)
var predOrFunc = __webpack_require__(18)

// ifElse : (a -> Boolean) | Pred -> (a -> b) -> (a -> c) -> a -> (a | c)
function ifElse(pred, f, g) {
  if(!isPredOrFunc(pred)) {
    throw new TypeError(
      'ifElse: Pred or predicate function required for first argument'
    )
  }

  if(!(isFunction(f) && isFunction(g))) {
    throw new TypeError(
      'ifElse: Functions required for second and third arguments'
    )
  }

  return function (x) { return predOrFunc(pred, x) ? f(x) : g(x); }
}

module.exports = curry(ifElse)


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isPredOrFunc = __webpack_require__(14)
var predOrFunc = __webpack_require__(18)

// implies :: (a -> Boolean) | Pred -> (a -> Boolean) -> a -> Boolean
function implies(p, q) {
  if(!(isPredOrFunc(p) && isPredOrFunc(q))) {
    throw new TypeError(
      'implies: Preds or predicate functions required for first two arguments'
    )
  }

  return function (x) { return !predOrFunc(p, x) || !!predOrFunc(q, x); }
}

module.exports = curry(implies)


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isPredOrFunc = __webpack_require__(14)
var predOrFunc = __webpack_require__(18)

// not : (a -> Boolean) | Pred -> a -> Boolean
function not(pred, x) {
  if(!isPredOrFunc(pred)) {
    throw new TypeError(
      'not: Pred or predicate function required for first argument'
    )
  }

  return !predOrFunc(pred, x)
}

module.exports = curry(not)


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isPredOrFunc = __webpack_require__(14)
var predOrFunc = __webpack_require__(18)

// or : (a -> Boolean) | Pred -> (a -> Boolean) | Pred -> a -> Boolean
function or(f, g) {
  if(!(isPredOrFunc(f) && isPredOrFunc(g))) {
    throw new TypeError(
      'or: Preds or predicate functions required for first two arguments'
    )
  }

  return function (x) { return !!(predOrFunc(f, x) || predOrFunc(g, x)); }
}

module.exports = curry(or)


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isPredOrFunc = __webpack_require__(14)
var isFunction = __webpack_require__(4)
var predOrFunc = __webpack_require__(18)

// unless : (a -> Boolean) | Pred -> (a -> b) -> a | b
function unless(pred, f) {
  if(!isPredOrFunc(pred)) {
    throw new TypeError(
      'unless: Pred or predicate function required for first argument'
    )
  }

  if(!isFunction(f)) {
    throw new TypeError(
      'unless: Function required for second argument'
    )
  }

  return function (x) { return !predOrFunc(pred, x) ? f(x) : x; }
}

module.exports = curry(unless)


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var predOrFunc = __webpack_require__(18)
var isPredOrFunc = __webpack_require__(14)
var isFunction = __webpack_require__(4)

// when : (a -> Boolean) | Pred -> (a -> b) -> a -> b | a
function when(pred, f) {
  if(!isPredOrFunc(pred)) {
    throw new TypeError(
      'when: Pred or predicate function required for first argument'
    )
  }

  if(!isFunction(f)) {
    throw new TypeError(
      'when: Function required for second argument'
    )
  }

  return function (x) { return predOrFunc(pred, x) ? f(x) : x; }
}

module.exports = curry(when)


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  hasProp: __webpack_require__(26),
  hasPropPath: __webpack_require__(34),
  isAlt: __webpack_require__(36),
  isAlternative: __webpack_require__(41),
  isApplicative: __webpack_require__(45),
  isApply: __webpack_require__(46),
  isArray: __webpack_require__(47),
  isBifunctor: __webpack_require__(48),
  isBoolean: __webpack_require__(50),
  isCategory: __webpack_require__(51),
  isChain: __webpack_require__(53),
  isContravariant: __webpack_require__(55),
  isDefined: __webpack_require__(57),
  isEmpty: __webpack_require__(58),
  isExtend: __webpack_require__(59),
  isFoldable: __webpack_require__(61),
  isFunction: __webpack_require__(63),
  isFunctor: __webpack_require__(64),
  isInteger: __webpack_require__(65),
  isIterable: __webpack_require__(66),
  isMonad: __webpack_require__(68),
  isMonoid: __webpack_require__(70),
  isNil: __webpack_require__(73),
  isNumber: __webpack_require__(74),
  isObject: __webpack_require__(75),
  isPlus: __webpack_require__(76),
  isProfunctor: __webpack_require__(77),
  isPromise: __webpack_require__(79),
  isSame: __webpack_require__(81),
  isSameType: __webpack_require__(83),
  isSemigroup: __webpack_require__(84),
  isSemigroupoid: __webpack_require__(85),
  isSetoid: __webpack_require__(86),
  isString: __webpack_require__(87),
  isSymbol: __webpack_require__(88),
  isTraversable: __webpack_require__(90),
  propEq: __webpack_require__(91),
  propPathEq: __webpack_require__(93),
  propSatisfies: __webpack_require__(94),
  propPathSatisfies: __webpack_require__(95)
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isDefined = __webpack_require__(27)
var isEmpty = __webpack_require__(28)
var isInteger = __webpack_require__(30)
var isNil = __webpack_require__(32)
var isString = __webpack_require__(33)

// hasProp : (String | Integer) -> a -> Boolean
function hasProp(key, x) {
  if(!(isString(key) && !isEmpty(key) || isInteger(key))) {
    throw new TypeError(
      'hasProp: Non-empty String or Integer required for first argument'
    )
  }

  if(isNil(x)) {
    return false
  }

  return isDefined(x[key])
}

module.exports = curry(hasProp)


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

function isDefined(x) {
  return x !== undefined
}

module.exports = isDefined


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */
var isObject = __webpack_require__(29)

function isEmpty(x) {
  if(isObject(x)) {
    return !Object.keys(x).length
  }

  if(x && x.length !== undefined) {
    return !x.length
  }

  return true
}

module.exports = isEmpty


/***/ }),
/* 29 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var toString = Object.prototype.toString

// isObject : a -> Boolean
function isObject(x) {
  return !!x
    && toString.call(x) === '[object Object]'
}

module.exports = isObject


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isNumber = __webpack_require__(31)

// isInteger : a -> Boolean
function isInteger(x) {
  return isNumber(x)
    && isFinite(x)
    && Math.floor(x) === x
}

module.exports = isInteger


/***/ }),
/* 31 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

// isNumber : a -> Boolean
function isNumber(x) {
  return typeof x === 'number'
    && !isNaN(x)
}

module.exports = isNumber


/***/ }),
/* 32 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

// isNil : a -> Boolean
function isNil(x) {
  return x === undefined
    || x === null
    || Number.isNaN(x)
}

module.exports = isNil


/***/ }),
/* 33 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

// isString : a -> Boolean
function isString(x) {
  return typeof x === 'string'
}

module.exports = isString


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isArray = __webpack_require__(35)
var isDefined = __webpack_require__(27)
var isEmpty = __webpack_require__(28)
var isInteger = __webpack_require__(30)
var isNil = __webpack_require__(32)
var isString = __webpack_require__(33)

// hasPropPath : [ String | Integer ] -> a -> Boolean
function hasPropPath(keys, target) {
  if(!isArray(keys)) {
    throw new TypeError(
      'hasPropPath: Array of Non-empty Strings or Integers required for first argument'
    )
  }

  if(isNil(target)) {
    return false
  }

  var value = target

  for(var i = 0; i < keys.length; i++) {
    var key = keys[i]

    if(!(isString(key) && !isEmpty(key) || isInteger(key))) {
      throw new TypeError(
        'hasPropPath: Array of Non-empty Strings or Integers required for first argument'
      )
    }

    if(isNil(value)) {
      return false
    }

    value = value[key]

    if(!isDefined(value)) {
      return false
    }
  }

  return true
}

module.exports = curry(hasPropPath)


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

function isArray(x) {
  return Array.isArray(x)
}

module.exports = isArray


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(37)


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)
var isFunctor = __webpack_require__(40)

// isAlt : a -> Boolean
function isAlt(m) {
  return isFunctor(m)
    && hasAlg('alt', m)
}

module.exports = isAlt


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)
var fl = __webpack_require__(39)

var check = function (alg, m) { return isFunction(m[fl[alg]]) || isFunction(m[alg]); }

var checkImpl = function (alg, m) { return isFunction(m['@@implements']) && !!m['@@implements'](alg); }

var hasAlg = function (alg, m) { return !!m && (check(alg, m) || checkImpl(alg, m)); }

module.exports = hasAlg


/***/ }),
/* 39 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports = {
  alt: 'fantasy-land/alt',
  bimap: 'fantasy-land/bimap',
  chain: 'fantasy-land/chain',
  compose: 'fantasy-land/compose',
  concat: 'fantasy-land/concat',
  contramap: 'fantasy-land/contramap',
  empty: 'fantasy-land/empty',
  equals: 'fantasy-land/equals',
  extend: 'fantasy-land/extend',
  id: 'fantasy-land/id',
  map: 'fantasy-land/map',
  of: 'fantasy-land/of',
  promap: 'fantasy-land/promap',
  reduce: 'fantasy-land/reduce',
  zero: 'fantasy-land/zero'
}


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)

// isFunctor : a -> Boolean
function isFunctor(m) {
  return !!m && hasAlg('map', m)
}

module.exports = isFunctor


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isApplicative = __webpack_require__(42)
var isPlus = __webpack_require__(44)

// isAlternative : a -> Boolean
function isAlternative(m) {
  return isPlus(m)
    && isApplicative(m)
}

module.exports = isAlternative


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)
var isApply = __webpack_require__(43)

// isApplicative : a -> Boolean
function isApplicative(m) {
  return isApply(m)
    && (hasAlg('of', m) || hasAlg('of', m.constructor))
}

module.exports = isApplicative


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)
var isFunctor = __webpack_require__(40)

// isApply : a -> Boolean
function isApply(m) {
  return isFunctor(m)
    && hasAlg('ap', m)
}

module.exports = isApply


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)
var isAlt = __webpack_require__(37)

// isPlus : a -> Boolean
function isPlus(m) {
  return isAlt(m)
    && (hasAlg('zero', m) || hasAlg('zero', m.constructor))
}

module.exports = isPlus


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(42)


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(43)


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(35)


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(49)


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)
var isFunctor = __webpack_require__(40)

// isBifunctor : a -> Boolean
function isBifunctor(m) {
  return isFunctor(m)
    && hasAlg('bimap', m)
}

module.exports = isBifunctor


/***/ }),
/* 50 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

// isBoolean : a -> Boolean
function isBoolean(x) {
  return typeof x === 'boolean'
}

module.exports = isBoolean


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)
var isSemigroupoid = __webpack_require__(52)

// isCategory : a -> Boolean
function isCategory(m) {
  return isSemigroupoid(m)
    && (hasAlg('id', m) || hasAlg('id', m.constructor))
}

module.exports = isCategory


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)

// isSemigroupoid : a -> Boolean
function isSemigroupoid(m) {
  return !!m && hasAlg('compose', m)
}

module.exports = isSemigroupoid


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(54)


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)
var isApply = __webpack_require__(43)

// isChain : a -> Boolean
function isChain(m) {
  return isApply(m)
    && hasAlg('chain', m)
}

module.exports = isChain


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(56)


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)

// isContravariant : a -> Boolean
function isContravariant(m) {
  return !!m && hasAlg('contramap', m)
}

module.exports = isContravariant


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(27)


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(28)


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(60)


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)
var isFunctor = __webpack_require__(40)

// isExtend : a -> Boolean
function isExtend(m) {
  return isFunctor(m)
    && hasAlg('extend', m)
}

module.exports = isExtend


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(62)


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)

// isFoldable : a -> Boolean
function isFoldable(m) {
  return !!m
    && hasAlg('reduce', m)
}

module.exports = isFoldable


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(4)


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(40)


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(30)


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Dale Francis (dalefrancis88) */

module.exports =
  __webpack_require__(67)


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Dale Francis (dalefrancis88) */

var isFunction = __webpack_require__(4)
var isNil = __webpack_require__(32)

function isIterable(iterable) {
  return !isNil(iterable) && isFunction(iterable[Symbol.iterator])
}

module.exports = isIterable


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(69)


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)
var isApplicative = __webpack_require__(42)

// isMonad : a -> Boolean
function isMonad(m) {
  return isApplicative(m)
    && hasAlg('chain', m)
}

module.exports = isMonad



/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(71)


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)
var isSemigroup = __webpack_require__(72)

// isMonoid :: a -> Boolean
function isMonoid(m) {
  return isSemigroup(m)
    && (hasAlg('empty', m) || hasAlg('empty', m.constructor))
}

module.exports = isMonoid


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isString = __webpack_require__(33)
var hasAlg = __webpack_require__(38)

// isSemigroup : a -> Boolean
function isSemigroup(m) {
  return isString(m)
    || !!m && hasAlg('concat', m)
}

module.exports = isSemigroup


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(32)


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(31)


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(29)


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(44)


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(78)


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)
var isContravariant = __webpack_require__(56)
var isFunctor = __webpack_require__(40)

// isProfunctor :: a -> Boolean
function isProfunctor(m) {
  return isContravariant(m)
    && isFunctor(m)
    && hasAlg('promap', m)
}

module.exports = isProfunctor


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(80)


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)

// isPromise : a -> Boolean
function isPromise(p) {
  return !!p
    && isFunction(p.then)
    && isFunction(p.catch)
}

module.exports = isPromise


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)

var isSame = __webpack_require__(82)

module.exports = curry(isSame)


/***/ }),
/* 82 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

// isSame : (a, b) -> Boolean
function isSame(x, y) {
  if(x === y) {
    return x !== 0 || 1 / x === 1 / y
  }

  return x !== x && y !== y
}

module.exports = isSame


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(16)


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(72)


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(52)


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)

// isSetoid : a -> Boolean
function isSetoid(m) {
  return !!m
    && hasAlg('equals', m)
}

module.exports = isSetoid



/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(33)


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Robert Pearce (rpearce) */

module.exports =
  __webpack_require__(89)


/***/ }),
/* 89 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Robert Pearce (rpearce) */

// isSymbol : a -> Boolean
function isSymbol(x) {
  return typeof x === 'symbol'
}

module.exports = isSymbol


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)
var isFunctor = __webpack_require__(40)

// isTraversable : a -> Boolean
function isTraversable(m) {
  return isFunctor(m)
    && hasAlg('traverse', m)
}

module.exports = isTraversable


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Karthik Iyengar (karthikiyengar) */

var curry = __webpack_require__(3)
var equals = __webpack_require__(92)
var isDefined = __webpack_require__(27)
var isEmpty = __webpack_require__(28)
var isInteger = __webpack_require__(30)
var isNil = __webpack_require__(32)
var isString = __webpack_require__(33)

// propEq: (String | Integer) -> a -> b -> Boolean
function propEq(key, value, x) {
  if(!(isString(key) && !isEmpty(key) || isInteger(key))) {
    throw new TypeError(
      'propEq: Non-empty String or Integer required for first argument'
    )
  }

  if(isNil(x)) {
    return false
  }

  var target = x[key]

  return isDefined(target) && equals(target, value)
}

module.exports = curry(propEq)


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isSameType = __webpack_require__(16)
var isSame = __webpack_require__(82)
var hasAlg = __webpack_require__(38)
var type = __webpack_require__(17)
var fl = __webpack_require__(39)

var comp = function (a, b) { return a.valueOf() === b.valueOf(); }

var strats = {
  'Array': function (a, b) { return a.length === b.length
      && deepEquals(a, b); },

  'Date': function (a, b) { return isSame(a.valueOf(), b.valueOf()); },

  'Error': function (a, b) { return a.name === b.name
      && a.message === b.message; },

  'Object': function (a, b) { return Object.keys(a).length === Object.keys(b).length
      && deepEquals(a, b); },

  'RegExp': function (a, b) { return a.source === b.source
      && a.ignoreCase === b.ignoreCase
      && a.global === b.global
      && a.multiline === b.multiline
      && a.unicode === b.unicode; }
}

function deepEquals(a, b) {
  for(var key in a) {
    if(!equals(a[key], b[key])) {
      return false
    }
  }
  return true
}

function equals(a, b) {
  if(isSame(a, b)) {
    return true
  }

  if(!isSameType(a, b)) {
    return false
  }

  if(hasAlg('equals', a)) {
    return (b[fl.equals] || b.equals).call(b, a)
  }

  return (strats[type(a)] || comp)(a, b)
}

module.exports = equals


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Karthik Iyengar (karthikiyengar) */
/** @author Ian Hofmann-Hicks */

var curry = __webpack_require__(3)
var equals = __webpack_require__(92)
var isArray = __webpack_require__(35)
var isDefined = __webpack_require__(27)
var isEmpty  = __webpack_require__(28)
var isInteger = __webpack_require__(30)
var isNil = __webpack_require__(32)
var isString = __webpack_require__(33)

// propPathEq :: [ String | Number ] -> a -> Object -> Boolean
function propPathEq(keys, value, target) {
  if(!isArray(keys)) {
    throw new TypeError(
      'propPathEq: Array of Non-empty Strings or Integers required for first argument'
    )
  }

  if(isNil(target)) {
    return false
  }

  var acc = target
  for(var i = 0; i < keys.length; i++) {
    var key = keys[i]

    if(!(isString(key) && !isEmpty(key) || isInteger(key))) {
      throw new TypeError(
        'propPathEq: Array of Non-empty Strings or Integers required for first argument'
      )
    }

    if(isNil(acc)) {
      return false
    }

    acc = acc[key]

    if(!isDefined(acc)) {
      return false
    }
  }

  return equals(acc, value)
}

module.exports = curry(propPathEq)


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Ian Hofmann-Hicks (evilsoft) */

var curry = __webpack_require__(3)
var isEmpty = __webpack_require__(28)
var isInteger = __webpack_require__(30)
var isNil = __webpack_require__(32)
var isPredOrFunc = __webpack_require__(14)
var isString = __webpack_require__(33)
var predOrFunc = __webpack_require__(18)

// propSatisfies: (String | Integer) -> (a -> Boolean) -> b -> Boolean
// propSatisfies: (String | Integer) -> Pred a -> b -> Boolean
function propSatisfies(key, pred, x) {
  if(!(isString(key) && !isEmpty(key) || isInteger(key))) {
    throw new TypeError(
      'propSatisfies: Non-empty String or Integer required for first argument'
    )
  }

  if(!isPredOrFunc(pred)) {
    throw new TypeError(
      'propSatisfies: Pred or predicate function required for second argument'
    )
  }

  return isNil(x) ? false : !!predOrFunc(pred, x[key])
}

module.exports = curry(propSatisfies)


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Ian Hofmann-Hicks (evilsoft) */

var curry = __webpack_require__(3)
var isArray = __webpack_require__(35)
var isEmpty  = __webpack_require__(28)
var isInteger = __webpack_require__(30)
var isNil = __webpack_require__(32)
var isPredOrFunc = __webpack_require__(14)
var isString = __webpack_require__(33)
var predOrFunc = __webpack_require__(18)

// propPathSatisfies: [ (String | Integer) ] -> (a -> Boolean) -> b -> Boolean
// propPathSatisfies: [ (String | Integer) ] -> Pred a -> b -> Boolean
function propPathSatisfies(keys, pred, x) {
  if(!isArray(keys)) {
    throw new TypeError(
      'propPathSatisfies: Array of Non-empty Strings or Integers required for first argument'
    )
  }

  if(!isPredOrFunc(pred)) {
    throw new TypeError(
      'propPathSatisfies: Pred or predicate function required for second argument'
    )
  }

  if(isNil(x)) {
    return false
  }

  var target = x
  for(var i = 0; i < keys.length; i++) {
    var key = keys[i]

    if(!(isString(key) && !isEmpty(key) || isInteger(key))) {
      throw new TypeError(
        'propPathSatisfies: Array of Non-empty Strings or Integers required for first argument'
      )
    }

    if(isNil(target)) {
      return false
    }

    target = target[key]
  }

  return !!predOrFunc(pred, target)
}

module.exports = curry(propPathSatisfies)


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var type = __webpack_require__(15).type('Arrow')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var Pair = __webpack_require__(15).proxy('Pair')

var _id =
  function () { return Arrow(function (x) { return x; }); }

function Arrow(runWith) {
  var obj;

  if(!isFunction(runWith)) {
    throw new TypeError('Arrow: Function required')
  }

  var inspect =
    function () { return ("Arrow" + (_inspect(runWith))); }

  var id =
    _id

  var _map = function (fn) { return Arrow(function (x) { return fn(runWith(x)); }); }

  function compose(method) {
    return function(m) {
      if(!isSameType(Arrow, m)) {
        throw new TypeError(("Arrow." + method + ": Arrow required"))
      }

      return _map(m.runWith)
    }
  }

  function map(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Arrow." + method + ": Function required"))
      }

      return _map(fn)
    }
  }

  function contramap(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Arrow." + method + ": Function required"))
      }

      return Arrow(function (x) { return runWith(fn(x)); })
    }
  }

  function promap(method) {
    return function(l, r) {
      if(!isFunction(l) || !isFunction(r)) {
        throw new TypeError(("Arrow." + method + ": Functions required for both arguments"))
      }

      return Arrow(function (x) { return r(runWith(l(x))); })
    }
  }

  function first() {
    return Arrow(function(x) {
      if(!isSameType(Pair, x)) {
        throw TypeError('Arrow.first: Pair required for inner argument')
      }
      return x.bimap(runWith, function (x) { return x; })
    })
  }

  function second() {
    return Arrow(function(x) {
      if(!isSameType(Pair, x)) {
        throw TypeError('Arrow.second: Pair required for inner argument')
      }

      return x.bimap(function (x) { return x; }, runWith)
    })
  }

  function both() {
    return Arrow(function(x) {
      if(!isSameType(Pair, x)) {
        throw TypeError('Arrow.both: Pair required for inner argument')
      }
      return x.bimap(runWith, runWith)
    })
  }

  return ( obj = {
    inspect: inspect, toString: inspect, type: type,
    runWith: runWith, id: id, first: first, second: second, both: both,
    compose: compose('compose'),
    map: map('map'),
    contramap: contramap('contramap'),
    promap: promap('promap')
  }, obj[fl.id] = id, obj[fl.compose] = compose(fl.compose), obj[fl.map] = map(fl.map), obj[fl.contramap] = contramap(fl.contramap), obj[fl.promap] = promap(fl.promap), obj['@@type'] = _type, obj.constructor = Arrow, obj )
}

Arrow.id = _id
Arrow.type = type

Arrow[fl.id] = _id
Arrow['@@type'] = _type

Arrow['@@implements'] = _implements(
  [ 'compose', 'contramap', 'id', 'map', 'promap' ]
)

module.exports = Arrow


/***/ }),
/* 97 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var fulfills =
  function (algs) { return function (test) { return algs.indexOf(test) !== -1; }; }

module.exports = fulfills


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isArray = __webpack_require__(35)
var isFunction = __webpack_require__(4)
var isObject = __webpack_require__(29)
var isString = __webpack_require__(33)
var isSymbol = __webpack_require__(89)

function arrayInspect(xs) {
  return xs.length
    ? xs.map(inspect).reduce(function (a, x) { return a + ',' + x; })
    : xs
}

// inspect : a -> String
function inspect(x) {
  if(x && isFunction(x.inspect)) {
    return (" " + (x.inspect()))
  }

  if(isFunction(x)) {
    return ' Function'
  }

  if(isArray(x)) {
    return (" [" + (arrayInspect(x)) + " ]")
  }

  if(isObject(x)) {
    return (" { " + (Object.keys(x).reduce(function (acc, key) {
      return acc.concat([ (key + ":" + (inspect(x[key]))) ])
    }, []).join(', ')) + " }")
  }

  if(isString(x)) {
    return (" \"" + x + "\"")
  }

  if(isSymbol(x)) {
    return (" " + (x.toString()))
  }

  return (" " + x)
}

module.exports = inspect


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 4

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var type = __webpack_require__(15).type('Async')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var array = __webpack_require__(100)
var compose = __webpack_require__(6)
var once = __webpack_require__(103)
var unit = __webpack_require__(104)

var isArray = __webpack_require__(35)
var isFoldable = __webpack_require__(62)
var isFunction = __webpack_require__(4)
var isInteger = __webpack_require__(30)
var isPromise = __webpack_require__(80)
var isSameType = __webpack_require__(16)

var allAsyncs = function (xs) { return xs.reduce(function (acc, x) { return acc && isSameType(Async, x); }, true); }

var _of =
  function (x) { return Async(function (_, resolve) { return resolve(x); }); }

var Rejected =
  function (x) { return Async(function (reject) { return reject(x); }); }

function all(asyncs) {
  if(!(isFoldable(asyncs) && allAsyncs(asyncs))) {
    throw new TypeError('Async.all: Foldable structure of Asyncs required')
  }

  if(isArray(asyncs)) {
    return array.sequence(Async.of, asyncs)
  }

  return asyncs.sequence(Async.of)
}

function fromNode(fn, ctx) {
  if(!isFunction(fn)) {
    throw new TypeError('Async.fromNode: CPS function required')
  }

  return function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return Async(function (reject, resolve) {
      fn.apply(ctx,
        args.concat(
          function (err, data) { return err ? reject(err) : resolve(data); }
        )
      )
    });
  }
}

function fromPromise(fn) {
  if(!isFunction(fn)) {
    throw new TypeError('Async.fromPromise: Promise returning function required')
  }

  return function() {
    var promiseArgs = arguments

    return Async(function(reject, resolve) {
      var promise = fn.apply(null, promiseArgs)

      if(!isPromise(promise)) {
        throw new TypeError('Async.fromPromise: Promise returning function required')
      }

      promise
        .then(resolve, reject)
    })
  }
}

function rejectAfter(ms, value) {
  if(!(isInteger(ms) && ms >= 0)) {
    throw new TypeError(
      'Async.rejectAfter: Positive Integer required for first argument'
    )
  }

  return Async(function (rej) {
    var token = setTimeout(function () {
      rej(value)
    }, ms)

    return function () { clearTimeout(token) }
  })
}

function resolveAfter(ms, value) {
  if(!(isInteger(ms) && ms >= 0)) {
    throw new TypeError(
      'Async.resolveAfter: Positive Integer required for first argument'
    )
  }

  return Async(function (_, res) {
    var token = setTimeout(function () {
      res(value)
    }, ms)

    return function () { clearTimeout(token) }
  })
}

function Async(fn) {
  var obj;

  if(!isFunction(fn)) {
    throw new TypeError('Async: Function required')
  }

  var of =
    _of

  var inspect =
    function () { return ("Async" + (_inspect(fn))); }

  function fork(reject, resolve, cleanup) {
    if(!isFunction(reject) || !isFunction(resolve)) {
      throw new TypeError('Async.fork: Reject and resolve functions required')
    }

    var cancelled = false
    var settled = false

    var cancel =
      function () { cancelled = true }

    var forkCancel =
      isFunction(cleanup) ? cleanup : unit

    var settle = function (f, x) {
      if(!settled) {
        settled = true

        if(cancelled) {
          return unit()
        }

        return f(x)
      }
    }

    var internal = fn(
      settle.bind(null, reject),
      settle.bind(null, resolve)
    )

    var internalFn = isFunction(internal) ? internal : unit

    return once(function () { return forkCancel(cancel(internalFn())); })
  }

  function toPromise() {
    return new Promise(function(resolve, reject) {
      fork(reject, resolve)
    })
  }

  function race(m) {
    if(!isSameType(Async, m)) {
      throw new TypeError('Async.race: Async required')
    }

    return Async(function(reject, resolve) {
      var settle = once(
        function (resolved, value) { return resolved ? resolve(value) : reject(value); }
      )

      var res = settle.bind(null, true)
      var rej = settle.bind(null, false)

      var cancelOne = fork(rej, res)
      var cancelTwo = m.fork(rej, res)

      return function () { cancelOne(); cancelTwo() }
    })
  }

  function swap(l, r) {
    if(!isFunction(l) || !isFunction(r)) {
      throw new TypeError('Async.swap: Functions required for both arguments')
    }

    return Async(function(reject, resolve) {
      return fork(
        compose(resolve, l),
        compose(reject, r)
      )
    })
  }

  function coalesce(l, r) {
    if(!isFunction(l) || !isFunction(r)) {
      throw new TypeError('Async.coalesce: Functions required for both arguments')
    }

    return Async(function(reject, resolve) {
      return fork(
        compose(resolve, l),
        compose(resolve, r)
      )
    })
  }

  function map(method) {
    return function(mapFn) {
      if(!isFunction(mapFn)) {
        throw new TypeError(("Async." + method + ": Function required"))
      }

      return Async(function(reject, resolve) {
        return fork(reject, compose(resolve, mapFn))
      })
    }
  }

  function bimap(method) {
    return function(l, r) {
      if(!isFunction(l) || !isFunction(r)) {
        throw new TypeError(("Async." + method + ": Functions required for both arguments"))
      }

      return Async(function(reject, resolve) {
        return fork(
          compose(reject, l),
          compose(resolve, r)
        )
      })
    }
  }

  function alt(method) {
    return function(m) {
      if(!isSameType(Async, m)) {
        throw new TypeError(("Async." + method + ": Async required"))
      }

      return Async(function (rej, res) {
        var cancel = unit
        var innerCancel = unit
        cancel = fork(
          function () { innerCancel = m.fork(rej, res) },
          res
        )
        return once(function () { return innerCancel(cancel()); })
      })
    }
  }

  function ap(m) {
    if(!isSameType(Async, m)) {
      throw new TypeError('Async.ap: Async required')
    }

    return Async(function(reject, resolve) {
      var apFn = null
      var value = null
      var fnDone = false
      var valueDone = false
      var cancelled = false

      var cancel = function () { cancelled = true }
      var rejectOnce = once(reject)

      function resolveBoth() {
        if(!cancelled && fnDone && valueDone) {
          compose(resolve, apFn)(value)
        }
      }

      var fnCancel = fork(rejectOnce, function(f) {
        if(!isFunction(f)) {
          throw new TypeError('Async.ap: Wrapped value must be a function')
        }

        fnDone = true
        apFn = f
        resolveBoth()
      })

      var valueCancel = m.fork(rejectOnce, function (x) {
        valueDone = true
        value = x
        resolveBoth()
      })

      return function () { fnCancel(); valueCancel(); cancel() }
    })
  }

  function chain(method) {
    return function(mapFn) {
      if(!isFunction(mapFn)) {
        throw new TypeError(
          ("Async." + method + ": Async returning function required")
        )
      }

      return Async(function(reject, resolve) {
        var cancel = unit
        var innerCancel = unit
        cancel = fork(reject, function(x) {
          var m = mapFn(x)

          if(!isSameType(Async, m)) {
            throw new TypeError(
              ("Async." + method + ": Function must return another Async")
            )
          }

          innerCancel = m.fork(reject, resolve)
        })
        return once(function () { return innerCancel(cancel()); })
      })
    }
  }

  return ( obj = {
    fork: fork, toPromise: toPromise, inspect: inspect,
    toString: inspect, type: type,
    swap: swap, race: race, coalesce: coalesce, ap: ap,
    of: of,
    alt: alt('alt'),
    bimap: bimap('bimap'),
    map: map('map'),
    chain: chain('chain')
  }, obj[fl.of] = of, obj[fl.alt] = alt(fl.alt), obj[fl.bimap] = bimap(fl.bimap), obj[fl.map] = map(fl.map), obj[fl.chain] = chain(fl.chain), obj['@@type'] = _type, obj.constructor = Async, obj )
}

Async.of = _of
Async.type = type

Async[fl.of] = _of
Async['@@type'] = _type

Async.Rejected = Rejected
Async.Resolved = _of

Async.fromPromise = fromPromise
Async.fromNode = fromNode

Async.all = all
Async.rejectAfter = rejectAfter
Async.resolveAfter = resolveAfter

Async['@@implements'] = _implements(
  [ 'alt', 'ap', 'bimap', 'chain', 'map', 'of' ]
)

module.exports = Async


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isApply = __webpack_require__(43)
var isArray = __webpack_require__(35)
var isEmpty = __webpack_require__(28)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)
var isSemigroup = __webpack_require__(72)
var apOrFunc = __webpack_require__(101)

var identity =
  function (x) { return x; }

var concat =
  function (x) { return function (m) { return x.concat(m); }; }

function runTraverse(name, fn) {
  return function(acc, x) {
    var m = fn(x)

    if(!((isApply(acc) || isArray(acc)) && isSameType(acc, m))) {
      throw new TypeError(("Array." + name + ": Must wrap Applys of the same type"))
    }

    if(isArray(m)) {
      return ap(acc, map(function (v) { return concat([ v ]); }, m))
    }

    return m
      .map(function (v) { return concat([ v ]); })
      .ap(acc)
  }
}

var allFuncs =
  function (xs) { return xs.reduce(function (b, i) { return b && isFunction(i); }, true); }

var map =
  function (f, m) { return m.map(function (x) { return f(x); }); }

function ap(x, m) {
  if(!(m.length && allFuncs(m))) {
    throw new TypeError('Array.ap: Second Array must all be functions')
  }

  return m.reduce(function (acc, f) { return acc.concat(map(f, x)); }, [])
}

function chain(f, m) {
  return m.reduce(function(y, x) {
    var n = f(x)

    if(!isArray(n)) {
      throw new TypeError('Array.chain: Function must return an Array')
    }

    return y.concat(n)
  }, [])
}

function sequence(f, m) {
  var fn = apOrFunc(f)
  return m.reduceRight(runTraverse('sequence', identity), fn([]))
}

function traverse(f, fn, m) {
  var af = apOrFunc(f)
  return m.reduceRight(runTraverse('traverse', fn), af([]))
}

function fold(m) {
  if(isEmpty(m)) {
    throw new TypeError(
      'Array.fold: Non-empty Array of Semigroups required'
    )
  }

  var head =
    m[0]

  if(!isSemigroup(head)) {
    throw new TypeError('Array.fold: Must contain Semigroups of the same type')
  }

  return  m.reduce(function(x, y) {
    if(!isSameType(x, y)) {
      throw new TypeError('Array.fold: Must contain Semigroups of the same type')
    }
    return x.concat(y)
  })
}

function foldMap(fn, m) {
  if(isEmpty(m)) {
    throw new TypeError(
      'Array.foldMap: Non-empty Array required'
    )
  }

  var head =
    fn(m[0])

  if(!isSemigroup(head)) {
    throw new TypeError(
      'Array.foldMap: Provided function must return Semigroups of the same type'
    )
  }

  return m.length === 1
    ? head
    : m.slice(1).reduce(function(semi, x) {
      var val = fn(x)

      if(!(isSameType(semi, val) && isSemigroup(val))) {
        throw new TypeError(
          'Array.foldMap: Provided function must return Semigroups of the same type'
        )
      }

      return semi.concat(val)
    }, head)
}

module.exports = {
  ap: ap, chain: chain, fold: fold, foldMap: foldMap, map: map, sequence: sequence, traverse: traverse
}


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isApplicative = __webpack_require__(42)
var isTypeRepOf = __webpack_require__(102)

var apOrFunc = function (af) { return function (x) { return isApplicative(af)
    ? af.of(x)
    : isTypeRepOf(Array, af) ? [ x ] : af(x); }; }

module.exports = apOrFunc


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)

var isTypeRepOf = function (x, y) { return isFunction(y)
    && (x === y || x.name === y.name); }

module.exports = isTypeRepOf


/***/ }),
/* 103 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

// once : ((*) -> b) -> ((*) -> b)
function once(fn) {
  var called, result

  return function() {
    if(!called) {
      called = true
      result = fn.apply(null, arguments)
    }

    return result
  }
}

module.exports = once


/***/ }),
/* 104 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  Function.prototype


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 3

var _equals = __webpack_require__(92)
var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var _type = __webpack_require__(15).type('Const')
var typeFn = __webpack_require__(15).typeFn
var fl = __webpack_require__(39)

var isFunction = __webpack_require__(4)
var isMonoid = __webpack_require__(71)
var isSameType = __webpack_require__(16)
var isSemigroup = __webpack_require__(72)

var typeOrName =
  function (m) { return isFunction(m.type) ? m.type() : m.name; }

var constant = function (x) { return function () { return x; }; }

var empties = {
  Array: function () { return []; },
  String: function () { return ''; }
}

var getEmpty = function (T) { return T[fl.empty] || T.empty || empties[T.name]; }

var validMonoid = function (T) { return isMonoid(T) || T.name === 'String' || T.name === 'Array'; }

function _Const(T) {
  if(!isFunction(T)) {
    throw new TypeError('Const: TypeRep required for construction')
  }

  var type =
    constant(_type(typeOrName(T)))

  var typeString =
    typeFn('Const', VERSION, typeOrName(T))

  function empty(method) {
    return function() {
      if(!validMonoid(T)) {
        throw new TypeError(((type()) + "." + method + ": Must be fixed to a Monoid"))
      }

      return Const(getEmpty(T)())
    }
  }

  function of(method) {
    return function() {
      if(!validMonoid(T)) {
        throw new TypeError(((type()) + "." + method + ": Must be fixed to a Monoid"))
      }

      return Const(getEmpty(T)())
    }
  }

  function Const(value) {
    var obj;

    if(!isSameType(T, value)) {
      throw new TypeError(((type()) + ": " + (typeOrName(T)) + " required"))
    }

    var inspect =
      constant(("" + (type()) + (_inspect(value))))

    var valueOf =
      constant(value)

    var equals =
      function (m) { return isSameType(Const, m)
        && _equals(value, m.valueOf()); }

    function concat(method) {
      return function(m) {
        if(!isSemigroup(value)) {
          throw new TypeError(((type()) + "." + method + ": Must be fixed to a Semigroup"))
        }

        if(!isSameType(Const, m)) {
          throw new TypeError(((type()) + "." + method + ": " + (type()) + " required"))
        }

        return Const(value.concat(m.valueOf()))
      }
    }

    function map(method) {
      return function(fn) {
        if(!isFunction(fn)) {
          throw new TypeError(((type()) + "." + method + ": Function required"))
        }

        return Const(value)
      }
    }

    function ap(m) {
      if(!isSemigroup(value)) {
        throw new TypeError(((type()) + ".ap: Must be fixed to a Semigroup"))
      }

      if(!isSameType(Const, m)) {
        throw new TypeError(((type()) + ".ap: " + (type()) + " required"))
      }

      return Const(value.concat(m.valueOf()))
    }

    return ( obj = {
      inspect: inspect, toString: inspect,
      valueOf: valueOf, type: type, ap: ap, equals: equals,
      concat: concat('concat'),
      empty: empty('empty'),
      map: map('map'),
      of: of('of')
    }, obj[fl.concat] = concat(fl.concat), obj[fl.empty] = empty(fl.empty), obj[fl.equals] = equals, obj[fl.map] = map(fl.map), obj[fl.of] = of(fl.of), obj['@@type'] = typeString, obj.constructor = Const, obj )
  }

  Const.empty = empty('empty')
  Const.of = of('of')
  Const.type = type

  Const[fl.empty] = empty(fl.empty)
  Const[fl.of] = of(fl.of)
  Const['@@type'] = typeString

  Const['@@implements'] = _implements(
    [ 'ap', 'concat', 'empty', 'equals', 'map', 'of' ]
  )

  return Const
}

module.exports = _Const


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 3

var _defineUnion = __webpack_require__(107)
var _equals = __webpack_require__(92)
var _implements = __webpack_require__(97)
var _innerConcat = __webpack_require__(108)
var _inspect = __webpack_require__(98)
var type = __webpack_require__(15).type('Either')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var apOrFunc = __webpack_require__(101)
var compose = __webpack_require__(6)
var isArray = __webpack_require__(35)
var isApplicative = __webpack_require__(42)
var isApply = __webpack_require__(43)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var constant =
  function (x) { return function () { return x; }; }

var _either =
  _defineUnion({ Left: [ 'a' ], Right: [ 'b' ] })

var Left = _either.Left;
var Right = _either.Right;

Either.Left =
  compose(Either, Left)

Either.Right =
  compose(Either, Right)

var _of =
  Either.Right

function runSequence(x) {
  if(!(isApply(x) || isArray(x))) {
    throw new TypeError('Either.sequence: Must wrap an Apply')
  }

  return x.map(_of)
}

function Either(u) {
  var obj;

  if(!arguments.length) {
    throw new TypeError('Either: Must wrap something, try using Left or Right constructors')
  }

  var x = !_either.includes(u)
    ? Right(u)
    : u

  var equals =
    function (m) { return isSameType(Either, m) && either(
      function (x) { return m.either(function (y) { return _equals(y, x); }, constant(false)); },
      function (x) { return m.either(constant(false), function (y) { return _equals(y, x); }); }
    ); }

  var of =
    _of

  var inspect = constant(
    either(
      function (l) { return ("Left" + (_inspect(l))); },
      function (r) { return ("Right" + (_inspect(r))); }
    )
  )

  function either(f, g) {
    if(!isFunction(f) || !isFunction(g)) {
      throw new TypeError('Either.either: Requires both left and right functions')
    }

    return _either.caseOf({
      Left: f,
      Right: g
    }, x)
  }

  function concat(method) {
    return function(m) {
      if(!isSameType(Either, m)) {
        throw new TypeError(("Either." + method + ": Either of Semigroup required"))
      }

      return either(
        Either.Left,
        _innerConcat(("Either." + method), m)
      )
    }
  }

  function swap(f, g) {
    if(!isFunction(f) || !isFunction(g)) {
      throw new TypeError('Either.swap: Requires both left and right functions')
    }

    return either(
      compose(Either.Right, f),
      compose(Either.Left, g)
    )
  }

  function coalesce(f, g) {
    if(!isFunction(f) || !isFunction(g)) {
      throw new TypeError('Either.coalesce: Requires both left and right functions')
    }

    return Either.Right(either(f, g))
  }

  function map(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Either." + method + ": Function required"))
      }

      return either(Either.Left, compose(Either.Right, fn))
    }
  }

  function bimap(method) {
    return function(f, g) {
      if(!isFunction(f) || !isFunction(g)) {
        throw new TypeError(("Either." + method + ": Requires both left and right functions"))
      }

      return either(
        compose(Either.Left, f),
        compose(Either.Right, g)
      )
    }
  }

  function alt(method) {
    return function(m) {
      if(!isSameType(Either, m)) {
        throw new TypeError(("Either." + method + ": Either required"))
      }

      return either(
        constant(m),
        Either.Right
      )
    }
  }

  function ap(m) {
    if(!either(constant(true), isFunction)) {
      throw new TypeError('Either.ap: Wrapped value must be a function')
    }

    else if(!either(constant(true), constant(isSameType(Either, m)))) {
      throw new TypeError('Either.ap: Either required')
    }

    return either(
      Either.Left,
      function (fn) { return m.map(fn); }
    )
  }

  function chain(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Either." + method + ": Function required"))
      }

      var m = either(Either.Left, fn)

      if(!isSameType(Either, m)) {
        throw new TypeError(("Either." + method + ": Function must return an Either"))
      }

      return m
    }
  }

  function sequence(f) {
    if(!(isApplicative(f) || isFunction(f))) {
      throw new TypeError(
        'Either.sequence: Applicative TypeRep or Apply returning function required'
      )
    }

    var af =
      apOrFunc(f)

    return either(
      compose(af, Either.Left),
      runSequence
    )
  }

  function traverse(f, fn) {
    if(!(isApplicative(f) || isFunction(f))) {
      throw new TypeError(
        'Either.traverse: Applicative TypeRep or Apply returning function required for first argument'
      )
    }

    if(!isFunction(fn)) {
      throw new TypeError(
        'Either.traverse: Apply returning function required for second argument'
      )
    }

    var af =
      apOrFunc(f)

    var m =
      either(compose(af, Either.Left), fn)

    if(!(isApply(m) || isArray(m))) {
      throw new TypeError(
        'Either.traverse: Both functions must return an Apply of the same type'
      )
    }

    return either(
      constant(m),
      constant(m.map(_of))
    )
  }

  return ( obj = {
    inspect: inspect, toString: inspect, either: either,
    type: type, swap: swap, coalesce: coalesce, equals: equals,
    ap: ap, of: of, sequence: sequence, traverse: traverse,
    alt: alt('alt'),
    bimap: bimap('bimap'),
    concat: concat('concat'),
    chain: chain('chain'),
    map: map('map')
  }, obj[fl.of] = of, obj[fl.equals] = equals, obj[fl.alt] = alt(fl.alt), obj[fl.bimap] = bimap(fl.bimap), obj[fl.concat] = concat(fl.concat), obj[fl.map] = map(fl.map), obj[fl.chain] = chain(fl.chain), obj['@@type'] = _type, obj.constructor = Either, obj )
}

Either.of   = _of
Either.type = type

Either[fl.of] = _of
Either['@@type'] = _type

Either['@@implements'] = _implements(
  [ 'alt', 'ap', 'bimap', 'chain', 'concat', 'equals', 'map', 'of', 'traverse' ]
)

module.exports = Either


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isArray = __webpack_require__(35)
var isEmpty = __webpack_require__(28)
var isFunction = __webpack_require__(4)
var isObject = __webpack_require__(29)
var isString = __webpack_require__(33)

var constant = function (x) { return function () { return x; }; }

var isDefinition =
  function (x) { return isString(x) && x.length; }

function caseOf(defs) {
  return function(cases, m) {
    var tag = m.tag
    var def = defs[tag()]

    var args = def.reduce(
      function (xs, x) { return xs.concat([ m[x].value() ]); },
      []
    )

    return cases[tag()].apply(null, args)
  }
}

var includes =
  function (defs) { return function (m) { return !!m && isFunction(m.tag) && Object.keys(defs).indexOf(m.tag()) !== -1; }; }

function construction(def, tag) {
  return function() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return def.reduce(function(obj, key, index) {
      obj[key] = { value: constant(args[index]) }
      return obj
    }, { tag: constant(tag) })
  }
}

function defineUnion(defs) {
  if(!isObject(defs) || isEmpty(defs)) {
    throw new TypeError('defineUnion: Argument must be an Object containing definition lists')
  }

  return Object.keys(defs).reduce(function(obj, tag) {
    var def = defs[tag]

    if(!isArray(def) || !def.reduce(function (x, y) { return x && isDefinition(y); }, true)) {
      throw new TypeError('defineUnion: Definitions must be a list of non-empty string identifiers')
    }

    obj[tag] = construction(def, tag)

    return obj
  }, { caseOf: curry(caseOf(defs)), includes: curry(includes(defs)) })
}

module.exports = defineUnion


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isSameType = __webpack_require__(16)
var isSemigroup = __webpack_require__(72)

function innerConcat(method, m) {
  return function(left) {
    if(!isSemigroup(left)) {
      throw new TypeError((method + ": Both containers must contain Semigroups of the same type"))
    }

    return m.map(function (right) {
      if(!isSameType(left, right)) {
        throw new TypeError((method + ": Both containers must contain Semigroups of the same type"))
      }

      return left.concat(right)
    })
  }
}

module.exports = innerConcat


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var type = __webpack_require__(15).type('Equiv')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var _empty =
  function () { return Equiv(function () { return true; }); }

function Equiv(compare) {
  var obj;

  if(!isFunction(compare)) {
    throw new TypeError('Equiv: Comparison function required')
  }

  var compareWith = curry(
    function (x, y) { return !!compare(x, y); }
  )

  var inspect =
    function () { return ("Equiv" + (_inspect(compare))); }

  var empty =
    _empty

  var valueOf =
    function () { return compareWith; }

  function contramap(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Equiv." + method + ": Function required"))
      }

      return Equiv(
        function (x, y) { return compareWith(fn(x), fn(y)); }
      )
    }
  }

  function concat(method) {
    return function(m) {
      if(!isSameType(Equiv, m)) {
        throw new TypeError(("Equiv." + method + ": Equiv required"))
      }

      return Equiv(function (x, y) { return compareWith(x, y) && m.compareWith(x, y); }
      )
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect, type: type,
    compareWith: compareWith, valueOf: valueOf, empty: empty,
    concat: concat('concat'),
    contramap: contramap('contramap')
  }, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj[fl.contramap] = contramap(fl.contramap), obj['@@type'] = _type, obj.constructor = Equiv, obj )
}

Equiv.empty = _empty
Equiv.type = type

Equiv[fl.empty] = _empty
Equiv['@@type'] = _type

Equiv['@@implements'] = _implements(
  [ 'concat', 'contramap', 'empty' ]
)

module.exports = Equiv


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 3

var _equals = __webpack_require__(92)
var _implements = __webpack_require__(97)
var _innerConcat = __webpack_require__(108)
var _inspect = __webpack_require__(98)
var type = __webpack_require__(15).type('Identity')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var isArray = __webpack_require__(35)
var isApply = __webpack_require__(43)
var isApplicative = __webpack_require__(42)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var _of =
  Identity

function Identity(x) {
  var obj;

  if(!arguments.length) {
    throw new TypeError('Identity: Must wrap something')
  }

  var valueOf =
    function () { return x; }

  var of =
    _of

  var equals =
    function (m) { return isSameType(Identity, m)
      && _equals(x, m.valueOf()); }

  var inspect =
    function () { return ("Identity" + (_inspect(x))); }

  function concat(method) {
    return function(m) {
      if(!isSameType(Identity, m)) {
        throw new TypeError(("Identity." + method + ": Identity of Semigroup required"))
      }

      return _innerConcat(("Identity." + method), m)(x)
    }
  }

  function map(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Identity." + method + ": Function required"))
      }

      return Identity(fn(x))
    }
  }

  function ap(m) {
    if(!isFunction(x)) {
      throw new TypeError('Identity.ap: Wrapped value must be a function')
    }

    else if(!isSameType(Identity, m)) {
      throw new TypeError('Identity.ap: Identity required')
    }

    return m.map(x)
  }

  function chain(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Identity." + method + ": Function required"))
      }

      var m = fn(x)

      if(!isSameType(Identity, m)) {
        throw new TypeError(("Identity." + method + ": Function must return an Identity"))
      }

      return m
    }
  }

  function sequence(f) {
    if(!(isApplicative(f) || isFunction(f))) {
      throw new TypeError(
        'Identity.sequence: Applicative TypeRep or Apply returning function required'
      )
    }

    if(!(isApply(x) || isArray(x))) {
      throw new TypeError('Identity.sequence: Must wrap an Apply')
    }

    return x.map(_of)
  }

  function traverse(f, fn) {
    if(!(isApplicative(f) || isFunction(f))) {
      throw new TypeError(
        'Identity.traverse: Applicative TypeRep or Apply returning function required for first argument'
      )
    }

    if(!isFunction(fn)) {
      throw new TypeError(
        'Identity.traverse: Apply returning functions required for second argument'
      )
    }

    var m = fn(x)

    if(!(isApply(m) || isArray(m))) {
      throw new TypeError(
        'Identity.traverse: Both functions must return an Apply of the same type'
      )
    }

    return m.map(_of)
  }

  return ( obj = {
    inspect: inspect, toString: inspect, valueOf: valueOf,
    type: type, equals: equals, ap: ap, of: of, sequence: sequence, traverse: traverse,
    concat: concat('concat'),
    map: map('map'),
    chain: chain('chain')
  }, obj[fl.of] = of, obj[fl.equals] = equals, obj[fl.concat] = concat(fl.concat), obj[fl.map] = map(fl.map), obj[fl.chain] = chain(fl.chain), obj['@@type'] = _type, obj.constructor = Identity, obj )
}

Identity.of = _of
Identity.type = type

Identity[fl.of] = _of
Identity['@@type'] = _type

Identity['@@implements'] = _implements(
  [ 'ap', 'chain', 'concat', 'equals', 'map', 'of', 'traverse' ]
)

module.exports = Identity


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var type = __webpack_require__(15).type('IO')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var compose = __webpack_require__(6)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var _of =
  function (x) { return IO(function () { return x; }); }

function IO(run) {
  var obj;

  if(!isFunction(run)) {
    throw new TypeError('IO: Must wrap a function')
  }

  var of =
    _of

  var inspect =
    function () { return ("IO" + (_inspect(run))); }

  function map(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("IO." + method + ": Function required"))
      }

      return IO(compose(fn, run))
    }
  }

  function ap(m) {
    if(!isSameType(IO, m)) {
      throw new TypeError('IO.ap: IO required')
    }
    return IO(function () {
      var fn = run()
      if(!isFunction(fn)) {
        throw new TypeError('IO.ap: Wrapped value must be a function')
      }

      return m.map(fn).run()
    })

  }

  function chain(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("IO." + method + ": Function required"))
      }

      return IO(function() {
        var m = fn(run())

        if(!isSameType(IO, m)) {
          throw new TypeError(("IO." + method + ": Function must return an IO"))
        }

        return m.run()
      })
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect,
    run: run, type: type, ap: ap, of: of,
    map: map('map'),
    chain: chain('chain')
  }, obj[fl.of] = of, obj[fl.map] = map(fl.map), obj[fl.chain] = chain(fl.chain), obj['@@type'] = _type, obj.constructor = IO, obj )
}

IO.of = _of
IO.type = type

IO[fl.of] = _of
IO['@@type'] = _type

IO['@@implements'] = _implements(
  [ 'ap', 'chain', 'map', 'of' ]
)

module.exports = IO


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(113)


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 3

var _equals = __webpack_require__(92)
var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var type = __webpack_require__(15).type('List')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var array = __webpack_require__(100)

var apOrFunc = __webpack_require__(101)
var isApplicative = __webpack_require__(42)
var isApply = __webpack_require__(43)
var isArray = __webpack_require__(35)
var isEmpty = __webpack_require__(28)
var isFunction = __webpack_require__(4)
var isPredOrFunc = __webpack_require__(14)
var isSameType = __webpack_require__(16)
var isSemigroup = __webpack_require__(72)
var predOrFunc = __webpack_require__(18)

var not =
  function (fn) { return function (x) { return !fn(x); }; }

var _prepend =
  function (x) { return function (m) { return x.concat(m); }; }

var ref = __webpack_require__(114);
var Nothing = ref.Nothing;
var Just = ref.Just;

var _of =
  function (x) { return List([ x ]); }

var _empty =
  function () { return List([]); }

function fromArray(xs) {
  if(!isArray(xs)) {
    throw new TypeError('List.fromArray: Array required')
  }
  return xs.reduce(function (res, x) { return res.concat(List.of(x)); }, List.empty())
}

function applyTraverse(x, y) {
  if(isArray(x)) {
    return array.ap(x, array.map(function (v) { return _prepend(List.of(v)); }, y))
  }

  return y
    .map(function (v) { return _prepend(List.of(v)); })
    .ap(x)
}

function runSequence(acc, x) {
  if(!((isApply(acc) || isArray(acc)) && isSameType(acc, x))) {
    throw new TypeError(
      'List.sequence: Must wrap Applys of the same type'
    )
  }

  return applyTraverse(acc, x)
}

function runTraverse(f) {
  return function(acc, x) {
    var m = f(x)

    if(!((isApply(acc) || isArray(acc)) && isSameType(acc, m))) {
      throw new TypeError('List.traverse: Both functions must return an Apply of the same type')
    }

    return applyTraverse(acc, m)
  }
}

function List(x) {
  var obj;

  if(!arguments.length) {
    throw new TypeError('List: List must wrap something')
  }

  var xs =
    isArray(x) ? x.slice() : [ x ]

  function flatMap(method, fn) {
    return function(y, x) {
      var m = fn(x)

      if(!isSameType(List, m)) {
        throw new TypeError(("List." + method + ": Function must return a List"))
      }

      return y.concat(m.valueOf())
    }
  }

  var of =
    _of

  var valueOf =
    function () { return xs.slice(); }

  var toArray =
    valueOf

  var empty =
    _empty

  var inspect =
    function () { return ("List" + (_inspect(xs))); }

  var head =
    function () { return xs.length
      ? Just(xs[0])
      : Nothing(); }

  var tail =
    function () { return xs.length && xs.length > 1
      ? Just(List(xs.slice(1)))
      : Nothing(); }

  var cons =
    function (x) { return List([ x ].concat(xs)); }

  var equals = function (m) { return isSameType(List, m)
      && _equals(xs, m.valueOf()); }

  function concat(method) {
    return function(m) {
      if(!isSameType(List, m)) {
        throw new TypeError(("List." + method + ": List required"))
      }

      return List(xs.concat(m.valueOf()))
    }
  }

  function reduce(method) {
    return function(fn, i) {
      if(!isFunction(fn)) {
        throw new TypeError(("List." + method + ": Function required for first argument"))
      }

      return xs.reduce(fn, i)
    }
  }

  function reduceRight(fn, i) {
    if(!isFunction(fn)) {
      throw new TypeError('List.reduceRight: Function required for first argument')
    }

    return xs.reduceRight(fn, i)
  }

  function fold() {
    if(isEmpty(xs)) {
      throw new TypeError('List.fold: List must contain at least one Semigroup')
    }

    var head =
      xs[0]

    if(!isSemigroup(head)) {
      throw new TypeError('List.fold: List must contain Semigroups of the same type')
    }

    return xs.reduce(function(x, y) {
      if(!isSameType(x, y)) {
        throw new TypeError('List.fold: List must contain Semigroups of the same type')
      }

      return x.concat(y)
    })
  }

  function foldMap(fn) {
    if(!isFunction(fn)) {
      throw new TypeError(
        'List.foldMap: Semigroup returning function required'
      )
    }

    if(isEmpty(xs)) {
      throw new TypeError(
        'List.foldMap: List must not be empty'
      )
    }

    var head =
      fn(xs[0])

    if(!isSemigroup(head)) {
      throw new TypeError(
        'List.foldMap: Provided function must return Semigroups of the same type'
      )
    }

    return xs.length !== 1
      ? xs.slice(1).reduce(function(semi, x) {
        var val = fn(x)

        if(!(isSameType(semi, val) && isSemigroup(val))) {
          throw new TypeError(
            'List.foldMap: Provided function must return Semigroups of the same type'
          )
        }
        return semi.concat(val)
      }, head) : head
  }

  function filter(pred) {
    if(!isPredOrFunc(pred)) {
      throw new TypeError('List.filter: Pred or predicate function required')
    }

    return List(
      xs.reduce(
        function (x, y) { return predOrFunc(pred, y) ? x.concat([ y ]) : x; },
        []
      )
    )
  }

  function reject(pred) {
    if(!isPredOrFunc(pred)) {
      throw new TypeError('List.reject: Pred or predicate function required')
    }

    var fn = not(function (x) { return predOrFunc(pred, x); })

    return List(
      xs.reduce(
        function (x, y) { return fn(y) ? x.concat([ y ]) : x; },
        []
      )
    )
  }

  function map(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("List." + method + ": Function required"))
      }

      return List(xs.map(function (x) { return fn(x); }))
    }
  }

  function ap(m) {
    if(!isSameType(List, m)) {
      throw new TypeError('List.ap: List required')
    }

    var ar = m.valueOf()

    return List(
      xs.reduce(function (acc, fn) {
        if(!isFunction(fn)) {
          throw new TypeError('List.ap: Wrapped values must all be functions')
        }

        return acc.concat(ar.map(function (x) { return fn(x); }))
      }, [])
    )
  }

  function chain(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("List." + method + ": Function required"))
      }

      return List(xs.reduce(flatMap(method, fn), []))
    }
  }

  function sequence(f) {
    if(!(isApplicative(f) || isFunction(f))) {
      throw new TypeError(
        'List.sequence: Applicative TypeRep or Apply returning function required'
      )
    }

    var af =
      apOrFunc(f)

    return reduceRight(
      runSequence,
      af(List.empty())
    )
  }

  function traverse(f, fn) {
    if(!(isApplicative(f) || isFunction(f))) {
      throw new TypeError(
        'List.traverse: Applicative TypeRep or Apply returning function required for first argument'
      )
    }

    if(!isFunction(fn)) {
      throw new TypeError(
        'List.traverse: Apply returning functions required for second argument'
      )
    }

    var af =
      apOrFunc(f)

    return reduceRight(
      runTraverse(fn),
      af(List.empty())
    )
  }

  return ( obj = {
    inspect: inspect, toString: inspect, valueOf: valueOf, toArray: toArray,
    head: head, tail: tail, cons: cons, type: type, equals: equals, empty: empty,
    reduceRight: reduceRight, fold: fold, foldMap: foldMap, filter: filter, reject: reject,
    ap: ap, of: of, sequence: sequence, traverse: traverse,
    concat: concat('concat'),
    map: map('map'),
    chain: chain('chain'),
    reduce: reduce('reduce')
  }, obj[fl.of] = of, obj[fl.equals] = equals, obj[fl.concat] = concat(fl.concat), obj[fl.empty] = empty, obj[fl.map] = map(fl.map), obj[fl.chain] = chain(fl.chain), obj[fl.reduce] = reduce(fl.reduce), obj['@@type'] = _type, obj.constructor = List, obj )
}

List.of = _of
List.empty = _empty
List.type = type

List[fl.of] = _of
List[fl.empty] = _empty
List['@@type'] = _type

List.fromArray =
  fromArray

List['@@implements'] = _implements(
  [ 'ap', 'chain', 'concat', 'empty', 'equals', 'map', 'of', 'reduce', 'traverse' ]
)

module.exports = List


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 3

var _defineUnion = __webpack_require__(107)
var _equals = __webpack_require__(92)
var _implements = __webpack_require__(97)
var _innerConcat = __webpack_require__(108)
var _inspect = __webpack_require__(98)
var type = __webpack_require__(15).type('Maybe')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var apOrFunc = __webpack_require__(101)
var compose = __webpack_require__(6)
var isApplicative = __webpack_require__(42)
var isApply = __webpack_require__(43)
var isArray = __webpack_require__(35)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var constant = function (x) { return function () { return x; }; }
var identity = function (x) { return x; }

var _maybe =
  _defineUnion({ Nothing: [], Just: [ 'a' ] })

var Nothing =
  _maybe.Nothing

var Just =
  _maybe.Just

Maybe.Nothing =
  compose(Maybe, Nothing)

Maybe.Just =
  compose(Maybe, Just)

var _of =
  compose(Maybe, Just)

var _zero =
  compose(Maybe, Nothing)

function runSequence(x) {
  if(!(isApply(x) || isArray(x))) {
    throw new TypeError(
      'Maybe.sequence: Must wrap an Apply'
    )
  }

  return x.map(_of)
}

function Maybe(u) {
  var obj;

  if(!arguments.length) {
    throw new TypeError('Maybe: Must wrap something, try using Nothing or Just constructors')
  }

  var x =
    !_maybe.includes(u) ? Just(u) : u

  var of =
    _of

  var zero =
    _zero

  var option =
    function (n) { return either(constant(n), identity); }

  var equals =
    function (m) { return isSameType(Maybe, m) && either(
      constant(m.either(constant(true), constant(false))),
      function (x) { return m.either(constant(false), function (y) { return _equals(y, x); }); }
    ); }

  var inspect = function () { return either(
      constant('Nothing'),
      function (x) { return ("Just" + (_inspect(x))); }
    ); }

  function either(f, g) {
    if(!isFunction(f) || !isFunction(g)) {
      throw new TypeError('Maybe.either: Requires both left and right functions')
    }

    return _maybe.caseOf({
      Nothing: f,
      Just: g
    }, x)
  }

  function concat(method) {
    return function(m) {
      if(!isSameType(Maybe, m)) {
        throw new TypeError(("Maybe." + method + ": Maybe of Semigroup required"))
      }

      return either(
        Maybe.Nothing,
        _innerConcat(("Maybe." + method), m)
      )
    }
  }

  function coalesce(f, g) {
    if(!isFunction(f) || !isFunction(g)) {
      throw new TypeError('Maybe.coalesce: Requires both left and right functions')
    }

    return Maybe.Just(either(f, g))
  }

  function map(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Maybe." + method + ": Function required"))
      }

      return either(
        Maybe.Nothing,
        compose(Maybe.Just, fn)
      )
    }
  }

  function alt(method) {
    return function(m) {
      if(!isSameType(Maybe, m)) {
        throw new TypeError(("Maybe." + method + ": Maybe required"))
      }

      return either(
        constant(m),
        Maybe.Just
      )
    }
  }

  function ap(m) {
    var fn = option(constant(undefined))

    if(!isFunction(fn)) {
      throw new TypeError('Maybe.ap: Wrapped value must be a function')
    }

    else if(!isSameType(Maybe, m)) {
      throw new TypeError('Maybe.ap: Maybe required')
    }

    return either(
      Maybe.Nothing,
      m.map
    )
  }

  function chain(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Maybe." + method + ": Function required"))
      }

      var m = either(Maybe.Nothing, fn)

      if(!isSameType(Maybe, m)) {
        throw new TypeError(("Maybe." + method + ": Function must return a Maybe"))
      }

      return m
    }
  }

  function sequence(f) {
    if(!(isApplicative(f) || isFunction(f))) {
      throw new TypeError(
        'Maybe.sequence: Applicative TypeRep or Apply returning function required'
      )
    }

    var af =
      apOrFunc(f)

    return either(
      compose(af, Maybe.Nothing),
      runSequence
    )
  }

  function traverse(f, fn) {
    if(!(isApplicative(f) || isFunction(f))) {
      throw new TypeError(
        'Maybe.traverse: Applicative TypeRep or Apply returning function required for first argument'
      )
    }

    if(!isFunction(fn)) {
      throw new TypeError(
        'Maybe.traverse: Apply returning function required for second argument'
      )
    }

    var af =
      apOrFunc(f)

    var m =
      either(compose(af, Maybe.Nothing), fn)

    if(!(isApply(m) || isArray(m))) {
      throw new TypeError(
        'Maybe.traverse: Both functions must return an Apply of the same type'
      )
    }

    return either(
      constant(m),
      constant(m.map(_of))
    )
  }

  return ( obj = {
    inspect: inspect, toString: inspect, either: either,
    option: option, type: type, equals: equals, coalesce: coalesce,
    zero: zero, ap: ap, of: of, sequence: sequence,
    traverse: traverse,
    alt: alt('alt'),
    chain: chain('chain'),
    concat: concat('concat'),
    map: map('map')
  }, obj[fl.zero] = zero, obj[fl.of] = of, obj[fl.equals] = equals, obj[fl.alt] = alt(fl.alt), obj[fl.concat] = concat(fl.concat), obj[fl.map] = map(fl.map), obj[fl.chain] = chain(fl.chain), obj['@@type'] = _type, obj.constructor = Maybe, obj )
}

Maybe.of = _of
Maybe.zero = _zero
Maybe.type = type

Maybe[fl.of] = _of
Maybe[fl.zero] = _zero
Maybe['@@type'] = _type

Maybe['@@implements'] = _implements(
  [ 'alt', 'ap', 'chain', 'concat', 'equals', 'map', 'of', 'traverse', 'zero' ]
)

module.exports = Maybe


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(114)


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(117)


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 4

var _equals = __webpack_require__(92)
var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var type = __webpack_require__(15).type('Pair')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var isApplicative = __webpack_require__(42)
var isApply = __webpack_require__(43)
var isArray = __webpack_require__(35)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)
var isSemigroup = __webpack_require__(72)

function Pair(l, r) {
  var obj;

  if(arguments.length < 2) {
    throw new TypeError('Pair: Must provide a first and second value')
  }

  var fst =
    function () { return l; }

  var snd =
    function () { return r; }

  var inspect =
    function () { return ("Pair(" + (_inspect(l)) + "," + (_inspect(r)) + " )"); }

  var toArray =
    function () { return [ l, r ]; }

  function merge(fn) {
    if(!isFunction(fn)) {
      throw new TypeError('Pair.merge: Binary function required')
    }

    return fn(fst(), snd())
  }

  function equals(m) {
    return isSameType(Pair, m)
      && _equals(m.fst(), fst())
      && _equals(m.snd(), snd())
  }

  function concat(method) {
    return function(m) {
      if(!isSameType(Pair, m)) {
        throw new TypeError(("Pair." + method + ": Pair required"))
      }

      var lf = fst()
      var ls = snd()
      var rf = m.fst()
      var rs = m.snd()

      if(!(isSemigroup(lf) && isSemigroup(ls))) {
        throw new TypeError(("Pair." + method + ": Both Pairs must contain Semigroups of the same type"))
      }

      if(!(isSameType(lf, rf) && isSameType(ls, rs))) {
        throw new TypeError(("Pair." + method + ": Both Pairs must contain Semigroups of the same type"))
      }

      return Pair(
        lf.concat(rf),
        ls.concat(rs)
      )
    }
  }

  function swap(f, g) {
    if(!isFunction(f) || !isFunction(g)) {
      throw new TypeError('Pair.swap: Requires both left and right functions')
    }

    return Pair(g(r), f(l))
  }

  function map(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Pair." + method + ": Function required"))
      }

      return Pair(l, fn(r))
    }
  }

  function bimap(method) {
    return function(f, g) {
      if(!isFunction(f) || !isFunction(g)) {
        throw new TypeError(("Pair." + method + ": Function required for both arguments"))
      }

      return Pair(f(l), g(r))
    }
  }

  function ap(m) {
    if(!isSameType(Pair, m)) {
      throw new TypeError('Pair.ap: Pair required')
    }

    var fn = snd()

    if(!isFunction(fn)) {
      throw new TypeError('Pair.ap: Function required for second value')
    }

    var l = fst()
    var r = m.fst()

    if(!(isSemigroup(l) && isSameType(l, r))) {
      throw new TypeError('Pair.ap: Semigroups of the same type is required for first values')
    }

    return Pair(l.concat(r), fn(m.snd()))
  }

  function chain(method) {
    return function(fn) {
      var l = fst()

      if(!isFunction(fn)) {
        throw new TypeError(("Pair." + method + ": Function required"))
      }

      if(!isSemigroup(l)) {
        throw new TypeError(("Pair." + method + ": Semigroups of the same type required for first values"))
      }

      var m = fn(snd())

      if(!isSameType(Pair, m)) {
        throw new TypeError(("Pair." + method + ": Function must return a Pair"))
      }

      var r = m.fst()

      if(!isSameType(l, r)) {
        throw new TypeError(("Pair." + method + ": Semigroups of the same type required for first values"))
      }

      return Pair(
        l.concat(r),
        m.snd()
      )
    }
  }

  function sequence(f) {
    if(!(isApplicative(f) || isFunction(f))) {
      throw new TypeError(
        'Pair.sequence: Applicative TypeRep or Apply returning function required'
      )
    }

    if(!(isApply(r) || isArray(r))) {
      throw new TypeError(
        'Pair.sequence: Must wrap an Apply in the second'
      )
    }

    return r.map(function (v) { return Pair(l, v); })
  }

  function traverse(f, fn) {
    if(!(isApplicative(f) || isFunction(f))) {
      throw new TypeError(
        'Pair.traverse: Applicative TypeRep or Apply returning function required for first argument'
      )
    }

    if(!isFunction(fn)) {
      throw new TypeError(
        'Pair.traverse: Apply returning function required for second argument'
      )
    }

    var m = fn(r)

    if(!(isApply(m) || isArray(m))) {
      throw new TypeError(
        'Pair.traverse: Both functions must return an Apply of the same type'
      )
    }

    return m.map(function (v) { return Pair(l, v); })
  }

  function extend(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Pair." + method + ": Function required"))
      }

      return Pair(l, fn(Pair(l, r)))
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect, fst: fst,
    snd: snd, toArray: toArray, type: type, merge: merge, equals: equals,
    swap: swap, ap: ap, sequence: sequence, traverse: traverse,
    concat: concat('concat'),
    map: map('map'),
    bimap: bimap('bimap'),
    chain: chain('chain'),
    extend: extend('extend')
  }, obj[fl.equals] = equals, obj[fl.concat] = concat(fl.concat), obj[fl.map] = map(fl.map), obj[fl.bimap] = bimap(fl.bimap), obj[fl.chain] = chain(fl.chain), obj[fl.extend] = extend(fl.extend), obj['@@type'] = _type, obj.constructor = Pair, obj )
}

Pair.type = type
Pair['@@type'] = _type

Pair['@@implements'] = _implements(
  [ 'ap', 'bimap', 'chain', 'concat', 'extend', 'equals', 'map', 'traverse' ]
)

module.exports = Pair


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var type = __webpack_require__(15).type('Pred')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var compose = __webpack_require__(6)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var _empty =
  function () { return Pred(function () { return true; }); }

function Pred(pred) {
  var obj;

  if(!isFunction(pred)) {
    throw new TypeError('Pred: Predicate function required')
  }

  var runWith =
    function (x) { return !!pred(x); }

  var inspect =
    function () { return ("Pred" + (_inspect(runWith))); }

  var empty =
    _empty

  var valueOf =
    function () { return runWith; }

  function concat(method) {
    return function(m) {
      if(!isSameType(Pred, m)) {
        throw new TypeError(("Pred." + method + ": Pred required"))
      }

      return Pred(function (x) { return !!runWith(x) && !!m.runWith(x); })
    }
  }

  function contramap(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Pred." + method + ": Function required"))
      }

      return Pred(compose(runWith, fn))
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect,
    runWith: runWith, type: type, valueOf: valueOf, empty: empty,
    concat: concat('concat'),
    contramap: contramap('contramap')
  }, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj[fl.contramap] = contramap(fl.contramap), obj['@@type'] = _type, obj.constructor = Pred, obj )
}

Pred.empty = _empty
Pred.type = type

Pred[fl.empty] = _empty
Pred['@@type'] = _type

Pred['@@implements'] = _implements(
  [ 'concat', 'contramap', 'empty' ]
)

module.exports = Pred


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var type = __webpack_require__(15).type('Reader')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var compose = __webpack_require__(6)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var _of =
  function (x) { return Reader(function () { return x; }); }

function ask(fn) {
  if(!arguments.length) {
    return Reader(function (x) { return x; })
  }

  if(isFunction(fn)) {
    return Reader(fn)
  }

  throw new TypeError('Reader.ask: No argument or function required')
}

function Reader(runWith) {
  var obj;

  if(!arguments.length || !isFunction(runWith)) {
    throw new TypeError('Reader: Must wrap a function')
  }

  var of =
    _of

  var inspect =
    function () { return ("Reader" + (_inspect(runWith))); }

  function map(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Reader." + method + ": Function required"))
      }

      return Reader(compose(fn, runWith))
    }
  }

  function ap(m) {
    if(!isSameType(Reader, m)) {
      throw new TypeError('Reader.ap: Reader required')
    }

    return Reader(function(e) {
      var fn = runWith(e)

      if(!isFunction(fn)) {
        throw new TypeError('Reader.ap: Wrapped function must return a function')
      }

      return m.map(fn).runWith(e)
    })
  }

  function chain(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Reader." + method + ": Function required"))
      }

      return Reader(function(e) {
        var m = fn(runWith(e))

        if(!isSameType(Reader, m)) {
          throw new TypeError(("Reader." + method + ": Function must return a Reader"))
        }

        return m.runWith(e)
      })
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect, runWith: runWith,
    type: type, ap: ap, of: of,
    map: map('map'),
    chain: chain('chain')
  }, obj[fl.of] = of, obj[fl.map] = map(fl.map), obj[fl.chain] = chain(fl.chain), obj['@@type'] = _type, obj.constructor = Reader, obj )
}

Reader.of = _of
Reader.ask = ask
Reader.type = type

Reader[fl.of] = _of
Reader['@@type'] = _type

Reader['@@implements'] = _implements(
  [ 'ap', 'chain', 'map', 'of' ]
)

module.exports = Reader


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 1

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var _type = __webpack_require__(15).type('Reader')()
var _typeString = __webpack_require__(15).typeFn(_type, VERSION)
var fl = __webpack_require__(39)

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isMonad = __webpack_require__(69)
var isSameType = __webpack_require__(16)

function _ReaderT(Monad) {
  if(!isMonad(Monad)) {
    throw new TypeError('ReaderT: Monad required for construction')
  }

  var type =
    function () { return (_type + "( " + (Monad.type()) + " )"); }

  var typeString =
    _typeString + "( " + (Monad['@@type']) + " )"

  var of =
    function (x) { return ReaderT(function () { return Monad.of(x); }); }

  function ask(fn) {
    if(!arguments.length) {
      return ReaderT(Monad.of)
    }

    if(isFunction(fn)) {
      return ReaderT(Monad.of).map(fn)
    }

    throw new TypeError(((type()) + ".ask: No argument or function required"))
  }

  function lift(m) {
    if(!isSameType(Monad, m)) {
      throw new TypeError(((type()) + ".lift: " + (Monad.type()) + " instance required"))
    }

    return ReaderT(function () { return m; })
  }

  function liftFn(fn, x) {
    if(!isFunction(fn)) {
      throw new TypeError(((type()) + ".liftFn: " + (Monad.type()) + " returning function required"))
    }

    return ReaderT(function() {
      var m = fn(x)

      if(!isSameType(Monad, m)) {
        throw new TypeError(((type()) + ".liftFn: " + (Monad.type()) + " returning function required"))
      }

      return m
    })
  }

  function ReaderT(wrapped) {
    var obj;

    if(!isFunction(wrapped)) {
      throw new TypeError(((type()) + ": " + (Monad.type()) + " returning function required"))
    }

    var inspect =
      function () { return ("" + (type()) + (_inspect(wrapped))); }

    function runWith(x) {
      var result = wrapped(x)

      if(!isSameType(Monad, result)) {
        throw new TypeError(((type()) + ": " + (Monad.type()) + " must be returned by wrapped function"))
      }

      return result
    }

    function map(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(((type()) + ".map: Function required"))
      }

      return ReaderT(function (e) { return runWith(e).map(fn); })
    }

    function ap(m) {
      if(!isSameType(ReaderT, m)) {
        throw new TypeError(((type()) + ".ap: " + (type()) + " required"))
      }

      return ReaderT(function (e) { return runWith(e).ap(m.runWith(e)); })
    }

    function chain(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(((type()) + ".chain: " + (type()) + " returning function required"))
      }

      return ReaderT(function (e) { return runWith(e).chain(function (inner) {
          var m = fn(inner)

          if(!isSameType(ReaderT, m)) {
            throw new TypeError(((type()) + ".chain: Function must return a " + (type())))
          }

          return m.runWith(e)
        }); }
      )
    }

    return ( obj = {
      inspect: inspect, toString: inspect, type: type,
      runWith: runWith, of: of, map: map, ap: ap, chain: chain
    }, obj[fl.of] = of, obj[fl.map] = map, obj[fl.chain] = chain, obj['@@type'] = typeString, obj.constructor = ReaderT, obj )
  }

  ReaderT.type = type
  ReaderT.of = of
  ReaderT.ask = ask
  ReaderT.lift = lift
  ReaderT.liftFn = curry(liftFn)

  ReaderT[fl.of] = of
  ReaderT['@@type'] = typeString

  ReaderT['@@implements'] = _implements(
    [ 'ap', 'chain', 'map', 'of' ]
  )

  return ReaderT
}

module.exports = _ReaderT


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 3

var _defineUnion = __webpack_require__(107)
var _equals = __webpack_require__(92)
var _implements = __webpack_require__(97)
var _innerConcat = __webpack_require__(108)
var _inspect = __webpack_require__(98)
var type = __webpack_require__(15).type('Result')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var apOrFunc = __webpack_require__(101)
var compose = __webpack_require__(6)
var isApplicative = __webpack_require__(42)
var isApply = __webpack_require__(43)
var isArray = __webpack_require__(35)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)
var isSemigroup = __webpack_require__(72)

var constant =
  function (x) { return function () { return x; }; }

var _result =
  _defineUnion({ Err: [ 'a' ], Ok: [ 'b' ] })

Result.Err =
  compose(Result, _result.Err)

Result.Ok =
  compose(Result, _result.Ok)

var _of =
  Result.Ok

var concatApErr =
  function (m) { return function (x) { return Result.Err(m.either(
    function (y) { return isSemigroup(x) && isSameType(y, x) ? x.concat(y) : x; },
    function () { return x; }
  )); }; }

var concatAltErr =
  function (r) { return function (l) { return Result.Err(isSemigroup(r) && isSameType(l, r) ? l.concat(r) : r); }; }

function runSequence(x) {
  if(!(isApply(x) || isArray(x))) {
    throw new TypeError(
      'Result.sequence: Must wrap an Apply'
    )
  }

  return x.map(_of)
}

function Result(u) {
  var obj;

  if(!arguments.length) {
    throw new TypeError('Result: Must wrap something, try using Err or Ok constructors')
  }

  var x =
    !_result.includes(u) ? _result.Ok(u) : u

  var equals =
    function (m) { return isSameType(Result, m) && either(
      function (x) { return m.either(function (y) { return _equals(y, x); }, constant(false)); },
      function (x) { return m.either(constant(false), function (y) { return _equals(y, x); }); }
    ); }

  var of =
    _of

  var inspect = function () { return either(
      function (l) { return ("Err" + (_inspect(l))); },
      function (r) { return ("Ok" + (_inspect(r))); }
    ); }

  function either(f, g) {
    if(!isFunction(f) || !isFunction(g)) {
      throw new TypeError('Result.either: Requires both invalid and valid functions')
    }

    return _result.caseOf({
      Err: f,
      Ok: g
    }, x)
  }

  function concat(method) {
    return function(m) {
      if(!isSameType(Result, m)) {
        throw new TypeError(("Result." + method + ": Result of Semigroup required"))
      }

      return either(
        Result.Err,
        _innerConcat(("Result." + method), m)
      )
    }
  }

  function swap(f, g) {
    if(!isFunction(f) || !isFunction(g)) {
      throw new TypeError('Result.swap: Requires both left and right functions')
    }

    return either(
      compose(Result.Ok, f),
      compose(Result.Err, g)
    )
  }

  function coalesce(f, g) {
    if(!isFunction(f) || !isFunction(g)) {
      throw new TypeError('Result.coalesce: Requires both left and right functions')
    }

    return Result.Ok(either(f, g))
  }

  function map(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Result." + method + ": Function required"))
      }

      return either(
        Result.Err,
        compose(Result.Ok, fn)
      )
    }
  }

  function bimap(method) {
    return function(f, g) {
      if(!isFunction(f) || !isFunction(g)) {
        throw new TypeError(("Result." + method + ": Requires both left and right functions"))
      }

      return either(
        compose(Result.Err, f),
        compose(Result.Ok, g)
      )
    }
  }

  function alt(method) {
    return function(m) {
      if(!isSameType(Result, m)) {
        throw new TypeError(("Result." + method + ": Result required"))
      }

      return m.either(
        function (r) { return either(concatAltErr(r), Result.Ok); },
        function (r) { return either(function () { return Result.Ok(r); }, Result.Ok); }
      )
    }
  }

  function ap(m) {
    if(!isSameType(Result, m)) {
      throw new TypeError('Result.ap: Result required')
    }

    return either(
      concatApErr(m),
      function(fn) {
        if(!isFunction(fn)) {
          throw new TypeError('Result.ap: Wrapped value must be a function')
        }

        return m.either(Result.Err, function () { return m.map(fn); })
      }
    )
  }

  function chain(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Result." + method + ": Result returning function required"))
      }

      var m = either(Result.Err, fn)

      if(!isSameType(Result, m)) {
        throw new TypeError(("Result." + method + ": Function must return a Result"))
      }

      return m
    }
  }

  function sequence(f) {
    if(!(isApplicative(f) || isFunction(f))) {
      throw new TypeError(
        'Result.sequence: Applicative TypeRep or Apply returning function required'
      )
    }

    var af =
      apOrFunc(f)

    return either(
      compose(af, Result.Err),
      runSequence
    )
  }

  function traverse(f, fn) {
    if(!(isApplicative(f) || isFunction(f))) {
      throw new TypeError(
        'Result.traverse: Applicative TypeRep of Apply returning function required for first argument'
      )
    }

    if(!isFunction(fn)) {
      throw new TypeError(
        'Result.traverse: Apply returning functions required for both arguments'
      )
    }

    var af =
      apOrFunc(f)

    var m = either(compose(af, Result.Err), fn)

    if(!(isApply(m) || isArray(m))) {
      throw new TypeError('Result.traverse: Both functions must return an Apply of the same type')
    }

    return either(
      constant(m),
      constant(m.map(_of))
    )
  }

  return ( obj = {
    inspect: inspect, toString: inspect, equals: equals,
    type: type, either: either, swap: swap, coalesce: coalesce,
    ap: ap, of: of, sequence: sequence, traverse: traverse,
    alt: alt('alt'),
    bimap: bimap('bimap'),
    concat: concat('concat'),
    map: map('map'),
    chain: chain('chain')
  }, obj[fl.of] = of, obj[fl.equals] = equals, obj[fl.alt] = alt(fl.alt), obj[fl.bimap] = bimap(fl.bimap), obj[fl.concat] = concat(fl.concat), obj[fl.map] = map(fl.map), obj[fl.chain] = chain(fl.chain), obj['@@type'] = _type, obj.constructor = Result, obj )
}

Result.of = _of
Result.type = type

Result[fl.of] = _of
Result['@@type'] = _type

Result['@@implements'] = _implements(
  [ 'alt', 'ap', 'bimap', 'chain', 'concat', 'equals', 'map', 'of', 'traverse' ]
)

module.exports = Result


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var _type = __webpack_require__(15).type('Star')
var __type = __webpack_require__(15).typeFn(_type(), VERSION)
var fl = __webpack_require__(39)

var array = __webpack_require__(100)
var isFunction = __webpack_require__(4)
var isMonad = __webpack_require__(69)
var isSameType = __webpack_require__(16)

var Pair = __webpack_require__(117)

var merge =
  function (fn, m) { return m.merge(fn); }

var sequence =
  function (af, m) { return array.sequence(af, m); }

function _Star(Monad) {
  if(!isMonad(Monad)) {
    throw new TypeError('Star: Monad required for construction')
  }

  var _id =
    function () { return Star(Monad.of); }

  var innerType =
    Monad.type()

  var innerFullType =
    Monad['@@type']

  var outerType =
    (_type()) + "( " + innerType + " )"

  var typeString =
    __type + "( " + innerFullType + " )"

  var type =
    function () { return outerType; }

  function Star(runWith) {
    var obj;

    if(!isFunction(runWith)) {
      throw new TypeError((outerType + ": Function in the form (a -> m b) required"))
    }

    var inspect =
      function () { return ("" + outerType + (_inspect(runWith))); }

    var id =
      _id

    function compose(method) {
      return function(s) {
        if(!isSameType(Star, s)) {
          throw new TypeError((outerType + "." + method + ": " + outerType + " required"))
        }

        return Star(function(x) {
          var m = runWith(x)

          if(!isSameType(Monad, m)) {
            throw new TypeError((outerType + "." + method + ": Computations must return a type of " + innerType))
          }

          return m.chain(function(val) {
            var inner = s.runWith(val)

            if(!isSameType(m, inner)) {
              throw new TypeError((outerType + "." + method + ": Both computations must return a type of " + innerType))
            }

            return inner
          })
        })
      }
    }

    function map(method) {
      return function(fn) {
        if(!isFunction(fn)) {
          throw new TypeError((outerType + "." + method + ": Function required"))
        }

        return Star(function(x) {
          var m = runWith(x)

          if(!isSameType(Monad, m)) {
            throw new TypeError((outerType + "." + method + ": Computations must return a type of " + innerType))
          }

          return m.map(fn)
        })
      }
    }

    function contramap(method) {
      return function(fn) {
        if(!isFunction(fn)) {
          throw new TypeError((outerType + "." + method + ": Function required"))
        }

        return Star(function (x) { return runWith(fn(x)); })
      }
    }

    function promap(method) {
      return function(l, r) {
        if(!isFunction(l) || !isFunction(r)) {
          throw new TypeError((outerType + "." + method + ": Functions required for both arguments"))
        }

        return Star(function(x) {
          var m = runWith(l(x))

          if(!isSameType(Monad, m)) {
            throw new TypeError((outerType + "." + method + ": Computation must return a type of " + innerType))
          }

          return m.map(r)
        })
      }
    }

    function first() {
      return Star(function(x) {
        if(!isSameType(Pair, x)) {
          throw TypeError((outerType + ".first: Pair required for computation input"))
        }

        var m = runWith(x.fst())

        if(!isSameType(Monad, m)) {
          throw new TypeError((outerType + ".first: Computation must return a type of " + innerType))
        }

        return m.map(function (l) { return Pair(l, x.snd()); })
      })
    }

    function second() {
      return Star(function(x) {
        if(!isSameType(Pair, x)) {
          throw TypeError((outerType + ".second: Pair required for computation input"))
        }

        var m = runWith(x.snd())

        if(!isSameType(Monad, m)) {
          throw new TypeError((outerType + ".second: Computation must return a type of " + innerType))
        }

        return m.map(function (r) { return Pair(x.fst(), r); })
      })
    }

    function both() {
      return Star(function(x) {
        if(!isSameType(Pair, x)) {
          throw TypeError((outerType + ".both: Pair required for computation input"))
        }

        var p = x.bimap(runWith, runWith)
        var m = p.fst()

        if(!isSameType(Monad, m)) {
          throw new TypeError((outerType + ".both: Computation must return a type of " + innerType))
        }

        return sequence(m.of, merge(function (x, y) { return [ x, y ]; }, p)).map(function (x) { return Pair(x[0], x[1]); })
      })
    }

    return ( obj = {
      inspect: inspect, toString: inspect, type: type,
      runWith: runWith, id: id, first: first, second: second, both: both,
      compose: compose('compose'),
      contramap: contramap('contramap'),
      map: map('map'),
      promap: promap('promap')
    }, obj[fl.id] = id, obj[fl.compose] = compose(fl.compose), obj[fl.contramap] = contramap(fl.contramap), obj[fl.map] = map(fl.map), obj[fl.promap] = promap(fl.promap), obj['@@type'] = typeString, obj.constructor = Star, obj )
  }

  Star.id = _id
  Star.type = type

  Star[fl.id] = _id
  Star['@@type'] = typeString

  Star['@@implements'] = _implements(
    [ 'compose', 'contramap', 'id', 'map', 'promap' ]
  )

  return Star
}

module.exports = _Star


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var type = __webpack_require__(15).type('State')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var Pair = __webpack_require__(117)
var Unit = __webpack_require__(124)

var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var _of =
  function (x) { return State(function (s) { return Pair(x, s); }); }

function get(fn) {
  if(!arguments.length) {
    return State(function (s) { return Pair(s, s); })
  }

  if(isFunction(fn)) {
    return State(function (s) { return Pair(fn(s), s); })
  }

  throw new TypeError('State.get: No arguments or function required')
}

function modify(fn) {
  if(!isFunction(fn)) {
    throw new TypeError('State.modify: Function Required')
  }

  return State(function (s) { return Pair(Unit(), fn(s)); })
}

function State(fn) {
  var obj;

  if(!isFunction(fn)) {
    throw new TypeError('State: Must wrap a function in the form (s -> Pair a s)')
  }

  var of =
    _of

  var inspect =
    function () { return ("State" + (_inspect(fn))); }

  function runWith(state) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    var func = params[0]; if ( func === void 0 ) func = 'runWith';
    var m = fn(state)

    if(!isSameType(Pair, m)) {
      throw new TypeError(("State." + func + ": Must wrap a function in the form (s -> Pair a s)"))
    }

    return m
  }

  function execWith(s) {
    var pair = runWith(s, 'execWith')
    return pair.snd()
  }

  function evalWith(s) {
    var pair = runWith(s, 'evalWith')
    return pair.fst()
  }

  function map(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("State." + method + ": Function required"))
      }

      return State(function (s) {
        var m = runWith(s, method)
        return Pair(fn(m.fst()), m.snd())
      })
    }
  }

  function ap(m) {
    if(!isSameType(State, m)) {
      throw new TypeError('State.ap: State required')
    }

    return State(function (s) {
      var pair = runWith(s, 'ap')
      var fn = pair.fst()

      if(!isFunction(fn)) {
        throw new TypeError('State.ap: Source value must be a function')
      }

      return m.map(fn).runWith(pair.snd())
    })
  }

  function chain(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("State." + method + ": State returning function required"))
      }

      return State(function (s) {
        var pair = runWith(s, method)
        var m = fn(pair.fst())

        if(!isSameType(State, m)) {
          throw new TypeError(("State." + method + ": Function must return another State"))
        }

        return m.runWith(pair.snd())
      })
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect, runWith: runWith,
    execWith: execWith, evalWith: evalWith, type: type, ap: ap, of: of,
    map: map('map'),
    chain: chain('chain')
  }, obj[fl.of] = of, obj[fl.map] = map(fl.map), obj[fl.chain] = chain(fl.chain), obj['@@type'] = _type, obj.constructor = State, obj )
}

State.of = _of
State.get = get

State.modify = modify

State.put =
  function (x) { return modify(function () { return x; }); }

State.type = type

State[fl.of] = _of
State['@@type'] = _type

State['@@implements'] = _implements(
  [ 'ap', 'chain', 'map', 'of' ]
)

module.exports = State


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var type = __webpack_require__(15).type('Unit')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var _of =
  Unit

var _empty =
  Unit

function Unit() {
  var obj;

  var equals =
    function (m) { return isSameType(Unit, m); }

  var inspect =
    function () { return '()'; }

  var valueOf =
    function () { return undefined; }

  var of =
    _of

  var empty =
    _empty

  function concat(method) {
    return function(m) {
      if(!isSameType(Unit, m)) {
        throw new TypeError(("Unit." + method + ": Unit required"))
      }

      return Unit()
    }
  }

  function map(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Unit." + method + ": Function required"))
      }

      return Unit()
    }
  }

  function ap(m) {
    if(!isSameType(Unit, m)) {
      throw new TypeError('Unit.ap: Unit required')
    }

    return Unit()
  }

  function chain(method) {
    return function(fn) {
      if(!isFunction(fn)) {
        throw new TypeError(("Unit." + method + ": Function required"))
      }

      return Unit()
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect, valueOf: valueOf,
    type: type, equals: equals, empty: empty, ap: ap, of: of,
    concat: concat('concat'),
    map: map('map'),
    chain: chain('chain')
  }, obj[fl.of] = of, obj[fl.empty] = empty, obj[fl.equals] = equals, obj[fl.concat] = concat(fl.concat), obj[fl.map] = map(fl.map), obj[fl.chain] = chain(fl.chain), obj['@@type'] = _type, obj.constructor = Unit, obj )
}

Unit.of = _of
Unit.empty = _empty
Unit.type = type

Unit[fl.of] = _of
Unit[fl.empty] = _empty
Unit['@@type'] = _type

Unit['@@implements'] = _implements(
  [ 'ap', 'chain', 'concat', 'empty', 'equals', 'map', 'of' ]
)

module.exports = Unit


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Karthik Iyengar (karthikiyengar) */

var VERSION = 1

var _implements = __webpack_require__(97)
var _equals = __webpack_require__(92)
var _inspect = __webpack_require__(98)
var _type = __webpack_require__(15).type('Tuple')
var typeFn = __webpack_require__(15).typeFn
var fl = __webpack_require__(39)

var isFunction = __webpack_require__(4)
var isInteger = __webpack_require__(30)
var isSameType = __webpack_require__(16)
var isSemigroup = __webpack_require__(72)

var constant = function (x) { return function () { return x; }; }

function _Tuple(n) {
  if (!(isInteger(n) && n >= 1)) {
    throw new TypeError('Tuple: First argument must be an integer')
  }

  var type =
    constant(_type(n))

  var typeString =
    typeFn('Tuple', VERSION, n)

  var withProps = function (fn) {
    fn.type = type
    fn['@@type'] = typeString
    fn['@@implements'] = _implements([ 'map', 'concat', 'equals' ])
    return fn
  }

  var withLength = function (n, fn) {
    return Object.defineProperty(fn, 'length', {
      value: n
    })
  }

  /* eslint-disable no-unused-vars */
  switch (n) {
  case 1: return withProps(function(a) { return Tuple(n, arguments) })
  case 2: return withProps(function(a, b) { return Tuple(n, arguments) })
  case 3: return withProps(function(a, b, c) { return Tuple(n, arguments) })
  case 4: return withProps(function(a, b, c, d) { return Tuple(n, arguments) })
  case 5: return withProps(function(a, b, c, d, e) { return Tuple(n, arguments) })
  case 6: return withProps(function(a, b, c, d, e, f) { return Tuple(n, arguments) })
  case 7: return withProps(function(a, b, c, d, e, f, g) { return Tuple(n, arguments) })
  case 8: return withProps(function(a, b, c, d, e, f, g, h) { return Tuple(n, arguments) })
  case 9: return withProps(function(a, b, c, d, e, f, g, h, i) { return Tuple(n, arguments) })
  case 10: return withProps(function(a, b, c, d, e, f, g, h, i, j) { return Tuple(n, arguments) })
  default: return withLength(n, withProps(function() {
  var parts = [], len = arguments.length;
  while ( len-- ) parts[ len ] = arguments[ len ];
 return Tuple(n, parts) }))
  }
  /* eslint-enable no-unused-vars */

  function Tuple(n, args) {
    var obj;

    var parts = [].slice.call(args)
    if (n !== parts.length) {
      throw new TypeError(
        (n + "-Tuple: Expected " + n + " values, but got " + (parts.length))
      )
    }

    var inspect = function () { return (n + "-Tuple(" + (parts.map(_inspect).join(',')) + " )"); }

    function map(method) {
      return function(fn) {
        if (!isFunction(fn)) {
          throw new TypeError((n + "-Tuple." + method + ": Function required"))
        }

        return Tuple(n, parts
          .slice(0, parts.length - 1)
          .concat(fn(parts[parts.length - 1]))
        )
      }
    }

    var equals = function (m) { return isSameType({ type: type }, m)
        && _equals(parts, m.toArray()); }

    function concat(method) {
      return function(t) {
        if (!isSameType({ type: type }, t)) {
          throw new TypeError((n + "-Tuple." + method + ": Tuple of the same length required"))
        }

        var a = t.toArray()

        return Tuple(n, parts.map(function (v, i, o) {
          if (!(isSemigroup(a[i]) && isSemigroup(o[i]))) {
            throw new TypeError(
              (n + "-Tuple." + method + ": Both Tuples must contain Semigroups of the same type")
            )
          }

          if (!isSameType(a[i], o[i])) {
            throw new TypeError(
              (n + "-Tuple." + method + ": Both Tuples must contain Semigroups of the same type")
            )
          }

          return o[i].concat(a[i])
        }))
      }
    }

    function merge(fn) {
      if (!isFunction(fn)) {
        throw new TypeError((n + "-Tuple.merge: Function required"))
      }

      return fn.apply(void 0, parts)
    }

    function mapAll() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (args.length !== parts.length) {
        throw new TypeError(
          (n + "-Tuple.mapAll: Requires " + (parts.length) + " functions")
        )
      }

      return Tuple(
        n,
        parts.map(function (v, i) {
          if (!isFunction(args[i])) {
            throw new TypeError(
              (n + "-Tuple.mapAll: Functions required for all arguments")
            )
          }
          return args[i](v)
        })
      )
    }

    function project(index) {
      if (!isInteger(index) || index < 1 || index > n) {
        throw new TypeError(
          (n + "-Tuple.project: Index should be an integer between 1 and " + n)
        )
      }

      return parts[index - 1]
    }

    function toArray() {
      return parts.slice()
    }

    return ( obj = {
      inspect: inspect, toString: inspect, merge: merge,
      project: project, mapAll: mapAll, toArray: toArray,
      type: type, equals: equals,
      map: map('map'),
      concat: concat('concat')
    }, obj[fl.map] = map(fl.map), obj[fl.concat] = concat(fl.concat), obj[fl.equals] = equals, obj['@@type'] = typeString, obj.constructor = Tuple, obj )
  }
}

module.exports = _Tuple


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(124)


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _equals = __webpack_require__(92)
var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var __type = __webpack_require__(15).type('Writer')()
var _typeString = __webpack_require__(15).typeFn(__type, VERSION)
var fl = __webpack_require__(39)

var Pair = __webpack_require__(117)

var isFunction = __webpack_require__(4)
var isMonoid = __webpack_require__(71)
var isSameType = __webpack_require__(16)

var constant = function (x) { return function () { return x; }; }

function _Writer(Monoid) {
  if(!isMonoid(Monoid)) {
    throw new TypeError('Writer: Monoid required for construction')
  }

  var _of =
    function (x) { return Writer(Monoid.empty().valueOf(), x); }

  var _type =
    constant((__type + "( " + (Monoid.type()) + " )"))

  var typeString =
    _typeString + "( " + (Monoid['@@type']) + " )"

  function Writer(entry, val) {
    var obj;

    if(arguments.length !== 2) {
      throw new TypeError('Writer: Log entry and a value required')
    }

    var type =
      _type

    var of =
      _of

    var equals =
      function (m) { return isSameType(Writer, m)
        && _equals(m.valueOf(), val); }

    var valueOf =
      constant(val)

    var log =
      constant(Monoid(entry))

    var inspect =
      constant(("Writer(" + (_inspect(log())) + (_inspect(valueOf())) + " )"))

    var read = function () { return Pair(log(), val); }

    function map(method) {
      return function(fn) {
        if(!isFunction(fn)) {
          throw new TypeError(("Writer." + method + ": Function required"))
        }

        return Writer(log().valueOf(), fn(valueOf()))
      }
    }

    function ap(m) {
      if(!isFunction(val)) {
        throw new TypeError('Writer.ap: Wrapped value must be a function')
      }

      if(!isSameType(Writer, m)) {
        throw new TypeError('Writer.ap: Writer required')
      }

      return Writer(
        log().concat(m.log()).valueOf(),
        val(m.valueOf())
      )
    }

    function chain(method) {
      return function(fn) {
        if(!isFunction(fn)) {
          throw new TypeError(("Writer." + method + ": Function required"))
        }

        var w = fn(valueOf())

        if(!isSameType(Writer, w)) {
          throw new TypeError(("Writer." + method + ": Function must return a Writer"))
        }

        return Writer(log().concat(w.log()).valueOf(), w.valueOf())
      }
    }

    return ( obj = {
      inspect: inspect, toString: inspect, read: read,
      valueOf: valueOf, log: log, type: type, equals: equals,
      ap: ap, of: of,
      chain: chain('chain'),
      map: map('map')
    }, obj[fl.of] = of, obj[fl.equals] = equals, obj[fl.map] = map(fl.map), obj[fl.chain] = chain(fl.chain), obj['@@type'] = typeString, obj.constructor = Writer, obj )
  }

  Writer.of = _of
  Writer.type = _type

  Writer[fl.of] = _of
  Writer['@@type'] = typeString

  Writer['@@implements'] = _implements(
    [ 'ap', 'chain', 'equals', 'map', 'of' ]
  )

  return Writer
}

module.exports = _Writer


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  assign: __webpack_require__(129),
  assoc: __webpack_require__(131),
  binary: __webpack_require__(132),
  compose: __webpack_require__(134),
  composeK: __webpack_require__(135),
  composeP: __webpack_require__(136),
  composeS: __webpack_require__(137),
  curry: __webpack_require__(138),
  defaultProps: __webpack_require__(139),
  defaultTo: __webpack_require__(140),
  dissoc: __webpack_require__(141),
  fanout: __webpack_require__(142),
  fromPairs: __webpack_require__(143),
  liftA2: __webpack_require__(144),
  liftA3: __webpack_require__(145),
  liftN: __webpack_require__(146),
  mapProps: __webpack_require__(147),
  mapReduce: __webpack_require__(148),
  mconcat: __webpack_require__(149),
  mconcatMap: __webpack_require__(151),
  mreduce: __webpack_require__(152),
  mreduceMap: __webpack_require__(153),
  nAry: __webpack_require__(154),
  objOf: __webpack_require__(155),
  omit: __webpack_require__(156),
  once: __webpack_require__(157),
  partial: __webpack_require__(158),
  pick: __webpack_require__(159),
  pipe: __webpack_require__(160),
  pipeK: __webpack_require__(161),
  pipeP: __webpack_require__(162),
  pipeS: __webpack_require__(163),
  propOr: __webpack_require__(164),
  propPathOr: __webpack_require__(165),
  setPath: __webpack_require__(166),
  tap: __webpack_require__(167),
  unary: __webpack_require__(168),
  unit: __webpack_require__(169),
  unsetPath: __webpack_require__(170)
}


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isObject = __webpack_require__(29)
var object = __webpack_require__(130)

// assign : Object -> Object -> Object
function assign(x, m) {
  if(!(isObject(x) && isObject(m))) {
    throw new TypeError('assign: Objects required for both arguments')
  }

  return object.assign(x, m)
}

module.exports = curry(assign)


/***/ }),
/* 130 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

function rejectUnit(obj) {
  return function(acc, key) {
    var value = obj[key]

    if(value !== undefined) {
      acc[key] = value
    }
    return acc
  }
}

function assign(x, m) {
  var result = Object.keys(m).reduce(rejectUnit(m), {})
  return Object.keys(x).reduce(rejectUnit(x), result)
}

function filter(f, m) {
  return Object.keys(m).reduce(function (acc, key) {
    if(f(m[key])) {
      acc[key] = m[key]
    }
    return acc
  }, {})
}

function map(f, m) {
  return Object.keys(m).reduce(function (acc, key) {
    acc[key] = f(m[key])
    return acc
  }, {})
}

module.exports = {
  assign: assign,
  filter: filter,
  map: map
}


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isObject = __webpack_require__(29)
var isString = __webpack_require__(33)
var object = __webpack_require__(130)

// assoc : String -> a -> Object -> Object
function assoc(key, val, obj) {
  var obj$1;

  if(!isString(key)) {
    throw new TypeError('assoc: String required for first argument')
  }

  if(!isObject(obj)) {
    throw new TypeError('assoc: Object required for third argument')
  }
  return object.assign(( obj$1 = {}, obj$1[key] = val, obj$1 ), obj)
}

module.exports = curry(assoc)


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curryN = __webpack_require__(133)
var isFunction = __webpack_require__(4)

// binary : (* -> c) -> a -> b -> c
function binary(fn) {
  if(!isFunction(fn)) {
    throw new TypeError('binary: Function required')
  }

  return curryN(2, fn)
}

module.exports = binary


/***/ }),
/* 133 */
/***/ (function(module, exports) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

function curryN(n, fn) {
  return function() {
    var xs = [], len = arguments.length;
    while ( len-- ) xs[ len ] = arguments[ len ];

    var args =
      xs.length ? xs : [ undefined ]

    var remaining =
       Math.floor(n) - args.length

    return remaining > 0
      ? curryN(remaining, Function.bind.apply(fn, [ null ].concat(args)))
      : fn.apply(null, args.slice(0, n))
  }
}

module.exports = curryN


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)

var err = 'compose: Functions required'

function applyPipe(f, g) {
  if(!isFunction(g)) {
    throw new TypeError(err)
  }

  return function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return g.call(null, f.apply(null, args));
  }
}

// compose : ((y -> z), (x -> y), ..., (a -> b)) -> a -> z
function compose() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  if(!arguments.length) {
    throw new TypeError(err)
  }

  var fns =
    args.slice().reverse()

  var head =
    fns[0]

  if(!isFunction(head)) {
    throw new TypeError(err)
  }

  var tail =
    fns.slice(1).concat(function (x) { return x; })

  return tail.reduce(applyPipe, head)
}

module.exports = compose


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isChain = __webpack_require__(54)
var isFunction = __webpack_require__(4)

var err = 'composeK: Chain returning functions of the same type required'

// composeK : Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> a -> m z
function composeK() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  if(!arguments.length) {
    throw new TypeError(err)
  }

  var fns =
    args.slice().reverse()

  var head =
    fns[0]

  if(!isFunction(head)) {
    throw new TypeError(err)
  }

  if(fns.length === 1) {
    return head
  }

  var tail = fns.slice(1).reduce(function (comp, fn) {
    if(!isFunction(fn)) {
      throw new TypeError(err)
    }

    return function(m) {
      if(!isChain(m)) {
        throw new TypeError(err)
      }
      return comp(m).chain(fn)
    }
  }, function (x) { return x; })

  return function() {
    return tail(head.apply(null, arguments))
  }
}

module.exports = composeK


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)
var isPromise = __webpack_require__(80)

var err = 'composeP: Promise returning functions required'

function applyPipe(f, g) {
  if(!isFunction(g)) {
    throw new TypeError(err)
  }

  return function() {
    var p = f.apply(null, arguments)

    if(!isPromise(p)) {
      throw new TypeError(err)
    }

    return p.then(g)
  }
}

function composeP() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  if(!arguments.length) {
    throw new TypeError(err)
  }

  var fns =
    args.reverse()

  var head =
    fns[0]

  if(!isFunction(head)) {
    throw new TypeError(err)
  }

  var tail =
    fns.slice(1).concat(function (x) { return x; })

  return tail.reduce(applyPipe, head)
}

module.exports = composeP


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isSameType = __webpack_require__(16)
var isSemigroupoid = __webpack_require__(52)

var err = 'composeS: Semigroupoids of the same type required'

// composeS : Semigroupoid s => (s y z, s x y, ..., s a b) -> s a z
function composeS() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  if(!arguments.length) {
    throw new TypeError(err)
  }

  var ms =
    args.slice().reverse()

  var head =
    ms[0]

  if(!isSemigroupoid(head)) {
    throw new TypeError(err)
  }

  if(ms.length === 1) {
    return head
  }

  return ms.slice().reduce(function (comp, m) {
    if(!isSameType(comp, m)) {
      throw new TypeError(err)
    }

    return comp.compose(m)
  })
}

module.exports = composeS


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var _curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

// curry : ((a, b, c) -> d) -> a -> b -> c -> d
function curry(fn) {
  if(!isFunction(fn)) {
    throw new TypeError('curry: Function required')
  }

  return _curry(fn)
}

module.exports = curry


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isObject = __webpack_require__(29)
var object = __webpack_require__(130)

// defaultProps : Object -> Object -> Object
function defaultProps(x, m) {
  if(!isObject(x) || !isObject(m)) {
    throw new TypeError('defaultProps: Objects required for both arguments')
  }

  return object.assign(m, x)
}

module.exports = curry(defaultProps)


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isNil = __webpack_require__(32)

// defaultTo : a -> b -> (a | b)
function defaultTo(def, val) {
  return isNil(val) ? def : val
}

module.exports = curry(defaultTo)


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isString = __webpack_require__(33)
var isObject  = __webpack_require__(29)

function applyDissoc(key, obj) {
  return function(acc, k) {
    if(obj[k] !== undefined && k !== key) {
      acc[k] = obj[k]
    }
    return acc
  }
}

// dissoc : String -> Object -> Object
function dissoc(key, obj) {
  if(!isString(key)) {
    throw new TypeError('dissoc: String required for first argument')
  }

  if(!isObject(obj)) {
    throw new TypeError('dissoc: Object required for second argument')
  }

  return Object.keys(obj).reduce(applyDissoc(key, obj), {})
}

module.exports = curry(dissoc)


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Pair = __webpack_require__(117)

var curry = __webpack_require__(3)
var isContravariant = __webpack_require__(56)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)
var isSemigroupoid = __webpack_require__(52)

var valid = function (x, y) { return isSameType(x, y)
    && isSemigroupoid(x)
    && isContravariant(x)
    && isFunction(x.first)
    && isFunction(x.second); }

// fanout : m a b -> m a c -> m a (b, c)
function fanout(fst, snd) {
  if(isFunction(fst) && isFunction(snd)) {
    return function (x) { return Pair(fst(x), snd(x)); }
  }

  if(valid(fst, snd)) {
    return fst.first()
      .compose(snd.second())
      .contramap(function (x) { return Pair(x, x); })
  }

  throw new TypeError(
    'fanout: Arrows, Functions or Stars of the same type required for both arguments'
  )
}

module.exports = curry(fanout)


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Pair = __webpack_require__(15).proxy('Pair')

var isFoldable = __webpack_require__(62)
var isSameType = __webpack_require__(16)
var isString = __webpack_require__(33)

function foldPairs(acc, pair) {
  var obj;

  if(!isSameType(Pair, pair)) {
    throw new TypeError('fromPairs: Foldable of Pairs required for argument')
  }

  var key = pair.fst()
  var value = pair.snd()

  if(!isString(key)) {
    throw new TypeError('fromPairs: String required for fst of every Pair')
  }

  return value !== undefined
    ? Object.assign(acc, ( obj = {}, obj[key] = value, obj ))
    : acc
}

// fromPairs : Foldable f => f (Pair String a) -> Object
function fromPairs(xs) {
  if(!isFoldable(xs)) {
    throw new TypeError('fromPairs: Foldable of Pairs required for argument')
  }

  return xs.reduce(foldPairs, {})
}

module.exports = fromPairs


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var array = __webpack_require__(100)
var curry = __webpack_require__(3)
var isApply = __webpack_require__(43)
var isArray = __webpack_require__(35)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var map = array.map
var ap = array.ap

// liftA2 :: Applicative m => (a -> b -> c) -> m a -> m b -> m c
function liftA2(fn, x, y) {
  if(!isFunction(fn)) {
    throw new TypeError('liftA2: Function required for first argument')
  }

  if(!((isApply(x) || isArray(x)) && isSameType(x, y))) {
    throw new TypeError('liftA2: Applys of same type required for last two arguments')
  }

  if(isArray(x)) {
    return ap(y, map(fn, x))
  }

  return x.map(fn).ap(y)
}

module.exports = curry(liftA2)


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var array = __webpack_require__(100)
var curry = __webpack_require__(3)
var isApply = __webpack_require__(43)
var isArray = __webpack_require__(35)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var map = array.map
var ap = array.ap

// liftA3 :: Applicative m => (a -> b -> c -> d) -> m a -> m b -> m c -> m d
function liftA3(fn, x, y, z) {
  if(!isFunction(fn)) {
    throw new TypeError('liftA3: Function required for first argument')
  }
  else if(!((isApply(x) || isArray(x)) && isSameType(x, y) && isSameType(x, z))) {
    throw new TypeError('liftA3: Applys of same type required for last three arguments')
  }

  if(isArray(x)) {
    return ap(z, ap(y, map(fn, x)))
  }

  return x.map(fn).ap(y).ap(z)
}

module.exports = curry(liftA3)


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var array = __webpack_require__(100)
var curry = __webpack_require__(3)
var curryN = __webpack_require__(133)

var isApply = __webpack_require__(43)
var isArray = __webpack_require__(35)
var isFunction = __webpack_require__(4)
var isFunctor = __webpack_require__(40)
var isInteger = __webpack_require__(30)
var isSameType = __webpack_require__(16)

var ap = array.ap

var applyAp = function (x, y) {
  if(!(isSameType(x, y) && (isArray(y) || isApply(y)))) {
    throw new TypeError('liftN: Applys of same type are required')
  }

  if(isArray(x)) {
    return ap(y, x)
  }

  return x.ap(y)
}

function liftN(n, fn) {
  if(!isInteger(n)) {
    throw new TypeError('liftN: Integer required for first argument')
  }

  if(!isFunction(fn)) {
    throw new TypeError('liftN: Function required for second argument')
  }

  return curryN(n, function() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if(!isFunctor(args[0])) {
      throw new TypeError('liftN: Applys of same type are required')
    }

    return args.slice(1, n).reduce(
      applyAp,
      args[0].map(function (x) { return curryN(n, fn)(x); })
    )
  })
}

module.exports = curry(liftN)


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isObject = __webpack_require__(29)
var isFunction = __webpack_require__(4)
var isNil = __webpack_require__(32)

// applyMap :: ({ (* -> *) }, Object) -> (Object , String) -> Object
var applyMap = function (fns, obj) { return function(acc, key) {
    var obj$1, obj$2, obj$3;

    if(isNil(fns[key])) {
      return Object.assign({}, acc, ( obj$1 = {}, obj$1[key] = obj[key], obj$1 ))
    }

    if(isObject(fns[key])) {
      return Object.assign({}, acc, ( obj$2 = {}, obj$2[key] = isObject(obj[key]) ? mapProps(fns[key], obj[key]) : obj[key], obj$2 ))
    }

    if(!isFunction(fns[key])) {
      throw new TypeError('mapProps: Object of functions required for first argument')
    }

    return Object.assign({}, acc, ( obj$3 = {}, obj$3[key] = fns[key](obj[key]), obj$3 ))
  }; }

// mapProps :: { (* -> *) } -> Object -> Object
function mapProps(fns, obj) {
  if(!(isObject(fns) && isObject(obj))) {
    throw new TypeError('mapProps: Objects required for both arguments')
  }

  return Object.keys(obj)
    .reduce(applyMap(fns, obj), {})
}

module.exports = curry(mapProps)


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFoldable = __webpack_require__(62)
var isFunction = __webpack_require__(4)

function mapReduce(mapFn, reduceFn, empty, xs) {
  if(!isFunction(mapFn)) {
    throw new TypeError('mapReduce: Unary mapping function required for first argument')
  }

  if(!isFunction(reduceFn)) {
    throw new TypeError('mapReduce: Binary reduction function required for second argument')
  }

  if(!isFoldable(xs)) {
    throw new TypeError('mapReduce: Foldable required for fourth argument')
  }

  return xs.reduce(
    function (acc, x) { return reduceFn(acc, mapFn(x)); },
    empty
  )
}

module.exports = curry(mapReduce)


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFoldable = __webpack_require__(62)
var isMonoid = __webpack_require__(71)
var mconcatMap = __webpack_require__(150)

var identity = function (x) { return x; }

// mconcat : Monoid m => m -> ([ a ] | List a) -> m a
function mconcat(m, xs) {
  if(!isMonoid(m)) {
    throw new TypeError(
      'mconcat: Monoid required for first argument'
    )
  }

  if(!isFoldable(xs)) {
    throw new TypeError(
      'mconcat: Foldable required for second argument'
    )
  }

  return mconcatMap(m, identity, xs)
}

module.exports = curry(mconcat)


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var compose = __webpack_require__(6)

var foldWith =
  function (m) { return function (x, y) { return x.concat(m(y)); }; }

// mconcatMap :: Monoid M => M -> (b -> a) -> ([ b ] | List b) -> M a
function mconcatMap(M, f, xs) {
  return xs.reduce(foldWith(compose(M, f)), M.empty())
}

module.exports = mconcatMap


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var _mconcatMap = __webpack_require__(150)
var curry = __webpack_require__(3)
var isFoldable = __webpack_require__(62)
var isFunction = __webpack_require__(4)
var isMonoid = __webpack_require__(71)

// mconcatMap : Monoid M => M -> (b -> a) -> ([ b ] | List b) -> M a
function mconcatMap(m, f, xs) {
  if(!isMonoid(m)) {
    throw new TypeError(
      'mconcatMap: Monoid required for first argument'
    )
  }

  if(!isFunction(f)) {
    throw new TypeError(
      'mconcatMap: Function required for second argument'
    )
  }

  if(!isFoldable(xs)) {
    throw new TypeError(
      'mconcatMap: Foldable required for third argument'
    )
  }

  return _mconcatMap(m, f, xs)
}

module.exports = curry(mconcatMap)


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFoldable = __webpack_require__(62)
var isMonoid = __webpack_require__(71)
var mconcatMap = __webpack_require__(150)

var identity = function (x) { return x; }

// mreduce : Monoid M => M -> ([ a ] | List a) -> a
function mreduce(m, xs) {
  if(!isMonoid(m)) {
    throw new TypeError(
      'mreduce: Monoid required for first argument'
    )
  }

  if(!isFoldable(xs)) {
    throw new TypeError(
      'mreduce: Foldable required for second argument'
    )
  }

  return mconcatMap(m, identity, xs).valueOf()
}

module.exports = curry(mreduce)


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFoldable = __webpack_require__(62)
var isFunction = __webpack_require__(4)
var isMonoid = __webpack_require__(71)
var mconcatMap = __webpack_require__(150)

// mreduceMap :: Monoid M => M -> (b -> a) -> ( [ b ] | List b ) -> a
function mreduceMap(m, f, xs) {
  if(!isMonoid(m)) {
    throw new TypeError(
      'mreduceMap: Monoid required for first argument'
    )
  }

  if(!isFunction(f)) {
    throw new TypeError(
      'mreduceMap: Function required for second argument'
    )
  }

  if(!isFoldable(xs)) {
    throw new TypeError(
      'mreduceMap: Foldable required for third argument'
    )
  }

  return mconcatMap(m, f, xs).valueOf()
}

module.exports = curry(mreduceMap)


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var curryN = __webpack_require__(133)
var isFunction = __webpack_require__(4)
var isNumber = __webpack_require__(31)

// nAry : Number -> (* -> a) -> * -> * -> a
function nAry(num, fn) {
  if(!isNumber(num)) {
    throw new TypeError('nAry: Number required for first argument')
  }

  if(!isFunction(fn)) {
    throw new TypeError('nAry: Function required for second argument')
  }

  return curryN(num, fn)
}

module.exports = curry(nAry)


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isString = __webpack_require__(33)

// objOf : String -> a -> Object
function objOf(key, value) {
  var obj;

  if(!(key && isString(key))) {
    throw new TypeError('objOf: Non-empty String required for first argument')
  }

  return ( obj = {}, obj[key] = value, obj )
}

module.exports = curry(objOf)


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFoldable = __webpack_require__(62)
var isObject  = __webpack_require__(29)

function omitKeys(keys, obj) {
  return function(acc, key) {
    var obj$1;

    return keys.indexOf(key) === -1 && obj[key] !== undefined
      ? Object.assign(acc, ( obj$1 = {}, obj$1[key] = obj[key], obj$1 ))
      : acc
  }
}

// omit : ([ String ] | List String) -> Object -> Object
function omit(keys, obj) {
  if(!isFoldable(keys)) {
    throw new TypeError('omit: Foldable required for first argument')
  }
  else if(!isObject(obj)) {
    throw new TypeError('omit: Object required for second argument')
  }

  return Object.keys(obj).reduce(omitKeys(keys, obj), {})
}

module.exports = curry(omit)


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)
var _once = __webpack_require__(103)

// once : ((*) -> b) -> ((*) -> b)
function once(fn) {
  if(!isFunction(fn)) {
    throw new TypeError('once: Function required')
  }

  return _once(fn)
}

module.exports = once


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

// partial : ((* -> c), *) -> * -> c
function partial() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var fn = args[0]
  var xs = args.slice(1)

  if(!isFunction(fn)) {
    throw new TypeError('partial: Function required for first argument')
  }

  return curry(
    Function.bind.apply(fn, [ null ].concat(xs))
  )
}

module.exports = partial


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFoldable = __webpack_require__(62)
var isObject  = __webpack_require__(29)
var isString = __webpack_require__(33)

function pickKeys(obj) {
  return function(acc, key) {
    var obj$1;

    if(!isString(key)) {
      throw new TypeError('pick: Foldable of Strings is required for first argument')
    }
    return key && obj[key] !== undefined
      ? Object.assign(acc, ( obj$1 = {}, obj$1[key] = obj[key], obj$1 ))
      : acc
  }
}

// pick : ([ String ] | List String) -> Object -> Object
function pick(keys, obj) {
  if(!isFoldable(keys)) {
    throw new TypeError('pick: Foldable required for first argument')
  }
  else if(!isObject(obj)) {
    throw new TypeError('pick: Object required for second argument')
  }

  return keys.reduce(pickKeys(obj), {})
}

module.exports = curry(pick)


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)

var err = 'pipe: Functions required'

function applyPipe(f, g) {
  if(!isFunction(g)) {
    throw new TypeError(err)
  }

  return function() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return g.call(null, f.apply(null, args))
  }
}

// pipe : ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
function pipe() {
  var fns = [], len = arguments.length;
  while ( len-- ) fns[ len ] = arguments[ len ];

  if(!arguments.length) {
    throw new TypeError(err)
  }

  var head =
    fns[0]

  if(!isFunction(head)) {
    throw new TypeError(err)
  }

  var tail =
    fns.slice(1).concat(function (x) { return x; })

  return tail.reduce(applyPipe, head)
}

module.exports = pipe


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isChain = __webpack_require__(54)
var isFunction = __webpack_require__(4)

var err = 'pipeK: Chain returning functions of the same type required'

function pipeK(head) {
  var fns = [], len = arguments.length - 1;
  while ( len-- > 0 ) fns[ len ] = arguments[ len + 1 ];

  if(!(arguments.length && isFunction(head))) {
    throw new TypeError(err)
  }

  if(arguments.length === 1) {
    return head
  }

  var tail = fns.reduce(function (comp, fn) {
    if(!isFunction(fn)) {
      throw new TypeError(err)
    }

    return function(m) {
      if(!isChain(m)) {
        throw new TypeError(err)
      }
      return comp(m).chain(fn)
    }
  }, function (x) { return x; })

  return function() {
    return tail(head.apply(null, arguments))
  }
}

module.exports = pipeK


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)
var isPromise = __webpack_require__(80)

var err = 'pipeP: Promise returning functions required'

function applyPipe(f, g) {
  if(!isFunction(g)) {
    throw new TypeError(err)
  }

  return function() {
    var p = f.apply(null, arguments)

    if(!isPromise(p)) {
      throw new TypeError(err)
    }

    return p.then(g)
  }
}

// pipeP : Promise p => ((a -> p b), (b -> p c), ..., (y -> p z)) -> a -> p z
function pipeP() {
  var fns = [], len = arguments.length;
  while ( len-- ) fns[ len ] = arguments[ len ];

  if(!arguments.length) {
    throw new TypeError(err)
  }

  var head =
    fns[0]

  if(!isFunction(head)) {
    throw new TypeError(err)
  }

  var tail =
    fns.slice(1).concat(function (x) { return x; })

  return tail.reduce(applyPipe, head)
}

module.exports = pipeP


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isSameType = __webpack_require__(16)
var isSemigroupoid = __webpack_require__(52)

var err = 'pipeS: Semigroupoids of the same type required'

// pipeS : Semigroupoid s => (s a b, s b c, ..., s y z) -> s a z
function pipeS() {
  var ms = [], len = arguments.length;
  while ( len-- ) ms[ len ] = arguments[ len ];

  if(!arguments.length) {
    throw new TypeError(err)
  }

  var head =
    ms[0]

  if(!isSemigroupoid(head)) {
    throw new TypeError(err)
  }

  if(ms.length === 1) {
    return head
  }

  return ms.slice().reduce(function (comp, m) {
    if(!isSameType(comp, m)) {
      throw new TypeError(err)
    }

    return comp.compose(m)
  })
}

module.exports = pipeS


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Henrique Limas */
/** @author Ian Hofmann-Hicks */

var curry = __webpack_require__(3)
var isDefined = __webpack_require__(27)
var isEmpty = __webpack_require__(28)
var isNil = __webpack_require__(32)
var isInteger = __webpack_require__(30)
var isString = __webpack_require__(33)

// propOr : a -> String | Integer -> b -> c
function propOr(def, key, target) {
  if(!(isString(key) && !isEmpty(key) || isInteger(key))) {
    throw new TypeError('propOr: Non-empty String or Integer required for second argument')
  }

  if(isNil(target)) {
    return def
  }

  var value = target[key]

  return isDefined(value)
    ? value
    : def
}

module.exports = curry(propOr)


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Henrique Limas */
/** @author Ian Hofmann-Hicks */

var curry = __webpack_require__(3)
var isArray = __webpack_require__(35)
var isEmpty = __webpack_require__(28)
var isInteger = __webpack_require__(30)
var isDefined = __webpack_require__(27)
var isNil = __webpack_require__(32)
var isString = __webpack_require__(33)

// propPathOr : a -> [ String | Integer ] -> b -> c
function propPathOr(def, keys, target) {
  if(!isArray(keys)) {
    throw new TypeError(
      'propPathOr: Array of Non-empty Strings or Integers required for second argument'
    )
  }

  if(isNil(target)) {
    return def
  }

  var value = target
  for(var i = 0; i < keys.length; i++) {
    var key = keys[i]

    if(!(isString(key) && !isEmpty(key) || isInteger(key))) {
      throw new TypeError(
        'propPathOr: Array of Non-empty Strings or Integers required for second argument'
      )
    }

    if(isNil(value)) {
      return def
    }

    value = value[key]

    if(!isDefined(value)) {
      return def
    }
  }

  return value
}

module.exports = curry(propPathOr)


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isArray = __webpack_require__(35)
var isEmpty = __webpack_require__(28)
var isInteger = __webpack_require__(30)
var isObject = __webpack_require__(29)
var isString = __webpack_require__(33)
var object = __webpack_require__(130)

var isValid = function (x) { return isObject(x) || isArray(x); }

var pathError =
  'setPath: Non-empty Array of non-empty Strings and/or Integers required for first argument'

// setPath :: [ String | Integer ] -> a -> (Object | Array) -> (Object | Array)
function setPath(path, val, obj) {
  var obj$1;

  if(!isArray(path) || isEmpty(path)) {
    throw new TypeError(pathError)
  }

  if(!isValid(obj)) {
    throw new TypeError('setPath: Object or Array required for third argument')
  }

  var key = path[0]
  var newVal = val

  if(path.length > 1) {
    var next = !isValid(obj[key])
      ? isInteger(path[1]) ? [] : {}
      : obj[key]

    newVal = setPath(path.slice(1), val, next)
  }

  if(isString(key) && !isEmpty(key)) {
    return object.assign(( obj$1 = {}, obj$1[key] = newVal, obj$1 ), obj)
  }

  if(isInteger(key)) {
    var arr =
      isArray(obj) ? obj.slice() : obj

    arr[key] = newVal

    return arr
  }

  throw new TypeError(pathError)
}

module.exports = curry(setPath)


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var compose = __webpack_require__(6)
var isFunction = __webpack_require__(4)

var constant = function (x) { return function () { return x; }; }

// tap : (a -> b) -> a -> a
function tap(fn, x) {
  if(!isFunction(fn)) {
    throw new TypeError(
      'tap: Function required for first argument'
    )
  }

  return compose(constant(x), fn)(x)
}

module.exports = curry(tap)


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)

// unary : (* -> b) -> a -> b
function unary(fn) {
  if(!isFunction(fn)) {
    throw new TypeError('unary: Function required')
  }

  return function(x) {
    return fn(x)
  }
}

module.exports = unary


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

module.exports =
  __webpack_require__(104)


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isArray = __webpack_require__(35)
var isEmpty = __webpack_require__(28)
var isInteger  = __webpack_require__(30)
var isObject  = __webpack_require__(29)
var isString = __webpack_require__(33)
var object = __webpack_require__(130)

var pathError =
  'unsetPath: Non-empty Array of non-empty Strings and/or Integers required for first argument'

function unset(key, obj) {
  return function(acc, k) {
    if(obj[k] !== undefined && k !== key) {
      acc[k] = obj[k]
    }

    return acc
  }
}

function unsetPath(path, obj) {
  var obj$1;

  if(!isArray(path) || isEmpty(path)) {
    throw new TypeError(pathError)
  }

  if(!(isObject(obj) || isArray(obj))) {
    throw new TypeError('unsetPath: Object or Array required for second argument')
  }

  var key = path[0]

  if(path.length === 1) {
    if(!(isString(key) || isInteger(key))) {
      throw new TypeError(pathError)
    }

    return isInteger(key) && isArray(obj)
      ? obj.slice(0, key).concat(obj.slice(key + 1))
      : Object.keys(obj).reduce(unset(key, obj), {})
  }

  var next =
    obj[key]

  if(!(isObject(next) || isArray(next))) {
    return obj
  }

  return isInteger(key) && isArray(obj)
    ? obj.slice(0, key)
      .concat([ unsetPath(path.slice(1), next) ])
      .concat(obj.slice(key + 1))
    : object.assign(( obj$1 = {}, obj$1[key] = unsetPath(path.slice(1), next), obj$1 ), obj)
}

module.exports = curry(unsetPath)


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Pair = __webpack_require__(117)

// branch : a -> Pair a a
function branch(x) {
  return Pair(x, x)
}

module.exports = branch


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Dale Francis (dalefrancis88) */

var Pred = __webpack_require__(15).proxy('Pred')

var curry = __webpack_require__(3)
var ref = __webpack_require__(115);
var Just = ref.Just;
var Nothing = ref.Nothing;
var predOrFunc = __webpack_require__(18)

var isFunction = __webpack_require__(4)
var isFoldable = __webpack_require__(62)
var isSameType = __webpack_require__(16)

var accumulator = function (fn) { return function (acc, cur) { return !acc.found && predOrFunc(fn, cur) ? { found: true, value: cur } : acc; }; }

// find :: Foldable f => ((a -> Boolean) | Pred) -> f a -> Maybe a
function find(fn, foldable) {
  if(!isFunction(fn) && !isSameType(Pred, fn)) {
    throw new TypeError('find: Pred or a predicate function is required for first argument')
  }

  if(!isFoldable(foldable)) {
    throw new TypeError('find: Foldable required for second argument')
  }

  var result = foldable.reduce(accumulator(fn), { found: false })

  return result.found ? Just(result.value) : Nothing()
}

module.exports = curry(find)


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isDefined = __webpack_require__(27)
var isEmpty = __webpack_require__(28)
var isNil = __webpack_require__(32)
var isInteger = __webpack_require__(30)
var isString = __webpack_require__(33)
var ref = __webpack_require__(114);
var Nothing = ref.Nothing;
var Just = ref.Just;

// prop : (String | Integer) -> a -> Maybe b
function prop(key, target) {
  if(!(isString(key) && !isEmpty(key) || isInteger(key))) {
    throw new TypeError('prop: Non-empty String or Integer required for first argument')
  }

  if(isNil(target)) {
    return Nothing()
  }

  var value = target[key]

  return isDefined(value)
    ? Just(value)
    : Nothing()
}

module.exports = curry(prop)


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var ref = __webpack_require__(114);
var Nothing = ref.Nothing;
var Just = ref.Just;

var curry = __webpack_require__(3)
var isArray = __webpack_require__(35)
var isDefined = __webpack_require__(27)
var isEmpty = __webpack_require__(28)
var isInteger = __webpack_require__(30)
var isNil = __webpack_require__(32)
var isString = __webpack_require__(33)

// propPath : [ String | Integer ] -> a -> Maybe b
function propPath(keys, target) {
  if(!isArray(keys)) {
    throw new TypeError('propPath: Array of Non-empty Strings or Integers required for first argument')
  }

  if(isNil(target)) {
    return Nothing()
  }

  var value = target
  for(var i = 0; i < keys.length; i++) {
    var key = keys[i]

    if(!(isString(key) && !isEmpty(key) || isInteger(key))) {
      throw new TypeError('propPath: Array of Non-empty Strings or Integers required for first argument')
    }

    if(isNil(value)) {
      return Nothing()
    }

    value = value[key]

    if(!isDefined(value)) {
      return Nothing()
    }
  }

  return Just(value)
}

module.exports = curry(propPath)


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var ref = __webpack_require__(114);
var Nothing = ref.Nothing;
var Just = ref.Just;
var predOrFunc = __webpack_require__(18)

var curry = __webpack_require__(3)
var isPredOrFunc = __webpack_require__(14)

// safe : ((a -> Boolean) | Pred) -> a -> Maybe a
function safe(pred, x) {
  if(!isPredOrFunc(pred)) {
    throw new TypeError('safe: Pred or predicate function required for first argument')
  }

  return predOrFunc(pred, x)
    ? Just(x)
    : Nothing()
}

module.exports = curry(safe)


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var ref = __webpack_require__(114);
var Just = ref.Just;
var Nothing = ref.Nothing;

var curry = __webpack_require__(3)
var isPredOrFunc = __webpack_require__(14)
var isFunction = __webpack_require__(4)
var predOrFunc = __webpack_require__(18)

// safeAfter :: ((b -> Boolean) | Pred) -> (a -> b) -> a -> Maybe b
function safeAfter(pred, fn) {
  if(!isPredOrFunc(pred)) {
    throw new TypeError('safeAfter: Pred or predicate function required for first argument')
  }
  if(!isFunction(fn)) {
    throw new TypeError('safeAfter: Function required for second argument')
  }

  return function (x) {
    var result = fn(x)
    return predOrFunc(pred, result)
      ? Just(result)
      : Nothing()
  }
}

module.exports = curry(safeAfter)


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var compose = __webpack_require__(6)
var curry = __webpack_require__(3)
var isPredOrFunc = __webpack_require__(14)
var isFunction = __webpack_require__(4)
var safe = __webpack_require__(175)

var map =
  function (fn) { return function (m) { return m.map(fn); }; }

// safeLift : ((a -> Boolean) | Pred) -> (a -> b) -> a -> Maybe b
function safeLift(pred, fn) {
  if(!isPredOrFunc(pred)) {
    throw new TypeError('safeLift: Pred or predicate function required for first argument')
  }
  else if(!isFunction(fn)) {
    throw new TypeError('safeLift: Function required for second argument')
  }

  return compose(map(fn), safe(pred))
}

module.exports = curry(safeLift)


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var List = __webpack_require__(113)
var Pair = __webpack_require__(117)
var isObject = __webpack_require__(29)

// toPairs : Object -> List (Pair String a)
function toPairs(obj) {
  if(!isObject(obj)) {
    throw new TypeError('toPairs: Object required for argument')
  }

  return Object.keys(obj).reduce(
    function (acc, key) { return obj[key] !== undefined
      ? acc.concat(List.of(Pair(key, obj[key])))
      : acc; },
    List.empty()
  )
}

module.exports = toPairs


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var ref = __webpack_require__(121);
var Err = ref.Err;
var Ok = ref.Ok;
var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

function tryCatch(fn) {
  if(!isFunction(fn)) {
    throw new TypeError('tryCatch: Function required for first argument')
  }

  var safe = function() {
    try { return Ok(fn.apply(this, arguments)) }
    catch(e) { return Err(e) }
  }

  Object.defineProperty(safe, 'length', { value: fn.length })

  return safe
}

module.exports = curry(tryCatch)


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var _equals = __webpack_require__(92)
var type = __webpack_require__(15).type('All')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var isFunction = __webpack_require__(4)
var isNil = __webpack_require__(32)
var isSameType = __webpack_require__(16)

var _empty =
  function () { return All(true); }

function All(b) {
  var obj;

  var x = isNil(b) ? _empty().valueOf() : b

  if(!arguments.length || isFunction(x)) {
    throw new TypeError('All: Non-function value required')
  }

  var valueOf =
    function () { return !!x; }

  var empty =
    _empty

  var equals =
    function (m) { return isSameType(All, m)
      && _equals(x, m.valueOf()); }

  var inspect =
    function () { return ("All" + (_inspect(valueOf()))); }

  function concat(method) {
    return function(m) {
      if(!isSameType(All, m)) {
        throw new TypeError(("All." + method + ": All required"))
      }

      return All(m.valueOf() && valueOf())
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect,
    equals: equals, valueOf: valueOf, type: type, empty: empty
  }, obj['@@type'] = _type, obj.concat = concat('concat'), obj[fl.equals] = equals, obj[fl.concat] = concat(fl.concat), obj[fl.empty] = empty, obj.constructor = All, obj )
}

All['@@implements'] = _implements(
  [ 'equals', 'concat', 'empty' ]
)

All.empty = _empty
All.type = type

All[fl.empty] = _empty
All['@@type'] = _type

module.exports = All


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var _equals = __webpack_require__(92)
var type = __webpack_require__(15).type('Any')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var isFunction = __webpack_require__(4)
var isNil = __webpack_require__(32)
var isSameType = __webpack_require__(16)

var _empty =
  function () { return Any(false); }

function Any(b) {
  var obj;

  var x = isNil(b) ? _empty().valueOf() : b

  if(!arguments.length || isFunction(x)) {
    throw new TypeError('Any: Non-function value required')
  }

  var valueOf =
    function () { return !!x; }

  var empty =
    _empty

  var inspect =
    function () { return ("Any" + (_inspect(valueOf()))); }

  var equals =
    function (m) { return isSameType(Any, m)
      && _equals(x, m.valueOf()); }

  function concat(method) {
    return function(m) {
      if(!isSameType(Any, m)) {
        throw new TypeError(("Any." + method + ": Any required"))
      }

      return Any(m.valueOf() || valueOf())
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect,
    equals: equals, valueOf: valueOf, type: type, empty: empty
  }, obj['@@type'] = _type, obj.concat = concat('concat'), obj[fl.equals] = equals, obj[fl.concat] = concat(fl.concat), obj[fl.empty] = empty, obj.constructor = Any, obj )
}

Any['@@implements'] = _implements(
  [ 'equals', 'concat', 'empty' ]
)

Any.empty = _empty
Any.type  = type

Any[fl.empty] = _empty
Any['@@type'] = _type

module.exports = Any


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var _object = __webpack_require__(130)
var _equals = __webpack_require__(92)

var type = __webpack_require__(15).type('Assign')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var isNil = __webpack_require__(32)
var isObject = __webpack_require__(29)
var isSameType = __webpack_require__(16)

var _empty =
  function () { return Assign({}); }

function Assign(o) {
  var obj;

  var x = isNil(o) ? _empty().valueOf() : o

  if(!arguments.length || !isObject(x)) {
    throw new TypeError('Assign: Object required')
  }

  var valueOf =
    function () { return x; }

  var empty =
    _empty

  var inspect =
    function () { return ("Assign" + (_inspect(valueOf()))); }

  var equals =
    function (m) { return isSameType(Assign, m)
      && _equals(x, m.valueOf()); }

  function concat(method) {
    return function(m) {
      if(!isSameType(Assign, m)) {
        throw new TypeError(("Assign." + method + ": Assign required"))
      }

      return Assign(_object.assign(m.valueOf(), x))
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect,
    equals: equals, valueOf: valueOf, type: type, empty: empty,
    concat: concat('concat')
  }, obj[fl.equals] = equals, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj['@@type'] = _type, obj.constructor = Assign, obj )
}

Assign['@@implements'] = _implements(
  [ 'equals', 'concat', 'empty' ]
)

Assign.empty = _empty
Assign.type = type

Assign[fl.empty] = _empty
Assign['@@type'] = _type

module.exports = Assign


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var type = __webpack_require__(15).type('Endo')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var compose = __webpack_require__(6)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var _empty =
  function () { return Endo(function (x) { return x; }); }

function Endo(runWith) {
  var obj;

  if(!isFunction(runWith)) {
    throw new TypeError('Endo: Function value required')
  }

  var valueOf =
    function () { return runWith; }

  var empty =
    _empty

  var inspect =
    function () { return ("Endo" + (_inspect(valueOf()))); }

  function concat(method) {
    return function(m) {
      if(!isSameType(Endo, m)) {
        throw new TypeError(("Endo." + method + ": Endo required"))
      }

      return Endo(compose(m.valueOf(), valueOf()))
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect,
    valueOf: valueOf, type: type, empty: empty, runWith: runWith,
    concat: concat('concat')
  }, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj['@@type'] = _type, obj.constructor = Endo, obj )
}

Endo['@@implements'] = _implements(
  [ 'concat', 'empty' ]
)

Endo.empty = _empty
Endo.type = type

Endo[fl.empty] = _empty
Endo['@@type'] = _type

module.exports = Endo



/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var _equals = __webpack_require__(92)
var type = __webpack_require__(15).type('First')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var isSameType = __webpack_require__(16)

var Maybe = __webpack_require__(114)

var _empty =
  function () { return First(Maybe.Nothing()); }

function First(x) {
  var obj;

  if(!arguments.length) {
    throw new TypeError('First: Requires one argument')
  }

  var maybe =
    !isSameType(Maybe, x) ? Maybe.of(x) : x.map(function (x) { return x; })

  var empty =
    _empty

  var inspect =
    function () { return ("First(" + (_inspect(maybe)) + " )"); }

  var equals =
  function (m) { return isSameType(First, m)
    && _equals(maybe, m.valueOf()); }

  var valueOf =
    function () { return maybe; }

  var option =
    maybe.option

  function concat(method) {
    return function(m) {
      if(!isSameType(First, m)) {
        throw new TypeError(("First." + method + ": First required"))
      }

      var n =
        m.valueOf().map(function (x) { return x; })

      return First(
        maybe.either(function () { return n; }, Maybe.Just)
      )
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect,
    equals: equals, empty: empty, option: option, type: type, valueOf: valueOf,
    concat: concat('concat')
  }, obj[fl.equals] = equals, obj[fl.empty] = _empty, obj[fl.concat] = concat(fl.concat), obj['@@type'] = _type, obj.constructor = First, obj )
}

First['@@implements'] = _implements(
  [ 'equals', 'concat', 'empty' ]
)

First.empty = _empty
First.type = type

First[fl.empty] = _empty
First['@@type'] = _type

module.exports = First


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var _equals = __webpack_require__(92)
var type = __webpack_require__(15).type('Last')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var isSameType = __webpack_require__(16)

var Maybe = __webpack_require__(114)

var _empty =
  function () { return Last(Maybe.Nothing()); }

function Last(x) {
  var obj;

  if(!arguments.length) {
    throw new TypeError('Last: Requires one argument')
  }

  var maybe =
    !isSameType(Maybe, x) ? Maybe.of(x) : x.map(function (x) { return x; })

  var valueOf =
    function () { return maybe; }

  var empty =
    _empty

  var inspect =
    function () { return ("Last(" + (_inspect(maybe)) + " )"); }

  var equals =
  function (m) { return isSameType(Last, m)
    && _equals(maybe, m.valueOf()); }

  var option =
    maybe.option

  function concat(method) {
    return function(m) {
      if(!isSameType(Last, m)) {
        throw new TypeError(("Last." + method + ": Last required"))
      }

      var n =
        m.valueOf().map(function (x) { return x; })

      return Last(
        maybe.either(
          function () { return n; },
          function () { return n.either(function () { return maybe; }, function () { return n; }); }
        )
      )
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect,
    equals: equals, empty: empty, option: option, type: type, valueOf: valueOf,
    concat: concat('concat')
  }, obj[fl.equals] = equals, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj['@@type'] = _type, obj.constructor = Last, obj )
}

Last['@@implements'] = _implements(
  [ 'equals', 'concat', 'empty' ]
)

Last.empty = _empty
Last.type = type

Last[fl.empty] = _empty
Last['@@type'] = _type

module.exports = Last


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var _equals = __webpack_require__(92)
var type = __webpack_require__(15).type('Max')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var isNil = __webpack_require__(32)
var isNumber = __webpack_require__(31)
var isSameType = __webpack_require__(16)

var _empty =
  function () { return Max(-Infinity); }

function Max(n) {
  var obj;

  var x = isNil(n) ? _empty().valueOf() : n

  if(!arguments.length || !isNumber(x)) {
    throw new TypeError('Max: Numeric value required')
  }

  var valueOf =
    function () { return x; }

  var empty =
    _empty

  var inspect =
    function () { return ("Max" + (_inspect(valueOf()))); }

  var equals =
    function (m) { return isSameType(Max, m)
      && _equals(x, m.valueOf()); }

  function concat(method) {
    return function(m) {
      if(!isSameType(Max, m)) {
        throw new TypeError(("Max." + method + ": Max requried"))
      }

      return Max(Math.max(x, m.valueOf()))
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect,
    equals: equals, valueOf: valueOf, type: type, empty: empty,
    concat: concat('concat')
  }, obj[fl.equals] = equals, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj['@@type'] = _type, obj.constructor = Max, obj )
}

Max['@@implements'] = _implements(
  [ 'equals', 'concat', 'empty' ]
)

Max.empty = _empty
Max.type = type

Max[fl.empty] = _empty
Max['@@type'] = _type

module.exports = Max


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var _equals = __webpack_require__(92)
var type = __webpack_require__(15).type('Min')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var isNil = __webpack_require__(32)
var isNumber = __webpack_require__(31)
var isSameType = __webpack_require__(16)

var _empty =
  function () { return Min(Infinity); }

function Min(n) {
  var obj;

  var x = isNil(n) ? _empty().valueOf() : n

  if(!arguments.length || !isNumber(x)) {
    throw new TypeError('Min: Numeric value required')
  }

  var valueOf =
    function () { return x; }

  var empty =
    _empty

  var inspect =
    function () { return ("Min" + (_inspect(valueOf()))); }

  var equals =
    function (m) { return isSameType(Min, m)
      && _equals(x, m.valueOf()); }

  function concat(method) {
    return function(m) {
      if(!isSameType(Min, m)) {
        throw new TypeError(("Min." + method + ": Min required"))
      }

      return Min(Math.min(x, m.valueOf()))
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect,
    equals: equals, valueOf: valueOf, type: type, empty: empty,
    concat: concat('concat')
  }, obj[fl.equals] = equals, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj['@@type'] = _type, obj.constructor = Min, obj )
}

Min['@@implements'] = _implements(
  [ 'equals', 'concat', 'empty' ]
)

Min.empty = _empty
Min.type = type

Min[fl.empty] = _empty
Min['@@type'] = _type

module.exports = Min


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var _equals = __webpack_require__(92)
var type = __webpack_require__(15).type('Prod')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var isNil = __webpack_require__(32)
var isNumber = __webpack_require__(31)
var isSameType = __webpack_require__(16)

var _empty =
  function () { return Prod(1); }

function Prod(n) {
  var obj;

  var x = isNil(n) ? _empty().valueOf() : n

  if(!arguments.length || !isNumber(x)) {
    throw new TypeError('Prod: Numeric value required')
  }

  var valueOf =
    function () { return x; }

  var empty =
    _empty

  var inspect =
    function () { return ("Prod" + (_inspect(valueOf()))); }

  var equals =
    function (m) { return isSameType(Prod, m)
      && _equals(x, m.valueOf()); }

  function concat(method) {
    return function(m) {
      if(!isSameType(Prod, m)) {
        throw new TypeError(("Prod." + method + ": Prod required"))
      }

      return Prod(x * m.valueOf())
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect,
    equals: equals, valueOf: valueOf, type: type, empty: empty,
    concat: concat('concat')
  }, obj[fl.equals] = equals, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj['@@type'] = _type, obj.constructor = Prod, obj )
}

Prod['@@implements'] = _implements(
  [ 'equals', 'concat', 'empty' ]
)

Prod.empty = _empty
Prod.type = type

Prod[fl.empty] = _empty
Prod['@@type'] = _type

module.exports = Prod


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var VERSION = 2

var _implements = __webpack_require__(97)
var _inspect = __webpack_require__(98)
var _equals = __webpack_require__(92)
var type = __webpack_require__(15).type('Sum')
var _type = __webpack_require__(15).typeFn(type(), VERSION)
var fl = __webpack_require__(39)

var isNil = __webpack_require__(32)
var isNumber = __webpack_require__(31)
var isSameType = __webpack_require__(16)

var _empty =
  function () { return Sum(0); }

function Sum(n) {
  var obj;

  var x = isNil(n) ? _empty().valueOf() : n

  if(!arguments.length || !isNumber(x)) {
    throw new TypeError('Sum: Numeric value required')
  }

  var valueOf =
    function () { return x; }

  var empty=
    _empty

  var inspect =
    function () { return ("Sum" + (_inspect(valueOf()))); }

  var equals =
    function (m) { return isSameType(Sum, m)
      && _equals(x, m.valueOf()); }

  function concat(method) {
    return function(m) {
      if(!isSameType(Sum, m)) {
        throw new TypeError(("Sum." + method + ": Sum required"))
      }

      return Sum(x + m.valueOf())
    }
  }

  return ( obj = {
    inspect: inspect, toString: inspect, valueOf: valueOf,
    equals: equals, type: type, empty: empty,
    concat: concat('concat')
  }, obj[fl.equals] = equals, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj['@@type'] = _type, obj.constructor = Sum, obj )
}

Sum['@@implements'] = _implements(
  [ 'equals', 'concat', 'empty' ]
)

Sum.empty = _empty
Sum.type = type

Sum[fl.empty] = _empty
Sum['@@type'] = _type

module.exports = Sum


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  alt: __webpack_require__(191),
  ap: __webpack_require__(192),
  bimap: __webpack_require__(193),
  both: __webpack_require__(194),
  chain: __webpack_require__(195),
  coalesce: __webpack_require__(196),
  compareWith: __webpack_require__(197),
  concat: __webpack_require__(198),
  cons: __webpack_require__(199),
  contramap: __webpack_require__(200),
  either: __webpack_require__(201),
  empty: __webpack_require__(202),
  equals: __webpack_require__(203),
  extend: __webpack_require__(204),
  filter: __webpack_require__(205),
  first: __webpack_require__(206),
  fold: __webpack_require__(207),
  foldMap: __webpack_require__(208),
  head: __webpack_require__(209),
  map: __webpack_require__(210),
  merge: __webpack_require__(211),
  option: __webpack_require__(212),
  project: __webpack_require__(213),
  promap: __webpack_require__(214),
  reduce: __webpack_require__(215),
  reduceRight: __webpack_require__(216),
  reject: __webpack_require__(217),
  run: __webpack_require__(218),
  runWith: __webpack_require__(219),
  second: __webpack_require__(220),
  sequence: __webpack_require__(221),
  swap: __webpack_require__(222),
  tail: __webpack_require__(223),
  traverse: __webpack_require__(224),
  valueOf: __webpack_require__(225)
}


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var fl = __webpack_require__(39)
var isAlt = __webpack_require__(37)
var isSameType = __webpack_require__(16)

// alt : Alt m => m a -> m a -> m a
function alt(m, x) {
  if(!(isAlt(m) && isSameType(m, x))) {
    throw new TypeError(
      'alt: Both arguments must be Alts of the same type'
    )
  }

  return (x[fl.alt] || x.alt).call(x, m)
}

module.exports = curry(alt)


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var array = __webpack_require__(100)
var curry = __webpack_require__(3)
var isApplicative = __webpack_require__(42)
var isArray = __webpack_require__(35)
var isSameType = __webpack_require__(16)

// ap :: Applicative m => m a -> m (a -> b) ->  m b
function ap(m, x) {
  if(!((isApplicative(m) || isArray(m)) && isSameType(m, x))) {
    throw new TypeError('ap: Both arguments must be Applys of the same type')
  }

  if(isArray(x)) {
    return array.ap(m, x)
  }

  return x.ap(m)
}

module.exports = curry(ap)


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isBifunctor = __webpack_require__(49)
var isFunction = __webpack_require__(4)
var fl = __webpack_require__(39)

function bimap(f, g, m) {
  if(!(isFunction(f) &&  isFunction(g))) {
    throw new TypeError(
      'bimap: Functions required for first two arguments'
    )
  }

  if(!isBifunctor(m)) {
    throw new TypeError(
      'bimap: Bifunctor required for third argument'
    )
  }

  return (m[fl.bimap] || m.bimap).call(m, f, g)
}

module.exports = curry(bimap)


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Pair = __webpack_require__(15).proxy('Pair')

var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

function both(m) {
  if(isFunction(m)) {
    return function(x) {
      if(!isSameType(Pair, x)) {
        throw new TypeError('both: Pair required as input')
      }

      return x.bimap(m, m)
    }
  }

  if(m && isFunction(m.both)) {
    return m.both()
  }

  throw new TypeError('both: Strong Function or Profunctor required')
}

module.exports = both


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var _chain = __webpack_require__(100).chain
var curry = __webpack_require__(3)
var isArray = __webpack_require__(35)
var isChain = __webpack_require__(54)
var isFunction = __webpack_require__(4)
var fl = __webpack_require__(39)

// chain : Chain m => (a -> m b) -> m a -> m b
function chain(fn, m) {
  if(!isFunction(fn)) {
    throw new TypeError('chain: Chain returning function required for first argument')
  }

  if(!(isChain(m) || isArray(m))) {
    throw new TypeError('chain: Chain of the same type required for second argument')
  }

  if(isArray(m)) {
    return _chain(fn, m)
  }

  return (m[fl.chain] || m.chain).call(m, fn)
}

module.exports = curry(chain)


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

function coalesce(f, g, m) {
  if(!(isFunction(f) && isFunction(g))) {
    throw new TypeError(
      'coalesce: Functions required for first two arguments'
    )
  }

  if(m && isFunction(m.coalesce)) {
    return m.coalesce(f, g)
  }

  throw new TypeError(
    'coalesce: Sum Type required for third argument'
  )
}

module.exports = curry(coalesce)


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

function compareWith(x, y, m) {
  if(!(m && isFunction(m.compareWith))) {
    throw new TypeError('compareWith: Equiv required for third argument')
  }

  return m.compareWith(x, y)
}

module.exports = curry(compareWith)


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isSameType = __webpack_require__(16)
var isSemigroup = __webpack_require__(72)
var fl = __webpack_require__(39)

function concat(x, m) {
  if(!(isSemigroup(m) && isSameType(x, m))) {
    throw new TypeError(
      'concat: Semigroups of the same type required for both arguments'
    )
  }

  return (m[fl.concat] || m.concat).call(m, x)
}

module.exports = curry(concat)


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isArray = __webpack_require__(35)
var isFunction = __webpack_require__(4)

function cons(x, m) {
  if(m && isFunction(m.cons)) {
    return m.cons(x)
  }
  else if(isArray(m)) {
    return [ x ].concat(m)
  }

  throw new TypeError('cons: List or Array required for second argument')
}

module.exports = curry(cons)


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var compose = __webpack_require__(6)
var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isContravariant = __webpack_require__(56)
var fl = __webpack_require__(39)

// contramap : Functor f => (b -> a) -> f b -> f a
function contramap(fn, m) {
  if(!isFunction(fn)) {
    throw new TypeError(
      'contramap: Function required for first argument'
    )
  }

  if(isFunction(m)) {
    return compose(m, fn)
  }

  if(isContravariant(m)) {
    return (m[fl.contramap] || m.contramap).call(m, fn)
  }

  throw new TypeError(
    'contramap: Function or Contavariant Functor of the same type required for second argument'
  )
}

module.exports = curry(contramap)


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

function either(lf, rf, m) {
  if(!(isFunction(lf) && isFunction(rf))) {
    throw new TypeError(
      'either: First two arguments must be functions'
    )
  }

  if(!(m && isFunction(m.either))) {
    throw new TypeError(
      'either: Last argument must be a Sum Type'
    )
  }

  return m.either(lf, rf)
}

module.exports = curry(either)


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var hasAlg = __webpack_require__(38)
var isSameType = __webpack_require__(16)
var fl = __webpack_require__(39)

function empty(m) {
  if(m && hasAlg('empty', m)) {
    return (m[fl.empty] || m.empty).call(m)
  }

  if(m && hasAlg('empty', m.constructor)) {
    return (m.constructor[fl.empty] || m.constructor.empty).call(m)
  }

  if(isSameType([], m)) {
    return []
  }

  if(isSameType('', m)) {
    return ''
  }

  if(isSameType({}, m)) {
    return {}
  }

  throw new TypeError('empty: Monoid, Array, String or Object required')
}

module.exports = empty


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var _equals = __webpack_require__(92)
var curry = __webpack_require__(3)

function equals(x, y) {
  return _equals(x, y)
}

module.exports =
  curry(equals)


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var fl = __webpack_require__(39)
var isExtend = __webpack_require__(60)
var isFunction = __webpack_require__(4)

// extend : Extend w => (w a -> b) -> w a -> w b
function extend(fn, m) {
  if(!isFunction(fn)) {
    throw new TypeError('extend: Function required for first argument')
  }
  if(!isExtend(m)) {
    throw new TypeError('extend: Extend required for second argument')
  }

  return (m[fl.extend] || m.extend).call(m, fn)
}

module.exports = curry(extend)


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)

var isFunction = __webpack_require__(4)
var isPredOrFunc = __webpack_require__(14)
var isObject = __webpack_require__(29)
var object = __webpack_require__(130)
var predOrFunc = __webpack_require__(18)

// filter : Foldable f => (a -> Boolean) -> f a -> f a
function filter(pred, m) {
  if(!isPredOrFunc(pred)) {
    throw new TypeError('filter: Pred or predicate function required for first argument')
  }

  var fn =
    function (x) { return predOrFunc(pred, x); }

  if(m && isFunction(m.filter)) {
    return m.filter(fn)
  }

  if(m && isObject(m)) {
    return object.filter(fn, m)
  }

  throw new TypeError('filter: Foldable or Object required for second argument')
}

module.exports = curry(filter)


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Pair = __webpack_require__(15).proxy('Pair')

var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var identity = function (x) { return x; }

function first(m) {
  if(isFunction(m)) {
    return function(x) {
      if(!isSameType(Pair, x)) {
        throw new TypeError('first: Pair required as input')
      }

      return x.bimap(m, identity)
    }
  }

  if(m && isFunction(m.first)) {
    return m.first()
  }

  throw new TypeError('first: Arrow, Function or Star required')
}

module.exports = first


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var _array = __webpack_require__(100)

var isArray = __webpack_require__(35)
var isFunction = __webpack_require__(4)

// fold : Foldable f, Semigroup s => f s -> s
function fold(m) {
  if(isArray(m)) {
    return _array.fold(m)
  }

  if(m && isFunction(m.fold)) {
    return m.fold()
  }

  throw new TypeError('fold: Non-empty Foldable with at least one Semigroup is required')
}

module.exports = fold


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var _array = __webpack_require__(100)

var curry = __webpack_require__(3)
var isArray = __webpack_require__(35)
var isFunction = __webpack_require__(4)

// foldMap :: Foldable f, Semigroup s => (a -> s) -> f a -> s
function foldMap(fn, m) {
  if(!isFunction(fn)) {
    throw new TypeError(
      'foldMap: Function returning Semigroups of the same type required for first argument'
    )
  }

  if(isArray(m)) {
    return _array.foldMap(fn, m)
  }

  if(m && isFunction(m.foldMap)) {
    return m.foldMap(fn)
  }

  throw new TypeError(
    'foldMap: Non-empty Foldable with at least one Semigroup required for second argument'
  )
}

module.exports = curry(foldMap)


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isArray = __webpack_require__(35)
var isFunction = __webpack_require__(4)
var isString = __webpack_require__(33)

var ref = __webpack_require__(114);
var Nothing = ref.Nothing;
var Just = ref.Just;

function head(m) {
  if(m && isFunction(m.head)) {
    return m.head()
  }

  if(isArray(m) || isString(m)) {
    return !m.length
      ? Nothing()
      : Just(m[0])
  }

  throw new TypeError('head: Array, String or List required')
}

module.exports = head


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var compose = __webpack_require__(6)
var curry = __webpack_require__(3)
var isArray = __webpack_require__(35)
var isObject = __webpack_require__(29)
var isFunction = __webpack_require__(4)
var isFunctor= __webpack_require__(40)

var array = __webpack_require__(100)
var object = __webpack_require__(130)
var fl = __webpack_require__(39)

// map : Functor f => (a -> b) -> f a -> f b
function map(fn, m) {
  if(!isFunction(fn)) {
    throw new TypeError('map: Function required for first argument')
  }

  if(isFunction(m)) {
    return compose(fn, m)
  }

  if(isArray(m)) {
    return array.map(fn, m)
  }

  if(m && isFunctor(m)) {
    return (m[fl.map] || m.map).call(m, fn)
  }

  if(isObject(m)) {
    return object.map(fn, m)
  }

  throw new TypeError('map: Object, Function or Functor of the same type required for second argument')
}

module.exports = curry(map)


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

function merge(fn, m) {
  if(!isFunction(fn)) {
    throw new TypeError('merge: Function required for first argument')
  }

  if(!(m && isFunction(m.merge))) {
    throw new TypeError('merge: Pair or Tuple required for second argument')
  }

  return m.merge(fn)
}

module.exports = curry(merge)


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

function option(x, m) {
  if(!(m && isFunction(m.option))) {
    throw new TypeError('option: Last argument must be a Maybe, First or Last')
  }

  return m.option(x)
}

module.exports = curry(option)


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Karthik Iyengar (karthikiyengar) */

var isFunction = __webpack_require__(4)
var curry = __webpack_require__(3)

function project(index, m) {
  if(!(m && isFunction(m.project))) {
    throw new TypeError('project: Tuple required')
  }

  return m.project(index)
}

module.exports = curry(project)


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var compose = __webpack_require__(6)
var curry = __webpack_require__(3)
var fl = __webpack_require__(39)
var isFunction = __webpack_require__(4)
var isProfunctor = __webpack_require__(78)

function promap(l, r, m) {
  if(!(isFunction(l) && isFunction(r))) {
    throw new TypeError(
      'promap: Functions required for first two arguments'
    )
  }

  if(isFunction(m)) {
    return compose(compose(r, m), l)
  }

  if(isProfunctor(m)) {
    return (m[fl.promap] || m.promap).call(m, l, r)
  }

  throw new TypeError(
    'promap: Function or Profunctor required for third argument'
  )
}

module.exports = curry(promap)


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFoldable = __webpack_require__(62)
var isFunction = __webpack_require__(4)
var fl = __webpack_require__(39)

function reduce(fn, init, m) {
  if(!isFunction(fn)) {
    throw new TypeError(
      'reduce: Function required for first argument'
    )
  }

  if(!isFoldable(m)) {
    throw new TypeError(
      'reduce: Foldable required for third argument'
    )
  }

  return (m[fl.reduce] || m.reduce).call(m, fn, init)
}

module.exports = curry(reduce)


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

function reduceRight(fn, init, m) {
  if(!isFunction(fn)) {
    throw new TypeError('reduceRight: Function required for first argument')
  }
  else if(!(m && isFunction(m.reduceRight))) {
    throw new TypeError('reduceRight: Right Foldable required for third argument')
  }

  return m.reduceRight(fn, init)
}

module.exports = curry(reduceRight)


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isArray = __webpack_require__(35)
var isPredOrFunc = __webpack_require__(14)
var isFunction = __webpack_require__(4)
var isObject = __webpack_require__(29)
var object = __webpack_require__(130)
var predOrFunc = __webpack_require__(18)

var not =
  function (fn) { return function (x) { return !fn(x); }; }

// reject : Foldable f => (a -> Boolean) -> f a -> f a
function reject(pred, m) {
  if(!isPredOrFunc(pred)) {
    throw new TypeError(
      'reject: Pred or predicate function required for first argument'
    )
  }

  var fn =
    function (x) { return predOrFunc(pred, x); }

  if(m && isFunction(m.reject)) {
    return m.reject(fn)
  }

  if(isArray(m)) {
    return m.filter(not(fn))
  }

  if(isObject(m)) {
    return object.filter(not(fn), m)
  }

  throw new TypeError('reject: Foldable or Object required for second argument')
}

module.exports = curry(reject)


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)

function run(m) {
  if(!(m && isFunction(m.run))) {
    throw new TypeError('run: IO required')
  }

  return m.run()
}

module.exports = run


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

function runWith(x, m) {
  if(!(m && isFunction(m.runWith))) {
    throw new TypeError('runWith: Arrow, Endo, Pred, Reader, Star or State required for second argument')
  }

  return m.runWith(x)
}

module.exports = curry(runWith)


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Pair = __webpack_require__(15).proxy('Pair')

var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var identity = function (x) { return x; }

function second(m) {
  if(isFunction(m)) {
    return function(x) {
      if(!isSameType(Pair, x)) {
        throw new TypeError('second: Pair required as input')
      }

      return x.bimap(identity, m)
    }
  }

  if(m && isFunction(m.second)) {
    return m.second()
  }

  throw new TypeError('second: Strong Function or Profunctor required')
}

module.exports = second


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var array = __webpack_require__(100)
var curry = __webpack_require__(3)
var isArray = __webpack_require__(35)
var isApplicative = __webpack_require__(42)
var isFunction = __webpack_require__(4)

function sequence(af, m) {
  if(!(isApplicative(af) || isFunction(af))) {
    throw new TypeError(
      'sequence: Applicative TypeRep or Apply returning function required for first argument'
    )
  }

  if(m && isFunction(m.sequence)) {
    return m.sequence(af)
  }

  if(isArray(m)) {
    return array.sequence(af, m)
  }

  throw new TypeError('sequence: Traversable or Array required for second argument')
}

module.exports = curry(sequence)


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

function swap(f, g, m) {
  if(!(isFunction(f) && isFunction(g))) {
    throw new TypeError(
      'swap: Function required for first two arguments'
    )
  }

  if(m && isFunction(m.swap)) {
    return m.swap(f, g)
  }

  throw new TypeError(
    'swap: Async, Either, Pair or Result required for third arguments'
  )
}

module.exports = curry(swap)


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)
var isNil = __webpack_require__(32)

var ref = __webpack_require__(114);
var Nothing = ref.Nothing;
var Just = ref.Just;

function tail(m) {
  if(!isNil(m)) {
    if(isFunction(m.tail)) {
      return m.tail()
    }

    if(isFunction(m.slice)) {
      return m.length < 2
        ? Nothing()
        : Just(m.slice(1))
    }
  }

  throw new TypeError('tail: Array, String or List required')
}

module.exports = tail


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var array = __webpack_require__(100)
var curry = __webpack_require__(3)
var isApplicative = __webpack_require__(42)
var isArray = __webpack_require__(35)
var isFunction = __webpack_require__(4)

function traverse(af, fn, m) {
  if(!(isApplicative(af) || isFunction(af))) {
    throw new TypeError(
      'traverse: Applicative TypeRep or Apply returning function required for first argument'
    )
  }

  if(!isFunction(fn)) {
    throw new TypeError(
      'traverse: Apply returning function required for second argument'
    )
  }

  if(m && isFunction(m.traverse)) {
    return m.traverse(af, fn)
  }

  if(isArray(m)) {
    return array.traverse(af, fn, m)
  }

  throw new TypeError('traverse: Traversable or Array required for third argument')
}

module.exports = curry(traverse)


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isNil = __webpack_require__(32)

function valueOf(m) {
  if(isNil(m)) {
    return m
  }

  return m.valueOf()
}

module.exports = valueOf


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

function evalWith(x, m) {
  if(!(m && isFunction(m.evalWith))) {
    throw new TypeError('evalWith: State required for second argument')
  }

  return m.evalWith(x)
}

module.exports = curry(evalWith)


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

function execWith(x, m) {
  if(!(m && isFunction(m.execWith))) {
    throw new TypeError('execWith: State required for second argument')
  }

  return m.execWith(x)
}

module.exports = curry(execWith)


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)

function fst(m) {
  if(!(m && isFunction(m.fst))) {
    throw new TypeError('fst: Pair required')
  }

  return m.fst()
}

module.exports = fst


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)

function log(m) {
  if(!(m && isFunction(m.log))) {
    throw new TypeError('log: Writer required')
  }

  return m.log()
}

module.exports = log


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Karthik Iyengar (karthikiyengar) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isInteger = __webpack_require__(30)
var isSameType = __webpack_require__(16)
var Tuple = __webpack_require__(125)

var validTuple = function (n, m) { return isSameType(Tuple(n), m); }

function runMap(m, fns) {
  var n = fns.length
  if (!validTuple(n, m)) {
    throw new TypeError(("nmap: " + n + "-Tuple required"))
  }

  fns.forEach(function (fn) {
    if (!isFunction(fn)) {
      throw new TypeError('nmap: Functions required for all arguments')
    }
  })

  return m.mapAll.apply(m, fns)
}

var withLength = function (n, fn) {
  return Object.defineProperty(fn, 'length', {
    value: n
  })
}

function nmap(n) {
  if (!(isInteger(n) && n >= 1)) {
    throw new TypeError('nmap: Integer required for first argument')
  }

  switch (n) {
  case 1:
    return function (a, m) { return runMap(m, [ a ]); }
  case 2:
    return function (a, b, m) { return runMap(m, [ a, b ]); }
  case 3:
    return function (a, b, c, m) { return runMap(m, [ a, b, c ]); }
  case 4:
    return function (a, b, c, d, m) { return runMap(m, [ a, b, c, d ]); }
  case 5:
    return function (a, b, c, d, e, m) { return runMap(m, [ a, b, c, d, e ]); }
  case 6:
    return function (a, b, c, d, e, f, m) { return runMap(m, [ a, b, c, d, e, f ]); }
  case 7:
    return function (a, b, c, d, e, f, g, m) { return runMap(m, [ a, b, c, d, e, f, g ]); }
  case 8:
    return function (a, b, c, d, e, f, g, h, m) { return runMap(m, [ a, b, c, d, e, f, g, h ]); }
  case 9:
    return function (a, b, c, d, e, f, g, h, i, m) { return runMap(m, [ a, b, c, d, e, f, g, h, i ]); }
  case 10:
    return function (a, b, c, d, e, f, g, h, i, j, m) { return runMap(m, [ a, b, c, d, e, f, g, h, i, j ]); }
  default:
    return withLength(n + 1, function() {
      var parts = [].slice.call(arguments)
      return runMap(parts[parts.length - 1], parts.slice(0, parts.length - 1))
    })
  }
}

module.exports =
  curry(nmap)


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isSameType = __webpack_require__(16)

var Async = __webpack_require__(15).proxy('Async')

function race(m, a) {
  if(!(isSameType(m, a) && isSameType(Async, m))) {
    throw new TypeError('race: Both arguments must be Asyncs')
  }

  return a.race(m)
}

module.exports =
  curry(race)


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)

function read(m) {
  if(!(m && isFunction(m.read))) {
    throw new TypeError('read: Writer required')
  }

  return m.read()
}

module.exports = read



/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var isFunction = __webpack_require__(4)

function snd(m) {
  if(!(m && isFunction(m.snd))) {
    throw new TypeError('snd: Pair required')
  }

  return m.snd()
}

module.exports = snd


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var List = __webpack_require__(112)

var curry = __webpack_require__(3)
var isArray = __webpack_require__(35)
var isFunction = __webpack_require__(4)

// arrayToList : [ a ] -> List a
// arrayToList : (a -> [ b ]) -> a -> List b
function arrayToList(array) {
  if(isArray(array)) {
    return List.fromArray(array)
  }
  else if(isFunction(array)) {
    return function(x) {
      var g = array(x)

      if(!isArray(g)) {
        throw new TypeError('arrayToList: Array returning function required')
      }

      return List.fromArray(g)
    }
  }

  throw new TypeError('arrayToList: Array or Array returning function required')
}

module.exports = curry(arrayToList)


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Dale Francis */

var curry = __webpack_require__(3)
var isSameType = __webpack_require__(16)
var isFunction = __webpack_require__(4)

var Async = __webpack_require__(15).proxy('Async')

var toPromise = function (m) {
  if(!isSameType(Async, m)) {
    throw new TypeError('asyncToPromise: Async or a function returning an Async required')
  }

  return m.toPromise()
}

// asyncToPromise :: m e a -> Promise a e
// asyncToPromise :: (a -> m e b) -> a -> Promise b e
function asyncToPromise(m) {
  return isFunction(m)
    ? function (x) { return toPromise(m(x)); }
    : toPromise(m)
}

module.exports = curry(asyncToPromise)


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Async = __webpack_require__(99)
var Either = __webpack_require__(15).proxy('Either')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (either) { return either.either(Async.Rejected, Async.Resolved); }

// eitherToAsync : Either e a -> Async e a
// eitherToAsync : (a -> Either e b) -> a -> Async e b
function eitherToAsync(either) {
  if(isFunction(either)) {
    return function(x) {
      var m = either(x)

      if(!isSameType(Either, m)) {
        throw new TypeError('eitherToAsync: Either returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(Either, either)) {
    return applyTransform(either)
  }

  throw new TypeError('eitherToAsync: Either or Either returning function required')
}

module.exports = curry(eitherToAsync)


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var First = __webpack_require__(184)
var Either = __webpack_require__(15).proxy('Either')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (either) { return either.either(First.empty, First); }

// eitherToFirst : Either b a -> First a
// eitherToFirst : (a -> Either c b) -> a -> First b
function eitherToFirst(either) {
  if(isFunction(either)) {
    return function(x) {
      var m = either(x)

      if(!isSameType(Either, m)) {
        throw new TypeError('eitherToFirst: Either returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(Either, either)) {
    return applyTransform(either)
  }

  throw new TypeError('eitherToFirst: Either or Either returning function required')
}

module.exports = curry(eitherToFirst)


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Last = __webpack_require__(185)
var Either = __webpack_require__(15).proxy('Either')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (either) { return either.either(Last.empty, Last); }

// eitherToLast : Either b a -> Last a
// eitherToLast : (a -> Either c b) -> a -> Last b
function eitherToLast(either) {
  if(isFunction(either)) {
    return function(x) {
      var m = either(x)

      if(!isSameType(Either, m)) {
        throw new TypeError('eitherToLast: Either returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(Either, either)) {
    return applyTransform(either)
  }

  throw new TypeError('eitherToLast: Either or Either returning function required')
}

module.exports = curry(eitherToLast)


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Maybe = __webpack_require__(115)
var Either = __webpack_require__(15).proxy('Either')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (either) { return either.either(Maybe.Nothing, Maybe.Just); }

// eitherToMaybe : Either b a -> Maybe a
// eitherToMaybe : (a -> Either c b) -> a -> Maybe b
function eitherToMaybe(either) {
  if(isFunction(either)) {
    return function(x) {
      var m = either(x)

      if(!isSameType(Either, m)) {
        throw new TypeError('eitherToMaybe: Either returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(Either, either)) {
    return applyTransform(either)
  }

  throw new TypeError('eitherToMaybe: Either or Either returning function required')
}

module.exports = curry(eitherToMaybe)


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Result = __webpack_require__(121)
var Either = __webpack_require__(15).proxy('Either')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (either) { return either.either(Result.Err, Result.Ok); }

// eitherToResult : Either e a -> Result e a
// eitherToResult : (a -> Either e b) -> a -> Result e b
function eitherToResult(either) {
  if(isFunction(either)) {
    return function(x) {
      var m = either(x)

      if(!isSameType(Either, m)) {
        throw new TypeError('eitherToResult: Either returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(Either, either)) {
    return applyTransform(either)
  }

  throw new TypeError('eitherToResult: Either or Either returning function required')
}

module.exports = curry(eitherToResult)


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Async = __webpack_require__(99)
var First = __webpack_require__(15).proxy('First')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var constant = function (x) { return function () { return x; }; }

var applyTransform = function (left, first) { return first.valueOf().either(
    constant(Async.Rejected(left)),
    Async.Resolved
  ); }

// firstToAsync : e -> First a -> Async e a
// firstToAsync : e -> (a -> First b) -> a -> Async e b
function firstToAsync(left, first) {
  if(isFunction(first)) {
    return function(x) {
      var m = first(x)

      if(!isSameType(First, m)) {
        throw new TypeError('firstToAsync: First returning function required for second argument')
      }

      return applyTransform(left, m)
    }
  }

  if(isSameType(First, first)) {
    return applyTransform(left, first)
  }

  throw new TypeError('firstToAsync: First or First returning function required for second argument')
}

module.exports = curry(firstToAsync)


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Either = __webpack_require__(106)
var First = __webpack_require__(15).proxy('First')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var constant = function (x) { return function () { return x; }; }

var applyTransform = function (left, first) { return first.valueOf().either(
    constant(Either.Left(left)),
    Either.Right
  ); }

// firstToEither : c -> First a -> Either c a
// firstToEither : c -> (a -> First b) -> a -> Either c b
function firstToEither(left, first) {
  if(isFunction(first)) {
    return function(x) {
      var m = first(x)

      if(!isSameType(First, m)) {
        throw new TypeError('firstToEither: First returning function required for second argument')
      }

      return applyTransform(left, m)
    }
  }

  if(isSameType(First, first)) {
    return applyTransform(left, first)
  }

  throw new TypeError('firstToEither: First or First returning function required for second argument')
}

module.exports = curry(firstToEither)


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Last = __webpack_require__(185)
var First = __webpack_require__(15).proxy('First')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (first) { return Last(first.valueOf()); }

// firstToLast : First a -> Last a
// firstToLast : (a -> First b) -> a -> Last b
function firstToLast(first) {
  if(isFunction(first)) {
    return function(x) {
      var m = first(x)

      if(!isSameType(First, m)) {
        throw new TypeError('firstToLast: First returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(First, first)) {
    return applyTransform(first)
  }

  throw new TypeError('firstToLast: First or First returning function required')
}

module.exports = curry(firstToLast)


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var First = __webpack_require__(15).proxy('First')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (first) { return first.valueOf(); }

// firstToMaybe : First a -> Maybe a
// firstToMaybe : (a -> First b) -> a -> Maybe b
function firstToMaybe(first) {
  if(isFunction(first)) {
    return function(x) {
      var m = first(x)

      if(!isSameType(First, m)) {
        throw new TypeError('firstToMaybe: First returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(First, first)) {
    return applyTransform(first)
  }

  throw new TypeError('firstToMaybe: First or First returning function required')
}

module.exports = curry(firstToMaybe)


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Result = __webpack_require__(121)
var First = __webpack_require__(15).proxy('First')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var constant = function (x) { return function () { return x; }; }

var applyTransform = function (left, first) { return first.valueOf().either(
    constant(Result.Err(left)),
    Result.Ok
  ); }

// firstToResult : c -> First a -> Result c a
// firstToResult : c -> (a -> First b) -> a -> Result c b
function firstToResult(left, first) {
  if(isFunction(first)) {
    return function(x) {
      var m = first(x)

      if(!isSameType(First, m)) {
        throw new TypeError('firstToResult: First returning function required for second argument')
      }

      return applyTransform(left, m)
    }
  }

  if(isSameType(First, first)) {
    return applyTransform(left, first)
  }

  throw new TypeError('firstToResult: First or First returning function required for second argument')
}

module.exports = curry(firstToResult)


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Async = __webpack_require__(99)
var Last = __webpack_require__(15).proxy('Last')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var constant = function (x) { return function () { return x; }; }

var applyTransform = function (left, last) { return last.valueOf().either(
    constant(Async.Rejected(left)),
    Async.Resolved
  ); }

// lastToAsync : e -> Last a -> Async e a
// lastToAsync : e -> (a -> Last b) -> a -> Async e b
function lastToAsync(left, last) {
  if(isFunction(last)) {
    return function(x) {
      var m = last(x)

      if(!isSameType(Last, m)) {
        throw new TypeError('lastToAsync: Last returning function required for second argument')
      }

      return applyTransform(left, m)
    }
  }

  if(isSameType(Last, last)) {
    return applyTransform(left, last)
  }

  throw new TypeError('lastToAsync: Last or Last returning function required for second argument')
}

module.exports = curry(lastToAsync)


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Either = __webpack_require__(106)
var Last = __webpack_require__(15).proxy('Last')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var constant = function (x) { return function () { return x; }; }

var applyTransform = function (left, last) { return last.valueOf().either(
    constant(Either.Left(left)),
    Either.Right
  ); }

// lastToEither : c -> Last a -> Either c a
// lastToEither : c -> (a -> Last b) -> a -> Either c b
function lastToEither(left, last) {
  if(isFunction(last)) {
    return function(x) {
      var m = last(x)

      if(!isSameType(Last, m)) {
        throw new TypeError('lastToEither: Last returning function required for second argument')
      }

      return applyTransform(left, m)
    }
  }

  if(isSameType(Last, last)) {
    return applyTransform(left, last)
  }

  throw new TypeError('lastToEither: Last or Last returning function required for second argument')
}

module.exports = curry(lastToEither)


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var First = __webpack_require__(184)
var Last = __webpack_require__(15).proxy('Last')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (last) { return First(last.valueOf()); }

// lastToFirst : Last a -> First a
// lastToFirst : (a -> Last b) -> a -> First b
function lastToFirst(last) {
  if(isFunction(last)) {
    return function(x) {
      var m = last(x)

      if(!isSameType(Last, m)) {
        throw new TypeError('lastToFirst: Last returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(Last, last)) {
    return applyTransform(last)
  }

  throw new TypeError('lastToFirst: Last or Last returning function required')
}

module.exports = curry(lastToFirst)


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Last = __webpack_require__(15).proxy('Last')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (last) { return last.valueOf(); }

// lastToMaybe : Last a -> Maybe a
// lastToMaybe : (a -> Last b) -> a -> Maybe b
function lastToMaybe(last) {
  if(isFunction(last)) {
    return function(x) {
      var m = last(x)

      if(!isSameType(Last, m)) {
        throw new TypeError('lastToMaybe: Last returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(Last, last)) {
    return applyTransform(last)
  }

  throw new TypeError('lastToMaybe: Last or Last returning function required')
}

module.exports = curry(lastToMaybe)


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Result = __webpack_require__(121)
var Last = __webpack_require__(15).proxy('Last')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var constant = function (x) { return function () { return x; }; }

var applyTransform = function (left, last) { return last.valueOf().either(
    constant(Result.Err(left)),
    Result.Ok
  ); }

// lastToResult : c -> Last a -> Result c a
// lastToResult : c -> (a -> Last b) -> a -> Result c b
function lastToResult(left, last) {
  if(isFunction(last)) {
    return function(x) {
      var m = last(x)

      if(!isSameType(Last, m)) {
        throw new TypeError('lastToResult: Last returning function required for second argument')
      }

      return applyTransform(left, m)
    }
  }

  if(isSameType(Last, last)) {
    return applyTransform(left, last)
  }

  throw new TypeError('lastToResult: Last or Last returning function required for second argument')
}

module.exports = curry(lastToResult)


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var List = __webpack_require__(112)

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

// listToArray : List a -> [ a ]
// listToArray : (a -> List b) -> a -> [ b ]
function listToArray(list) {
  if(isFunction(list)) {
    return function(x) {
      var m = list(x)

      if(!isSameType(List, m)) {
        throw new TypeError('listToArray: List returning function required')
      }

      return m.toArray()
    }
  }

  if(isSameType(List, list)) {
    return list.toArray()
  }

  throw new TypeError('listToArray: List or List returning function required')
}

module.exports = curry(listToArray)


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Async = __webpack_require__(99)
var Maybe = __webpack_require__(15).proxy('Maybe')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var constant = function (x) { return function () { return x; }; }

var applyTransform = function (left, maybe) { return maybe.either(
    constant(Async.Rejected(left)),
    Async.Resolved
  ); }

// maybeToAsync : e -> Maybe a -> Async e a
// maybeToAsync : e -> (a -> Maybe b) -> a -> Async e b
function maybeToAsync(left, maybe) {
  if(isFunction(maybe)) {
    return function(x) {
      var m = maybe(x)

      if(!isSameType(Maybe, m)) {
        throw new TypeError('maybeToAsync: Maybe returning function required for second argument')
      }

      return applyTransform(left, m)
    }
  }

  if(isSameType(Maybe, maybe)) {
    return applyTransform(left, maybe)
  }

  throw new TypeError('maybeToAsync: Maybe or Maybe returning function required for second argument')
}

module.exports = curry(maybeToAsync)


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Either = __webpack_require__(106)
var Maybe = __webpack_require__(15).proxy('Maybe')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var constant = function (x) { return function () { return x; }; }

var applyTransform = function (left, maybe) { return maybe.either(
    constant(Either.Left(left)),
    Either.Right
  ); }

// maybeToEither : c -> Maybe a -> Either c a
// maybeToEither : c -> (a -> Maybe b) -> a -> Either c b
function maybeToEither(left, maybe) {
  if(isFunction(maybe)) {
    return function(x) {
      var m = maybe(x)

      if(!isSameType(Maybe, m)) {
        throw new TypeError('maybeToEither: Maybe returning function required for second argument')
      }

      return applyTransform(left, m)
    }
  }

  if(isSameType(Maybe, maybe)) {
    return applyTransform(left, maybe)
  }

  throw new TypeError('maybeToEither: Maybe or Maybe returning function required for second argument')
}

module.exports = curry(maybeToEither)


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var First = __webpack_require__(184)
var Maybe = __webpack_require__(15).proxy('Maybe')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (maybe) { return First(maybe); }

// maybeToFirst : Maybe a -> First a
// maybeToFirst : (a -> Maybe b) -> a -> First b
function maybeToFirst(maybe) {
  if(isFunction(maybe)) {
    return function(x) {
      var m = maybe(x)

      if(!isSameType(Maybe, m)) {
        throw new TypeError('maybeToFirst: Maybe returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(Maybe, maybe)) {
    return applyTransform(maybe)
  }

  throw new TypeError('maybeToFirst: Maybe or Maybe returning function required')
}

module.exports = curry(maybeToFirst)


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Last = __webpack_require__(185)
var Maybe = __webpack_require__(15).proxy('Maybe')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (maybe) { return Last(maybe); }

// maybeToLast : Maybe a -> Last a
// maybeToLast : (a -> Maybe b) -> a -> Last b
function maybeToLast(maybe) {
  if(isFunction(maybe)) {
    return function(x) {
      var m = maybe(x)

      if(!isSameType(Maybe, m)) {
        throw new TypeError('maybeToLast: Maybe returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(Maybe, maybe)) {
    return applyTransform(maybe)
  }

  throw new TypeError('maybeToLast: Maybe or Maybe returning function required')
}

module.exports = curry(maybeToLast)


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Result = __webpack_require__(121)
var Maybe = __webpack_require__(15).proxy('Maybe')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var constant = function (x) { return function () { return x; }; }

var applyTransform = function (left, maybe) { return maybe.either(
    constant(Result.Err(left)),
    Result.Ok
  ); }

// maybeToResult : c -> Maybe a -> Result c a
// maybeToResult : c -> (a -> Maybe b) -> a -> Result c b
function maybeToResult(left, maybe) {
  if(isFunction(maybe)) {
    return function(x) {
      var m = maybe(x)

      if(!isSameType(Maybe, m)) {
        throw new TypeError('maybeToResult: Maybe returning function required for second argument')
      }

      return applyTransform(left, m)
    }
  }

  if(isSameType(Maybe, maybe)) {
    return applyTransform(left, maybe)
  }

  throw new TypeError('maybeToResult: Maybe or Maybe returning function required for second argument')
}

module.exports = curry(maybeToResult)


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Async = __webpack_require__(99)
var Result = __webpack_require__(15).proxy('Result')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (either) { return either.either(Async.Rejected, Async.Resolved); }

// resultToAsync : Result e a -> Async e a
// resultToAsync : (a -> Result e b) -> a -> Async e b
function resultToAsync(result) {
  if(isFunction(result)) {
    return function(x) {
      var m = result(x)

      if(!isSameType(Result, m)) {
        throw new TypeError('resultToAsync: Result returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(Result, result)) {
    return applyTransform(result)
  }

  throw new TypeError('resultToAsync: Result or Result returning function required')
}

module.exports = curry(resultToAsync)


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Either = __webpack_require__(106)
var Result = __webpack_require__(15).proxy('Result')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (result) { return result.either(Either.Left, Either.Right); }

// resultToEither : Result e a -> Either e a
// resultToEither : (a -> Result e b) -> a -> Either e b
function resultToEither(result) {
  if(isFunction(result)) {
    return function(x) {
      var m = result(x)

      if(!isSameType(Result, m)) {
        throw new TypeError('resultToEither: Result returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(Result, result)) {
    return applyTransform(result)
  }

  throw new TypeError('resultToEither: Result or Result returning function required')
}

module.exports = curry(resultToEither)


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var First = __webpack_require__(184)
var Result = __webpack_require__(15).proxy('Result')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (result) { return result.either(First.empty, First); }

// resultToFirst : Result b a -> First a
// resultToFirst : (a -> Result c b) -> a -> First b
function resultToFirst(result) {
  if(isFunction(result)) {
    return function(x) {
      var m = result(x)

      if(!isSameType(Result, m)) {
        throw new TypeError('resultToFirst: Result returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(Result, result)) {
    return applyTransform(result)
  }

  throw new TypeError('resultToFirst: Result or Result returning function required')
}

module.exports = curry(resultToFirst)


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Last = __webpack_require__(185)
var Result = __webpack_require__(15).proxy('Result')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (result) { return result.either(Last.empty, Last); }

// resultToLast : Result b a -> Last a
// resultToLast : (a -> Result c b) -> a -> Last b
function resultToLast(result) {
  if(isFunction(result)) {
    return function(x) {
      var m = result(x)

      if(!isSameType(Result, m)) {
        throw new TypeError('resultToLast: Result returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(Result, result)) {
    return applyTransform(result)
  }

  throw new TypeError('resultToLast: Result or Result returning function required')
}

module.exports = curry(resultToLast)


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var Maybe = __webpack_require__(115)
var Result = __webpack_require__(15).proxy('Result')

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)
var isSameType = __webpack_require__(16)

var applyTransform = function (result) { return result.either(Maybe.Nothing, Maybe.Just); }

// resultToMaybe : Result b a -> Maybe a
// resultToMaybe : (a -> Result c b) -> a -> Maybe b
function resultToMaybe(result) {
  if(isFunction(result)) {
    return function(x) {
      var m = result(x)

      if(!isSameType(Result, m)) {
        throw new TypeError('resultToMaybe: Result returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(Result, result)) {
    return applyTransform(result)
  }

  throw new TypeError('resultToMaybe: Result or Result returning function required')
}

module.exports = curry(resultToMaybe)


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

var curry = __webpack_require__(3)
var isFunction = __webpack_require__(4)

var isWriter =
  function (x) { return !!x && isFunction(x.read); }

var applyTransform = function (w) { return w.read(); }

// writerToPair : Monoid m => Writer m a -> Pair m a
// writerToPair : Monoid m => (a -> Writer m a) -> Pair m b
function writerToPair(writer) {
  if(isFunction(writer)) {
    return function(x) {
      var m = writer(x)

      if(!isWriter(m)) {
        throw new TypeError('writerToPair: Writer returning function required')
      }

      return applyTransform(m)
    }
  }

  if(isWriter(writer)) {
    return applyTransform(writer)
  }

  throw new TypeError('writerToPair: Writer or Writer returning function required')
}

module.exports = curry(writerToPair)


/***/ })
/******/ ]);
});