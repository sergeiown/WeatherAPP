"use strict";

/* Fill the widget with data from api response */

import { getDomVariables } from "./dom_variables.js";
import { saveCookie } from "./cookie_save.js";

const variables = getDomVariables();

export function fillWidgetWithApi(city, country, data, now) {
  const forecast = `it's ${data.weather[0].description} in ${data.name}, ${data.sys.country}`;
  const icon = data.weather[0].icon;
  const temp = `${Math.round(data.main.temp)} °C`;
  const tempFeelsLike = `${Math.round(data.main.feels_like)} °C`;
  const humiditySource = `${data.main.humidity} %`;
  const windSource = `${data.wind.speed.toFixed(1)} m/s`;
  const sunriseSource = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunsetSource = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  variables.currentTemp.textContent = temp;
  variables.weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">`;
  variables.currentStatus.textContent = forecast;
  variables.feelsLike.textContent = `Feels like: ${tempFeelsLike}`;
  variables.humidity.textContent = `Humidity: ${humiditySource}`;
  variables.wind.textContent = `Wind speed: ${windSource}`;
  variables.sunrise.textContent = `Sunrise at ${sunriseSource}`;
  variables.sunset.textContent = `Sunset at ${sunsetSource}`;
  variables.updateTime.textContent = `The latest forecast update: ${now.toLocaleString()}`;

  /* Save data from api response */
  saveCookie(
    temp,
    icon,
    city,
    country,
    forecast,
    tempFeelsLike,
    humiditySource,
    windSource,
    sunriseSource,
    sunsetSource,
    now
  );
}
