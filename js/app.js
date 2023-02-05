const form = document.querySelector("#form");
const currentStatus = document.querySelector("#status");
const updateTime = document.querySelector("#updateTime");
const cookieTime = document.querySelector("#savedTime");
const weatherIcon = document.querySelector("#weatherIcon");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.querySelector("#city").value.trim();
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
    const cookieCity = cookieData.city;
    const cookieSavedTime = new Date(cookieData.time);

    // console.log(cookie);
    // console.log(cookieCity);
    // console.log(cookieSavedTime);
    // console.log(now);

    /* Check if stored forecast is for the same city and if it's not older than 1 minute */
    if (cookieCity === city && now - cookieSavedTime < 60000) {
      //   console.log(cookie);
      //   console.log(
      //     new Date(JSON.parse(cookie.split("=")[1]).time).toLocaleString()
      //   );

      currentStatus.textContent = cookieData.forecast;
      updateTime.textContent = `Saved data is shown`;
      cookieTime.textContent = `Last update: ${cookieSavedTime.toLocaleString()}`;
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${cookieData.icon}@2x.png" alt="Weather icon">`;
      return;
    }
  }

  /* If forecast is not stored in cookies or is outdated, fetch it from the server */
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cf56fb7d05b9d81a18cb8aa28abe286a`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("City not found");
      }
    })
    .then((data) => {
      const forecast = data.weather[0].description;
      const icon = data.weather[0].icon;
      currentStatus.textContent = forecast;
      updateTime.textContent = `Last update: ${now.toLocaleString()}`;
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">`;
      document.cookie = `forecast=${JSON.stringify({
        city,
        forecast,
        icon,
        time: now,
      })}; max-age=60`;
    })
    .catch((error) => {
      currentStatus.textContent = error.message;
    });
});
