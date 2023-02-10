"use strict";

/* Make forecast visible and close preloader */
import { getDomVariables } from "./dom_variables.js";
var variables = getDomVariables();
export function showWidget() {
  var elements = [variables.container, variables.timeContainer];
  elements.forEach(function (element) {
    element.style.visibility = "visible";
  });
}