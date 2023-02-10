"use strict";

/* Clearing the widget elements */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearWidget = clearWidget;
var _dom_variables = _interopRequireDefault(require("./dom_variables.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var variables = (0, _dom_variables["default"])();
var elements = [variables.currentTemp, variables.currentStatus, variables.feelsLike, variables.humidity, variables.wind, variables.sunrise, variables.sunset, variables.updateTime, variables.cookieTime];
function clearWidget() {
  elements.forEach(function (element) {
    element.textContent = "";
  });
}