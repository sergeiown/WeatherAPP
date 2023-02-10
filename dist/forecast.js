"use strict";

/* Fetch forecast from the server API */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getForecast = getForecast;
var _widget_visible = require("./widget_visible.js");
var _widget_from_api = require("./widget_from_api.js");
var _dom_variables = _interopRequireDefault(require("./dom_variables.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var variables = (0, _dom_variables["default"])();
function getForecast(city, country, now) {
  /* Timeout for a response for 10 seconds and then generate an error */
  var timeout = new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error("Request timed out. Please try again later."));
    }, 10000);
  });

  /* Request to the api for the selected city and country */
  var apiRequest = fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(encodeURIComponent(city), ",").concat(encodeURIComponent(country), "&units=metric&appid=cf56fb7d05b9d81a18cb8aa28abe286a"));

  /* Use "Promise.race" which allows to determine which promise will end first. */
  Promise.race([timeout, apiRequest]).then(function (response) {
    if (!response.ok) {
      throw new Error("City not found!");
    }
    return response.json();
  }).then(function (data) {
    console.log("API response :");
    console.log(data);

    /* Fill the widget with data from api response. Save data to the cookie */
    (0, _widget_from_api.fillWidgetWithApi)(city, country, data, now);

    /* Make forecast visible and close preloader */
    (0, _widget_visible.showWidget)();

    /* Close preloader */
    variables.modal.close();
  })["catch"](function (error) {
    /* show the error for 3 seconds */
    variables.modal.textContent = error.message;
    setTimeout(function () {
      variables.modal.close();
    }, 3000);
  });
}