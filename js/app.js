import getDomVariables from "./dom_variables.js";
import { getSuggestions } from "./suggestions.js";
import { getCountries } from "./country_list.js";
import { cycleButtonColors } from "./colored_button.js";
import { clearWidget } from "./widget_clear.js";
import { checkCookie } from "./cookie_check.js";
import { getForecast } from "./forecast.js";

const variables = getDomVariables();

/* Get a list of cities from an external file and display suggestions for the user during input */
getSuggestions();

/* Get a list of countries from an external file */
getCountries();

/* Style the form-submit button (change colors smoothly) */
cycleButtonColors();

/* Waiting for the user to submit the form */
variables.form.addEventListener("submit", (event) => {
  event.preventDefault();

  /* Show preloader after submit */
  variables.modal.innerHTML = variables.preloader;
  variables.modal.showModal();

  /* Save the form data and clear the widget */
  const city = variables.cityName.value.trim();
  const country = variables.countrySelect.value;
  const now = new Date();
  clearWidget();

  /* Check if forecast is stored in cookies and has the same city&country and if it's not older than 10 minutes. Show widget if if everything is okay */
  if (checkCookie(city, country, now)) {
    return;
  }

  /* If forecast is not stored in cookies or is outdated, fetch it from the server API. Show widget if if everything is okay or show error */
  getForecast(city, country, now);

  /* Get new list of countries */
  getCountries();
});
