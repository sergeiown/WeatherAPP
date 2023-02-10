"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
import { placeSuggestions } from "./suggestions_position.js";
import { synchronizeСountry } from "./country_synchronization.js";
import { limitCountries } from "./country_synchronization.js";
import { getDomVariables } from "./dom_variables.js";
var variables = getDomVariables();

// const submitEvent = new Event("submit");

export function getSuggestions() {
  var suggestionsContainer = document.createElement("div");
  suggestionsContainer.classList.add("suggestions");
  suggestionsContainer.style.display = "none";
  document.body.appendChild(suggestionsContainer);

  /* Read the list of cities from json */
  fetch("./data/citylist.json").then(function (response) {
    return response.json();
  }).then(function (cities) {
    variables.cityName.addEventListener("input", function (event) {
      var inputValue = event.target.value;

      /* Show suggestions when the number of letters entered is more than 3 */
      if (inputValue.length >= 3) {
        var suggestions = _toConsumableArray(new Set(cities.filter(function (city) {
          return city.name.toLowerCase().startsWith(inputValue.toLowerCase());
        }).map(function (city) {
          return city.name;
        }).sort()));

        /* Place, make visible, clear suggestions */
        placeSuggestions(suggestionsContainer);

        /* Add an array of suggestions with eventlisteners to the container */
        suggestions.forEach(function (suggestion) {
          var suggestionItem = document.createElement("div");
          suggestionItem.innerHTML = suggestion;
          suggestionsContainer.appendChild(suggestionItem);
          suggestionItem.addEventListener("mousedown", function (event) {
            var clickedSuggestion = event.target;

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
    variables.cityName.addEventListener("blur", function () {
      suggestionsContainer.style.display = "none";
    });
  }).catch(function (error) {
    return console.error(error);
  });
}