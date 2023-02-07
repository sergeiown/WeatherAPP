/* Fetch forecast from the server API */

import { showWidget } from "./widget_visible.js";
import { fillWidgetWithApi } from "./widget_from_api.js";
import getDomVariables from "./dom_variables.js";

const variables = getDomVariables();

export function getForecast(city, country, now) {
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

      /* Fill the widget with data from api response. Save data to the cookie */
      fillWidgetWithApi(city, country, data, now);

      /* Make forecast visible and close preloader */
      showWidget();

      /* Close preloader */
      variables.modal.close();
    })
    .catch((error) => {
      /* show the error for 3 seconds */
      variables.modal.textContent = error.message;

      setTimeout(() => {
        variables.modal.close();
      }, 3000);
    });
}
