"use strict";

/* Read the list of countries and make select>option */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountries = getCountries;
var _dom_variables = _interopRequireDefault(require("./dom_variables.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var variables = (0, _dom_variables.default)();
function getCountries() {
  fetch("./data/countries.json").then(function (response) {
    return response.json();
  }).then(function (countries) {
    /* cleaning of previous elements */
    while (variables.countrySelect.firstChild) {
      variables.countrySelect.removeChild(variables.countrySelect.firstChild);
    }
    /* adding new elements */
    var option = document.createElement("option");
    option.value = "";
    option.text = "Select a country *optional";
    variables.countrySelect.add(option);
    variables.countrySelect.value = "";
    countries.forEach(function (country) {
      var option = document.createElement("option");
      option.value = country["alpha-2"];
      option.text = country.name;
      variables.countrySelect.add(option);
    });
  });
}