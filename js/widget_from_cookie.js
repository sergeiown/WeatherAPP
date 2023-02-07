/* Fill the widget with data from cookies */

import getDomVariables from "./dom_variables.js";

const variables = getDomVariables();

export function fillWidgetWithCookie(cookieData, cookieSavedTime) {
  variables.currentTemp.textContent = cookieData.temp;
  variables.weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${cookieData.icon}@2x.png" alt="Weather icon">`;
  variables.currentStatus.textContent = cookieData.forecast;
  variables.feelsLike.textContent = `Feels like: ${cookieData.tempFeelsLike}`;
  variables.humidity.textContent = `Humidity: ${cookieData.humiditySource}`;
  variables.wind.textContent = `Wind speed: ${cookieData.windSource}`;
  variables.sunrise.textContent = `Sunrise at ${cookieData.sunriseSource}`;
  variables.sunset.textContent = `Sunset at ${cookieData.sunsetSource}`;
  variables.cookieTime.textContent = `Last update: ${cookieSavedTime.toLocaleString()}`;
  variables.updateTime.textContent = `Saved data is shown`;

  return;
}
