"use strict";

/* Fill the widget with data from api response */
import { getDomVariables } from "./dom_variables.js";
import { saveCookie } from "./cookie_save.js";
var variables = getDomVariables();
export function fillWidgetWithApi(city, country, data, now) {
  var forecast = "it's ".concat(data.weather[0].description, " in ").concat(data.name, ", ").concat(data.sys.country);
  var icon = data.weather[0].icon;
  var temp = "".concat(Math.round(data.main.temp), " \xB0C");
  var tempFeelsLike = "".concat(Math.round(data.main.feels_like), " \xB0C");
  var humiditySource = "".concat(data.main.humidity, " %");
  var windSource = "".concat(data.wind.speed.toFixed(1), " m/s");
  var sunriseSource = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  var sunsetSource = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  variables.currentTemp.textContent = temp;
  variables.weatherIcon.innerHTML = "<img src=\"https://openweathermap.org/img/wn/".concat(icon, "@2x.png\" alt=\"Weather icon\">");
  variables.currentStatus.textContent = forecast;
  variables.feelsLike.textContent = "Feels like: ".concat(tempFeelsLike);
  variables.humidity.textContent = "Humidity: ".concat(humiditySource);
  variables.wind.textContent = "Wind speed: ".concat(windSource);
  variables.sunrise.textContent = "Sunrise at ".concat(sunriseSource);
  variables.sunset.textContent = "Sunset at ".concat(sunsetSource);
  variables.updateTime.textContent = "The latest forecast update: ".concat(now.toLocaleString());

  /* Save data from api response */
  saveCookie(temp, icon, city, country, forecast, tempFeelsLike, humiditySource, windSource, sunriseSource, sunsetSource, now);
}