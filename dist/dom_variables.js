'use strict';

var form = document.querySelector('#form');
var cityName = document.querySelector('#city');
var countrySelect = document.querySelector('#country');
var button = document.querySelector('button[type=submit]');
var geoLocation = document.querySelector('button[type=geoLocation]');
var clear = document.querySelector('button[type=button]');
var modal = document.querySelector('.modal');
var preloader = "<img src=\"./img/preloader.svg\" alt=\"Loading...\" />";
var container = document.querySelector('.container');
var currentTemp = document.querySelector('#currentTemp');
var weatherIcon = document.querySelector('#weatherIcon');
var currentStatus = document.querySelector('#status');
var feelsLike = document.querySelector('#feelsLike');
var humidity = document.querySelector('#humidity');
var wind = document.querySelector('#wind');
var sunrise = document.querySelector('#sunrise');
var sunset = document.querySelector('#sunset');
var timeContainer = document.querySelector('.time');
var updateTime = document.querySelector('#updateTime');
var cookieTime = document.querySelector('#savedTime');
export function getDomVariables() {
  return {
    form: form,
    cityName: cityName,
    countrySelect: countrySelect,
    button: button,
    geoLocation: geoLocation,
    clear: clear,
    modal: modal,
    preloader: preloader,
    container: container,
    currentTemp: currentTemp,
    weatherIcon: weatherIcon,
    currentStatus: currentStatus,
    feelsLike: feelsLike,
    humidity: humidity,
    wind: wind,
    sunrise: sunrise,
    sunset: sunset,
    timeContainer: timeContainer,
    updateTime: updateTime,
    cookieTime: cookieTime
  };
}