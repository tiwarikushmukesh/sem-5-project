"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/y-protocols";
exports.ids = ["vendor-chunks/y-protocols"];
exports.modules = {

/***/ "(ssr)/./node_modules/y-protocols/awareness.js":
/*!***********************************************!*\
  !*** ./node_modules/y-protocols/awareness.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Awareness: () => (/* binding */ Awareness),\n/* harmony export */   applyAwarenessUpdate: () => (/* binding */ applyAwarenessUpdate),\n/* harmony export */   encodeAwarenessUpdate: () => (/* binding */ encodeAwarenessUpdate),\n/* harmony export */   modifyAwarenessUpdate: () => (/* binding */ modifyAwarenessUpdate),\n/* harmony export */   outdatedTimeout: () => (/* binding */ outdatedTimeout),\n/* harmony export */   removeAwarenessStates: () => (/* binding */ removeAwarenessStates)\n/* harmony export */ });\n/* harmony import */ var lib0_encoding__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lib0/encoding */ \"(ssr)/./node_modules/lib0/encoding.js\");\n/* harmony import */ var lib0_decoding__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lib0/decoding */ \"(ssr)/./node_modules/lib0/decoding.js\");\n/* harmony import */ var lib0_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lib0/time */ \"(ssr)/./node_modules/lib0/time.js\");\n/* harmony import */ var lib0_math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lib0/math */ \"(ssr)/./node_modules/lib0/math.js\");\n/* harmony import */ var lib0_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lib0/observable */ \"(ssr)/./node_modules/lib0/observable.js\");\n/* harmony import */ var lib0_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lib0/function */ \"(ssr)/./node_modules/lib0/function.js\");\n/**\n * @module awareness-protocol\n */\n\n\n\n\n\n\n\n // eslint-disable-line\n\nconst outdatedTimeout = 30000\n\n/**\n * @typedef {Object} MetaClientState\n * @property {number} MetaClientState.clock\n * @property {number} MetaClientState.lastUpdated unix timestamp\n */\n\n/**\n * The Awareness class implements a simple shared state protocol that can be used for non-persistent data like awareness information\n * (cursor, username, status, ..). Each client can update its own local state and listen to state changes of\n * remote clients. Every client may set a state of a remote peer to `null` to mark the client as offline.\n *\n * Each client is identified by a unique client id (something we borrow from `doc.clientID`). A client can override\n * its own state by propagating a message with an increasing timestamp (`clock`). If such a message is received, it is\n * applied if the known state of that client is older than the new state (`clock < newClock`). If a client thinks that\n * a remote client is offline, it may propagate a message with\n * `{ clock: currentClientClock, state: null, client: remoteClient }`. If such a\n * message is received, and the known clock of that client equals the received clock, it will override the state with `null`.\n *\n * Before a client disconnects, it should propagate a `null` state with an updated clock.\n *\n * Awareness states must be updated every 30 seconds. Otherwise the Awareness instance will delete the client state.\n *\n * @extends {Observable<string>}\n */\nclass Awareness extends lib0_observable__WEBPACK_IMPORTED_MODULE_0__.Observable {\n  /**\n   * @param {Y.Doc} doc\n   */\n  constructor (doc) {\n    super()\n    this.doc = doc\n    /**\n     * @type {number}\n     */\n    this.clientID = doc.clientID\n    /**\n     * Maps from client id to client state\n     * @type {Map<number, Object<string, any>>}\n     */\n    this.states = new Map()\n    /**\n     * @type {Map<number, MetaClientState>}\n     */\n    this.meta = new Map()\n    this._checkInterval = /** @type {any} */ (setInterval(() => {\n      const now = lib0_time__WEBPACK_IMPORTED_MODULE_1__.getUnixTime()\n      if (this.getLocalState() !== null && (outdatedTimeout / 2 <= now - /** @type {{lastUpdated:number}} */ (this.meta.get(this.clientID)).lastUpdated)) {\n        // renew local clock\n        this.setLocalState(this.getLocalState())\n      }\n      /**\n       * @type {Array<number>}\n       */\n      const remove = []\n      this.meta.forEach((meta, clientid) => {\n        if (clientid !== this.clientID && outdatedTimeout <= now - meta.lastUpdated && this.states.has(clientid)) {\n          remove.push(clientid)\n        }\n      })\n      if (remove.length > 0) {\n        removeAwarenessStates(this, remove, 'timeout')\n      }\n    }, lib0_math__WEBPACK_IMPORTED_MODULE_2__.floor(outdatedTimeout / 10)))\n    doc.on('destroy', () => {\n      this.destroy()\n    })\n    this.setLocalState({})\n  }\n\n  destroy () {\n    this.emit('destroy', [this])\n    this.setLocalState(null)\n    super.destroy()\n    clearInterval(this._checkInterval)\n  }\n\n  /**\n   * @return {Object<string,any>|null}\n   */\n  getLocalState () {\n    return this.states.get(this.clientID) || null\n  }\n\n  /**\n   * @param {Object<string,any>|null} state\n   */\n  setLocalState (state) {\n    const clientID = this.clientID\n    const currLocalMeta = this.meta.get(clientID)\n    const clock = currLocalMeta === undefined ? 0 : currLocalMeta.clock + 1\n    const prevState = this.states.get(clientID)\n    if (state === null) {\n      this.states.delete(clientID)\n    } else {\n      this.states.set(clientID, state)\n    }\n    this.meta.set(clientID, {\n      clock,\n      lastUpdated: lib0_time__WEBPACK_IMPORTED_MODULE_1__.getUnixTime()\n    })\n    const added = []\n    const updated = []\n    const filteredUpdated = []\n    const removed = []\n    if (state === null) {\n      removed.push(clientID)\n    } else if (prevState == null) {\n      if (state != null) {\n        added.push(clientID)\n      }\n    } else {\n      updated.push(clientID)\n      if (!lib0_function__WEBPACK_IMPORTED_MODULE_3__.equalityDeep(prevState, state)) {\n        filteredUpdated.push(clientID)\n      }\n    }\n    if (added.length > 0 || filteredUpdated.length > 0 || removed.length > 0) {\n      this.emit('change', [{ added, updated: filteredUpdated, removed }, 'local'])\n    }\n    this.emit('update', [{ added, updated, removed }, 'local'])\n  }\n\n  /**\n   * @param {string} field\n   * @param {any} value\n   */\n  setLocalStateField (field, value) {\n    const state = this.getLocalState()\n    if (state !== null) {\n      this.setLocalState({\n        ...state,\n        [field]: value\n      })\n    }\n  }\n\n  /**\n   * @return {Map<number,Object<string,any>>}\n   */\n  getStates () {\n    return this.states\n  }\n}\n\n/**\n * Mark (remote) clients as inactive and remove them from the list of active peers.\n * This change will be propagated to remote clients.\n *\n * @param {Awareness} awareness\n * @param {Array<number>} clients\n * @param {any} origin\n */\nconst removeAwarenessStates = (awareness, clients, origin) => {\n  const removed = []\n  for (let i = 0; i < clients.length; i++) {\n    const clientID = clients[i]\n    if (awareness.states.has(clientID)) {\n      awareness.states.delete(clientID)\n      if (clientID === awareness.clientID) {\n        const curMeta = /** @type {MetaClientState} */ (awareness.meta.get(clientID))\n        awareness.meta.set(clientID, {\n          clock: curMeta.clock + 1,\n          lastUpdated: lib0_time__WEBPACK_IMPORTED_MODULE_1__.getUnixTime()\n        })\n      }\n      removed.push(clientID)\n    }\n  }\n  if (removed.length > 0) {\n    awareness.emit('change', [{ added: [], updated: [], removed }, origin])\n    awareness.emit('update', [{ added: [], updated: [], removed }, origin])\n  }\n}\n\n/**\n * @param {Awareness} awareness\n * @param {Array<number>} clients\n * @return {Uint8Array}\n */\nconst encodeAwarenessUpdate = (awareness, clients, states = awareness.states) => {\n  const len = clients.length\n  const encoder = lib0_encoding__WEBPACK_IMPORTED_MODULE_4__.createEncoder()\n  lib0_encoding__WEBPACK_IMPORTED_MODULE_4__.writeVarUint(encoder, len)\n  for (let i = 0; i < len; i++) {\n    const clientID = clients[i]\n    const state = states.get(clientID) || null\n    const clock = /** @type {MetaClientState} */ (awareness.meta.get(clientID)).clock\n    lib0_encoding__WEBPACK_IMPORTED_MODULE_4__.writeVarUint(encoder, clientID)\n    lib0_encoding__WEBPACK_IMPORTED_MODULE_4__.writeVarUint(encoder, clock)\n    lib0_encoding__WEBPACK_IMPORTED_MODULE_4__.writeVarString(encoder, JSON.stringify(state))\n  }\n  return lib0_encoding__WEBPACK_IMPORTED_MODULE_4__.toUint8Array(encoder)\n}\n\n/**\n * Modify the content of an awareness update before re-encoding it to an awareness update.\n *\n * This might be useful when you have a central server that wants to ensure that clients\n * cant hijack somebody elses identity.\n *\n * @param {Uint8Array} update\n * @param {function(any):any} modify\n * @return {Uint8Array}\n */\nconst modifyAwarenessUpdate = (update, modify) => {\n  const decoder = lib0_decoding__WEBPACK_IMPORTED_MODULE_5__.createDecoder(update)\n  const encoder = lib0_encoding__WEBPACK_IMPORTED_MODULE_4__.createEncoder()\n  const len = lib0_decoding__WEBPACK_IMPORTED_MODULE_5__.readVarUint(decoder)\n  lib0_encoding__WEBPACK_IMPORTED_MODULE_4__.writeVarUint(encoder, len)\n  for (let i = 0; i < len; i++) {\n    const clientID = lib0_decoding__WEBPACK_IMPORTED_MODULE_5__.readVarUint(decoder)\n    const clock = lib0_decoding__WEBPACK_IMPORTED_MODULE_5__.readVarUint(decoder)\n    const state = JSON.parse(lib0_decoding__WEBPACK_IMPORTED_MODULE_5__.readVarString(decoder))\n    const modifiedState = modify(state)\n    lib0_encoding__WEBPACK_IMPORTED_MODULE_4__.writeVarUint(encoder, clientID)\n    lib0_encoding__WEBPACK_IMPORTED_MODULE_4__.writeVarUint(encoder, clock)\n    lib0_encoding__WEBPACK_IMPORTED_MODULE_4__.writeVarString(encoder, JSON.stringify(modifiedState))\n  }\n  return lib0_encoding__WEBPACK_IMPORTED_MODULE_4__.toUint8Array(encoder)\n}\n\n/**\n * @param {Awareness} awareness\n * @param {Uint8Array} update\n * @param {any} origin This will be added to the emitted change event\n */\nconst applyAwarenessUpdate = (awareness, update, origin) => {\n  const decoder = lib0_decoding__WEBPACK_IMPORTED_MODULE_5__.createDecoder(update)\n  const timestamp = lib0_time__WEBPACK_IMPORTED_MODULE_1__.getUnixTime()\n  const added = []\n  const updated = []\n  const filteredUpdated = []\n  const removed = []\n  const len = lib0_decoding__WEBPACK_IMPORTED_MODULE_5__.readVarUint(decoder)\n  for (let i = 0; i < len; i++) {\n    const clientID = lib0_decoding__WEBPACK_IMPORTED_MODULE_5__.readVarUint(decoder)\n    let clock = lib0_decoding__WEBPACK_IMPORTED_MODULE_5__.readVarUint(decoder)\n    const state = JSON.parse(lib0_decoding__WEBPACK_IMPORTED_MODULE_5__.readVarString(decoder))\n    const clientMeta = awareness.meta.get(clientID)\n    const prevState = awareness.states.get(clientID)\n    const currClock = clientMeta === undefined ? 0 : clientMeta.clock\n    if (currClock < clock || (currClock === clock && state === null && awareness.states.has(clientID))) {\n      if (state === null) {\n        // never let a remote client remove this local state\n        if (clientID === awareness.clientID && awareness.getLocalState() != null) {\n          // remote client removed the local state. Do not remote state. Broadcast a message indicating\n          // that this client still exists by increasing the clock\n          clock++\n        } else {\n          awareness.states.delete(clientID)\n        }\n      } else {\n        awareness.states.set(clientID, state)\n      }\n      awareness.meta.set(clientID, {\n        clock,\n        lastUpdated: timestamp\n      })\n      if (clientMeta === undefined && state !== null) {\n        added.push(clientID)\n      } else if (clientMeta !== undefined && state === null) {\n        removed.push(clientID)\n      } else if (state !== null) {\n        if (!lib0_function__WEBPACK_IMPORTED_MODULE_3__.equalityDeep(state, prevState)) {\n          filteredUpdated.push(clientID)\n        }\n        updated.push(clientID)\n      }\n    }\n  }\n  if (added.length > 0 || filteredUpdated.length > 0 || removed.length > 0) {\n    awareness.emit('change', [{\n      added, updated: filteredUpdated, removed\n    }, origin])\n  }\n  if (added.length > 0 || updated.length > 0 || removed.length > 0) {\n    awareness.emit('update', [{\n      added, updated, removed\n    }, origin])\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMveS1wcm90b2NvbHMvYXdhcmVuZXNzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFeUM7QUFDQTtBQUNSO0FBQ0E7QUFDVztBQUNWO0FBQ1Y7O0FBRWpCOztBQUVQO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSw4REFBOEQ7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ08sd0JBQXdCLHVEQUFVO0FBQ3pDO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxxQ0FBcUMsS0FBSztBQUMxQyxrQkFBa0Isa0RBQWdCO0FBQ2xDLHFGQUFxRixxQkFBcUI7QUFDMUc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUssRUFBRSw0Q0FBVTtBQUNqQjtBQUNBO0FBQ0EsS0FBSztBQUNMLHlCQUF5QjtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLHlCQUF5QjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtEQUFnQjtBQUNuQyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLFdBQVcsdURBQWM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsMENBQTBDO0FBQ3ZFO0FBQ0EsMkJBQTJCLHlCQUF5QjtBQUNwRDs7QUFFQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxXQUFXO0FBQ3RCLFdBQVcsZUFBZTtBQUMxQixXQUFXLEtBQUs7QUFDaEI7QUFDTztBQUNQO0FBQ0Esa0JBQWtCLG9CQUFvQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxpQkFBaUI7QUFDcEQ7QUFDQTtBQUNBLHVCQUF1QixrREFBZ0I7QUFDdkMsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsaUNBQWlDO0FBQ2pFLGdDQUFnQyxpQ0FBaUM7QUFDakU7QUFDQTs7QUFFQTtBQUNBLFdBQVcsV0FBVztBQUN0QixXQUFXLGVBQWU7QUFDMUIsWUFBWTtBQUNaO0FBQ087QUFDUDtBQUNBLGtCQUFrQix3REFBc0I7QUFDeEMsRUFBRSx1REFBcUI7QUFDdkIsa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBLDZCQUE2QixpQkFBaUI7QUFDOUMsSUFBSSx1REFBcUI7QUFDekIsSUFBSSx1REFBcUI7QUFDekIsSUFBSSx5REFBdUI7QUFDM0I7QUFDQSxTQUFTLHVEQUFxQjtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkIsV0FBVyxtQkFBbUI7QUFDOUIsWUFBWTtBQUNaO0FBQ087QUFDUCxrQkFBa0Isd0RBQXNCO0FBQ3hDLGtCQUFrQix3REFBc0I7QUFDeEMsY0FBYyxzREFBb0I7QUFDbEMsRUFBRSx1REFBcUI7QUFDdkIsa0JBQWtCLFNBQVM7QUFDM0IscUJBQXFCLHNEQUFvQjtBQUN6QyxrQkFBa0Isc0RBQW9CO0FBQ3RDLDZCQUE2Qix3REFBc0I7QUFDbkQ7QUFDQSxJQUFJLHVEQUFxQjtBQUN6QixJQUFJLHVEQUFxQjtBQUN6QixJQUFJLHlEQUF1QjtBQUMzQjtBQUNBLFNBQVMsdURBQXFCO0FBQzlCOztBQUVBO0FBQ0EsV0FBVyxXQUFXO0FBQ3RCLFdBQVcsWUFBWTtBQUN2QixXQUFXLEtBQUs7QUFDaEI7QUFDTztBQUNQLGtCQUFrQix3REFBc0I7QUFDeEMsb0JBQW9CLGtEQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsc0RBQW9CO0FBQ2xDLGtCQUFrQixTQUFTO0FBQzNCLHFCQUFxQixzREFBb0I7QUFDekMsZ0JBQWdCLHNEQUFvQjtBQUNwQyw2QkFBNkIsd0RBQXNCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSLGFBQWEsdURBQWM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8yOF9ub3Rpb24tY2xvbmUvLi9ub2RlX21vZHVsZXMveS1wcm90b2NvbHMvYXdhcmVuZXNzLmpzP2ZlYjIiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlIGF3YXJlbmVzcy1wcm90b2NvbFxuICovXG5cbmltcG9ydCAqIGFzIGVuY29kaW5nIGZyb20gJ2xpYjAvZW5jb2RpbmcnXG5pbXBvcnQgKiBhcyBkZWNvZGluZyBmcm9tICdsaWIwL2RlY29kaW5nJ1xuaW1wb3J0ICogYXMgdGltZSBmcm9tICdsaWIwL3RpbWUnXG5pbXBvcnQgKiBhcyBtYXRoIGZyb20gJ2xpYjAvbWF0aCdcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdsaWIwL29ic2VydmFibGUnXG5pbXBvcnQgKiBhcyBmIGZyb20gJ2xpYjAvZnVuY3Rpb24nXG5pbXBvcnQgKiBhcyBZIGZyb20gJ3lqcycgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG5leHBvcnQgY29uc3Qgb3V0ZGF0ZWRUaW1lb3V0ID0gMzAwMDBcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBNZXRhQ2xpZW50U3RhdGVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBNZXRhQ2xpZW50U3RhdGUuY2xvY2tcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBNZXRhQ2xpZW50U3RhdGUubGFzdFVwZGF0ZWQgdW5peCB0aW1lc3RhbXBcbiAqL1xuXG4vKipcbiAqIFRoZSBBd2FyZW5lc3MgY2xhc3MgaW1wbGVtZW50cyBhIHNpbXBsZSBzaGFyZWQgc3RhdGUgcHJvdG9jb2wgdGhhdCBjYW4gYmUgdXNlZCBmb3Igbm9uLXBlcnNpc3RlbnQgZGF0YSBsaWtlIGF3YXJlbmVzcyBpbmZvcm1hdGlvblxuICogKGN1cnNvciwgdXNlcm5hbWUsIHN0YXR1cywgLi4pLiBFYWNoIGNsaWVudCBjYW4gdXBkYXRlIGl0cyBvd24gbG9jYWwgc3RhdGUgYW5kIGxpc3RlbiB0byBzdGF0ZSBjaGFuZ2VzIG9mXG4gKiByZW1vdGUgY2xpZW50cy4gRXZlcnkgY2xpZW50IG1heSBzZXQgYSBzdGF0ZSBvZiBhIHJlbW90ZSBwZWVyIHRvIGBudWxsYCB0byBtYXJrIHRoZSBjbGllbnQgYXMgb2ZmbGluZS5cbiAqXG4gKiBFYWNoIGNsaWVudCBpcyBpZGVudGlmaWVkIGJ5IGEgdW5pcXVlIGNsaWVudCBpZCAoc29tZXRoaW5nIHdlIGJvcnJvdyBmcm9tIGBkb2MuY2xpZW50SURgKS4gQSBjbGllbnQgY2FuIG92ZXJyaWRlXG4gKiBpdHMgb3duIHN0YXRlIGJ5IHByb3BhZ2F0aW5nIGEgbWVzc2FnZSB3aXRoIGFuIGluY3JlYXNpbmcgdGltZXN0YW1wIChgY2xvY2tgKS4gSWYgc3VjaCBhIG1lc3NhZ2UgaXMgcmVjZWl2ZWQsIGl0IGlzXG4gKiBhcHBsaWVkIGlmIHRoZSBrbm93biBzdGF0ZSBvZiB0aGF0IGNsaWVudCBpcyBvbGRlciB0aGFuIHRoZSBuZXcgc3RhdGUgKGBjbG9jayA8IG5ld0Nsb2NrYCkuIElmIGEgY2xpZW50IHRoaW5rcyB0aGF0XG4gKiBhIHJlbW90ZSBjbGllbnQgaXMgb2ZmbGluZSwgaXQgbWF5IHByb3BhZ2F0ZSBhIG1lc3NhZ2Ugd2l0aFxuICogYHsgY2xvY2s6IGN1cnJlbnRDbGllbnRDbG9jaywgc3RhdGU6IG51bGwsIGNsaWVudDogcmVtb3RlQ2xpZW50IH1gLiBJZiBzdWNoIGFcbiAqIG1lc3NhZ2UgaXMgcmVjZWl2ZWQsIGFuZCB0aGUga25vd24gY2xvY2sgb2YgdGhhdCBjbGllbnQgZXF1YWxzIHRoZSByZWNlaXZlZCBjbG9jaywgaXQgd2lsbCBvdmVycmlkZSB0aGUgc3RhdGUgd2l0aCBgbnVsbGAuXG4gKlxuICogQmVmb3JlIGEgY2xpZW50IGRpc2Nvbm5lY3RzLCBpdCBzaG91bGQgcHJvcGFnYXRlIGEgYG51bGxgIHN0YXRlIHdpdGggYW4gdXBkYXRlZCBjbG9jay5cbiAqXG4gKiBBd2FyZW5lc3Mgc3RhdGVzIG11c3QgYmUgdXBkYXRlZCBldmVyeSAzMCBzZWNvbmRzLiBPdGhlcndpc2UgdGhlIEF3YXJlbmVzcyBpbnN0YW5jZSB3aWxsIGRlbGV0ZSB0aGUgY2xpZW50IHN0YXRlLlxuICpcbiAqIEBleHRlbmRzIHtPYnNlcnZhYmxlPHN0cmluZz59XG4gKi9cbmV4cG9ydCBjbGFzcyBBd2FyZW5lc3MgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7WS5Eb2N9IGRvY1xuICAgKi9cbiAgY29uc3RydWN0b3IgKGRvYykge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmRvYyA9IGRvY1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5jbGllbnRJRCA9IGRvYy5jbGllbnRJRFxuICAgIC8qKlxuICAgICAqIE1hcHMgZnJvbSBjbGllbnQgaWQgdG8gY2xpZW50IHN0YXRlXG4gICAgICogQHR5cGUge01hcDxudW1iZXIsIE9iamVjdDxzdHJpbmcsIGFueT4+fVxuICAgICAqL1xuICAgIHRoaXMuc3RhdGVzID0gbmV3IE1hcCgpXG4gICAgLyoqXG4gICAgICogQHR5cGUge01hcDxudW1iZXIsIE1ldGFDbGllbnRTdGF0ZT59XG4gICAgICovXG4gICAgdGhpcy5tZXRhID0gbmV3IE1hcCgpXG4gICAgdGhpcy5fY2hlY2tJbnRlcnZhbCA9IC8qKiBAdHlwZSB7YW55fSAqLyAoc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgY29uc3Qgbm93ID0gdGltZS5nZXRVbml4VGltZSgpXG4gICAgICBpZiAodGhpcy5nZXRMb2NhbFN0YXRlKCkgIT09IG51bGwgJiYgKG91dGRhdGVkVGltZW91dCAvIDIgPD0gbm93IC0gLyoqIEB0eXBlIHt7bGFzdFVwZGF0ZWQ6bnVtYmVyfX0gKi8gKHRoaXMubWV0YS5nZXQodGhpcy5jbGllbnRJRCkpLmxhc3RVcGRhdGVkKSkge1xuICAgICAgICAvLyByZW5ldyBsb2NhbCBjbG9ja1xuICAgICAgICB0aGlzLnNldExvY2FsU3RhdGUodGhpcy5nZXRMb2NhbFN0YXRlKCkpXG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIEB0eXBlIHtBcnJheTxudW1iZXI+fVxuICAgICAgICovXG4gICAgICBjb25zdCByZW1vdmUgPSBbXVxuICAgICAgdGhpcy5tZXRhLmZvckVhY2goKG1ldGEsIGNsaWVudGlkKSA9PiB7XG4gICAgICAgIGlmIChjbGllbnRpZCAhPT0gdGhpcy5jbGllbnRJRCAmJiBvdXRkYXRlZFRpbWVvdXQgPD0gbm93IC0gbWV0YS5sYXN0VXBkYXRlZCAmJiB0aGlzLnN0YXRlcy5oYXMoY2xpZW50aWQpKSB7XG4gICAgICAgICAgcmVtb3ZlLnB1c2goY2xpZW50aWQpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBpZiAocmVtb3ZlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmVtb3ZlQXdhcmVuZXNzU3RhdGVzKHRoaXMsIHJlbW92ZSwgJ3RpbWVvdXQnKVxuICAgICAgfVxuICAgIH0sIG1hdGguZmxvb3Iob3V0ZGF0ZWRUaW1lb3V0IC8gMTApKSlcbiAgICBkb2Mub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICB0aGlzLmRlc3Ryb3koKVxuICAgIH0pXG4gICAgdGhpcy5zZXRMb2NhbFN0YXRlKHt9KVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5lbWl0KCdkZXN0cm95JywgW3RoaXNdKVxuICAgIHRoaXMuc2V0TG9jYWxTdGF0ZShudWxsKVxuICAgIHN1cGVyLmRlc3Ryb3koKVxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fY2hlY2tJbnRlcnZhbClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtPYmplY3Q8c3RyaW5nLGFueT58bnVsbH1cbiAgICovXG4gIGdldExvY2FsU3RhdGUgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlcy5nZXQodGhpcy5jbGllbnRJRCkgfHwgbnVsbFxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZyxhbnk+fG51bGx9IHN0YXRlXG4gICAqL1xuICBzZXRMb2NhbFN0YXRlIChzdGF0ZSkge1xuICAgIGNvbnN0IGNsaWVudElEID0gdGhpcy5jbGllbnRJRFxuICAgIGNvbnN0IGN1cnJMb2NhbE1ldGEgPSB0aGlzLm1ldGEuZ2V0KGNsaWVudElEKVxuICAgIGNvbnN0IGNsb2NrID0gY3VyckxvY2FsTWV0YSA9PT0gdW5kZWZpbmVkID8gMCA6IGN1cnJMb2NhbE1ldGEuY2xvY2sgKyAxXG4gICAgY29uc3QgcHJldlN0YXRlID0gdGhpcy5zdGF0ZXMuZ2V0KGNsaWVudElEKVxuICAgIGlmIChzdGF0ZSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zdGF0ZXMuZGVsZXRlKGNsaWVudElEKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlcy5zZXQoY2xpZW50SUQsIHN0YXRlKVxuICAgIH1cbiAgICB0aGlzLm1ldGEuc2V0KGNsaWVudElELCB7XG4gICAgICBjbG9jayxcbiAgICAgIGxhc3RVcGRhdGVkOiB0aW1lLmdldFVuaXhUaW1lKClcbiAgICB9KVxuICAgIGNvbnN0IGFkZGVkID0gW11cbiAgICBjb25zdCB1cGRhdGVkID0gW11cbiAgICBjb25zdCBmaWx0ZXJlZFVwZGF0ZWQgPSBbXVxuICAgIGNvbnN0IHJlbW92ZWQgPSBbXVxuICAgIGlmIChzdGF0ZSA9PT0gbnVsbCkge1xuICAgICAgcmVtb3ZlZC5wdXNoKGNsaWVudElEKVxuICAgIH0gZWxzZSBpZiAocHJldlN0YXRlID09IG51bGwpIHtcbiAgICAgIGlmIChzdGF0ZSAhPSBudWxsKSB7XG4gICAgICAgIGFkZGVkLnB1c2goY2xpZW50SUQpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZWQucHVzaChjbGllbnRJRClcbiAgICAgIGlmICghZi5lcXVhbGl0eURlZXAocHJldlN0YXRlLCBzdGF0ZSkpIHtcbiAgICAgICAgZmlsdGVyZWRVcGRhdGVkLnB1c2goY2xpZW50SUQpXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChhZGRlZC5sZW5ndGggPiAwIHx8IGZpbHRlcmVkVXBkYXRlZC5sZW5ndGggPiAwIHx8IHJlbW92ZWQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCBbeyBhZGRlZCwgdXBkYXRlZDogZmlsdGVyZWRVcGRhdGVkLCByZW1vdmVkIH0sICdsb2NhbCddKVxuICAgIH1cbiAgICB0aGlzLmVtaXQoJ3VwZGF0ZScsIFt7IGFkZGVkLCB1cGRhdGVkLCByZW1vdmVkIH0sICdsb2NhbCddKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFxuICAgKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAgICovXG4gIHNldExvY2FsU3RhdGVGaWVsZCAoZmllbGQsIHZhbHVlKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldExvY2FsU3RhdGUoKVxuICAgIGlmIChzdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRMb2NhbFN0YXRlKHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIFtmaWVsZF06IHZhbHVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtNYXA8bnVtYmVyLE9iamVjdDxzdHJpbmcsYW55Pj59XG4gICAqL1xuICBnZXRTdGF0ZXMgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlc1xuICB9XG59XG5cbi8qKlxuICogTWFyayAocmVtb3RlKSBjbGllbnRzIGFzIGluYWN0aXZlIGFuZCByZW1vdmUgdGhlbSBmcm9tIHRoZSBsaXN0IG9mIGFjdGl2ZSBwZWVycy5cbiAqIFRoaXMgY2hhbmdlIHdpbGwgYmUgcHJvcGFnYXRlZCB0byByZW1vdGUgY2xpZW50cy5cbiAqXG4gKiBAcGFyYW0ge0F3YXJlbmVzc30gYXdhcmVuZXNzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGNsaWVudHNcbiAqIEBwYXJhbSB7YW55fSBvcmlnaW5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUF3YXJlbmVzc1N0YXRlcyA9IChhd2FyZW5lc3MsIGNsaWVudHMsIG9yaWdpbikgPT4ge1xuICBjb25zdCByZW1vdmVkID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGllbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2xpZW50SUQgPSBjbGllbnRzW2ldXG4gICAgaWYgKGF3YXJlbmVzcy5zdGF0ZXMuaGFzKGNsaWVudElEKSkge1xuICAgICAgYXdhcmVuZXNzLnN0YXRlcy5kZWxldGUoY2xpZW50SUQpXG4gICAgICBpZiAoY2xpZW50SUQgPT09IGF3YXJlbmVzcy5jbGllbnRJRCkge1xuICAgICAgICBjb25zdCBjdXJNZXRhID0gLyoqIEB0eXBlIHtNZXRhQ2xpZW50U3RhdGV9ICovIChhd2FyZW5lc3MubWV0YS5nZXQoY2xpZW50SUQpKVxuICAgICAgICBhd2FyZW5lc3MubWV0YS5zZXQoY2xpZW50SUQsIHtcbiAgICAgICAgICBjbG9jazogY3VyTWV0YS5jbG9jayArIDEsXG4gICAgICAgICAgbGFzdFVwZGF0ZWQ6IHRpbWUuZ2V0VW5peFRpbWUoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgcmVtb3ZlZC5wdXNoKGNsaWVudElEKVxuICAgIH1cbiAgfVxuICBpZiAocmVtb3ZlZC5sZW5ndGggPiAwKSB7XG4gICAgYXdhcmVuZXNzLmVtaXQoJ2NoYW5nZScsIFt7IGFkZGVkOiBbXSwgdXBkYXRlZDogW10sIHJlbW92ZWQgfSwgb3JpZ2luXSlcbiAgICBhd2FyZW5lc3MuZW1pdCgndXBkYXRlJywgW3sgYWRkZWQ6IFtdLCB1cGRhdGVkOiBbXSwgcmVtb3ZlZCB9LCBvcmlnaW5dKVxuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtBd2FyZW5lc3N9IGF3YXJlbmVzc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBjbGllbnRzXG4gKiBAcmV0dXJuIHtVaW50OEFycmF5fVxuICovXG5leHBvcnQgY29uc3QgZW5jb2RlQXdhcmVuZXNzVXBkYXRlID0gKGF3YXJlbmVzcywgY2xpZW50cywgc3RhdGVzID0gYXdhcmVuZXNzLnN0YXRlcykgPT4ge1xuICBjb25zdCBsZW4gPSBjbGllbnRzLmxlbmd0aFxuICBjb25zdCBlbmNvZGVyID0gZW5jb2RpbmcuY3JlYXRlRW5jb2RlcigpXG4gIGVuY29kaW5nLndyaXRlVmFyVWludChlbmNvZGVyLCBsZW4pXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBjbGllbnRJRCA9IGNsaWVudHNbaV1cbiAgICBjb25zdCBzdGF0ZSA9IHN0YXRlcy5nZXQoY2xpZW50SUQpIHx8IG51bGxcbiAgICBjb25zdCBjbG9jayA9IC8qKiBAdHlwZSB7TWV0YUNsaWVudFN0YXRlfSAqLyAoYXdhcmVuZXNzLm1ldGEuZ2V0KGNsaWVudElEKSkuY2xvY2tcbiAgICBlbmNvZGluZy53cml0ZVZhclVpbnQoZW5jb2RlciwgY2xpZW50SUQpXG4gICAgZW5jb2Rpbmcud3JpdGVWYXJVaW50KGVuY29kZXIsIGNsb2NrKVxuICAgIGVuY29kaW5nLndyaXRlVmFyU3RyaW5nKGVuY29kZXIsIEpTT04uc3RyaW5naWZ5KHN0YXRlKSlcbiAgfVxuICByZXR1cm4gZW5jb2RpbmcudG9VaW50OEFycmF5KGVuY29kZXIpXG59XG5cbi8qKlxuICogTW9kaWZ5IHRoZSBjb250ZW50IG9mIGFuIGF3YXJlbmVzcyB1cGRhdGUgYmVmb3JlIHJlLWVuY29kaW5nIGl0IHRvIGFuIGF3YXJlbmVzcyB1cGRhdGUuXG4gKlxuICogVGhpcyBtaWdodCBiZSB1c2VmdWwgd2hlbiB5b3UgaGF2ZSBhIGNlbnRyYWwgc2VydmVyIHRoYXQgd2FudHMgdG8gZW5zdXJlIHRoYXQgY2xpZW50c1xuICogY2FudCBoaWphY2sgc29tZWJvZHkgZWxzZXMgaWRlbnRpdHkuXG4gKlxuICogQHBhcmFtIHtVaW50OEFycmF5fSB1cGRhdGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oYW55KTphbnl9IG1vZGlmeVxuICogQHJldHVybiB7VWludDhBcnJheX1cbiAqL1xuZXhwb3J0IGNvbnN0IG1vZGlmeUF3YXJlbmVzc1VwZGF0ZSA9ICh1cGRhdGUsIG1vZGlmeSkgPT4ge1xuICBjb25zdCBkZWNvZGVyID0gZGVjb2RpbmcuY3JlYXRlRGVjb2Rlcih1cGRhdGUpXG4gIGNvbnN0IGVuY29kZXIgPSBlbmNvZGluZy5jcmVhdGVFbmNvZGVyKClcbiAgY29uc3QgbGVuID0gZGVjb2RpbmcucmVhZFZhclVpbnQoZGVjb2RlcilcbiAgZW5jb2Rpbmcud3JpdGVWYXJVaW50KGVuY29kZXIsIGxlbilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IGNsaWVudElEID0gZGVjb2RpbmcucmVhZFZhclVpbnQoZGVjb2RlcilcbiAgICBjb25zdCBjbG9jayA9IGRlY29kaW5nLnJlYWRWYXJVaW50KGRlY29kZXIpXG4gICAgY29uc3Qgc3RhdGUgPSBKU09OLnBhcnNlKGRlY29kaW5nLnJlYWRWYXJTdHJpbmcoZGVjb2RlcikpXG4gICAgY29uc3QgbW9kaWZpZWRTdGF0ZSA9IG1vZGlmeShzdGF0ZSlcbiAgICBlbmNvZGluZy53cml0ZVZhclVpbnQoZW5jb2RlciwgY2xpZW50SUQpXG4gICAgZW5jb2Rpbmcud3JpdGVWYXJVaW50KGVuY29kZXIsIGNsb2NrKVxuICAgIGVuY29kaW5nLndyaXRlVmFyU3RyaW5nKGVuY29kZXIsIEpTT04uc3RyaW5naWZ5KG1vZGlmaWVkU3RhdGUpKVxuICB9XG4gIHJldHVybiBlbmNvZGluZy50b1VpbnQ4QXJyYXkoZW5jb2Rlcilcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0F3YXJlbmVzc30gYXdhcmVuZXNzXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IHVwZGF0ZVxuICogQHBhcmFtIHthbnl9IG9yaWdpbiBUaGlzIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGVtaXR0ZWQgY2hhbmdlIGV2ZW50XG4gKi9cbmV4cG9ydCBjb25zdCBhcHBseUF3YXJlbmVzc1VwZGF0ZSA9IChhd2FyZW5lc3MsIHVwZGF0ZSwgb3JpZ2luKSA9PiB7XG4gIGNvbnN0IGRlY29kZXIgPSBkZWNvZGluZy5jcmVhdGVEZWNvZGVyKHVwZGF0ZSlcbiAgY29uc3QgdGltZXN0YW1wID0gdGltZS5nZXRVbml4VGltZSgpXG4gIGNvbnN0IGFkZGVkID0gW11cbiAgY29uc3QgdXBkYXRlZCA9IFtdXG4gIGNvbnN0IGZpbHRlcmVkVXBkYXRlZCA9IFtdXG4gIGNvbnN0IHJlbW92ZWQgPSBbXVxuICBjb25zdCBsZW4gPSBkZWNvZGluZy5yZWFkVmFyVWludChkZWNvZGVyKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgY2xpZW50SUQgPSBkZWNvZGluZy5yZWFkVmFyVWludChkZWNvZGVyKVxuICAgIGxldCBjbG9jayA9IGRlY29kaW5nLnJlYWRWYXJVaW50KGRlY29kZXIpXG4gICAgY29uc3Qgc3RhdGUgPSBKU09OLnBhcnNlKGRlY29kaW5nLnJlYWRWYXJTdHJpbmcoZGVjb2RlcikpXG4gICAgY29uc3QgY2xpZW50TWV0YSA9IGF3YXJlbmVzcy5tZXRhLmdldChjbGllbnRJRClcbiAgICBjb25zdCBwcmV2U3RhdGUgPSBhd2FyZW5lc3Muc3RhdGVzLmdldChjbGllbnRJRClcbiAgICBjb25zdCBjdXJyQ2xvY2sgPSBjbGllbnRNZXRhID09PSB1bmRlZmluZWQgPyAwIDogY2xpZW50TWV0YS5jbG9ja1xuICAgIGlmIChjdXJyQ2xvY2sgPCBjbG9jayB8fCAoY3VyckNsb2NrID09PSBjbG9jayAmJiBzdGF0ZSA9PT0gbnVsbCAmJiBhd2FyZW5lc3Muc3RhdGVzLmhhcyhjbGllbnRJRCkpKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IG51bGwpIHtcbiAgICAgICAgLy8gbmV2ZXIgbGV0IGEgcmVtb3RlIGNsaWVudCByZW1vdmUgdGhpcyBsb2NhbCBzdGF0ZVxuICAgICAgICBpZiAoY2xpZW50SUQgPT09IGF3YXJlbmVzcy5jbGllbnRJRCAmJiBhd2FyZW5lc3MuZ2V0TG9jYWxTdGF0ZSgpICE9IG51bGwpIHtcbiAgICAgICAgICAvLyByZW1vdGUgY2xpZW50IHJlbW92ZWQgdGhlIGxvY2FsIHN0YXRlLiBEbyBub3QgcmVtb3RlIHN0YXRlLiBCcm9hZGNhc3QgYSBtZXNzYWdlIGluZGljYXRpbmdcbiAgICAgICAgICAvLyB0aGF0IHRoaXMgY2xpZW50IHN0aWxsIGV4aXN0cyBieSBpbmNyZWFzaW5nIHRoZSBjbG9ja1xuICAgICAgICAgIGNsb2NrKytcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FyZW5lc3Muc3RhdGVzLmRlbGV0ZShjbGllbnRJRClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhcmVuZXNzLnN0YXRlcy5zZXQoY2xpZW50SUQsIHN0YXRlKVxuICAgICAgfVxuICAgICAgYXdhcmVuZXNzLm1ldGEuc2V0KGNsaWVudElELCB7XG4gICAgICAgIGNsb2NrLFxuICAgICAgICBsYXN0VXBkYXRlZDogdGltZXN0YW1wXG4gICAgICB9KVxuICAgICAgaWYgKGNsaWVudE1ldGEgPT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICBhZGRlZC5wdXNoKGNsaWVudElEKVxuICAgICAgfSBlbHNlIGlmIChjbGllbnRNZXRhICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgPT09IG51bGwpIHtcbiAgICAgICAgcmVtb3ZlZC5wdXNoKGNsaWVudElEKVxuICAgICAgfSBlbHNlIGlmIChzdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoIWYuZXF1YWxpdHlEZWVwKHN0YXRlLCBwcmV2U3RhdGUpKSB7XG4gICAgICAgICAgZmlsdGVyZWRVcGRhdGVkLnB1c2goY2xpZW50SUQpXG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlZC5wdXNoKGNsaWVudElEKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoYWRkZWQubGVuZ3RoID4gMCB8fCBmaWx0ZXJlZFVwZGF0ZWQubGVuZ3RoID4gMCB8fCByZW1vdmVkLmxlbmd0aCA+IDApIHtcbiAgICBhd2FyZW5lc3MuZW1pdCgnY2hhbmdlJywgW3tcbiAgICAgIGFkZGVkLCB1cGRhdGVkOiBmaWx0ZXJlZFVwZGF0ZWQsIHJlbW92ZWRcbiAgICB9LCBvcmlnaW5dKVxuICB9XG4gIGlmIChhZGRlZC5sZW5ndGggPiAwIHx8IHVwZGF0ZWQubGVuZ3RoID4gMCB8fCByZW1vdmVkLmxlbmd0aCA+IDApIHtcbiAgICBhd2FyZW5lc3MuZW1pdCgndXBkYXRlJywgW3tcbiAgICAgIGFkZGVkLCB1cGRhdGVkLCByZW1vdmVkXG4gICAgfSwgb3JpZ2luXSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/y-protocols/awareness.js\n");

/***/ })

};
;