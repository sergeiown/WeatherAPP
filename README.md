# Get Weather App

![Dependencies](https://user-images.githubusercontent.com/112722061/221054510-8b208613-ee81-4e65-88a9-546c435eb4e6.png)

## Functionality

- Weather forecast with search by city name and country using [ISO 3166 Regional Codes.](https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes)

- Search by city is implemented with suggestions of options when the user enters the name. Data is stored in external json files.

- Synchronization between selected city and the countries corresponding to the choice has been implemented.

- Fetch requests to the [openweathermap](https://openweathermap.org/api) api are used.

- The forecast data of the last request is stored and displayed in a widget using a cookie.

- If you request a forecast for the same city and country again the new data will only be requested after 10 minutes.

## Built with

- [Babel](https://babeljs.io/) with [ECMAScript Modules (ESM) configuration](https://babeljs.io/docs/en/babel-preset-env)

![screenshot](https://user-images.githubusercontent.com/112722061/219881032-1ee83d61-f008-4cb6-a8fb-5499670e5841.png)
