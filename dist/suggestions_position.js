"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.placeSuggestions = placeSuggestions;
var _dom_variables = _interopRequireDefault(require("./dom_variables.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var variables = (0, _dom_variables["default"])();
function placeSuggestions(suggestionsContainer) {
  suggestionsContainer.style.display = "block";
  suggestionsContainer.style.left = "".concat(variables.cityName.offsetLeft + window.pageXOffset + suggestionsContainer.offsetWidth / 2 + 5, "px");
  suggestionsContainer.style.top = "".concat(variables.cityName.offsetTop + variables.cityName.offsetHeight + window.pageYOffset + suggestionsContainer.offsetHeight / 2 + 5, "px");
  suggestionsContainer.innerHTML = "";
}