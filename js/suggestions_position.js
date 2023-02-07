import getDomVariables from "./dom_variables.js";

const variables = getDomVariables();

export function placeSuggestions(suggestionsContainer) {
  suggestionsContainer.style.display = "block";

  suggestionsContainer.style.left = `${
    variables.cityName.offsetLeft +
    window.pageXOffset +
    suggestionsContainer.offsetWidth / 2 +
    5
  }px`;

  suggestionsContainer.style.top = `${
    variables.cityName.offsetTop +
    variables.cityName.offsetHeight +
    window.pageYOffset +
    suggestionsContainer.offsetHeight / 2 +
    5
  }px`;

  suggestionsContainer.innerHTML = "";
}
