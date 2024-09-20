"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/hast-util-embedded";
exports.ids = ["vendor-chunks/hast-util-embedded"];
exports.modules = {

/***/ "(ssr)/./node_modules/hast-util-embedded/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/hast-util-embedded/lib/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   embedded: () => (/* binding */ embedded)\n/* harmony export */ });\n/* harmony import */ var hast_util_is_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hast-util-is-element */ \"(ssr)/./node_modules/hast-util-is-element/index.js\");\n/**\n * @typedef {import('hast').Element} Element\n */\n\n\n\n/**\n * Check if a node is a *embedded content*.\n *\n * @type {import('hast-util-is-element').AssertPredicate<Element & {tagName: 'audio' | 'canvas' | 'embed' | 'iframe' | 'img' | 'math' | 'object' | 'picture' | 'svg' | 'video'}>}\n * @param value\n *   Thing to check (typically `Node`).\n * @returns\n *   Whether `value` is an element considered embedded content.\n *\n *   The elements `audio`, `canvas`, `embed`, `iframe`, `img`, `math`,\n *   `object`, `picture`, `svg`, and `video` are embedded content.\n */\n// @ts-expect-error Sure, the assertion matches.\nconst embedded = (0,hast_util_is_element__WEBPACK_IMPORTED_MODULE_0__.convertElement)([\n  'audio',\n  'canvas',\n  'embed',\n  'iframe',\n  'img',\n  'math',\n  'object',\n  'picture',\n  'svg',\n  'video'\n])\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzdC11dGlsLWVtYmVkZGVkL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0EsYUFBYSx3QkFBd0I7QUFDckM7O0FBRW1EOztBQUVuRDtBQUNBO0FBQ0E7QUFDQSxVQUFVLDBEQUEwRCwyR0FBMkc7QUFDL0s7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08saUJBQWlCLG9FQUFjO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8yOF9ub3Rpb24tY2xvbmUvLi9ub2RlX21vZHVsZXMvaGFzdC11dGlsLWVtYmVkZGVkL2xpYi9pbmRleC5qcz9iNzA3Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdCcpLkVsZW1lbnR9IEVsZW1lbnRcbiAqL1xuXG5pbXBvcnQge2NvbnZlcnRFbGVtZW50fSBmcm9tICdoYXN0LXV0aWwtaXMtZWxlbWVudCdcblxuLyoqXG4gKiBDaGVjayBpZiBhIG5vZGUgaXMgYSAqZW1iZWRkZWQgY29udGVudCouXG4gKlxuICogQHR5cGUge2ltcG9ydCgnaGFzdC11dGlsLWlzLWVsZW1lbnQnKS5Bc3NlcnRQcmVkaWNhdGU8RWxlbWVudCAmIHt0YWdOYW1lOiAnYXVkaW8nIHwgJ2NhbnZhcycgfCAnZW1iZWQnIHwgJ2lmcmFtZScgfCAnaW1nJyB8ICdtYXRoJyB8ICdvYmplY3QnIHwgJ3BpY3R1cmUnIHwgJ3N2ZycgfCAndmlkZW8nfT59XG4gKiBAcGFyYW0gdmFsdWVcbiAqICAgVGhpbmcgdG8gY2hlY2sgKHR5cGljYWxseSBgTm9kZWApLlxuICogQHJldHVybnNcbiAqICAgV2hldGhlciBgdmFsdWVgIGlzIGFuIGVsZW1lbnQgY29uc2lkZXJlZCBlbWJlZGRlZCBjb250ZW50LlxuICpcbiAqICAgVGhlIGVsZW1lbnRzIGBhdWRpb2AsIGBjYW52YXNgLCBgZW1iZWRgLCBgaWZyYW1lYCwgYGltZ2AsIGBtYXRoYCxcbiAqICAgYG9iamVjdGAsIGBwaWN0dXJlYCwgYHN2Z2AsIGFuZCBgdmlkZW9gIGFyZSBlbWJlZGRlZCBjb250ZW50LlxuICovXG4vLyBAdHMtZXhwZWN0LWVycm9yIFN1cmUsIHRoZSBhc3NlcnRpb24gbWF0Y2hlcy5cbmV4cG9ydCBjb25zdCBlbWJlZGRlZCA9IGNvbnZlcnRFbGVtZW50KFtcbiAgJ2F1ZGlvJyxcbiAgJ2NhbnZhcycsXG4gICdlbWJlZCcsXG4gICdpZnJhbWUnLFxuICAnaW1nJyxcbiAgJ21hdGgnLFxuICAnb2JqZWN0JyxcbiAgJ3BpY3R1cmUnLFxuICAnc3ZnJyxcbiAgJ3ZpZGVvJ1xuXSlcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/hast-util-embedded/lib/index.js\n");

/***/ })

};
;