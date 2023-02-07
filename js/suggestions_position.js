import getDomVariables from "./dom_variables.js";

const variables = getDomVariables();

export function placeSuggestions(suggestionsContainer) {
  suggestionsContainer.style.display = "block";

  suggestionsContainer.style.left = `${
    variables.cityName.offsetLeft +
    variables.cityName.offsetWidth +
    window.pageXOffset
  }px`;

  suggestionsContainer.style.top = `${
    variables.cityName.offsetTop +
    variables.cityName.offsetHeight +
    window.pageYOffset +
    suggestionsContainer.offsetHeight / 3
  }px`;

  suggestionsContainer.innerHTML = "";
}
