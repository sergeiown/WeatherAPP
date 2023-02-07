/* Read the list of countries and make select>option */

import getDomVariables from "./dom_variables.js";

const variables = getDomVariables();

export function getCountries() {
  fetch("./data/countries.json")
    .then((response) => response.json())
    .then((countries) => {
      countries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country["alpha-2"];
        option.text = country.name;
        variables.countrySelect.add(option);
      });
    });
}
