'use strict';
/* make the button visible enough for the user */

import { getDomVariables } from './dom_variables.js';

const variables = getDomVariables();

export function cycleButtonColors() {
    const buttonColors = ['#1D3F72', '#5699D2', '#D8EBF9', '#71C2CC', '#4996A2', '#785471', '#E8CDC5', '#EEE7D8'];

    let colorIndex = 0;
    const intervalId = setInterval(() => {
        variables.button.style.color = buttonColors[colorIndex % buttonColors.length];
        colorIndex++;
    }, 1000);

    localStorage.setItem('intervalId', intervalId);
}
