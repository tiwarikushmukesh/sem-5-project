"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/use-latest";
exports.ids = ["vendor-chunks/use-latest"];
exports.modules = {

/***/ "(ssr)/./node_modules/use-latest/dist/use-latest.cjs.dev.js":
/*!************************************************************!*\
  !*** ./node_modules/use-latest/dist/use-latest.cjs.dev.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n\nvar React = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\nvar useIsomorphicLayoutEffect = __webpack_require__(/*! use-isomorphic-layout-effect */ \"(ssr)/./node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.cjs.js\");\n\nfunction _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }\n\nfunction _interopNamespace(e) {\n  if (e && e.__esModule) return e;\n  var n = Object.create(null);\n  if (e) {\n    Object.keys(e).forEach(function (k) {\n      if (k !== 'default') {\n        var d = Object.getOwnPropertyDescriptor(e, k);\n        Object.defineProperty(n, k, d.get ? d : {\n          enumerable: true,\n          get: function () { return e[k]; }\n        });\n      }\n    });\n  }\n  n[\"default\"] = e;\n  return Object.freeze(n);\n}\n\nvar React__namespace = /*#__PURE__*/_interopNamespace(React);\nvar useIsomorphicLayoutEffect__default = /*#__PURE__*/_interopDefault(useIsomorphicLayoutEffect);\n\nvar useLatest = function useLatest(value) {\n  var ref = React__namespace.useRef(value);\n  useIsomorphicLayoutEffect__default[\"default\"](function () {\n    ref.current = value;\n  });\n  return ref;\n};\n\nexports[\"default\"] = useLatest;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLWxhdGVzdC9kaXN0L3VzZS1sYXRlc3QuY2pzLmRldi5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7O0FBRTdELFlBQVksbUJBQU8sQ0FBQyx3R0FBTztBQUMzQixnQ0FBZ0MsbUJBQU8sQ0FBQyxnSUFBOEI7O0FBRXRFLCtCQUErQixpQ0FBaUM7O0FBRWhFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBLGtCQUFrQiIsInNvdXJjZXMiOlsid2VicGFjazovLzI4X25vdGlvbi1jbG9uZS8uL25vZGVfbW9kdWxlcy91c2UtbGF0ZXN0L2Rpc3QvdXNlLWxhdGVzdC5janMuZGV2LmpzPzdmYzkiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIHVzZUlzb21vcnBoaWNMYXlvdXRFZmZlY3QgPSByZXF1aXJlKCd1c2UtaXNvbW9ycGhpYy1sYXlvdXQtZWZmZWN0Jyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wRGVmYXVsdCAoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyAnZGVmYXVsdCc6IGUgfTsgfVxuXG5mdW5jdGlvbiBfaW50ZXJvcE5hbWVzcGFjZShlKSB7XG4gIGlmIChlICYmIGUuX19lc01vZHVsZSkgcmV0dXJuIGU7XG4gIHZhciBuID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgaWYgKGUpIHtcbiAgICBPYmplY3Qua2V5cyhlKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICBpZiAoayAhPT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgIHZhciBkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLCBrKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG4sIGssIGQuZ2V0ID8gZCA6IHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZVtrXTsgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBuW1wiZGVmYXVsdFwiXSA9IGU7XG4gIHJldHVybiBPYmplY3QuZnJlZXplKG4pO1xufVxuXG52YXIgUmVhY3RfX25hbWVzcGFjZSA9IC8qI19fUFVSRV9fKi9faW50ZXJvcE5hbWVzcGFjZShSZWFjdCk7XG52YXIgdXNlSXNvbW9ycGhpY0xheW91dEVmZmVjdF9fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9faW50ZXJvcERlZmF1bHQodXNlSXNvbW9ycGhpY0xheW91dEVmZmVjdCk7XG5cbnZhciB1c2VMYXRlc3QgPSBmdW5jdGlvbiB1c2VMYXRlc3QodmFsdWUpIHtcbiAgdmFyIHJlZiA9IFJlYWN0X19uYW1lc3BhY2UudXNlUmVmKHZhbHVlKTtcbiAgdXNlSXNvbW9ycGhpY0xheW91dEVmZmVjdF9fZGVmYXVsdFtcImRlZmF1bHRcIl0oZnVuY3Rpb24gKCkge1xuICAgIHJlZi5jdXJyZW50ID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVmO1xufTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB1c2VMYXRlc3Q7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-latest/dist/use-latest.cjs.dev.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/use-latest/dist/use-latest.cjs.js":
/*!********************************************************!*\
  !*** ./node_modules/use-latest/dist/use-latest.cjs.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./use-latest.cjs.dev.js */ \"(ssr)/./node_modules/use-latest/dist/use-latest.cjs.dev.js\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLWxhdGVzdC9kaXN0L3VzZS1sYXRlc3QuY2pzLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLElBQUksS0FBcUMsRUFBRSxFQUUxQyxDQUFDO0FBQ0YsRUFBRSxpSUFBbUQ7QUFDckQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8yOF9ub3Rpb24tY2xvbmUvLi9ub2RlX21vZHVsZXMvdXNlLWxhdGVzdC9kaXN0L3VzZS1sYXRlc3QuY2pzLmpzPzc0N2UiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vdXNlLWxhdGVzdC5janMucHJvZC5qc1wiKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vdXNlLWxhdGVzdC5janMuZGV2LmpzXCIpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-latest/dist/use-latest.cjs.js\n");

/***/ })

};
;