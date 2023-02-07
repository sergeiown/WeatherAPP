import getDomVariables from "./dom_variables.js";

const variables = getDomVariables();

export function getSuggestions() {
  const suggestionsContainer = document.createElement("div");
  suggestionsContainer.classList.add("suggestions");

  suggestionsContainer.style.display = "none";
  document.body.appendChild(suggestionsContainer);

  fetch("./data/citylist.json")
    .then((response) => response.json())
    .then((cities) => {
      variables.cityName.addEventListener("input", (event) => {
        const inputValue = event.target.value;

        if (inputValue.length >= 3) {
          const suggestions = cities
            .filter((city) =>
              city.name.toLowerCase().startsWith(inputValue.toLowerCase())
            )
            .map((city) => city.name);

          suggestionsContainer.style.display = "block";
          suggestionsContainer.innerHTML = "";

          suggestions.forEach((suggestion) => {
            const suggestionItem = document.createElement("div");
            suggestionItem.innerHTML = suggestion;
            suggestionsContainer.appendChild(suggestionItem);

            suggestionItem.addEventListener("mousedown", (event) => {
              const clickedSuggestion = event.target;

              variables.cityName.value = clickedSuggestion.textContent;
              suggestionsContainer.style.display = "none";
            });
          });
        } else {
          suggestionsContainer.style.display = "none";
        }
      });

      variables.cityName.addEventListener("blur", () => {
        suggestionsContainer.style.display = "none";
      });
    })
    .catch((error) => console.error(error));
}
