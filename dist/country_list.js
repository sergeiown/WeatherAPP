"use strict";

/* Read the list of countries and make select>option */
import { getDomVariables } from "./dom_variables.js";
var variables = getDomVariables();
export function getCountries() {
  fetch("./data/countries.json").then(response => response.json()).then(countries => {
    /* cleaning of previous elements */
    while (variables.countrySelect.firstChild) {
      variables.countrySelect.removeChild(variables.countrySelect.firstChild);
    }
    /* adding new elements */
    var option = document.createElement("option");
    option.value = "";
    option.text = "Select a country *optional";
    variables.countrySelect.add(option);
    variables.countrySelect.value = "";
    countries.forEach(country => {
      var option = document.createElement("option");
      option.value = country["alpha-2"];
      option.text = country.name;
      variables.countrySelect.add(option);
    });
  });
}