import { hideWidget } from "./widget_invisible.js";
import { getCountries } from "./country_list.js";
import getDomVariables from "./dom_variables.js";
const variables = getDomVariables();

export function clearForm() {
  hideWidget();

  variables.cityName.value = "";

  const option = document.createElement("option");
  option.value = "";
  option.text = "Select a country *optional";
  variables.countrySelect.add(option);
  variables.countrySelect.value = "";

  /* Get new list of countries */
  getCountries();
}
