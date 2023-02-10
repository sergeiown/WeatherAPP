"use strict";

/* Make forecast visible and close preloader */
import getDomVariables from "./dom_variables.js";

const variables = getDomVariables();

export function showWidget() {
  const elements = [variables.container, variables.timeContainer];

  elements.forEach((element) => {
    element.style.visibility = "visible";
  });
}
