'use strict';

import { getDomVariables } from './dom_variables.js';

const variables = getDomVariables();

export function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { lat, lon } = { lat: coords.latitude, lon: coords.longitude };

                getCityName(lat, lon)
                    .then(() => {
                        resolve({ lat: lat, lon: lon });
                    })
                    .catch((error) => {
                        /* show the error for 3 seconds */
                        variables.modal.textContent = error.message;
                        setTimeout(() => {
                            variables.modal.close();
                        }, 3000);
                    });
            });
        } else {
            reject();
        }
    });
}

function getCityName(lat, lon) {
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=cf56fb7d05b9d81a18cb8aa28abe286a`;

    const timeout = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Timeout while fetching location data'));
        }, 10000);
    });

    return Promise.race([fetch(url), timeout])
        .then((response) => response.json())
        .then((data) => {
            const geoLocationCountry = data[0].country;
            const geoLocationCity = data[0].name;
            localStorage.setItem('geoLocationCountry', geoLocationCountry);
            localStorage.setItem('geoLocationCity', geoLocationCity);
        });
}
