"use strict";

/* Clearing the widget elements */
import { getDomVariables } from "./dom_variables.js";
var variables = getDomVariables();
var elements = [variables.currentTemp, variables.currentStatus, variables.feelsLike, variables.humidity, variables.wind, variables.sunrise, variables.sunset, variables.updateTime, variables.cookieTime];
export function clearWidget() {
  elements.forEach(function (element) {
    element.textContent = "";
  });
}