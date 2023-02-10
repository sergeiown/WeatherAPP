"use strict";

/* Make forecast invisible */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideWidget = hideWidget;
var _dom_variables = _interopRequireDefault(require("./dom_variables.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var variables = (0, _dom_variables["default"])();
function hideWidget() {
  var elements = [variables.container, variables.timeContainer];
  elements.forEach(function (element) {
    element.style.visibility = "hidden";
  });
}