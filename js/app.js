const form = document.querySelector("#form");
const select = document.querySelector("#country");
const button = document.querySelector("button");
const buttonColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
];
const modal = document.querySelector(".modal");
const container = document.querySelector(".container");
const currentTemp = document.querySelector("#currentTemp");
const weatherIcon = document.querySelector("#weatherIcon");
const currentStatus = document.querySelector("#status");
const feelsLike = document.querySelector("#feelsLike");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

const timeContainer = document.querySelector(".time");
const updateTime = document.querySelector("#updateTime");
const cookieTime = document.querySelector("#savedTime");

/* make the button visible enough for the user */
let colorIndex = 0;
setInterval(() => {
  button.style.color = buttonColors[colorIndex % buttonColors.length];
  colorIndex++;
}, 1000);

/* Read the list of countries and make select>option */
fetch("./data/countries.json")
  .then((response) => response.json())
  .then((countries) => {
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country["alpha-2"];
      option.text = country.name;
      select.add(option);
    });
  });

/* Wait for user input and show preloader after submit */
form.addEventListener("submit", (event) => {
  event.preventDefault();

  modal.textContent = `Loading...`;
  modal.showModal();

  const city = document.querySelector("#city").value.trim();
  const country = select.value;
  const now = new Date();

  const elements = [
    currentTemp,
    currentStatus,
    feelsLike,
    humidity,
    wind,
    sunrise,
    sunset,
    updateTime,
    cookieTime,
  ];
  elements.forEach((element) => {
    element.textContent = "";
  });

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

      currentTemp.textContent = cookieData.temp;
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${cookieData.icon}@2x.png" alt="Weather icon">`;
      currentStatus.textContent = cookieData.forecast;
      feelsLike.textContent = `Feels like: ${cookieData.tempFeelsLike}`;
      humidity.textContent = `Humidity: ${cookieData.humiditySource}`;
      wind.textContent = `Wind speed: ${cookieData.windSource}`;
      sunrise.textContent = `Sunrise at ${cookieData.sunriseSource}`;
      sunset.textContent = `Sunset at ${cookieData.sunsetSource}`;
      cookieTime.textContent = `Last update: ${cookieSavedTime.toLocaleString()}`;
      updateTime.textContent = `Saved data is shown`;

      modal.close();

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

      currentTemp.textContent = temp;
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">`;
      currentStatus.textContent = forecast;
      feelsLike.textContent = `Feels like: ${tempFeelsLike}`;
      humidity.textContent = `Humidity: ${humiditySource}`;
      wind.textContent = `Wind speed: ${windSource}`;
      sunrise.textContent = `Sunrise at ${sunriseSource}`;
      sunset.textContent = `Sunset at ${sunsetSource}`;
      updateTime.textContent = `Last update: ${now.toLocaleString()}`;

      /* Make forecast visible and close preloader */
      const elements = [container, timeContainer];
      elements.forEach((element) => {
        element.style.visibility = "visible";
      });

      modal.close();

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
      modal.textContent = error.message;
      setTimeout(() => {
        modal.close();
      }, 3000);
    });
});
