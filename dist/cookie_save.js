"use strict";

/* Save cookie */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveCookie = saveCookie;
function saveCookie(temp, icon, city, country, forecast, tempFeelsLike, humiditySource, windSource, sunriseSource, sunsetSource, now) {
  document.cookie = "forecast=".concat(JSON.stringify({
    temp: temp,
    icon: icon,
    city: city,
    country: country,
    forecast: forecast,
    tempFeelsLike: tempFeelsLike,
    humiditySource: humiditySource,
    windSource: windSource,
    sunriseSource: sunriseSource,
    sunsetSource: sunsetSource,
    time: now
  }), "; max-age=600");
}