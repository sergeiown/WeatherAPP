"use strict";

/* Clearing the widget elements */

import { getDomVariables } from "./dom_variables.js";

const variables = getDomVariables();

const elements = [
  variables.currentTemp,
  variables.currentStatus,
  variables.feelsLike,
  variables.humidity,
  variables.wind,
  variables.sunrise,
  variables.sunset,
  variables.updateTime,
  variables.cookieTime,
];

export function clearWidget() {
  elements.forEach((element) => {
    element.textContent = "";
  });
}
