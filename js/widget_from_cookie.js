/* Fill the widget with data from cookies */

import getDomVariables from "./dom_variables.js";

const variables = getDomVariables();

export function fillWidgetWithCookie(
  cookieData,
  cookieSavedTime,
  city,
  cookieSavedTimeUntil
) {
  variables.currentTemp.textContent = cookieData.temp;
  variables.weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${cookieData.icon}@2x.png" alt="Weather icon">`;
  variables.currentStatus.textContent = cookieData.forecast;
  variables.feelsLike.textContent = `Feels like: ${cookieData.tempFeelsLike}`;
  variables.humidity.textContent = `Humidity: ${cookieData.humiditySource}`;
  variables.wind.textContent = `Wind speed: ${cookieData.windSource}`;
  variables.sunrise.textContent = `Sunrise at ${cookieData.sunriseSource}`;
  variables.sunset.textContent = `Sunset at ${cookieData.sunsetSource}`;
  variables.cookieTime.textContent = `The last update from the server: ${cookieSavedTime.toLocaleString()}`;
  variables.updateTime.innerHTML = `Saved data for location <b>${city
    .toLowerCase()
    .replace(/\b\w/g, (l) =>
      l.toUpperCase()
    )}</b> will be displayed until <b>${cookieSavedTimeUntil.toLocaleTimeString()}</b>`;

  return;
}
