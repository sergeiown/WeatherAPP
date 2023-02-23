'use strict';

import { getDomVariables } from './dom_variables.js';
import { getSuggestions } from './suggestions.js';
import { getCountries } from './country_list.js';
import { changeButtons } from './form_buttons.js';
import { clearForm } from './form_clear.js';
import { hideWidget } from './widget_invisible.js';
import { clearWidget } from './widget_clear.js';
import { checkCookie } from './cookie_check.js';
import { getForecast } from './forecast.js';

const variables = getDomVariables();

/* Get a list of cities from an external file and display suggestions for the user during input */
getSuggestions();

/* Get an initial list of countries */
getCountries();

/* Get a new country list each time a new city name is entered */
variables.cityName.addEventListener('focus', getCountries);

/* Change the visibility and appearance of buttons */
changeButtons();

/* ----- obtaining a forecast based on the form data ----- */

/* Waiting for the user to submit the form */
variables.form.addEventListener('submit', (event) => {
    event.preventDefault();

    /* Show preloader after submit */
    variables.modal.innerHTML = variables.preloader;
    variables.modal.showModal();

    /* Hide the widget if it was opened earlier */
    hideWidget();

    /* Save the form data and clear the widget */
    const city = variables.cityName.value.toLowerCase().trim();
    const country = variables.countrySelect.value;
    const now = new Date();
    clearWidget();

    /* Check if forecast is stored in cookies and has the same city and if it's not older than 10 minutes. Show widget if everything is okay */
    if (checkCookie(city, country, now)) {
        return;
    }

    /* If forecast is not stored in cookies or is outdated, fetch it from the server API. Show widget if everything is okay or show error message */
    getForecast(city, country, now);
});

/* ----- obtaining a forecast based on geolocation data ----- */

/* Clear form data */
variables.clear.addEventListener('click', clearForm);
