"use strict";

/* Fill the widget with data from cookies */

import { getDomVariables } from "./dom_variables.js";

const variables = getDomVariables();

export function fillWidgetWithCookie(
  cookieData,
  cookieSavedTime,
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
  variables.cookieTime.textContent = `The latest update from the server: ${cookieSavedTime.toLocaleString()}`;
  /* Bring the city name entered by the user to the proper form (only for display in the widget) and add the time until which the saved forecast will be displayed */
  variables.updateTime.innerHTML = `Saved data for <b>${cookieData.city.replace(
    /\b\w/g,
    (firstLetter) => firstLetter.toUpperCase()
  )} ${
    cookieData.country
  }</b> will be displayed until <b>${cookieSavedTimeUntil.toLocaleTimeString()}</b>`;

  return;
}
