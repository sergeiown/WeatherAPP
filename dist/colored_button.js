'use strict';

/* make the button visible enough for the user */
import { getDomVariables } from './dom_variables.js';
var variables = getDomVariables();
export function cycleButtonColors() {
  var buttonColors = ['#1D3F72', '#2D5B8B', '#3D77A5', '#4D93BF', '#5DAFD8', '#6DCBE2', '#7DE7EC', '#8DFFFF', '#6FF2F2', '#00FBF1', '#6FF2F2', '#8DFFFF', '#7DE7EC', '#6DCBE2', '#5DAFD8', '#4D93BF', '#3D77A5', '#2D5B8B', '#1D3F72'];
  var colorIndex = 0;

  /* start color cycling for submit button */
  var intervalId = JSON.parse(localStorage.getItem('intervalId')) || 0;
  clearInterval(intervalId);
  // console.log(`remove interval Id: ${JSON.parse(localStorage.getItem('intervalId'))}`);

  intervalId = 0;
  localStorage.removeItem('intervalId');
  intervalId = setInterval(function () {
    variables.button.style.color = buttonColors[colorIndex % buttonColors.length];
    colorIndex++;
  }, 100);
  localStorage.setItem('intervalId', JSON.stringify(intervalId));

  // console.log(`add interval Id: ${JSON.parse(localStorage.getItem('intervalId'))}`);
}