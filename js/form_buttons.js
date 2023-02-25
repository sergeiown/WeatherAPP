'use strict';

import { cycleButtonColors } from './colored_button.js';
import { createGeoButton } from './createGeoButton.js';
import { getDomVariables } from './dom_variables.js';

const variables = getDomVariables();

export function changeButtons() {
    createGeoButton();

    variables.form.addEventListener('input', (event) => {
        const InputValue = event.target.value;

        if (InputValue.length > 0) {
            cycleButtonColors();
            variables.clear.style.display = 'block';
            variables.geoLocation.style.display = 'none';
        } else {
            createGeoButton();
            variables.clear.style.display = 'none';
        }
    });
}
