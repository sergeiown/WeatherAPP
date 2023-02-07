/* make the button visible enough for the user */

import getDomVariables from "./dom_variables.js";

const variables = getDomVariables();

const buttonColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
];

export function cycleButtonColors() {
  let colorIndex = 0;
  setInterval(() => {
    variables.button.style.color =
      buttonColors[colorIndex % buttonColors.length];
    colorIndex++;
  }, 1000);
}
