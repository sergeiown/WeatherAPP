"use strict";

import { hideWidget } from "./widget_invisible.js";
import { getCountries } from "./country_list.js";
import { getDomVariables } from "./dom_variables.js";
const variables = getDomVariables();

export function clearForm() {
  hideWidget();

  variables.cityName.value = "";

  /* Get new list of countries */
  getCountries();

  console.clear();
}
