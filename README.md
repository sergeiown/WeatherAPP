# Get Weather App

![Dependencies](https://user-images.githubusercontent.com/112722061/221054510-8b208613-ee81-4e65-88a9-546c435eb4e6.png)

## Functionality

-   Weather forecast with search by city name and country using [ISO 3166 Regional Codes.](https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes)

-   Search by city is implemented with suggestions of options when the user enters the name. More than 200,000 cities are available!

-   Synchronization between selected city and the countries corresponding to the choice has been implemented.

-   `Fetch` requests to the [Openweathermap API](https://openweathermap.org/api) are used.

-   The forecast data of the last request is stored and displayed in a widget using a cookie.

-   If you request a forecast for the same city and country again the new data will only be requested after 10 minutes.

-   The `navigator.geolocation API` is used to determine the geolocation of users in the application. This API allows to get the user's current location using GPS or other methods supported by the device.

## Built with

-   [Babel](https://babeljs.io/) with [ECMAScript Modules (ESM) configuration](https://babeljs.io/docs/en/babel-preset-env)

![screenshot_one](https://user-images.githubusercontent.com/112722061/221371559-2b104f13-5a9a-4593-aa99-5c29543a50ea.png)
---
![screenshot_two](https://user-images.githubusercontent.com/112722061/221370244-c4b7f3d1-f995-4c85-98a8-eb458d6df93c.png)
