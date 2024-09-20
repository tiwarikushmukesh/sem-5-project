"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/micromark-util-decode-numeric-character-reference";
exports.ids = ["vendor-chunks/micromark-util-decode-numeric-character-reference"];
exports.modules = {

/***/ "(ssr)/./node_modules/micromark-util-decode-numeric-character-reference/dev/index.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/micromark-util-decode-numeric-character-reference/dev/index.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   decodeNumericCharacterReference: () => (/* binding */ decodeNumericCharacterReference)\n/* harmony export */ });\n/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ \"(ssr)/./node_modules/micromark-util-symbol/codes.js\");\n/* harmony import */ var micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/values.js */ \"(ssr)/./node_modules/micromark-util-symbol/values.js\");\n\n\n\n/**\n * Turn the number (in string form as either hexa- or plain decimal) coming from\n * a numeric character reference into a character.\n *\n * Sort of like `String.fromCharCode(Number.parseInt(value, base))`, but makes\n * non-characters and control characters safe.\n *\n * @param {string} value\n *   Value to decode.\n * @param {number} base\n *   Numeric base.\n * @returns {string}\n *   Character.\n */\nfunction decodeNumericCharacterReference(value, base) {\n  const code = Number.parseInt(value, base)\n\n  if (\n    // C0 except for HT, LF, FF, CR, space.\n    code < micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.ht ||\n    code === micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.vt ||\n    (code > micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.cr && code < micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.space) ||\n    // Control character (DEL) of C0, and C1 controls.\n    (code > micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_0__.codes.tilde && code < 160) ||\n    // Lone high surrogates and low surrogates.\n    (code > 55295 && code < 57344) ||\n    // Noncharacters.\n    (code > 64975 && code < 65008) ||\n    /* eslint-disable no-bitwise */\n    (code & 65535) === 65535 ||\n    (code & 65535) === 65534 ||\n    /* eslint-enable no-bitwise */\n    // Out of range\n    code > 1114111\n  ) {\n    return micromark_util_symbol_values_js__WEBPACK_IMPORTED_MODULE_1__.values.replacementCharacter\n  }\n\n  return String.fromCharCode(code)\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtZGVjb2RlLW51bWVyaWMtY2hhcmFjdGVyLXJlZmVyZW5jZS9kZXYvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQW9EO0FBQ0U7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQOztBQUVBO0FBQ0E7QUFDQSxXQUFXLGlFQUFLO0FBQ2hCLGFBQWEsaUVBQUs7QUFDbEIsWUFBWSxpRUFBSyxjQUFjLGlFQUFLO0FBQ3BDO0FBQ0EsWUFBWSxpRUFBSztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtRUFBTTtBQUNqQjs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vMjhfbm90aW9uLWNsb25lLy4vbm9kZV9tb2R1bGVzL21pY3JvbWFyay11dGlsLWRlY29kZS1udW1lcmljLWNoYXJhY3Rlci1yZWZlcmVuY2UvZGV2L2luZGV4LmpzP2Q4NDIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjb2Rlc30gZnJvbSAnbWljcm9tYXJrLXV0aWwtc3ltYm9sL2NvZGVzLmpzJ1xuaW1wb3J0IHt2YWx1ZXN9IGZyb20gJ21pY3JvbWFyay11dGlsLXN5bWJvbC92YWx1ZXMuanMnXG5cbi8qKlxuICogVHVybiB0aGUgbnVtYmVyIChpbiBzdHJpbmcgZm9ybSBhcyBlaXRoZXIgaGV4YS0gb3IgcGxhaW4gZGVjaW1hbCkgY29taW5nIGZyb21cbiAqIGEgbnVtZXJpYyBjaGFyYWN0ZXIgcmVmZXJlbmNlIGludG8gYSBjaGFyYWN0ZXIuXG4gKlxuICogU29ydCBvZiBsaWtlIGBTdHJpbmcuZnJvbUNoYXJDb2RlKE51bWJlci5wYXJzZUludCh2YWx1ZSwgYmFzZSkpYCwgYnV0IG1ha2VzXG4gKiBub24tY2hhcmFjdGVycyBhbmQgY29udHJvbCBjaGFyYWN0ZXJzIHNhZmUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiAgIFZhbHVlIHRvIGRlY29kZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiYXNlXG4gKiAgIE51bWVyaWMgYmFzZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIENoYXJhY3Rlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZU51bWVyaWNDaGFyYWN0ZXJSZWZlcmVuY2UodmFsdWUsIGJhc2UpIHtcbiAgY29uc3QgY29kZSA9IE51bWJlci5wYXJzZUludCh2YWx1ZSwgYmFzZSlcblxuICBpZiAoXG4gICAgLy8gQzAgZXhjZXB0IGZvciBIVCwgTEYsIEZGLCBDUiwgc3BhY2UuXG4gICAgY29kZSA8IGNvZGVzLmh0IHx8XG4gICAgY29kZSA9PT0gY29kZXMudnQgfHxcbiAgICAoY29kZSA+IGNvZGVzLmNyICYmIGNvZGUgPCBjb2Rlcy5zcGFjZSkgfHxcbiAgICAvLyBDb250cm9sIGNoYXJhY3RlciAoREVMKSBvZiBDMCwgYW5kIEMxIGNvbnRyb2xzLlxuICAgIChjb2RlID4gY29kZXMudGlsZGUgJiYgY29kZSA8IDE2MCkgfHxcbiAgICAvLyBMb25lIGhpZ2ggc3Vycm9nYXRlcyBhbmQgbG93IHN1cnJvZ2F0ZXMuXG4gICAgKGNvZGUgPiA1NTI5NSAmJiBjb2RlIDwgNTczNDQpIHx8XG4gICAgLy8gTm9uY2hhcmFjdGVycy5cbiAgICAoY29kZSA+IDY0OTc1ICYmIGNvZGUgPCA2NTAwOCkgfHxcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlICovXG4gICAgKGNvZGUgJiA2NTUzNSkgPT09IDY1NTM1IHx8XG4gICAgKGNvZGUgJiA2NTUzNSkgPT09IDY1NTM0IHx8XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1iaXR3aXNlICovXG4gICAgLy8gT3V0IG9mIHJhbmdlXG4gICAgY29kZSA+IDExMTQxMTFcbiAgKSB7XG4gICAgcmV0dXJuIHZhbHVlcy5yZXBsYWNlbWVudENoYXJhY3RlclxuICB9XG5cbiAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSlcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/micromark-util-decode-numeric-character-reference/dev/index.js\n");

/***/ })

};
;