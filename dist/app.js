"use strict";

var _dom_variables = _interopRequireDefault(require("./dom_variables.js"));
var _suggestions = require("./suggestions.js");
var _country_list = require("./country_list.js");
var _form_clear = require("./form_clear.js");
var _widget_invisible = require("./widget_invisible.js");
var _colored_button = require("./colored_button.js");
var _widget_clear = require("./widget_clear.js");
var _cookie_check = require("./cookie_check.js");
var _forecast = require("./forecast.js");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var variables = (0, _dom_variables["default"])();

/* Get a list of cities from an external file and display suggestions for the user during input */
(0, _suggestions.getSuggestions)();

/* Get an initial list of countries */
(0, _country_list.getCountries)();

/* Style the form-submit button (change colors smoothly) */
(0, _colored_button.cycleButtonColors)();

/* Get a new country list each time a new city name is entered */
variables.cityName.addEventListener("focus", _country_list.getCountries);

/* Waiting for the user to submit the form */
variables.form.addEventListener("submit", function (event) {
  event.preventDefault();

  /* Show preloader after submit */
  variables.modal.innerHTML = variables.preloader;
  variables.modal.showModal();

  /* Hide the widget if it was opened earlier */
  (0, _widget_invisible.hideWidget)();

  /* Save the form data and clear the widget */
  var city = variables.cityName.value.toLowerCase().trim();
  var country = variables.countrySelect.value;
  var now = new Date();
  (0, _widget_clear.clearWidget)();

  /* Check if forecast is stored in cookies and has the same city and if it's not older than 10 minutes. Show widget if everything is okay */
  if ((0, _cookie_check.checkCookie)(city, country, now)) {
    return;
  }

  /* If forecast is not stored in cookies or is outdated, fetch it from the server API. Show widget if everything is okay or show error message */
  (0, _forecast.getForecast)(city, country, now);
});

/* Clear form data */
variables.clear.addEventListener("click", _form_clear.clearForm);
