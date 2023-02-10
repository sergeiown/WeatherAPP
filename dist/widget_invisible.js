"use strict";

/* Make forecast invisible */
import { getDomVariables } from "./dom_variables.js";
var variables = getDomVariables();
export function hideWidget() {
  var elements = [variables.container, variables.timeContainer];
  elements.forEach(element => {
    element.style.visibility = "hidden";
  });
}