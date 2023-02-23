'use strict';

import { cycleButtonColors } from './colored_button.js';
import { createGeoButton } from './createGeoButton.js';
import { getDomVariables } from './dom_variables.js';

const variables = getDomVariables();

export function changeButtons() {
    createGeoButton();

    variables.countrySelect.addEventListener('input', (countryEvent) => {
        const countryInputValue = countryEvent.target.value;
        if (countryInputValue.length > 0) {
            cycleButtonColors();
            variables.clear.style.display = 'block';
            variables.geolocation.style.display = 'none';
        } else {
            createGeoButton();
            variables.clear.style.display = 'none';
        }
    });

    variables.cityName.addEventListener('input', (cityEvent) => {
        const cityInputValue = cityEvent.target.value;
        if (cityInputValue.length > 0) {
            cycleButtonColors();
            variables.clear.style.display = 'block';
            variables.geolocation.style.display = 'none';
        } else {
            createGeoButton();
            variables.clear.style.display = 'none';
        }
    });
}
