'use strict';

import { getDomVariables } from './dom_variables.js';
var variables = getDomVariables();
export function getLocation() {
  return new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (_ref) {
        var coords = _ref.coords;
        var _lat$lon = {
            lat: coords.latitude,
            lon: coords.longitude
          },
          lat = _lat$lon.lat,
          lon = _lat$lon.lon;
        getCityName(lat, lon).then(function () {
          resolve({
            lat: lat,
            lon: lon
          });
        }).catch(function (error) {
          /* show the error for 3 seconds */
          variables.modal.textContent = error.message;
          setTimeout(function () {
            variables.modal.close();
          }, 3000);
        });
      });
    } else {
      reject();
    }
  });
}
function getCityName(lat, lon) {
  var url = "https://api.openweathermap.org/geo/1.0/reverse?lat=".concat(lat, "&lon=").concat(lon, "&limit=1&appid=cf56fb7d05b9d81a18cb8aa28abe286a");
  var timeout = new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Timeout while fetching location data'));
    }, 10000);
  });
  return Promise.race([fetch(url), timeout]).then(function (response) {
    return response.json();
  }).then(function (data) {
    var geoLocationCountry = data[0].country;
    var geoLocationCity = data[0].name;
    localStorage.setItem('geoLocationCountry', geoLocationCountry);
    localStorage.setItem('geoLocationCity', geoLocationCity);
  });
}