'use strict';

export function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                resolve({ lat: coords.latitude, lon: coords.longitude });

                const { lat, lon } = { lat: coords.latitude, lon: coords.longitude };
                getCityName(lat, lon);
            });
        } else {
            reject();
        }
    });
}

function getCityName(lat, lon) {
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=cf56fb7d05b9d81a18cb8aa28abe286a`;
    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const geoLocationCity = data[0].name;
            localStorage.setItem('geoLocationCity', geoLocationCity);
        });
}
