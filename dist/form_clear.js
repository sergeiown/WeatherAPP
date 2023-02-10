"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearForm = clearForm;
var _widget_invisible = require("./widget_invisible.js");
var _country_list = require("./country_list.js");
var _dom_variables = _interopRequireDefault(require("./dom_variables.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var variables = (0, _dom_variables.default)();
function clearForm() {
  (0, _widget_invisible.hideWidget)();
  variables.cityName.value = "";

  /* Get new list of countries */
  (0, _country_list.getCountries)();
  console.clear();
}