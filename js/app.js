import getDomVariables from "./dom_variables.js";
import { cycleButtonColors } from "./colored_button.js";
import { getCountries } from "./country_list.js";
import { clearWidget } from "./widget_clear.js";
import { checkCookie } from "./cookie_check.js";
import { showWidget } from "./widget_visible.js";

const variables = getDomVariables();

cycleButtonColors();

getCountries();

/* Wait for user input and */
variables.form.addEventListener("submit", (event) => {
  event.preventDefault();

  /* Show preloader after submit */
  variables.modal.innerHTML = variables.preloader;
  variables.modal.showModal();

  const city = variables.cityName.value.trim();
  const country = variables.countrySelect.value;
  const now = new Date();

  clearWidget();

  /* Check if forecast is stored in cookies and has the same city&country and if it's not older than 10 minutes. Show widget if if everything is okay */
  if (checkCookie(city, country, now)) {
    return;
  }

  /* If forecast is not stored in cookies or is outdated, fetch it from the server API */
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )},${encodeURIComponent(
      country
    )}&units=metric&appid=cf56fb7d05b9d81a18cb8aa28abe286a`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("City not found!");
      }
    })
    .then((data) => {
      console.log(data);

      const forecast = `it's ${data.weather[0].description} in ${data.name}, ${data.sys.country}`;
      const icon = data.weather[0].icon;
      const temp = `${Math.round(data.main.temp)} °C`;
      const tempFeelsLike = `${Math.round(data.main.feels_like)} °C`;
      const humiditySource = `${data.main.humidity} %`;
      const windSource = `${data.wind.speed.toFixed(1)} m/s`;
      const sunriseSource = new Date(
        data.sys.sunrise * 1000
      ).toLocaleTimeString();
      const sunsetSource = new Date(
        data.sys.sunset * 1000
      ).toLocaleTimeString();

      variables.currentTemp.textContent = temp;
      variables.weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">`;
      variables.currentStatus.textContent = forecast;
      variables.feelsLike.textContent = `Feels like: ${tempFeelsLike}`;
      variables.humidity.textContent = `Humidity: ${humiditySource}`;
      variables.wind.textContent = `Wind speed: ${windSource}`;
      variables.sunrise.textContent = `Sunrise at ${sunriseSource}`;
      variables.sunset.textContent = `Sunset at ${sunsetSource}`;
      variables.updateTime.textContent = `Last update: ${now.toLocaleString()}`;

      /* Make forecast visible and close preloader */
      showWidget();

      variables.modal.close();

      /* Save date to the cookie */
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
    })
    .catch((error) => {
      variables.modal.textContent = error.message;
      setTimeout(() => {
        variables.modal.close();
      }, 3000);
    });
});
