const form = document.querySelector("#form");
const select = document.querySelector("#country");
const button = document.querySelector("button");
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

export default function getVariables() {
  return {
    form,
    select,
    button,
    modal,
    container,
    currentTemp,
    weatherIcon,
    currentStatus,
    feelsLike,
    humidity,
    wind,
    sunrise,
    sunset,
    timeContainer,
    updateTime,
    cookieTime,
  };
}
