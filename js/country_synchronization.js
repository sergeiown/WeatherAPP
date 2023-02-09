import getDomVariables from "./dom_variables.js";

const variables = getDomVariables();

/* check which countries are suitable for the selected city */
export function synchronizeСountry(cities) {
  const matchingCountries = [];

  const currentCityName = variables.cityName.value.toLowerCase();

  for (const city of cities) {
    if (city.name.toLowerCase() === currentCityName) {
      variables.countrySelect.value = city.country;
      matchingCountries.push(city.country);
    }
  }
  // console.log(matchingCountries);
  return matchingCountries;
}

/* Reduce the list of countries added to the option */
export function limitCountries(matchingCountries) {
  const countryOptions = variables.countrySelect.options;
  for (let i = 0; i < countryOptions.length; i++) {
    if (!matchingCountries.includes(countryOptions[i].value)) {
      variables.countrySelect.remove(i);
      i--;
    }
  }
}
