"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/trim-trailing-lines";
exports.ids = ["vendor-chunks/trim-trailing-lines"];
exports.modules = {

/***/ "(ssr)/./node_modules/trim-trailing-lines/index.js":
/*!***************************************************!*\
  !*** ./node_modules/trim-trailing-lines/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   trimTrailingLines: () => (/* binding */ trimTrailingLines)\n/* harmony export */ });\n/**\n * Remove final line endings from `value`\n *\n * @param {unknown} value\n *   Value with trailing line endings, coerced to string.\n * @return {string}\n *   Value without trailing line endings.\n */\nfunction trimTrailingLines(value) {\n  const input = String(value)\n  let end = input.length\n\n  while (end > 0) {\n    const code = input.codePointAt(end - 1)\n    if (code !== undefined && (code === 10 || code === 13)) {\n      end--\n    } else {\n      break\n    }\n  }\n\n  return input.slice(0, end)\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdHJpbS10cmFpbGluZy1saW5lcy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8yOF9ub3Rpb24tY2xvbmUvLi9ub2RlX21vZHVsZXMvdHJpbS10cmFpbGluZy1saW5lcy9pbmRleC5qcz8wNTliIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVtb3ZlIGZpbmFsIGxpbmUgZW5kaW5ncyBmcm9tIGB2YWx1ZWBcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IHZhbHVlXG4gKiAgIFZhbHVlIHdpdGggdHJhaWxpbmcgbGluZSBlbmRpbmdzLCBjb2VyY2VkIHRvIHN0cmluZy5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqICAgVmFsdWUgd2l0aG91dCB0cmFpbGluZyBsaW5lIGVuZGluZ3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmltVHJhaWxpbmdMaW5lcyh2YWx1ZSkge1xuICBjb25zdCBpbnB1dCA9IFN0cmluZyh2YWx1ZSlcbiAgbGV0IGVuZCA9IGlucHV0Lmxlbmd0aFxuXG4gIHdoaWxlIChlbmQgPiAwKSB7XG4gICAgY29uc3QgY29kZSA9IGlucHV0LmNvZGVQb2ludEF0KGVuZCAtIDEpXG4gICAgaWYgKGNvZGUgIT09IHVuZGVmaW5lZCAmJiAoY29kZSA9PT0gMTAgfHwgY29kZSA9PT0gMTMpKSB7XG4gICAgICBlbmQtLVxuICAgIH0gZWxzZSB7XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpbnB1dC5zbGljZSgwLCBlbmQpXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/trim-trailing-lines/index.js\n");

/***/ })

};
;