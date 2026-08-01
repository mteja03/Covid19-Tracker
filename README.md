# COVID-19 Tracker

A live COVID-19 tracker showing worldwide and per-country statistics, an
interactive map, historical charts, news, precautions, and donation links.

## Tech stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/) for dev server and builds
- [MUI (Material UI) v5](https://mui.com/) for UI components
- [Leaflet](https://leafletjs.com/) / [react-leaflet](https://react-leaflet.js.org/) for the map
- [Chart.js](https://www.chartjs.org/) / [react-chartjs-2](https://react-chartjs-2.js.org/) for graphs
- Data from the [disease.sh](https://disease.sh/) API

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs dependencies.

### `npm run dev` (or `npm start`)

Runs the app in development mode with Vite. Open the URL printed in the
terminal (default [http://localhost:5173](http://localhost:5173)) to view it.
The page reloads automatically as you edit.

### `npm run build`

Builds the app for production into the `build` folder.

### `npm run preview`

Serves the production build locally so you can verify it before deploying.

## Deployment

The production build is deployed to Firebase Hosting (`firebase deploy`), which
serves the `build` folder configured in `firebase.json`.

Project Links:
- https://globalcovidtracker.tk
- https://covid-19-tracker-336dd.web.app/

## Images

Covid Live tracker<br />
<img width="700" alt="1" src="https://user-images.githubusercontent.com/62012634/177739434-3889b2cc-dac6-4f95-aeeb-0f6a175b63e1.png">

Covid News and Donation<br />
<img width="700" alt="2" src="https://user-images.githubusercontent.com/62012634/177739513-8a501eb1-872c-4fe8-b1e1-584eaa6c723b.png">

Precautions<br />
<img width="700" alt="3" src="https://user-images.githubusercontent.com/62012634/177739568-69b2899e-fa56-4ac4-825d-09e01d1d3d6b.png">
