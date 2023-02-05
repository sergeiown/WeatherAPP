const form = document.querySelector("#form");
const select = document.querySelector("#country");
const currentStatus = document.querySelector("#status");
const updateTime = document.querySelector("#updateTime");
const cookieTime = document.querySelector("#savedTime");
const weatherIcon = document.querySelector("#weatherIcon");

/* Read the list of countries and make select>option */
fetch("../data/countries.json")
  .then((response) => response.json())
  .then((countries) => {
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country["alpha-2"];
      option.text = country.name;
      select.add(option);
    });
  });

/* Read the list of countries and make select>option */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.querySelector("#city").value.trim();
  const country = select.value;
  const now = new Date();
  currentStatus.textContent = `Loading...`;
  updateTime.textContent = "";
  cookieTime.textContent = "";
  weatherIcon.innerHTML = "";

  /* Check if forecast is stored in cookies */
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith("forecast="));

  if (cookie) {
    const cookieData = JSON.parse(cookie.split("=")[1]);
    const cookieSavedTime = new Date(cookieData.time);

    /* Check if stored forecast is for the same city and if it's not older than 1 minute */
    if (
      cookieData.city === city &&
      cookieData.country === country &&
      now - cookieSavedTime < 60000
    ) {
      console.log(cookie);

      currentStatus.textContent = cookieData.forecast;
      updateTime.textContent = `Saved data is shown`;
      cookieTime.textContent = `Last update: ${cookieSavedTime.toLocaleString()}`;
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${cookieData.icon}@2x.png" alt="Weather icon">`;
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
        throw new Error("City not found");
      }
    })
    .then((data) => {
      console.log(data);

      const forecast = `it's ${data.weather[0].description} in ${data.name}, ${data.sys.country}`;
      const icon = data.weather[0].icon;

      currentStatus.textContent = forecast;
      updateTime.textContent = `Last update: ${now.toLocaleString()}`;
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">`;

      document.cookie = `forecast=${JSON.stringify({
        city,
        country,
        forecast,
        icon,
        time: now,
      })}; max-age=60`;
    })
    .catch((error) => {
      currentStatus.textContent = error.message;
    });
});
