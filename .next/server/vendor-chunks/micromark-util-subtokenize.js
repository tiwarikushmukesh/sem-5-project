"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/micromark-util-subtokenize";
exports.ids = ["vendor-chunks/micromark-util-subtokenize"];
exports.modules = {

/***/ "(ssr)/./node_modules/micromark-util-subtokenize/dev/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/micromark-util-subtokenize/dev/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   subtokenize: () => (/* binding */ subtokenize)\n/* harmony export */ });\n/* harmony import */ var micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-chunked */ \"(ssr)/./node_modules/micromark-util-chunked/dev/index.js\");\n/* harmony import */ var micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-symbol/codes.js */ \"(ssr)/./node_modules/micromark-util-symbol/codes.js\");\n/* harmony import */ var micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-symbol/types.js */ \"(ssr)/./node_modules/micromark-util-symbol/types.js\");\n/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uvu/assert */ \"(ssr)/./node_modules/uvu/assert/index.mjs\");\n/**\n * @typedef {import('micromark-util-types').Chunk} Chunk\n * @typedef {import('micromark-util-types').Event} Event\n * @typedef {import('micromark-util-types').Token} Token\n */\n\n\n\n\n\n\n/**\n * Tokenize subcontent.\n *\n * @param {Array<Event>} events\n *   List of events.\n * @returns {boolean}\n *   Whether subtokens were found.\n */\nfunction subtokenize(events) {\n  /** @type {Record<string, number>} */\n  const jumps = {}\n  let index = -1\n  /** @type {Event} */\n  let event\n  /** @type {number | undefined} */\n  let lineIndex\n  /** @type {number} */\n  let otherIndex\n  /** @type {Event} */\n  let otherEvent\n  /** @type {Array<Event>} */\n  let parameters\n  /** @type {Array<Event>} */\n  let subevents\n  /** @type {boolean | undefined} */\n  let more\n\n  while (++index < events.length) {\n    while (index in jumps) {\n      index = jumps[index]\n    }\n\n    event = events[index]\n\n    // Add a hook for the GFM tasklist extension, which needs to know if text\n    // is in the first content of a list item.\n    if (\n      index &&\n      event[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.chunkFlow &&\n      events[index - 1][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.listItemPrefix\n    ) {\n      (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(event[1]._tokenizer, 'expected `_tokenizer` on subtokens')\n      subevents = event[1]._tokenizer.events\n      otherIndex = 0\n\n      if (\n        otherIndex < subevents.length &&\n        subevents[otherIndex][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEndingBlank\n      ) {\n        otherIndex += 2\n      }\n\n      if (\n        otherIndex < subevents.length &&\n        subevents[otherIndex][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.content\n      ) {\n        while (++otherIndex < subevents.length) {\n          if (subevents[otherIndex][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.content) {\n            break\n          }\n\n          if (subevents[otherIndex][1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.chunkText) {\n            subevents[otherIndex][1]._isInFirstContentOfListItem = true\n            otherIndex++\n          }\n        }\n      }\n    }\n\n    // Enter.\n    if (event[0] === 'enter') {\n      if (event[1].contentType) {\n        Object.assign(jumps, subcontent(events, index))\n        index = jumps[index]\n        more = true\n      }\n    }\n    // Exit.\n    else if (event[1]._container) {\n      otherIndex = index\n      lineIndex = undefined\n\n      while (otherIndex--) {\n        otherEvent = events[otherIndex]\n\n        if (\n          otherEvent[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding ||\n          otherEvent[1].type === micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEndingBlank\n        ) {\n          if (otherEvent[0] === 'enter') {\n            if (lineIndex) {\n              events[lineIndex][1].type = micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEndingBlank\n            }\n\n            otherEvent[1].type = micromark_util_symbol_types_js__WEBPACK_IMPORTED_MODULE_1__.types.lineEnding\n            lineIndex = otherIndex\n          }\n        } else {\n          break\n        }\n      }\n\n      if (lineIndex) {\n        // Fix position.\n        event[1].end = Object.assign({}, events[lineIndex][1].start)\n\n        // Switch container exit w/ line endings.\n        parameters = events.slice(lineIndex, index)\n        parameters.unshift(event)\n        ;(0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.splice)(events, lineIndex, index - lineIndex + 1, parameters)\n      }\n    }\n  }\n\n  return !more\n}\n\n/**\n * Tokenize embedded tokens.\n *\n * @param {Array<Event>} events\n * @param {number} eventIndex\n * @returns {Record<string, number>}\n */\nfunction subcontent(events, eventIndex) {\n  const token = events[eventIndex][1]\n  const context = events[eventIndex][2]\n  let startPosition = eventIndex - 1\n  /** @type {Array<number>} */\n  const startPositions = []\n  ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(token.contentType, 'expected `contentType` on subtokens')\n  const tokenizer =\n    token._tokenizer || context.parser[token.contentType](token.start)\n  const childEvents = tokenizer.events\n  /** @type {Array<[number, number]>} */\n  const jumps = []\n  /** @type {Record<string, number>} */\n  const gaps = {}\n  /** @type {Array<Chunk>} */\n  let stream\n  /** @type {Token | undefined} */\n  let previous\n  let index = -1\n  /** @type {Token | undefined} */\n  let current = token\n  let adjust = 0\n  let start = 0\n  const breaks = [start]\n\n  // Loop forward through the linked tokens to pass them in order to the\n  // subtokenizer.\n  while (current) {\n    // Find the position of the event for this token.\n    while (events[++startPosition][1] !== current) {\n      // Empty.\n    }\n\n    (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(\n      !previous || current.previous === previous,\n      'expected previous to match'\n    )\n    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(!previous || previous.next === current, 'expected next to match')\n\n    startPositions.push(startPosition)\n\n    if (!current._tokenizer) {\n      stream = context.sliceStream(current)\n\n      if (!current.next) {\n        stream.push(micromark_util_symbol_codes_js__WEBPACK_IMPORTED_MODULE_3__.codes.eof)\n      }\n\n      if (previous) {\n        tokenizer.defineSkip(current.start)\n      }\n\n      if (current._isInFirstContentOfListItem) {\n        tokenizer._gfmTasklistFirstContentOfListItem = true\n      }\n\n      tokenizer.write(stream)\n\n      if (current._isInFirstContentOfListItem) {\n        tokenizer._gfmTasklistFirstContentOfListItem = undefined\n      }\n    }\n\n    // Unravel the next token.\n    previous = current\n    current = current.next\n  }\n\n  // Now, loop back through all events (and linked tokens), to figure out which\n  // parts belong where.\n  current = token\n\n  while (++index < childEvents.length) {\n    if (\n      // Find a void token that includes a break.\n      childEvents[index][0] === 'exit' &&\n      childEvents[index - 1][0] === 'enter' &&\n      childEvents[index][1].type === childEvents[index - 1][1].type &&\n      childEvents[index][1].start.line !== childEvents[index][1].end.line\n    ) {\n      (0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(current, 'expected a current token')\n      start = index + 1\n      breaks.push(start)\n      // Help GC.\n      current._tokenizer = undefined\n      current.previous = undefined\n      current = current.next\n    }\n  }\n\n  // Help GC.\n  tokenizer.events = []\n\n  // If there’s one more token (which is the cases for lines that end in an\n  // EOF), that’s perfect: the last point we found starts it.\n  // If there isn’t then make sure any remaining content is added to it.\n  if (current) {\n    // Help GC.\n    current._tokenizer = undefined\n    current.previous = undefined\n    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(!current.next, 'expected no next token')\n  } else {\n    breaks.pop()\n  }\n\n  // Now splice the events from the subtokenizer into the current events,\n  // moving back to front so that splice indices aren’t affected.\n  index = breaks.length\n\n  while (index--) {\n    const slice = childEvents.slice(breaks[index], breaks[index + 1])\n    const start = startPositions.pop()\n    ;(0,uvu_assert__WEBPACK_IMPORTED_MODULE_0__.ok)(start !== undefined, 'expected a start position when splicing')\n    jumps.unshift([start, start + slice.length - 1])\n    ;(0,micromark_util_chunked__WEBPACK_IMPORTED_MODULE_2__.splice)(events, start, 2, slice)\n  }\n\n  index = -1\n\n  while (++index < jumps.length) {\n    gaps[adjust + jumps[index][0]] = adjust + jumps[index][1]\n    adjust += jumps[index][1] - jumps[index][0] - 1\n  }\n\n  return gaps\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtc3VidG9rZW5pemUvZGV2L2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxhQUFhLHNDQUFzQztBQUNuRCxhQUFhLHNDQUFzQztBQUNuRCxhQUFhLHNDQUFzQztBQUNuRDs7QUFFNkM7QUFDTztBQUNBO0FBQ2I7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ087QUFDUCxhQUFhLHdCQUF3QjtBQUNyQztBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EsYUFBYSxvQkFBb0I7QUFDakM7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQSxhQUFhLGNBQWM7QUFDM0I7QUFDQSxhQUFhLGNBQWM7QUFDM0I7QUFDQSxhQUFhLHFCQUFxQjtBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpRUFBSztBQUM3QixvQ0FBb0MsaUVBQUs7QUFDekM7QUFDQSxNQUFNLDhDQUFNO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLGlFQUFLO0FBQy9DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLGlFQUFLO0FBQy9DO0FBQ0E7QUFDQSxnREFBZ0QsaUVBQUs7QUFDckQ7QUFDQTs7QUFFQSxnREFBZ0QsaUVBQUs7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDLGlFQUFLO0FBQ3RDLGlDQUFpQyxpRUFBSztBQUN0QztBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsaUVBQUs7QUFDL0M7O0FBRUEsaUNBQWlDLGlFQUFLO0FBQ3RDO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0RBQU07QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCO0FBQ0EsRUFBRSwrQ0FBTTtBQUNSO0FBQ0E7QUFDQTtBQUNBLGFBQWEseUJBQXlCO0FBQ3RDO0FBQ0EsYUFBYSx3QkFBd0I7QUFDckM7QUFDQSxhQUFhLGNBQWM7QUFDM0I7QUFDQSxhQUFhLG1CQUFtQjtBQUNoQztBQUNBO0FBQ0EsYUFBYSxtQkFBbUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSw4Q0FBTTtBQUNWO0FBQ0E7QUFDQTtBQUNBLElBQUksK0NBQU07O0FBRVY7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixpRUFBSztBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSw4Q0FBTTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksK0NBQU07QUFDVixJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSwrQ0FBTTtBQUNWO0FBQ0EsSUFBSSwrREFBTTtBQUNWOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8yOF9ub3Rpb24tY2xvbmUvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtc3VidG9rZW5pemUvZGV2L2luZGV4LmpzPzRmY2UiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtaWNyb21hcmstdXRpbC10eXBlcycpLkNodW5rfSBDaHVua1xuICogQHR5cGVkZWYge2ltcG9ydCgnbWljcm9tYXJrLXV0aWwtdHlwZXMnKS5FdmVudH0gRXZlbnRcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21pY3JvbWFyay11dGlsLXR5cGVzJykuVG9rZW59IFRva2VuXG4gKi9cblxuaW1wb3J0IHtzcGxpY2V9IGZyb20gJ21pY3JvbWFyay11dGlsLWNodW5rZWQnXG5pbXBvcnQge2NvZGVzfSBmcm9tICdtaWNyb21hcmstdXRpbC1zeW1ib2wvY29kZXMuanMnXG5pbXBvcnQge3R5cGVzfSBmcm9tICdtaWNyb21hcmstdXRpbC1zeW1ib2wvdHlwZXMuanMnXG5pbXBvcnQge29rIGFzIGFzc2VydH0gZnJvbSAndXZ1L2Fzc2VydCdcblxuLyoqXG4gKiBUb2tlbml6ZSBzdWJjb250ZW50LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8RXZlbnQ+fSBldmVudHNcbiAqICAgTGlzdCBvZiBldmVudHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqICAgV2hldGhlciBzdWJ0b2tlbnMgd2VyZSBmb3VuZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1YnRva2VuaXplKGV2ZW50cykge1xuICAvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIG51bWJlcj59ICovXG4gIGNvbnN0IGp1bXBzID0ge31cbiAgbGV0IGluZGV4ID0gLTFcbiAgLyoqIEB0eXBlIHtFdmVudH0gKi9cbiAgbGV0IGV2ZW50XG4gIC8qKiBAdHlwZSB7bnVtYmVyIHwgdW5kZWZpbmVkfSAqL1xuICBsZXQgbGluZUluZGV4XG4gIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICBsZXQgb3RoZXJJbmRleFxuICAvKiogQHR5cGUge0V2ZW50fSAqL1xuICBsZXQgb3RoZXJFdmVudFxuICAvKiogQHR5cGUge0FycmF5PEV2ZW50Pn0gKi9cbiAgbGV0IHBhcmFtZXRlcnNcbiAgLyoqIEB0eXBlIHtBcnJheTxFdmVudD59ICovXG4gIGxldCBzdWJldmVudHNcbiAgLyoqIEB0eXBlIHtib29sZWFuIHwgdW5kZWZpbmVkfSAqL1xuICBsZXQgbW9yZVxuXG4gIHdoaWxlICgrK2luZGV4IDwgZXZlbnRzLmxlbmd0aCkge1xuICAgIHdoaWxlIChpbmRleCBpbiBqdW1wcykge1xuICAgICAgaW5kZXggPSBqdW1wc1tpbmRleF1cbiAgICB9XG5cbiAgICBldmVudCA9IGV2ZW50c1tpbmRleF1cblxuICAgIC8vIEFkZCBhIGhvb2sgZm9yIHRoZSBHRk0gdGFza2xpc3QgZXh0ZW5zaW9uLCB3aGljaCBuZWVkcyB0byBrbm93IGlmIHRleHRcbiAgICAvLyBpcyBpbiB0aGUgZmlyc3QgY29udGVudCBvZiBhIGxpc3QgaXRlbS5cbiAgICBpZiAoXG4gICAgICBpbmRleCAmJlxuICAgICAgZXZlbnRbMV0udHlwZSA9PT0gdHlwZXMuY2h1bmtGbG93ICYmXG4gICAgICBldmVudHNbaW5kZXggLSAxXVsxXS50eXBlID09PSB0eXBlcy5saXN0SXRlbVByZWZpeFxuICAgICkge1xuICAgICAgYXNzZXJ0KGV2ZW50WzFdLl90b2tlbml6ZXIsICdleHBlY3RlZCBgX3Rva2VuaXplcmAgb24gc3VidG9rZW5zJylcbiAgICAgIHN1YmV2ZW50cyA9IGV2ZW50WzFdLl90b2tlbml6ZXIuZXZlbnRzXG4gICAgICBvdGhlckluZGV4ID0gMFxuXG4gICAgICBpZiAoXG4gICAgICAgIG90aGVySW5kZXggPCBzdWJldmVudHMubGVuZ3RoICYmXG4gICAgICAgIHN1YmV2ZW50c1tvdGhlckluZGV4XVsxXS50eXBlID09PSB0eXBlcy5saW5lRW5kaW5nQmxhbmtcbiAgICAgICkge1xuICAgICAgICBvdGhlckluZGV4ICs9IDJcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBvdGhlckluZGV4IDwgc3ViZXZlbnRzLmxlbmd0aCAmJlxuICAgICAgICBzdWJldmVudHNbb3RoZXJJbmRleF1bMV0udHlwZSA9PT0gdHlwZXMuY29udGVudFxuICAgICAgKSB7XG4gICAgICAgIHdoaWxlICgrK290aGVySW5kZXggPCBzdWJldmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKHN1YmV2ZW50c1tvdGhlckluZGV4XVsxXS50eXBlID09PSB0eXBlcy5jb250ZW50KSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzdWJldmVudHNbb3RoZXJJbmRleF1bMV0udHlwZSA9PT0gdHlwZXMuY2h1bmtUZXh0KSB7XG4gICAgICAgICAgICBzdWJldmVudHNbb3RoZXJJbmRleF1bMV0uX2lzSW5GaXJzdENvbnRlbnRPZkxpc3RJdGVtID0gdHJ1ZVxuICAgICAgICAgICAgb3RoZXJJbmRleCsrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRW50ZXIuXG4gICAgaWYgKGV2ZW50WzBdID09PSAnZW50ZXInKSB7XG4gICAgICBpZiAoZXZlbnRbMV0uY29udGVudFR5cGUpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihqdW1wcywgc3ViY29udGVudChldmVudHMsIGluZGV4KSlcbiAgICAgICAgaW5kZXggPSBqdW1wc1tpbmRleF1cbiAgICAgICAgbW9yZSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gRXhpdC5cbiAgICBlbHNlIGlmIChldmVudFsxXS5fY29udGFpbmVyKSB7XG4gICAgICBvdGhlckluZGV4ID0gaW5kZXhcbiAgICAgIGxpbmVJbmRleCA9IHVuZGVmaW5lZFxuXG4gICAgICB3aGlsZSAob3RoZXJJbmRleC0tKSB7XG4gICAgICAgIG90aGVyRXZlbnQgPSBldmVudHNbb3RoZXJJbmRleF1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgb3RoZXJFdmVudFsxXS50eXBlID09PSB0eXBlcy5saW5lRW5kaW5nIHx8XG4gICAgICAgICAgb3RoZXJFdmVudFsxXS50eXBlID09PSB0eXBlcy5saW5lRW5kaW5nQmxhbmtcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKG90aGVyRXZlbnRbMF0gPT09ICdlbnRlcicpIHtcbiAgICAgICAgICAgIGlmIChsaW5lSW5kZXgpIHtcbiAgICAgICAgICAgICAgZXZlbnRzW2xpbmVJbmRleF1bMV0udHlwZSA9IHR5cGVzLmxpbmVFbmRpbmdCbGFua1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvdGhlckV2ZW50WzFdLnR5cGUgPSB0eXBlcy5saW5lRW5kaW5nXG4gICAgICAgICAgICBsaW5lSW5kZXggPSBvdGhlckluZGV4XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGxpbmVJbmRleCkge1xuICAgICAgICAvLyBGaXggcG9zaXRpb24uXG4gICAgICAgIGV2ZW50WzFdLmVuZCA9IE9iamVjdC5hc3NpZ24oe30sIGV2ZW50c1tsaW5lSW5kZXhdWzFdLnN0YXJ0KVxuXG4gICAgICAgIC8vIFN3aXRjaCBjb250YWluZXIgZXhpdCB3LyBsaW5lIGVuZGluZ3MuXG4gICAgICAgIHBhcmFtZXRlcnMgPSBldmVudHMuc2xpY2UobGluZUluZGV4LCBpbmRleClcbiAgICAgICAgcGFyYW1ldGVycy51bnNoaWZ0KGV2ZW50KVxuICAgICAgICBzcGxpY2UoZXZlbnRzLCBsaW5lSW5kZXgsIGluZGV4IC0gbGluZUluZGV4ICsgMSwgcGFyYW1ldGVycylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gIW1vcmVcbn1cblxuLyoqXG4gKiBUb2tlbml6ZSBlbWJlZGRlZCB0b2tlbnMuXG4gKlxuICogQHBhcmFtIHtBcnJheTxFdmVudD59IGV2ZW50c1xuICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50SW5kZXhcbiAqIEByZXR1cm5zIHtSZWNvcmQ8c3RyaW5nLCBudW1iZXI+fVxuICovXG5mdW5jdGlvbiBzdWJjb250ZW50KGV2ZW50cywgZXZlbnRJbmRleCkge1xuICBjb25zdCB0b2tlbiA9IGV2ZW50c1tldmVudEluZGV4XVsxXVxuICBjb25zdCBjb250ZXh0ID0gZXZlbnRzW2V2ZW50SW5kZXhdWzJdXG4gIGxldCBzdGFydFBvc2l0aW9uID0gZXZlbnRJbmRleCAtIDFcbiAgLyoqIEB0eXBlIHtBcnJheTxudW1iZXI+fSAqL1xuICBjb25zdCBzdGFydFBvc2l0aW9ucyA9IFtdXG4gIGFzc2VydCh0b2tlbi5jb250ZW50VHlwZSwgJ2V4cGVjdGVkIGBjb250ZW50VHlwZWAgb24gc3VidG9rZW5zJylcbiAgY29uc3QgdG9rZW5pemVyID1cbiAgICB0b2tlbi5fdG9rZW5pemVyIHx8IGNvbnRleHQucGFyc2VyW3Rva2VuLmNvbnRlbnRUeXBlXSh0b2tlbi5zdGFydClcbiAgY29uc3QgY2hpbGRFdmVudHMgPSB0b2tlbml6ZXIuZXZlbnRzXG4gIC8qKiBAdHlwZSB7QXJyYXk8W251bWJlciwgbnVtYmVyXT59ICovXG4gIGNvbnN0IGp1bXBzID0gW11cbiAgLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBudW1iZXI+fSAqL1xuICBjb25zdCBnYXBzID0ge31cbiAgLyoqIEB0eXBlIHtBcnJheTxDaHVuaz59ICovXG4gIGxldCBzdHJlYW1cbiAgLyoqIEB0eXBlIHtUb2tlbiB8IHVuZGVmaW5lZH0gKi9cbiAgbGV0IHByZXZpb3VzXG4gIGxldCBpbmRleCA9IC0xXG4gIC8qKiBAdHlwZSB7VG9rZW4gfCB1bmRlZmluZWR9ICovXG4gIGxldCBjdXJyZW50ID0gdG9rZW5cbiAgbGV0IGFkanVzdCA9IDBcbiAgbGV0IHN0YXJ0ID0gMFxuICBjb25zdCBicmVha3MgPSBbc3RhcnRdXG5cbiAgLy8gTG9vcCBmb3J3YXJkIHRocm91Z2ggdGhlIGxpbmtlZCB0b2tlbnMgdG8gcGFzcyB0aGVtIGluIG9yZGVyIHRvIHRoZVxuICAvLyBzdWJ0b2tlbml6ZXIuXG4gIHdoaWxlIChjdXJyZW50KSB7XG4gICAgLy8gRmluZCB0aGUgcG9zaXRpb24gb2YgdGhlIGV2ZW50IGZvciB0aGlzIHRva2VuLlxuICAgIHdoaWxlIChldmVudHNbKytzdGFydFBvc2l0aW9uXVsxXSAhPT0gY3VycmVudCkge1xuICAgICAgLy8gRW1wdHkuXG4gICAgfVxuXG4gICAgYXNzZXJ0KFxuICAgICAgIXByZXZpb3VzIHx8IGN1cnJlbnQucHJldmlvdXMgPT09IHByZXZpb3VzLFxuICAgICAgJ2V4cGVjdGVkIHByZXZpb3VzIHRvIG1hdGNoJ1xuICAgIClcbiAgICBhc3NlcnQoIXByZXZpb3VzIHx8IHByZXZpb3VzLm5leHQgPT09IGN1cnJlbnQsICdleHBlY3RlZCBuZXh0IHRvIG1hdGNoJylcblxuICAgIHN0YXJ0UG9zaXRpb25zLnB1c2goc3RhcnRQb3NpdGlvbilcblxuICAgIGlmICghY3VycmVudC5fdG9rZW5pemVyKSB7XG4gICAgICBzdHJlYW0gPSBjb250ZXh0LnNsaWNlU3RyZWFtKGN1cnJlbnQpXG5cbiAgICAgIGlmICghY3VycmVudC5uZXh0KSB7XG4gICAgICAgIHN0cmVhbS5wdXNoKGNvZGVzLmVvZilcbiAgICAgIH1cblxuICAgICAgaWYgKHByZXZpb3VzKSB7XG4gICAgICAgIHRva2VuaXplci5kZWZpbmVTa2lwKGN1cnJlbnQuc3RhcnQpXG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50Ll9pc0luRmlyc3RDb250ZW50T2ZMaXN0SXRlbSkge1xuICAgICAgICB0b2tlbml6ZXIuX2dmbVRhc2tsaXN0Rmlyc3RDb250ZW50T2ZMaXN0SXRlbSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgdG9rZW5pemVyLndyaXRlKHN0cmVhbSlcblxuICAgICAgaWYgKGN1cnJlbnQuX2lzSW5GaXJzdENvbnRlbnRPZkxpc3RJdGVtKSB7XG4gICAgICAgIHRva2VuaXplci5fZ2ZtVGFza2xpc3RGaXJzdENvbnRlbnRPZkxpc3RJdGVtID0gdW5kZWZpbmVkXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVW5yYXZlbCB0aGUgbmV4dCB0b2tlbi5cbiAgICBwcmV2aW91cyA9IGN1cnJlbnRcbiAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0XG4gIH1cblxuICAvLyBOb3csIGxvb3AgYmFjayB0aHJvdWdoIGFsbCBldmVudHMgKGFuZCBsaW5rZWQgdG9rZW5zKSwgdG8gZmlndXJlIG91dCB3aGljaFxuICAvLyBwYXJ0cyBiZWxvbmcgd2hlcmUuXG4gIGN1cnJlbnQgPSB0b2tlblxuXG4gIHdoaWxlICgrK2luZGV4IDwgY2hpbGRFdmVudHMubGVuZ3RoKSB7XG4gICAgaWYgKFxuICAgICAgLy8gRmluZCBhIHZvaWQgdG9rZW4gdGhhdCBpbmNsdWRlcyBhIGJyZWFrLlxuICAgICAgY2hpbGRFdmVudHNbaW5kZXhdWzBdID09PSAnZXhpdCcgJiZcbiAgICAgIGNoaWxkRXZlbnRzW2luZGV4IC0gMV1bMF0gPT09ICdlbnRlcicgJiZcbiAgICAgIGNoaWxkRXZlbnRzW2luZGV4XVsxXS50eXBlID09PSBjaGlsZEV2ZW50c1tpbmRleCAtIDFdWzFdLnR5cGUgJiZcbiAgICAgIGNoaWxkRXZlbnRzW2luZGV4XVsxXS5zdGFydC5saW5lICE9PSBjaGlsZEV2ZW50c1tpbmRleF1bMV0uZW5kLmxpbmVcbiAgICApIHtcbiAgICAgIGFzc2VydChjdXJyZW50LCAnZXhwZWN0ZWQgYSBjdXJyZW50IHRva2VuJylcbiAgICAgIHN0YXJ0ID0gaW5kZXggKyAxXG4gICAgICBicmVha3MucHVzaChzdGFydClcbiAgICAgIC8vIEhlbHAgR0MuXG4gICAgICBjdXJyZW50Ll90b2tlbml6ZXIgPSB1bmRlZmluZWRcbiAgICAgIGN1cnJlbnQucHJldmlvdXMgPSB1bmRlZmluZWRcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRcbiAgICB9XG4gIH1cblxuICAvLyBIZWxwIEdDLlxuICB0b2tlbml6ZXIuZXZlbnRzID0gW11cblxuICAvLyBJZiB0aGVyZeKAmXMgb25lIG1vcmUgdG9rZW4gKHdoaWNoIGlzIHRoZSBjYXNlcyBmb3IgbGluZXMgdGhhdCBlbmQgaW4gYW5cbiAgLy8gRU9GKSwgdGhhdOKAmXMgcGVyZmVjdDogdGhlIGxhc3QgcG9pbnQgd2UgZm91bmQgc3RhcnRzIGl0LlxuICAvLyBJZiB0aGVyZSBpc27igJl0IHRoZW4gbWFrZSBzdXJlIGFueSByZW1haW5pbmcgY29udGVudCBpcyBhZGRlZCB0byBpdC5cbiAgaWYgKGN1cnJlbnQpIHtcbiAgICAvLyBIZWxwIEdDLlxuICAgIGN1cnJlbnQuX3Rva2VuaXplciA9IHVuZGVmaW5lZFxuICAgIGN1cnJlbnQucHJldmlvdXMgPSB1bmRlZmluZWRcbiAgICBhc3NlcnQoIWN1cnJlbnQubmV4dCwgJ2V4cGVjdGVkIG5vIG5leHQgdG9rZW4nKVxuICB9IGVsc2Uge1xuICAgIGJyZWFrcy5wb3AoKVxuICB9XG5cbiAgLy8gTm93IHNwbGljZSB0aGUgZXZlbnRzIGZyb20gdGhlIHN1YnRva2VuaXplciBpbnRvIHRoZSBjdXJyZW50IGV2ZW50cyxcbiAgLy8gbW92aW5nIGJhY2sgdG8gZnJvbnQgc28gdGhhdCBzcGxpY2UgaW5kaWNlcyBhcmVu4oCZdCBhZmZlY3RlZC5cbiAgaW5kZXggPSBicmVha3MubGVuZ3RoXG5cbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICBjb25zdCBzbGljZSA9IGNoaWxkRXZlbnRzLnNsaWNlKGJyZWFrc1tpbmRleF0sIGJyZWFrc1tpbmRleCArIDFdKVxuICAgIGNvbnN0IHN0YXJ0ID0gc3RhcnRQb3NpdGlvbnMucG9wKClcbiAgICBhc3NlcnQoc3RhcnQgIT09IHVuZGVmaW5lZCwgJ2V4cGVjdGVkIGEgc3RhcnQgcG9zaXRpb24gd2hlbiBzcGxpY2luZycpXG4gICAganVtcHMudW5zaGlmdChbc3RhcnQsIHN0YXJ0ICsgc2xpY2UubGVuZ3RoIC0gMV0pXG4gICAgc3BsaWNlKGV2ZW50cywgc3RhcnQsIDIsIHNsaWNlKVxuICB9XG5cbiAgaW5kZXggPSAtMVxuXG4gIHdoaWxlICgrK2luZGV4IDwganVtcHMubGVuZ3RoKSB7XG4gICAgZ2Fwc1thZGp1c3QgKyBqdW1wc1tpbmRleF1bMF1dID0gYWRqdXN0ICsganVtcHNbaW5kZXhdWzFdXG4gICAgYWRqdXN0ICs9IGp1bXBzW2luZGV4XVsxXSAtIGp1bXBzW2luZGV4XVswXSAtIDFcbiAgfVxuXG4gIHJldHVybiBnYXBzXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/micromark-util-subtokenize/dev/index.js\n");

/***/ })

};
;