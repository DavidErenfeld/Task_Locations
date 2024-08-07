# Starbucks Locations Map

## Overview

This project is a web application designed to display a map of Starbucks locations based on the user's country selection. It utilizes OpenLayers for map rendering and React for the frontend structure.

## Project Structure

- `public/`: Contains static assets and the `index.html` file.
- `src/`:
  - `Components/`: React components for different parts of the application.
    - `CountrySelector/`: Component for selecting a country.
    - `Header/`: Top navigation bar.
    - `LocationChecker/`: Component to check if a location is inside a selected country.
    - `Loader/`: Loading animation display.
    - `MainPage/`: Main landing page that hosts the map and country selector.
  - `contexts/`: Contexts for global state management.
  - `Hooks/`: Custom React hooks.
  - `Utils/`: Utility functions, including geo-spatial operations.
- `geojson/`: GeoJSON files used for mapping operations.
- `.redirects`: Netlify redirects configuration for SPA routing.
