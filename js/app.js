import getDomVariables from "./dom_variables.js";
import { cycleButtonColors } from "./colored_button.js";
import { getCountries } from "./country_list.js";
import { clearWidget } from "./clear_widget.js";

const variables = getDomVariables();

cycleButtonColors();

getCountries();

/* Wait for user input and show preloader after submit */
variables.form.addEventListener("submit", (event) => {
  event.preventDefault();

  variables.modal.innerHTML = variables.preloader;
  variables.modal.showModal();

  const city = variables.cityName.value.trim();
  const country = variables.countrySelect.value;
  const now = new Date();

  clearWidget();

  /* Check if forecast is stored in cookies */
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith("forecast="));

  if (cookie) {
    const cookieData = JSON.parse(cookie.split("=")[1]);
    const cookieSavedTime = new Date(cookieData.time);

    /* Check if stored forecast is for the same city&country and if it's not older than 10 minutes */
    if (
      cookieData.city === city &&
      cookieData.country === country &&
      now - cookieSavedTime < 600000
    ) {
      console.log(cookie);

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

      variables.modal.close();

      return;
    }
  }

  /* If forecast is not stored in cookies or is outdated, fetch it from the server */
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
      const elements = [variables.container, variables.timeContainer];
      elements.forEach((element) => {
        element.style.visibility = "visible";
      });

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
