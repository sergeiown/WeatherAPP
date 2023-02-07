import getDomVariables from "./dom_variables.js";

const variables = getDomVariables();

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
            ),
          ];

          suggestionsContainer.style.display = "block";
          suggestionsContainer.innerHTML = "";

          /* Add an array of suggestions with eventlisteners to the container */
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

      /* Hide suggestions when the input loses focus */
      variables.cityName.addEventListener("blur", () => {
        suggestionsContainer.style.display = "none";
      });
    })
    .catch((error) => console.error(error));
}
