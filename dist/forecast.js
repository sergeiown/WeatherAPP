'use strict';

/* Fetch forecast from the server API */
import { showWidget } from './widget_visible.js';
import { fillWidgetWithApi } from './widget_from_api.js';
import { getDomVariables } from './dom_variables.js';
import { clearForm } from './form_clear.js';
var variables = getDomVariables();
export function getForecast(city, country, now) {
  /* Timeout for a response for 10 seconds and then generate an error */
  var timeout = new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error('Request timed out. Please try again later.'));
    }, 10000);
  });

  /* Request to the api for the selected city and country */
  var apiRequest = fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(encodeURIComponent(city), ",").concat(encodeURIComponent(country), "&units=metric&appid=cf56fb7d05b9d81a18cb8aa28abe286a"));

  /* Use "Promise.race" which allows to determine which promise will end first. */
  Promise.race([timeout, apiRequest]).then(function (response) {
    if (!response.ok) {
      clearForm();
      throw new Error('City not found!');
    }
    return response.json();
  }).then(function (data) {
    console.log('API response :');
    console.log(data);

    /* Fill the widget with data from api response. Save data to the cookie */
    fillWidgetWithApi(city, country, data, now);

    /* Make forecast visible and close preloader */
    showWidget();

    /* Close preloader */
    variables.modal.close();
  }).catch(function (error) {
    /* show the error for 3 seconds */
    variables.modal.textContent = error.message;
    setTimeout(function () {
      variables.modal.close();
    }, 3000);
  });
}