(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */

	function copyArray$1(source, array) {
	  var index = -1,
	      length = source.length;
	  array || (array = Array(length));

	  while (++index < length) {
	    array[index] = source[index];
	  }

	  return array;
	}

	var _copyArray = copyArray$1;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeFloor = Math.floor,
	    nativeRandom = Math.random;
	/**
	 * The base implementation of `_.random` without support for returning
	 * floating-point numbers.
	 *
	 * @private
	 * @param {number} lower The lower bound.
	 * @param {number} upper The upper bound.
	 * @returns {number} Returns the random number.
	 */

	function baseRandom$1(lower, upper) {
	  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
	}

	var _baseRandom = baseRandom$1;

	var baseRandom = _baseRandom;
	/**
	 * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
	 *
	 * @private
	 * @param {Array} array The array to shuffle.
	 * @param {number} [size=array.length] The size of `array`.
	 * @returns {Array} Returns `array`.
	 */

	function shuffleSelf$2(array, size) {
	  var index = -1,
	      length = array.length,
	      lastIndex = length - 1;
	  size = size === undefined ? length : size;

	  while (++index < size) {
	    var rand = baseRandom(index, lastIndex),
	        value = array[rand];
	    array[rand] = array[index];
	    array[index] = value;
	  }

	  array.length = size;
	  return array;
	}

	var _shuffleSelf = shuffleSelf$2;

	var copyArray = _copyArray,
	    shuffleSelf$1 = _shuffleSelf;
	/**
	 * A specialized version of `_.shuffle` for arrays.
	 *
	 * @private
	 * @param {Array} array The array to shuffle.
	 * @returns {Array} Returns the new shuffled array.
	 */

	function arrayShuffle$1(array) {
	  return shuffleSelf$1(copyArray(array));
	}

	var _arrayShuffle = arrayShuffle$1;

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */

	function arrayMap$1(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }

	  return result;
	}

	var _arrayMap = arrayMap$1;

	var arrayMap = _arrayMap;
	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */

	function baseValues$1(object, props) {
	  return arrayMap(props, function (key) {
	    return object[key];
	  });
	}

	var _baseValues = baseValues$1;

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */

	function baseTimes$1(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }

	  return result;
	}

	var _baseTimes = baseTimes$1;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
	var _freeGlobal = freeGlobal$1;

	var freeGlobal = _freeGlobal;
	/** Detect free variable `self`. */

	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	/** Used as a reference to the global object. */

	var root$1 = freeGlobal || freeSelf || Function('return this')();
	var _root = root$1;

	var root = _root;
	/** Built-in value references. */

	var Symbol$2 = root.Symbol;
	var _Symbol = Symbol$2;

	var Symbol$1 = _Symbol;
	/** Used for built-in method references. */

	var objectProto$5 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$3 = objectProto$5.hasOwnProperty;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var nativeObjectToString$1 = objectProto$5.toString;
	/** Built-in value references. */

	var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */

	function getRawTag$1(value) {
	  var isOwn = hasOwnProperty$3.call(value, symToStringTag$1),
	      tag = value[symToStringTag$1];

	  try {
	    value[symToStringTag$1] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString$1.call(value);

	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag$1] = tag;
	    } else {
	      delete value[symToStringTag$1];
	    }
	  }

	  return result;
	}

	var _getRawTag = getRawTag$1;

	/** Used for built-in method references. */
	var objectProto$4 = Object.prototype;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var nativeObjectToString = objectProto$4.toString;
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */

	function objectToString$1(value) {
	  return nativeObjectToString.call(value);
	}

	var _objectToString = objectToString$1;

	var Symbol = _Symbol,
	    getRawTag = _getRawTag,
	    objectToString = _objectToString;
	/** `Object#toString` result references. */

	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';
	/** Built-in value references. */

	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */

	function baseGetTag$3(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }

	  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
	}

	var _baseGetTag = baseGetTag$3;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */

	function isObjectLike$3(value) {
	  return value != null && typeof value == 'object';
	}

	var isObjectLike_1 = isObjectLike$3;

	var baseGetTag$2 = _baseGetTag,
	    isObjectLike$2 = isObjectLike_1;
	/** `Object#toString` result references. */

	var argsTag$1 = '[object Arguments]';
	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */

	function baseIsArguments$1(value) {
	  return isObjectLike$2(value) && baseGetTag$2(value) == argsTag$1;
	}

	var _baseIsArguments = baseIsArguments$1;

	var baseIsArguments = _baseIsArguments,
	    isObjectLike$1 = isObjectLike_1;
	/** Used for built-in method references. */

	var objectProto$3 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
	/** Built-in value references. */

	var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */

	var isArguments$1 = baseIsArguments(function () {
	  return arguments;
	}()) ? baseIsArguments : function (value) {
	  return isObjectLike$1(value) && hasOwnProperty$2.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	};
	var isArguments_1 = isArguments$1;

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray$2 = Array.isArray;
	var isArray_1 = isArray$2;

	var isBuffer$1 = {exports: {}};

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */

	function stubFalse() {
	  return false;
	}

	var stubFalse_1 = stubFalse;

	(function (module, exports) {
	  var root = _root,
	      stubFalse = stubFalse_1;
	  /** Detect free variable `exports`. */

	  var freeExports = exports && !exports.nodeType && exports;
	  /** Detect free variable `module`. */

	  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
	  /** Detect the popular CommonJS extension `module.exports`. */

	  var moduleExports = freeModule && freeModule.exports === freeExports;
	  /** Built-in value references. */

	  var Buffer = moduleExports ? root.Buffer : undefined;
	  /* Built-in method references for those with the same name as other `lodash` methods. */

	  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
	  /**
	   * Checks if `value` is a buffer.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.3.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	   * @example
	   *
	   * _.isBuffer(new Buffer(2));
	   * // => true
	   *
	   * _.isBuffer(new Uint8Array(2));
	   * // => false
	   */

	  var isBuffer = nativeIsBuffer || stubFalse;
	  module.exports = isBuffer;
	})(isBuffer$1, isBuffer$1.exports);

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER$1 = 9007199254740991;
	/** Used to detect unsigned integer values. */

	var reIsUint = /^(?:0|[1-9]\d*)$/;
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */

	function isIndex$1(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER$1 : length;
	  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}

	var _isIndex = isIndex$1;

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */

	function isLength$2(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	var isLength_1 = isLength$2;

	var baseGetTag$1 = _baseGetTag,
	    isLength$1 = isLength_1,
	    isObjectLike = isObjectLike_1;
	/** `Object#toString` result references. */

	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag$1 = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	/** Used to identify `toStringTag` values of typed arrays. */

	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */

	function baseIsTypedArray$1(value) {
	  return isObjectLike(value) && isLength$1(value.length) && !!typedArrayTags[baseGetTag$1(value)];
	}

	var _baseIsTypedArray = baseIsTypedArray$1;

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */

	function baseUnary$1(func) {
	  return function (value) {
	    return func(value);
	  };
	}

	var _baseUnary = baseUnary$1;

	var _nodeUtil = {exports: {}};

	(function (module, exports) {
	  var freeGlobal = _freeGlobal;
	  /** Detect free variable `exports`. */

	  var freeExports = exports && !exports.nodeType && exports;
	  /** Detect free variable `module`. */

	  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
	  /** Detect the popular CommonJS extension `module.exports`. */

	  var moduleExports = freeModule && freeModule.exports === freeExports;
	  /** Detect free variable `process` from Node.js. */

	  var freeProcess = moduleExports && freeGlobal.process;
	  /** Used to access faster Node.js helpers. */

	  var nodeUtil = function () {
	    try {
	      // Use `util.types` for Node.js 10+.
	      var types = freeModule && freeModule.require && freeModule.require('util').types;

	      if (types) {
	        return types;
	      } // Legacy `process.binding('util')` for Node.js < 10.


	      return freeProcess && freeProcess.binding && freeProcess.binding('util');
	    } catch (e) {}
	  }();

	  module.exports = nodeUtil;
	})(_nodeUtil, _nodeUtil.exports);

	var baseIsTypedArray = _baseIsTypedArray,
	    baseUnary = _baseUnary,
	    nodeUtil = _nodeUtil.exports;
	/* Node.js helper references. */

	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */

	var isTypedArray$1 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	var isTypedArray_1 = isTypedArray$1;

	var baseTimes = _baseTimes,
	    isArguments = isArguments_1,
	    isArray$1 = isArray_1,
	    isBuffer = isBuffer$1.exports,
	    isIndex = _isIndex,
	    isTypedArray = isTypedArray_1;
	/** Used for built-in method references. */

	var objectProto$2 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */

	function arrayLikeKeys$1(value, inherited) {
	  var isArr = isArray$1(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty$1.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
	    key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
	    isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
	    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
	    isIndex(key, length)))) {
	      result.push(key);
	    }
	  }

	  return result;
	}

	var _arrayLikeKeys = arrayLikeKeys$1;

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */

	function isPrototype$1(value) {
	  var Ctor = value && value.constructor,
	      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$1;
	  return value === proto;
	}

	var _isPrototype = isPrototype$1;

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */

	function overArg$1(func, transform) {
	  return function (arg) {
	    return func(transform(arg));
	  };
	}

	var _overArg = overArg$1;

	var overArg = _overArg;
	/* Built-in method references for those with the same name as other `lodash` methods. */

	var nativeKeys$1 = overArg(Object.keys, Object);
	var _nativeKeys = nativeKeys$1;

	var isPrototype = _isPrototype,
	    nativeKeys = _nativeKeys;
	/** Used for built-in method references. */

	var objectProto = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty = objectProto.hasOwnProperty;
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */

	function baseKeys$1(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }

	  var result = [];

	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }

	  return result;
	}

	var _baseKeys = baseKeys$1;

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */

	function isObject$1(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	var isObject_1 = isObject$1;

	var baseGetTag = _baseGetTag,
	    isObject = isObject_1;
	/** `Object#toString` result references. */

	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */

	function isFunction$1(value) {
	  if (!isObject(value)) {
	    return false;
	  } // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.


	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	var isFunction_1 = isFunction$1;

	var isFunction = isFunction_1,
	    isLength = isLength_1;
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */

	function isArrayLike$1(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	var isArrayLike_1 = isArrayLike$1;

	var arrayLikeKeys = _arrayLikeKeys,
	    baseKeys = _baseKeys,
	    isArrayLike = isArrayLike_1;
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */

	function keys$1(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	var keys_1 = keys$1;

	var baseValues = _baseValues,
	    keys = keys_1;
	/**
	 * Creates an array of the own enumerable string keyed property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */

	function values$1(object) {
	  return object == null ? [] : baseValues(object, keys(object));
	}

	var values_1 = values$1;

	var shuffleSelf = _shuffleSelf,
	    values = values_1;
	/**
	 * The base implementation of `_.shuffle`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to shuffle.
	 * @returns {Array} Returns the new shuffled array.
	 */

	function baseShuffle$1(collection) {
	  return shuffleSelf(values(collection));
	}

	var _baseShuffle = baseShuffle$1;

	var arrayShuffle = _arrayShuffle,
	    baseShuffle = _baseShuffle,
	    isArray = isArray_1;
	/**
	 * Creates an array of shuffled values, using a version of the
	 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to shuffle.
	 * @returns {Array} Returns the new shuffled array.
	 * @example
	 *
	 * _.shuffle([1, 2, 3, 4]);
	 * // => [4, 1, 3, 2]
	 */

	function shuffle(collection) {
	  var func = isArray(collection) ? arrayShuffle : baseShuffle;
	  return func(collection);
	}

	var shuffle_1 = shuffle;

	(function () {

	  var init = function init() {
	    console.log('init:', shuffle_1([1, 2, 3]));
	  }; // === EVENTS / XHR =======
	  // === FUNCTIONS ====


	  init();
	})();

})();
//# sourceMappingURL=../map/bundle.js.map
