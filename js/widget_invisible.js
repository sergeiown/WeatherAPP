/* Make forecast invisible */
import getDomVariables from "./dom_variables.js";

const variables = getDomVariables();

export function hideWidget() {
  const elements = [variables.container, variables.timeContainer];

  elements.forEach((element) => {
    element.style.visibility = "hidden";
  });
}
