"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/prosemirror-gapcursor";
exports.ids = ["vendor-chunks/prosemirror-gapcursor"];
exports.modules = {

/***/ "(ssr)/./node_modules/prosemirror-gapcursor/dist/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/prosemirror-gapcursor/dist/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GapCursor: () => (/* binding */ GapCursor),\n/* harmony export */   gapCursor: () => (/* binding */ gapCursor)\n/* harmony export */ });\n/* harmony import */ var prosemirror_keymap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prosemirror-keymap */ \"(ssr)/./node_modules/prosemirror-keymap/dist/index.js\");\n/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-state */ \"(ssr)/./node_modules/prosemirror-state/dist/index.js\");\n/* harmony import */ var prosemirror_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-model */ \"(ssr)/./node_modules/prosemirror-model/dist/index.js\");\n/* harmony import */ var prosemirror_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prosemirror-view */ \"(ssr)/./node_modules/prosemirror-view/dist/index.js\");\n\n\n\n\n\n/**\nGap cursor selections are represented using this class. Its\n`$anchor` and `$head` properties both point at the cursor position.\n*/\nclass GapCursor extends prosemirror_state__WEBPACK_IMPORTED_MODULE_0__.Selection {\n    /**\n    Create a gap cursor.\n    */\n    constructor($pos) {\n        super($pos, $pos);\n    }\n    map(doc, mapping) {\n        let $pos = doc.resolve(mapping.map(this.head));\n        return GapCursor.valid($pos) ? new GapCursor($pos) : prosemirror_state__WEBPACK_IMPORTED_MODULE_0__.Selection.near($pos);\n    }\n    content() { return prosemirror_model__WEBPACK_IMPORTED_MODULE_1__.Slice.empty; }\n    eq(other) {\n        return other instanceof GapCursor && other.head == this.head;\n    }\n    toJSON() {\n        return { type: \"gapcursor\", pos: this.head };\n    }\n    /**\n    @internal\n    */\n    static fromJSON(doc, json) {\n        if (typeof json.pos != \"number\")\n            throw new RangeError(\"Invalid input for GapCursor.fromJSON\");\n        return new GapCursor(doc.resolve(json.pos));\n    }\n    /**\n    @internal\n    */\n    getBookmark() { return new GapBookmark(this.anchor); }\n    /**\n    @internal\n    */\n    static valid($pos) {\n        let parent = $pos.parent;\n        if (parent.isTextblock || !closedBefore($pos) || !closedAfter($pos))\n            return false;\n        let override = parent.type.spec.allowGapCursor;\n        if (override != null)\n            return override;\n        let deflt = parent.contentMatchAt($pos.index()).defaultType;\n        return deflt && deflt.isTextblock;\n    }\n    /**\n    @internal\n    */\n    static findGapCursorFrom($pos, dir, mustMove = false) {\n        search: for (;;) {\n            if (!mustMove && GapCursor.valid($pos))\n                return $pos;\n            let pos = $pos.pos, next = null;\n            // Scan up from this position\n            for (let d = $pos.depth;; d--) {\n                let parent = $pos.node(d);\n                if (dir > 0 ? $pos.indexAfter(d) < parent.childCount : $pos.index(d) > 0) {\n                    next = parent.child(dir > 0 ? $pos.indexAfter(d) : $pos.index(d) - 1);\n                    break;\n                }\n                else if (d == 0) {\n                    return null;\n                }\n                pos += dir;\n                let $cur = $pos.doc.resolve(pos);\n                if (GapCursor.valid($cur))\n                    return $cur;\n            }\n            // And then down into the next node\n            for (;;) {\n                let inside = dir > 0 ? next.firstChild : next.lastChild;\n                if (!inside) {\n                    if (next.isAtom && !next.isText && !prosemirror_state__WEBPACK_IMPORTED_MODULE_0__.NodeSelection.isSelectable(next)) {\n                        $pos = $pos.doc.resolve(pos + next.nodeSize * dir);\n                        mustMove = false;\n                        continue search;\n                    }\n                    break;\n                }\n                next = inside;\n                pos += dir;\n                let $cur = $pos.doc.resolve(pos);\n                if (GapCursor.valid($cur))\n                    return $cur;\n            }\n            return null;\n        }\n    }\n}\nGapCursor.prototype.visible = false;\nGapCursor.findFrom = GapCursor.findGapCursorFrom;\nprosemirror_state__WEBPACK_IMPORTED_MODULE_0__.Selection.jsonID(\"gapcursor\", GapCursor);\nclass GapBookmark {\n    constructor(pos) {\n        this.pos = pos;\n    }\n    map(mapping) {\n        return new GapBookmark(mapping.map(this.pos));\n    }\n    resolve(doc) {\n        let $pos = doc.resolve(this.pos);\n        return GapCursor.valid($pos) ? new GapCursor($pos) : prosemirror_state__WEBPACK_IMPORTED_MODULE_0__.Selection.near($pos);\n    }\n}\nfunction closedBefore($pos) {\n    for (let d = $pos.depth; d >= 0; d--) {\n        let index = $pos.index(d), parent = $pos.node(d);\n        // At the start of this parent, look at next one\n        if (index == 0) {\n            if (parent.type.spec.isolating)\n                return true;\n            continue;\n        }\n        // See if the node before (or its first ancestor) is closed\n        for (let before = parent.child(index - 1);; before = before.lastChild) {\n            if ((before.childCount == 0 && !before.inlineContent) || before.isAtom || before.type.spec.isolating)\n                return true;\n            if (before.inlineContent)\n                return false;\n        }\n    }\n    // Hit start of document\n    return true;\n}\nfunction closedAfter($pos) {\n    for (let d = $pos.depth; d >= 0; d--) {\n        let index = $pos.indexAfter(d), parent = $pos.node(d);\n        if (index == parent.childCount) {\n            if (parent.type.spec.isolating)\n                return true;\n            continue;\n        }\n        for (let after = parent.child(index);; after = after.firstChild) {\n            if ((after.childCount == 0 && !after.inlineContent) || after.isAtom || after.type.spec.isolating)\n                return true;\n            if (after.inlineContent)\n                return false;\n        }\n    }\n    return true;\n}\n\n/**\nCreate a gap cursor plugin. When enabled, this will capture clicks\nnear and arrow-key-motion past places that don't have a normally\nselectable position nearby, and create a gap cursor selection for\nthem. The cursor is drawn as an element with class\n`ProseMirror-gapcursor`. You can either include\n`style/gapcursor.css` from the package's directory or add your own\nstyles to make it visible.\n*/\nfunction gapCursor() {\n    return new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__.Plugin({\n        props: {\n            decorations: drawGapCursor,\n            createSelectionBetween(_view, $anchor, $head) {\n                return $anchor.pos == $head.pos && GapCursor.valid($head) ? new GapCursor($head) : null;\n            },\n            handleClick,\n            handleKeyDown,\n            handleDOMEvents: { beforeinput: beforeinput }\n        }\n    });\n}\nconst handleKeyDown = (0,prosemirror_keymap__WEBPACK_IMPORTED_MODULE_2__.keydownHandler)({\n    \"ArrowLeft\": arrow(\"horiz\", -1),\n    \"ArrowRight\": arrow(\"horiz\", 1),\n    \"ArrowUp\": arrow(\"vert\", -1),\n    \"ArrowDown\": arrow(\"vert\", 1)\n});\nfunction arrow(axis, dir) {\n    const dirStr = axis == \"vert\" ? (dir > 0 ? \"down\" : \"up\") : (dir > 0 ? \"right\" : \"left\");\n    return function (state, dispatch, view) {\n        let sel = state.selection;\n        let $start = dir > 0 ? sel.$to : sel.$from, mustMove = sel.empty;\n        if (sel instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__.TextSelection) {\n            if (!view.endOfTextblock(dirStr) || $start.depth == 0)\n                return false;\n            mustMove = false;\n            $start = state.doc.resolve(dir > 0 ? $start.after() : $start.before());\n        }\n        let $found = GapCursor.findGapCursorFrom($start, dir, mustMove);\n        if (!$found)\n            return false;\n        if (dispatch)\n            dispatch(state.tr.setSelection(new GapCursor($found)));\n        return true;\n    };\n}\nfunction handleClick(view, pos, event) {\n    if (!view || !view.editable)\n        return false;\n    let $pos = view.state.doc.resolve(pos);\n    if (!GapCursor.valid($pos))\n        return false;\n    let clickPos = view.posAtCoords({ left: event.clientX, top: event.clientY });\n    if (clickPos && clickPos.inside > -1 && prosemirror_state__WEBPACK_IMPORTED_MODULE_0__.NodeSelection.isSelectable(view.state.doc.nodeAt(clickPos.inside)))\n        return false;\n    view.dispatch(view.state.tr.setSelection(new GapCursor($pos)));\n    return true;\n}\n// This is a hack that, when a composition starts while a gap cursor\n// is active, quickly creates an inline context for the composition to\n// happen in, to avoid it being aborted by the DOM selection being\n// moved into a valid position.\nfunction beforeinput(view, event) {\n    if (event.inputType != \"insertCompositionText\" || !(view.state.selection instanceof GapCursor))\n        return false;\n    let { $from } = view.state.selection;\n    let insert = $from.parent.contentMatchAt($from.index()).findWrapping(view.state.schema.nodes.text);\n    if (!insert)\n        return false;\n    let frag = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__.Fragment.empty;\n    for (let i = insert.length - 1; i >= 0; i--)\n        frag = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__.Fragment.from(insert[i].createAndFill(null, frag));\n    let tr = view.state.tr.replace($from.pos, $from.pos, new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__.Slice(frag, 0, 0));\n    tr.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_0__.TextSelection.near(tr.doc.resolve($from.pos + 1)));\n    view.dispatch(tr);\n    return false;\n}\nfunction drawGapCursor(state) {\n    if (!(state.selection instanceof GapCursor))\n        return null;\n    let node = document.createElement(\"div\");\n    node.className = \"ProseMirror-gapcursor\";\n    return prosemirror_view__WEBPACK_IMPORTED_MODULE_3__.DecorationSet.create(state.doc, [prosemirror_view__WEBPACK_IMPORTED_MODULE_3__.Decoration.widget(state.selection.head, node, { key: \"gapcursor\" })]);\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcHJvc2VtaXJyb3ItZ2FwY3Vyc29yL2Rpc3QvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQW9EO0FBQ2dDO0FBQ2hDO0FBQ1M7O0FBRTdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHdEQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsd0RBQVM7QUFDdEU7QUFDQSxnQkFBZ0IsT0FBTyxvREFBSztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSx3REFBd0QsNERBQWE7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsd0RBQVM7QUFDdEU7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFFBQVE7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixRQUFRO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxREFBTTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0EsS0FBSztBQUNMO0FBQ0Esc0JBQXNCLGtFQUFjO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsNERBQWE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MseUNBQXlDO0FBQy9FLDRDQUE0Qyw0REFBYTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLGVBQWUsdURBQVE7QUFDdkIsb0NBQW9DLFFBQVE7QUFDNUMsZUFBZSx1REFBUTtBQUN2Qiw2REFBNkQsb0RBQUs7QUFDbEUsb0JBQW9CLDREQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDJEQUFhLG9CQUFvQix3REFBVSxzQ0FBc0Msa0JBQWtCO0FBQzlHOztBQUVnQyIsInNvdXJjZXMiOlsid2VicGFjazovLzI4X25vdGlvbi1jbG9uZS8uL25vZGVfbW9kdWxlcy9wcm9zZW1pcnJvci1nYXBjdXJzb3IvZGlzdC9pbmRleC5qcz8xOTcxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGtleWRvd25IYW5kbGVyIH0gZnJvbSAncHJvc2VtaXJyb3Ita2V5bWFwJztcbmltcG9ydCB7IFNlbGVjdGlvbiwgTm9kZVNlbGVjdGlvbiwgVGV4dFNlbGVjdGlvbiwgUGx1Z2luIH0gZnJvbSAncHJvc2VtaXJyb3Itc3RhdGUnO1xuaW1wb3J0IHsgU2xpY2UsIEZyYWdtZW50IH0gZnJvbSAncHJvc2VtaXJyb3ItbW9kZWwnO1xuaW1wb3J0IHsgRGVjb3JhdGlvblNldCwgRGVjb3JhdGlvbiB9IGZyb20gJ3Byb3NlbWlycm9yLXZpZXcnO1xuXG4vKipcbkdhcCBjdXJzb3Igc2VsZWN0aW9ucyBhcmUgcmVwcmVzZW50ZWQgdXNpbmcgdGhpcyBjbGFzcy4gSXRzXG5gJGFuY2hvcmAgYW5kIGAkaGVhZGAgcHJvcGVydGllcyBib3RoIHBvaW50IGF0IHRoZSBjdXJzb3IgcG9zaXRpb24uXG4qL1xuY2xhc3MgR2FwQ3Vyc29yIGV4dGVuZHMgU2VsZWN0aW9uIHtcbiAgICAvKipcbiAgICBDcmVhdGUgYSBnYXAgY3Vyc29yLlxuICAgICovXG4gICAgY29uc3RydWN0b3IoJHBvcykge1xuICAgICAgICBzdXBlcigkcG9zLCAkcG9zKTtcbiAgICB9XG4gICAgbWFwKGRvYywgbWFwcGluZykge1xuICAgICAgICBsZXQgJHBvcyA9IGRvYy5yZXNvbHZlKG1hcHBpbmcubWFwKHRoaXMuaGVhZCkpO1xuICAgICAgICByZXR1cm4gR2FwQ3Vyc29yLnZhbGlkKCRwb3MpID8gbmV3IEdhcEN1cnNvcigkcG9zKSA6IFNlbGVjdGlvbi5uZWFyKCRwb3MpO1xuICAgIH1cbiAgICBjb250ZW50KCkgeyByZXR1cm4gU2xpY2UuZW1wdHk7IH1cbiAgICBlcShvdGhlcikge1xuICAgICAgICByZXR1cm4gb3RoZXIgaW5zdGFuY2VvZiBHYXBDdXJzb3IgJiYgb3RoZXIuaGVhZCA9PSB0aGlzLmhlYWQ7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogXCJnYXBjdXJzb3JcIiwgcG9zOiB0aGlzLmhlYWQgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgQGludGVybmFsXG4gICAgKi9cbiAgICBzdGF0aWMgZnJvbUpTT04oZG9jLCBqc29uKSB7XG4gICAgICAgIGlmICh0eXBlb2YganNvbi5wb3MgIT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiSW52YWxpZCBpbnB1dCBmb3IgR2FwQ3Vyc29yLmZyb21KU09OXCIpO1xuICAgICAgICByZXR1cm4gbmV3IEdhcEN1cnNvcihkb2MucmVzb2x2ZShqc29uLnBvcykpO1xuICAgIH1cbiAgICAvKipcbiAgICBAaW50ZXJuYWxcbiAgICAqL1xuICAgIGdldEJvb2ttYXJrKCkgeyByZXR1cm4gbmV3IEdhcEJvb2ttYXJrKHRoaXMuYW5jaG9yKTsgfVxuICAgIC8qKlxuICAgIEBpbnRlcm5hbFxuICAgICovXG4gICAgc3RhdGljIHZhbGlkKCRwb3MpIHtcbiAgICAgICAgbGV0IHBhcmVudCA9ICRwb3MucGFyZW50O1xuICAgICAgICBpZiAocGFyZW50LmlzVGV4dGJsb2NrIHx8ICFjbG9zZWRCZWZvcmUoJHBvcykgfHwgIWNsb3NlZEFmdGVyKCRwb3MpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBsZXQgb3ZlcnJpZGUgPSBwYXJlbnQudHlwZS5zcGVjLmFsbG93R2FwQ3Vyc29yO1xuICAgICAgICBpZiAob3ZlcnJpZGUgIT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBvdmVycmlkZTtcbiAgICAgICAgbGV0IGRlZmx0ID0gcGFyZW50LmNvbnRlbnRNYXRjaEF0KCRwb3MuaW5kZXgoKSkuZGVmYXVsdFR5cGU7XG4gICAgICAgIHJldHVybiBkZWZsdCAmJiBkZWZsdC5pc1RleHRibG9jaztcbiAgICB9XG4gICAgLyoqXG4gICAgQGludGVybmFsXG4gICAgKi9cbiAgICBzdGF0aWMgZmluZEdhcEN1cnNvckZyb20oJHBvcywgZGlyLCBtdXN0TW92ZSA9IGZhbHNlKSB7XG4gICAgICAgIHNlYXJjaDogZm9yICg7Oykge1xuICAgICAgICAgICAgaWYgKCFtdXN0TW92ZSAmJiBHYXBDdXJzb3IudmFsaWQoJHBvcykpXG4gICAgICAgICAgICAgICAgcmV0dXJuICRwb3M7XG4gICAgICAgICAgICBsZXQgcG9zID0gJHBvcy5wb3MsIG5leHQgPSBudWxsO1xuICAgICAgICAgICAgLy8gU2NhbiB1cCBmcm9tIHRoaXMgcG9zaXRpb25cbiAgICAgICAgICAgIGZvciAobGV0IGQgPSAkcG9zLmRlcHRoOzsgZC0tKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudCA9ICRwb3Mubm9kZShkKTtcbiAgICAgICAgICAgICAgICBpZiAoZGlyID4gMCA/ICRwb3MuaW5kZXhBZnRlcihkKSA8IHBhcmVudC5jaGlsZENvdW50IDogJHBvcy5pbmRleChkKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA9IHBhcmVudC5jaGlsZChkaXIgPiAwID8gJHBvcy5pbmRleEFmdGVyKGQpIDogJHBvcy5pbmRleChkKSAtIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb3MgKz0gZGlyO1xuICAgICAgICAgICAgICAgIGxldCAkY3VyID0gJHBvcy5kb2MucmVzb2x2ZShwb3MpO1xuICAgICAgICAgICAgICAgIGlmIChHYXBDdXJzb3IudmFsaWQoJGN1cikpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkY3VyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQW5kIHRoZW4gZG93biBpbnRvIHRoZSBuZXh0IG5vZGVcbiAgICAgICAgICAgIGZvciAoOzspIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5zaWRlID0gZGlyID4gMCA/IG5leHQuZmlyc3RDaGlsZCA6IG5leHQubGFzdENoaWxkO1xuICAgICAgICAgICAgICAgIGlmICghaW5zaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0LmlzQXRvbSAmJiAhbmV4dC5pc1RleHQgJiYgIU5vZGVTZWxlY3Rpb24uaXNTZWxlY3RhYmxlKG5leHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcG9zID0gJHBvcy5kb2MucmVzb2x2ZShwb3MgKyBuZXh0Lm5vZGVTaXplICogZGlyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG11c3RNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBzZWFyY2g7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5leHQgPSBpbnNpZGU7XG4gICAgICAgICAgICAgICAgcG9zICs9IGRpcjtcbiAgICAgICAgICAgICAgICBsZXQgJGN1ciA9ICRwb3MuZG9jLnJlc29sdmUocG9zKTtcbiAgICAgICAgICAgICAgICBpZiAoR2FwQ3Vyc29yLnZhbGlkKCRjdXIpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGN1cjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuR2FwQ3Vyc29yLnByb3RvdHlwZS52aXNpYmxlID0gZmFsc2U7XG5HYXBDdXJzb3IuZmluZEZyb20gPSBHYXBDdXJzb3IuZmluZEdhcEN1cnNvckZyb207XG5TZWxlY3Rpb24uanNvbklEKFwiZ2FwY3Vyc29yXCIsIEdhcEN1cnNvcik7XG5jbGFzcyBHYXBCb29rbWFyayB7XG4gICAgY29uc3RydWN0b3IocG9zKSB7XG4gICAgICAgIHRoaXMucG9zID0gcG9zO1xuICAgIH1cbiAgICBtYXAobWFwcGluZykge1xuICAgICAgICByZXR1cm4gbmV3IEdhcEJvb2ttYXJrKG1hcHBpbmcubWFwKHRoaXMucG9zKSk7XG4gICAgfVxuICAgIHJlc29sdmUoZG9jKSB7XG4gICAgICAgIGxldCAkcG9zID0gZG9jLnJlc29sdmUodGhpcy5wb3MpO1xuICAgICAgICByZXR1cm4gR2FwQ3Vyc29yLnZhbGlkKCRwb3MpID8gbmV3IEdhcEN1cnNvcigkcG9zKSA6IFNlbGVjdGlvbi5uZWFyKCRwb3MpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNsb3NlZEJlZm9yZSgkcG9zKSB7XG4gICAgZm9yIChsZXQgZCA9ICRwb3MuZGVwdGg7IGQgPj0gMDsgZC0tKSB7XG4gICAgICAgIGxldCBpbmRleCA9ICRwb3MuaW5kZXgoZCksIHBhcmVudCA9ICRwb3Mubm9kZShkKTtcbiAgICAgICAgLy8gQXQgdGhlIHN0YXJ0IG9mIHRoaXMgcGFyZW50LCBsb29rIGF0IG5leHQgb25lXG4gICAgICAgIGlmIChpbmRleCA9PSAwKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50LnR5cGUuc3BlYy5pc29sYXRpbmcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZWUgaWYgdGhlIG5vZGUgYmVmb3JlIChvciBpdHMgZmlyc3QgYW5jZXN0b3IpIGlzIGNsb3NlZFxuICAgICAgICBmb3IgKGxldCBiZWZvcmUgPSBwYXJlbnQuY2hpbGQoaW5kZXggLSAxKTs7IGJlZm9yZSA9IGJlZm9yZS5sYXN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGlmICgoYmVmb3JlLmNoaWxkQ291bnQgPT0gMCAmJiAhYmVmb3JlLmlubGluZUNvbnRlbnQpIHx8IGJlZm9yZS5pc0F0b20gfHwgYmVmb3JlLnR5cGUuc3BlYy5pc29sYXRpbmcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAoYmVmb3JlLmlubGluZUNvbnRlbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEhpdCBzdGFydCBvZiBkb2N1bWVudFxuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gY2xvc2VkQWZ0ZXIoJHBvcykge1xuICAgIGZvciAobGV0IGQgPSAkcG9zLmRlcHRoOyBkID49IDA7IGQtLSkge1xuICAgICAgICBsZXQgaW5kZXggPSAkcG9zLmluZGV4QWZ0ZXIoZCksIHBhcmVudCA9ICRwb3Mubm9kZShkKTtcbiAgICAgICAgaWYgKGluZGV4ID09IHBhcmVudC5jaGlsZENvdW50KSB7XG4gICAgICAgICAgICBpZiAocGFyZW50LnR5cGUuc3BlYy5pc29sYXRpbmcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBhZnRlciA9IHBhcmVudC5jaGlsZChpbmRleCk7OyBhZnRlciA9IGFmdGVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGlmICgoYWZ0ZXIuY2hpbGRDb3VudCA9PSAwICYmICFhZnRlci5pbmxpbmVDb250ZW50KSB8fCBhZnRlci5pc0F0b20gfHwgYWZ0ZXIudHlwZS5zcGVjLmlzb2xhdGluZylcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChhZnRlci5pbmxpbmVDb250ZW50KVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG5DcmVhdGUgYSBnYXAgY3Vyc29yIHBsdWdpbi4gV2hlbiBlbmFibGVkLCB0aGlzIHdpbGwgY2FwdHVyZSBjbGlja3Ncbm5lYXIgYW5kIGFycm93LWtleS1tb3Rpb24gcGFzdCBwbGFjZXMgdGhhdCBkb24ndCBoYXZlIGEgbm9ybWFsbHlcbnNlbGVjdGFibGUgcG9zaXRpb24gbmVhcmJ5LCBhbmQgY3JlYXRlIGEgZ2FwIGN1cnNvciBzZWxlY3Rpb24gZm9yXG50aGVtLiBUaGUgY3Vyc29yIGlzIGRyYXduIGFzIGFuIGVsZW1lbnQgd2l0aCBjbGFzc1xuYFByb3NlTWlycm9yLWdhcGN1cnNvcmAuIFlvdSBjYW4gZWl0aGVyIGluY2x1ZGVcbmBzdHlsZS9nYXBjdXJzb3IuY3NzYCBmcm9tIHRoZSBwYWNrYWdlJ3MgZGlyZWN0b3J5IG9yIGFkZCB5b3VyIG93blxuc3R5bGVzIHRvIG1ha2UgaXQgdmlzaWJsZS5cbiovXG5mdW5jdGlvbiBnYXBDdXJzb3IoKSB7XG4gICAgcmV0dXJuIG5ldyBQbHVnaW4oe1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgZGVjb3JhdGlvbnM6IGRyYXdHYXBDdXJzb3IsXG4gICAgICAgICAgICBjcmVhdGVTZWxlY3Rpb25CZXR3ZWVuKF92aWV3LCAkYW5jaG9yLCAkaGVhZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkYW5jaG9yLnBvcyA9PSAkaGVhZC5wb3MgJiYgR2FwQ3Vyc29yLnZhbGlkKCRoZWFkKSA/IG5ldyBHYXBDdXJzb3IoJGhlYWQpIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYW5kbGVDbGljayxcbiAgICAgICAgICAgIGhhbmRsZUtleURvd24sXG4gICAgICAgICAgICBoYW5kbGVET01FdmVudHM6IHsgYmVmb3JlaW5wdXQ6IGJlZm9yZWlucHV0IH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuY29uc3QgaGFuZGxlS2V5RG93biA9IGtleWRvd25IYW5kbGVyKHtcbiAgICBcIkFycm93TGVmdFwiOiBhcnJvdyhcImhvcml6XCIsIC0xKSxcbiAgICBcIkFycm93UmlnaHRcIjogYXJyb3coXCJob3JpelwiLCAxKSxcbiAgICBcIkFycm93VXBcIjogYXJyb3coXCJ2ZXJ0XCIsIC0xKSxcbiAgICBcIkFycm93RG93blwiOiBhcnJvdyhcInZlcnRcIiwgMSlcbn0pO1xuZnVuY3Rpb24gYXJyb3coYXhpcywgZGlyKSB7XG4gICAgY29uc3QgZGlyU3RyID0gYXhpcyA9PSBcInZlcnRcIiA/IChkaXIgPiAwID8gXCJkb3duXCIgOiBcInVwXCIpIDogKGRpciA+IDAgPyBcInJpZ2h0XCIgOiBcImxlZnRcIik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdGF0ZSwgZGlzcGF0Y2gsIHZpZXcpIHtcbiAgICAgICAgbGV0IHNlbCA9IHN0YXRlLnNlbGVjdGlvbjtcbiAgICAgICAgbGV0ICRzdGFydCA9IGRpciA+IDAgPyBzZWwuJHRvIDogc2VsLiRmcm9tLCBtdXN0TW92ZSA9IHNlbC5lbXB0eTtcbiAgICAgICAgaWYgKHNlbCBpbnN0YW5jZW9mIFRleHRTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICghdmlldy5lbmRPZlRleHRibG9jayhkaXJTdHIpIHx8ICRzdGFydC5kZXB0aCA9PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIG11c3RNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICAkc3RhcnQgPSBzdGF0ZS5kb2MucmVzb2x2ZShkaXIgPiAwID8gJHN0YXJ0LmFmdGVyKCkgOiAkc3RhcnQuYmVmb3JlKCkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCAkZm91bmQgPSBHYXBDdXJzb3IuZmluZEdhcEN1cnNvckZyb20oJHN0YXJ0LCBkaXIsIG11c3RNb3ZlKTtcbiAgICAgICAgaWYgKCEkZm91bmQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChkaXNwYXRjaClcbiAgICAgICAgICAgIGRpc3BhdGNoKHN0YXRlLnRyLnNldFNlbGVjdGlvbihuZXcgR2FwQ3Vyc29yKCRmb3VuZCkpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGhhbmRsZUNsaWNrKHZpZXcsIHBvcywgZXZlbnQpIHtcbiAgICBpZiAoIXZpZXcgfHwgIXZpZXcuZWRpdGFibGUpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBsZXQgJHBvcyA9IHZpZXcuc3RhdGUuZG9jLnJlc29sdmUocG9zKTtcbiAgICBpZiAoIUdhcEN1cnNvci52YWxpZCgkcG9zKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGxldCBjbGlja1BvcyA9IHZpZXcucG9zQXRDb29yZHMoeyBsZWZ0OiBldmVudC5jbGllbnRYLCB0b3A6IGV2ZW50LmNsaWVudFkgfSk7XG4gICAgaWYgKGNsaWNrUG9zICYmIGNsaWNrUG9zLmluc2lkZSA+IC0xICYmIE5vZGVTZWxlY3Rpb24uaXNTZWxlY3RhYmxlKHZpZXcuc3RhdGUuZG9jLm5vZGVBdChjbGlja1Bvcy5pbnNpZGUpKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHZpZXcuZGlzcGF0Y2godmlldy5zdGF0ZS50ci5zZXRTZWxlY3Rpb24obmV3IEdhcEN1cnNvcigkcG9zKSkpO1xuICAgIHJldHVybiB0cnVlO1xufVxuLy8gVGhpcyBpcyBhIGhhY2sgdGhhdCwgd2hlbiBhIGNvbXBvc2l0aW9uIHN0YXJ0cyB3aGlsZSBhIGdhcCBjdXJzb3Jcbi8vIGlzIGFjdGl2ZSwgcXVpY2tseSBjcmVhdGVzIGFuIGlubGluZSBjb250ZXh0IGZvciB0aGUgY29tcG9zaXRpb24gdG9cbi8vIGhhcHBlbiBpbiwgdG8gYXZvaWQgaXQgYmVpbmcgYWJvcnRlZCBieSB0aGUgRE9NIHNlbGVjdGlvbiBiZWluZ1xuLy8gbW92ZWQgaW50byBhIHZhbGlkIHBvc2l0aW9uLlxuZnVuY3Rpb24gYmVmb3JlaW5wdXQodmlldywgZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuaW5wdXRUeXBlICE9IFwiaW5zZXJ0Q29tcG9zaXRpb25UZXh0XCIgfHwgISh2aWV3LnN0YXRlLnNlbGVjdGlvbiBpbnN0YW5jZW9mIEdhcEN1cnNvcikpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBsZXQgeyAkZnJvbSB9ID0gdmlldy5zdGF0ZS5zZWxlY3Rpb247XG4gICAgbGV0IGluc2VydCA9ICRmcm9tLnBhcmVudC5jb250ZW50TWF0Y2hBdCgkZnJvbS5pbmRleCgpKS5maW5kV3JhcHBpbmcodmlldy5zdGF0ZS5zY2hlbWEubm9kZXMudGV4dCk7XG4gICAgaWYgKCFpbnNlcnQpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBsZXQgZnJhZyA9IEZyYWdtZW50LmVtcHR5O1xuICAgIGZvciAobGV0IGkgPSBpbnNlcnQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pXG4gICAgICAgIGZyYWcgPSBGcmFnbWVudC5mcm9tKGluc2VydFtpXS5jcmVhdGVBbmRGaWxsKG51bGwsIGZyYWcpKTtcbiAgICBsZXQgdHIgPSB2aWV3LnN0YXRlLnRyLnJlcGxhY2UoJGZyb20ucG9zLCAkZnJvbS5wb3MsIG5ldyBTbGljZShmcmFnLCAwLCAwKSk7XG4gICAgdHIuc2V0U2VsZWN0aW9uKFRleHRTZWxlY3Rpb24ubmVhcih0ci5kb2MucmVzb2x2ZSgkZnJvbS5wb3MgKyAxKSkpO1xuICAgIHZpZXcuZGlzcGF0Y2godHIpO1xuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGRyYXdHYXBDdXJzb3Ioc3RhdGUpIHtcbiAgICBpZiAoIShzdGF0ZS5zZWxlY3Rpb24gaW5zdGFuY2VvZiBHYXBDdXJzb3IpKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbm9kZS5jbGFzc05hbWUgPSBcIlByb3NlTWlycm9yLWdhcGN1cnNvclwiO1xuICAgIHJldHVybiBEZWNvcmF0aW9uU2V0LmNyZWF0ZShzdGF0ZS5kb2MsIFtEZWNvcmF0aW9uLndpZGdldChzdGF0ZS5zZWxlY3Rpb24uaGVhZCwgbm9kZSwgeyBrZXk6IFwiZ2FwY3Vyc29yXCIgfSldKTtcbn1cblxuZXhwb3J0IHsgR2FwQ3Vyc29yLCBnYXBDdXJzb3IgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/prosemirror-gapcursor/dist/index.js\n");

/***/ })

};
;