"use strict";

/* Fill the widget with data from cookies */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fillWidgetWithCookie = fillWidgetWithCookie;
var _dom_variables = _interopRequireDefault(require("./dom_variables.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var variables = (0, _dom_variables["default"])();
function fillWidgetWithCookie(cookieData, cookieSavedTime, cookieSavedTimeUntil) {
  variables.currentTemp.textContent = cookieData.temp;
  variables.weatherIcon.innerHTML = "<img src=\"https://openweathermap.org/img/wn/".concat(cookieData.icon, "@2x.png\" alt=\"Weather icon\">");
  variables.currentStatus.textContent = cookieData.forecast;
  variables.feelsLike.textContent = "Feels like: ".concat(cookieData.tempFeelsLike);
  variables.humidity.textContent = "Humidity: ".concat(cookieData.humiditySource);
  variables.wind.textContent = "Wind speed: ".concat(cookieData.windSource);
  variables.sunrise.textContent = "Sunrise at ".concat(cookieData.sunriseSource);
  variables.sunset.textContent = "Sunset at ".concat(cookieData.sunsetSource);
  variables.cookieTime.textContent = "The latest update from the server: ".concat(cookieSavedTime.toLocaleString());
  /* Bring the city name entered by the user to the proper form (only for display in the widget) and add the time until which the saved forecast will be displayed */
  variables.updateTime.innerHTML = "Saved data for <b>".concat(cookieData.city.replace(/\b\w/g, function (firstLetter) {
    return firstLetter.toUpperCase();
  }), " ").concat(cookieData.country, "</b> will be displayed until <b>").concat(cookieSavedTimeUntil.toLocaleTimeString(), "</b>");
  return;
}