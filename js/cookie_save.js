"use strict";
/* Save cookie */

export function saveCookie(
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
) {
  document.cookie = `forecast=${JSON.stringify({
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
    time: now,
  })}; max-age=600`;
}
