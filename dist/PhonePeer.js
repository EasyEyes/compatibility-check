/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["EasyEyesPeer"] = factory();
	else
		root["EasyEyesPeer"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/PhonePeer.js":
/*!**************************!*\
  !*** ./src/PhonePeer.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  PhonePeer\n} = __webpack_require__(/*! ./main */ \"./src/main.js\");\nconsole.log(\"\\n    Welcome to the compatibility check endpoint.\\n    This page will be accessed from the participant's phone.\\n  \");\nasync function main() {\n  // Create custom alert elements\n  const modalHtml = \"\\n    <div id=\\\"customAlert\\\" style=\\\"display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000;\\\">\\n      <div style=\\\"position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border-radius: 8px; text-align: center;\\\">\\n        <p>An error occurred. If you typed the address, fix any typo. Then click OK to try again.</p>\\n        <button onclick=\\\"location.reload()\\\" style=\\\"background: #007bff; color: white; border: none; padding: 8px 24px; border-radius: 25px; cursor: pointer;\\\">OK</button>\\n      </div>\\n    </div>\";\n  document.body.insertAdjacentHTML(\"beforeend\", modalHtml);\n  const pp = new PhonePeer({\n    onError: err => {\n      console.log(err);\n      document.getElementById(\"customAlert\").style.display = \"block\";\n    }\n  });\n  if (window.phoneApp) {\n    window.phoneApp.registerSubmodule(pp);\n  } else {\n    console.log(\"PhoneApp not found\");\n  }\n  console.log(\"!. ~ file: index.html:24 ~ pp:\", pp);\n}\nmain().catch(err => console.error(err));\n\n//# sourceURL=webpack://EasyEyesPeer/./src/PhonePeer.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ExperimentPeer: () => (/* binding */ ExperimentPeer),\n/* harmony export */   PhonePeer: () => (/* binding */ PhonePeer)\n/* harmony export */ });\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! platform */ \"./node_modules/platform/platform.js\");\n/* harmony import */ var platform__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(platform__WEBPACK_IMPORTED_MODULE_1__);\n\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == typeof i ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != typeof i) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\nclass ExperimentPeer {\n  /**\r\n   * @param {Object} params\r\n   * @param {Function} params.onData      - optional callback whenever we get a data message\r\n   * @param {Function} params.onHandshake - optional callback after the phone handshake\r\n   * @param {Function} params.onResults   - optional callback after the phone sends results\r\n   * @param {String}   params.text        - text to show on phone\r\n   * @param {Number}   params.timeout     - how long to allow phone to do the checks\r\n   * @param {Boolean}  params.onErrorInputForPhone - if you want to pass an \"UpdateErrorMessage\" object\r\n   */\n  constructor(_ref) {\n    let {\n      onData,\n      onHandshake,\n      onResults,\n      text,\n      timeout,\n      onErrorInputForPhone\n    } = _ref;\n    // Store for later usage\n    this.name = \"CompatibilityPeer\";\n    this.onData = onData;\n    this.onHandshake = onHandshake;\n    this.onResults = onResults;\n    this.text = text || \"Connecting...\";\n    this.timeout = timeout || 20; // seconds\n    this.onErrorInputForPhone = onErrorInputForPhone;\n\n    // We'll use a Promise to resolve the final results from the phone\n    this._resultsPromise = null;\n    this._resolveResults = null;\n  }\n\n  /**\r\n   * This method is required for the CCM to dispatch\r\n   * incoming phone messages to this submodule.\r\n   *\r\n   * @param {any} data – The data object from phone\r\n   * @param {CentralConnectionManager} manager – The CCM instance\r\n   */\n  onMessage(data, manager) {\n    var _this$onData, _this$onHandshake, _this$onResults;\n    if (!data || !data.message) return;\n\n    // optional: let parent know we received some data\n    (_this$onData = this.onData) === null || _this$onData === void 0 || _this$onData.call(this, data);\n    switch (data.message) {\n      case \"Handshake\":\n        console.log(\"CompatibilityCheckReceiver: Handshake received\");\n        // Send the text + begin commands right here\n        manager.send({\n          message: \"Text\",\n          text: this.text,\n          name: this.name\n        });\n        manager.send({\n          message: \"Begin\",\n          timeout: this.timeout,\n          name: this.name\n        });\n        if (this.onErrorInputForPhone) {\n          manager.send({\n            message: \"UpdateErrorMessage\",\n            onErrorInput: this.onErrorInputForPhone,\n            name: this.name\n          });\n        }\n        (_this$onHandshake = this.onHandshake) === null || _this$onHandshake === void 0 || _this$onHandshake.call(this);\n        break;\n      case \"Results\":\n        console.log(\"CompatibilityCheckReceiver: Results received\");\n        // The phone finished its checks\n        const results = data.results;\n        (_this$onResults = this.onResults) === null || _this$onResults === void 0 || _this$onResults.call(this, results);\n\n        // Also resolve our promise-based approach\n        if (this._resolveResults) {\n          this._resolveResults(results);\n          this._resolveResults = null;\n        }\n        break;\n      default:\n        console.log(\"CompatibilityCheckReceiver: Unknown message:\", data);\n    }\n  }\n\n  /**\r\n   * Sends the Begin command to start compatibility checks and returns a promise\r\n   * that resolves with the results when complete\r\n   *\r\n   * @param {CentralConnectionManager} manager - The connection manager instance\r\n   * @returns {Promise<any>} Promise that resolves with the test results\r\n   */\n  beginChecksAndGetResults(manager) {\n    if (!manager) {\n      throw new Error(\"Connection manager is required to begin checks\");\n    }\n\n    // Reset results promise if needed\n    this._resultsPromise = null;\n\n    // Send the begin command to start the tests\n    manager.send({\n      message: \"Begin\",\n      timeout: this.timeout,\n      name: this.name\n    });\n    manager.send({\n      message: \"Text\",\n      text: this.text,\n      name: this.name\n    });\n\n    // Return the promise that will resolve with results\n    return this.getResults();\n  }\n\n  /**\r\n   * a promise that resolves when the phone\r\n   * eventually sends the \"Results\" message, call this:\r\n   *\r\n   * @returns {Promise<any>} resolves with the phone's results object\r\n   */\n  getResults() {\n    if (!this._resultsPromise) {\n      this._resultsPromise = new Promise(resolve => {\n        this._resolveResults = resolve;\n      });\n    }\n    return this._resultsPromise;\n  }\n}\nclass PhonePeer {\n  constructor() {\n    _defineProperty(this, \"identifyBrowser\", async () => {\n      var _platform$os, _platform$os2;\n      // //temp: wait for 10 seconds\n      // await new Promise((resolve) => setTimeout(resolve, 10000));\n\n      const browserInfo = {\n        browser: (platform__WEBPACK_IMPORTED_MODULE_1___default().name),\n        browserVersion: (platform__WEBPACK_IMPORTED_MODULE_1___default().version),\n        os: (_platform$os = (platform__WEBPACK_IMPORTED_MODULE_1___default().os)) === null || _platform$os === void 0 ? void 0 : _platform$os.family,\n        osVersion: (_platform$os2 = (platform__WEBPACK_IMPORTED_MODULE_1___default().os)) === null || _platform$os2 === void 0 ? void 0 : _platform$os2.version\n      };\n      return browserInfo;\n    });\n    _defineProperty(this, \"identifyDevice\", async () => {\n      // //temp: wait for 10 seconds\n      // await new Promise((resolve) => setTimeout(resolve, 10000));\n\n      const deviceInfo = {};\n      fod.complete(function (data) {\n        deviceInfo[\"IsMobile\"] = data.device[\"ismobile\"];\n        deviceInfo[\"HardwareName\"] = data.device[\"hardwarename\"];\n        deviceInfo[\"HardwareFamily\"] = data.device[\"hardwarefamily\"];\n        deviceInfo[\"HardwareModel\"] = data.device[\"hardwaremodel\"];\n        deviceInfo[\"OEM\"] = data.device[\"oem\"];\n        deviceInfo[\"HardwareModelVariants\"] = data.device[\"hardwaremodelvariants\"];\n        deviceInfo[\"DeviceId\"] = data.device[\"deviceid\"];\n        deviceInfo[\"PlatformName\"] = data.device[\"platformname\"];\n        deviceInfo[\"PlatformVersion\"] = data.device[\"platformversion\"];\n        deviceInfo[\"DeviceType\"] = data.device[\"devicetype\"];\n      });\n      return deviceInfo;\n    });\n    _defineProperty(this, \"testNeededAPIs\", async () => {\n      //needed APIs: getUserMedia (audio),\n      const result = {\n        getUserMedia: false,\n        getUserMediaError: null\n      };\n      try {\n        const constraints = {\n          autoGainControl: false,\n          noiseSuppression: false,\n          echoCancellation: false,\n          channelCount: 1\n        };\n        //check if getUserMedia is supported\n        await navigator.mediaDevices.getUserMedia({\n          audio: constraints\n        });\n        result.getUserMedia = true;\n      } catch (err) {\n        result.getUserMedia = false;\n        result.getUserMediaError = err.message;\n      }\n      return result;\n    });\n    _defineProperty(this, \"startTests\", async (t, phonePeer) => {\n      // Create a timeout promise\n      const timeout = seconds => new Promise((_, reject) => {\n        setTimeout(() => reject({\n          timeoutError: true\n        }), seconds * 1000);\n      });\n\n      // Helper to wrap promise with error details\n      const wrapPromise = async (promise, name) => {\n        try {\n          return {\n            result: await promise,\n            error: null\n          };\n        } catch (err) {\n          return {\n            result: null,\n            error: {\n              message: err.message,\n              name: name\n            }\n          };\n        }\n      };\n\n      // Create individual promises that include timeout\n      const devicePromise = Promise.race([wrapPromise(this.identifyDevice(), \"deviceDetails\"), timeout(t)]).catch(err => ({\n        result: null,\n        error: {\n          message: err.timeoutError ? \"Timeout reached\" : err.message || String(err),\n          name: err.timeoutError ? \"timeout\" : \"error\"\n        }\n      }));\n      const browserPromise = Promise.race([wrapPromise(this.identifyBrowser(), \"browserDetails\"), timeout(t)]).catch(err => ({\n        result: null,\n        error: {\n          message: err.timeoutError ? \"Timeout reached\" : err.message || String(err),\n          name: err.timeoutError ? \"timeout\" : \"error\"\n        }\n      }));\n      const neededAPIs = await this.testNeededAPIs();\n\n      // Run promises independently\n      const [deviceResult, browserResult] = await Promise.all([devicePromise, browserPromise]);\n      const webAudioDeviceNames = {\n        microphone: \"\"\n      };\n      const screenSizes = {\n        width: screen.width,\n        height: screen.height\n      };\n      let resultsFromRunningThoseCompatibilityChecks = {\n        deviceDetails: {\n          data: deviceResult.result,\n          error: deviceResult.error\n        },\n        webAudioDeviceNames: webAudioDeviceNames,\n        screenSizes: screenSizes,\n        browserDetails: {\n          data: browserResult.result,\n          error: browserResult.error\n        },\n        neededAPIs: neededAPIs\n      };\n      phonePeer.send({\n        message: \"Results\",\n        results: resultsFromRunningThoseCompatibilityChecks,\n        name: this.name\n      });\n    });\n    _defineProperty(this, \"onMessage\", (data, manager) => {\n      if (!data || !data.message) return;\n      console.log(\"Compatibility module received data:\", data);\n      switch (data.message) {\n        case \"Begin\":\n          this.startTests(data.timeout, manager);\n          break;\n        case \"UpdateErrorMessage\":\n          this.onErrorInput = data.onErrorInput;\n          break;\n        case \"Text\":\n          this.text = data.text;\n          this.showConnectingMessage();\n          break;\n        default:\n          console.log(\"Unknown message type:\", data.message);\n      }\n    });\n    _defineProperty(this, \"register\", connectionManager => {\n      this.connectionManager = connectionManager;\n    });\n    _defineProperty(this, \"showConnectingMessage\", () => {\n      if (this.text) {\n        // document.body.innerHTML = `<h1>${this.text}</h1>`;\n        const target = document.getElementById(\"target\");\n        if (target) {\n          target.innerText = this.text;\n        }\n      }\n    });\n    this.startTime = Date.now();\n    this.name = \"CompatibilityPeer\";\n    this.connectionManager = null;\n  }\n}\n\n/*\r\n * The MIT License (MIT)\r\n * Copyright (c) 2012 Ryan Day\r\n * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\r\n * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\r\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\r\n */\n\n//# sourceURL=webpack://EasyEyesPeer/./src/index.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ExperimentPeer: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.ExperimentPeer),\n/* harmony export */   PhonePeer: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.PhonePeer)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\n\n//# sourceURL=webpack://EasyEyesPeer/./src/main.js?");

/***/ }),

/***/ "./node_modules/platform/platform.js":
/*!*******************************************!*\
  !*** ./node_modules/platform/platform.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\nvar __WEBPACK_AMD_DEFINE_RESULT__;/*!\n * Platform.js v1.3.6\n * Copyright 2014-2020 Benjamin Tan\n * Copyright 2011-2013 John-David Dalton\n * Available under MIT license\n */\n;(function() {\n  'use strict';\n\n  /** Used to determine if values are of the language type `Object`. */\n  var objectTypes = {\n    'function': true,\n    'object': true\n  };\n\n  /** Used as a reference to the global object. */\n  var root = (objectTypes[typeof window] && window) || this;\n\n  /** Backup possible global object. */\n  var oldRoot = root;\n\n  /** Detect free variable `exports`. */\n  var freeExports = objectTypes[typeof exports] && exports;\n\n  /** Detect free variable `module`. */\n  var freeModule = objectTypes[\"object\"] && module && !module.nodeType && module;\n\n  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */\n  var freeGlobal = freeExports && freeModule && typeof __webpack_require__.g == 'object' && __webpack_require__.g;\n  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {\n    root = freeGlobal;\n  }\n\n  /**\n   * Used as the maximum length of an array-like object.\n   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)\n   * for more details.\n   */\n  var maxSafeInteger = Math.pow(2, 53) - 1;\n\n  /** Regular expression to detect Opera. */\n  var reOpera = /\\bOpera/;\n\n  /** Possible global object. */\n  var thisBinding = this;\n\n  /** Used for native method references. */\n  var objectProto = Object.prototype;\n\n  /** Used to check for own properties of an object. */\n  var hasOwnProperty = objectProto.hasOwnProperty;\n\n  /** Used to resolve the internal `[[Class]]` of values. */\n  var toString = objectProto.toString;\n\n  /*--------------------------------------------------------------------------*/\n\n  /**\n   * Capitalizes a string value.\n   *\n   * @private\n   * @param {string} string The string to capitalize.\n   * @returns {string} The capitalized string.\n   */\n  function capitalize(string) {\n    string = String(string);\n    return string.charAt(0).toUpperCase() + string.slice(1);\n  }\n\n  /**\n   * A utility function to clean up the OS name.\n   *\n   * @private\n   * @param {string} os The OS name to clean up.\n   * @param {string} [pattern] A `RegExp` pattern matching the OS name.\n   * @param {string} [label] A label for the OS.\n   */\n  function cleanupOS(os, pattern, label) {\n    // Platform tokens are defined at:\n    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx\n    // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx\n    var data = {\n      '10.0': '10',\n      '6.4':  '10 Technical Preview',\n      '6.3':  '8.1',\n      '6.2':  '8',\n      '6.1':  'Server 2008 R2 / 7',\n      '6.0':  'Server 2008 / Vista',\n      '5.2':  'Server 2003 / XP 64-bit',\n      '5.1':  'XP',\n      '5.01': '2000 SP1',\n      '5.0':  '2000',\n      '4.0':  'NT',\n      '4.90': 'ME'\n    };\n    // Detect Windows version from platform tokens.\n    if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) &&\n        (data = data[/[\\d.]+$/.exec(os)])) {\n      os = 'Windows ' + data;\n    }\n    // Correct character case and cleanup string.\n    os = String(os);\n\n    if (pattern && label) {\n      os = os.replace(RegExp(pattern, 'i'), label);\n    }\n\n    os = format(\n      os.replace(/ ce$/i, ' CE')\n        .replace(/\\bhpw/i, 'web')\n        .replace(/\\bMacintosh\\b/, 'Mac OS')\n        .replace(/_PowerPC\\b/i, ' OS')\n        .replace(/\\b(OS X) [^ \\d]+/i, '$1')\n        .replace(/\\bMac (OS X)\\b/, '$1')\n        .replace(/\\/(\\d)/, ' $1')\n        .replace(/_/g, '.')\n        .replace(/(?: BePC|[ .]*fc[ \\d.]+)$/i, '')\n        .replace(/\\bx86\\.64\\b/gi, 'x86_64')\n        .replace(/\\b(Windows Phone) OS\\b/, '$1')\n        .replace(/\\b(Chrome OS \\w+) [\\d.]+\\b/, '$1')\n        .split(' on ')[0]\n    );\n\n    return os;\n  }\n\n  /**\n   * An iteration utility for arrays and objects.\n   *\n   * @private\n   * @param {Array|Object} object The object to iterate over.\n   * @param {Function} callback The function called per iteration.\n   */\n  function each(object, callback) {\n    var index = -1,\n        length = object ? object.length : 0;\n\n    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {\n      while (++index < length) {\n        callback(object[index], index, object);\n      }\n    } else {\n      forOwn(object, callback);\n    }\n  }\n\n  /**\n   * Trim and conditionally capitalize string values.\n   *\n   * @private\n   * @param {string} string The string to format.\n   * @returns {string} The formatted string.\n   */\n  function format(string) {\n    string = trim(string);\n    return /^(?:webOS|i(?:OS|P))/.test(string)\n      ? string\n      : capitalize(string);\n  }\n\n  /**\n   * Iterates over an object's own properties, executing the `callback` for each.\n   *\n   * @private\n   * @param {Object} object The object to iterate over.\n   * @param {Function} callback The function executed per own property.\n   */\n  function forOwn(object, callback) {\n    for (var key in object) {\n      if (hasOwnProperty.call(object, key)) {\n        callback(object[key], key, object);\n      }\n    }\n  }\n\n  /**\n   * Gets the internal `[[Class]]` of a value.\n   *\n   * @private\n   * @param {*} value The value.\n   * @returns {string} The `[[Class]]`.\n   */\n  function getClassOf(value) {\n    return value == null\n      ? capitalize(value)\n      : toString.call(value).slice(8, -1);\n  }\n\n  /**\n   * Host objects can return type values that are different from their actual\n   * data type. The objects we are concerned with usually return non-primitive\n   * types of \"object\", \"function\", or \"unknown\".\n   *\n   * @private\n   * @param {*} object The owner of the property.\n   * @param {string} property The property to check.\n   * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.\n   */\n  function isHostType(object, property) {\n    var type = object != null ? typeof object[property] : 'number';\n    return !/^(?:boolean|number|string|undefined)$/.test(type) &&\n      (type == 'object' ? !!object[property] : true);\n  }\n\n  /**\n   * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.\n   *\n   * @private\n   * @param {string} string The string to qualify.\n   * @returns {string} The qualified string.\n   */\n  function qualify(string) {\n    return String(string).replace(/([ -])(?!$)/g, '$1?');\n  }\n\n  /**\n   * A bare-bones `Array#reduce` like utility function.\n   *\n   * @private\n   * @param {Array} array The array to iterate over.\n   * @param {Function} callback The function called per iteration.\n   * @returns {*} The accumulated result.\n   */\n  function reduce(array, callback) {\n    var accumulator = null;\n    each(array, function(value, index) {\n      accumulator = callback(accumulator, value, index, array);\n    });\n    return accumulator;\n  }\n\n  /**\n   * Removes leading and trailing whitespace from a string.\n   *\n   * @private\n   * @param {string} string The string to trim.\n   * @returns {string} The trimmed string.\n   */\n  function trim(string) {\n    return String(string).replace(/^ +| +$/g, '');\n  }\n\n  /*--------------------------------------------------------------------------*/\n\n  /**\n   * Creates a new platform object.\n   *\n   * @memberOf platform\n   * @param {Object|string} [ua=navigator.userAgent] The user agent string or\n   *  context object.\n   * @returns {Object} A platform object.\n   */\n  function parse(ua) {\n\n    /** The environment context object. */\n    var context = root;\n\n    /** Used to flag when a custom context is provided. */\n    var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String';\n\n    // Juggle arguments.\n    if (isCustomContext) {\n      context = ua;\n      ua = null;\n    }\n\n    /** Browser navigator object. */\n    var nav = context.navigator || {};\n\n    /** Browser user agent string. */\n    var userAgent = nav.userAgent || '';\n\n    ua || (ua = userAgent);\n\n    /** Used to flag when `thisBinding` is the [ModuleScope]. */\n    var isModuleScope = isCustomContext || thisBinding == oldRoot;\n\n    /** Used to detect if browser is like Chrome. */\n    var likeChrome = isCustomContext\n      ? !!nav.likeChrome\n      : /\\bChrome\\b/.test(ua) && !/internal|\\n/i.test(toString.toString());\n\n    /** Internal `[[Class]]` value shortcuts. */\n    var objectClass = 'Object',\n        airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',\n        enviroClass = isCustomContext ? objectClass : 'Environment',\n        javaClass = (isCustomContext && context.java) ? 'JavaPackage' : getClassOf(context.java),\n        phantomClass = isCustomContext ? objectClass : 'RuntimeObject';\n\n    /** Detect Java environments. */\n    var java = /\\bJava/.test(javaClass) && context.java;\n\n    /** Detect Rhino. */\n    var rhino = java && getClassOf(context.environment) == enviroClass;\n\n    /** A character to represent alpha. */\n    var alpha = java ? 'a' : '\\u03b1';\n\n    /** A character to represent beta. */\n    var beta = java ? 'b' : '\\u03b2';\n\n    /** Browser document object. */\n    var doc = context.document || {};\n\n    /**\n     * Detect Opera browser (Presto-based).\n     * http://www.howtocreate.co.uk/operaStuff/operaObject.html\n     * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini\n     */\n    var opera = context.operamini || context.opera;\n\n    /** Opera `[[Class]]`. */\n    var operaClass = reOpera.test(operaClass = (isCustomContext && opera) ? opera['[[Class]]'] : getClassOf(opera))\n      ? operaClass\n      : (opera = null);\n\n    /*------------------------------------------------------------------------*/\n\n    /** Temporary variable used over the script's lifetime. */\n    var data;\n\n    /** The CPU architecture. */\n    var arch = ua;\n\n    /** Platform description array. */\n    var description = [];\n\n    /** Platform alpha/beta indicator. */\n    var prerelease = null;\n\n    /** A flag to indicate that environment features should be used to resolve the platform. */\n    var useFeatures = ua == userAgent;\n\n    /** The browser/environment version. */\n    var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();\n\n    /** A flag to indicate if the OS ends with \"/ Version\" */\n    var isSpecialCasedOS;\n\n    /* Detectable layout engines (order is important). */\n    var layout = getLayout([\n      { 'label': 'EdgeHTML', 'pattern': 'Edge' },\n      'Trident',\n      { 'label': 'WebKit', 'pattern': 'AppleWebKit' },\n      'iCab',\n      'Presto',\n      'NetFront',\n      'Tasman',\n      'KHTML',\n      'Gecko'\n    ]);\n\n    /* Detectable browser names (order is important). */\n    var name = getName([\n      'Adobe AIR',\n      'Arora',\n      'Avant Browser',\n      'Breach',\n      'Camino',\n      'Electron',\n      'Epiphany',\n      'Fennec',\n      'Flock',\n      'Galeon',\n      'GreenBrowser',\n      'iCab',\n      'Iceweasel',\n      'K-Meleon',\n      'Konqueror',\n      'Lunascape',\n      'Maxthon',\n      { 'label': 'Microsoft Edge', 'pattern': '(?:Edge|Edg|EdgA|EdgiOS)' },\n      'Midori',\n      'Nook Browser',\n      'PaleMoon',\n      'PhantomJS',\n      'Raven',\n      'Rekonq',\n      'RockMelt',\n      { 'label': 'Samsung Internet', 'pattern': 'SamsungBrowser' },\n      'SeaMonkey',\n      { 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },\n      'Sleipnir',\n      'SlimBrowser',\n      { 'label': 'SRWare Iron', 'pattern': 'Iron' },\n      'Sunrise',\n      'Swiftfox',\n      'Vivaldi',\n      'Waterfox',\n      'WebPositive',\n      { 'label': 'Yandex Browser', 'pattern': 'YaBrowser' },\n      { 'label': 'UC Browser', 'pattern': 'UCBrowser' },\n      'Opera Mini',\n      { 'label': 'Opera Mini', 'pattern': 'OPiOS' },\n      'Opera',\n      { 'label': 'Opera', 'pattern': 'OPR' },\n      'Chromium',\n      'Chrome',\n      { 'label': 'Chrome', 'pattern': '(?:HeadlessChrome)' },\n      { 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },\n      { 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },\n      { 'label': 'Firefox for iOS', 'pattern': 'FxiOS' },\n      { 'label': 'IE', 'pattern': 'IEMobile' },\n      { 'label': 'IE', 'pattern': 'MSIE' },\n      'Safari'\n    ]);\n\n    /* Detectable products (order is important). */\n    var product = getProduct([\n      { 'label': 'BlackBerry', 'pattern': 'BB10' },\n      'BlackBerry',\n      { 'label': 'Galaxy S', 'pattern': 'GT-I9000' },\n      { 'label': 'Galaxy S2', 'pattern': 'GT-I9100' },\n      { 'label': 'Galaxy S3', 'pattern': 'GT-I9300' },\n      { 'label': 'Galaxy S4', 'pattern': 'GT-I9500' },\n      { 'label': 'Galaxy S5', 'pattern': 'SM-G900' },\n      { 'label': 'Galaxy S6', 'pattern': 'SM-G920' },\n      { 'label': 'Galaxy S6 Edge', 'pattern': 'SM-G925' },\n      { 'label': 'Galaxy S7', 'pattern': 'SM-G930' },\n      { 'label': 'Galaxy S7 Edge', 'pattern': 'SM-G935' },\n      'Google TV',\n      'Lumia',\n      'iPad',\n      'iPod',\n      'iPhone',\n      'Kindle',\n      { 'label': 'Kindle Fire', 'pattern': '(?:Cloud9|Silk-Accelerated)' },\n      'Nexus',\n      'Nook',\n      'PlayBook',\n      'PlayStation Vita',\n      'PlayStation',\n      'TouchPad',\n      'Transformer',\n      { 'label': 'Wii U', 'pattern': 'WiiU' },\n      'Wii',\n      'Xbox One',\n      { 'label': 'Xbox 360', 'pattern': 'Xbox' },\n      'Xoom'\n    ]);\n\n    /* Detectable manufacturers. */\n    var manufacturer = getManufacturer({\n      'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },\n      'Alcatel': {},\n      'Archos': {},\n      'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },\n      'Asus': { 'Transformer': 1 },\n      'Barnes & Noble': { 'Nook': 1 },\n      'BlackBerry': { 'PlayBook': 1 },\n      'Google': { 'Google TV': 1, 'Nexus': 1 },\n      'HP': { 'TouchPad': 1 },\n      'HTC': {},\n      'Huawei': {},\n      'Lenovo': {},\n      'LG': {},\n      'Microsoft': { 'Xbox': 1, 'Xbox One': 1 },\n      'Motorola': { 'Xoom': 1 },\n      'Nintendo': { 'Wii U': 1,  'Wii': 1 },\n      'Nokia': { 'Lumia': 1 },\n      'Oppo': {},\n      'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },\n      'Sony': { 'PlayStation': 1, 'PlayStation Vita': 1 },\n      'Xiaomi': { 'Mi': 1, 'Redmi': 1 }\n    });\n\n    /* Detectable operating systems (order is important). */\n    var os = getOS([\n      'Windows Phone',\n      'KaiOS',\n      'Android',\n      'CentOS',\n      { 'label': 'Chrome OS', 'pattern': 'CrOS' },\n      'Debian',\n      { 'label': 'DragonFly BSD', 'pattern': 'DragonFly' },\n      'Fedora',\n      'FreeBSD',\n      'Gentoo',\n      'Haiku',\n      'Kubuntu',\n      'Linux Mint',\n      'OpenBSD',\n      'Red Hat',\n      'SuSE',\n      'Ubuntu',\n      'Xubuntu',\n      'Cygwin',\n      'Symbian OS',\n      'hpwOS',\n      'webOS ',\n      'webOS',\n      'Tablet OS',\n      'Tizen',\n      'Linux',\n      'Mac OS X',\n      'Macintosh',\n      'Mac',\n      'Windows 98;',\n      'Windows '\n    ]);\n\n    /*------------------------------------------------------------------------*/\n\n    /**\n     * Picks the layout engine from an array of guesses.\n     *\n     * @private\n     * @param {Array} guesses An array of guesses.\n     * @returns {null|string} The detected layout engine.\n     */\n    function getLayout(guesses) {\n      return reduce(guesses, function(result, guess) {\n        return result || RegExp('\\\\b' + (\n          guess.pattern || qualify(guess)\n        ) + '\\\\b', 'i').exec(ua) && (guess.label || guess);\n      });\n    }\n\n    /**\n     * Picks the manufacturer from an array of guesses.\n     *\n     * @private\n     * @param {Array} guesses An object of guesses.\n     * @returns {null|string} The detected manufacturer.\n     */\n    function getManufacturer(guesses) {\n      return reduce(guesses, function(result, value, key) {\n        // Lookup the manufacturer by product or scan the UA for the manufacturer.\n        return result || (\n          value[product] ||\n          value[/^[a-z]+(?: +[a-z]+\\b)*/i.exec(product)] ||\n          RegExp('\\\\b' + qualify(key) + '(?:\\\\b|\\\\w*\\\\d)', 'i').exec(ua)\n        ) && key;\n      });\n    }\n\n    /**\n     * Picks the browser name from an array of guesses.\n     *\n     * @private\n     * @param {Array} guesses An array of guesses.\n     * @returns {null|string} The detected browser name.\n     */\n    function getName(guesses) {\n      return reduce(guesses, function(result, guess) {\n        return result || RegExp('\\\\b' + (\n          guess.pattern || qualify(guess)\n        ) + '\\\\b', 'i').exec(ua) && (guess.label || guess);\n      });\n    }\n\n    /**\n     * Picks the OS name from an array of guesses.\n     *\n     * @private\n     * @param {Array} guesses An array of guesses.\n     * @returns {null|string} The detected OS name.\n     */\n    function getOS(guesses) {\n      return reduce(guesses, function(result, guess) {\n        var pattern = guess.pattern || qualify(guess);\n        if (!result && (result =\n              RegExp('\\\\b' + pattern + '(?:/[\\\\d.]+|[ \\\\w.]*)', 'i').exec(ua)\n            )) {\n          result = cleanupOS(result, pattern, guess.label || guess);\n        }\n        return result;\n      });\n    }\n\n    /**\n     * Picks the product name from an array of guesses.\n     *\n     * @private\n     * @param {Array} guesses An array of guesses.\n     * @returns {null|string} The detected product name.\n     */\n    function getProduct(guesses) {\n      return reduce(guesses, function(result, guess) {\n        var pattern = guess.pattern || qualify(guess);\n        if (!result && (result =\n              RegExp('\\\\b' + pattern + ' *\\\\d+[.\\\\w_]*', 'i').exec(ua) ||\n              RegExp('\\\\b' + pattern + ' *\\\\w+-[\\\\w]*', 'i').exec(ua) ||\n              RegExp('\\\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\\\d+|[^ ();-]*)', 'i').exec(ua)\n            )) {\n          // Split by forward slash and append product version if needed.\n          if ((result = String((guess.label && !RegExp(pattern, 'i').test(guess.label)) ? guess.label : result).split('/'))[1] && !/[\\d.]+/.test(result[0])) {\n            result[0] += ' ' + result[1];\n          }\n          // Correct character case and cleanup string.\n          guess = guess.label || guess;\n          result = format(result[0]\n            .replace(RegExp(pattern, 'i'), guess)\n            .replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')\n            .replace(RegExp('(' + guess + ')[-_.]?(\\\\w)', 'i'), '$1 $2'));\n        }\n        return result;\n      });\n    }\n\n    /**\n     * Resolves the version using an array of UA patterns.\n     *\n     * @private\n     * @param {Array} patterns An array of UA patterns.\n     * @returns {null|string} The detected version.\n     */\n    function getVersion(patterns) {\n      return reduce(patterns, function(result, pattern) {\n        return result || (RegExp(pattern +\n          '(?:-[\\\\d.]+/|(?: for [\\\\w-]+)?[ /-])([\\\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;\n      });\n    }\n\n    /**\n     * Returns `platform.description` when the platform object is coerced to a string.\n     *\n     * @name toString\n     * @memberOf platform\n     * @returns {string} Returns `platform.description` if available, else an empty string.\n     */\n    function toStringPlatform() {\n      return this.description || '';\n    }\n\n    /*------------------------------------------------------------------------*/\n\n    // Convert layout to an array so we can add extra details.\n    layout && (layout = [layout]);\n\n    // Detect Android products.\n    // Browsers on Android devices typically provide their product IDS after \"Android;\"\n    // up to \"Build\" or \") AppleWebKit\".\n    // Example:\n    // \"Mozilla/5.0 (Linux; Android 8.1.0; Moto G (5) Plus) AppleWebKit/537.36\n    // (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36\"\n    if (/\\bAndroid\\b/.test(os) && !product &&\n        (data = /\\bAndroid[^;]*;(.*?)(?:Build|\\) AppleWebKit)\\b/i.exec(ua))) {\n      product = trim(data[1])\n        // Replace any language codes (eg. \"en-US\").\n        .replace(/^[a-z]{2}-[a-z]{2};\\s*/i, '')\n        || null;\n    }\n    // Detect product names that contain their manufacturer's name.\n    if (manufacturer && !product) {\n      product = getProduct([manufacturer]);\n    } else if (manufacturer && product) {\n      product = product\n        .replace(RegExp('^(' + qualify(manufacturer) + ')[-_.\\\\s]', 'i'), manufacturer + ' ')\n        .replace(RegExp('^(' + qualify(manufacturer) + ')[-_.]?(\\\\w)', 'i'), manufacturer + ' $2');\n    }\n    // Clean up Google TV.\n    if ((data = /\\bGoogle TV\\b/.exec(product))) {\n      product = data[0];\n    }\n    // Detect simulators.\n    if (/\\bSimulator\\b/i.test(ua)) {\n      product = (product ? product + ' ' : '') + 'Simulator';\n    }\n    // Detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS.\n    if (name == 'Opera Mini' && /\\bOPiOS\\b/.test(ua)) {\n      description.push('running in Turbo/Uncompressed mode');\n    }\n    // Detect IE Mobile 11.\n    if (name == 'IE' && /\\blike iPhone OS\\b/.test(ua)) {\n      data = parse(ua.replace(/like iPhone OS/, ''));\n      manufacturer = data.manufacturer;\n      product = data.product;\n    }\n    // Detect iOS.\n    else if (/^iP/.test(product)) {\n      name || (name = 'Safari');\n      os = 'iOS' + ((data = / OS ([\\d_]+)/i.exec(ua))\n        ? ' ' + data[1].replace(/_/g, '.')\n        : '');\n    }\n    // Detect Kubuntu.\n    else if (name == 'Konqueror' && /^Linux\\b/i.test(os)) {\n      os = 'Kubuntu';\n    }\n    // Detect Android browsers.\n    else if ((manufacturer && manufacturer != 'Google' &&\n        ((/Chrome/.test(name) && !/\\bMobile Safari\\b/i.test(ua)) || /\\bVita\\b/.test(product))) ||\n        (/\\bAndroid\\b/.test(os) && /^Chrome/.test(name) && /\\bVersion\\//i.test(ua))) {\n      name = 'Android Browser';\n      os = /\\bAndroid\\b/.test(os) ? os : 'Android';\n    }\n    // Detect Silk desktop/accelerated modes.\n    else if (name == 'Silk') {\n      if (!/\\bMobi/i.test(ua)) {\n        os = 'Android';\n        description.unshift('desktop mode');\n      }\n      if (/Accelerated *= *true/i.test(ua)) {\n        description.unshift('accelerated');\n      }\n    }\n    // Detect UC Browser speed mode.\n    else if (name == 'UC Browser' && /\\bUCWEB\\b/.test(ua)) {\n      description.push('speed mode');\n    }\n    // Detect PaleMoon identifying as Firefox.\n    else if (name == 'PaleMoon' && (data = /\\bFirefox\\/([\\d.]+)\\b/.exec(ua))) {\n      description.push('identifying as Firefox ' + data[1]);\n    }\n    // Detect Firefox OS and products running Firefox.\n    else if (name == 'Firefox' && (data = /\\b(Mobile|Tablet|TV)\\b/i.exec(ua))) {\n      os || (os = 'Firefox OS');\n      product || (product = data[1]);\n    }\n    // Detect false positives for Firefox/Safari.\n    else if (!name || (data = !/\\bMinefield\\b/i.test(ua) && /\\b(?:Firefox|Safari)\\b/.exec(name))) {\n      // Escape the `/` for Firefox 1.\n      if (name && !product && /[\\/,]|^[^(]+?\\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {\n        // Clear name of false positives.\n        name = null;\n      }\n      // Reassign a generic name.\n      if ((data = product || manufacturer || os) &&\n          (product || manufacturer || /\\b(?:Android|Symbian OS|Tablet OS|webOS)\\b/.test(os))) {\n        name = /[a-z]+(?: Hat)?/i.exec(/\\bAndroid\\b/.test(os) ? os : data) + ' Browser';\n      }\n    }\n    // Add Chrome version to description for Electron.\n    else if (name == 'Electron' && (data = (/\\bChrome\\/([\\d.]+)\\b/.exec(ua) || 0)[1])) {\n      description.push('Chromium ' + data);\n    }\n    // Detect non-Opera (Presto-based) versions (order is important).\n    if (!version) {\n      version = getVersion([\n        '(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\\\d.]+$)|UCBrowser|YaBrowser)',\n        'Version',\n        qualify(name),\n        '(?:Firefox|Minefield|NetFront)'\n      ]);\n    }\n    // Detect stubborn layout engines.\n    if ((data =\n          layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' ||\n          /\\bOpera\\b/.test(name) && (/\\bOPR\\b/.test(ua) ? 'Blink' : 'Presto') ||\n          /\\b(?:Midori|Nook|Safari)\\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' ||\n          !layout && /\\bMSIE\\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') ||\n          layout == 'WebKit' && /\\bPlayStation\\b(?! Vita\\b)/i.test(name) && 'NetFront'\n        )) {\n      layout = [data];\n    }\n    // Detect Windows Phone 7 desktop mode.\n    if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\\d+)/i.exec(ua) || 0)[1])) {\n      name += ' Mobile';\n      os = 'Windows Phone ' + (/\\+$/.test(data) ? data : data + '.x');\n      description.unshift('desktop mode');\n    }\n    // Detect Windows Phone 8.x desktop mode.\n    else if (/\\bWPDesktop\\b/i.test(ua)) {\n      name = 'IE Mobile';\n      os = 'Windows Phone 8.x';\n      description.unshift('desktop mode');\n      version || (version = (/\\brv:([\\d.]+)/.exec(ua) || 0)[1]);\n    }\n    // Detect IE 11 identifying as other browsers.\n    else if (name != 'IE' && layout == 'Trident' && (data = /\\brv:([\\d.]+)/.exec(ua))) {\n      if (name) {\n        description.push('identifying as ' + name + (version ? ' ' + version : ''));\n      }\n      name = 'IE';\n      version = data[1];\n    }\n    // Leverage environment features.\n    if (useFeatures) {\n      // Detect server-side environments.\n      // Rhino has a global function while others have a global object.\n      if (isHostType(context, 'global')) {\n        if (java) {\n          data = java.lang.System;\n          arch = data.getProperty('os.arch');\n          os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');\n        }\n        if (rhino) {\n          try {\n            version = context.require('ringo/engine').version.join('.');\n            name = 'RingoJS';\n          } catch(e) {\n            if ((data = context.system) && data.global.system == context.system) {\n              name = 'Narwhal';\n              os || (os = data[0].os || null);\n            }\n          }\n          if (!name) {\n            name = 'Rhino';\n          }\n        }\n        else if (\n          typeof context.process == 'object' && !context.process.browser &&\n          (data = context.process)\n        ) {\n          if (typeof data.versions == 'object') {\n            if (typeof data.versions.electron == 'string') {\n              description.push('Node ' + data.versions.node);\n              name = 'Electron';\n              version = data.versions.electron;\n            } else if (typeof data.versions.nw == 'string') {\n              description.push('Chromium ' + version, 'Node ' + data.versions.node);\n              name = 'NW.js';\n              version = data.versions.nw;\n            }\n          }\n          if (!name) {\n            name = 'Node.js';\n            arch = data.arch;\n            os = data.platform;\n            version = /[\\d.]+/.exec(data.version);\n            version = version ? version[0] : null;\n          }\n        }\n      }\n      // Detect Adobe AIR.\n      else if (getClassOf((data = context.runtime)) == airRuntimeClass) {\n        name = 'Adobe AIR';\n        os = data.flash.system.Capabilities.os;\n      }\n      // Detect PhantomJS.\n      else if (getClassOf((data = context.phantom)) == phantomClass) {\n        name = 'PhantomJS';\n        version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);\n      }\n      // Detect IE compatibility modes.\n      else if (typeof doc.documentMode == 'number' && (data = /\\bTrident\\/(\\d+)/i.exec(ua))) {\n        // We're in compatibility mode when the Trident version + 4 doesn't\n        // equal the document mode.\n        version = [version, doc.documentMode];\n        if ((data = +data[1] + 4) != version[1]) {\n          description.push('IE ' + version[1] + ' mode');\n          layout && (layout[1] = '');\n          version[1] = data;\n        }\n        version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];\n      }\n      // Detect IE 11 masking as other browsers.\n      else if (typeof doc.documentMode == 'number' && /^(?:Chrome|Firefox)\\b/.test(name)) {\n        description.push('masking as ' + name + ' ' + version);\n        name = 'IE';\n        version = '11.0';\n        layout = ['Trident'];\n        os = 'Windows';\n      }\n      os = os && format(os);\n    }\n    // Detect prerelease phases.\n    if (version && (data =\n          /(?:[ab]|dp|pre|[ab]\\d+pre)(?:\\d+\\+?)?$/i.exec(version) ||\n          /(?:alpha|beta)(?: ?\\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||\n          /\\bMinefield\\b/i.test(ua) && 'a'\n        )) {\n      prerelease = /b/i.test(data) ? 'beta' : 'alpha';\n      version = version.replace(RegExp(data + '\\\\+?$'), '') +\n        (prerelease == 'beta' ? beta : alpha) + (/\\d+\\+?/.exec(data) || '');\n    }\n    // Detect Firefox Mobile.\n    if (name == 'Fennec' || name == 'Firefox' && /\\b(?:Android|Firefox OS|KaiOS)\\b/.test(os)) {\n      name = 'Firefox Mobile';\n    }\n    // Obscure Maxthon's unreliable version.\n    else if (name == 'Maxthon' && version) {\n      version = version.replace(/\\.[\\d.]+/, '.x');\n    }\n    // Detect Xbox 360 and Xbox One.\n    else if (/\\bXbox\\b/i.test(product)) {\n      if (product == 'Xbox 360') {\n        os = null;\n      }\n      if (product == 'Xbox 360' && /\\bIEMobile\\b/.test(ua)) {\n        description.unshift('mobile mode');\n      }\n    }\n    // Add mobile postfix.\n    else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) &&\n        (os == 'Windows CE' || /Mobi/i.test(ua))) {\n      name += ' Mobile';\n    }\n    // Detect IE platform preview.\n    else if (name == 'IE' && useFeatures) {\n      try {\n        if (context.external === null) {\n          description.unshift('platform preview');\n        }\n      } catch(e) {\n        description.unshift('embedded');\n      }\n    }\n    // Detect BlackBerry OS version.\n    // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp\n    else if ((/\\bBlackBerry\\b/.test(product) || /\\bBB10\\b/.test(ua)) && (data =\n          (RegExp(product.replace(/ +/g, ' *') + '/([.\\\\d]+)', 'i').exec(ua) || 0)[1] ||\n          version\n        )) {\n      data = [data, /BB10/.test(ua)];\n      os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];\n      version = null;\n    }\n    // Detect Opera identifying/masking itself as another browser.\n    // http://www.opera.com/support/kb/view/843/\n    else if (this != forOwn && product != 'Wii' && (\n          (useFeatures && opera) ||\n          (/Opera/.test(name) && /\\b(?:MSIE|Firefox)\\b/i.test(ua)) ||\n          (name == 'Firefox' && /\\bOS X (?:\\d+\\.){2,}/.test(os)) ||\n          (name == 'IE' && (\n            (os && !/^Win/.test(os) && version > 5.5) ||\n            /\\bWindows XP\\b/.test(os) && version > 8 ||\n            version == 8 && !/\\bTrident\\b/.test(ua)\n          ))\n        ) && !reOpera.test((data = parse.call(forOwn, ua.replace(reOpera, '') + ';'))) && data.name) {\n      // When \"identifying\", the UA contains both Opera and the other browser's name.\n      data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');\n      if (reOpera.test(name)) {\n        if (/\\bIE\\b/.test(data) && os == 'Mac OS') {\n          os = null;\n        }\n        data = 'identify' + data;\n      }\n      // When \"masking\", the UA contains only the other browser's name.\n      else {\n        data = 'mask' + data;\n        if (operaClass) {\n          name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));\n        } else {\n          name = 'Opera';\n        }\n        if (/\\bIE\\b/.test(data)) {\n          os = null;\n        }\n        if (!useFeatures) {\n          version = null;\n        }\n      }\n      layout = ['Presto'];\n      description.push(data);\n    }\n    // Detect WebKit Nightly and approximate Chrome/Safari versions.\n    if ((data = (/\\bAppleWebKit\\/([\\d.]+\\+?)/i.exec(ua) || 0)[1])) {\n      // Correct build number for numeric comparison.\n      // (e.g. \"532.5\" becomes \"532.05\")\n      data = [parseFloat(data.replace(/\\.(\\d)$/, '.0$1')), data];\n      // Nightly builds are postfixed with a \"+\".\n      if (name == 'Safari' && data[1].slice(-1) == '+') {\n        name = 'WebKit Nightly';\n        prerelease = 'alpha';\n        version = data[1].slice(0, -1);\n      }\n      // Clear incorrect browser versions.\n      else if (version == data[1] ||\n          version == (data[2] = (/\\bSafari\\/([\\d.]+\\+?)/i.exec(ua) || 0)[1])) {\n        version = null;\n      }\n      // Use the full Chrome version when available.\n      data[1] = (/\\b(?:Headless)?Chrome\\/([\\d.]+)/i.exec(ua) || 0)[1];\n      // Detect Blink layout engine.\n      if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {\n        layout = ['Blink'];\n      }\n      // Detect JavaScriptCore.\n      // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi\n      if (!useFeatures || (!likeChrome && !data[1])) {\n        layout && (layout[1] = 'like Safari');\n        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : data < 602 ? 9 : data < 604 ? 10 : data < 606 ? 11 : data < 608 ? 12 : '12');\n      } else {\n        layout && (layout[1] = 'like Chrome');\n        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');\n      }\n      // Add the postfix of \".x\" or \"+\" for approximate versions.\n      layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+'));\n      // Obscure version for some Safari 1-2 releases.\n      if (name == 'Safari' && (!version || parseInt(version) > 45)) {\n        version = data;\n      } else if (name == 'Chrome' && /\\bHeadlessChrome/i.test(ua)) {\n        description.unshift('headless');\n      }\n    }\n    // Detect Opera desktop modes.\n    if (name == 'Opera' &&  (data = /\\bzbov|zvav$/.exec(os))) {\n      name += ' ';\n      description.unshift('desktop mode');\n      if (data == 'zvav') {\n        name += 'Mini';\n        version = null;\n      } else {\n        name += 'Mobile';\n      }\n      os = os.replace(RegExp(' *' + data + '$'), '');\n    }\n    // Detect Chrome desktop mode.\n    else if (name == 'Safari' && /\\bChrome\\b/.exec(layout && layout[1])) {\n      description.unshift('desktop mode');\n      name = 'Chrome Mobile';\n      version = null;\n\n      if (/\\bOS X\\b/.test(os)) {\n        manufacturer = 'Apple';\n        os = 'iOS 4.3+';\n      } else {\n        os = null;\n      }\n    }\n    // Newer versions of SRWare Iron uses the Chrome tag to indicate its version number.\n    else if (/\\bSRWare Iron\\b/.test(name) && !version) {\n      version = getVersion('Chrome');\n    }\n    // Strip incorrect OS versions.\n    if (version && version.indexOf((data = /[\\d.]+$/.exec(os))) == 0 &&\n        ua.indexOf('/' + data + '-') > -1) {\n      os = trim(os.replace(data, ''));\n    }\n    // Ensure OS does not include the browser name.\n    if (os && os.indexOf(name) != -1 && !RegExp(name + ' OS').test(os)) {\n      os = os.replace(RegExp(' *' + qualify(name) + ' *'), '');\n    }\n    // Add layout engine.\n    if (layout && !/\\b(?:Avant|Nook)\\b/.test(name) && (\n        /Browser|Lunascape|Maxthon/.test(name) ||\n        name != 'Safari' && /^iOS/.test(os) && /\\bSafari\\b/.test(layout[1]) ||\n        /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(name) && layout[1])) {\n      // Don't add layout details to description if they are falsey.\n      (data = layout[layout.length - 1]) && description.push(data);\n    }\n    // Combine contextual information.\n    if (description.length) {\n      description = ['(' + description.join('; ') + ')'];\n    }\n    // Append manufacturer to description.\n    if (manufacturer && product && product.indexOf(manufacturer) < 0) {\n      description.push('on ' + manufacturer);\n    }\n    // Append product to description.\n    if (product) {\n      description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);\n    }\n    // Parse the OS into an object.\n    if (os) {\n      data = / ([\\d.+]+)$/.exec(os);\n      isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';\n      os = {\n        'architecture': 32,\n        'family': (data && !isSpecialCasedOS) ? os.replace(data[0], '') : os,\n        'version': data ? data[1] : null,\n        'toString': function() {\n          var version = this.version;\n          return this.family + ((version && !isSpecialCasedOS) ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');\n        }\n      };\n    }\n    // Add browser/OS architecture.\n    if ((data = /\\b(?:AMD|IA|Win|WOW|x86_|x)64\\b/i.exec(arch)) && !/\\bi686\\b/i.test(arch)) {\n      if (os) {\n        os.architecture = 64;\n        os.family = os.family.replace(RegExp(' *' + data), '');\n      }\n      if (\n          name && (/\\bWOW64\\b/i.test(ua) ||\n          (useFeatures && /\\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\\bWin64; x64\\b/i.test(ua)))\n      ) {\n        description.unshift('32-bit');\n      }\n    }\n    // Chrome 39 and above on OS X is always 64-bit.\n    else if (\n        os && /^OS X/.test(os.family) &&\n        name == 'Chrome' && parseFloat(version) >= 39\n    ) {\n      os.architecture = 64;\n    }\n\n    ua || (ua = null);\n\n    /*------------------------------------------------------------------------*/\n\n    /**\n     * The platform object.\n     *\n     * @name platform\n     * @type Object\n     */\n    var platform = {};\n\n    /**\n     * The platform description.\n     *\n     * @memberOf platform\n     * @type string|null\n     */\n    platform.description = ua;\n\n    /**\n     * The name of the browser's layout engine.\n     *\n     * The list of common layout engines include:\n     * \"Blink\", \"EdgeHTML\", \"Gecko\", \"Trident\" and \"WebKit\"\n     *\n     * @memberOf platform\n     * @type string|null\n     */\n    platform.layout = layout && layout[0];\n\n    /**\n     * The name of the product's manufacturer.\n     *\n     * The list of manufacturers include:\n     * \"Apple\", \"Archos\", \"Amazon\", \"Asus\", \"Barnes & Noble\", \"BlackBerry\",\n     * \"Google\", \"HP\", \"HTC\", \"LG\", \"Microsoft\", \"Motorola\", \"Nintendo\",\n     * \"Nokia\", \"Samsung\" and \"Sony\"\n     *\n     * @memberOf platform\n     * @type string|null\n     */\n    platform.manufacturer = manufacturer;\n\n    /**\n     * The name of the browser/environment.\n     *\n     * The list of common browser names include:\n     * \"Chrome\", \"Electron\", \"Firefox\", \"Firefox for iOS\", \"IE\",\n     * \"Microsoft Edge\", \"PhantomJS\", \"Safari\", \"SeaMonkey\", \"Silk\",\n     * \"Opera Mini\" and \"Opera\"\n     *\n     * Mobile versions of some browsers have \"Mobile\" appended to their name:\n     * eg. \"Chrome Mobile\", \"Firefox Mobile\", \"IE Mobile\" and \"Opera Mobile\"\n     *\n     * @memberOf platform\n     * @type string|null\n     */\n    platform.name = name;\n\n    /**\n     * The alpha/beta release indicator.\n     *\n     * @memberOf platform\n     * @type string|null\n     */\n    platform.prerelease = prerelease;\n\n    /**\n     * The name of the product hosting the browser.\n     *\n     * The list of common products include:\n     *\n     * \"BlackBerry\", \"Galaxy S4\", \"Lumia\", \"iPad\", \"iPod\", \"iPhone\", \"Kindle\",\n     * \"Kindle Fire\", \"Nexus\", \"Nook\", \"PlayBook\", \"TouchPad\" and \"Transformer\"\n     *\n     * @memberOf platform\n     * @type string|null\n     */\n    platform.product = product;\n\n    /**\n     * The browser's user agent string.\n     *\n     * @memberOf platform\n     * @type string|null\n     */\n    platform.ua = ua;\n\n    /**\n     * The browser/environment version.\n     *\n     * @memberOf platform\n     * @type string|null\n     */\n    platform.version = name && version;\n\n    /**\n     * The name of the operating system.\n     *\n     * @memberOf platform\n     * @type Object\n     */\n    platform.os = os || {\n\n      /**\n       * The CPU architecture the OS is built for.\n       *\n       * @memberOf platform.os\n       * @type number|null\n       */\n      'architecture': null,\n\n      /**\n       * The family of the OS.\n       *\n       * Common values include:\n       * \"Windows\", \"Windows Server 2008 R2 / 7\", \"Windows Server 2008 / Vista\",\n       * \"Windows XP\", \"OS X\", \"Linux\", \"Ubuntu\", \"Debian\", \"Fedora\", \"Red Hat\",\n       * \"SuSE\", \"Android\", \"iOS\" and \"Windows Phone\"\n       *\n       * @memberOf platform.os\n       * @type string|null\n       */\n      'family': null,\n\n      /**\n       * The version of the OS.\n       *\n       * @memberOf platform.os\n       * @type string|null\n       */\n      'version': null,\n\n      /**\n       * Returns the OS string.\n       *\n       * @memberOf platform.os\n       * @returns {string} The OS string.\n       */\n      'toString': function() { return 'null'; }\n    };\n\n    platform.parse = parse;\n    platform.toString = toStringPlatform;\n\n    if (platform.version) {\n      description.unshift(version);\n    }\n    if (platform.name) {\n      description.unshift(name);\n    }\n    if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {\n      description.push(product ? '(' + os + ')' : 'on ' + os);\n    }\n    if (description.length) {\n      platform.description = description.join(' ');\n    }\n    return platform;\n  }\n\n  /*--------------------------------------------------------------------------*/\n\n  // Export platform.\n  var platform = parse();\n\n  // Some AMD build optimizers, like r.js, check for condition patterns like the following:\n  if (true) {\n    // Expose platform on the global object to prevent errors when platform is\n    // loaded by a script tag in the presence of an AMD loader.\n    // See http://requirejs.org/docs/errors.html#mismatch for more details.\n    root.platform = platform;\n\n    // Define as an anonymous module so platform can be aliased through path mapping.\n    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n      return platform;\n    }).call(exports, __webpack_require__, exports, module),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  }\n  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.\n  else {}\n}.call(this));\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/platform/platform.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/a-callable.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-callable.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar tryToString = __webpack_require__(/*! ../internals/try-to-string */ \"./node_modules/core-js/internals/try-to-string.js\");\n\nvar $TypeError = TypeError;\n\n// `Assert: IsCallable(argument) is true`\nmodule.exports = function (argument) {\n  if (isCallable(argument)) return argument;\n  throw new $TypeError(tryToString(argument) + ' is not a function');\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/a-callable.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/a-possible-prototype.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/a-possible-prototype.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar isPossiblePrototype = __webpack_require__(/*! ../internals/is-possible-prototype */ \"./node_modules/core-js/internals/is-possible-prototype.js\");\n\nvar $String = String;\nvar $TypeError = TypeError;\n\nmodule.exports = function (argument) {\n  if (isPossiblePrototype(argument)) return argument;\n  throw new $TypeError(\"Can't set \" + $String(argument) + ' as a prototype');\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/a-possible-prototype.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/add-to-unscopables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/add-to-unscopables.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js/internals/object-create.js\");\nvar defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\").f);\n\nvar UNSCOPABLES = wellKnownSymbol('unscopables');\nvar ArrayPrototype = Array.prototype;\n\n// Array.prototype[@@unscopables]\n// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables\nif (ArrayPrototype[UNSCOPABLES] === undefined) {\n  defineProperty(ArrayPrototype, UNSCOPABLES, {\n    configurable: true,\n    value: create(null)\n  });\n}\n\n// add a key to Array.prototype[@@unscopables]\nmodule.exports = function (key) {\n  ArrayPrototype[UNSCOPABLES][key] = true;\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/add-to-unscopables.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\nvar $String = String;\nvar $TypeError = TypeError;\n\n// `Assert: Type(argument) is Object`\nmodule.exports = function (argument) {\n  if (isObject(argument)) return argument;\n  throw new $TypeError($String(argument) + ' is not an object');\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/an-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ \"./node_modules/core-js/internals/to-absolute-index.js\");\nvar lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ \"./node_modules/core-js/internals/length-of-array-like.js\");\n\n// `Array.prototype.{ indexOf, includes }` methods implementation\nvar createMethod = function (IS_INCLUDES) {\n  return function ($this, el, fromIndex) {\n    var O = toIndexedObject($this);\n    var length = lengthOfArrayLike(O);\n    if (length === 0) return !IS_INCLUDES && -1;\n    var index = toAbsoluteIndex(fromIndex, length);\n    var value;\n    // Array#includes uses SameValueZero equality algorithm\n    // eslint-disable-next-line no-self-compare -- NaN check\n    if (IS_INCLUDES && el !== el) while (length > index) {\n      value = O[index++];\n      // eslint-disable-next-line no-self-compare -- NaN check\n      if (value !== value) return true;\n    // Array#indexOf ignores holes, Array#includes - not\n    } else for (;length > index; index++) {\n      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;\n    } return !IS_INCLUDES && -1;\n  };\n};\n\nmodule.exports = {\n  // `Array.prototype.includes` method\n  // https://tc39.es/ecma262/#sec-array.prototype.includes\n  includes: createMethod(true),\n  // `Array.prototype.indexOf` method\n  // https://tc39.es/ecma262/#sec-array.prototype.indexof\n  indexOf: createMethod(false)\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/array-includes.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\n\nvar toString = uncurryThis({}.toString);\nvar stringSlice = uncurryThis(''.slice);\n\nmodule.exports = function (it) {\n  return stringSlice(toString(it), 8, -1);\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/classof-raw.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar ownKeys = __webpack_require__(/*! ../internals/own-keys */ \"./node_modules/core-js/internals/own-keys.js\");\nvar getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js/internals/object-get-own-property-descriptor.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\n\nmodule.exports = function (target, source, exceptions) {\n  var keys = ownKeys(source);\n  var defineProperty = definePropertyModule.f;\n  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;\n  for (var i = 0; i < keys.length; i++) {\n    var key = keys[i];\n    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {\n      defineProperty(target, key, getOwnPropertyDescriptor(source, key));\n    }\n  }\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/copy-constructor-properties.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\nmodule.exports = !fails(function () {\n  function F() { /* empty */ }\n  F.prototype.constructor = null;\n  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing\n  return Object.getPrototypeOf(new F()) !== F.prototype;\n});\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/correct-prototype-getter.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/create-iter-result-object.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-iter-result-object.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n// `CreateIterResultObject` abstract operation\n// https://tc39.es/ecma262/#sec-createiterresultobject\nmodule.exports = function (value, done) {\n  return { value: value, done: done };\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/create-iter-result-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\n\nmodule.exports = DESCRIPTORS ? function (object, key, value) {\n  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));\n} : function (object, key, value) {\n  object[key] = value;\n  return object;\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/create-non-enumerable-property.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\nmodule.exports = function (bitmap, value) {\n  return {\n    enumerable: !(bitmap & 1),\n    configurable: !(bitmap & 2),\n    writable: !(bitmap & 4),\n    value: value\n  };\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/create-property-descriptor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/define-built-in.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-built-in.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\nvar makeBuiltIn = __webpack_require__(/*! ../internals/make-built-in */ \"./node_modules/core-js/internals/make-built-in.js\");\nvar defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ \"./node_modules/core-js/internals/define-global-property.js\");\n\nmodule.exports = function (O, key, value, options) {\n  if (!options) options = {};\n  var simple = options.enumerable;\n  var name = options.name !== undefined ? options.name : key;\n  if (isCallable(value)) makeBuiltIn(value, name, options);\n  if (options.global) {\n    if (simple) O[key] = value;\n    else defineGlobalProperty(key, value);\n  } else {\n    try {\n      if (!options.unsafe) delete O[key];\n      else if (O[key]) simple = true;\n    } catch (error) { /* empty */ }\n    if (simple) O[key] = value;\n    else definePropertyModule.f(O, key, {\n      value: value,\n      enumerable: false,\n      configurable: !options.nonConfigurable,\n      writable: !options.nonWritable\n    });\n  } return O;\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/define-built-in.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/define-global-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/define-global-property.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar globalThis = __webpack_require__(/*! ../internals/global-this */ \"./node_modules/core-js/internals/global-this.js\");\n\n// eslint-disable-next-line es/no-object-defineproperty -- safe\nvar defineProperty = Object.defineProperty;\n\nmodule.exports = function (key, value) {\n  try {\n    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });\n  } catch (error) {\n    globalThis[key] = value;\n  } return value;\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/define-global-property.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\n// Detect IE8's incomplete defineProperty implementation\nmodule.exports = !fails(function () {\n  // eslint-disable-next-line es/no-object-defineproperty -- required for testing\n  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;\n});\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/descriptors.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar globalThis = __webpack_require__(/*! ../internals/global-this */ \"./node_modules/core-js/internals/global-this.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\nvar document = globalThis.document;\n// typeof document.createElement is 'object' in old IE\nvar EXISTS = isObject(document) && isObject(document.createElement);\n\nmodule.exports = function (it) {\n  return EXISTS ? document.createElement(it) : {};\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/document-create-element.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/dom-iterables.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/dom-iterables.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
eval("\n// iterable DOM collections\n// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods\nmodule.exports = {\n  CSSRuleList: 0,\n  CSSStyleDeclaration: 0,\n  CSSValueList: 0,\n  ClientRectList: 0,\n  DOMRectList: 0,\n  DOMStringList: 0,\n  DOMTokenList: 1,\n  DataTransferItemList: 0,\n  FileList: 0,\n  HTMLAllCollection: 0,\n  HTMLCollection: 0,\n  HTMLFormElement: 0,\n  HTMLSelectElement: 0,\n  MediaList: 0,\n  MimeTypeArray: 0,\n  NamedNodeMap: 0,\n  NodeList: 1,\n  PaintRequestList: 0,\n  Plugin: 0,\n  PluginArray: 0,\n  SVGLengthList: 0,\n  SVGNumberList: 0,\n  SVGPathSegList: 0,\n  SVGPointList: 0,\n  SVGStringList: 0,\n  SVGTransformList: 0,\n  SourceBufferList: 0,\n  StyleSheetList: 0,\n  TextTrackCueList: 0,\n  TextTrackList: 0,\n  TouchList: 0\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/dom-iterables.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/dom-token-list-prototype.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/dom-token-list-prototype.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`\nvar documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ \"./node_modules/core-js/internals/document-create-element.js\");\n\nvar classList = documentCreateElement('span').classList;\nvar DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;\n\nmodule.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/dom-token-list-prototype.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
eval("\n// IE8- don't enum bug keys\nmodule.exports = [\n  'constructor',\n  'hasOwnProperty',\n  'isPrototypeOf',\n  'propertyIsEnumerable',\n  'toLocaleString',\n  'toString',\n  'valueOf'\n];\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/enum-bug-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/environment-user-agent.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/environment-user-agent.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar globalThis = __webpack_require__(/*! ../internals/global-this */ \"./node_modules/core-js/internals/global-this.js\");\n\nvar navigator = globalThis.navigator;\nvar userAgent = navigator && navigator.userAgent;\n\nmodule.exports = userAgent ? String(userAgent) : '';\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/environment-user-agent.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/environment-v8-version.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/environment-v8-version.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar globalThis = __webpack_require__(/*! ../internals/global-this */ \"./node_modules/core-js/internals/global-this.js\");\nvar userAgent = __webpack_require__(/*! ../internals/environment-user-agent */ \"./node_modules/core-js/internals/environment-user-agent.js\");\n\nvar process = globalThis.process;\nvar Deno = globalThis.Deno;\nvar versions = process && process.versions || Deno && Deno.version;\nvar v8 = versions && versions.v8;\nvar match, version;\n\nif (v8) {\n  match = v8.split('.');\n  // in old Chrome, versions of V8 isn't V8 = Chrome / 10\n  // but their correct versions are not interesting for us\n  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);\n}\n\n// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`\n// so check `userAgent` even if `.v8` exists, but 0\nif (!version && userAgent) {\n  match = userAgent.match(/Edge\\/(\\d+)/);\n  if (!match || match[1] >= 74) {\n    match = userAgent.match(/Chrome\\/(\\d+)/);\n    if (match) version = +match[1];\n  }\n}\n\nmodule.exports = version;\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/environment-v8-version.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar globalThis = __webpack_require__(/*! ../internals/global-this */ \"./node_modules/core-js/internals/global-this.js\");\nvar getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js/internals/object-get-own-property-descriptor.js\").f);\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\nvar defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ \"./node_modules/core-js/internals/define-built-in.js\");\nvar defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ \"./node_modules/core-js/internals/define-global-property.js\");\nvar copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ \"./node_modules/core-js/internals/copy-constructor-properties.js\");\nvar isForced = __webpack_require__(/*! ../internals/is-forced */ \"./node_modules/core-js/internals/is-forced.js\");\n\n/*\n  options.target         - name of the target object\n  options.global         - target is the global object\n  options.stat           - export as static methods of target\n  options.proto          - export as prototype methods of target\n  options.real           - real prototype method for the `pure` version\n  options.forced         - export even if the native feature is available\n  options.bind           - bind methods to the target, required for the `pure` version\n  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version\n  options.unsafe         - use the simple assignment of property instead of delete + defineProperty\n  options.sham           - add a flag to not completely full polyfills\n  options.enumerable     - export as enumerable property\n  options.dontCallGetSet - prevent calling a getter on target\n  options.name           - the .name of the function if it does not match the key\n*/\nmodule.exports = function (options, source) {\n  var TARGET = options.target;\n  var GLOBAL = options.global;\n  var STATIC = options.stat;\n  var FORCED, target, key, targetProperty, sourceProperty, descriptor;\n  if (GLOBAL) {\n    target = globalThis;\n  } else if (STATIC) {\n    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});\n  } else {\n    target = globalThis[TARGET] && globalThis[TARGET].prototype;\n  }\n  if (target) for (key in source) {\n    sourceProperty = source[key];\n    if (options.dontCallGetSet) {\n      descriptor = getOwnPropertyDescriptor(target, key);\n      targetProperty = descriptor && descriptor.value;\n    } else targetProperty = target[key];\n    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);\n    // contained in target\n    if (!FORCED && targetProperty !== undefined) {\n      if (typeof sourceProperty == typeof targetProperty) continue;\n      copyConstructorProperties(sourceProperty, targetProperty);\n    }\n    // add a flag to not completely full polyfills\n    if (options.sham || (targetProperty && targetProperty.sham)) {\n      createNonEnumerableProperty(sourceProperty, 'sham', true);\n    }\n    defineBuiltIn(target, key, sourceProperty, options);\n  }\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/export.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
eval("\nmodule.exports = function (exec) {\n  try {\n    return !!exec();\n  } catch (error) {\n    return true;\n  }\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/fails.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/function-bind-native.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-native.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\nmodule.exports = !fails(function () {\n  // eslint-disable-next-line es/no-function-prototype-bind -- safe\n  var test = (function () { /* empty */ }).bind();\n  // eslint-disable-next-line no-prototype-builtins -- safe\n  return typeof test != 'function' || test.hasOwnProperty('prototype');\n});\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/function-bind-native.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/function-call.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-call.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ \"./node_modules/core-js/internals/function-bind-native.js\");\n\nvar call = Function.prototype.call;\n// eslint-disable-next-line es/no-function-prototype-bind -- safe\nmodule.exports = NATIVE_BIND ? call.bind(call) : function () {\n  return call.apply(call, arguments);\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/function-call.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/function-name.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-name.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\n\nvar FunctionPrototype = Function.prototype;\n// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe\nvar getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;\n\nvar EXISTS = hasOwn(FunctionPrototype, 'name');\n// additional protection from minified / mangled / dropped function names\nvar PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';\nvar CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));\n\nmodule.exports = {\n  EXISTS: EXISTS,\n  PROPER: PROPER,\n  CONFIGURABLE: CONFIGURABLE\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/function-name.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/function-uncurry-this-accessor.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/function-uncurry-this-accessor.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js/internals/a-callable.js\");\n\nmodule.exports = function (object, key, method) {\n  try {\n    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe\n    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));\n  } catch (error) { /* empty */ }\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/function-uncurry-this-accessor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/function-uncurry-this.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-uncurry-this.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ \"./node_modules/core-js/internals/function-bind-native.js\");\n\nvar FunctionPrototype = Function.prototype;\nvar call = FunctionPrototype.call;\n// eslint-disable-next-line es/no-function-prototype-bind -- safe\nvar uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);\n\nmodule.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {\n  return function () {\n    return call.apply(fn, arguments);\n  };\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/function-uncurry-this.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar globalThis = __webpack_require__(/*! ../internals/global-this */ \"./node_modules/core-js/internals/global-this.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\n\nvar aFunction = function (argument) {\n  return isCallable(argument) ? argument : undefined;\n};\n\nmodule.exports = function (namespace, method) {\n  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/get-built-in.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/get-method.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/get-method.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js/internals/a-callable.js\");\nvar isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ \"./node_modules/core-js/internals/is-null-or-undefined.js\");\n\n// `GetMethod` abstract operation\n// https://tc39.es/ecma262/#sec-getmethod\nmodule.exports = function (V, P) {\n  var func = V[P];\n  return isNullOrUndefined(func) ? undefined : aCallable(func);\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/get-method.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/global-this.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/global-this.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("\nvar check = function (it) {\n  return it && it.Math === Math && it;\n};\n\n// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028\nmodule.exports =\n  // eslint-disable-next-line es/no-global-this -- safe\n  check(typeof globalThis == 'object' && globalThis) ||\n  check(typeof window == 'object' && window) ||\n  // eslint-disable-next-line no-restricted-globals -- safe\n  check(typeof self == 'object' && self) ||\n  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||\n  check(typeof this == 'object' && this) ||\n  // eslint-disable-next-line no-new-func -- fallback\n  (function () { return this; })() || Function('return this')();\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/global-this.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/has-own-property.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/has-own-property.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js/internals/to-object.js\");\n\nvar hasOwnProperty = uncurryThis({}.hasOwnProperty);\n\n// `HasOwnProperty` abstract operation\n// https://tc39.es/ecma262/#sec-hasownproperty\n// eslint-disable-next-line es/no-object-hasown -- safe\nmodule.exports = Object.hasOwn || function hasOwn(it, key) {\n  return hasOwnProperty(toObject(it), key);\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/has-own-property.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
eval("\nmodule.exports = {};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/hidden-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\n\nmodule.exports = getBuiltIn('document', 'documentElement');\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/html.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar createElement = __webpack_require__(/*! ../internals/document-create-element */ \"./node_modules/core-js/internals/document-create-element.js\");\n\n// Thanks to IE8 for its funny defineProperty\nmodule.exports = !DESCRIPTORS && !fails(function () {\n  // eslint-disable-next-line es/no-object-defineproperty -- required for testing\n  return Object.defineProperty(createElement('div'), 'a', {\n    get: function () { return 7; }\n  }).a !== 7;\n});\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/ie8-dom-define.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\n\nvar $Object = Object;\nvar split = uncurryThis(''.split);\n\n// fallback for non-array-like ES3 and non-enumerable old V8 strings\nmodule.exports = fails(function () {\n  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346\n  // eslint-disable-next-line no-prototype-builtins -- safe\n  return !$Object('z').propertyIsEnumerable(0);\n}) ? function (it) {\n  return classof(it) === 'String' ? split(it, '') : $Object(it);\n} : $Object;\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/indexed-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/inspect-source.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar store = __webpack_require__(/*! ../internals/shared-store */ \"./node_modules/core-js/internals/shared-store.js\");\n\nvar functionToString = uncurryThis(Function.toString);\n\n// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper\nif (!isCallable(store.inspectSource)) {\n  store.inspectSource = function (it) {\n    return functionToString(it);\n  };\n}\n\nmodule.exports = store.inspectSource;\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/inspect-source.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/weak-map-basic-detection */ \"./node_modules/core-js/internals/weak-map-basic-detection.js\");\nvar globalThis = __webpack_require__(/*! ../internals/global-this */ \"./node_modules/core-js/internals/global-this.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar shared = __webpack_require__(/*! ../internals/shared-store */ \"./node_modules/core-js/internals/shared-store.js\");\nvar sharedKey = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js/internals/shared-key.js\");\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js/internals/hidden-keys.js\");\n\nvar OBJECT_ALREADY_INITIALIZED = 'Object already initialized';\nvar TypeError = globalThis.TypeError;\nvar WeakMap = globalThis.WeakMap;\nvar set, get, has;\n\nvar enforce = function (it) {\n  return has(it) ? get(it) : set(it, {});\n};\n\nvar getterFor = function (TYPE) {\n  return function (it) {\n    var state;\n    if (!isObject(it) || (state = get(it)).type !== TYPE) {\n      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');\n    } return state;\n  };\n};\n\nif (NATIVE_WEAK_MAP || shared.state) {\n  var store = shared.state || (shared.state = new WeakMap());\n  /* eslint-disable no-self-assign -- prototype methods protection */\n  store.get = store.get;\n  store.has = store.has;\n  store.set = store.set;\n  /* eslint-enable no-self-assign -- prototype methods protection */\n  set = function (it, metadata) {\n    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);\n    metadata.facade = it;\n    store.set(it, metadata);\n    return metadata;\n  };\n  get = function (it) {\n    return store.get(it) || {};\n  };\n  has = function (it) {\n    return store.has(it);\n  };\n} else {\n  var STATE = sharedKey('state');\n  hiddenKeys[STATE] = true;\n  set = function (it, metadata) {\n    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);\n    metadata.facade = it;\n    createNonEnumerableProperty(it, STATE, metadata);\n    return metadata;\n  };\n  get = function (it) {\n    return hasOwn(it, STATE) ? it[STATE] : {};\n  };\n  has = function (it) {\n    return hasOwn(it, STATE);\n  };\n}\n\nmodule.exports = {\n  set: set,\n  get: get,\n  has: has,\n  enforce: enforce,\n  getterFor: getterFor\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/internal-state.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-callable.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/is-callable.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
eval("\n// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot\nvar documentAll = typeof document == 'object' && document.all;\n\n// `IsCallable` abstract operation\n// https://tc39.es/ecma262/#sec-iscallable\n// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing\nmodule.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {\n  return typeof argument == 'function' || argument === documentAll;\n} : function (argument) {\n  return typeof argument == 'function';\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/is-callable.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\n\nvar replacement = /#|\\.prototype\\./;\n\nvar isForced = function (feature, detection) {\n  var value = data[normalize(feature)];\n  return value === POLYFILL ? true\n    : value === NATIVE ? false\n    : isCallable(detection) ? fails(detection)\n    : !!detection;\n};\n\nvar normalize = isForced.normalize = function (string) {\n  return String(string).replace(replacement, '.').toLowerCase();\n};\n\nvar data = isForced.data = {};\nvar NATIVE = isForced.NATIVE = 'N';\nvar POLYFILL = isForced.POLYFILL = 'P';\n\nmodule.exports = isForced;\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/is-forced.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-null-or-undefined.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/is-null-or-undefined.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
eval("\n// we can't use just `it == null` since of `document.all` special case\n// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec\nmodule.exports = function (it) {\n  return it === null || it === undefined;\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/is-null-or-undefined.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\n\nmodule.exports = function (it) {\n  return typeof it == 'object' ? it !== null : isCallable(it);\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/is-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-possible-prototype.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/is-possible-prototype.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\nmodule.exports = function (argument) {\n  return isObject(argument) || argument === null;\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/is-possible-prototype.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
eval("\nmodule.exports = false;\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/is-pure.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-symbol.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-symbol.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ \"./node_modules/core-js/internals/object-is-prototype-of.js\");\nvar USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ \"./node_modules/core-js/internals/use-symbol-as-uid.js\");\n\nvar $Object = Object;\n\nmodule.exports = USE_SYMBOL_AS_UID ? function (it) {\n  return typeof it == 'symbol';\n} : function (it) {\n  var $Symbol = getBuiltIn('Symbol');\n  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/is-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/iterator-create-constructor.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/iterator-create-constructor.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar IteratorPrototype = (__webpack_require__(/*! ../internals/iterators-core */ \"./node_modules/core-js/internals/iterators-core.js\").IteratorPrototype);\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js/internals/object-create.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js/internals/set-to-string-tag.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js/internals/iterators.js\");\n\nvar returnThis = function () { return this; };\n\nmodule.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {\n  var TO_STRING_TAG = NAME + ' Iterator';\n  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });\n  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);\n  Iterators[TO_STRING_TAG] = returnThis;\n  return IteratorConstructor;\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/iterator-create-constructor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/iterator-define.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/iterator-define.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js/internals/function-call.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\");\nvar FunctionName = __webpack_require__(/*! ../internals/function-name */ \"./node_modules/core-js/internals/function-name.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar createIteratorConstructor = __webpack_require__(/*! ../internals/iterator-create-constructor */ \"./node_modules/core-js/internals/iterator-create-constructor.js\");\nvar getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ \"./node_modules/core-js/internals/object-get-prototype-of.js\");\nvar setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ \"./node_modules/core-js/internals/object-set-prototype-of.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js/internals/set-to-string-tag.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\nvar defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ \"./node_modules/core-js/internals/define-built-in.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js/internals/iterators.js\");\nvar IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ \"./node_modules/core-js/internals/iterators-core.js\");\n\nvar PROPER_FUNCTION_NAME = FunctionName.PROPER;\nvar CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;\nvar IteratorPrototype = IteratorsCore.IteratorPrototype;\nvar BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;\nvar ITERATOR = wellKnownSymbol('iterator');\nvar KEYS = 'keys';\nvar VALUES = 'values';\nvar ENTRIES = 'entries';\n\nvar returnThis = function () { return this; };\n\nmodule.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {\n  createIteratorConstructor(IteratorConstructor, NAME, next);\n\n  var getIterationMethod = function (KIND) {\n    if (KIND === DEFAULT && defaultIterator) return defaultIterator;\n    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];\n\n    switch (KIND) {\n      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };\n      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };\n      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };\n    }\n\n    return function () { return new IteratorConstructor(this); };\n  };\n\n  var TO_STRING_TAG = NAME + ' Iterator';\n  var INCORRECT_VALUES_NAME = false;\n  var IterablePrototype = Iterable.prototype;\n  var nativeIterator = IterablePrototype[ITERATOR]\n    || IterablePrototype['@@iterator']\n    || DEFAULT && IterablePrototype[DEFAULT];\n  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);\n  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;\n  var CurrentIteratorPrototype, methods, KEY;\n\n  // fix native\n  if (anyNativeIterator) {\n    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));\n    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {\n      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {\n        if (setPrototypeOf) {\n          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);\n        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {\n          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);\n        }\n      }\n      // Set @@toStringTag to native iterators\n      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);\n      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;\n    }\n  }\n\n  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF\n  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {\n    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {\n      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);\n    } else {\n      INCORRECT_VALUES_NAME = true;\n      defaultIterator = function values() { return call(nativeIterator, this); };\n    }\n  }\n\n  // export additional methods\n  if (DEFAULT) {\n    methods = {\n      values: getIterationMethod(VALUES),\n      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),\n      entries: getIterationMethod(ENTRIES)\n    };\n    if (FORCED) for (KEY in methods) {\n      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {\n        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);\n      }\n    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);\n  }\n\n  // define iterator\n  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {\n    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });\n  }\n  Iterators[NAME] = defaultIterator;\n\n  return methods;\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/iterator-define.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/iterators-core.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterators-core.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js/internals/object-create.js\");\nvar getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ \"./node_modules/core-js/internals/object-get-prototype-of.js\");\nvar defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ \"./node_modules/core-js/internals/define-built-in.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\");\n\nvar ITERATOR = wellKnownSymbol('iterator');\nvar BUGGY_SAFARI_ITERATORS = false;\n\n// `%IteratorPrototype%` object\n// https://tc39.es/ecma262/#sec-%iteratorprototype%-object\nvar IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;\n\n/* eslint-disable es/no-array-prototype-keys -- safe */\nif ([].keys) {\n  arrayIterator = [].keys();\n  // Safari 8 has buggy iterators w/o `next`\n  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;\n  else {\n    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));\n    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;\n  }\n}\n\nvar NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {\n  var test = {};\n  // FF44- legacy iterators case\n  return IteratorPrototype[ITERATOR].call(test) !== test;\n});\n\nif (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};\nelse if (IS_PURE) IteratorPrototype = create(IteratorPrototype);\n\n// `%IteratorPrototype%[@@iterator]()` method\n// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator\nif (!isCallable(IteratorPrototype[ITERATOR])) {\n  defineBuiltIn(IteratorPrototype, ITERATOR, function () {\n    return this;\n  });\n}\n\nmodule.exports = {\n  IteratorPrototype: IteratorPrototype,\n  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/iterators-core.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/iterators.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/iterators.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\nmodule.exports = {};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/iterators.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/length-of-array-like.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/length-of-array-like.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar toLength = __webpack_require__(/*! ../internals/to-length */ \"./node_modules/core-js/internals/to-length.js\");\n\n// `LengthOfArrayLike` abstract operation\n// https://tc39.es/ecma262/#sec-lengthofarraylike\nmodule.exports = function (obj) {\n  return toLength(obj.length);\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/length-of-array-like.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/make-built-in.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/make-built-in.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(/*! ../internals/function-name */ \"./node_modules/core-js/internals/function-name.js\").CONFIGURABLE);\nvar inspectSource = __webpack_require__(/*! ../internals/inspect-source */ \"./node_modules/core-js/internals/inspect-source.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js/internals/internal-state.js\");\n\nvar enforceInternalState = InternalStateModule.enforce;\nvar getInternalState = InternalStateModule.get;\nvar $String = String;\n// eslint-disable-next-line es/no-object-defineproperty -- safe\nvar defineProperty = Object.defineProperty;\nvar stringSlice = uncurryThis(''.slice);\nvar replace = uncurryThis(''.replace);\nvar join = uncurryThis([].join);\n\nvar CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {\n  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;\n});\n\nvar TEMPLATE = String(String).split('String');\n\nvar makeBuiltIn = module.exports = function (value, name, options) {\n  if (stringSlice($String(name), 0, 7) === 'Symbol(') {\n    name = '[' + replace($String(name), /^Symbol\\(([^)]*)\\).*$/, '$1') + ']';\n  }\n  if (options && options.getter) name = 'get ' + name;\n  if (options && options.setter) name = 'set ' + name;\n  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {\n    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });\n    else value.name = name;\n  }\n  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {\n    defineProperty(value, 'length', { value: options.arity });\n  }\n  try {\n    if (options && hasOwn(options, 'constructor') && options.constructor) {\n      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });\n    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable\n    } else if (value.prototype) value.prototype = undefined;\n  } catch (error) { /* empty */ }\n  var state = enforceInternalState(value);\n  if (!hasOwn(state, 'source')) {\n    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');\n  } return value;\n};\n\n// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative\n// eslint-disable-next-line no-extend-native -- required\nFunction.prototype.toString = makeBuiltIn(function toString() {\n  return isCallable(this) && getInternalState(this).source || inspectSource(this);\n}, 'toString');\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/make-built-in.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/math-trunc.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/math-trunc.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
eval("\nvar ceil = Math.ceil;\nvar floor = Math.floor;\n\n// `Math.trunc` method\n// https://tc39.es/ecma262/#sec-math.trunc\n// eslint-disable-next-line es/no-math-trunc -- safe\nmodule.exports = Math.trunc || function trunc(x) {\n  var n = +x;\n  return (n > 0 ? floor : ceil)(n);\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/math-trunc.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n/* global ActiveXObject -- old IE, WSH */\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar definePropertiesModule = __webpack_require__(/*! ../internals/object-define-properties */ \"./node_modules/core-js/internals/object-define-properties.js\");\nvar enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js/internals/enum-bug-keys.js\");\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js/internals/hidden-keys.js\");\nvar html = __webpack_require__(/*! ../internals/html */ \"./node_modules/core-js/internals/html.js\");\nvar documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ \"./node_modules/core-js/internals/document-create-element.js\");\nvar sharedKey = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js/internals/shared-key.js\");\n\nvar GT = '>';\nvar LT = '<';\nvar PROTOTYPE = 'prototype';\nvar SCRIPT = 'script';\nvar IE_PROTO = sharedKey('IE_PROTO');\n\nvar EmptyConstructor = function () { /* empty */ };\n\nvar scriptTag = function (content) {\n  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;\n};\n\n// Create object with fake `null` prototype: use ActiveX Object with cleared prototype\nvar NullProtoObjectViaActiveX = function (activeXDocument) {\n  activeXDocument.write(scriptTag(''));\n  activeXDocument.close();\n  var temp = activeXDocument.parentWindow.Object;\n  // eslint-disable-next-line no-useless-assignment -- avoid memory leak\n  activeXDocument = null;\n  return temp;\n};\n\n// Create object with fake `null` prototype: use iframe Object with cleared prototype\nvar NullProtoObjectViaIFrame = function () {\n  // Thrash, waste and sodomy: IE GC bug\n  var iframe = documentCreateElement('iframe');\n  var JS = 'java' + SCRIPT + ':';\n  var iframeDocument;\n  iframe.style.display = 'none';\n  html.appendChild(iframe);\n  // https://github.com/zloirock/core-js/issues/475\n  iframe.src = String(JS);\n  iframeDocument = iframe.contentWindow.document;\n  iframeDocument.open();\n  iframeDocument.write(scriptTag('document.F=Object'));\n  iframeDocument.close();\n  return iframeDocument.F;\n};\n\n// Check for document.domain and active x support\n// No need to use active x approach when document.domain is not set\n// see https://github.com/es-shims/es5-shim/issues/150\n// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346\n// avoid IE GC bug\nvar activeXDocument;\nvar NullProtoObject = function () {\n  try {\n    activeXDocument = new ActiveXObject('htmlfile');\n  } catch (error) { /* ignore */ }\n  NullProtoObject = typeof document != 'undefined'\n    ? document.domain && activeXDocument\n      ? NullProtoObjectViaActiveX(activeXDocument) // old IE\n      : NullProtoObjectViaIFrame()\n    : NullProtoObjectViaActiveX(activeXDocument); // WSH\n  var length = enumBugKeys.length;\n  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];\n  return NullProtoObject();\n};\n\nhiddenKeys[IE_PROTO] = true;\n\n// `Object.create` method\n// https://tc39.es/ecma262/#sec-object.create\n// eslint-disable-next-line es/no-object-create -- safe\nmodule.exports = Object.create || function create(O, Properties) {\n  var result;\n  if (O !== null) {\n    EmptyConstructor[PROTOTYPE] = anObject(O);\n    result = new EmptyConstructor();\n    EmptyConstructor[PROTOTYPE] = null;\n    // add \"__proto__\" for Object.getPrototypeOf polyfill\n    result[IE_PROTO] = O;\n  } else result = NullProtoObject();\n  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/object-create.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ \"./node_modules/core-js/internals/v8-prototype-define-bug.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar objectKeys = __webpack_require__(/*! ../internals/object-keys */ \"./node_modules/core-js/internals/object-keys.js\");\n\n// `Object.defineProperties` method\n// https://tc39.es/ecma262/#sec-object.defineproperties\n// eslint-disable-next-line es/no-object-defineproperties -- safe\nexports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {\n  anObject(O);\n  var props = toIndexedObject(Properties);\n  var keys = objectKeys(Properties);\n  var length = keys.length;\n  var index = 0;\n  var key;\n  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);\n  return O;\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/object-define-properties.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ \"./node_modules/core-js/internals/ie8-dom-define.js\");\nvar V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ \"./node_modules/core-js/internals/v8-prototype-define-bug.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ \"./node_modules/core-js/internals/to-property-key.js\");\n\nvar $TypeError = TypeError;\n// eslint-disable-next-line es/no-object-defineproperty -- safe\nvar $defineProperty = Object.defineProperty;\n// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe\nvar $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\nvar ENUMERABLE = 'enumerable';\nvar CONFIGURABLE = 'configurable';\nvar WRITABLE = 'writable';\n\n// `Object.defineProperty` method\n// https://tc39.es/ecma262/#sec-object.defineproperty\nexports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPropertyKey(P);\n  anObject(Attributes);\n  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {\n    var current = $getOwnPropertyDescriptor(O, P);\n    if (current && current[WRITABLE]) {\n      O[P] = Attributes.value;\n      Attributes = {\n        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],\n        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],\n        writable: false\n      };\n    }\n  } return $defineProperty(O, P, Attributes);\n} : $defineProperty : function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPropertyKey(P);\n  anObject(Attributes);\n  if (IE8_DOM_DEFINE) try {\n    return $defineProperty(O, P, Attributes);\n  } catch (error) { /* empty */ }\n  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');\n  if ('value' in Attributes) O[P] = Attributes.value;\n  return O;\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/object-define-property.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js/internals/function-call.js\");\nvar propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ \"./node_modules/core-js/internals/object-property-is-enumerable.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ \"./node_modules/core-js/internals/to-property-key.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ \"./node_modules/core-js/internals/ie8-dom-define.js\");\n\n// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe\nvar $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\n\n// `Object.getOwnPropertyDescriptor` method\n// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor\nexports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {\n  O = toIndexedObject(O);\n  P = toPropertyKey(P);\n  if (IE8_DOM_DEFINE) try {\n    return $getOwnPropertyDescriptor(O, P);\n  } catch (error) { /* empty */ }\n  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/object-get-own-property-descriptor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nvar internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ \"./node_modules/core-js/internals/object-keys-internal.js\");\nvar enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js/internals/enum-bug-keys.js\");\n\nvar hiddenKeys = enumBugKeys.concat('length', 'prototype');\n\n// `Object.getOwnPropertyNames` method\n// https://tc39.es/ecma262/#sec-object.getownpropertynames\n// eslint-disable-next-line es/no-object-getownpropertynames -- safe\nexports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {\n  return internalObjectKeys(O, hiddenKeys);\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/object-get-own-property-names.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\n// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe\nexports.f = Object.getOwnPropertySymbols;\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/object-get-own-property-symbols.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js/internals/to-object.js\");\nvar sharedKey = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js/internals/shared-key.js\");\nvar CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ \"./node_modules/core-js/internals/correct-prototype-getter.js\");\n\nvar IE_PROTO = sharedKey('IE_PROTO');\nvar $Object = Object;\nvar ObjectPrototype = $Object.prototype;\n\n// `Object.getPrototypeOf` method\n// https://tc39.es/ecma262/#sec-object.getprototypeof\n// eslint-disable-next-line es/no-object-getprototypeof -- safe\nmodule.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {\n  var object = toObject(O);\n  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];\n  var constructor = object.constructor;\n  if (isCallable(constructor) && object instanceof constructor) {\n    return constructor.prototype;\n  } return object instanceof $Object ? ObjectPrototype : null;\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/object-get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-is-prototype-of.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-is-prototype-of.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\n\nmodule.exports = uncurryThis({}.isPrototypeOf);\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/object-is-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar indexOf = (__webpack_require__(/*! ../internals/array-includes */ \"./node_modules/core-js/internals/array-includes.js\").indexOf);\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js/internals/hidden-keys.js\");\n\nvar push = uncurryThis([].push);\n\nmodule.exports = function (object, names) {\n  var O = toIndexedObject(object);\n  var i = 0;\n  var result = [];\n  var key;\n  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);\n  // Don't enum bug & hidden keys\n  while (names.length > i) if (hasOwn(O, key = names[i++])) {\n    ~indexOf(result, key) || push(result, key);\n  }\n  return result;\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/object-keys-internal.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ \"./node_modules/core-js/internals/object-keys-internal.js\");\nvar enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js/internals/enum-bug-keys.js\");\n\n// `Object.keys` method\n// https://tc39.es/ecma262/#sec-object.keys\n// eslint-disable-next-line es/no-object-keys -- safe\nmodule.exports = Object.keys || function keys(O) {\n  return internalObjectKeys(O, enumBugKeys);\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/object-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nvar $propertyIsEnumerable = {}.propertyIsEnumerable;\n// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe\nvar getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\n\n// Nashorn ~ JDK8 bug\nvar NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);\n\n// `Object.prototype.propertyIsEnumerable` method implementation\n// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable\nexports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {\n  var descriptor = getOwnPropertyDescriptor(this, V);\n  return !!descriptor && descriptor.enumerable;\n} : $propertyIsEnumerable;\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/object-property-is-enumerable.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n/* eslint-disable no-proto -- safe */\nvar uncurryThisAccessor = __webpack_require__(/*! ../internals/function-uncurry-this-accessor */ \"./node_modules/core-js/internals/function-uncurry-this-accessor.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\nvar aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ \"./node_modules/core-js/internals/a-possible-prototype.js\");\n\n// `Object.setPrototypeOf` method\n// https://tc39.es/ecma262/#sec-object.setprototypeof\n// Works with __proto__ only. Old v8 can't work with null proto objects.\n// eslint-disable-next-line es/no-object-setprototypeof -- safe\nmodule.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {\n  var CORRECT_SETTER = false;\n  var test = {};\n  var setter;\n  try {\n    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');\n    setter(test, []);\n    CORRECT_SETTER = test instanceof Array;\n  } catch (error) { /* empty */ }\n  return function setPrototypeOf(O, proto) {\n    requireObjectCoercible(O);\n    aPossiblePrototype(proto);\n    if (!isObject(O)) return O;\n    if (CORRECT_SETTER) setter(O, proto);\n    else O.__proto__ = proto;\n    return O;\n  };\n}() : undefined);\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/object-set-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/ordinary-to-primitive.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/ordinary-to-primitive.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js/internals/function-call.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\nvar $TypeError = TypeError;\n\n// `OrdinaryToPrimitive` abstract operation\n// https://tc39.es/ecma262/#sec-ordinarytoprimitive\nmodule.exports = function (input, pref) {\n  var fn, val;\n  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;\n  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;\n  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;\n  throw new $TypeError(\"Can't convert object to primitive value\");\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/ordinary-to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ \"./node_modules/core-js/internals/object-get-own-property-names.js\");\nvar getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ \"./node_modules/core-js/internals/object-get-own-property-symbols.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\n\nvar concat = uncurryThis([].concat);\n\n// all object keys, includes non-enumerable and symbols\nmodule.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {\n  var keys = getOwnPropertyNamesModule.f(anObject(it));\n  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;\n  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/own-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ \"./node_modules/core-js/internals/is-null-or-undefined.js\");\n\nvar $TypeError = TypeError;\n\n// `RequireObjectCoercible` abstract operation\n// https://tc39.es/ecma262/#sec-requireobjectcoercible\nmodule.exports = function (it) {\n  if (isNullOrUndefined(it)) throw new $TypeError(\"Can't call method on \" + it);\n  return it;\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/require-object-coercible.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/set-to-string-tag.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\").f);\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\n\nmodule.exports = function (target, TAG, STATIC) {\n  if (target && !STATIC) target = target.prototype;\n  if (target && !hasOwn(target, TO_STRING_TAG)) {\n    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });\n  }\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/set-to-string-tag.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\");\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js/internals/uid.js\");\n\nvar keys = shared('keys');\n\nmodule.exports = function (key) {\n  return keys[key] || (keys[key] = uid(key));\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/shared-key.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\");\nvar globalThis = __webpack_require__(/*! ../internals/global-this */ \"./node_modules/core-js/internals/global-this.js\");\nvar defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ \"./node_modules/core-js/internals/define-global-property.js\");\n\nvar SHARED = '__core-js_shared__';\nvar store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});\n\n(store.versions || (store.versions = [])).push({\n  version: '3.40.0',\n  mode: IS_PURE ? 'pure' : 'global',\n  copyright: '© 2014-2025 Denis Pushkarev (zloirock.ru)',\n  license: 'https://github.com/zloirock/core-js/blob/v3.40.0/LICENSE',\n  source: 'https://github.com/zloirock/core-js'\n});\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/shared-store.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar store = __webpack_require__(/*! ../internals/shared-store */ \"./node_modules/core-js/internals/shared-store.js\");\n\nmodule.exports = function (key, value) {\n  return store[key] || (store[key] = value || {});\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/shared.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/symbol-constructor-detection.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js/internals/symbol-constructor-detection.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n/* eslint-disable es/no-symbol -- required for testing */\nvar V8_VERSION = __webpack_require__(/*! ../internals/environment-v8-version */ \"./node_modules/core-js/internals/environment-v8-version.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar globalThis = __webpack_require__(/*! ../internals/global-this */ \"./node_modules/core-js/internals/global-this.js\");\n\nvar $String = globalThis.String;\n\n// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing\nmodule.exports = !!Object.getOwnPropertySymbols && !fails(function () {\n  var symbol = Symbol('symbol detection');\n  // Chrome 38 Symbol has incorrect toString conversion\n  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances\n  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,\n  // of course, fail.\n  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||\n    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances\n    !Symbol.sham && V8_VERSION && V8_VERSION < 41;\n});\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/symbol-constructor-detection.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ \"./node_modules/core-js/internals/to-integer-or-infinity.js\");\n\nvar max = Math.max;\nvar min = Math.min;\n\n// Helper for a popular repeating case of the spec:\n// Let integer be ? ToInteger(index).\n// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).\nmodule.exports = function (index, length) {\n  var integer = toIntegerOrInfinity(index);\n  return integer < 0 ? max(integer + length, 0) : min(integer, length);\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/to-absolute-index.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n// toObject with fallback for non-array-like ES3 strings\nvar IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ \"./node_modules/core-js/internals/indexed-object.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\n\nmodule.exports = function (it) {\n  return IndexedObject(requireObjectCoercible(it));\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/to-indexed-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-integer-or-infinity.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer-or-infinity.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar trunc = __webpack_require__(/*! ../internals/math-trunc */ \"./node_modules/core-js/internals/math-trunc.js\");\n\n// `ToIntegerOrInfinity` abstract operation\n// https://tc39.es/ecma262/#sec-tointegerorinfinity\nmodule.exports = function (argument) {\n  var number = +argument;\n  // eslint-disable-next-line no-self-compare -- NaN check\n  return number !== number || number === 0 ? 0 : trunc(number);\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/to-integer-or-infinity.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ \"./node_modules/core-js/internals/to-integer-or-infinity.js\");\n\nvar min = Math.min;\n\n// `ToLength` abstract operation\n// https://tc39.es/ecma262/#sec-tolength\nmodule.exports = function (argument) {\n  var len = toIntegerOrInfinity(argument);\n  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/to-length.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\n\nvar $Object = Object;\n\n// `ToObject` abstract operation\n// https://tc39.es/ecma262/#sec-toobject\nmodule.exports = function (argument) {\n  return $Object(requireObjectCoercible(argument));\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/to-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js/internals/function-call.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar isSymbol = __webpack_require__(/*! ../internals/is-symbol */ \"./node_modules/core-js/internals/is-symbol.js\");\nvar getMethod = __webpack_require__(/*! ../internals/get-method */ \"./node_modules/core-js/internals/get-method.js\");\nvar ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ \"./node_modules/core-js/internals/ordinary-to-primitive.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar $TypeError = TypeError;\nvar TO_PRIMITIVE = wellKnownSymbol('toPrimitive');\n\n// `ToPrimitive` abstract operation\n// https://tc39.es/ecma262/#sec-toprimitive\nmodule.exports = function (input, pref) {\n  if (!isObject(input) || isSymbol(input)) return input;\n  var exoticToPrim = getMethod(input, TO_PRIMITIVE);\n  var result;\n  if (exoticToPrim) {\n    if (pref === undefined) pref = 'default';\n    result = call(exoticToPrim, input, pref);\n    if (!isObject(result) || isSymbol(result)) return result;\n    throw new $TypeError(\"Can't convert object to primitive value\");\n  }\n  if (pref === undefined) pref = 'number';\n  return ordinaryToPrimitive(input, pref);\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-property-key.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/to-property-key.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ \"./node_modules/core-js/internals/to-primitive.js\");\nvar isSymbol = __webpack_require__(/*! ../internals/is-symbol */ \"./node_modules/core-js/internals/is-symbol.js\");\n\n// `ToPropertyKey` abstract operation\n// https://tc39.es/ecma262/#sec-topropertykey\nmodule.exports = function (argument) {\n  var key = toPrimitive(argument, 'string');\n  return isSymbol(key) ? key : key + '';\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/to-property-key.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/try-to-string.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/try-to-string.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
eval("\nvar $String = String;\n\nmodule.exports = function (argument) {\n  try {\n    return $String(argument);\n  } catch (error) {\n    return 'Object';\n  }\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/try-to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\n\nvar id = 0;\nvar postfix = Math.random();\nvar toString = uncurryThis(1.0.toString);\n\nmodule.exports = function (key) {\n  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/uid.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n/* eslint-disable es/no-symbol -- required for testing */\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ \"./node_modules/core-js/internals/symbol-constructor-detection.js\");\n\nmodule.exports = NATIVE_SYMBOL &&\n  !Symbol.sham &&\n  typeof Symbol.iterator == 'symbol';\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/use-symbol-as-uid.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/v8-prototype-define-bug.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/v8-prototype-define-bug.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\n// V8 ~ Chrome 36-\n// https://bugs.chromium.org/p/v8/issues/detail?id=3334\nmodule.exports = DESCRIPTORS && fails(function () {\n  // eslint-disable-next-line es/no-object-defineproperty -- required for testing\n  return Object.defineProperty(function () { /* empty */ }, 'prototype', {\n    value: 42,\n    writable: false\n  }).prototype !== 42;\n});\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/v8-prototype-define-bug.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/weak-map-basic-detection.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/weak-map-basic-detection.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar globalThis = __webpack_require__(/*! ../internals/global-this */ \"./node_modules/core-js/internals/global-this.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\n\nvar WeakMap = globalThis.WeakMap;\n\nmodule.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/weak-map-basic-detection.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar globalThis = __webpack_require__(/*! ../internals/global-this */ \"./node_modules/core-js/internals/global-this.js\");\nvar shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js/internals/uid.js\");\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ \"./node_modules/core-js/internals/symbol-constructor-detection.js\");\nvar USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ \"./node_modules/core-js/internals/use-symbol-as-uid.js\");\n\nvar Symbol = globalThis.Symbol;\nvar WellKnownSymbolsStore = shared('wks');\nvar createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;\n\nmodule.exports = function (name) {\n  if (!hasOwn(WellKnownSymbolsStore, name)) {\n    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)\n      ? Symbol[name]\n      : createWellKnownSymbol('Symbol.' + name);\n  } return WellKnownSymbolsStore[name];\n};\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/internals/well-known-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.iterator.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ \"./node_modules/core-js/internals/add-to-unscopables.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js/internals/iterators.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js/internals/internal-state.js\");\nvar defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\").f);\nvar defineIterator = __webpack_require__(/*! ../internals/iterator-define */ \"./node_modules/core-js/internals/iterator-define.js\");\nvar createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ \"./node_modules/core-js/internals/create-iter-result-object.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\n\nvar ARRAY_ITERATOR = 'Array Iterator';\nvar setInternalState = InternalStateModule.set;\nvar getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);\n\n// `Array.prototype.entries` method\n// https://tc39.es/ecma262/#sec-array.prototype.entries\n// `Array.prototype.keys` method\n// https://tc39.es/ecma262/#sec-array.prototype.keys\n// `Array.prototype.values` method\n// https://tc39.es/ecma262/#sec-array.prototype.values\n// `Array.prototype[@@iterator]` method\n// https://tc39.es/ecma262/#sec-array.prototype-@@iterator\n// `CreateArrayIterator` internal method\n// https://tc39.es/ecma262/#sec-createarrayiterator\nmodule.exports = defineIterator(Array, 'Array', function (iterated, kind) {\n  setInternalState(this, {\n    type: ARRAY_ITERATOR,\n    target: toIndexedObject(iterated), // target\n    index: 0,                          // next index\n    kind: kind                         // kind\n  });\n// `%ArrayIteratorPrototype%.next` method\n// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next\n}, function () {\n  var state = getInternalState(this);\n  var target = state.target;\n  var index = state.index++;\n  if (!target || index >= target.length) {\n    state.target = null;\n    return createIterResultObject(undefined, true);\n  }\n  switch (state.kind) {\n    case 'keys': return createIterResultObject(index, false);\n    case 'values': return createIterResultObject(target[index], false);\n  } return createIterResultObject([index, target[index]], false);\n}, 'values');\n\n// argumentsList[@@iterator] is %ArrayProto_values%\n// https://tc39.es/ecma262/#sec-createunmappedargumentsobject\n// https://tc39.es/ecma262/#sec-createmappedargumentsobject\nvar values = Iterators.Arguments = Iterators.Array;\n\n// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables\naddToUnscopables('keys');\naddToUnscopables('values');\naddToUnscopables('entries');\n\n// V8 ~ Chrome 45- bug\nif (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {\n  defineProperty(values, 'name', { value: 'values' });\n} catch (error) { /* empty */ }\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/modules/es.array.iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.iterator.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.iterator.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar globalThis = __webpack_require__(/*! ../internals/global-this */ \"./node_modules/core-js/internals/global-this.js\");\nvar DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ \"./node_modules/core-js/internals/dom-iterables.js\");\nvar DOMTokenListPrototype = __webpack_require__(/*! ../internals/dom-token-list-prototype */ \"./node_modules/core-js/internals/dom-token-list-prototype.js\");\nvar ArrayIteratorMethods = __webpack_require__(/*! ../modules/es.array.iterator */ \"./node_modules/core-js/modules/es.array.iterator.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js/internals/set-to-string-tag.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar ITERATOR = wellKnownSymbol('iterator');\nvar ArrayValues = ArrayIteratorMethods.values;\n\nvar handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {\n  if (CollectionPrototype) {\n    // some Chrome versions have non-configurable methods on DOMTokenList\n    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {\n      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);\n    } catch (error) {\n      CollectionPrototype[ITERATOR] = ArrayValues;\n    }\n    setToStringTag(CollectionPrototype, COLLECTION_NAME, true);\n    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {\n      // some Chrome versions have non-configurable methods on DOMTokenList\n      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {\n        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);\n      } catch (error) {\n        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];\n      }\n    }\n  }\n};\n\nfor (var COLLECTION_NAME in DOMIterables) {\n  handlePrototype(globalThis[COLLECTION_NAME] && globalThis[COLLECTION_NAME].prototype, COLLECTION_NAME);\n}\n\nhandlePrototype(DOMTokenListPrototype, 'DOMTokenList');\n\n\n//# sourceURL=webpack://EasyEyesPeer/./node_modules/core-js/modules/web.dom-collections.iterator.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/PhonePeer.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});