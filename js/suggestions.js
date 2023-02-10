"use strict";

import { placeSuggestions } from "./suggestions_position.js";
import { synchronizeСountry } from "./country_synchronization.js";
import { limitCountries } from "./country_synchronization.js";
import getDomVariables from "./dom_variables.js";

const variables = getDomVariables();

// const submitEvent = new Event("submit");

export function getSuggestions() {
  const suggestionsContainer = document.createElement("div");
  suggestionsContainer.classList.add("suggestions");

  suggestionsContainer.style.display = "none";
  document.body.appendChild(suggestionsContainer);

  /* Read the list of cities from json */
  fetch("./data/citylist.json")
    .then((response) => response.json())
    .then((cities) => {
      variables.cityName.addEventListener("input", (event) => {
        const inputValue = event.target.value;

        /* Show suggestions when the number of letters entered is more than 3 */
        if (inputValue.length >= 3) {
          const suggestions = [
            ...new Set(
              cities
                .filter((city) =>
                  city.name.toLowerCase().startsWith(inputValue.toLowerCase())
                )
                .map((city) => city.name)
                .sort()
            ),
          ];

          /* Place, make visible, clear suggestions */
          placeSuggestions(suggestionsContainer);

          /* Add an array of suggestions with eventlisteners to the container */
          suggestions.forEach((suggestion) => {
            const suggestionItem = document.createElement("div");
            suggestionItem.innerHTML = suggestion;
            suggestionsContainer.appendChild(suggestionItem);

            suggestionItem.addEventListener("mousedown", (event) => {
              const clickedSuggestion = event.target;

              /* Assigning selected city value, synchronizing countries and submit the form */
              variables.cityName.value = clickedSuggestion.textContent;
              limitCountries(synchronizeСountry(cities));
              suggestionsContainer.style.display = "none";

              // variables.form.dispatchEvent(submitEvent);
            });
          });
        } else {
          suggestionsContainer.style.display = "none";
        }
      });

      /* Hide suggestions when the input loses focus */
      variables.cityName.addEventListener("blur", () => {
        suggestionsContainer.style.display = "none";
      });
    })
    .catch((error) => console.error(error));
}
