"use strict";

/* Make forecast visible and close preloader */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showWidget = showWidget;
var _dom_variables = _interopRequireDefault(require("./dom_variables.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var variables = (0, _dom_variables.default)();
function showWidget() {
  var elements = [variables.container, variables.timeContainer];
  elements.forEach(function (element) {
    element.style.visibility = "visible";
  });
}